import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

/**
 * Shrinks the images in a static export, in place.
 *
 * GitHub Pages serves files and nothing else, so `next/image` runs with
 * `unoptimized: true` there and every photo ships exactly as it sits in
 * public/ — originals are ~1250px at high quality, and the shop page pulls 26
 * of them. On an Indian mobile connection that is the difference between a
 * fast shop and an abandoned one.
 *
 * This is the compensation: resize once at deploy time. Filenames and
 * extensions are preserved, so no HTML has to change and no content-type ever
 * disagrees with the bytes behind it — which is why this re-encodes JPEG as
 * JPEG rather than sneaking WebP into a .jpg.
 *
 * Only touches `out/`. The originals in public/ are never modified, so local
 * development keeps the full-resolution files and the real optimiser.
 */

const ROOT = process.argv[2] ?? "out/images";

/** Nothing on the site is displayed wider than ~600 CSS px; 1000 covers 2x. */
const MAX_WIDTH = 1000;
const JPEG_QUALITY = 80;

async function* walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(full);
    else yield full;
  }
}

const kb = (n) => (n / 1024).toFixed(0).padStart(5) + " KB";

let before = 0;
let after = 0;
let touched = 0;

for await (const file of walk(ROOT)) {
  const ext = path.extname(file).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;

  const original = await readFile(file);
  const meta = await sharp(original).metadata();
  before += original.length;

  let pipeline = sharp(original).rotate();
  if (meta.width > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  const out =
    ext === ".png"
      ? // The logos carry alpha, so they stay PNG. `palette` quantises to an
        // indexed image, which is dramatically smaller for flat artwork like
        // this and visually identical.
        await pipeline.png({ compressionLevel: 9, palette: true }).toBuffer()
      : await pipeline
          .jpeg({ quality: JPEG_QUALITY, mozjpeg: true, progressive: true })
          .toBuffer();

  // Never make a file bigger than it already was.
  if (out.length < original.length) {
    await writeFile(file, out);
    after += out.length;
    touched++;
    console.log(
      `  ${kb(original.length)} → ${kb(out.length)}  ${path.relative(ROOT, file)}`,
    );
  } else {
    after += original.length;
  }
}

const saved = before - after;
console.log("");
console.log(`shrank ${touched} images`);
console.log(`  before: ${(before / 1024 / 1024).toFixed(2)} MB`);
console.log(`  after:  ${(after / 1024 / 1024).toFixed(2)} MB`);
console.log(
  `  saved:  ${(saved / 1024 / 1024).toFixed(2)} MB (${((saved / before) * 100).toFixed(0)}%)`,
);
