import type { Metadata } from "next";
import { LegalPrivacy } from "@/components/sections/legal-privacy";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Cómo Monarka TECH recopila, usa y protege tu información a través de monarka.tech y la app CATA.",
  alternates: { canonical: "/legal/privacy" },
};

export default function LegalPrivacyPage() {
  return <LegalPrivacy />;
}
