import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { WashiTape } from "@/components/ui/WashiTape";
import { Heart, Sparkle, Underline } from "@/components/doodles";
import { resolvePhoto } from "@/lib/images";

/**
 * The shop banner.
 *
 * Its own component rather than another prop on PageHero: PageHero is a slim
 * band shared by /about, /faq, /contact, /policies and /returns, and this is a
 * full banner with a photo half. Bending the shared one into this shape would
 * have made five quiet pages pay for the one loud one.
 *
 * The headline is unchanged, including the doodle heart and the hand-drawn
 * underline it has always carried.
 */

/**
 * The banner photograph: the packed, ribboned box with its thank-you tag, the
 * rocket and the thank-you card. It shows what actually ARRIVES, rather than
 * one combo out of fifty, which is the right promise to open the shop with.
 *
 * CROPPED TO 3:4 from a 941x1672 phone frame, not centre-cropped by the
 * browser: y=280..1535, which is the top of the box down to the base of the
 * rocket. Letting a 9:16 image size itself would stand it ~750px tall against
 * a ~480px column of type. The source is public/images/"now changes"/
 * "shop banner images.png" if it ever wants re-cutting.
 *
 * ⚠️ The Devanagari on the card and the gift tag in this shot reads लोकऊ, not
 * तोहफा, and the shot it replaced had it right. Nothing in the code can fix
 * that — it needs a clean photograph. Flagged, not silently accepted.
 *
 * (`brand/shop-gift-box.png`, the small illustrated render, is referenced by
 * nothing — it is only 309px across and goes soft at this size.)
 */
const HERO_PHOTO = "/images/brand/shop-hero.jpg";

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
            {/* No "From ₹N" eyebrow: the prices are on the cards a scroll
                below, and leading with the cheapest one framed the whole shop
                as a discount rack. The headline starts the column now. */}
            <h1
              data-reveal="rise"
              className="relative inline-block max-w-[18ch] text-h2 md:text-display"
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
          {/* Capped at 440px because the source is only 720px wide. Any wider
              and a 2x screen is asking for more pixels than exist. */}
          <div className="relative mx-auto w-full max-w-[400px] lg:max-w-[440px]">
            <div data-reveal="settle" style={{ animationDelay: "120ms" }}>
              <div className="relative rotate-[1.5deg]">
                <WashiTape
                  className="left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2"
                  tone="peach"
                  rotate={-6}
                  reveal
                  delay={480}
                />
                {/* A FIXED frame matching the file's own 3:4, so object-cover
                    has nothing left to crop and the considered crop survives.
                    Fixing it also means swapping the photo again later cannot
                    change the height of the hero. */}
                <div className="aspect-[3/4] overflow-hidden rounded-frame border-2 border-ink/85 bg-cream shadow-lift">
                  {photo ? (
                    <Image
                      src={photo}
                      alt="A ribboned Craft Tohfa gift box with dried flowers, a thank-you tag and a paint-your-own space rocket"
                      width={941}
                      height={1255}
                      priority
                      sizes="(max-width: 1024px) 90vw, 440px"
                      className="size-full object-cover"
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

      {/* The four-promise strip that used to sit here — Premium quality /
          Everything you need / Perfect for gifting / Handmade — is gone. The
          banner now ends at the photo and the grid goes straight into the
          products, which is the point of the page. The same promises are still
          made on the homepage (WhatsInside) and on every product page. */}
    </section>
  );
}
