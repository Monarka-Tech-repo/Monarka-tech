// Publishes the builder's "Demo Index" page and the demo sites it links to as
// real pages under public/indice/ → monarka.tech/indice/ (and /indice/<slug>/).
//
//   node scripts/sync-demo-index.mjs [sourceDir]
//
// Same allowlist as sync-demos.mjs: only demos listed in studio.demos.items
// (lib/i18n/es.ts) are published. Anything else in the index (e.g. `hotel`,
// whose photos aren't cleared) is removed from the page's DEMOS list.
//
// Every published page gets `noindex`, so search engines never list the
// fictional businesses as real ones. The index also gets a link back to
// /disenos. The wheel's card screenshots are re-compressed from _previews/.

import { cp, mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SOURCE = process.argv[2] ?? "D:/MONARKA/Demo Webpage builder";
const OUT = path.join(ROOT, "public/indice");

const dict = await readFile(path.join(ROOT, "lib/i18n/es.ts"), "utf8");
const demosBlock = dict.slice(dict.indexOf("    demos: {"), dict.indexOf("    webDesign: {"));
const SLUGS = [...demosBlock.matchAll(/slug: "([^"]+)"/g)].map((m) => m[1]);

const NOINDEX = '<meta name="robots" content="noindex">';
function addNoindex(html, label) {
  if (html.includes('name="robots"')) return html;
  const out = html.replace(/<head\b[^>]*>/i, (m) => `${m}\n${NOINDEX}`);
  if (out === html) throw new Error(`${label}: no <head> to add noindex to`);
  return out;
}

await rm(OUT, { recursive: true, force: true });
await mkdir(path.join(OUT, "_previews"), { recursive: true });

// ---- The index page ----
let html = await readFile(path.join(SOURCE, "index-library.html"), "utf8");
const listed = [...html.matchAll(/\{id:"([^"]+)"/g)].map((m) => m[1]);
const kept = listed.filter((id) => SLUGS.includes(id));
const dropped = listed.filter((id) => !SLUGS.includes(id));

// One entry per demo: `{id:"…", … desc:"…"},` — remove the ones not cleared.
html = html.replace(/\n[ \t]*\{id:"([^"]+)"[\s\S]*?desc:"(?:[^"\\]|\\.)*"\},?/g, (entry, id) => (SLUGS.includes(id) ? entry : ""));
const after = [...html.matchAll(/\{id:"([^"]+)"/g)].map((m) => m[1]);
if (after.join() !== kept.join()) throw new Error(`DEMOS list edit went wrong: ${after.join()} vs ${kept.join()}`);

const navAnchor = '<nav class="nav-links" aria-label="Main">';
if (!html.includes(navAnchor)) throw new Error("index: nav not found for the back link");
html = html.replace(navAnchor, `${navAnchor}\n    <a href="/disenos/">← Monarka TECH</a>`);
html = addNoindex(html, "index");
await writeFile(path.join(OUT, "index.html"), html);
console.log(`index: ${kept.length} demos${dropped.length ? `, left out: ${dropped.join(", ")}` : ""}`);

const missing = SLUGS.filter((s) => !listed.includes(s));
if (missing.length) console.warn(`note: on the site but not in the index page: ${missing.join(", ")}`);

// ---- Card screenshots ----
for (const id of kept) {
  const src = path.join(SOURCE, "_previews", `${id}.png`);
  const dest = path.join(OUT, "_previews", `${id}.png`);
  await sharp(src).png({ palette: true, quality: 80, compressionLevel: 9 }).toFile(dest);
  const [a, b] = [(await stat(src)).size, (await stat(dest)).size];
  console.log(`preview ${id}: ${(a / 1024).toFixed(0)} KB → ${(b / 1024).toFixed(0)} KB`);
}

// ---- The demo sites themselves ----
for (const id of kept) {
  const from = path.join(SOURCE, id);
  const to = path.join(OUT, id);
  await cp(from, to, { recursive: true, filter: (p) => !/[\\/](node_modules|\.git)([\\/]|$)/.test(p) });
  let published = false;
  for (const rel of ["index.html", "dist/index.html"]) {
    const file = path.join(to, rel);
    try {
      await writeFile(file, addNoindex(await readFile(file, "utf8"), `${id}/${rel}`));
      published = true;
    } catch (err) {
      if (err.code !== "ENOENT") throw err;
    }
  }
  if (!published) throw new Error(`${id}: no index.html to publish`);
  console.log(`demo ${id}: published`);
}
