import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/sections/placeholder-page";

export const metadata: Metadata = {
  title: "Términos de Servicio — CATA",
  alternates: { canonical: "/products/cata/terms" },
};

export default function CataTermsPage() {
  return (
    <PlaceholderPage
      eyebrow="CATA · Legal"
      title="Términos de servicio en preparación."
      note="Los Términos de Servicio de CATA están siendo redactados con asesoría legal y se publicarán antes del lanzamiento público de la app."
    />
  );
}
