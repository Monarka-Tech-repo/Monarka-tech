import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/sections/placeholder-page";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes — CATA",
  alternates: { canonical: "/products/cata/faq" },
};

export default function CataFaqPage() {
  return (
    <PlaceholderPage
      eyebrow="CATA · FAQ"
      title="Preguntas frecuentes, muy pronto."
      note="Estamos redactando las preguntas frecuentes de CATA. Mientras tanto, escríbenos con cualquier duda."
    />
  );
}
