import type { Metadata } from "next";
import { MonarkaStudioSections } from "@/components/sections/monarka-studio-sections";
import { getDictionary, localeAlternates } from "@/lib/i18n";

const t = getDictionary("en").meta;

export const metadata: Metadata = {
  title: t.studioTitle,
  description: t.studioDescription,
  alternates: localeAlternates("en", "/studio"),
};

export default function EnglishStudioPage() {
  return <MonarkaStudioSections locale="en" />;
}
