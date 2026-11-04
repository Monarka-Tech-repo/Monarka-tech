import type { Metadata } from "next";
import { MonarkaDesignsSections } from "@/components/sections/monarka-designs-sections";
import { getDictionary, localeAlternates } from "@/lib/i18n";

const t = getDictionary("en").meta;

export const metadata: Metadata = {
  title: t.designsTitle,
  description: t.designsDescription,
  alternates: localeAlternates("en", "/disenos"),
};

export default function EnglishDesignsPage() {
  return <MonarkaDesignsSections locale="en" />;
}
