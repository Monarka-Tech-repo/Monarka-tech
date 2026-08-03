export type Theme = "monarka" | "cata" | "legal";

export function ThemeScope({
  theme,
  children,
}: {
  theme: Theme;
  children: React.ReactNode;
}) {
  return (
    <div
      data-theme={theme}
      className="flex min-h-screen flex-col bg-background text-foreground"
    >
      {children}
    </div>
  );
}
