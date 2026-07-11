import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/effects/reveal-on-scroll";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Servicios",
  description: "Cómo trabajamos con negocios en etapa temprana y en crecimiento.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <section className="flex min-h-[70vh] items-center px-6 py-28">
      <div className="mx-auto max-w-xl text-center">
        <RevealOnScroll>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Servicios
          </p>
          <h1 className="mb-6 text-[clamp(2rem,4vw,2.75rem)] font-extrabold leading-[1.15] tracking-tight">
            Estamos definiendo esta página.
          </h1>
          <div className="mb-8 inline-block rounded-full border border-brand-accent-2/30 bg-brand-accent-2/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-accent-2">
            Contenido pendiente
          </div>
          <p className="mb-8 text-base leading-relaxed text-muted-foreground">
            Monarka TECH trabaja como socio tecnológico para negocios en
            etapa temprana y en crecimiento. Estamos preparando el detalle
            de cómo trabajamos y qué servicios ofrecemos — mientras tanto,
            cuéntanos qué necesitas.
          </p>
          <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "rounded-full")}>
            Contáctanos
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
