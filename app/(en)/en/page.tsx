import type { Metadata } from "next";
import { MonarkaHomeSections } from "@/components/sections/monarka-home-sections";
import { getDictionary, localeAlternates } from "@/lib/i18n";

const t = getDictionary("en").meta;

export const metadata: Metadata = {
  title: t.homeTitle,
  description: t.homeDescription,
  alternates: localeAlternates("en", "/"),
};

export default function EnglishHomePage() {
  return <MonarkaHomeSections locale="en" />;
}
