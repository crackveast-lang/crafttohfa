import type { MetadataRoute } from "next";
import { siteConfig } from "@/site.config";

/** Static content — required by `output: export`. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
