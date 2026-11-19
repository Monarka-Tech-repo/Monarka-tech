"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";
import { ScaledPreview, type DemoItem, type DemoSites } from "@/components/sections/demo-gallery";

type Copy = Dictionary["designs"]["index"];

// Wait a beat before swapping the preview, so sweeping the cursor across rows
// doesn't boot every demo on the way.
const HOVER_DELAY = 90;

// Previews only on devices with a real pointer and room for the floating card.
const HOVER_QUERY = "(hover: hover) and (min-width: 768px)";
function subscribeHover(onChange: () => void) {
  const mq = window.matchMedia(HOVER_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/**
 * Numbered menu of every demo, centred at the top of /disenos. Hovering a row
 * dims the rest and floats a live preview in the corner; clicking opens the
 * full-screen viewer.
 */
export function DesignsIndex({
  t,
  items,
  sites,
  industryOf,
  onOpen,
}: {
  t: Copy;
  items: DemoItem[];
  sites: DemoSites | null;
  industryOf: (item: DemoItem) => string;
  onOpen: (index: number) => void;
}) {
  const [active, setActive] = useState<number | null>(null);
  const [preview, setPreview] = useState<number | null>(null);
  const canHover = useSyncExternalStore(subscribeHover, () => window.matchMedia(HOVER_QUERY).matches, () => false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setPreview(active), active === null ? 0 : HOVER_DELAY);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [active]);

  const previewItem = canHover && preview !== null ? items[preview] : undefined;
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="mx-auto max-w-5xl pt-20 md:pt-28">
      <div className="mb-10 text-center">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#176cff]">{t.eyebrow}</p>
        <h2 className="text-[clamp(2.4rem,4.5vw,4rem)] font-medium leading-[0.95] tracking-[-0.05em]">
          {t.title}
          <sup className="ml-1 align-super text-[0.4em] tracking-normal text-black/40">({items.length})</sup>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-black/50">{t.hint}</p>
      </div>

      <div
        aria-hidden
        className="grid grid-cols-[3.5rem_1fr_auto] gap-x-4 border-b-2 border-black py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-black/45 md:grid-cols-[5rem_1fr_14rem_4rem]"
      >
        <span>{t.num}</span>
        <span>{t.project}</span>
        <span className="hidden md:block">{t.type}</span>
        <span className="text-right">{t.open}</span>
      </div>

      <ol onPointerLeave={() => setActive(null)}>
        {items.map((item, i) => {
          const dimmed = active !== null && active !== i;
          const on = active === i;
          return (
            <li key={item.slug}>
              <button
                type="button"
                disabled={!sites}
                aria-haspopup="dialog"
                aria-label={`${pad(i + 1)} ${item.name}, ${item.category}. ${t.open}`}
                onClick={() => onOpen(i)}
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className={`grid w-full grid-cols-[3.5rem_1fr_auto] items-baseline gap-x-4 border-b border-black/15 py-5 text-left transition-opacity duration-150 md:grid-cols-[5rem_1fr_14rem_4rem] md:py-6 ${
                  dimmed ? "opacity-30" : "opacity-100"
                }`}
              >
                <span className="relative text-sm font-semibold tabular-nums text-black/50">
                  <span
                    aria-hidden
                    className={`absolute left-0 top-1 size-2.5 rounded-full bg-[#3d8bff] transition-transform duration-300 ${on ? "scale-100" : "scale-0"}`}
                  />
                  <span className={`inline-block transition-[padding] duration-300 ${on ? "pl-5" : ""}`}>{pad(i + 1)}</span>
                </span>

                <span className="min-w-0">
                  <span className={`block text-[clamp(1.4rem,2.6vw,2.2rem)] font-medium leading-none tracking-[-0.035em] transition-colors ${on ? "text-[#176cff]" : ""}`}>
                    {item.name}
                    <span className="text-black/35"> — {item.category}</span>
                  </span>
                  <span className="mt-2 block max-w-xl text-sm leading-6 text-black/50">{item.description}</span>
                  <span className="mt-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-black/40 md:hidden">{industryOf(item)}</span>
                </span>

                <span className="hidden text-sm font-medium text-black/60 md:block">{industryOf(item)}</span>

                <span className="flex justify-end">
                  <ArrowRight
                    aria-hidden
                    className={`size-6 transition-transform duration-300 md:size-7 ${on ? "-rotate-45 translate-x-1 text-[#176cff]" : ""}`}
                  />
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {/* Floating live preview of the hovered demo */}
      <AnimatePresence>
        {previewItem && (
          <motion.div
            key="peek"
            aria-hidden
            initial={{ opacity: 0, y: 24, rotate: 4 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, y: 24, rotate: 4 }}
            transition={{ duration: 0.35, ease: [0.2, 0.7, 0.1, 1] }}
            className="pointer-events-none fixed bottom-6 right-6 z-40 w-[clamp(260px,24vw,420px)] rounded-xl bg-white p-2 shadow-[0_40px_80px_-30px_rgba(0,0,0,.55)] ring-1 ring-black/10"
          >
            <div className="overflow-hidden rounded-lg">
              <ScaledPreview key={previewItem.slug} html={sites?.[previewItem.slug]} title={previewItem.name} active />
            </div>
            <p className="px-1 pb-0.5 pt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-black/50">
              {pad((preview ?? 0) + 1)} {previewItem.name}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
