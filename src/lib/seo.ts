import type { Metadata } from "next";
import { siteConfig } from "@/site.config";
import { testimonialsAreReal } from "@/data/testimonials";
import type { Product } from "@/types";

export function buildMetadata({
  title,
  description,
  path = "/",
  images,
}: {
  title: string;
  description?: string;
  path?: string;
  images?: string[];
}): Metadata {
  const desc = description ?? siteConfig.description;
  return {
    title,
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} · ${siteConfig.name}`,
      description: desc,
      url: path,
      siteName: siteConfig.name,
      locale: "en_IN",
      type: "website",
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${siteConfig.name}`,
      description: desc,
    },
  };
}

export function orgJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    email: siteConfig.social.email,
    sameAs: [siteConfig.social.instagram, siteConfig.social.facebook],
    address: { "@type": "PostalAddress", addressCountry: "IN" },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: `+${siteConfig.whatsapp.number}`,
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
  };
}

export function productJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: product.category,
    image: [`${siteConfig.url}${product.images[0]?.src ?? ""}`],
    brand: { "@type": "Brand", name: siteConfig.name },
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}/product/${product.slug}`,
      priceCurrency: "INR",
      price: product.price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: siteConfig.name },
    },
    /**
     * Rating markup is emitted ONLY once every testimonial is genuine.
     * Shipping fabricated aggregateRating is a Google manual-action risk and,
     * in India, a CCPA-2019 misleading-endorsement problem. Not worth it.
     */
    ...(testimonialsAreReal && product.rating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating.value,
            reviewCount: product.rating.count,
          },
        }
      : {}),
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${siteConfig.url}${t.path}`,
    })),
  };
}
