const EMAIL_RE = /[\w.+-]+@[\w-]+\.[\w.-]+/g;
const URL_RE = /\bmonarka\.tech\b(?!@)/g;

export function LinkifyText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  const matches: { index: number; length: number; href: string; label: string }[] = [];

  for (const m of text.matchAll(EMAIL_RE)) {
    matches.push({ index: m.index, length: m[0].length, href: `mailto:${m[0]}`, label: m[0] });
  }
  for (const m of text.matchAll(URL_RE)) {
    const alreadyCovered = matches.some(
      (existing) => m.index! >= existing.index && m.index! < existing.index + existing.length
    );
    if (!alreadyCovered) {
      matches.push({ index: m.index!, length: m[0].length, href: `https://${m[0]}`, label: m[0] });
    }
  }
  matches.sort((a, b) => a.index - b.index);

  matches.forEach((m, i) => {
    if (m.index > lastIndex) parts.push(text.slice(lastIndex, m.index));
    parts.push(
      <a key={i} href={m.href} className="text-accent underline underline-offset-4">
        {m.label}
      </a>
    );
    lastIndex = m.index + m.length;
  });
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));

  return <>{parts}</>;
}
