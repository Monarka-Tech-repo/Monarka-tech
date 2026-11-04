import { describe, expect, it } from "vitest";
import { computeSlots, parseBusinessHours, zonedTimeToUtc, type BusinessHours } from "../src/slots";

const TZ = "America/Denver";
const hours: BusinessHours = { "1": ["09:00", "12:00"], "3": ["09:00", "10:00"] }; // Mon + Wed
const base = { timeZone: TZ, hours, slotMinutes: 30, busy: [], minLeadMinutes: 120, horizonDays: 30 };
// Sunday 2026-11-08 08:00 Denver (after DST ends Nov 1 → UTC-7)
const now = new Date("2026-11-08T15:00:00Z");

describe("zonedTimeToUtc", () => {
  it("handles standard and daylight time", () => {
    expect(zonedTimeToUtc("2026-11-09", "09:00", TZ).toISOString()).toBe("2026-11-09T16:00:00.000Z");
    expect(zonedTimeToUtc("2026-07-06", "09:00", TZ).toISOString()).toBe("2026-07-06T15:00:00.000Z");
  });
});

describe("computeSlots", () => {
  it("lists every slot of an open day", () => {
    const r = computeSlots({ ...base, date: "2026-11-09", now });
    expect(r.ok && r.slots.map((s) => s.label)).toEqual(["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"]);
  });

  it("removes slots overlapping busy events", () => {
    const busy = [{ start: new Date("2026-11-09T16:15:00Z"), end: new Date("2026-11-09T17:00:00Z") }]; // 09:15–10:00
    const r = computeSlots({ ...base, date: "2026-11-09", now, busy });
    expect(r.ok && r.slots.map((s) => s.label)).toEqual(["10:00", "10:30", "11:00", "11:30"]);
  });

  it("respects minimum notice on the same day", () => {
    const monday0930 = new Date("2026-11-09T16:30:00Z");
    const r = computeSlots({ ...base, date: "2026-11-09", now: monday0930 });
    expect(r.ok && r.slots.map((s) => s.label)).toEqual(["11:30"]);
  });

  it("rejects closed, past, far-future and invalid dates", () => {
    expect(computeSlots({ ...base, date: "2026-11-10", now })).toEqual({ ok: false, reason: "closed" });
    expect(computeSlots({ ...base, date: "2026-11-01", now })).toEqual({ ok: false, reason: "past_date" });
    expect(computeSlots({ ...base, date: "2027-01-04", now })).toEqual({ ok: false, reason: "beyond_horizon" });
    expect(computeSlots({ ...base, date: "2026-02-30", now })).toEqual({ ok: false, reason: "invalid_date" });
    expect(computeSlots({ ...base, date: "next monday", now })).toEqual({ ok: false, reason: "invalid_date" });
  });
});

describe("parseBusinessHours", () => {
  it("accepts valid config and rejects bad shapes", () => {
    expect(parseBusinessHours('{"1":["09:00","17:00"]}')).toEqual({ "1": ["09:00", "17:00"] });
    expect(() => parseBusinessHours('{"7":["09:00","17:00"]}')).toThrow();
    expect(() => parseBusinessHours('{"1":["9am","5pm"]}')).toThrow();
  });
});
