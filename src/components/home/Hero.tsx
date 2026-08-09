import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

import {
  BlueLeaf,
  GreenLeaf,
  GridPaper,
  PinkDaisy,
  SeedCluster,
  SeedScatter,
  Sunflower,
} from "@/components/hero/HeroFlowers";
import ImageTiles from "@/components/ui/image-tiles";
import { CraftImage } from "@/components/media/CraftImage";
import { getFeaturedProducts, lowestPrice, products } from "@/data/products";
import { cn } from "@/lib/cn";
import { formatINR } from "@/lib/format";
import { getActiveFestival } from "@/lib/festival";
import { siteConfig } from "@/site.config";
import type { Product } from "@/types";

const TRUST = [
  siteConfig.trust.familiesServed
    ? `${siteConfig.trust.familiesServed} happy families`
    : null,
  "Handmade in small batches",
  "Ships across India",
].filter(Boolean) as string[];

/**
 * One tile of the fan. Rendered on the SERVER and passed into <ImageTiles> as
 * a prop, so the photo keeps next/image optimisation and the placeholder
 * fallback — a client component can't call CraftImage itself.
 */
function TileImage({ product, eager }: { product: Product; eager?: boolean }) {
  return (
    <CraftImage
      src={product.images[0]?.src ?? ""}
      alt={product.images[0]?.alt ?? product.name}
      motif={product.category}
      seedKey={product.slug}
      ratio="square"
      sizes="(max-width: 1024px) 40vw, 200px"
      eager={eager}
      showPlaceholderLabel={false}
    />
  );
}

/** Positions a flower, gives it an entrance, and keeps it gently moving. */
function Bloom({
  className,
  delay,
  idle,
  children,
}: {
  className?: string;
  delay: string;
  /** One of the float or sway utilities from globals.css. */
  idle: string;
  children: React.ReactNode;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn("pop-in absolute block", className)}
      style={{ animationDelay: delay }}
    >
      <span className={cn("block", idle)}>{children}</span>
    </span>
  );
}

export function Hero() {
  const festival = getActiveFestival();
  const tileProducts = getFeaturedProducts(3);

  return (
    <section className="relative overflow-hidden bg-cream">
      <GridPaper />

      {/* Soft colour washes behind everything */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-48 size-[38rem] rounded-full bg-peach/35 blur-[2px]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-52 top-40 size-[26rem] rounded-full bg-shell/70"
      />
      <SeedScatter className="pointer-events-none z-0 text-ink/30" />

      <Container className="relative py-12 md:py-16 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8">
          {/* ── Words ─────────────────────────────────────────────────
              Each block rises in on a stagger. Delays start after the
              preloader clears (~1.3s) so the entrance is actually seen
              rather than happening behind the splash. */}
          <div className="relative z-10">
            <p
              className="rise-in font-hand text-3xl text-terracotta-deep md:text-4xl"
              style={{ animationDelay: "0.95s" }}
            >
              {festival ? festival.name : "Handmade"}
            </p>

            <h1 className="mt-1 font-fun text-mega font-extrabold uppercase text-terracotta">
              <span
                className="rise-in block"
                style={{
                  textShadow: "5px 5px 0 var(--color-rose)",
                  animationDelay: "1.05s",
                }}
              >
                Rakhi
              </span>
              <span
                className="rise-in -mt-1 block"
                style={{
                  textShadow: "5px 5px 0 var(--color-rose)",
                  animationDelay: "1.15s",
                }}
              >
                Hampers
              </span>
            </h1>

            <p
              className="rise-in mt-5 text-sm font-bold uppercase tracking-[0.18em] text-ink/85 md:text-base"
              style={{ animationDelay: "1.25s" }}
            >
              {/* "N boxes" was true when the catalogue was five combo boxes.
                  With rakhis and single kits in it, most of these are not
                  boxes — and the "from" price is now a ₹50 rakhi, so the two
                  halves of this line have to agree about what they count. */}
              {products.length} handmade pieces · from {formatINR(lowestPrice)}
            </p>

            <p
              className="rise-in mt-5 max-w-[44ch] text-body leading-relaxed text-ink/75"
              style={{ animationDelay: "1.33s" }}
            >
              Every box holds a hand-crocheted rakhi, a soft toy to keep, and
              pieces to paint together — so the day doesn&apos;t end the moment
              the thread is tied.
            </p>

            <div
              className="rise-in mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
              style={{ animationDelay: "1.42s" }}
            >
              <Button href="/shop" size="lg">
                Shop the collection
              </Button>
              <WhatsAppButton
                ctx={{ kind: "general" }}
                variant="secondary"
                size="lg"
              >
                Chat with us
              </WhatsAppButton>
            </div>

            <ul
              className="rise-in mt-8 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-ink/70"
              style={{ animationDelay: "1.5s" }}
            >
              {TRUST.map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <span aria-hidden="true" className="text-rose">
                    ✦
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Flowers behind, product photos in front ───────────── */}
          <div className="relative mx-auto aspect-square w-full max-w-[460px] lg:max-w-none">
            {/* Flowers sit at the corners on the reference's diagonal, leaving
                the middle clear for the photo fan to land on.

                Three nested layers, because each owns a different transform:
                  outer  → position + pop-in entrance
                  inner  → the endless float/sway that keeps it alive
                  svg    → its fixed tilt
                Collapsing these would make the animations overwrite each
                other and the flower would sit dead still. */}
            <Bloom
              className="-left-[3%] -top-[2%] w-[42%]"
              delay="0.95s"
              idle="float-slow"
            >
              <Sunflower className="-rotate-[6deg] drop-shadow-[0_10px_18px_rgba(61,61,61,0.10)]" />
            </Bloom>

            <Bloom className="right-[1%] top-0 w-[23%]" delay="1.15s" idle="sway-slow">
              <BlueLeaf className="rotate-[16deg]" />
            </Bloom>

            <Bloom
              className="-left-[2%] top-[60%] w-[22%]"
              delay="1.25s"
              idle="sway-mid"
            >
              <GreenLeaf className="-rotate-[34deg]" />
            </Bloom>

            <Bloom
              className="-bottom-[3%] -right-[3%] w-[44%]"
              delay="1.05s"
              idle="float-mid"
            >
              <PinkDaisy className="rotate-[8deg] drop-shadow-[0_10px_18px_rgba(61,61,61,0.10)]" />
            </Bloom>

            <SeedCluster className="absolute left-[40%] top-[8%] w-[12%]" rotate={18} />
            <SeedCluster className="absolute bottom-[4%] left-[26%] w-[11%]" rotate={-26} />
            <SeedCluster className="absolute right-[6%] top-[44%] w-[10%]" rotate={8} />

            {/* The fanned photo tiles, layered over the flowers */}
            <div className="absolute inset-0 flex items-center justify-center">
              <ImageTiles
                className="w-[78%] -translate-y-[4%]"
                leftImage={<TileImage product={tileProducts[0]} />}
                middleImage={<TileImage product={tileProducts[1]} eager />}
                rightImage={<TileImage product={tileProducts[2]} />}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
