import type { Metadata } from "next";
import { MonarkaHomeSections } from "@/components/sections/monarka-home-sections";

export const metadata: Metadata = {
  title: "Premium Software. Built to Last.",
  description:
    "Monarka TECH es una empresa de software de El Paso, TX. Creadores de CATA — el diario gastronómico social para quienes viven para comer.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return <MonarkaHomeSections />;
}
