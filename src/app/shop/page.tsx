import type { Metadata } from "next";
import Image from "next/image";
import { Heart } from "@/components/doodles";
import { WashiTape } from "@/components/ui/WashiTape";
import { resolvePhoto } from "@/lib/images";
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
        /* Just the price now. The count was doing the opposite of its job:
           "50 pieces" invites you to notice a catalogue is small long before
           it invites you to notice it is varied. */
        eyebrow={`From ${formatINR(lowestPrice)}`}
        /* Was a 🤍 emoji, which renders as whatever flat glyph the reader's
           OS ships and looked pasted-on beside a hand-drawn brand. This is
           the house Heart doodle instead: same stroke weight as every other
           mark on the site, and it draws itself in on arrival. */
        title={
          <>
            More creating. Less scrolling.{" "}
            <span
              aria-hidden="true"
              className="ml-1 inline-block w-[0.9em] align-baseline"
            >
              <span className="heartbeat block">
                <Heart
                  data-reveal="draw"
                  style={{ animationDelay: "420ms" }}
                  className="w-full text-peach [stroke-width:1.8]"
                />
              </span>
            </span>
          </>
        }
        aside={
          /* Small on purpose: the source is 309×270, so anything wider than
             about 300px starts to look soft. A bigger original would let this
             grow. Tilted and taped so it reads as part of the scrapbook
             language rather than a stock product shot dropped in. */
          <div className="relative rotate-2 transition-transform duration-300 hover:rotate-0">
            <WashiTape
              className="left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2"
              tone="peach"
              rotate={-5}
              reveal
              delay={520}
            />
            <div className="overflow-hidden rounded-frame border-2 border-ink/85 bg-cream shadow-lift">
              <Image
                src={resolvePhoto("/images/brand/shop-gift-box.png") ?? ""}
                alt="A Craft Tohfa gift box packed with a crochet teddy, a DIY painting kit and paints"
                width={309}
                height={270}
                className="h-auto w-full"
              />
            </div>
          </div>
        }
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
