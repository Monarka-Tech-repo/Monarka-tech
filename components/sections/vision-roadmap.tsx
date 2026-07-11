import { RevealOnScroll } from "@/components/effects/reveal-on-scroll";
import { roadmap } from "@/content/about";
import { cn } from "@/lib/utils";

export function VisionRoadmap() {
  return (
    <section
      id="vision"
      className="border-t border-border px-6 py-28 md:py-36"
    >
      <div className="mx-auto max-w-3xl text-center">
        <RevealOnScroll>
          <p className="mb-12 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/60">
            Visión · Monarka TECH
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.08}>
          <h2 className="mb-7 text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.25] tracking-tight">
            &ldquo;La mejor comida del mundo
            <br />
            merece ser{" "}
            <span className="text-accent">
              recordada, coleccionada y compartida.
            </span>
            &rdquo;
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={0.16}>
          <p className="mx-auto mb-16 max-w-xl text-[17px] leading-relaxed text-muted-foreground">
            En Monarka creemos que el software más poderoso es el que se
            integra naturalmente en la vida de las personas. CATA es el
            primer paso: una herramienta que convierte algo tan cotidiano
            como comer en una experiencia memorable y coleccionable.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.24}>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-border bg-border text-left md:grid-cols-3">
            {roadmap.map((item) => (
              <div
                key={item.phase}
                className="bg-surface-1 p-8 transition-colors hover:bg-secondary"
              >
                <div className="mb-3 font-mono text-[10px] tracking-wider text-muted-foreground/50">
                  {item.phase}
                </div>
                <div className="mb-2 text-base font-bold tracking-tight">
                  {item.title}
                </div>
                <p className="mb-4 text-[13px] leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider",
                    item.active ? "text-brand-green" : "text-muted-foreground/50"
                  )}
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      item.active ? "animate-pulse bg-brand-green" : "bg-border-2"
                    )}
                  />
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
