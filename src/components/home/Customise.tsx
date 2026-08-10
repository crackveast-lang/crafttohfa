import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { WashiTape } from "@/components/ui/WashiTape";
import { StickerBadge } from "@/components/ui/StickerBadge";
import { GiftBox, Sparkle } from "@/components/doodles";

/**
 * The "make it yours" ask, and the only section on the homepage whose CTA
 * goes to /contact rather than to WhatsApp or /shop.
 *
 * It deliberately sits straight after FeaturedProducts: the question
 * "can it say her name on it?" arrives while someone is still looking at the
 * boxes, and answering it three sections later is answering it too late.
 *
 * A card on the cream ground rather than another full-width colour band —
 * FeaturedProducts above it is already blush, and two tinted bands in a row
 * flatten into one long stripe with a gap in the middle.
 */
export function Customise() {
  return (
    <Section tone="cream" id="customise" width="narrow" className="py-16 md:py-20">
      <div
        data-reveal="settle"
        className="relative mx-auto max-w-[46rem] rounded-frame border-2 border-ink bg-white px-6 py-12 text-center shadow-lift md:px-14 md:py-14"
      >
        <WashiTape
          className="left-10 top-0 -translate-y-1/2"
          tone="peach"
          rotate={-7}
          reveal
          delay={220}
        />

        <Sparkle
          aria-hidden="true"
          data-reveal="draw"
          className="pointer-events-none absolute -left-3 bottom-6 size-16 text-peach/70 sway-slow"
        />

        <span
          data-reveal="pop"
          className="mx-auto grid size-14 place-items-center rounded-full border-2 border-ink bg-blush shadow-sticker-sm"
        >
          <GiftBox aria-hidden="true" className="size-7 text-ink" />
        </span>

        <h2
          data-reveal="rise"
          style={{ animationDelay: "90ms" }}
          className="mx-auto mt-6 max-w-[20ch] text-h2"
        >
          Want to Make It Extra Special?
        </h2>

        <p
          data-reveal="rise"
          style={{ animationDelay: "180ms" }}
          className="mx-auto mt-4 max-w-[38ch] text-body leading-relaxed text-ink/75"
        >
          Customise your hamper with a personal touch.
        </p>

        <div data-reveal="rise" style={{ animationDelay: "270ms" }}>
          <Link
            href="/contact"
            className="group mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-7 font-semibold text-white shadow-soft transition-all duration-200 ease-bounce hover:-translate-y-0.5 hover:shadow-lift"
          >
            Contact us for customisation
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>

        <StickerBadge
          tone="sage"
          rotate={4}
          size="sm"
          className="absolute -bottom-3 right-6"
          reveal
          delay={420}
        >
          Names · colours · notes
        </StickerBadge>
      </div>
    </Section>
  );
}
