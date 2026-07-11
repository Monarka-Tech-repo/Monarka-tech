import { RevealOnScroll } from "@/components/effects/reveal-on-scroll";
import { AnimatedCounter } from "@/components/effects/animated-counter";
import { aboutMeta, aboutStats } from "@/content/about";

export function AboutIntro() {
  return (
    <section id="about" className="px-6 py-28 md:py-36">
      <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2 md:gap-24">
        <RevealOnScroll>
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/60">
              Nosotros
            </p>
            <h1 className="mb-6 text-[clamp(2rem,4vw,2.75rem)] font-extrabold leading-[1.15] tracking-tight">
              Software premium,
              <br />
              desde El Paso.
            </h1>
            <p className="mb-8 text-base leading-relaxed text-muted-foreground">
              Monarka TECH es una startup de software con sede en El Paso,
              TX. Construimos productos digitales de primer nivel con un
              enfoque obsesivo en la experiencia de usuario, el diseño y
              la calidad técnica. Soñamos en grande. Construimos para
              durar.
            </p>
            <div className="flex flex-wrap gap-8">
              {aboutMeta.map((item) => (
                <div key={item.label}>
                  <div className="mb-1 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground/60">
                    {item.label}
                  </div>
                  <div className="text-[15px] font-bold tracking-tight">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border">
            {aboutStats.map((stat) => (
              <div
                key={stat.label}
                className="bg-secondary p-8 text-center transition-colors hover:bg-surface-3"
              >
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  className="mb-1.5 block text-4xl font-black tracking-tight text-accent"
                />
                <div className="text-[13px] leading-snug text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
            <div className="bg-secondary p-8 text-center transition-colors hover:bg-surface-3">
              <div className="mb-1.5 text-4xl font-black tracking-tight text-accent">
                ∞
              </div>
              <div className="text-[13px] leading-snug text-muted-foreground">
                Ambición. Siempre.
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
