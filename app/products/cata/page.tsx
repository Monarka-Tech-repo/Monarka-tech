import type { Metadata } from "next";
import { CataHero } from "@/components/sections/cata-hero";
import { CataStats } from "@/components/sections/cata-stats";
import { CataComensales } from "@/components/sections/cata-comensales";
import { CataLaCarte } from "@/components/sections/cata-lacarte";
import { CataRestaurantes } from "@/components/sections/cata-restaurantes";
import { CataCta } from "@/components/sections/cata-cta";
import { MarqueeTicker } from "@/components/effects/marquee-ticker";
import { tickerItems } from "@/content/cata";

export const metadata: Metadata = {
  title: "CATA — Dining Journal",
  description:
    "CATA es el diario social para quienes viven la gastronomía: registra cada platillo que pruebas, descubre lo que se come en tu ciudad, crea Food Journeys y conecta con comunidades de foodies.",
  alternates: { canonical: "/products/cata" },
  openGraph: {
    title: "CATA — Dining Journal | Monarka TECH",
    description:
      "Taste · Collect · Share — el diario gastronómico social de Monarka TECH.",
    url: "/products/cata",
    type: "website",
  },
};

export default function CataPage() {
  return (
    <>
      <CataHero />
      <MarqueeTicker items={tickerItems} className="relative z-[1] bg-surface-1" />
      <CataStats />
      <CataComensales />
      <CataLaCarte />
      <CataRestaurantes />
      <CataCta />
    </>
  );
}
