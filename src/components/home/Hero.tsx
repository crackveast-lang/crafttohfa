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
import { HeroHighlights } from "@/components/home/HeroHighlights";
import { HeartBurst } from "@/components/doodles";
import { getProductsByCategory } from "@/data/products";
import { cn } from "@/lib/cn";
import type { Product } from "@/types";

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
  /* COMBO BOXES specifically, not whatever happens to be flagged featured.
     These three tiles are the only photograph in the first screen, and a
     combo box shot is the one that reads at 200px: an open box, filled, with
     the card and the paints visible. A rakhi photograph is a close-up of a
     wrist, which at tile size is a pink blur. */
  const tileProducts = getProductsByCategory("combos").slice(0, 3);

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
        className="pointer-events-none absolute -left-52 top-40 size-[26rem] rounded-full bg-blush/70"
      />
      <SeedScatter className="pointer-events-none z-0 text-ink/30" />

      {/* THE VERTICAL BUDGET, and why several numbers here are responsive.
          On a 390x844 phone the first screen is ~745px after Safari's own
          chrome, and the announcement bar plus the header take ~92px of it.
          Everything from here to the flowers has to fit in what is left, or
          the hero lands as a wall of type with the artwork entirely below the
          fold — which is exactly what it was doing. The mobile values (py-8,
          gap-6, the tighter margins and the 1.85rem headline floor) are what
          buy the flower column its ~220px. Measure before changing any of
          them; `md:` and up are the originals and should stay that way. */}
      <Container className="relative py-6 md:py-16 lg:py-20">
        <div className="grid items-center gap-5 md:gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8">
          {/* ── Words ─────────────────────────────────────────────────
              Each block rises in on a stagger. Every delay on this page is
              keyed to the preloader, which now runs its gift-box gesture and
              clears at ~1.85s: the first element starts at 1.5s so it is
              rising as the splash fades, and nothing before that is animating
              behind an opaque overlay. Change the splash timing in
              globals.css and every number here moves with it. */}
          <div className="relative z-10">
            {/* The "Made with love" pill that used to open this column is gone,
                by request. The headline is the first thing in the hero now, so
                it starts the 1.5s stagger the badge used to hold. */}

            {/* Not `text-mega`, and not uppercase, and no hard offset shadow —
                all three were built for the two-word poster this used to be.
                A sentence set at 13vw uppercase would run four lines deep and
                shout copy that is deliberately quiet, and a 5px offset shadow
                costs legibility the headline can't spare. The clamp tops out
                where "worth holding onto." still fits the column at lg.

                The MOBILE floor is 1.85rem rather than 2.25rem, and it is
                doing a specific job: see the note on the vertical budget
                below. Desktop is untouched — the clamp only bottoms out below
                ~640px, so nothing above `sm` moves by a pixel.

                Ink carries the sentence and ONE phrase is rose. That phrase is
                the payoff of the line, so it is the only place worth spending
                an accent — highlighting more than one turns a hierarchy into
                stripes. Rose exists purely for this; see the rose budget in
                globals.css before reaching for it anywhere else. */}
            {/* ps-[7%] on PHONES ONLY, and the paragraph and buttons below
                carry the same indent so the column reads as one block that has
                been nudged in — a headline indented on its own just looks
                misaligned against the copy under it. 7% of a 350px content
                width is ~25px: enough to feel like breathing room on the left,
                not enough to cost the headline a line. It is dropped at `md`,
                where the grid gives the column its own whitespace and an
                indent would only eat into the measure. */}
            <h1 className="ps-[7%] font-fun text-[clamp(1.85rem,5.4vw,3.75rem)] font-extrabold leading-[1.06] tracking-tight text-ink md:ps-0">
              <span className="rise-in block" style={{ animationDelay: "1.5s" }}>
                Made for moments
              </span>
              <span className="rise-in block" style={{ animationDelay: "1.58s" }}>
                worth <span className="text-rose">holding onto.</span>
                {/* In the flow of the line, not absolutely positioned beside
                    it. The hero clips its overflow, so a mark hung off the
                    right of the headline is the one thing guaranteed to be
                    half-cut on a narrow phone; inline it simply wraps with
                    the words. Sized in `em` so it tracks the clamp. */}
                <span
                  aria-hidden="true"
                  className="pop-in ml-2 inline-block w-[1.15em] align-baseline"
                  style={{ animationDelay: "1.98s" }}
                >
                  <span className="heartbeat block">
                    <HeartBurst className="w-full text-rose" />
                  </span>
                </span>
              </span>
            </h1>

            <p
              className="rise-in mt-4 max-w-[48ch] ps-[7%] text-body leading-relaxed text-ink/75 md:mt-6 md:ps-0"
              style={{ animationDelay: "1.66s" }}
            >
              Handcrafted crochet rakhis, DIY painting kits, little keepsakes,
              and thoughtfully curated combo boxes, all made to make gifting a
              little more special.
            </p>

            {/* Side by side from 390px up rather than stacked until `sm`.
                Two full-width lg buttons cost ~116px of the first screen and
                the second one is the softer of the two asks, so it does not
                need its own row. `flex-wrap` still lets them stack if the
                labels ever grow. */}
            <div
              className="rise-in mt-4 flex flex-wrap gap-2.5 ps-[7%] md:mt-8 md:gap-3 md:ps-0"
              style={{ animationDelay: "1.74s" }}
            >
              {/* min-h-12 on phones rather than lg's 14. 48px is still well
                  clear of the 44px tap minimum, and the two of them stack
                  here, so the 8px comes off the fold twice. */}
              <Button href="/shop" size="lg" className="min-h-12 md:min-h-14">
                Shop the collection
              </Button>
              <WhatsAppButton
                ctx={{ kind: "general" }}
                variant="secondary"
                size="lg"
                className="min-h-12 md:min-h-14"
              >
                Chat with us
              </WhatsAppButton>
            </div>
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
              delay="1.5s"
              idle="float-slow"
            >
              <Sunflower className="-rotate-[6deg] drop-shadow-[0_10px_18px_rgba(51,45,50,0.10)]" />
            </Bloom>

            <Bloom className="right-[1%] top-0 w-[23%]" delay="1.62s" idle="sway-slow">
              <BlueLeaf className="rotate-[16deg]" />
            </Bloom>

            <Bloom
              className="-left-[2%] top-[60%] w-[22%]"
              delay="1.7s"
              idle="sway-mid"
            >
              <GreenLeaf className="-rotate-[34deg]" />
            </Bloom>

            <Bloom
              className="-bottom-[3%] -right-[3%] w-[44%]"
              delay="1.56s"
              idle="float-mid"
            >
              <PinkDaisy className="rotate-[8deg] drop-shadow-[0_10px_18px_rgba(51,45,50,0.10)]" />
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

        {/* The numbers moved out of the copy column and became the hero's
            closing line. As a three-item text list beside the buttons they
            were competing with the CTA for the same glance; full width under
            both columns they are the last thing read on the way out, which is
            where a trust claim actually does its work. */}
        <HeroHighlights className="mt-14 lg:mt-16" />
      </Container>
    </section>
  );
}
