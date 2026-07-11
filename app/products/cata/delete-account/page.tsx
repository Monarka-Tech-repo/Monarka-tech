import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/sections/placeholder-page";

export const metadata: Metadata = {
  title: "Eliminar Cuenta — CATA",
  alternates: { canonical: "/products/cata/delete-account" },
};

export default function CataDeleteAccountPage() {
  return (
    <PlaceholderPage
      eyebrow="CATA · Cuenta"
      title="Instrucciones para eliminar tu cuenta."
      note="CATA aún no ha lanzado públicamente, por lo que no existen cuentas activas todavía. Esta página incluirá instrucciones de autoservicio para eliminar tu cuenta y tus datos una vez que la app esté disponible, conforme lo requieren Apple y Google."
    />
  );
}
