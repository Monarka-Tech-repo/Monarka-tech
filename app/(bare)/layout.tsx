import { ThemeScope } from "@/components/layout/theme-scope";
import { SmoothScroll } from "@/components/effects/smooth-scroll";
import { BackgroundMusic } from "@/components/effects/background-music";
import { LoadingScreen } from "@/components/effects/loading-screen";

export default function BareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeScope theme="monarka">
      <LoadingScreen />
      <SmoothScroll />
      <BackgroundMusic />
      {children}
    </ThemeScope>
  );
}
