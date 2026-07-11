import Image from "next/image";
import { RevealOnScroll } from "@/components/effects/reveal-on-scroll";
import { cataTags, dishGrid } from "@/content/home";
import { cn } from "@/lib/utils";

export function FeaturedCata() {
  return (
    <section id="cata" className="border-t border-border px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl text-center">
        <RevealOnScroll>
          <p className="mb-8 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            App Insignia — Monarka TECH
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.08}>
          <div className="mb-8 flex justify-center">
            <Image
              src="/assets/cata/cata-logo.png"
              alt="CATA"
              width={200}
              height={64}
              className="h-[clamp(40px,7vw,64px)] w-auto object-contain"
            />
          </div>
        </RevealOnScroll>
        <RevealOnScroll delay={0.14}>
          <h2 className="mx-auto mb-6 max-w-[680px] text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.1] tracking-tight">
            Collect the world,
            <br />
            one dish at a time.
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={0.2}>
          <p className="mx-auto mb-10 max-w-[540px] text-[clamp(0.9375rem,1.5vw,1.125rem)] leading-relaxed text-muted-foreground">
            CATA transforma cada comida en una experiencia memorable.
            Registra platillos, construye tu colección, descubre
            restaurantes y conéctate con una comunidad que comparte tu
            pasión.
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.26}>
          <div className="mb-16 flex flex-wrap justify-center gap-2">
            {cataTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border-2 bg-secondary px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-muted-foreground/40 hover:text-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.32}>
          <div className="mx-auto grid max-w-[860px] grid-cols-2 gap-3 sm:grid-cols-3">
            {dishGrid.map((dish) => (
              <div
                key={dish.name}
                className={cn(
                  "group overflow-hidden rounded-3xl border border-border bg-secondary transition-transform duration-300 hover:scale-[1.02]",
                  dish.tall && "row-span-2"
                )}
              >
                <div
                  className={cn(
                    "relative w-full overflow-hidden",
                    dish.tall ? "h-full min-h-[220px]" : "aspect-[3/4]"
                  )}
                >
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    sizes="(min-width: 640px) 280px, 45vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                  />
                </div>
                <div className="p-4">
                  <div className="mb-1 text-[13px] font-bold tracking-tight">
                    {dish.name}
                  </div>
                  <span
                    className={cn(
                      "inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                      dish.badgeClass
                    )}
                  >
                    {dish.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
