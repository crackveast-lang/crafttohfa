"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * An endless, gently tilted strip of photographs that runs along the bottom
 * of the hero.
 *
 * Adapted from the supplied `AnimatedMarqueeHero` in four ways, for the same
 * reasons `image-tiles.tsx` was adapted — read that file's header first, the
 * first point is identical:
 *
 * 1. SLOTS, NOT SRC STRINGS. The original mapped over `images: string[]` and
 *    rendered a bare <img>. Here each slide is a ReactNode so the hero can
 *    pass a server-rendered <CraftImage>, which keeps next/image
 *    optimisation, the photo-or-placeholder fallback and correct `sizes`.
 *    (A raw <img> also trips `@next/next/no-img-element`, an error here.)
 *
 * 2. THE LOOP ACTUALLY LOOPS. The original animated x from "-100%" to "0%"
 *    across a row holding TWO copies of the list, which is a two-set
 *    translation over a two-set row — every repeat jumps. A seamless loop
 *    has to travel exactly ONE set: x: 0% → -50% of the doubled row.
 *
 * 3. MARGIN, NOT GAP. `gap-4` puts spacing BETWEEN items but not after the
 *    last one, so one set is a half-gap narrower than half the row and the
 *    strip drifts by 8px per pass. Each slide carries its own trailing
 *    margin instead, which makes one set exactly half the row.
 *
 * 4. REDUCED MOTION. The strip holds still when the visitor has asked for less
 *    movement — a permanently moving band is the single most uncomfortable
 *    thing on a page for anyone with vestibular sensitivity. See the note at
 *    the render for why that switches the animation only and never the markup.
 *
 * THE CALLER OWNS THE WIDTH. One set has to be wider than the widest viewport
 * or a gap opens at the right edge halfway through every pass — the track is
 * only two sets long, so once it has travelled one set there is nothing behind
 * it. Hero.tsx repeats its list up to a slide count that guarantees this;
 * see `fillStrip` there.
 */

export interface HeroMarqueeProps {
  /** Rendered in order, then repeated once to make the loop seamless. */
  slides: ReactNode[];
  /** Seconds for one complete pass. Slow is the point; 40s reads as drift. */
  duration?: number;
  className?: string;
}

/* Tilts, so the strip reads as photographs laid on a table rather than a
   filmstrip. SEVEN of them, and the count is the point: against an even number
   of slides the pattern lines up and you start seeing the repeat rather than
   the photos. They sum to -0.6deg, so the row stays level overall instead of
   leaning one way. Kept small — past ~4deg the corners start catching the mask
   at either end of the strip. */
const TILTS = [
  "-3deg",
  "2.2deg",
  "-1.4deg",
  "3.2deg",
  "-2.4deg",
  "1.6deg",
  "-0.8deg",
];

function Slide({ children, index }: { children: ReactNode; index: number }) {
  return (
    <div
      className="me-3 w-32 shrink-0 md:me-5 md:w-44"
      style={{ rotate: TILTS[index % TILTS.length] }}
    >
      {/* The white mount + soft shadow from ImageTiles, deliberately reused:
          these are the same photographs in the same hero, and two different
          frame treatments a hundred pixels apart read as two components that
          happen to share a page. */}
      <div className="overflow-hidden rounded-3xl bg-white p-2 shadow-[0_10px_30px_-8px_rgba(51,45,50,0.30),0_2px_6px_-2px_rgba(51,45,50,0.10)]">
        <div className="overflow-hidden rounded-2xl">{children}</div>
      </div>
    </div>
  );
}

export default function HeroMarquee({
  slides,
  duration = 40,
  className,
}: HeroMarqueeProps) {
  const reduced = useReducedMotion();

  const set = slides.map((slide, i) => (
    <Slide key={i} index={i}>
      {slide}
    </Slide>
  ));

  return (
    /* py-6 rather than none: the slides are rotated, and a transform does not
       grow its parent — without the padding the corners of every tilted card
       are shaved off by the overflow. */
    <div
      className={cn(
        "relative w-full overflow-hidden py-6",
        /* Fades at BOTH ends. `rail-fade` is the one-sided version used by the
           snap rails, where the fade means "there is more to the right"; here
           the strip has no beginning and no end, so it has to dissolve into
           the cream at either edge instead of butting against it. */
        "[-webkit-mask-image:linear-gradient(90deg,transparent,#000_11%,#000_89%,transparent)]",
        "[mask-image:linear-gradient(90deg,transparent,#000_11%,#000_89%,transparent)]",
        className,
      )}
    >
      {/* `reduced` switches the ANIMATION off and nothing else. It must never
          change the markup — that was a real bug here for one revision: this
          used to render one set when reduced and two when not, and
          useReducedMotion() reads the media query on the client's FIRST
          render, not after an effect. So the server sent two sets, the client
          rendered one, and every visitor with "reduce motion" enabled got a
          hydration mismatch and had the whole strip thrown away and rebuilt.
          Same tree either way; only the props differ. That is also how
          image-tiles.tsx does it. */}
      <motion.div
        className="flex w-max"
        animate={reduced ? undefined : { x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration, repeat: Infinity }}
      >
        {/* Both halves are wrapped identically on purpose: two identical
            subtrees are two identical widths, which is what makes -50% land
            exactly one set along. */}
        <div className="flex shrink-0">{set}</div>
        {/* The second copy exists only so the first can walk off the left edge
            without leaving a hole. It is the same photographs again, so it is
            hidden from assistive tech — otherwise every product in the hero is
            announced twice. When the strip is static the copy simply sits past
            the right edge, clipped by the overflow. */}
        <div className="flex shrink-0" aria-hidden="true">
          {set}
        </div>
      </motion.div>
    </div>
  );
}
