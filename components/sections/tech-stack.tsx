import { RevealOnScroll } from "@/components/effects/reveal-on-scroll";
import { platforms, techStack } from "@/content/about";

export function TechStack() {
  return (
    <section
      id="tech"
      className="border-t border-border bg-surface-1 px-6 py-28 md:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <RevealOnScroll>
          <div className="mb-16 grid gap-8 md:grid-cols-2">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                Tecnología
              </p>
              <h2 className="text-[clamp(2rem,4vw,2.75rem)] font-extrabold leading-[1.12] tracking-tight">
                Construido
                <br />
                para durar.
              </h2>
            </div>
            <p className="pt-1 text-base leading-relaxed text-muted-foreground">
              CATA está construido sobre tecnología de primer nivel. Desde
              el frontend hasta el backend, cada decisión técnica prioriza
              velocidad, escalabilidad y experiencia de usuario.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <div className="mb-8 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-4">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="bg-surface-1 p-8 text-center transition-colors hover:bg-secondary"
              >
                <span className="mb-3 block text-2xl">{tech.icon}</span>
                <div className="mb-1 text-[13px] font-bold tracking-tight">
                  {tech.name}
                </div>
                <div className="text-xs text-muted-foreground/60">
                  {tech.desc}
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.16}>
          <div className="flex flex-wrap gap-4">
            {platforms.map((platform) => (
              <div
                key={platform}
                className="flex items-center gap-2 rounded-full border border-border-2 bg-secondary px-5 py-2.5 text-[13px] font-semibold"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {platform}
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
