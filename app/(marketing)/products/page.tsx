import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RevealOnScroll } from "@/components/effects/reveal-on-scroll";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Productos",
  description:
    "CATA es el producto insignia de Monarka TECH — el diario gastronómico social para quienes viven para comer.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <section className="px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <RevealOnScroll>
          <div className="mx-auto mb-16 max-w-xl text-center">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Productos
            </p>
            <h1 className="mb-4 text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-[1.1] tracking-tight">
              Empezamos con CATA.
            </h1>
            <p className="text-[17px] leading-relaxed text-muted-foreground">
              CATA es el producto insignia de Monarka TECH — nuestro primer
              paso hacia una familia de aplicaciones construidas con el
              mismo estándar de calidad, diseño y experiencia de usuario.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <Link
            href="/products/cata"
            className="group grid gap-8 overflow-hidden rounded-3xl border border-border bg-surface-1 p-8 transition-colors hover:border-border-2 md:grid-cols-2 md:p-12"
          >
            <div className="flex flex-col justify-center">
              <div className="mb-5">
                <Image
                  src="/assets/cata/cata-logo.png"
                  alt="CATA"
                  width={160}
                  height={51}
                  className="h-10 w-auto object-contain"
                />
              </div>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-accent">
                App Insignia
              </p>
              <h2 className="mb-4 text-2xl font-bold tracking-tight">
                El diario gastronómico social.
              </h2>
              <p className="mb-6 text-[15px] leading-relaxed text-muted-foreground">
                Registra cada platillo, construye tu colección, descubre
                restaurantes y conéctate con una comunidad que comparte tu
                pasión por la buena mesa.
              </p>
              <span
                className={cn(
                  buttonVariants(),
                  "w-fit rounded-full bg-accent text-accent-foreground group-hover:bg-accent/90"
                )}
              >
                Explorar CATA →
              </span>
            </div>
            <div className="relative min-h-[220px] overflow-hidden rounded-2xl">
              <Image
                src="/assets/cata/dish-3.jpg"
                alt="CATA"
                fill
                sizes="(min-width: 768px) 480px, 90vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </Link>
        </RevealOnScroll>

        <RevealOnScroll delay={0.18}>
          <div className="mt-8 rounded-3xl border border-dashed border-border p-10 text-center">
            <p className="text-sm text-muted-foreground">
              Más productos en camino. Sueña grande, transforma completo,
              vuela más lejos.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
