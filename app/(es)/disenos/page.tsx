import type { Metadata } from "next";
import { MonarkaDesignsSections } from "@/components/sections/monarka-designs-sections";
import { getDictionary, localeAlternates } from "@/lib/i18n";

const t = getDictionary("es").meta;

export const metadata: Metadata = {
  title: t.designsTitle,
  description: t.designsDescription,
  alternates: localeAlternates("es", "/disenos"),
};

export default function DesignsPage() {
  return <MonarkaDesignsSections locale="es" />;
}
