import { SectionHeading } from "@/components/sections/section-heading";
import { SvcGrid } from "@/components/sections/svc-grid";
import { restauranteFeatures } from "@/content/cata";

export function CataRestaurantes() {
  return (
    <section id="restaurantes" className="relative z-[1] bg-surface-1">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-28">
        <SectionHeading
          eyebrow="Para Restaurantes"
          title="Tu restaurante,"
          accent="con presencia en CATA"
          desc="CATA ofrece un modo especial para dueños y operadores de restaurantes: reclama tu página, publica tu menú oficial, sigue las reseñas de la comunidad en tiempo real y conecta con tus comensales directamente desde la app."
        />
        <SvcGrid cards={restauranteFeatures} columns={2} />
      </div>
    </section>
  );
}
