// The conversation brain: Claude with two calendar tools.

import Anthropic from "@anthropic-ai/sdk";
import { busyIntervals, createEvent, type CalendarConfig } from "./calendar";
import { computeSlots, dayWindow, isValidDate, localDate, type BusinessHours } from "./slots";
import type { Turn } from "./store";

const MODEL = "claude-opus-5-5";
const MAX_TOOL_ROUNDS = 6;

export type AgentConfig = {
  apiKey: string;
  calendar: CalendarConfig;
  hours: BusinessHours;
  slotMinutes: number;
  minLeadMinutes: number;
  horizonDays: number;
};

export type Contact = { waId: string; name?: string };

// Stable across requests (keeps the prompt cacheable). Today's date goes in a
// separate block after it.
const SYSTEM_PROMPT = `You are the WhatsApp assistant for Monarka TECH, a technology company in El Paso, Texas (website: monarka.tech, email: hello@monarka.tech).

What Monarka does:
- Digital products: concept, strategy and experiences that feel natural from the first touch.
- Apps and platforms: mobile apps and web platforms built to evolve.
- Automation: intelligent systems that remove friction and repetitive work.
- Technology and support: infrastructure, implementation and ongoing technical support.
- Monarka 3D Studio: 3D media and sound, including spatial audio for ads.
- Own product: CATA, a social food journal app (open beta on iPhone, cata.life).

Facts you can share: project timelines depend on scope and a clear schedule is given after the first conversation; technology is chosen per project; post-launch support and maintenance are offered; Monarka works with small and large businesses. Do not invent prices, discounts, team members, clients or guarantees. For anything you don't know, offer a call with the team.

Your main job is booking a free discovery call (a video call with the Monarka team).
To book:
1. Ask what they want to build or need help with, if they haven't said.
2. Ask which day suits them, then call get_available_slots for that date and offer a few of the returned times. Only ever offer times that tool returned.
3. When they pick a time, confirm their name, then call book_appointment with that slot's exact start value. An email is optional; ask once, don't insist.
4. After booking, confirm the day and time in their timezone wording (times are in Monarka's local time, stated in tool results).
Never say an appointment is booked unless book_appointment returned ok.

Style: this is WhatsApp. Reply in the language the person writes in (Spanish or English). Keep messages short and warm, a few lines at most, no markdown headings or tables. Use plain text; a short list is fine when offering times.`;

const tools: Anthropic.Beta.BetaTool[] = [
  {
    name: "get_available_slots",
    description:
      "Lists free discovery-call times on one day, in Monarka's local time. Call it before offering any time, and again if the person asks about another day.",
    strict: true,
    input_schema: {
      type: "object",
      properties: { date: { type: "string", description: "Day to check, YYYY-MM-DD." } },
      required: ["date"],
      additionalProperties: false,
    },
  },
  {
    name: "book_appointment",
    description:
      "Books a discovery call. Only call it after the person chose a time returned by get_available_slots and gave their name.",
    strict: true,
    input_schema: {
      type: "object",
      properties: {
        start: { type: "string", description: "Exact `start` value of the chosen slot from get_available_slots." },
        name: { type: "string", description: "Person's name." },
        topic: { type: "string", description: "One or two sentences on what they want to talk about." },
        email: { type: "string", description: "Their email, or an empty string if they didn't give one." },
      },
      required: ["start", "name", "topic", "email"],
      additionalProperties: false,
    },
  },
];

type ToolOutcome = { content: string; isError?: boolean };

function describeReason(reason: string, cfg: AgentConfig): string {
  switch (reason) {
    case "invalid_date":
      return "That is not a valid date. Use YYYY-MM-DD.";
    case "past_date":
      return "That date is in the past.";
    case "beyond_horizon":
      return `Bookings are only open for the next ${cfg.horizonDays} days.`;
    default:
      return "Monarka is closed that day; suggest another day.";
  }
}

async function slotsFor(cfg: AgentConfig, date: string, now: Date) {
  const win = dayWindow({ date, timeZone: cfg.calendar.timeZone, hours: cfg.hours, now, horizonDays: cfg.horizonDays });
  if (!win.ok) return win;
  const busy = await busyIntervals(cfg.calendar, win.open, win.close);
  return computeSlots({
    date,
    timeZone: cfg.calendar.timeZone,
    hours: cfg.hours,
    slotMinutes: cfg.slotMinutes,
    busy,
    now,
    minLeadMinutes: cfg.minLeadMinutes,
    horizonDays: cfg.horizonDays,
  });
}

async function runTool(cfg: AgentConfig, contact: Contact, name: string, input: unknown): Promise<ToolOutcome> {
  const now = new Date();
  const args = (input ?? {}) as Record<string, unknown>;

  if (name === "get_available_slots") {
    const date = String(args.date ?? "");
    if (!isValidDate(date)) return { content: describeReason("invalid_date", cfg), isError: true };
    const result = await slotsFor(cfg, date, now);
    if (!result.ok) return { content: describeReason(result.reason, cfg) };
    if (!result.slots.length) return { content: `No free times on ${date}. Suggest another day.` };
    return {
      content: JSON.stringify({
        date,
        timezone: cfg.calendar.timeZone,
        durationMinutes: cfg.slotMinutes,
        slots: result.slots.map((s) => ({ start: s.start, localTime: s.label })),
      }),
    };
  }

  if (name === "book_appointment") {
    const start = new Date(String(args.start ?? ""));
    const personName = String(args.name ?? "").trim().slice(0, 80);
    const topic = String(args.topic ?? "").trim().slice(0, 500);
    const email = String(args.email ?? "").trim().slice(0, 120);
    if (Number.isNaN(start.getTime())) return { content: "Invalid start time; call get_available_slots again.", isError: true };
    if (!personName) return { content: "Ask for the person's name first.", isError: true };

    // Re-check against the live calendar: the slot must still be one we'd offer.
    const date = localDate(start, cfg.calendar.timeZone);
    const result = await slotsFor(cfg, date, now);
    const slot = result.ok ? result.slots.find((s) => s.start === start.toISOString()) : undefined;
    if (!slot) return { content: "That time is no longer available. Call get_available_slots and offer other times." };

    const description = [
      `Discovery call booked via WhatsApp.`,
      `Name: ${personName}`,
      `WhatsApp: +${contact.waId}`,
      email ? `Email: ${email}` : null,
      `Topic: ${topic || "(not given)"}`,
    ]
      .filter(Boolean)
      .join("\n");
    await createEvent(cfg.calendar, {
      start: new Date(slot.start),
      end: new Date(slot.end),
      summary: `Monarka · Llamada con ${personName}`,
      description,
    });
    return { content: JSON.stringify({ ok: true, date, localTime: slot.label, timezone: cfg.calendar.timeZone, durationMinutes: cfg.slotMinutes }) };
  }

  return { content: `Unknown tool ${name}`, isError: true };
}

export type AgentReply = { text: string };

export async function reply(cfg: AgentConfig, contact: Contact, history: Turn[], userText: string): Promise<AgentReply> {
  const client = new Anthropic({ apiKey: cfg.apiKey, maxRetries: 2, timeout: 60_000 });
  const now = new Date();
  const today = localDate(now, cfg.calendar.timeZone);
  const weekday = new Intl.DateTimeFormat("en-US", { timeZone: cfg.calendar.timeZone, weekday: "long" }).format(now);

  const messages: Anthropic.Beta.BetaMessageParam[] = [
    ...history.map((t) => ({ role: t.role, content: t.text })),
    { role: "user", content: contact.name ? `[${contact.name}]: ${userText}` : userText },
  ];

  for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
    const response = await client.beta.messages.create({
      model: MODEL,
      max_tokens: 16000,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      output_config: { effort: "low" },
      system: [
        { type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } },
        { type: "text", text: `Today is ${weekday}, ${today} (${cfg.calendar.timeZone}).` },
      ],
      tools,
      messages,
    });

    if (response.stop_reason === "refusal") break;

    const toolUses = response.content.filter((b): b is Anthropic.Beta.BetaToolUseBlock => b.type === "tool_use");
    if (response.stop_reason !== "tool_use" || !toolUses.length) {
      const text = response.content
        .filter((b): b is Anthropic.Beta.BetaTextBlock => b.type === "text")
        .map((b) => b.text)
        .join("\n")
        .trim();
      if (text) return { text };
      break;
    }

    // Append the full assistant turn (thinking + tool_use blocks) unchanged.
    messages.push({ role: "assistant", content: response.content });
    const results: Anthropic.Beta.BetaToolResultBlockParam[] = await Promise.all(
      toolUses.map(async (tu) => {
        try {
          const out = await runTool(cfg, contact, tu.name, tu.input);
          return { type: "tool_result" as const, tool_use_id: tu.id, content: out.content, is_error: out.isError };
        } catch (err) {
          console.error("tool failed", tu.name, err);
          return {
            type: "tool_result" as const,
            tool_use_id: tu.id,
            content: "The calendar is temporarily unavailable. Apologise and suggest emailing hello@monarka.tech.",
            is_error: true,
          };
        }
      }),
    );
    messages.push({ role: "user", content: results });
  }

  return { text: fallbackText(userText) };
}

/** Used when Claude can't produce a reply. Picks language from a simple Spanish heuristic. */
export function fallbackText(userText: string): string {
  const spanish = /[áéíóúñ¿¡]|\b(hola|quiero|cita|gracias|necesito|buen[oa]s?)\b/i.test(userText);
  return spanish
    ? "Gracias por escribir a Monarka. En este momento no puedo responder; escríbenos a hello@monarka.tech y te contactamos pronto."
    : "Thanks for messaging Monarka. I can't answer right now; please email hello@monarka.tech and we'll get back to you soon.";
}
