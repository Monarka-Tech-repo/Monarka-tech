// WhatsApp Cloud API: webhook signature check, payload parsing, sending replies.

const GRAPH_URL = "https://graph.facebook.com/v21.0";
const MAX_TEXT_LENGTH = 4096;

export type IncomingMessage = {
  id: string;
  /** Sender's WhatsApp ID (their phone number, digits only). Trusted: comes from Meta, not the user. */
  from: string;
  /** Profile name the sender set in WhatsApp, if any. */
  name?: string;
  /** Text body, or null for non-text messages (images, audio, stickers…). */
  text: string | null;
};

function hexToBytes(hex: string): Uint8Array | null {
  if (!/^[0-9a-f]*$/i.test(hex) || hex.length % 2 !== 0) return null;
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  return out;
}

/** Verifies Meta's `X-Hub-Signature-256: sha256=<hex>` HMAC of the raw request body. */
export async function verifySignature(appSecret: string, rawBody: string, header: string | null): Promise<boolean> {
  if (!header?.startsWith("sha256=")) return false;
  const signature = hexToBytes(header.slice("sha256=".length));
  if (!signature) return false;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(appSecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"],
  );
  // subtle.verify compares in constant time.
  return crypto.subtle.verify("HMAC", key, signature, new TextEncoder().encode(rawBody));
}

type WebhookPayload = {
  entry?: {
    changes?: {
      value?: {
        contacts?: { wa_id?: string; profile?: { name?: string } }[];
        messages?: { id?: string; from?: string; type?: string; text?: { body?: string } }[];
      };
    }[];
  }[];
};

/** Extracts user messages from a webhook payload. Status updates (delivered/read) are ignored. */
export function parseIncoming(payload: unknown): IncomingMessage[] {
  const out: IncomingMessage[] = [];
  for (const entry of (payload as WebhookPayload)?.entry ?? []) {
    for (const change of entry.changes ?? []) {
      const value = change.value;
      for (const msg of value?.messages ?? []) {
        if (!msg.id || !msg.from || !/^\d{6,15}$/.test(msg.from)) continue;
        const contact = value?.contacts?.find((c) => c.wa_id === msg.from);
        const body = msg.type === "text" ? msg.text?.body?.trim() : undefined;
        out.push({
          id: msg.id,
          from: msg.from,
          name: contact?.profile?.name?.slice(0, 80),
          text: body ? body.slice(0, 2000) : null,
        });
      }
    }
  }
  return out;
}

export type WhatsAppConfig = { token: string; phoneNumberId: string };

async function post(config: WhatsAppConfig, body: Record<string, unknown>): Promise<void> {
  const res = await fetch(`${GRAPH_URL}/${config.phoneNumberId}/messages`, {
    method: "POST",
    headers: { Authorization: `Bearer ${config.token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ messaging_product: "whatsapp", ...body }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`WhatsApp API ${res.status}: ${(await res.text()).slice(0, 300)}`);
}

export function sendText(config: WhatsAppConfig, to: string, text: string): Promise<void> {
  return post(config, { to, type: "text", text: { body: text.slice(0, MAX_TEXT_LENGTH) } });
}

/** Shows the blue ticks + "typing…" indicator while the bot thinks. Best-effort. */
export async function markReadAndTyping(config: WhatsAppConfig, messageId: string): Promise<void> {
  try {
    await post(config, { status: "read", message_id: messageId, typing_indicator: { type: "text" } });
  } catch {
    // Cosmetic only; never block a reply on it.
  }
}
