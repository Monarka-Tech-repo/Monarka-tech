import { RevealOnScroll } from "@/components/effects/reveal-on-scroll";
import { CataPhoneDemo } from "@/components/demo/cata-phone-demo";

export function CataDemoSection() {
  return (
    <section className="relative z-[1] border-t border-border bg-secondary/40 px-6 py-24 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
        <RevealOnScroll>
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-brand-teal">
              Pruébalo tú mismo
            </p>
            <h2 className="mb-4 font-heading text-[clamp(1.5rem,2.6vw,2.3rem)] font-semibold leading-tight text-foreground">
              Así se siente <em className="text-accent">CATA</em>, en vivo.
            </h2>
            <p className="mb-6 max-w-md text-[15px] leading-[1.78] text-muted-foreground">
              Explora el feed, mira los platillos destacados y registra tu
              propio platillo — todo dentro de una demo interactiva, sin
              descargar la app ni crear una cuenta.
            </p>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>→ Navega Explore, Feed, My Menu y Perfil</li>
              <li>→ Registra un platillo de prueba en Log Dish</li>
              <li>→ Míralo aparecer al instante en tu My Menu</li>
            </ul>
          </div>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <CataPhoneDemo />
        </RevealOnScroll>
      </div>
    </section>
  );
}
