"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Maximize2 } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";
import { ScaledPreview, useDemoSites, Viewer, type DemoCopy } from "@/components/sections/demo-gallery";

type Copy = Dictionary["studio"]["webDesign"];

const ROTATE_MS = 8000;

/** Desktop monitor showing the real demo sites from the Demo Webpage builder. */
export function WebDesignShowcase({ t, demos, ctaHref }: { t: Copy; demos: DemoCopy; ctaHref: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const sites = useDemoSites(rootRef);
  const reduceMotion = useReducedMotion();
  const items = demos.items.filter((item) => !sites || sites[item.slug]);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const current = items[Math.min(active, items.length - 1)];

  // Rotate between demos (only when there's more than one and nobody is looking closely).
  useEffect(() => {
    if (items.length < 2 || hovered || reduceMotion || open !== null) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % items.length), ROTATE_MS);
    return () => window.clearInterval(id);
  }, [items.length, hovered, reduceMotion, open]);

  const onMove = (e: React.PointerEvent) => {
    if (reduceMotion || !tiltRef.current) return;
    const r = tiltRef.current.getBoundingClientRect();
    tiltRef.current.style.setProperty("--mx", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    tiltRef.current.style.setProperty("--my", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  };
  const onLeave = () => {
    setHovered(false);
    tiltRef.current?.style.setProperty("--mx", "0");
    tiltRef.current?.style.setProperty("--my", "0");
  };

  return (
    <div ref={rootRef} className="grid items-center gap-16 lg:grid-cols-[.8fr_1.2fr]">
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#176cff]">{t.eyebrow}</p>
        <h2 className="text-[clamp(2.6rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.055em]">{t.title}</h2>
        <p className="mt-6 max-w-lg text-lg leading-8 text-black/60">{t.body}</p>
        <ul className="mt-8 grid gap-3">
          {t.points.map((point) => (
            <li key={point} className="flex items-start gap-3 text-base text-black/75">
              <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-[#3d8bff]" />
              {point}
            </li>
          ))}
        </ul>
        <a
          href={ctaHref}
          className="group mt-10 inline-flex items-center gap-3 rounded-full bg-[#090909] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3d8bff]"
        >
          {t.cta}
          <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:rotate-45" />
        </a>
      </div>

      <div>
        <div className="mx-auto w-full max-w-[780px] [perspective:1600px]">
          <div
            ref={tiltRef}
            onPointerMove={onMove}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={onLeave}
            className="transition-transform duration-300 ease-out"
            style={{ transform: "rotateY(calc(var(--mx, 0) * 5deg)) rotateX(calc(var(--my, 0) * -4deg))" } as CSSProperties}
          >
            {/* monitor */}
            <button
              type="button"
              onClick={() => current && setOpen(items.indexOf(current))}
              onFocus={() => setHovered(true)}
              onBlur={() => setHovered(false)}
              disabled={!sites || !current}
              aria-haspopup="dialog"
              aria-label={current ? `${demos.open}: ${current.name}` : undefined}
              className="group block w-full rounded-[1.4rem] bg-[#1a1a1c] p-[1.6%] text-left shadow-[0_50px_90px_-35px_rgba(0,0,0,0.55)] ring-1 ring-black/10"
            >
              <div className="overflow-hidden rounded-[0.6rem] bg-white">
                <div className="flex items-center gap-2 border-b border-black/10 bg-[#f1f1f3] px-4 py-2.5">
                  <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="size-2.5 rounded-full bg-[#febc2e]" />
                  <span className="size-2.5 rounded-full bg-[#28c840]" />
                  <span className="ml-3 flex-1 truncate rounded-full bg-white px-3 py-1 text-center text-[11px] text-black/45">
                    {current ? `${current.name} · ${current.category}` : ""}
                  </span>
                  <Maximize2 aria-hidden className="size-3.5 text-black/40 transition-colors group-hover:text-black" />
                </div>
                <div className="relative">
                  {/* All demos stay mounted and stacked; the active one fades in on top. */}
                  {items.length === 0 && <ScaledPreview title="" active={false} />}
                  {items.map((item, i) => (
                    <motion.div
                      key={item.slug}
                      className={i === 0 ? "relative" : "absolute inset-0"}
                      initial={false}
                      animate={{ opacity: item === current ? 1 : 0, zIndex: item === current ? 1 : 0 }}
                      transition={{ opacity: { duration: 0.6, delay: item === current ? 0 : 0.6 }, zIndex: { duration: 0 } }}
                    >
                      <ScaledPreview html={sites?.[item.slug]} title={item.name} active={hovered && item === current} />
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="h-[0.9rem]" />
            </button>
            {/* stand */}
            <div aria-hidden className="mx-auto h-16 w-[18%] bg-gradient-to-b from-[#c9c9cd] to-[#a9a9ae] [clip-path:polygon(12%_0,88%_0,100%_100%,0_100%)]" />
            <div aria-hidden className="mx-auto h-2.5 w-[34%] rounded-full bg-[#b9b9be] shadow-[0_10px_20px_-8px_rgba(0,0,0,0.4)]" />
          </div>
        </div>

        <p className="mt-6 text-center text-xs uppercase tracking-[0.14em] text-black/45">{t.screenHint}</p>

        {items.length > 1 && (
          <div role="tablist" aria-label={demos.eyebrow} className="mt-5 flex flex-wrap justify-center gap-2">
            {items.map((item, i) => (
              <button
                key={item.slug}
                type="button"
                role="tab"
                aria-selected={item === current}
                onClick={() => setActive(i)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${
                  item === current ? "border-black bg-black text-white" : "border-black/15 text-black/60 hover:border-black/40 hover:text-black"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {open !== null && sites && (
        <Viewer items={items} index={open} sites={sites} t={demos} onClose={() => setOpen(null)} onNavigate={setOpen} />
      )}
    </div>
  );
}
