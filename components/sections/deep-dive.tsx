import Image from "next/image";
import Link from "next/link";
import { RevealOnScroll } from "@/components/effects/reveal-on-scroll";
import { deepDiveRows, restaurantPerks } from "@/content/home";
import { cn } from "@/lib/utils";

export function DeepDive() {
  return (
    <section className="border-t border-border px-6 py-28 md:py-36">
      <div className="mx-auto flex max-w-6xl flex-col gap-24 md:gap-32">
        {deepDiveRows.map((row) => (
          <RevealOnScroll key={row.eyebrow}>
            <div
              className={cn(
                "grid items-center gap-12 md:grid-cols-2 md:gap-20",
                row.flip && "md:[direction:rtl]"
              )}
            >
              <div className="md:[direction:ltr]">
                <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                  {row.eyebrow}
                </p>
                <h3 className="mb-4 text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-[1.15] tracking-tight">
                  {row.title}
                </h3>
                <p className="mb-8 max-w-[420px] text-base leading-relaxed text-muted-foreground">
                  {row.body}
                </p>
                <Link
                  href={row.linkHref}
                  className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-accent transition-all hover:gap-2.5"
                >
                  {row.linkLabel}
                </Link>
              </div>
              <div className="md:[direction:ltr]">
                <div className="overflow-hidden rounded-3xl border border-border bg-surface-2 shadow-[0_30px_80px_rgba(0,0,0,.4)]">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={row.image}
                      alt={row.cardTitle}
                      fill
                      sizes="(min-width: 768px) 480px, 90vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-1 text-sm font-bold">
                      {row.cardTitle}
                    </div>
                    <div className="text-[13px] text-muted-foreground">
                      {row.cardSub}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        ))}

        <RevealOnScroll>
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                Para Restaurantes
              </p>
              <h3 className="mb-4 text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-[1.15] tracking-tight">
                Tu restaurante, con presencia real en CATA.
              </h3>
              <p className="mb-8 max-w-[420px] text-base leading-relaxed text-muted-foreground">
                Reclama tu página, publica tu menú oficial, sigue las
                reseñas de la comunidad en tiempo real y conecta
                directamente con tus comensales. Sin costo para comenzar.
              </p>
              <Link
                href="/products/cata#restaurantes"
                className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-accent transition-all hover:gap-2.5"
              >
                Ver funciones para restaurantes →
              </Link>
            </div>
            <div className="rounded-3xl border border-border bg-surface-2 p-7 shadow-[0_30px_80px_rgba(0,0,0,.4)]">
              <div className="mb-5 inline-flex items-center gap-1.5 rounded-lg border border-brand-gold/20 bg-brand-gold/10 px-3.5 py-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gold">
                  ✓ CATA Venue
                </span>
              </div>
              <div className="flex flex-col gap-2.5">
                {restaurantPerks.map((perk) => (
                  <div key={perk.name} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border-2 bg-surface-3 text-sm">
                      {perk.icon}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">
                        {perk.name}
                      </div>
                      <div className="text-xs text-muted-foreground/70">
                        {perk.sub}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
