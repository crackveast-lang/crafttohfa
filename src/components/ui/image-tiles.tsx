"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * A fanned stack of three photo tiles that spring into place and respond to
 * hover.
 *
 * Adapted from the supplied component in three ways, all of which were needed
 * to make it safe in this codebase:
 *
 * 1. SLOTS, NOT SRC STRINGS. The original took `leftImage: string` and rendered
 *    a bare <img>. Here each slot takes a ReactNode so the parent can pass a
 *    server-rendered <CraftImage>, which keeps next/image optimisation, the
 *    photo-or-placeholder fallback, and correct `sizes` — none of which a raw
 *    <img> in a client component can do. (It also trips
 *    `@next/next/no-img-element`, which is an error here.)
 *
 * 2. PERCENTAGE OFFSETS, NOT PIXELS. The original moved tiles by fixed pixels
 *    (x: -150, x: 200) inside a fixed w-64 box. At 390px that pushes the right
 *    tile ~200px past the viewport and the page scrolls sideways. Offsets are
 *    now a share of the tile's own width, so the fan holds its shape at every
 *    screen size.
 *
 * 3. REDUCED MOTION. Springs are skipped entirely when the visitor has asked
 *    for less motion; the tiles just appear in their final arrangement.
 */

export interface ImageTilesProps {
  leftImage: ReactNode;
  middleImage: ReactNode;
  rightImage: ReactNode;
  className?: string;
}

const hoverSpring = { type: "spring" as const, stiffness: 200, damping: 15 };

const containerVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
};

/**
 * Fanned-out resting position + where the tile goes on hover.
 *
 * `delay` staggers the tiles. The parent's `staggerChildren` is deliberately
 * not used: each tile sets its own `initial`/`animate` explicitly rather than
 * inheriting the labels from the container, because inherited propagation
 * silently did nothing here — the tiles landed stacked on top of each other
 * with `transform: none`. Explicit is worth the few extra lines.
 */
function tileVariants(
  rest: { rotate: number; x: string; y: string },
  hover: { rotate: number; x: string; y: string },
  delay: number,
): Variants {
  return {
    initial: { rotate: 0, x: "0%", y: "0%", opacity: 0, scale: 0.92 },
    animate: {
      ...rest,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 13, delay },
    },
    hover: { ...hover, transition: hoverSpring },
  };
}

/**
 * Offsets are a share of the TILE's width. With a 44%-wide tile these keep the
 * whole fan — including the extra reach from rotation, and the extra travel on
 * hover — inside the container, so nothing gets clipped by the hero's
 * overflow-hidden or pushes the page sideways.
 *
 * The delays are timed against the PRELOADER, not against hydration. It covers
 * the page until ~1.3s, and the hero's text stagger in Hero.tsx correspondingly
 * starts at 0.95s. These springs used to fire at 0.15/0.30/0.45s — entirely
 * behind the splash, which meant the best entrance on the site was running for
 * an audience of nobody. They now land in sequence with the words.
 *
 * The stagger is 0.1s to match the text's, and it is kept deliberately tight
 * rather than pushed later: the middle tile is the eager one, so it is a
 * candidate for LCP, and every 100ms it spends at opacity 0 is 100ms added to
 * that metric.
 */
const left = tileVariants(
  { rotate: -9, x: "-56%", y: "4%" },
  { rotate: -2, x: "-60%", y: "-4%" },
  0.95,
);
const middle = tileVariants(
  { rotate: 5, x: "0%", y: "-6%" },
  { rotate: 0, x: "0%", y: "-12%" },
  1.05,
);
const right = tileVariants(
  { rotate: -6, x: "56%", y: "8%" },
  { rotate: 3, x: "60%", y: "0%" },
  1.15,
);

export default function ImageTiles({
  leftImage,
  middleImage,
  rightImage,
  className,
}: ImageTilesProps) {
  const reduced = useReducedMotion();

  // White mount + soft shadow only — no outline. The dark border read as a
  // sticker edge and fought the soft, handmade feel of the photographs.
  const tile =
    "absolute w-[44%] overflow-hidden rounded-3xl bg-white p-2.5 shadow-[0_10px_30px_-8px_rgba(51,45,50,0.30),0_2px_6px_-2px_rgba(51,45,50,0.10)]";

  // Deliberately no role="img"/aria-label on the wrapper: that would collapse
  // the three tiles into one node and hide each photo's own alt text.
  return (
    <motion.div
      className={cn(
        "relative flex aspect-square w-full items-center justify-center",
        className,
      )}
      variants={containerVariants}
      initial={reduced ? false : "initial"}
      animate="animate"
    >
      <motion.div
        className={cn(tile, "origin-bottom-right")}
        style={{ zIndex: 10 }}
        variants={left}
        initial={reduced ? false : "initial"}
        animate="animate"
        whileHover={reduced ? undefined : "hover"}
      >
        <div className="overflow-hidden rounded-2xl">{leftImage}</div>
      </motion.div>

      <motion.div
        className={cn(tile, "origin-bottom")}
        style={{ zIndex: 30 }}
        variants={middle}
        initial={reduced ? false : "initial"}
        animate="animate"
        whileHover={reduced ? undefined : "hover"}
      >
        <div className="overflow-hidden rounded-2xl">{middleImage}</div>
      </motion.div>

      <motion.div
        className={cn(tile, "origin-bottom-left")}
        style={{ zIndex: 20 }}
        variants={right}
        initial={reduced ? false : "initial"}
        animate="animate"
        whileHover={reduced ? undefined : "hover"}
      >
        <div className="overflow-hidden rounded-2xl">{rightImage}</div>
      </motion.div>
    </motion.div>
  );
}
