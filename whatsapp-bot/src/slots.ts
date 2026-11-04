// Pure scheduling helpers: business hours + busy intervals -> bookable slots.
// No I/O here so it can be unit-tested without Google or Cloudflare.

/** Weekday (0 = Sunday … 6 = Saturday) -> [open "HH:MM", close "HH:MM"]. Missing day = closed. */
export type BusinessHours = Partial<Record<"0" | "1" | "2" | "3" | "4" | "5" | "6", [string, string]>>;

export type Interval = { start: Date; end: Date };
export type Slot = { start: string; end: string; label: string };

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;

export function isValidDate(date: string): boolean {
  if (!DATE_RE.test(date)) return false;
  const [y, m, d] = date.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d;
}

/** Offset (ms) of `timeZone` from UTC at the given instant. */
function tzOffsetMs(instant: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(instant);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  const asUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"), get("second"));
  return asUtc - Math.floor(instant.getTime() / 1000) * 1000;
}

/** Wall-clock time in `timeZone` -> the real instant. Handles DST by re-checking the offset. */
export function zonedTimeToUtc(date: string, time: string, timeZone: string): Date {
  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  const guess = Date.UTC(y, m - 1, d, hh, mm);
  let result = guess - tzOffsetMs(new Date(guess), timeZone);
  result = guess - tzOffsetMs(new Date(result), timeZone);
  return new Date(result);
}

/** Today's date (YYYY-MM-DD) in `timeZone`. */
export function localDate(instant: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(instant);
}

export function localTimeLabel(instant: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("en-GB", { timeZone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(instant);
}

function weekday(date: string): number {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

function daysBetween(a: string, b: string): number {
  const toUtc = (s: string) => {
    const [y, m, d] = s.split("-").map(Number);
    return Date.UTC(y, m - 1, d);
  };
  return Math.round((toUtc(b) - toUtc(a)) / 86_400_000);
}

export type SlotOptions = {
  date: string;
  timeZone: string;
  hours: BusinessHours;
  slotMinutes: number;
  busy: Interval[];
  now: Date;
  /** Minimum notice before a slot can be booked. */
  minLeadMinutes: number;
  /** How far ahead (in days) bookings are allowed. */
  horizonDays: number;
};

export type SlotResult =
  | { ok: true; slots: Slot[] }
  | { ok: false; reason: "invalid_date" | "past_date" | "beyond_horizon" | "closed" };

/** The [start, end) window of `date` in which slots may exist, or a reason it has none. */
export function dayWindow(opts: Pick<SlotOptions, "date" | "timeZone" | "hours" | "now" | "horizonDays">):
  | { ok: true; open: Date; close: Date }
  | { ok: false; reason: "invalid_date" | "past_date" | "beyond_horizon" | "closed" } {
  const { date, timeZone, hours, now, horizonDays } = opts;
  if (!isValidDate(date)) return { ok: false, reason: "invalid_date" };
  const ahead = daysBetween(localDate(now, timeZone), date);
  if (ahead < 0) return { ok: false, reason: "past_date" };
  if (ahead > horizonDays) return { ok: false, reason: "beyond_horizon" };
  const window = hours[String(weekday(date)) as keyof BusinessHours];
  if (!window || !TIME_RE.test(window[0]) || !TIME_RE.test(window[1])) return { ok: false, reason: "closed" };
  return { ok: true, open: zonedTimeToUtc(date, window[0], timeZone), close: zonedTimeToUtc(date, window[1], timeZone) };
}

export function computeSlots(opts: SlotOptions): SlotResult {
  const win = dayWindow(opts);
  if (!win.ok) return win;

  const step = opts.slotMinutes * 60_000;
  const earliest = opts.now.getTime() + opts.minLeadMinutes * 60_000;
  const slots: Slot[] = [];
  for (let t = win.open.getTime(); t + step <= win.close.getTime(); t += step) {
    const end = t + step;
    if (t < earliest) continue;
    const overlaps = opts.busy.some((b) => b.start.getTime() < end && b.end.getTime() > t);
    if (overlaps) continue;
    const start = new Date(t);
    slots.push({ start: start.toISOString(), end: new Date(end).toISOString(), label: localTimeLabel(start, opts.timeZone) });
  }
  return { ok: true, slots };
}

export function parseBusinessHours(raw: string): BusinessHours {
  const parsed: unknown = JSON.parse(raw);
  if (!parsed || typeof parsed !== "object") throw new Error("BUSINESS_HOURS must be a JSON object");
  const out: BusinessHours = {};
  for (const [day, value] of Object.entries(parsed as Record<string, unknown>)) {
    if (!/^[0-6]$/.test(day)) throw new Error(`BUSINESS_HOURS: invalid weekday "${day}"`);
    if (!Array.isArray(value) || value.length !== 2 || !value.every((v) => typeof v === "string" && TIME_RE.test(v))) {
      throw new Error(`BUSINESS_HOURS: day ${day} must be ["HH:MM","HH:MM"]`);
    }
    out[day as keyof BusinessHours] = [value[0], value[1]];
  }
  return out;
}
