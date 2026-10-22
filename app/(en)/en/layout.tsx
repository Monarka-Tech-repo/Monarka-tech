import { RootDocument, rootMetadata } from "@/components/layout/root-document";

export const metadata = rootMetadata("en");

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
