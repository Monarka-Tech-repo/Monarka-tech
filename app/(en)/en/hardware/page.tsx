import type { Metadata } from "next";
import { MonarkaHardwareSections } from "@/components/sections/monarka-hardware-sections";
import { getDictionary, localeAlternates } from "@/lib/i18n";

const t = getDictionary("en").meta;

export const metadata: Metadata = {
  title: t.hardwareTitle,
  description: t.hardwareDescription,
  alternates: localeAlternates("en", "/hardware"),
};

export default function EnglishHardwarePage() {
  return <MonarkaHardwareSections locale="en" />;
}
