import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CraftImage } from "@/components/media/CraftImage";
import { WashiTape } from "@/components/ui/WashiTape";
import { StickerBadge } from "@/components/ui/StickerBadge";
import { Button } from "@/components/ui/Button";
import {
  GiftBox,
  Heart,
  PaintBrush,
  RakhiThread,
  Sparkle,
} from "@/components/doodles";
import { getProduct } from "@/data/products";

/**
 * Every hamper has the same anatomy, so explaining it once is far more useful
 * than a "shop by category" strip — especially with one category. It also
 * answers the question people actually have: what do I get for the money?
 */
const CONTENTS = [
  {
    Icon: RakhiThread,
    title: "A hand-crocheted rakhi",
    body: "Worked in soft cotton with pearl and gold beads, on a printed card ready to gift.",
  },
  {
    Icon: Heart,
    title: "A crochet keepsake",
    body: "A soft toy, keychain or little bag — the part that's still around long after August.",
  },
  {
    Icon: PaintBrush,
    title: "A bhai–behen idol to paint",
    body: "The plaster brother-and-sister figure, in every single box, waiting to be coloured in.",
  },
  {
    Icon: Sparkle,
    title: "A second piece to paint",
    body: "A butterfly, a car money box, a strawberry — whichever matches the box you pick.",
  },
  {
    Icon: GiftBox,
    title: "Paints, a brush and a card",
    body: 'Acrylic pots, a brush, and a "Happy Raksha Bandhan" card, all boxed and ready.',
  },
];

export function WhatsInside() {
  const hero = getProduct("hello-kitty-rakhi-paint-hamper");

  return (
    <Section tone="cream" id="whats-inside">
      <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-start lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Every box, the same promise"
            title="It isn't just a rakhi in a box"
            intro="Tie the thread in the morning, and there's still something to do together in the afternoon. That's the whole idea."
          />

          {/* The spine of the section, and the one place on the page where the
              reveal is paced by the reader rather than by a timer.

              Each row carries its OWN data-reveal rather than sharing one
              staggered group, so the list assembles at whatever speed you
              scroll: row, then its icon badge, then the little number chip.
              Five of those building 1-2-3-4-5 under your own scrolling is the
              most immersive beat available here — a single group stagger
              would fire all five at once and throw it away. */}
          <ol className="mt-10 flex flex-col gap-6">
            {CONTENTS.map(({ Icon, title, body }, i) => (
              <li
                key={title}
                data-reveal="rise"
                className="flex items-start gap-4"
              >
                <span
                  data-reveal="pop"
                  style={{ animationDelay: "120ms" }}
                  className="relative grid size-11 shrink-0 place-items-center rounded-full border-2 border-ink bg-peach shadow-sticker-sm"
                >
                  <Icon aria-hidden="true" className="size-5 text-ink" />
                  <span
                    data-reveal="sticker"
                    style={{ animationDelay: "220ms" }}
                    className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-terracotta text-[0.65rem] font-bold text-white"
                  >
                    {i + 1}
                  </span>
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold leading-snug">
                    {title}
                  </h3>
                  <p className="mt-1 max-w-[46ch] text-[0.95rem] leading-relaxed text-ink/75">
                    {body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          {/* Links into the combos filter, not all of /shop: this section
              describes what is in a COMBO BOX specifically, and /shop now
              leads with 15 rakhis that have none of the above in them. */}
          <div data-reveal="rise">
            <Button href="/shop?c=combos" size="lg" className="mt-10">
              See all five combo boxes
            </Button>
          </div>
        </div>

        {/* Three nested elements below, because three different things own a
            transform and collapsing them would make each overwrite the last:
            the outer one sticks, the middle one carries the entrance, the
            inner one carries the scroll drift. Same discipline as the hero's
            Bloom wrapper. */}
        {hero ? (
          <div className="relative mx-auto w-full max-w-[420px] lg:sticky lg:top-28">
            {/* Photo first, THEN it gets taped down. Reversing that order
                looks wrong in a way people feel but can't name. */}
            <WashiTape
              className="left-8 top-0 z-10 -translate-y-1/2"
              tone="rose"
              rotate={-6}
              reveal
              delay={400}
            />
            <div data-reveal="settle">
              <div
                data-drift="14"
                data-drift-tilt="1.2"
                className="drift overflow-hidden rounded-frame border-2 border-ink bg-cream shadow-lift"
              >
                <CraftImage
                  src={hero.images[0].src}
                  alt={hero.images[0].alt}
                  motif="combos"
                  seedKey={hero.slug}
                  ratio="square"
                  sizes="(max-width: 1024px) 90vw, 420px"
                />
              </div>
            </div>
            <StickerBadge
              tone="cream"
              rotate={-7}
              className="absolute -bottom-3 left-4 z-10"
              reveal
              delay={600}
            >
              Packed by hand ✋
            </StickerBadge>
          </div>
        ) : null}
      </div>
    </Section>
  );
}
