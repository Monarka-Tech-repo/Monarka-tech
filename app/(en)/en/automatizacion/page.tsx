import type { Metadata } from "next";
import { MonarkaAutomationSections } from "@/components/sections/monarka-automation-sections";
import { getDictionary, localeAlternates } from "@/lib/i18n";

const t = getDictionary("en").meta;

export const metadata: Metadata = {
  title: t.automationTitle,
  description: t.automationDescription,
  alternates: localeAlternates("en", "/automatizacion"),
};

export default function EnglishAutomationPage() {
  return <MonarkaAutomationSections locale="en" />;
}
