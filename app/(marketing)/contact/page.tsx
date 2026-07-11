import type { Metadata } from "next";
import { ContactForms } from "@/components/sections/contact-forms";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Únete a la lista de espera de CATA o contáctanos si quieres que tu restaurante sea de los primeros en la plataforma.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactForms />;
}
