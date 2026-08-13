import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { CraftImage } from "@/components/media/CraftImage";
import { WashiTape } from "@/components/ui/WashiTape";
import { Heart } from "@/components/doodles";

/**
 * The emotional core of the homepage. Kept to about 50 words in two short
 * paragraphs — a full biography here would dilute it, and the "Meet
 * Craftohfa" link is the whole point: the long version lives on /about.
 */
export function FounderStrip() {
  return (
    <section className="relative overflow-hidden bg-blush py-20 md:py-28">
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <div className="mx-auto w-full max-w-[300px]">
            {/* The tape and the heart are positioned against THIS box, not the
                whole column. Without it they anchor to the bottom of the name
                below and the heart drifts off the photo's corner. */}
            <div className="relative">
              <WashiTape
                className="-top-3 left-6 z-10"
                tone="peach"
                rotate={-8}
                reveal
                delay={250}
              />
              <div data-reveal="settle">
                <div data-drift="18" className="drift">
                  {/* The blob BREATHES. globals.css picked animatable
                    border-radius over clip-path on purpose — "clip-path would
                    jank on scroll" — and that decision bought an animation
                    capability nothing had spent yet. It interpolates only
                    partway toward blob-b, so you notice the photo is alive
                    without ever catching it moving. One property, one element,
                    and it is the most premium thing on the site. */}
                  <div className="blob-morph overflow-hidden border-2 border-ink/80 bg-cream">
                    {/* The photo's OWN 897x792, not a square. It was previously
                        padded to a square by replicating the edge rows, and the
                        bottom row is her hand — so the pad smeared skin tone
                        into a blurred band across the bottom of the blob. Her
                        face sits hard against the right edge and the "Made by
                        Craftohfa" plaque against the left, so there is no square
                        crop that keeps both; the frame is simply shown as shot.
                        Do not set ratio="square" here again. */}
                    <CraftImage
                      src="/images/about/founder.jpg"
                      alt="The founder of Craftohfa with a tray of paint-your-own plaster figures"
                      ratio="none"
                      className="aspect-[897/792]"
                      sizes="(max-width: 768px) 70vw, 300px"
                      showPlaceholderLabel={false}
                      seedKey="founder"
                    />
                  </div>
                </div>
              </div>
              {/* Entrance on the outer element, the endless heartbeat on the
                inner one — the house rule, because both want `transform`. */}
              <span
                data-reveal="sticker"
                style={{ animationDelay: "400ms" }}
                className="absolute -bottom-3 -right-2 block"
              >
                <Heart
                  aria-hidden="true"
                  className="heartbeat size-11 rounded-full border-2 border-ink bg-cream p-2 text-sage shadow-sticker-sm"
                />
              </span>
            </div>

            {/* The name under the photo, so the face has someone attached to
                it. mt-8 clears the heart sticker, which hangs off the
                bottom-right corner of the blob. */}
            <div
              data-reveal="rise"
              style={{ animationDelay: "520ms" }}
              className="mt-8 text-center"
            >
              <p className="font-display text-xl font-semibold text-ink">
                Anjali Gupta
              </p>
              <p className="mt-1 text-sm text-ink/70">Founder, Craftohfa</p>
            </div>
          </div>

          <div>
            <p data-reveal="rise" className="text-eyebrow uppercase text-plum">
              Our story
            </p>

            <h2
              data-reveal="rise"
              style={{ animationDelay: "90ms" }}
              className="mt-6 max-w-[24ch] text-h2 md:max-w-[22ch]"
            >
              A Tohfa, Made to Create Memories.
            </h2>

            <p
              data-reveal="rise"
              style={{ animationDelay: "220ms" }}
              className="mt-7 max-w-[52ch] text-body leading-relaxed text-ink/80"
            >
              Craftohfa began with a simple thought, what if the little
              moments we spend scrolling could become moments spent creating
              instead?
            </p>

            <p
              data-reveal="rise"
              style={{ animationDelay: "300ms" }}
              className="mt-4 max-w-[52ch] text-body leading-relaxed text-ink/80"
            >
              And so, we started creating thoughtful craft kits and gifts that
              bring children closer to creativity, imagination and each other.
            </p>

            {/* The one signature moment of the section: the handwritten line
                is WRITTEN rather than faded, by wiping a soft-edged mask
                across it. Highest impact and lowest cost of anything here,
                and it lands exactly where the emotional beat needs it. */}
            {/* Was ", with love, from our home to yours" — a stray leading
                comma where a name used to be. The name now sits under the
                photo, so this is just the sign-off. */}
            <p
              data-reveal="ink"
              style={{ animationDelay: "620ms" }}
              className="mt-6 font-hand text-2xl text-ink/70"
            >
              with love, from our home to yours
            </p>

            <Link
              href="/about"
              data-reveal="rise"
              style={{ animationDelay: "760ms" }}
              className="group mt-7 inline-flex min-h-11 items-center gap-2 font-semibold underline decoration-sage decoration-2 underline-offset-8 hover:text-plum"
            >
              Meet Craftohfa
              <span
                aria-hidden="true"
                data-reveal="nudge"
                style={{ animationDelay: "1300ms" }}
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
