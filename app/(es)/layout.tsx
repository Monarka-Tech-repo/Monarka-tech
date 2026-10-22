import { RootDocument, rootMetadata } from "@/components/layout/root-document";

export const metadata = rootMetadata("es");

export default function SpanishLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument locale="es">{children}</RootDocument>;
}
