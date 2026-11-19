import type { Metadata } from "next";
import { MonarkaAppsSections } from "@/components/sections/monarka-apps-sections";
import { getDictionary, localeAlternates } from "@/lib/i18n";

const t = getDictionary("es").meta;

export const metadata: Metadata = {
  title: t.appsTitle,
  description: t.appsDescription,
  alternates: localeAlternates("es", "/apps"),
};

export default function AppsPage() {
  return <MonarkaAppsSections locale="es" />;
}
