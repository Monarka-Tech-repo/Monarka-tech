import { RevealOnScroll } from "@/components/effects/reveal-on-scroll";
import type { SvcCard } from "@/content/cata";
import { cn } from "@/lib/utils";

export function SvcGrid({
  cards,
  columns = 3,
}: {
  cards: SvcCard[];
  columns?: 2 | 3;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-5 sm:grid-cols-2",
        columns === 3 && "lg:grid-cols-3"
      )}
    >
      {cards.map((card, i) => (
        <RevealOnScroll key={card.name} delay={(i % columns) * 0.06}>
          <div className="group relative overflow-hidden rounded-xl border border-border bg-background p-7 transition-all hover:-translate-y-1 hover:border-border-2">
            <div className="mb-3 font-heading text-[9px] tracking-[0.2em] text-brand-dim">
              {card.num}
            </div>
            <div className="mb-3.5 flex h-[50px] w-[50px] items-center justify-center rounded-[10px] border border-border text-xl transition-colors group-hover:border-accent/30 group-hover:bg-accent/[0.07]">
              {card.icon}
            </div>
            <div className="mb-2 font-heading text-[11px] font-bold tracking-[0.1em] text-accent">
              {card.name}
            </div>
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">
              {card.text}
            </p>
            <div className="mt-3.5 flex flex-wrap gap-1.5">
              {card.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-surface-2 px-2 py-0.5 text-[9px] tracking-wide text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      ))}
    </div>
  );
}
