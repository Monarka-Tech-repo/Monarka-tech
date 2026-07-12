import { RevealOnScroll } from "@/components/effects/reveal-on-scroll";
import { SectionHeading } from "@/components/sections/section-heading";
import { SvcGrid } from "@/components/sections/svc-grid";
import { leaderboard, masFuncionesFeatures } from "@/content/cata";
import { cn } from "@/lib/utils";

export function CataLaCarte() {
  return (
    <section id="funciones" className="relative z-[1]">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-28">
        <SectionHeading
          eyebrow="Más Funciones"
          title="Compite, comparte y"
          accent="descubre más"
          desc="CATA tiene mucho más: sube en el Leaderboard de tu ciudad, únete a Communities de foodies, agrupa tus viajes en Food Journeys y usa el Mapa de Restaurantes Visitados para nunca perder un recuerdo."
        />

        <div className="grid items-start gap-10 lg:grid-cols-[1.4fr_1fr]">
          <SvcGrid cards={masFuncionesFeatures} columns={2} />

          <RevealOnScroll delay={0.1}>
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="border-b border-border bg-secondary px-5 py-3.5">
                <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-accent">
                  Leaderboard
                </div>
                <div className="mt-0.5 text-[11px] text-muted-foreground">
                  Más puntos este mes · El Paso TX
                </div>
              </div>
              {leaderboard.map((row) => (
                <div
                  key={row.rank}
                  className={cn(
                    "flex items-center gap-3 border-b border-border px-5 py-2.5 last:border-none",
                    row.me && "bg-accent/[0.07]"
                  )}
                >
                  <span
                    className={cn(
                      "w-[18px] font-heading text-sm font-bold",
                      row.gold ? "text-brand-gold" : "text-muted-foreground"
                    )}
                  >
                    {row.rank}
                  </span>
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border font-heading text-[10px] font-bold"
                    style={{ background: row.avBg, color: row.avColor }}
                  >
                    {row.initials}
                  </div>
                  <div className="flex-1">
                    <div className="text-[13px] font-bold text-foreground">
                      {row.name}{" "}
                      {row.me && (
                        <span className="text-[11px] text-accent">
                          ← tú
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      {row.meta}
                    </div>
                  </div>
                  <span
                    className={cn(
                      "font-heading text-sm font-bold",
                      row.gold ? "text-brand-gold" : "text-foreground"
                    )}
                  >
                    {row.count}
                  </span>
                  <span className="w-[18px] text-center text-sm">
                    {row.trophy}
                  </span>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
