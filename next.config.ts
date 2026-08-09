import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
