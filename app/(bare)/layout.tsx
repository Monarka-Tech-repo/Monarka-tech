import { ThemeScope } from "@/components/layout/theme-scope";
import { SmoothScroll } from "@/components/effects/smooth-scroll";

export default function BareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeScope theme="monarka">
      <SmoothScroll />
      {children}
    </ThemeScope>
  );
}
