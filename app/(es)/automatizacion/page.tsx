import type { Metadata } from "next";
import { MonarkaAutomationSections } from "@/components/sections/monarka-automation-sections";
import { getDictionary, localeAlternates } from "@/lib/i18n";

const t = getDictionary("es").meta;

export const metadata: Metadata = {
  title: t.automationTitle,
  description: t.automationDescription,
  alternates: localeAlternates("es", "/automatizacion"),
};

export default function AutomationPage() {
  return <MonarkaAutomationSections locale="es" />;
}
