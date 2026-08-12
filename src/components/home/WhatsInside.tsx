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
    title: "A Rakhi, handmade with love",
    body: "Soft cotton, delicate beads and thoughtful details, made to celebrate the bond.",
  },
  {
    Icon: Heart,
    title: "A little keepsake to treasure",
    body: "Choose a soft crochet toy, keychain or mini pouch, something they can keep close even after Raksha Bandhan.",
  },
  {
    Icon: PaintBrush,
    title: "A little keepsake of togetherness",
    body: "Bring your sibling bond to life with colours, creativity and a little imagination.",
  },
  {
    Icon: Sparkle,
    title: "Pick. Create. Make It Yours.",
    body: "Pick your favourite, a butterfly, car money box, strawberry and more, and make it uniquely yours.",
  },
  {
    Icon: GiftBox,
    title: "Everything you need to create",
    body: "Acrylic paints, a brush and a heartfelt Raksha Bandhan card, all packed and ready for your little celebration.",
  },
];

export function WhatsInside() {
  const hero = getProduct("hello-kitty-rakhi-paint-hamper");

  return (
    <Section tone="cream" id="whats-inside">
      <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-start lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="What's inside your hamper"
            title="Made of little things. Meant for big moments."
            intro="From something to create to something to keep, every piece is thoughtfully chosen to turn a simple gift into a memorable experience."
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
                    className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-ink text-[0.65rem] font-bold text-white"
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

          {/* The turn. The list above answers "what do I get"; this answers
              "why does that matter", which is the thing that actually sells a
              ₹499 box. It sits inside a tinted rule rather than another card
              so it reads as a change of voice rather than another item. */}
          <div className="mt-12 border-l-2 border-sage pl-6">
            <p
              data-reveal="rise"
              className="max-w-[44ch] text-body leading-relaxed text-ink/75"
            >
              Because the best part isn&apos;t what&apos;s inside the box…
            </p>
            {/* Caveat, and the one line in this section that writes itself on
                — `ink` is the soft-edged mask wipe reserved for handwriting. */}
            <p
              data-reveal="ink"
              style={{ animationDelay: "180ms" }}
              className="mt-3 max-w-[22ch] font-hand text-3xl leading-tight text-plum md:text-4xl"
            >
              It&apos;s what happens after you open it. ❤️
            </p>
            <p
              data-reveal="rise"
              style={{ animationDelay: "320ms" }}
              className="mt-5 text-sm font-bold uppercase tracking-[0.16em] text-ink/70"
            >
              Tie it. Paint it. Create together. Make a memory.
            </p>
          </div>

          {/* Links into the combos filter, not all of /shop: this section
              describes what is in a COMBO BOX specifically, and /shop now
              leads with 15 rakhis that have none of the above in them. */}
          <div data-reveal="rise">
            <Button href="/shop?c=combos" size="lg" className="mt-10">
              Explore all combos
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
              tone="sage"
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
