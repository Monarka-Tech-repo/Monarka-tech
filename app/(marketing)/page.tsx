import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/hero";
import { FeaturedCata } from "@/components/sections/featured-cata";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { DeepDive } from "@/components/sections/deep-dive";
import { MarqueeTicker } from "@/components/effects/marquee-ticker";
import { RevealOnScroll } from "@/components/effects/reveal-on-scroll";
import { marqueeItems } from "@/content/home";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Premium Software. Built to Last.",
  description:
    "Monarka TECH es una empresa de software de El Paso, TX. Creadores de CATA — el diario gastronómico social para quienes viven para comer.",
  keywords: [
    "Monarka",
    "CATA",
    "dining journal",
    "app",
    "El Paso",
    "software",
    "restaurant",
    "gastronomia",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Monarka TECH — Premium Software. Built to Last.",
    description:
      "Creadores de CATA — el diario gastronómico social para quienes viven para comer.",
    url: "/",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeTicker items={marqueeItems} />
      <FeaturedCata />
      <FeatureGrid />
      <DeepDive />

      <section className="border-t border-border px-6 py-24 text-center">
        <RevealOnScroll>
          <p className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground">
            Conoce más sobre Monarka TECH y cómo estamos construyendo el
            futuro del software premium.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/about"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full")}
            >
              Sobre Nosotros
            </Link>
            <Link
              href="/contact"
              className={cn(buttonVariants({ size: "lg" }), "rounded-full")}
            >
              Contáctanos
            </Link>
          </div>
        </RevealOnScroll>
      </section>
    </>
  );
}
