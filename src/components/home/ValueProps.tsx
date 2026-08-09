import { Section } from "@/components/layout/Section";
import { Heart, Leaf, PaintBrush, Sparkle } from "@/components/doodles";

const PROPS = [
  {
    Icon: PaintBrush,
    title: "Screen-free by design",
    body: "An hour of making something, without a tablet in sight.",
  },
  {
    Icon: Heart,
    title: "Small batches, by hand",
    body: "Crocheted and packed by us, not pulled off a warehouse shelf.",
  },
  {
    Icon: Sparkle,
    title: "Safe to make a mess with",
    body: "Non-toxic paints, and washable ones in the younger kits.",
  },
  {
    Icon: Leaf,
    title: "Delivered across India",
    body: "Dispatched in 2–3 working days, wherever you are.",
  },
];

/**
 * Deliberately the quietest section on the page. It comes straight after the
 * busiest run of content, and the breathing room here is what sells "premium".
 *
 * Its motion honours that. The stagger is 60ms and the travel 14px — tighter
 * and faster than anywhere else on the site — and the only flourish is that
 * the four line icons draw their own strokes. A section that quietly draws
 * itself reads as far more considered than one that simply fades harder, and
 * on SVG line art it costs essentially nothing.
 */
export function ValueProps() {
  return (
    <Section tone="cream" className="py-16 md:py-20">
      <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {PROPS.map(({ Icon, title, body }, i) => (
          <li
            key={title}
            data-reveal="rise-sm"
            style={{ animationDelay: `${i * 60}ms` }}
            className="flex flex-col gap-3"
          >
            <Icon
              aria-hidden="true"
              data-reveal="draw"
              style={{ animationDelay: `${i * 60 + 80}ms` }}
              className="size-8 text-lavender [animation-duration:0.5s]"
            />
            <h3 className="font-display text-lg font-semibold">{title}</h3>
            <p className="max-w-[30ch] text-[0.92rem] leading-relaxed text-ink/70">
              {body}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
