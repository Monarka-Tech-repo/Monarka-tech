// Monarka WhatsApp bot — Cloudflare Worker entry point.
//
//   GET  /webhook  Meta's one-time verification handshake
//   POST /webhook  incoming WhatsApp messages (signed by Meta)
//   GET  /health   liveness check

import { fallbackText, reply, type AgentConfig } from "./agent";
import { parseBusinessHours } from "./slots";
import { firstTimeSeen, loadHistory, saveHistory, withinRateLimit } from "./store";
import { markReadAndTyping, parseIncoming, sendText, verifySignature, type IncomingMessage, type WhatsAppConfig } from "./whatsapp";

export interface Env {
  BOT_STATE: KVNamespace;
  // Secrets (wrangler secret put …)
  ANTHROPIC_API_KEY: string;
  WHATSAPP_TOKEN: string;
  WHATSAPP_APP_SECRET: string;
  WHATSAPP_VERIFY_TOKEN: string;
  GOOGLE_SERVICE_ACCOUNT_JSON: string;
  // Plain vars (wrangler.jsonc)
  WHATSAPP_PHONE_NUMBER_ID: string;
  GOOGLE_CALENDAR_ID: string;
  TIMEZONE: string;
  BUSINESS_HOURS: string;
  SLOT_MINUTES: string;
  MIN_LEAD_MINUTES: string;
  BOOKING_HORIZON_DAYS: string;
  MESSAGES_PER_HOUR: string;
}

const RATE_LIMITED_TEXT =
  "Recibimos muchos mensajes tuyos en poco tiempo. Intenta de nuevo en una hora o escribe a hello@monarka.tech. / Too many messages; please try again in an hour.";
const NON_TEXT_TEXT =
  "Por ahora solo puedo leer mensajes de texto. ¿Me lo escribes? / For now I can only read text messages — could you type it?";

function agentConfig(env: Env): AgentConfig {
  return {
    apiKey: env.ANTHROPIC_API_KEY,
    calendar: { serviceAccountJson: env.GOOGLE_SERVICE_ACCOUNT_JSON, calendarId: env.GOOGLE_CALENDAR_ID, timeZone: env.TIMEZONE },
    hours: parseBusinessHours(env.BUSINESS_HOURS),
    slotMinutes: Number(env.SLOT_MINUTES) || 30,
    minLeadMinutes: Number(env.MIN_LEAD_MINUTES) || 120,
    horizonDays: Number(env.BOOKING_HORIZON_DAYS) || 30,
  };
}

async function handleMessage(env: Env, msg: IncomingMessage): Promise<void> {
  const wa: WhatsAppConfig = { token: env.WHATSAPP_TOKEN, phoneNumberId: env.WHATSAPP_PHONE_NUMBER_ID };

  if (!(await firstTimeSeen(env.BOT_STATE, msg.id))) return;
  if (!(await withinRateLimit(env.BOT_STATE, msg.from, Number(env.MESSAGES_PER_HOUR) || 30))) {
    await sendText(wa, msg.from, RATE_LIMITED_TEXT);
    return;
  }
  await markReadAndTyping(wa, msg.id);

  if (!msg.text) {
    await sendText(wa, msg.from, NON_TEXT_TEXT);
    return;
  }

  let answer: string;
  try {
    const history = await loadHistory(env.BOT_STATE, msg.from);
    answer = (await reply(agentConfig(env), { waId: msg.from, name: msg.name }, history, msg.text)).text;
    await saveHistory(env.BOT_STATE, msg.from, [...history, { role: "user", text: msg.text }, { role: "assistant", text: answer }]);
  } catch (err) {
    console.error("reply failed", err);
    answer = fallbackText(msg.text);
  }
  await sendText(wa, msg.from, answer);
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/health") return new Response("ok");
    if (url.pathname !== "/webhook") return new Response("Not found", { status: 404 });

    if (request.method === "GET") {
      const mode = url.searchParams.get("hub.mode");
      const token = url.searchParams.get("hub.verify_token");
      const challenge = url.searchParams.get("hub.challenge");
      if (mode === "subscribe" && token && token === env.WHATSAPP_VERIFY_TOKEN && challenge) {
        return new Response(challenge, { headers: { "Content-Type": "text/plain" } });
      }
      return new Response("Forbidden", { status: 403 });
    }

    if (request.method !== "POST") return new Response("Method not allowed", { status: 405 });

    const raw = await request.text();
    if (raw.length > 256_000) return new Response("Payload too large", { status: 413 });
    if (!(await verifySignature(env.WHATSAPP_APP_SECRET, raw, request.headers.get("X-Hub-Signature-256")))) {
      return new Response("Invalid signature", { status: 401 });
    }

    let payload: unknown;
    try {
      payload = JSON.parse(raw);
    } catch {
      return new Response("Bad JSON", { status: 400 });
    }

    // Acknowledge immediately (Meta retries slow webhooks); reply in the background.
    for (const msg of parseIncoming(payload)) {
      ctx.waitUntil(handleMessage(env, msg).catch((err) => console.error("handleMessage failed", err)));
    }
    return new Response("ok");
  },
} satisfies ExportedHandler<Env>;
