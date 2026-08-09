import "server-only";
import fs from "node:fs";
import path from "node:path";

const PUBLIC_DIR = path.join(process.cwd(), "public");

/** Extensions we will accept in place of whatever the data file asked for. */
const ALTERNATES = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

const cache = new Map<string, string | null>();

/**
 * Does this photo actually exist on disk yet?
 *
 * Resolving on the SERVER rather than with a client-side onError handler means:
 * no 400s from the image optimiser, no flash of a broken image, no layout
 * shift, and no extra client JS. These pages are statically generated, so the
 * check happens once at build time.
 *
 * Forgiving about extension: products.ts asks for `-1.jpg`, but if the real
 * photo gets dropped in as `-1.png` or `-1.webp` we still find it. The user
 * should not have to think about file extensions.
 *
 * @param src Path as it would appear in the browser, e.g. "/images/products/x-1.jpg"
 * @returns The usable public path, or null when nothing is there yet.
 */
export function resolvePhoto(src: string): string | null {
  const cached = cache.get(src);
  if (cached !== undefined) return cached;

  const result = lookup(src);
  cache.set(src, result);
  return result;
}

function lookup(src: string): string | null {
  if (!src.startsWith("/")) return null;

  const relative = src.replace(/^\/+/, "");
  // Refuse to walk outside /public.
  const absolute = path.join(PUBLIC_DIR, relative);
  if (!absolute.startsWith(PUBLIC_DIR)) return null;

  if (fileExists(absolute)) return src;

  const ext = path.extname(absolute);
  const stem = ext ? absolute.slice(0, -ext.length) : absolute;
  for (const alt of ALTERNATES) {
    if (alt === ext) continue;
    if (fileExists(stem + alt)) {
      return src.slice(0, src.length - ext.length) + alt;
    }
  }
  return null;
}

function fileExists(absolute: string): boolean {
  try {
    return fs.statSync(absolute).isFile();
  } catch {
    return false;
  }
}

/**
 * Stable small integer from a string, so a given product always draws the same
 * placeholder. Must not use Math.random — placeholders would then differ
 * between the server render and any re-render, causing hydration noise.
 */
export function seedFrom(key: string): number {
  let hash = 2166136261;
  for (let i = 0; i < key.length; i++) {
    hash ^= key.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash);
}
