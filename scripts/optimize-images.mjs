// One-off/reusable asset compression pass for public/assets.
// Run with: node scripts/optimize-images.mjs
import sharp from "sharp";
import { readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const targets = ["public/assets", "public/assets/cata"];

for (const dir of targets) {
  for (const file of readdirSync(dir)) {
    const filePath = join(dir, file);
    if (statSync(filePath).isDirectory()) continue;
    const ext = extname(file).toLowerCase();
    const before = statSync(filePath).size;

    if (ext === ".png") {
      await sharp(filePath)
        .png({ quality: 80, compressionLevel: 9, palette: true })
        .toFile(filePath + ".tmp");
    } else if (ext === ".jpg" || ext === ".jpeg") {
      await sharp(filePath)
        .jpeg({ quality: 78, mozjpeg: true })
        .toFile(filePath + ".tmp");
    } else {
      continue;
    }

    const fs = await import("node:fs");
    await new Promise((r) => setTimeout(r, 150));
    fs.copyFileSync(filePath + ".tmp", filePath);
    fs.unlinkSync(filePath + ".tmp");
    const after = statSync(filePath).size;
    console.log(
      `${filePath}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`
    );
  }
}
