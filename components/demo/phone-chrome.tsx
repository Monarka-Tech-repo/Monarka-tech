export function PhoneStatusBar() {
  return (
    <div className="flex items-center justify-between px-5 pb-1 pt-3 text-[11px] font-semibold text-foreground">
      <span>9:41</span>
      <span className="tracking-wider">●●● 5G 🔋</span>
    </div>
  );
}

export function PhoneHomeIndicator() {
  return (
    <div className="flex justify-center pb-1.5 pt-2">
      <div className="h-1 w-24 rounded-full bg-foreground/20" />
    </div>
  );
}
