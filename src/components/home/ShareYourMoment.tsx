import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { StickerBadge } from "@/components/ui/StickerBadge";
import { WashiTape } from "@/components/ui/WashiTape";
import { Confetti, InstagramGlyph, Sparkle } from "@/components/doodles";
import { siteConfig } from "@/site.config";

/**
 * The ask: post a photo, tag us, get a free bee on the next order.
 *
 * Deliberately a taped card on a plain band rather than another full-width
 * coloured section. It appears on the homepage AND on all 26 product pages,
 * and a whole extra band that often would start reading as furniture — a
 * card reads as a note pinned to the page, which is what it is.
 *
 * The handle comes from site.config rather than being typed in. It is
 * @craftohfa with ONE 't' — the same handle printed on the QR card in your
 * product photos. Hard-coding "@CraftTohfa" here would send everyone who
 * tries to tag you to an account that isn't yours.
 */
export function ShareYourMoment({
  tone = "blush",
}: {
  tone?: "blush" | "cream";
}) {
  const { instagram, instagramHandle } = siteConfig.social;

  return (
    <Section tone={tone} width="narrow">
      <div className="relative mx-auto max-w-[46rem]">
        <WashiTape
          className="left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2"
          tone="peach"
          rotate={-3}
          reveal
          delay={260}
        />

        <div
          data-reveal="settle"
          className="relative overflow-hidden rounded-frame border-2 border-ink bg-white px-6 py-10 text-center shadow-lift md:px-12 md:py-14"
        >
          {/* Decoration only — aria-hidden, and kept at /15 so it never
              competes with the text sitting on top of it. */}
          <Confetti
            aria-hidden="true"
            className="pointer-events-none absolute -left-6 -top-4 size-28 text-peach/70 sway-slow"
          />
          <Sparkle
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-5 -right-4 size-24 text-peach/70 float-mid"
          />

          <p
            data-reveal="rise"
            className="relative text-eyebrow uppercase text-plum"
          >
            📸 Share your moment
          </p>

          <h2
            data-reveal="rise"
            style={{ animationDelay: "90ms" }}
            className="relative mx-auto mt-4 max-w-[20ch] text-h2"
          >
            Share your CraftTohfa moment 🤍
          </h2>

          <p
            data-reveal="rise"
            style={{ animationDelay: "170ms" }}
            className="relative mx-auto mt-5 max-w-[46ch] text-body leading-relaxed text-ink/75"
          >
            Post your experience and a photo on Instagram, and tag{" "}
            {/* Emphasis, NOT a link. Inline in a paragraph it can only be
                ~21px tall, which is half the 44px minimum tap target — and it
                would go to exactly the same place as the full-size button
                directly below. The handle is here to be read and copied. */}
            <strong className="font-semibold text-plum underline decoration-peach decoration-2 underline-offset-4">
              {instagramHandle}
            </strong>
            . We&apos;d love to see your little Tohfa moment! ✨
          </p>

          <div
            data-reveal="sticker"
            style={{ animationDelay: "280ms" }}
            className="relative mt-7 flex justify-center"
          >
            <StickerBadge tone="peach" rotate={-2}>
              Tag us &amp; get a free bee 🐝 on your next order
            </StickerBadge>
          </div>

          <div
            data-reveal="rise"
            style={{ animationDelay: "360ms" }}
            className="relative mt-8 flex justify-center"
          >
            <Button
              href={instagram}
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramGlyph className="size-5" />
              Open Instagram
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
