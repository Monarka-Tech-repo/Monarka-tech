import type { Metadata } from "next";
import { MonarkaHomeSections } from "@/components/sections/monarka-home-sections";
import { getDictionary, localeAlternates } from "@/lib/i18n";

const t = getDictionary("es").meta;

export const metadata: Metadata = {
  title: t.homeTitle,
  description: t.homeDescription,
  alternates: localeAlternates("es", "/"),
};

export default function HomePage() {
  return <MonarkaHomeSections locale="es" />;
}
