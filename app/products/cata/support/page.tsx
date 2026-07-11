import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/sections/placeholder-page";

export const metadata: Metadata = {
  title: "Soporte — CATA",
  alternates: { canonical: "/products/cata/support" },
};

export default function CataSupportPage() {
  return (
    <PlaceholderPage
      eyebrow="CATA · Soporte"
      title="Centro de soporte en construcción."
      note="Estamos preparando la página de soporte de CATA. Si necesitas ayuda ahora, contáctanos directamente y te responderemos lo antes posible."
    />
  );
}
