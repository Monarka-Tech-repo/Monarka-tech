"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";
import { DemoCard, useDemoSites, Viewer, type DemoCopy, type DemoItem } from "@/components/sections/demo-gallery";

type Copy = Dictionary["designs"];
type Category = Copy["categories"][number];

function countLabel(t: Copy, n: number) {
  return n === 1 ? t.countOne : t.countMany.replace("{n}", String(n));
}

function ComingSoonCard({ category, t, contactHref, compact }: { category: Category; t: Copy; contactHref: string; compact?: boolean }) {
  return (
    <div className={`flex flex-col justify-between rounded-[1.5rem] border border-dashed border-black/20 bg-white/60 ${compact ? "p-7" : "p-10 md:p-14"}`}>
      <div>
        <span className="inline-flex items-center gap-2 rounded-full bg-[#3d8bff]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#176cff]">
          <Sparkles aria-hidden className="size-3.5" />
          {t.comingSoon.label}
        </span>
        <h3 className={`mt-5 font-medium tracking-[-0.03em] ${compact ? "text-2xl" : "text-3xl md:text-4xl"}`}>{compact ? category.title : t.comingSoon.title}</h3>
        <p className="mt-3 max-w-md text-sm leading-6 text-black/55 md:text-base">{compact ? category.description : t.comingSoon.body}</p>
      </div>
      <a href={contactHref} className="group mt-8 inline-flex w-fit items-center gap-2 text-sm font-semibold hover:text-[#176cff]">
        {t.comingSoon.cta}
        <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:rotate-45" />
      </a>
    </div>
  );
}

export function DesignsCatalog({ t, demos, contactHref }: { t: Copy; demos: DemoCopy; contactHref: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const sites = useDemoSites(rootRef);
  const [open, setOpen] = useState<number | null>(null);

  const items = demos.items.filter((item) => !sites || sites[item.slug]);
  const byType = (id: string) => items.filter((item) => item.type === id);
  const visible = t.categories.filter((c) => byType(c.id).length > 0);
  const empty = t.categories.filter((c) => byType(c.id).length === 0);
  // Viewer arrows move through every demo on the page, in order.
  const viewerItems: DemoItem[] = visible.flatMap((c) => byType(c.id));

  return (
    <div ref={rootRef} className="scroll-mt-24">
      <div className="mx-auto max-w-[1600px]">
        {visible.map((category, ci) => {
          const list = byType(category.id);
          return (
            <section key={category.id} id={category.id} aria-labelledby={`${category.id}-title`} className="scroll-mt-40 border-b border-black/10 py-20 last:border-b-0 md:py-28">
              <div className="mb-14 grid gap-6 md:grid-cols-[auto_1fr_auto] md:items-end md:gap-10">
                <span className="text-sm font-semibold text-black/30">{String(ci + 1).padStart(2, "0")}</span>
                <div>
                  <h2 id={`${category.id}-title`} className="text-[clamp(2.4rem,4.5vw,4rem)] font-medium leading-[0.95] tracking-[-0.05em]">
                    {category.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-black/55 md:text-lg">{category.description}</p>
                </div>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-black/40">{countLabel(t, list.length)}</span>
              </div>

              {list.length > 0 ? (
                <div className="grid gap-x-10 gap-y-20 md:grid-cols-2">
                  {list.map((item, i) => (
                    <DemoCard
                      key={item.slug}
                      item={item}
                      index={i}
                      html={sites?.[item.slug]}
                      ready={!!sites}
                      openLabel={demos.open}
                      onOpen={() => setOpen(viewerItems.indexOf(item))}
                      className={list.length === 1 ? "mx-auto w-full max-w-[1100px] md:col-span-2" : ""}
                    />
                  ))}
                </div>
              ) : (
                <ComingSoonCard category={category} t={t} contactHref={contactHref} />
              )}
            </section>
          );
        })}

        {/* Industries without a design yet, grouped so the page stays short */}
        {empty.length > 0 && (
          <section aria-labelledby="coming-soon-title" className="py-20 md:py-28">
            <div className="mb-12">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#176cff]">{t.comingSoon.label}</p>
              <h2 id="coming-soon-title" className="max-w-3xl text-[clamp(2.2rem,4vw,3.5rem)] font-medium leading-[0.95] tracking-[-0.05em]">
                {t.comingSoon.title}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-black/55 md:text-lg">{t.comingSoon.body}</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {empty.map((category) => (
                <ComingSoonCard key={category.id} category={category} t={t} contactHref={contactHref} compact />
              ))}
            </div>
          </section>
        )}
      </div>

      {open !== null && open >= 0 && sites && (
        <Viewer items={viewerItems} index={open} sites={sites} t={demos} onClose={() => setOpen(null)} onNavigate={setOpen} />
      )}
    </div>
  );
}
