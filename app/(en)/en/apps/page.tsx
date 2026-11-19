import type { Metadata } from "next";
import { MonarkaAppsSections } from "@/components/sections/monarka-apps-sections";
import { getDictionary, localeAlternates } from "@/lib/i18n";

const t = getDictionary("en").meta;

export const metadata: Metadata = {
  title: t.appsTitle,
  description: t.appsDescription,
  alternates: localeAlternates("en", "/apps"),
};

export default function EnglishAppsPage() {
  return <MonarkaAppsSections locale="en" />;
}
