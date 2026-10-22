import type { Metadata } from "next";
import { MonarkaStudioSections } from "@/components/sections/monarka-studio-sections";
import { getDictionary, localeAlternates } from "@/lib/i18n";

const t = getDictionary("es").meta;

export const metadata: Metadata = {
  title: t.studioTitle,
  description: t.studioDescription,
  alternates: localeAlternates("es", "/studio"),
};

export default function StudioPage() {
  return <MonarkaStudioSections locale="es" />;
}
