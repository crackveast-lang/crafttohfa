import type { NextConfig } from "next";

/**
 * GitHub Pages serves static files only — no Node process, so no image
 * optimiser and no server rendering. That mode is gated behind an env var
 * rather than switched on permanently, because turning it on unconditionally
 * would break `npm run dev` and `npm run start` for everyday work.
 *
 *   normal local work  →  npm run dev / npm run build && npm run start
 *   Pages build        →  GITHUB_PAGES=true npm run build   (the workflow)
 */
const isPages = process.env.GITHUB_PAGES === "true";

/**
 * EMPTY, and it must stay empty.
 *
 * The site is served from the root of www.craftohfa.com. It used to live at
 * crackveast-lang.github.io/crafttohfa, which needed the repo name in front of
 * every internal URL — but the moment the custom domain was pointed at Pages,
 * that prefix became a path that does not exist. Every /crafttohfa/_next/*.css
 * and .js 404'd and the whole site rendered as unstyled HTML: a page-high black
 * logo and one line of text.
 *
 * The old project URL still works: Pages 301s it to the custom domain.
 *
 * Only put a value back here if the site is ever served from a SUBDIRECTORY
 * again — not merely because the build is going to Pages.
 */
const basePath = "";

const nextConfig: NextConfig = {
  /**
   * Exposed to the app because `resolvePhoto` has to prepend it by hand.
   * Next prefixes next/link and next/image automatically — but NOT when the
   * image is `unoptimized`, which is exactly the mode Pages forces. Without
   * this every product photo and the logo 404s on the deployed site.
   */
  env: { NEXT_PUBLIC_BASE_PATH: basePath },

  ...(isPages && {
    output: "export",
    basePath,
    assetPrefix: basePath,
    // Pages has no directory-index rewriting, so /shop must be written as
    // /shop/index.html rather than /shop.html or the link 404s.
    trailingSlash: true,
  }),

  images: {
    /**
     * The optimiser cannot run on Pages, so images are served as-is. The
     * `scripts/shrink-export.mjs` step in the deploy workflow makes up for
     * some of it by resizing the exported files down from ~1250px.
     */
    ...(isPages && { unoptimized: true }),

    /**
     * AVIF first, WebP fallback. AVIF is ~20% smaller, which matters a lot on
     * Indian mobile data — at the cost of slower encoding at build time.
     */
    formats: ["image/avif", "image/webp"],

    /**
     * Trimmed from the default [640…3840]. Nothing on this site is displayed
     * wider than ~1200px, so generating 2048/3840 variants is wasted build
     * time and cache storage.
     */
    deviceSizes: [390, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [96, 128, 200, 256, 384],

    /**
     * Next 16 requires qualities to be allow-listed; the default is [75].
     * 82 for product photography, where texture on crochet actually shows.
     */
    qualities: [75, 82],

    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
