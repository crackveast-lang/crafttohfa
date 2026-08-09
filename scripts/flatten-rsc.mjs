import { readdir, copyFile, stat } from "node:fs/promises";
import path from "node:path";

/**
 * Works around a Next 16 static-export mismatch in the router's prefetch
 * payloads.
 *
 * The export WRITES each route segment's payload into nested directories:
 *
 *   out/shop/__next.shop/__PAGE__.txt
 *   out/product/<slug>/__next.product/$d$slug/__PAGE__.txt
 *
 * but the client REQUESTS the same thing with the path segments joined by
 * dots into a single flat filename:
 *
 *   /shop/__next.shop.__PAGE__.txt
 *   /product/<slug>/__next.product.$d$slug.__PAGE__.txt
 *
 * On a server that mismatch never surfaces, because the route handler
 * resolves it. On a plain file host there is no handler, so every prefetch
 * 404s. Navigation still works — the router falls back to a full page load —
 * but the prefetch is wasted and the console fills with errors.
 *
 * The fix is to also write the flat name. Copies rather than moves, so the
 * nested layout stays intact for anything that expects it.
 */

const ROOT = process.argv[2] ?? "out";

async function* segmentDirs(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    const full = path.join(dir, e.name);
    if (e.name.startsWith("__next.")) yield { parent: dir, name: e.name, full };
    else yield* segmentDirs(full);
  }
}

/** Every file inside, with its path relative to the segment directory. */
async function* filesUnder(dir, prefix = "") {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const rel = prefix ? `${prefix}/${e.name}` : e.name;
    if (e.isDirectory()) yield* filesUnder(path.join(dir, e.name), rel);
    else yield rel;
  }
}

let made = 0;
let bytes = 0;

for await (const seg of segmentDirs(ROOT)) {
  for await (const rel of filesUnder(seg.full)) {
    // "__next.product" + "$d$slug/__PAGE__.txt" → "__next.product.$d$slug.__PAGE__.txt"
    const flat = `${seg.name}.${rel.split("/").join(".")}`;
    const from = path.join(seg.full, rel);
    const to = path.join(seg.parent, flat);
    await copyFile(from, to);
    bytes += (await stat(to)).size;
    made++;
  }
}

console.log(`flattened ${made} RSC prefetch payloads (${(bytes / 1024).toFixed(0)} KB)`);
