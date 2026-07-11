import { RevealOnScroll } from "@/components/effects/reveal-on-scroll";

export function SectionHeading({
  eyebrow,
  title,
  accent,
  desc,
  center,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  desc: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : ""}>
      <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-brand-teal">
        {eyebrow}
      </p>
      <RevealOnScroll>
        <h2 className="mb-3.5 font-heading text-[clamp(1.4rem,2.4vw,2.1rem)] font-black leading-tight text-white">
          {title} <span className="text-accent">{accent}</span>
        </h2>
      </RevealOnScroll>
      <RevealOnScroll delay={0.08}>
        <p
          className={
            center
              ? "mx-auto mb-12 max-w-xl text-[15px] leading-[1.78] text-muted-foreground"
              : "mb-12 max-w-xl text-[15px] leading-[1.78] text-muted-foreground"
          }
        >
          {desc}
        </p>
      </RevealOnScroll>
    </div>
  );
}
