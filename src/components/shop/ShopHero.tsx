import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { WashiTape } from "@/components/ui/WashiTape";
import {
  GiftBox,
  Heart,
  PaintBrush,
  Sparkle,
  Underline,
} from "@/components/doodles";
import { resolvePhoto } from "@/lib/images";
import { formatINR } from "@/lib/format";
import { lowestPrice } from "@/data/products";

/**
 * The shop banner.
 *
 * Its own component rather than another prop on PageHero: PageHero is a slim
 * band shared by /about, /faq, /contact, /policies and /returns, and this is a
 * full banner with a photo half and a feature strip under it. Bending the
 * shared one into this shape would have made five quiet pages pay for the one
 * loud one.
 *
 * The headline is unchanged, including the doodle heart and the hand-drawn
 * underline it has always carried.
 */

/** The four promises under the banner. Icons are all one-stroke doodles. */
const PROMISES = [
  {
    Icon: Sparkle,
    title: "Premium quality",
    body: "Safe, non-toxic paints",
    chip: "bg-blush",
  },
  {
    /* PaintBrush here and GiftBox below, not the other way round: the box
       belongs to the promise about gifting. Confetti was tried for gifting
       and is nine dots and six ticks, which at 20px is a smudge. */
    Icon: PaintBrush,
    title: "Everything you need",
    body: "All in one box",
    chip: "bg-peach",
  },
  {
    Icon: GiftBox,
    title: "Perfect for gifting",
    body: "Any occasion",
    chip: "bg-sage",
  },
  {
    Icon: Heart,
    title: "Handmade",
    body: "In small batches, by us",
    chip: "bg-blush",
  },
];

/* The banner photograph. A real open box rather than the small illustrated
   render: this prints at ~560px wide and the render is only 309px across, so
   it would be visibly soft here. `brand/shop-gift-box.png` is therefore no
   longer referenced anywhere; it is left in the repo rather than deleted, in
   case it wants a home at a smaller size later. */
const HERO_PHOTO = "/images/products/combos/little-car-rakhi-paint-hamper-1.jpg";

export function ShopHero() {
  const photo = resolvePhoto(HERO_PHOTO);

  return (
    <section className="relative overflow-hidden border-b border-ink/10 bg-blush">
      {/* Soft washes, same language as the homepage hero. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-40 size-[34rem] rounded-full bg-peach/40 blur-[2px]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-0 size-[22rem] rounded-full bg-cream/70"
      />

      <Container className="relative py-14 md:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
          {/* ── Words ───────────────────────────────────────────────── */}
          <div>
            <p data-reveal="rise" className="text-eyebrow uppercase text-plum">
              From {formatINR(lowestPrice)}
            </p>

            <h1
              data-reveal="rise"
              style={{ animationDelay: "80ms" }}
              className="relative mt-3 inline-block max-w-[18ch] text-h2 md:text-display"
            >
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
              <Underline
                aria-hidden="true"
                data-reveal="draw"
                style={{ animationDelay: "330ms" }}
                className="absolute -bottom-2 left-0 h-2.5 w-[min(200px,55%)] text-sage md:-bottom-3 md:h-3"
              />
            </h1>

            <p
              data-reveal="rise"
              style={{ animationDelay: "150ms" }}
              className="mt-7 max-w-[48ch] text-body leading-relaxed text-ink/75"
            >
              At Craft Tohfa, we believe childhood is meant to be filled with
              little moments of creating, imagining and discovering.
            </p>
            <p
              data-reveal="rise"
              style={{ animationDelay: "200ms" }}
              className="mt-4 max-w-[48ch] text-body leading-relaxed text-ink/75"
            >
              Thoughtfully curated craft kits and gifts that turn ordinary
              moments into something special.
            </p>

            {/* Anchors down the page rather than filtering it: /shop?c= is
                read by ShopFilter on mount, and a same-page link would change
                the query without remounting anything. */}
            <div data-reveal="rise" style={{ animationDelay: "260ms" }}>
              <Button href="#browse" size="lg" className="mt-8">
                Explore the collection
              </Button>
            </div>
          </div>

          {/* ── Photograph ──────────────────────────────────────────── */}
          <div className="relative mx-auto w-full max-w-[520px] lg:max-w-none">
            <div data-reveal="settle" style={{ animationDelay: "120ms" }}>
              <div className="relative rotate-[1.5deg]">
                <WashiTape
                  className="left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2"
                  tone="peach"
                  rotate={-6}
                  reveal
                  delay={480}
                />
                <div className="overflow-hidden rounded-frame border-2 border-ink/85 bg-cream shadow-lift">
                  {photo ? (
                    <Image
                      src={photo}
                      alt="An open Craft Tohfa box with a crochet puppy keychain, a rakhi card, a paint-your-own idol and car, and pots of paint"
                      width={1254}
                      height={1254}
                      priority
                      sizes="(max-width: 1024px) 90vw, 520px"
                      className="h-auto w-full"
                    />
                  ) : null}
                </div>
              </div>
            </div>

            {/* The small illustrated render was layered over this corner for
                a moment. At 38% of the frame nothing in it was legible, and
                a second box overlapping the first read as clutter rather than
                as depth. One photograph, like the reference. */}

            <Sparkle
              aria-hidden="true"
              data-reveal="draw"
              style={{ animationDelay: "700ms" }}
              className="absolute -right-2 top-6 size-8 text-peach md:size-10"
            />
          </div>
        </div>
      </Container>

      {/* ── The four promises ─────────────────────────────────────────
          Hairlines are a 1px grid gap over a tinted backdrop rather than
          borders on the cells, so the dividers are correct at one, two and
          four columns without a rule per breakpoint. Same trick as the
          homepage highlight bar. */}
      <div className="relative border-t border-ink/10 bg-cream/60">
        <Container className="px-0 md:px-0">
          <ul className="grid gap-px bg-ink/8 sm:grid-cols-2 lg:grid-cols-4">
            {PROMISES.map(({ Icon, title, body, chip }, i) => (
              <li
                key={title}
                data-reveal="rise-sm"
                style={{ animationDelay: `${i * 70}ms` }}
                className="flex items-center gap-3.5 bg-cream px-5 py-5 md:px-6"
              >
                <span
                  className={`grid size-11 shrink-0 place-items-center rounded-full ${chip}`}
                >
                  <Icon
                    aria-hidden="true"
                    data-reveal="draw"
                    style={{ animationDelay: `${i * 70 + 120}ms` }}
                    className="size-5 text-ink"
                  />
                </span>
                <span className="flex min-w-0 flex-col leading-tight">
                  <span className="font-display text-[0.95rem] font-semibold text-ink">
                    {title}
                  </span>
                  <span className="mt-0.5 text-sm leading-snug text-ink/65">
                    {body}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}
