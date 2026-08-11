import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { ProductCard } from "@/components/product/ProductCard";
import { ShopFilter, type FilterOption } from "@/components/product/ShopFilter";
import { BulkOrders } from "@/components/home/BulkOrders";
import { activeCategories } from "@/data/categories";
import { getProductsByCategory, lowestPrice, products } from "@/data/products";
import { formatINR } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = buildMetadata({
  title: "Shop rakhis, combo boxes & crochet keepsakes",
  description:
    "Browse every CraftTohfa handmade crochet rakhi, crochet keepsake and combo box, rakhi hampers and paint-your-own plaster sets. Order any of them straight over WhatsApp.",
  path: "/shop",
});

/**
 * Built from what's actually in stock. Category chips only appear once there
 * is more than one non-empty category — with a single category they'd just be
 * a second "Everything" button.
 *
 * There is deliberately no price filter. There used to be an "Under ₹800" one,
 * which made sense when everything was a ₹749–₹849 combo box; now that the
 * most expensive thing on the site is ₹499 it would match all 26 products and
 * quietly tell people the filter is broken. Four real category chips do the
 * job that filter was standing in for.
 */
const filters: FilterOption[] = [
  { id: "all", label: "Everything", count: products.length },
  ...(activeCategories.length > 1
    ? activeCategories.map((c) => ({
        id: c.slug,
        /* The full category name, not a shortened one. There used to be a
           chain of .replace() calls trimming "Handmade Rakhis" down to
           "Rakhis" and so on, which meant the chip, the breadcrumb and the
           category card all called the same thing something different. The
           row scrolls horizontally on a phone, so the longer labels cost
           nothing. */
        label: c.name,
        count: getProductsByCategory(c.slug).length,
      }))
    : []),
];

export default function ShopPage() {
  return (
    <>
      <PageHero
        eyebrow={`${products.length} pieces · from ${formatINR(lowestPrice)}`}
        title="More creating. Less scrolling. 🤍"
        intro={
          <>
            At Craft Tohfa, we believe childhood is meant to be filled with
            little moments of creating, imagining and discovering.
            <span className="mt-4 block">
              Our thoughtfully curated craft kits and gifts turn ordinary
              moments into something special. Free shipping above{" "}
              {formatINR(siteConfig.shipping.freeAbove)}.
            </span>
          </>
        }
      />

      <Section tone="cream" className="py-12 md:py-16">
        <ShopFilter options={filters}>
          {products.map((product, i) => (
            // The wrapper carries the filter metadata; ShopFilter only toggles
            // `hidden` on these, so every product stays in the HTML.
            <div
              key={product.slug}
              data-category={product.category}
              data-price={product.price}
              className="flex"
            >
              <ProductCard
                product={product}
                className="w-full"
                eager={i === 0}
              />
            </div>
          ))}
        </ShopFilter>
      </Section>

      <BulkOrders />
    </>
  );
}
