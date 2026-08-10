import { GiftBox, Heart, MapPin, Star } from "@/components/doodles";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/site.config";

type Highlight = {
  /** Any doodle — they all share the same signature. */
  Icon: typeof Heart;
  /** The tint behind the icon chip. Ink on all three clears 7.5:1. */
  chip: string;
  value: string;
  label: string;
};

const { trust } = siteConfig;

/**
 * Four numbers, and every one of them comes from site.config.ts rather than
 * being typed here. That is the point: the moment a figure lives in two files
 * it starts being true in only one of them, and the numbers on this bar are
 * exactly the ones we are legally on the hook for (see the note on `trust`).
 *
 * `2–3 days` is the one literal, because dispatchCopy is a sentence and this
 * needs a fragment. Change one and change the other.
 */
const CANDIDATES: (Omit<Highlight, "value"> & { value: string | null })[] = [
  {
    Icon: Heart,
    chip: "bg-blush",
    value: trust.familiesServed,
    label: "Happy families gifted",
  },
  {
    Icon: Star,
    chip: "bg-peach",
    value: trust.avgRating ? `${trust.avgRating}` : null,
    label: "Average rating",
  },
  {
    Icon: MapPin,
    chip: "bg-sage",
    value: trust.citiesShipped,
    label: "Cities across India",
  },
  {
    /* A gift box, not the rakhi doodle. RakhiThread is six strokes and two
       concentric circles in a 64×48 box — at the 24px this chip renders it
       collapses into a smudge. Nothing in this row may be more detailed than
       a heart. */
    Icon: GiftBox,
    chip: "bg-blush",
    value: "2–3 days",
    label: "Made & dispatched",
  },
];

/* Nulling a figure in site.config.ts is a supported way of saying "we can't
   back this up yet", so a dropped item has to leave a bar that still looks
   designed rather than a four-column grid with a hole in it. */
const HIGHLIGHTS = CANDIDATES.filter(
  (h): h is Highlight => h.value !== null,
);

const COLS: Record<number, string> = {
  1: "",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

/**
 * The bar that closes the hero.
 *
 * Separators are a 1px GRID GAP over an ink-tinted backdrop, not borders on
 * the cells. Borders would need a different rule at every breakpoint — a
 * `divide-x` puts a stray line down the left of the third cell the moment the
 * grid wraps to two columns — whereas a gap draws exactly the lines the
 * current layout actually has, at every width, for one class.
 *
 * Motion is deliberately two-part: the card arrives as ONE object (it is a
 * physical thing, so it should not assemble itself in front of you), and only
 * then do the four icons pop in on a stagger. The idle float afterwards is
 * ±5px — `floatTiny`, the amplitude built for things sitting in a tight row,
 * because at ±13px four chips 1px apart visibly bob out of alignment with
 * their own labels.
 */
export function HeroHighlights({ className }: { className?: string }) {
  if (HIGHLIGHTS.length === 0) return null;

  return (
    /* Delays continue the hero's load-keyed stagger — every number in Hero.tsx
       is measured from the preloader clearing at ~1.85s. Move those and move
       these. */
    <div className={cn("rise-in", className)} style={{ animationDelay: "1.98s" }}>
      <ul
        className={cn(
          "grid gap-px overflow-hidden rounded-frame border border-ink/10 bg-ink/8 shadow-soft",
          COLS[HIGHLIGHTS.length] ?? COLS[4],
        )}
      >
        {HIGHLIGHTS.map(({ Icon, chip, value, label }, i) => (
          <li
            key={label}
            className="group flex items-center gap-4 bg-white px-5 py-5 transition-colors duration-300 hover:bg-blush/45 sm:px-6"
          >
            <span
              className={cn(
                "pop-in grid size-12 shrink-0 place-items-center rounded-full transition-transform duration-300 ease-bounce group-hover:scale-110",
                chip,
              )}
              style={{ animationDelay: `${2.06 + i * 0.08}s` }}
            >
              {/* Idle motion on its own element: the chip above owns the
                  hover scale and the entrance, and a single element cannot
                  hold three competing transforms. */}
              <span className={cn("block", i % 2 ? "float-tiny-b" : "float-tiny-a")}>
                <Icon aria-hidden="true" className="size-6 text-ink" />
              </span>
            </span>

            <span className="flex min-w-0 flex-col leading-tight">
              <span className="tabular font-display text-xl font-semibold text-ink">
                {value}
              </span>
              <span className="mt-0.5 text-sm leading-snug text-ink/65">
                {label}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
