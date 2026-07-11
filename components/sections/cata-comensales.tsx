import { SectionHeading } from "@/components/sections/section-heading";
import { SvcGrid } from "@/components/sections/svc-grid";
import { comensalesFeatures } from "@/content/cata";

export function CataComensales() {
  return (
    <section id="comensales" className="relative z-[1] bg-surface-1">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-28">
        <SectionHeading
          eyebrow="Para Comensales"
          title="Convierte cada comida en"
          accent="una entrada de tu diario"
          desc="Desde tu primer bocado hasta la mesa del chef, CATA te ayuda a registrar, descubrir y compartir cada experiencia gastronómica — y a conectar con otros amantes de la buena mesa."
        />
        <SvcGrid cards={comensalesFeatures} columns={3} />
      </div>
    </section>
  );
}
