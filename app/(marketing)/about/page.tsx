import type { Metadata } from "next";
import { AboutIntro } from "@/components/sections/about-intro";
import { TechStack } from "@/components/sections/tech-stack";
import { VisionRoadmap } from "@/components/sections/vision-roadmap";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Monarka TECH es una startup de software con sede en El Paso, TX. Construimos productos digitales de primer nivel con un enfoque obsesivo en la experiencia de usuario, el diseño y la calidad técnica.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <AboutIntro />
      <TechStack />
      <VisionRoadmap />
    </>
  );
}
