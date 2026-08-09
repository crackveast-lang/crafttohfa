import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { CraftImage } from "@/components/media/CraftImage";
import { WashiTape } from "@/components/ui/WashiTape";
import { Heart } from "@/components/doodles";

/**
 * The emotional core of the homepage. Kept to one quote of about 45 words —
 * a full biography here would dilute it. The rest lives on /about.
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
              Why any of this exists
            </p>

            <blockquote className="mt-6">
              <p
                data-reveal="rise"
                style={{ animationDelay: "90ms" }}
                className="max-w-[24ch] font-display text-h3 italic leading-tight md:max-w-[22ch] md:text-h2"
              >
                &ldquo;I watched screens quietly replace imagination in my own
                house. So I started making the thing I wished existed.&rdquo;
              </p>
            </blockquote>

            <p
              data-reveal="rise"
              style={{ animationDelay: "220ms" }}
              className="mt-8 max-w-[48ch] text-body leading-relaxed text-ink/80"
            >
              CraftTohfa began at a kitchen table with a crochet hook and a
              stubborn idea — that making something together should be easy
              enough to actually happen on a Tuesday evening.
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
              — with love, from our home to yours
            </p>

            <Link
              href="/about"
              data-reveal="rise"
              style={{ animationDelay: "760ms" }}
              className="group mt-7 inline-flex min-h-11 items-center gap-2 font-semibold underline decoration-sage decoration-2 underline-offset-8 hover:text-plum"
            >
              Read our story
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
