import { AnimatedCounter } from "@/components/effects/animated-counter";
import { stats } from "@/content/cata";

export function CataStats() {
  return (
    <section className="relative z-[1]">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-px bg-border md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-background px-6 py-10 text-center">
            <AnimatedCounter
              value={stat.target}
              suffix={stat.suffix}
              className="block font-heading text-[2.8rem] font-bold leading-none text-accent"
            />
            <span className="mt-2 block text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
