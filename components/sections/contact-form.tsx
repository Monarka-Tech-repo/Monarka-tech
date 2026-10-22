"use client";

import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { ZAPIER_WEBHOOK_URL } from "@/lib/zapier";
import type { Dictionary, Locale } from "@/lib/i18n";

export function ContactForm({
  locale,
  t,
  common,
}: {
  locale: Locale;
  t: Dictionary["contactForm"];
  common: Dictionary["common"];
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await fetch(ZAPIER_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "contacto", locale, name, email, message }),
      });
      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="mx-auto mt-14 flex max-w-2xl flex-col items-center gap-3 rounded-[1.5rem] border border-white/15 bg-white/5 p-10 text-center backdrop-blur-sm">
        <Check aria-hidden className="size-8 text-[#3d8bff]" />
        <p className="text-lg font-semibold text-white">{t.sentTitle}</p>
        <p className="text-sm text-white/55">{t.sentBody}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-14 grid max-w-2xl gap-4 rounded-[1.5rem] border border-white/15 bg-white/5 p-6 backdrop-blur-sm md:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
          {t.name}
          <input
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-xl border border-white/15 bg-transparent px-4 py-3 text-base font-normal normal-case tracking-normal text-white placeholder:text-white/30 focus:border-[#3d8bff] focus:outline-none"
            placeholder={t.namePlaceholder}
          />
        </label>
        <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
          {t.email}
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-xl border border-white/15 bg-transparent px-4 py-3 text-base font-normal normal-case tracking-normal text-white placeholder:text-white/30 focus:border-[#3d8bff] focus:outline-none"
            placeholder={t.emailPlaceholder}
          />
        </label>
      </div>
      <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
        {t.message}
        <textarea
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="resize-none rounded-xl border border-white/15 bg-transparent px-4 py-3 text-base font-normal normal-case leading-6 tracking-normal text-white placeholder:text-white/30 focus:border-[#3d8bff] focus:outline-none"
          placeholder={t.messagePlaceholder}
        />
      </label>
      {status === "error" && (
        <p className="text-sm text-red-400">{common.errorMessage}</p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="group mt-2 inline-flex w-fit items-center gap-3 rounded-full bg-[#3d8bff] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black disabled:opacity-60"
      >
        {status === "sending" ? common.sending : t.submit}
        <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:rotate-45" />
      </button>
    </form>
  );
}
