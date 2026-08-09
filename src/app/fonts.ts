import { Baloo_2, Caveat, Fraunces, Plus_Jakarta_Sans } from "next/font/google";

/**
 * The chunky bubbly face. Rounded terminals, very heavy at 800 — this is what
 * gives the hero its poster feel.
 *
 * Two uses only: the hero headline, and the brand tagline "Every craft is a
 * तोहफा".
 *
 * The `devanagari` subset is what makes that tagline possible and is not
 * optional. Baloo 2 is a Latin + Devanagari family drawn as one design, so the
 * English half and तोहफा share a skeleton and sit on the same baseline. None
 * of the other three faces here ship Devanagari at all — set that word in
 * Fraunces, Jakarta or Caveat and the browser silently swaps to whatever
 * system Devanagari font it can find (Nirmala UI on Windows, Noto on Android),
 * which changes weight and colour mid-sentence and looks like a bug.
 */
export const baloo = Baloo_2({
  subsets: ["latin", "devanagari"],
  display: "swap",
  variable: "--font-baloo",
  weight: ["700", "800"],
});

/**
 * Display face. The SOFT and WONK axes are the whole reason this font is here:
 * they let "playful" be a typographic axis instead of clipart.
 *
 * Gotchas enforced by the next/font loader at build time:
 *  - `weight` must be absent (or "variable") whenever `axes` is used.
 *  - `wght` must NOT be listed in `axes`; it is always included in full.
 *  - Tags are case-sensitive: SOFT/WONK uppercase, opsz lowercase.
 */
export const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
});

export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

/**
 * Accent only. House rules: never more than ~8 words at a time, never below
 * 18px, and never on anything the user has to act on.
 * Not preloaded — it never appears above the fold.
 */
export const caveat = Caveat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-caveat",
  preload: false,
});
