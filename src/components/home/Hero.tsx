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
import HeroMarquee from "@/components/ui/hero-marquee";
import { CraftImage } from "@/components/media/CraftImage";
import { HeroHighlights } from "@/components/home/HeroHighlights";
import { HeartBurst, HeartSolid } from "@/components/doodles";
import { getProductsByCategory } from "@/data/products";
import { resolvePhoto } from "@/lib/images";
import { cn } from "@/lib/cn";
import type { Product } from "@/types";

/**
 * One slide of the marquee. Rendered on the SERVER and passed into
 * <HeroMarquee> as a prop, so the photo keeps next/image optimisation and the
 * placeholder fallback — a client component can't call CraftImage itself.
 */
function TileImage({ product, eager }: { product: Product; eager?: boolean }) {
  return (
    <CraftImage
      src={product.images[0]?.src ?? ""}
      alt={product.images[0]?.alt ?? product.name}
      motif={product.category}
      seedKey={product.slug}
      ratio="portrait"
      sizes="(max-width: 768px) 128px, 176px"
      eager={eager}
      showPlaceholderLabel={false}
    />
  );
}

/**
 * COMBO BOXES ONLY. The strip briefly ran round-robin across all four
 * categories, and it is back to the one category on request.
 *
 * It also happens to be the category that survives being 176px wide: a combo
 * box shot is an open box, filled, with the card and the paints visible, which
 * still reads at that size. A rakhi photograph is a close-up of a wrist, and a
 * wrist at 176px is a pink blur — the same reasoning the original three fanned
 * tiles were picked on.
 *
 * Only products whose photograph actually exists on disk. A designed
 * placeholder is fine on a product grid, where it is one cell among twenty and
 * clearly a card awaiting its photo; in a moving strip it is the one thing
 * your eye stops on.
 */
function comboPhotos(): Product[] {
  return getProductsByCategory("combos").filter((p) =>
    resolvePhoto(p.images[0]?.src ?? ""),
  );
}

/**
 * ONE SET OF THE STRIP HAS TO BE WIDER THAN THE WIDEST SCREEN.
 *
 * The marquee's track is exactly two copies of what it is given, and it
 * travels one copy per pass. So if a copy is narrower than the viewport, the
 * moment it has travelled its own width there is nothing left behind it and a
 * band of empty cream opens at the right edge — for the rest of the pass.
 *
 * With every category in play that never came up; ten slides was always wider
 * than any screen. Restricted to combo boxes there are only about seven
 * photographs, which at 176px + a 20px margin is ~1370px — fine at 1280, a
 * visible hole at 1920. So the list is cycled up to a count that clears the
 * widest screen worth designing for:
 *
 *   2560px ÷ 196px per slide ≈ 13.1  →  14
 *
 * Repeating means a photograph can appear twice in one pass. That is the
 * lesser problem by a distance: the repeats sit seven slides apart, and a gap
 * in the strip reads as broken where a repeat reads as a pattern.
 */
const MIN_SLIDES = 14;

function fillStrip(products: Product[], min = MIN_SLIDES): Product[] {
  if (products.length === 0) return products;
  const out: Product[] = [];
  while (out.length < min) out.push(products[out.length % products.length]);
  return out;
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
  const slides = fillStrip(comboPhotos());

  return (
    /* The gap under the header lives HERE, on the section, and not as `pt-` on
       the Container below — which is where it used to be and where it caused a
       problem. The flowers are positioned as percentages of the words block,
       so any padding inside that block grows their coordinate space without
       moving the words' own top edge: add 32px of breathing room that way and
       the text steps down while every flower stays where it was, drifting out
       of the composition. Padding the section moves the whole arrangement —
       words and flowers together — as one piece. */
    <section className="relative overflow-hidden bg-cream pt-10 md:pt-20 lg:pt-24">
      <GridPaper />

      {/* Soft colour washes behind everything. They used to sit off the top
          right and the left edge, framing a two-column layout from the
          outside. With the words now centred, that pair reads as lopsided
          unless it is roughly symmetric about the middle — so peach comes
          down over the left shoulder of the headline and blush answers it on
          the right, a little lower. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 -top-52 size-[38rem] rounded-full bg-peach/35 blur-[2px]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-44 top-24 size-[26rem] rounded-full bg-blush/70"
      />
      <SeedScatter className="pointer-events-none z-0 text-ink/30" />

      {/* ── Words, with the flowers framing them ──────────────────────────
          Centred now, and the whole column is one measure rather than a
          headline, a paragraph and a button row that each found their own
          width. Each block still rises in on a stagger, and every delay on
          this page is keyed to the preloader, which runs its gift-box gesture
          and clears at ~1.85s: the first element starts at 1.5s so it is
          rising as the splash fades, and nothing before that is animating
          behind an opaque overlay. Change the splash timing in globals.css
          and every number here moves with it.

          THE VERTICAL BUDGET, and why every gap in here is responsive. On a
          390x844 phone the first screen is ~745px after Safari's own chrome,
          and the announcement bar plus the header take ~92px of it. The photo
          strip below wants ~200px more, and it has to stay on that first
          screen — a hero whose photographs are all below the fold is a wall of
          type. So the mobile gaps are the tight ones (mt-6 / mt-5 / mt-6) and
          `md:` and up get the roomy set (mt-8 / mt-7 / mt-10). Measure before
          changing any of them; the mobile column has about 40px of slack in
          it, not 100.

          The mobile ps-[7%] indent every block used to carry is gone, and
          deliberately: it existed to nudge a LEFT-ALIGNED column off the
          gutter. On centred text an indent is just a column that isn't
          centred any more. */}
      <div className="relative">
        {/* ── Flowers ─────────────────────────────────────────────────────
            They no longer live in a grid cell of their own — there isn't one
            any more — so they flank the centred column instead, keeping the
            reference's diagonal: the two big blooms on one, the two leaves on
            the other.

            Measured against THIS wrapper — the words — and not against the
            section. The section's height swings by ~140px between desktop and
            mobile because the trust bar at the bottom re-flows from one row to
            four, so a flower placed at `top-[40%]` of the section sits beside
            the buttons at one width and on top of the photo strip at another.
            The copy is what they are supposed to frame, so the copy is what
            they are measured against. They still overflow this box freely; it
            is only a coordinate space.

            Every size has a mobile value roughly half the desktop one, and on
            mobile both big blooms sit up in the BADGE row rather than beside
            the headline: at 390px the words take the full width of the screen
            and there is no margin to stand in, but the badge is a 200px pill
            in the middle of the line, so the two top corners are the one
            place that is reliably empty.

            Three nested layers per flower, because each owns a different
            transform:
              outer  → position + pop-in entrance
              inner  → the endless float/sway that keeps it alive
              svg    → its fixed tilt
            Collapsing these would make the animations overwrite each other
            and the flower would sit dead still. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <Bloom
            className="-left-[7%] top-[2%] w-[21%] sm:-left-[3%] sm:w-[17%] lg:left-[2%] lg:top-[6%] lg:w-[15%]"
            delay="1.5s"
            idle="float-slow"
          >
            <Sunflower className="-rotate-[6deg] drop-shadow-[0_10px_18px_rgba(51,45,50,0.10)]" />
          </Bloom>

          <Bloom
            className="-right-[7%] top-[2%] w-[19%] sm:-right-[3%] sm:w-[16%] lg:right-[2%] lg:top-[14%] lg:w-[14%]"
            delay="1.56s"
            idle="float-mid"
          >
            <PinkDaisy className="rotate-[8deg] drop-shadow-[0_10px_18px_rgba(51,45,50,0.10)]" />
          </Bloom>

          <Bloom
            className="-right-[2%] top-[70%] w-[11%] sm:right-[2%] sm:w-[9%] lg:right-[9%] lg:top-[58%] lg:w-[7%]"
            delay="1.62s"
            idle="sway-slow"
          >
            <BlueLeaf className="rotate-[16deg]" />
          </Bloom>

          <Bloom
            className="-left-[3%] top-[76%] w-[10%] sm:left-[2%] sm:w-[8.5%] lg:left-[10%] lg:top-[66%] lg:w-[6.5%]"
            delay="1.7s"
            idle="sway-mid"
          >
            <GreenLeaf className="-rotate-[34deg]" />
          </Bloom>

          {/* The ticks that used to cluster around the photo fan. The same
              three, moved out onto the shoulders of the centred column. */}
          <SeedCluster
            className="absolute left-[4%] top-[40%] w-[7%] lg:left-[14%] lg:top-[26%] lg:w-[4%]"
            rotate={18}
          />
          <SeedCluster
            className="absolute right-[4%] top-[50%] w-[6.5%] lg:right-[17%] lg:top-[34%] lg:w-[3.6%]"
            rotate={-26}
          />
          <SeedCluster
            className="absolute left-[9%] top-[92%] w-[6%] lg:left-[9%] lg:top-[80%] lg:w-[3.4%]"
            rotate={8}
          />
        </div>

        <Container className="relative z-10 text-center">
          <div className="mx-auto flex max-w-3xl flex-col items-center">
            {/* A badge, not the logo. The mark used to sit here and it was the
                header repeating itself a hundred pixels lower — the same
                artwork twice in the first screen, which spends the hero's
                strongest position on something already on screen. Three words
                of intent cost a fraction of the height and say the thing the
                logo was only implying. */}
            <div className="rise-in" style={{ animationDelay: "1.5s" }}>
              <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-blush px-4 py-2 text-eyebrow uppercase text-ink/80">
                {/* Solid mark rather than the line doodle: at 12px a 2px stroke
                    closes up into a blob. <HeartSolid> and not the U+2764
                    character that was here — see the note on the component; iOS
                    renders that codepoint as a system emoji and drops the
                    colour. Same bug as the one in the wordmark. */}
                <span className="heartbeat inline-block">
                  <HeartSolid className="size-[0.95em] text-rose" />
                </span>
                Made with love
              </span>
            </div>

            {/* Not `text-mega`, and not uppercase, and no hard offset shadow —
                all three were built for the two-word poster this used to be. A
                sentence set at 13vw uppercase would run four lines deep and
                shout copy that is deliberately quiet, and a 5px offset shadow
                costs legibility the headline can't spare.

                The clamp runs a little larger than the two-column version's did
                (2rem–4.25rem against 1.85–3.75). A centred headline gets the
                full measure instead of half a grid, so the old ceiling left it
                looking undersized in the middle of the page; max-w-[19ch] is
                what holds it to the two lines it is written as.

                Ink carries the sentence and ONE phrase is rose. That phrase is
                the payoff of the line, so it is the only place worth spending
                an accent — highlighting more than one turns a hierarchy into
                stripes. Rose exists purely for this; see the rose budget in
                globals.css before reaching for it anywhere else. */}
            <h1 className="mt-6 max-w-[19ch] font-fun text-[clamp(1.9rem,6.2vw,4.25rem)] font-extrabold leading-[1.06] tracking-tight text-ink md:mt-8">
              <span className="rise-in block" style={{ animationDelay: "1.58s" }}>
                Made for moments
              </span>
              <span className="rise-in block" style={{ animationDelay: "1.66s" }}>
                worth <span className="text-rose">holding onto.</span>
                {/* In the flow of the line, not absolutely positioned beside
                    it. The hero clips its overflow, so a mark hung off the
                    right of the headline is the one thing guaranteed to be
                    half-cut on a narrow phone; inline it simply wraps with the
                    words. Sized in `em` so it tracks the clamp. */}
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

            {/* 24ch on PHONES, 54ch from `sm` up. The narrow measure is not
                about readability — it is what leaves the flowers a margin to
                stand in. Centred text at the full 350px of a 390px screen
                touches both gutters, and every piece of decoration then has a
                choice between sitting on the words or not appearing at all. */}
            <p
              className="rise-in mt-5 max-w-[24ch] text-body leading-relaxed text-ink/75 sm:max-w-[54ch] md:mt-7"
              style={{ animationDelay: "1.74s" }}
            >
              Handcrafted crochet rakhis, DIY painting kits, little keepsakes,
              and thoughtfully curated combo boxes, all made to make gifting a
              little more special.
            </p>

            {/* Side by side from 390px up rather than stacked until `sm`. Two
                full-width lg buttons cost ~116px of the first screen and the
                second one is the softer of the two asks, so it does not need
                its own row. `flex-wrap` still lets them stack if the labels
                ever grow, and `justify-center` keeps them under the column when
                they do. */}
            <div
              className="rise-in mt-6 flex flex-wrap justify-center gap-2.5 md:mt-10 md:gap-3"
              style={{ animationDelay: "1.82s" }}
            >
              {/* min-h-12 on phones rather than lg's 14. 48px is still well
                  clear of the 44px tap minimum, and the two of them stack here,
                  so the 8px comes off the fold twice. */}
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
        </Container>
      </div>

      {/* ── The photographs ───────────────────────────────────────────────
          Outside the Container on purpose: the strip has to run edge to edge
          and dissolve into the cream, and a max-w-[1200px] wrapper would stop
          it dead at the gutter on a wide screen — the one thing an endless
          marquee must not do.

          It carries the load-keyed entrance like everything else, at 1.9s, so
          it arrives after the buttons rather than being the first thing
          moving. The horizontal drift itself starts at hydration and spends
          its first second behind the splash; that is fine, a loop with no
          beginning has nothing to miss. */}
      <div
        className="rise-in relative z-10 mt-10 md:mt-14"
        style={{ animationDelay: "1.9s" }}
      >
        <HeroMarquee
          slides={slides.map((product, i) => (
            /* The first slide is the eager one: it is the left-most thing on
               screen when the strip starts, so it is the LCP candidate.

               Keyed by INDEX, not by slug: fillStrip cycles the combo boxes to
               fill the strip, so the same product legitimately appears more
               than once and a slug key would collide. */
            <TileImage key={i} product={product} eager={i === 0} />
          ))}
        />
      </div>

      {/* The numbers close the hero, under the photographs. As a three-item
          text list beside the buttons they were competing with the CTA for
          the same glance; full width at the bottom they are the last thing
          read on the way out, which is where a trust claim actually does its
          work.

          It sits a long way clear of the strip on purpose — mt-14 rather than
          the mt-6 it started at. Tucked up against the photographs it read as
          a caption belonging to them; with the gap it reads as its own band,
          which is what it is. */}
      <Container className="relative z-10 pb-14 md:pb-20">
        <HeroHighlights className="mt-10 md:mt-14" />
      </Container>
    </section>
  );
}
