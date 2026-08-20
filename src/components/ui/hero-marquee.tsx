import type { CSSProperties, ReactNode } from "react";
import { HeartSolid, Star } from "@/components/doodles";
import { cn } from "@/lib/cn";

/**
 * An endless strip of framed product photographs that rides a gentle downward
 * curve along the bottom of the hero.
 *
 * Descended from the supplied `AnimatedMarqueeHero`, but almost nothing of the
 * original mechanism survives contact with this codebase. What changed and
 * why, in the order it matters:
 *
 * 1. SLOTS, NOT SRC STRINGS. The original mapped over `images: string[]` and
 *    rendered a bare <img>. Here each slide is a ReactNode so the hero can
 *    pass a server-rendered <CraftImage>, which keeps next/image
 *    optimisation, the photo-or-placeholder fallback and correct `sizes`.
 *    (A raw <img> also trips `@next/next/no-img-element`, an error here.)
 *
 * 2. IT IS A CIRCLE, NOT A ROW. The cards sit on the rim of a very large
 *    circle and the circle turns; they do not slide along a line. See the
 *    `.photo-arc` block in globals.css for the geometry and for why a
 *    per-card y-offset — the obvious way to fake a curve — gives you a
 *    travelling wave instead of a curve that stays put.
 *
 * 3. NO CLIENT COMPONENT AT ALL. The original was "use client" for a
 *    framer-motion loop; the rotation is now one CSS animation, so this file
 *    ships zero JavaScript. That also retires a bug this component used to
 *    have: it branched its MARKUP on useReducedMotion(), which reads the media
 *    query on the client's first render, so anyone with reduce-motion enabled
 *    got a hydration mismatch and had the whole strip rebuilt. There is no
 *    branch left to get wrong — the global prefers-reduced-motion block in
 *    globals.css stops the animation, and a stopped arc is still an arc.
 *
 * THE CALLER OWNS THE WIDTH. One set has to be longer than the widest screen
 * or a gap opens behind the strip halfway through every turn — the rim only
 * holds two sets, and it travels one set per pass. Hero.tsx repeats its list
 * to a count that guarantees this; see `fillStrip` there.
 */

export interface HeroMarqueeProps {
  /** Rendered in order, then repeated once to make the loop seamless. */
  slides: ReactNode[];
  /** Seconds for one complete turn. Slow is the point; 40s reads as drift. */
  duration?: number;
  className?: string;
}

/**
 * FRAME PALETTE — these two borders ONLY.
 *
 * Hardcoded here rather than added to the Tailwind theme, the same rule
 * HeroFlowers follows: the site's UI stays on the seven brand colours and no
 * `border-lace` utility gets to exist and turn up on a form field. They are
 * two tints of the same warm tan, and they have to be tints of each other or
 * the two rings read as two unrelated lines rather than one frame.
 */
const LACE = "#E2C4A6";
const STITCH = "#D9BE9F";

/* A little jitter on top of the tangent. The arc already leans each card by
   where it stands on the rim; this stops the leans from being perfectly
   regular. Small, because the arc is doing the real work — these were ±3deg
   back when the strip was straight and had nothing else going on.

   How many values there are does NOT matter, and that is deliberate: they are
   indexed by a card's SEAT within a set, never by its position on the rim.
   See the note on `seat` below — indexing by rim position put a visible jump
   in the loop. */
const TILTS = [
  "-1.4deg",
  "1deg",
  "-0.6deg",
  "1.5deg",
  "-1.1deg",
  "0.7deg",
  "-0.4deg",
];

/**
 * One card: white paper, a beaded lace edge, a stitch line inside it, and a
 * single small charm sitting on one corner.
 *
 * The lace is a DOTTED border and the stitch is a DASHED one — both plain CSS
 * rather than artwork. That is not laziness, it is the only version that
 * survives: a drawn frame has to be either stretched to the card (which turns
 * round beads into ovals) or nine-sliced, and at 176px wide the whole
 * ornament is two or three pixels deep, where a border renders it crisply at
 * any size and costs nothing.
 *
 * ONE charm per card, not two. The corner sprigs that lived here before were
 * a pair per card and at fourteen cards that is twenty-eight drawings fighting
 * seven photographs. Alternating a single charm between opposite corners gives
 * the same scrapbook feel at a quarter of the noise.
 */
function Card({ children, seat }: { children: ReactNode; seat: number }) {
  const Charm = seat % 2 ? Star : HeartSolid;

  return (
    <div className="relative rounded-[1.4rem] bg-white p-3.5 shadow-[0_10px_30px_-8px_rgba(51,45,50,0.30),0_2px_6px_-2px_rgba(51,45,50,0.10)] md:p-4">
      {/* The beaded edge. `border-dotted` at 3px renders as a row of round
          beads that follows the radius exactly — the doily edge, for one
          declaration. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[3px] rounded-[1.2rem] border-[3px] border-dotted"
        style={{ borderColor: LACE }}
      />
      {/* The stitch, a hair inside it. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[9px] rounded-[0.95rem] border border-dashed md:inset-[10px]"
        style={{ borderColor: STITCH }}
      />

      <div className="overflow-hidden rounded-[0.8rem]">{children}</div>

      {/* A filled shape, and that is a rule rather than a preference: at the
          16px this renders, a stroked doodle closes up into a smudge. Same
          finding as the icon chips in HeroHighlights, which is why nothing
          there is more detailed than a heart.

          On the BOTTOM corner, never the top. The crown of the arc sits only
          ~12px below the top of the strip — that clearance is what stops the
          highest card's own corners being shaved — and a charm hung off the
          top corner spends half its diameter in that gap and gets cut in half.
          Underneath there is 40px or more of slack at every width.

          Always the SAME corner, and only the shape alternates. Alternating
          the corner as well is the obvious way to vary it and it backfires:
          card N's right-hand charm and card N+1's left-hand charm land in the
          same gap, so half the strip grows pairs of little circles floating
          between the photographs. One side means one charm per card, evenly
          spaced, which is what a frame detail should look like. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-1.5 -left-1.5 grid size-6 place-items-center rounded-full bg-white shadow-[0_2px_6px_-2px_rgba(51,45,50,0.25)] md:-bottom-2 md:-left-2 md:size-7"
      >
        <Charm
          className={cn("size-3 md:size-3.5", seat % 2 ? "text-peach" : "text-sage")}
        />
      </span>
    </div>
  );
}

export default function HeroMarquee({
  slides,
  duration = 40,
  className,
}: HeroMarqueeProps) {
  // Two copies: the second exists only so the first can turn away without
  // leaving a hole. It is the same photographs again, so it is hidden from
  // assistive tech — otherwise every product in the hero is announced twice.
  const rim = [...slides, ...slides];

  /**
   * WHERE THE RIM STARTS, and it is not at the crown.
   *
   * Card 0 sits at angle 0, which is the top of the circle — dead centre of
   * the strip. Lay the cards out from there and every one of them is to the
   * RIGHT of centre, so the left half of the hero is empty until the turn
   * carries something into it. That is exactly what the first version did.
   *
   * Backing the whole rim up by half a set puts the seam off-screen to the
   * left and leaves cards on both sides at every moment of the turn. Half is
   * also the only value that works at both ends: coverage needs the rim to
   * start at or left of the screen edge AND still reach the right edge after
   * a full set has turned away, which pins the offset to the middle of a
   * narrow window. See MIN_SLIDES in Hero.tsx for the arithmetic that keeps
   * that window from closing.
   */
  const crown = Math.floor(slides.length / 2);

  return (
    <div
      className={cn(
        "photo-arc relative w-full overflow-hidden",
        /* Fades at BOTH ends. `rail-fade` is the one-sided version used by the
           snap rails, where the fade means "there is more to the right"; here
           the strip has no beginning and no end, so it has to dissolve into
           the cream at either edge instead of butting against it. */
        "[-webkit-mask-image:linear-gradient(90deg,transparent,#000_11%,#000_89%,transparent)]",
        "[mask-image:linear-gradient(90deg,transparent,#000_11%,#000_89%,transparent)]",
        className,
      )}
    >
      <div
        className="photo-arc-track"
        style={
          {
            "--arc-n": slides.length,
            animationDuration: `${duration}s`,
          } as CSSProperties
        }
      >
        {rim.map((slide, i) => {
          const seat = i % slides.length;
          return (
            <div
            key={i}
            className="photo-arc-card"
            aria-hidden={i >= slides.length ? "true" : undefined}
            // Swing to this card's place on the rim, then push out to it. The
            // widths here are the same pitch the CSS derives `--arc-step`
            // from; they are not independent numbers.
            style={{
              transform: `rotate(calc(var(--arc-step) * ${i - crown})) translateY(calc(-1 * var(--arc-r)))`,
            }}
          >
            {/* Centre the card on its rim point, and carry the jitter. A
                separate element because the parent already owns a transform
                and the two would overwrite each other.

                EVERY per-card variation is keyed to `seat` — the card's index
                within ONE set — and never to `i`, its place on the rim. That
                is the whole trick to a clean loop. When the turn completes,
                rim card i is standing exactly where rim card i−n stood, so if
                any detail is a function of i rather than of i mod n, it
                differs between the two and the entire strip flickers as it
                wraps. This was measured, not guessed: with the tilt indexed by
                i, seven tilts against a sixteen-card set put a 76px jump at
                1280 and 142px on a phone. Keyed to `seat`, the count of tilts
                and the size of a set no longer have to agree about anything. */}
            <div
              className="w-32 -translate-x-1/2 md:w-44"
              style={{ rotate: TILTS[seat % TILTS.length] }}
            >
              <Card seat={seat}>{slide}</Card>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
