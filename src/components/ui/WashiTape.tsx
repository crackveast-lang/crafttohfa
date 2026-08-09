import { cn } from "@/lib/cn";

const TONES = {
  peach: "bg-peach/85",
  blush: "bg-blush/90",
  sage: "bg-sage/75",
  lavender: "bg-lavender/25",
} as const;

/**
 * A strip of washi tape. Pure CSS — no image, no SVG.
 *
 * The weave is a repeating-linear-gradient; the torn ends are a clip-path
 * polygon with a few zig-zag points at each edge. Position it yourself with
 * className (it is absolutely positioned by default).
 *
 * `reveal` makes it tape itself down on scroll: it enters squeezed and
 * crooked, then presses flat. Always give it a `delay` a beat AFTER whatever
 * it is taping has landed — a photo that gets taped down reads correct; tape
 * that lands before the photo reads wrong in a way people feel immediately.
 *
 * The keyframe ends at `rotate(0deg)` and this element's own tilt lives on
 * the individual `rotate` property, so the two compose: the tape settles ONTO
 * its resting angle rather than straightening out of it.
 */
export function WashiTape({
  className,
  tone = "peach",
  rotate = -4,
  absolute = true,
  reveal = false,
  delay,
}: {
  className?: string;
  tone?: keyof typeof TONES;
  rotate?: number;
  absolute?: boolean;
  /** Tape itself down when it scrolls into view. */
  reveal?: boolean;
  /** Milliseconds to hold before it lands. */
  delay?: number;
}) {
  return (
    <span
      aria-hidden="true"
      data-reveal={reveal ? "tape" : undefined}
      className={cn(
        absolute && "absolute",
        "block h-7 w-24 backdrop-blur-[1px]",
        TONES[tone],
        className,
      )}
      style={{
        rotate: `${rotate}deg`,
        animationDelay: delay ? `${delay}ms` : undefined,
        backgroundImage:
          "repeating-linear-gradient(45deg, rgb(255 255 255 / .38) 0 2px, transparent 2px 7px)",
        clipPath:
          "polygon(0% 8%, 3% 0%, 6% 10%, 97% 4%, 100% 14%, 97% 24%, 100% 92%, 96% 100%, 93% 90%, 4% 96%, 0% 86%, 3% 76%)",
      }}
    />
  );
}
