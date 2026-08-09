import Link from "next/link";
import { Rating } from "@/components/ui/Rating";
import { StickerBadge } from "@/components/ui/StickerBadge";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Heart, Leaf, Sparkle } from "@/components/doodles";
import { categoryName } from "@/data/categories";
import { discountPercent, formatINR } from "@/lib/format";
import { siteConfig } from "@/site.config";
import type { Product } from "@/types";

export function ProductBuyBox({ product }: { product: Product }) {
  const off = discountPercent(product.price, product.compareAtPrice);

  return (
    <div id="buy-box" className="flex flex-col gap-5 scroll-mt-28">
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href={`/shop?c=${product.category}`}
          className="inline-flex min-h-11 items-center rounded-full border border-ink/25 px-4 text-xs font-semibold uppercase tracking-wider text-ink/70 transition-colors hover:border-ink hover:text-ink"
        >
          {categoryName(product.category)}
        </Link>
        {product.badges?.map((b) => (
          <StickerBadge key={b} size="sm">
            {b}
          </StickerBadge>
        ))}
      </div>

      <div>
        <h1 className="text-h2">{product.name}</h1>
        {/* Not font-hand: taglines run to a dozen words, and Caveat over two
            wrapped lines gets hard to read. Handwriting stays for short bursts. */}
        <p className="mt-3 max-w-[46ch] text-lg leading-relaxed text-ink/70">
          {product.tagline}
        </p>
      </div>

      {product.rating ? (
        <Rating
          value={product.rating.value}
          count={product.rating.count}
          size="md"
        />
      ) : null}

      <div className="flex flex-wrap items-baseline gap-3">
        <span className="font-display text-4xl font-semibold tabular">
          {formatINR(product.price)}
        </span>
        {product.compareAtPrice ? (
          <>
            <span className="text-lg text-ink/45 line-through tabular">
              {formatINR(product.compareAtPrice)}
            </span>
            {off ? (
              <span className="rounded-full bg-terracotta px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white">
                Save {off}%
              </span>
            ) : null}
          </>
        ) : null}
        <span className="w-full text-sm text-ink/60">
          Inclusive of all taxes ·{" "}
          {product.price >= siteConfig.shipping.freeAbove
            ? "Free shipping"
            : `${formatINR(siteConfig.shipping.flatRate)} shipping`}
        </span>
      </div>

      <p className="max-w-[56ch] text-body leading-relaxed text-ink/80">
        {product.description}
      </p>

      <ul className="flex flex-col gap-2">
        {product.highlights.map((h) => (
          <li key={h} className="flex items-start gap-2.5 text-[0.95rem]">
            <Sparkle
              aria-hidden="true"
              className="mt-1 size-4 shrink-0 text-terracotta"
            />
            <span className="text-ink/85">{h}</span>
          </li>
        ))}
      </ul>

      <div className="mt-1 flex flex-col gap-3">
        {product.inStock ? (
          <WhatsAppButton
            ctx={{ kind: "product", product }}
            size="lg"
            full
          >
            Order on WhatsApp
          </WhatsAppButton>
        ) : (
          <WhatsAppButton
            ctx={{
              kind: "product",
              product,
              note: "Is this back in stock yet? I'd like one when it is.",
            }}
            size="lg"
            variant="secondary"
            full
          >
            Ask when it&apos;s back
          </WhatsAppButton>
        )}

        <WhatsAppButton
          ctx={{
            kind: "product",
            product,
            note: "I had a question about this before ordering:",
          }}
          variant="secondary"
          size="lg"
          full
          showIcon={false}
        >
          Ask a question first
        </WhatsAppButton>

        <p className="text-center text-sm text-ink/60">
          {siteConfig.whatsapp.responseTime} · No account, no checkout form
        </p>
      </div>

      <ul className="mt-2 grid grid-cols-3 gap-3 border-t border-ink/12 pt-5 text-center">
        <TrustItem icon={<Heart className="size-5" />} label="Made by hand" />
        <TrustItem
          icon={<Sparkle className="size-5" />}
          label="Dispatch in 2–3 days"
        />
        <TrustItem icon={<Leaf className="size-5" />} label="Ships pan-India" />
      </ul>
    </div>
  );
}

function TrustItem({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <li className="flex flex-col items-center gap-1.5">
      <span aria-hidden="true" className="text-terracotta">
        {icon}
      </span>
      <span className="text-xs font-medium leading-tight text-ink/70">
        {label}
      </span>
    </li>
  );
}
