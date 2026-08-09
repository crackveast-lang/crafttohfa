import Link from "next/link";
import type { CSSProperties } from "react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/product/ProductCard";
import { ScrollRow, railItem } from "@/components/ui/ScrollRow";
import { getFeaturedProducts, products } from "@/data/products";

export function FeaturedProducts() {
  const featured = getFeaturedProducts(4);

  return (
    <Section tone="blush">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Loved by little hands"
          title="What people keep coming back for"
        />
        <Link
          href="/shop"
          data-reveal="rise"
          style={{ animationDelay: "100ms" }}
          className="group inline-flex min-h-11 items-center gap-2 font-semibold underline decoration-sage decoration-2 underline-offset-8 hover:text-plum"
        >
          See all {products.length}
          {/* One nudge on arrival, then hover-only. The nudge animates
              `transform` while the hover uses Tailwind's `translate`
              property, so the two never overwrite each other. */}
          <span
            aria-hidden="true"
            data-reveal="nudge"
            style={{ animationDelay: "700ms" }}
            className="transition-transform duration-200 group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>

      {/* Mobile shows 1.15 cards so the overflow is obvious without arrows */}
      <ScrollRow className="mt-12 md:mt-14 md:grid-cols-2 lg:grid-cols-4">
        {featured.map((product, i) => (
          <div
            key={product.slug}
            // Cards arrive slightly crooked and straighten as they land —
            // enough of the scrapbook language to belong on this page, without
            // leaving anything permanently askew in a product grid.
            data-reveal="tilt"
            style={
              {
                animationDelay: `${i * 90}ms`,
                "--tilt-from": i % 2 === 0 ? "-1.5deg" : "1.5deg",
              } as CSSProperties
            }
            className={railItem}
          >
            <ProductCard
              product={product}
              sizes="(max-width: 768px) 78vw, (max-width: 1024px) 45vw, 280px"
            />
          </div>
        ))}
      </ScrollRow>
    </Section>
  );
}
