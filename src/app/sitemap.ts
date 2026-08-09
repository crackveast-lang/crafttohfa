import type { MetadataRoute } from "next";
import { allSlugs } from "@/data/products";
import { siteConfig } from "@/site.config";

const STATIC_ROUTES: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/shop", priority: 0.9, changeFrequency: "weekly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.5, changeFrequency: "monthly" },
  { path: "/policies", priority: 0.4, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ...STATIC_ROUTES.map((r) => ({
      url: `${siteConfig.url}${r.path}`,
      lastModified,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...allSlugs.map((slug) => ({
      url: `${siteConfig.url}/product/${slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
