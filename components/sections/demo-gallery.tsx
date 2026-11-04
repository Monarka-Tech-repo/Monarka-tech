"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";

type Copy = Dictionary["studio"]["demos"];
type Item = Copy["items"][number];
type Sites = Record<string, string>;

// Previews render the demo at desktop size, then scale it down to the laptop screen.
const DESKTOP_W = 1440;
const DESKTOP_H = 900;

// Added to preview copies only: hides the scrollbar and lets the card scroll the
// demo itself (via postMessage) while hovered, like a visitor would.
const PREVIEW_SCRIPT = `<style>html{scrollbar-width:none}html::-webkit-scrollbar{display:none}</style>
<script>(()=>{let raf=0,dir=0;addEventListener("message",e=>{const d=e.data;if(!d||typeof d.monarkaPreview!=="boolean")return;
dir=d.monarkaPreview?1:-1;cancelAnimationFrame(raf);const step=()=>{const max=document.documentElement.scrollHeight-innerHeight;
const y=Math.max(0,Math.min(max,scrollY+(dir>0?2.5:-40)));scrollTo({top:y,behavior:"instant"});
if((dir>0&&y<max)||(dir<0&&y>0))raf=requestAnimationFrame(step)};step()})})()</script>`;

function withPreviewScript(html: string) {
  const i = html.lastIndexOf("</body>");
  return i === -1 ? html + PREVIEW_SCRIPT : html.slice(0, i) + PREVIEW_SCRIPT + html.slice(i);
}

/** The demo HTML lives in a separate JS chunk, fetched once the section is near the viewport. */
function useDemoSites(target: React.RefObject<HTMLElement | null>) {
  const [sites, setSites] = useState<Sites | null>(null);
  useEffect(() => {
    const el = target.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        import("@/lib/demo-sites.generated").then((m) => setSites(m.demoSites));
      },
      { rootMargin: "600px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target]);
  return sites;
}

function DemoFrame({
  html,
  title,
  interactive,
  frameRef,
}: {
  html: string;
  title: string;
  interactive: boolean;
  frameRef?: React.Ref<HTMLIFrameElement>;
}) {
  return (
    <iframe
      ref={frameRef}
      srcDoc={html}
      title={title}
      // Scripts run for the animations; no access to this site's origin.
      sandbox="allow-scripts"
      tabIndex={interactive ? 0 : -1}
      aria-hidden={interactive ? undefined : true}
      className={`size-full border-0 ${interactive ? "bg-white" : "pointer-events-none"}`}
    />
  );
}

function ScaledPreview({ html, title, active }: { html?: string; title: string; active: boolean }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [scale, setScale] = useState(0);
  const previewHtml = useMemo(() => (html ? withPreviewScript(html) : undefined), [html]);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / DESKTOP_W));
    ro.observe(box);
    return () => ro.disconnect();
  }, []);

  // Hover/focus scrolls the demo down; leaving scrolls it back to the top.
  useEffect(() => {
    frameRef.current?.contentWindow?.postMessage({ monarkaPreview: active }, "*");
  }, [active]);

  return (
    <div ref={boxRef} className="relative overflow-hidden bg-[#141416]" style={{ aspectRatio: `${DESKTOP_W} / ${DESKTOP_H}` }}>
      {previewHtml && scale > 0 ? (
        <div className="absolute left-0 top-0 origin-top-left" style={{ width: DESKTOP_W, height: DESKTOP_H, transform: `scale(${scale})` }}>
          <DemoFrame html={previewHtml} title={title} interactive={false} frameRef={frameRef} />
        </div>
      ) : (
        <div aria-hidden className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/5 to-white/0" />
      )}
    </div>
  );
}

function Laptop({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* lid */}
      <div className="rounded-t-[1.1rem] rounded-b-[0.35rem] bg-[#0e0e10] p-[2.2%] pb-[2.6%] shadow-[0_40px_70px_-35px_rgba(0,0,0,0.6)] ring-1 ring-black/20">
        <div className="mx-auto mb-[1.2%] size-1.5 rounded-full bg-[#2a2a2e]" />
        <div className="overflow-hidden rounded-[0.3rem]">{children}</div>
      </div>
      {/* base */}
      <div className="relative -mx-[6%] h-3.5 rounded-b-[1.2rem] rounded-t-[0.2rem] bg-gradient-to-b from-[#d9d9de] to-[#a6a6ad] shadow-[0_18px_30px_-12px_rgba(0,0,0,0.45)]">
        <div className="absolute left-1/2 top-0 h-1.5 w-[16%] -translate-x-1/2 rounded-b-md bg-[#8e8e95]" />
      </div>
    </div>
  );
}

function Viewer({
  items,
  index,
  sites,
  t,
  onClose,
  onNavigate,
}: {
  items: Item[];
  index: number;
  sites: Sites;
  t: Copy;
  onClose: () => void;
  onNavigate: (i: number) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const item = items[index];
  const go = useCallback((d: number) => onNavigate((index + d + items.length) % items.length), [index, items.length, onNavigate]);

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prevOverflow;
      prevFocus?.focus();
    };
  }, [onClose, go]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${item.name} · ${item.category}`}
      data-lenis-prevent
      className="fixed inset-0 z-[100] flex flex-col bg-black/85 p-3 backdrop-blur-md md:p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="mb-3 flex items-center justify-between gap-3 text-white">
        <div className="min-w-0">
          <p className="truncate text-lg font-medium tracking-[-0.02em]">{item.name}</p>
          <p className="truncate text-xs uppercase tracking-[0.14em] text-white/50">
            {item.category} · {t.fictionalShort}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button type="button" onClick={() => go(-1)} aria-label={t.prev} className="grid size-10 place-items-center rounded-full border border-white/20 hover:bg-white/10">
            <ArrowLeft aria-hidden className="size-4" />
          </button>
          <button type="button" onClick={() => go(1)} aria-label={t.next} className="grid size-10 place-items-center rounded-full border border-white/20 hover:bg-white/10">
            <ArrowRight aria-hidden className="size-4" />
          </button>
          <button ref={closeRef} type="button" onClick={onClose} aria-label={t.close} className="grid size-10 place-items-center rounded-full bg-white text-black hover:bg-white/85">
            <X aria-hidden className="size-4" />
          </button>
        </div>
      </div>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="flex items-center gap-2 border-b border-black/10 bg-[#f1f1f3] px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="min-h-0 flex-1">
          <DemoFrame key={item.slug} html={sites[item.slug] ?? ""} title={item.name} interactive />
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function DemoGallery({ t }: { t: Copy }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const sites = useDemoSites(rootRef);
  const [open, setOpen] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const items = t.items.filter((item) => !sites || sites[item.slug]);
  // One demo: a single large, centred laptop. Otherwise a wide first laptop only
  // when it fills the 3-column grid evenly (5, 8…).
  const single = items.length === 1;
  const featureFirst = items.length % 3 === 2;

  return (
    <div ref={rootRef}>
      <div className="mb-16 grid gap-6 md:grid-cols-[1fr_.9fr] md:items-end">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#176cff]">{t.eyebrow}</p>
          <h2 className="text-[clamp(2.6rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.055em]">{t.title}</h2>
        </div>
        <div>
          <p className="text-lg leading-8 text-black/60">{t.body}</p>
          <p className="mt-3 text-xs uppercase tracking-[0.14em] text-black/40">{t.fictional}</p>
        </div>
      </div>

      <div className="grid gap-x-10 gap-y-20 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <button
            key={item.slug}
            type="button"
            onClick={() => setOpen(i)}
            disabled={!sites}
            aria-haspopup="dialog"
            onPointerEnter={() => setHovered(i)}
            onPointerLeave={() => setHovered((h) => (h === i ? null : h))}
            onFocus={() => setHovered(i)}
            onBlur={() => setHovered((h) => (h === i ? null : h))}
            className={`group block px-[4%] text-left ${single ? "mx-auto w-full max-w-[1100px] md:col-span-2 lg:col-span-3" : i === 0 && featureFirst ? "md:col-span-2" : ""}`}
          >
            <div className="transition-transform duration-500 group-hover:-translate-y-2">
              <Laptop>
                <ScaledPreview html={sites?.[item.slug]} title={item.name} active={hovered === i} />
              </Laptop>
            </div>
            <div className="mt-7 flex items-start justify-between gap-6">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-semibold text-black/35">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-2xl font-medium tracking-[-0.03em] transition-colors group-hover:text-[#176cff] md:text-3xl">{item.name}</h3>
                  <span className="rounded-full border border-black/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-black/55">
                    {item.category}
                  </span>
                </div>
                <p className="mt-2 max-w-xl text-sm leading-6 text-black/55 md:text-base">{item.description}</p>
              </div>
              <span className="mt-1 inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold">
                {t.open}
                <Maximize2 aria-hidden className="size-4 transition-transform group-hover:scale-110" />
              </span>
            </div>
          </button>
        ))}
      </div>

      {open !== null && sites && (
        <Viewer items={items} index={open} sites={sites} t={t} onClose={() => setOpen(null)} onNavigate={setOpen} />
      )}
    </div>
  );
}
