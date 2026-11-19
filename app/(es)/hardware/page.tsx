import type { Metadata } from "next";
import { MonarkaHardwareSections } from "@/components/sections/monarka-hardware-sections";
import { getDictionary, localeAlternates } from "@/lib/i18n";

const t = getDictionary("es").meta;

export const metadata: Metadata = {
  title: t.hardwareTitle,
  description: t.hardwareDescription,
  alternates: localeAlternates("es", "/hardware"),
};

export default function HardwarePage() {
  return <MonarkaHardwareSections locale="es" />;
}
