"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";

export function FaqSection({ items }: { items: Dictionary["faq"] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-3xl">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="border-b border-white/15">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-6 text-left"
            >
              <span className="text-xl font-medium tracking-[-0.02em] md:text-2xl">{item.q}</span>
              <ChevronDown
                aria-hidden
                className={`size-5 shrink-0 text-white/50 transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className="grid overflow-hidden transition-all duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="max-w-xl pb-6 text-sm leading-6 text-white/55 md:text-base">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
