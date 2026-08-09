import Link from "next/link";
import { CraftImage } from "@/components/media/CraftImage";
import { Card } from "@/components/ui/Card";
import { StickerBadge } from "@/components/ui/StickerBadge";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Rating } from "@/components/ui/Rating";
import { cn } from "@/lib/cn";
import { discountPercent, formatINR } from "@/lib/format";
import type { Product } from "@/types";

const GRID_SIZES =
  "(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 300px";

/**
 * The card links to the product page via a stretched pseudo-element on the
 * title anchor, so the whole card is clickable WITHOUT nesting the WhatsApp
 * anchor inside another anchor (invalid HTML, and it breaks long-press).
 */
export function ProductCard({
  product,
  className,
  sizes = GRID_SIZES,
  eager = false,
}: {
  product: Product;
  className?: string;
  sizes?: string;
  eager?: boolean;
}) {
  const off = discountPercent(product.price, product.compareAtPrice);

  return (
    <Card
      interactive
      className={cn("group flex flex-col overflow-hidden", className)}
    >
      <div className="relative">
        <CraftImage
          src={product.images[0]?.src ?? ""}
          alt={product.images[0]?.alt ?? product.name}
          motif={product.category}
          seedKey={product.slug}
          sizes={sizes}
          eager={eager}
          ratio="square"
          // 600ms on the settle curve rather than a snappy 500ms ease-out: a
          // slow zoom reads as weight, which is the whole difference between
          // "premium" and "responsive".
          imgClassName="transition-transform duration-[600ms] ease-settle group-hover:scale-[1.04]"
        />

        {/* The badges press themselves on a beat after the card lands. That
            overshoot is what sells them as stickers rather than printed
            labels, and it is this section's signature. */}
        <div className="pointer-events-none absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {product.badges?.map((b, i) => (
            <StickerBadge
              key={b}
              size="sm"
              rotate={i % 2 === 0 ? -3 : 2}
              reveal
              delay={200 + i * 90}
              // The wrapper is pointer-events-none, so the badge's own
              // hover:rotate-0 can never fire. Straightening on the CARD's
              // hover is what the gesture was always for.
              className="group-hover:rotate-0"
            >
              {b}
            </StickerBadge>
          ))}
          {off ? (
            <StickerBadge
              size="sm"
              tone="plum"
              rotate={2}
              reveal
              delay={200 + (product.badges?.length ?? 0) * 90}
              className="group-hover:rotate-0"
            >
              {off}% off
            </StickerBadge>
          ) : null}
        </div>

        {!product.inStock ? (
          <div className="absolute inset-0 grid place-items-center bg-cream/75">
            <span className="rounded-full border-2 border-ink bg-cream px-4 py-1.5 text-sm font-bold uppercase">
              Sold out
            </span>
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4 md:p-5">
        <h3 className="text-[1.05rem] leading-snug md:text-h3">
          <Link
            href={`/product/${product.slug}`}
            className="after:absolute after:inset-0 after:content-[''] hover:text-plum focus-visible:outline-none"
          >
            {product.name}
          </Link>
        </h3>

        <p className="line-clamp-2 text-sm leading-relaxed text-ink/70">
          {product.tagline}
        </p>

        {product.rating ? (
          <Rating value={product.rating.value} count={product.rating.count} />
        ) : null}

        <div className="mt-auto flex flex-wrap items-baseline gap-x-2 gap-y-0 pt-2">
          <span className="font-display text-xl font-semibold tabular">
            {formatINR(product.price)}
          </span>
          {/* ink/70, not the ink/50 a struck-through price would normally get:
              at /50 this measures 2.93:1, and it is real text carrying the
              whole discount claim. /70 is 5.05:1 and still reads as clearly
              secondary next to the bold price beside it. */}
          {product.compareAtPrice ? (
            <span className="text-sm text-ink/70 line-through tabular">
              {formatINR(product.compareAtPrice)}
            </span>
          ) : null}
        </div>

        {/* z-10 keeps this above the stretched link's pseudo-element.
            Sizing note: in the 2-up mobile grid a card is only ~132px wide at
            320px, leaving ~54px of label room — "Order on WhatsApp" cannot
            fit, so the label shortens rather than wrapping or overflowing.
            The narrowest case is actually the 3-up tablet grid (~179px
            button), which is why the text stays at 0.8rem at every size
            instead of growing back to 14px. */}
        <WhatsAppButton
          ctx={{ kind: "product", product }}
          size="sm"
          full
          className="relative z-10 mt-2 gap-1.5 px-3 text-[0.8rem]"
        >
          <span className="sm:hidden">Order</span>
          <span className="hidden sm:inline">Order on WhatsApp</span>
        </WhatsAppButton>
      </div>
    </Card>
  );
}
