"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import {
  BotanicalCorner,
  FRAME_LINE,
} from "@/components/hero/BotanicalCorner";
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
 * 5. THE CARDS ARE A BORDER, NOT A CROP. The original rendered each image as a
 *    bare rounded rectangle. Here each one is white paper with a hairline
 *    frame and a botanical sprig on two opposite corners — see BotanicalCorner
 *    — which is what makes the strip read as part of this hero rather than as
 *    a component dropped into it.
 */

export interface HeroMarqueeProps {
  /** Rendered in order, then repeated once to make the loop seamless. */
  slides: ReactNode[];
  /** Seconds for one complete pass. Slow is the point; 40s reads as drift. */
  duration?: number;
  className?: string;
}

/* Tilts, so the strip reads as photographs laid on a table rather than a
   filmstrip. SEVEN of them against ten slides, which is the whole point of the
   number: with four the pattern lines up twice per pass and you start seeing
   the repeat rather than the photos. They sum to -0.6deg, so the row stays
   level overall instead of drifting one way. Kept small — past ~4deg the
   corners of a decorated card start catching the mask at either end. */
const TILTS = [
  "-3deg",
  "2.2deg",
  "-1.4deg",
  "3.2deg",
  "-2.4deg",
  "1.6deg",
  "-0.8deg",
];

/**
 * The corner sprigs go on OPPOSITE corners, and which pair alternates down the
 * strip: even slides get top-left + bottom-right, odd slides top-right +
 * bottom-left. Two corners rather than four keeps the photograph clear on the
 * other diagonal, and alternating the pair means no two neighbours are the
 * same drawing in the same place.
 */
function Corners({ flipped }: { flipped: boolean }) {
  const a = flipped ? "-right-[4%] -top-[4%] rotate-90" : "-left-[4%] -top-[4%]";
  const b = flipped
    ? "-bottom-[4%] -left-[4%] -rotate-90"
    : "-bottom-[4%] -right-[4%] rotate-180";

  return (
    <>
      <span className={cn("pointer-events-none absolute w-[56%] md:w-[62%]", a)}>
        <BotanicalCorner />
      </span>
      <span className={cn("pointer-events-none absolute w-[56%] md:w-[62%]", b)}>
        <BotanicalCorner />
      </span>
    </>
  );
}

function Slide({ children, index }: { children: ReactNode; index: number }) {
  return (
    <div
      className="relative me-6 w-32 shrink-0 md:me-9 md:w-44"
      style={{ rotate: TILTS[index % TILTS.length] }}
    >
      {/* The card is still white paper with the soft shadow from ImageTiles —
          these are the same photographs in the same hero, and two different
          mounts a hundred pixels apart read as two components that happen to
          share a page. What changed is what is ON the paper.

          NOT overflow-hidden, unlike the tiles: the sprigs are supposed to
          break the edge of the card the way the foliage crosses the frame in
          the reference. Clipping them to the card would leave two quarter
          circles of leaves and no sense that anything grew there. */}
      <div className="relative rounded-[1.35rem] bg-white p-2.5 shadow-[0_10px_30px_-8px_rgba(51,45,50,0.30),0_2px_6px_-2px_rgba(51,45,50,0.10)] md:p-3">
        {/* The hairline square from the reference, sitting between the paper
            and the photograph. It is what makes the sprigs read as a border
            rather than as leaves dropped on a corner. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-1.5 rounded-[1.1rem] border md:inset-2"
          style={{ borderColor: FRAME_LINE }}
        />
        <div className="overflow-hidden rounded-[0.95rem]">{children}</div>
      </div>

      {/* Outside the paper div so they layer over the photograph's corners
          rather than under them. */}
      <Corners flipped={index % 2 === 1} />
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
    /* Generous vertical padding rather than none, and it is load-bearing: the
       slides are both rotated AND carry sprigs that hang ~9% outside the card,
       neither of which grows the parent — a transform never does, and the
       sprigs are absolutely positioned. Without the padding the overflow here
       shaves the top off every leaf. Same reasoning behind the `me-` on each
       slide: the gap has to clear two neighbouring sprigs, not two cards. */
    <div
      className={cn(
        "relative w-full overflow-hidden py-9 md:py-11",
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
