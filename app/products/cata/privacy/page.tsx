import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Privacidad — CATA",
  alternates: { canonical: "/products/cata/privacy" },
};

export default function CataPrivacyPage() {
  return (
    <section className="relative z-[1] flex min-h-[70vh] items-center px-6 py-28">
      <div className="mx-auto max-w-xl text-center">
        <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-brand-teal">
          CATA · Privacidad
        </p>
        <h1 className="mb-6 font-heading text-[clamp(1.6rem,3vw,2.4rem)] font-black text-white">
          La Política de Privacidad de CATA vive en Monarka TECH.
        </h1>
        <p className="mb-8 text-[15px] leading-relaxed text-muted-foreground">
          Monarka TECH mantiene una sola Política de Privacidad que cubre
          tanto el sitio como CATA y todos sus datos.
        </p>
        <Link href="/legal/privacy" className={cn(buttonVariants(), "rounded")}>
          Ver Política de Privacidad →
        </Link>
      </div>
    </section>
  );
}
