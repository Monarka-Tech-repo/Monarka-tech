"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";

type TextCard = { kind: "text"; num: string; title: string; description: string };
type VideoCard = { kind: "video"; num: string; title: string; src: string };
type LinkCard = { kind: "link"; num: string; title: string; description: string; href: string };
type Card = TextCard | VideoCard | LinkCard;

function buildCards(t: Dictionary["capabilities"], studioHref: string): Card[] {
  return [
    { kind: "text", num: "01", ...t.digitalProducts },
    { kind: "text", num: "02", ...t.apps },
    { kind: "video", num: "03", ...t.motion, src: "/assets/Copy of SOFTWARE PROPOSALS .mp4" },
    { kind: "text", num: "04", ...t.automation },
    { kind: "text", num: "05", ...t.support },
    { kind: "link", num: "06", ...t.studio, href: studioHref },
  ];
}

function setBoost(active: boolean) {
  window.dispatchEvent(new CustomEvent("stripe-warp-boost", { detail: { active } }));
}

function CardShell({
  num,
  i,
  children,
}: {
  num: string;
  i: number;
  children: React.ReactNode;
}) {
  return (
    <div
      onMouseEnter={() => setBoost(true)}
      onMouseLeave={() => setBoost(false)}
      style={{ animation: "card-float 4.5s ease-in-out infinite", animationDelay: `${i * 0.3}s` }}
      className="flex w-[320px] shrink-0 flex-col overflow-hidden rounded-[1.5rem] border border-white/15 bg-white/[0.03] transition-colors hover:border-[#3d8bff]/50 hover:bg-white/[0.06] md:w-[380px]"
    >
      <span className="px-8 pt-8 text-xs font-semibold text-white/35 md:px-10 md:pt-10">{num}</span>
      {children}
    </div>
  );
}

export function CapabilitiesCarousel({
  t,
  studioHref,
}: {
  t: Dictionary["capabilities"];
  studioHref: string;
}) {
  const cards = buildCards(t, studioHref);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateProgress = () => {
      const max = track.scrollWidth - track.clientWidth;
      setProgress(max > 0 ? track.scrollLeft / max : 0);
    };
    updateProgress();

    // Turns vertical mouse-wheel input into horizontal scroll while there's
    // still room to travel in that direction — once the track hits either
    // end, the event passes through untouched and the page scrolls normally.
    const onWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      const atStart = track.scrollLeft <= 0;
      const atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 1;

      if ((delta > 0 && !atEnd) || (delta < 0 && !atStart)) {
        e.preventDefault();
        track.scrollLeft += delta;
      }
    };

    track.addEventListener("wheel", onWheel, { passive: false });
    track.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      track.removeEventListener("wheel", onWheel);
      track.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div>
      <div
        className="-mx-5 overflow-hidden md:-mx-10"
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto px-5 pb-4 [scrollbar-width:none] md:px-10 [&::-webkit-scrollbar]:hidden"
        >
          {cards.map((card, i) => (
            <CardShell key={card.num} num={card.num} i={i}>
              {card.kind === "text" && (
                <div className="px-8 pb-8 pt-4 md:px-10 md:pb-10">
                  <h3 className="text-3xl font-medium tracking-[-0.04em] transition-colors hover:text-[#72aaff] md:text-4xl">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-white/50 md:text-base">{card.description}</p>
                </div>
              )}
              {card.kind === "video" && (
                <div className="flex flex-1 flex-col justify-between">
                  <div className="relative mt-4 aspect-square overflow-hidden bg-black">
                    <video
                      src={card.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <p className="px-8 py-6 text-sm font-semibold text-white/70 md:px-10">{card.title}</p>
                </div>
              )}
              {card.kind === "link" && (
                <a href={card.href} className="group/link flex flex-1 flex-col justify-between px-8 pb-8 pt-4 md:px-10 md:pb-10">
                  <div>
                    <h3 className="flex items-center gap-2 text-3xl font-medium tracking-[-0.04em] transition-colors group-hover/link:text-[#72aaff] md:text-4xl">
                      {card.title}
                      <ArrowUpRight aria-hidden className="size-6 shrink-0 transition-transform group-hover/link:rotate-45" />
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-white/50 md:text-base">{card.description}</p>
                  </div>
                </a>
              )}
            </CardShell>
          ))}
          {/* Trailing spacer so the last card can clear the right-edge mask */}
          <div aria-hidden className="w-1 shrink-0 md:w-6" />
        </div>
      </div>

      <div className="mx-auto mt-6 h-1 w-full max-w-xs overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-[#3d8bff] transition-[width] duration-150 ease-out"
          style={{ width: `${Math.max(8, progress * 100)}%` }}
        />
      </div>
    </div>
  );
}
