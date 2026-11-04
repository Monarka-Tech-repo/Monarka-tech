import { describe, expect, it } from "vitest";
import { parseIncoming, verifySignature } from "../src/whatsapp";
import { trimHistory, type Turn } from "../src/store";

async function sign(secret: string, body: string) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(body)));
  return "sha256=" + [...sig].map((b) => b.toString(16).padStart(2, "0")).join("");
}

describe("verifySignature", () => {
  it("accepts a correct signature and rejects tampering", async () => {
    const body = '{"a":1}';
    const header = await sign("secret", body);
    expect(await verifySignature("secret", body, header)).toBe(true);
    expect(await verifySignature("secret", '{"a":2}', header)).toBe(false);
    expect(await verifySignature("other", body, header)).toBe(false);
    expect(await verifySignature("secret", body, null)).toBe(false);
    expect(await verifySignature("secret", body, "sha256=zz")).toBe(false);
  });
});

describe("parseIncoming", () => {
  it("extracts text and non-text messages, ignores status updates", () => {
    const payload = {
      entry: [{ changes: [{ value: {
        contacts: [{ wa_id: "19155550123", profile: { name: "Ana" } }],
        messages: [
          { id: "m1", from: "19155550123", type: "text", text: { body: "  Hola  " } },
          { id: "m2", from: "19155550123", type: "image" },
          { id: "m3", from: "not-a-number", type: "text", text: { body: "x" } },
        ],
      } }, { value: { statuses: [{ id: "s1" }] } }] }],
    };
    expect(parseIncoming(payload)).toEqual([
      { id: "m1", from: "19155550123", name: "Ana", text: "Hola" },
      { id: "m2", from: "19155550123", name: "Ana", text: null },
    ]);
    expect(parseIncoming(null)).toEqual([]);
  });
});

describe("trimHistory", () => {
  it("keeps the last 20 turns and starts on a user turn", () => {
    const turns: Turn[] = Array.from({ length: 25 }, (_, i) => ({ role: i % 2 ? "assistant" : "user", text: String(i) }));
    const trimmed = trimHistory(turns);
    expect(trimmed[0].role).toBe("user");
    expect(trimmed.length).toBeLessThanOrEqual(20);
    expect(trimmed.at(-1)?.text).toBe("24");
  });
});
