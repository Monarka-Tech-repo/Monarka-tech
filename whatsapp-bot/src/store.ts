// Conversation memory, de-duplication and rate limiting, backed by Workers KV.

export type Turn = { role: "user" | "assistant"; text: string };

const HISTORY_TTL_SECONDS = 7 * 24 * 3600;
const MAX_TURNS = 20;
const DEDUPE_TTL_SECONDS = 24 * 3600;

export async function loadHistory(kv: KVNamespace, waId: string): Promise<Turn[]> {
  return (await kv.get<Turn[]>(`conv:${waId}`, "json")) ?? [];
}

/**
 * Keeps only the last MAX_TURNS text turns, always starting on a user turn.
 * Only plain text is stored (no thinking/tool blocks), so trimming never edits
 * a replayed thinking block.
 */
export function trimHistory(turns: Turn[]): Turn[] {
  let trimmed = turns.slice(-MAX_TURNS);
  while (trimmed.length && trimmed[0].role !== "user") trimmed = trimmed.slice(1);
  return trimmed;
}

export async function saveHistory(kv: KVNamespace, waId: string, turns: Turn[]): Promise<void> {
  await kv.put(`conv:${waId}`, JSON.stringify(trimHistory(turns)), { expirationTtl: HISTORY_TTL_SECONDS });
}

/** True the first time a message ID is seen. Meta retries webhooks, so replies must not repeat. */
export async function firstTimeSeen(kv: KVNamespace, messageId: string): Promise<boolean> {
  const key = `msg:${messageId}`;
  if (await kv.get(key)) return false;
  await kv.put(key, "1", { expirationTtl: DEDUPE_TTL_SECONDS });
  return true;
}

/** Simple fixed-window limiter: at most `limit` messages per number per hour. */
export async function withinRateLimit(kv: KVNamespace, waId: string, limit: number): Promise<boolean> {
  const key = `rl:${waId}:${Math.floor(Date.now() / 3_600_000)}`;
  const count = Number((await kv.get(key)) ?? "0");
  if (count >= limit) return false;
  await kv.put(key, String(count + 1), { expirationTtl: 3700 });
  return true;
}
