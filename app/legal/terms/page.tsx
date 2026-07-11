import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/sections/placeholder-page";

export const metadata: Metadata = {
  title: "Términos de Servicio",
  alternates: { canonical: "/legal/terms" },
};

export default function LegalTermsPage() {
  return (
    <PlaceholderPage
      eyebrow="Documento Legal"
      title="Términos de Servicio en preparación."
      note="Los Términos de Servicio de Monarka TECH están siendo redactados con asesoría legal y se publicarán próximamente."
    />
  );
}
