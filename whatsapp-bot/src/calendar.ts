// Google Calendar via a service account (the calendar is shared with the
// service account's email, permission "Make changes to events").

import type { Interval } from "./slots";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const CALENDAR_URL = "https://www.googleapis.com/calendar/v3";
const SCOPE = "https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.freebusy";

type ServiceAccount = { client_email: string; private_key: string };

let cachedToken: { value: string; expiresAt: number } | null = null;

function base64url(input: ArrayBuffer | string): string {
  const bytes = typeof input === "string" ? new TextEncoder().encode(input) : new Uint8Array(input);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function importPrivateKey(pem: string): Promise<CryptoKey> {
  const body = pem.replace(/-----(BEGIN|END) PRIVATE KEY-----/g, "").replace(/\s+/g, "");
  const der = Uint8Array.from(atob(body), (c) => c.charCodeAt(0));
  return crypto.subtle.importKey("pkcs8", der, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"]);
}

async function accessToken(serviceAccountJson: string): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) return cachedToken.value;

  const sa = JSON.parse(serviceAccountJson) as ServiceAccount;
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64url(JSON.stringify({ iss: sa.client_email, scope: SCOPE, aud: TOKEN_URL, iat: now, exp: now + 3600 }));
  const key = await importPrivateKey(sa.private_key);
  const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(`${header}.${claims}`));
  const assertion = `${header}.${claims}.${base64url(signature)}`;

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Google token ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const data = (await res.json()) as { access_token: string; expires_in: number };
  cachedToken = { value: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 };
  return data.access_token;
}

export type CalendarConfig = { serviceAccountJson: string; calendarId: string; timeZone: string };

async function call<T>(config: CalendarConfig, path: string, body: unknown): Promise<T> {
  const token = await accessToken(config.serviceAccountJson);
  const res = await fetch(`${CALENDAR_URL}${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Google Calendar ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return (await res.json()) as T;
}

export async function busyIntervals(config: CalendarConfig, timeMin: Date, timeMax: Date): Promise<Interval[]> {
  const data = await call<{ calendars: Record<string, { busy?: { start: string; end: string }[]; errors?: unknown[] }> }>(
    config,
    "/freeBusy",
    { timeMin: timeMin.toISOString(), timeMax: timeMax.toISOString(), timeZone: config.timeZone, items: [{ id: config.calendarId }] },
  );
  const cal = data.calendars[config.calendarId];
  if (!cal || cal.errors?.length) throw new Error(`Google Calendar freeBusy error: ${JSON.stringify(cal?.errors ?? "missing calendar")}`);
  return (cal.busy ?? []).map((b) => ({ start: new Date(b.start), end: new Date(b.end) }));
}

export async function createEvent(
  config: CalendarConfig,
  event: { start: Date; end: Date; summary: string; description: string },
): Promise<{ id: string; htmlLink?: string }> {
  return call(config, `/calendars/${encodeURIComponent(config.calendarId)}/events`, {
    summary: event.summary,
    description: event.description,
    start: { dateTime: event.start.toISOString(), timeZone: config.timeZone },
    end: { dateTime: event.end.toISOString(), timeZone: config.timeZone },
    reminders: { useDefault: true },
  });
}
