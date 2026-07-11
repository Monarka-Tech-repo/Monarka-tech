import { RevealOnScroll } from "@/components/effects/reveal-on-scroll";
import { homeFeatures } from "@/content/home";

export function FeatureGrid() {
  return (
    <section
      id="features"
      className="border-t border-border bg-surface-1 px-6 py-28 md:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <RevealOnScroll>
          <div className="mb-16">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Funciones
            </p>
            <h2 className="max-w-[580px] text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-[1.12] tracking-tight">
              Todo lo que necesitas
              <br />
              para vivir{" "}
              <em className="not-italic italic text-muted-foreground">
                la gastronomía.
              </em>
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-3">
          {homeFeatures.map((feature, i) => (
            <RevealOnScroll key={feature.title} delay={(i % 3) * 0.08}>
              <div className="h-full bg-surface-1 p-8 transition-colors hover:bg-secondary">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-border-2 bg-surface-3 text-lg">
                  {feature.icon}
                </div>
                <div className="mb-2 font-mono text-[10px] text-muted-foreground/50">
                  {feature.num}
                </div>
                <div className="mb-1.5 text-base font-bold tracking-tight">
                  {feature.title}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.desc}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
