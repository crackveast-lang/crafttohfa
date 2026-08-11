import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { CraftImage } from "@/components/media/CraftImage";
import { WashiTape } from "@/components/ui/WashiTape";
import { Heart } from "@/components/doodles";

/**
 * The emotional core of the homepage. Kept to about 50 words in two short
 * paragraphs — a full biography here would dilute it, and the "Meet Craft
 * Tohfa" link is the whole point: the long version lives on /about.
 */
export function FounderStrip() {
  return (
    <section className="relative overflow-hidden bg-blush py-20 md:py-28">
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <div className="relative mx-auto w-full max-w-[300px]">
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
                  <CraftImage
                    src="/images/about/founder.jpg"
                    alt="The founder of CraftTohfa crocheting at a table"
                    ratio="square"
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

          <div>
            <p
              data-reveal="rise"
              className="text-eyebrow uppercase text-plum"
            >
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
              Craft Tohfa began with a simple thought, what if the little
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
            <p
              data-reveal="ink"
              style={{ animationDelay: "620ms" }}
              className="mt-6 font-hand text-2xl text-ink/70"
            >
             , with love, from our home to yours
            </p>

            <Link
              href="/about"
              data-reveal="rise"
              style={{ animationDelay: "760ms" }}
              className="group mt-7 inline-flex min-h-11 items-center gap-2 font-semibold underline decoration-sage decoration-2 underline-offset-8 hover:text-plum"
            >
              Meet Craft Tohfa
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
