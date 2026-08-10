import { Wordmark } from "./Wordmark";

/**
 * The branded splash on first paint: a wrapped gift box lands, its lid lifts
 * off, and the CraftTohfa mark rises out of it.
 *
 * Pure CSS, and that is the whole design decision. A JavaScript-driven overlay
 * that fails to run — hydration error, blocked script, slow 3G timeout —
 * leaves the entire site behind a blank screen. This one dismisses itself
 * after ~1.85s no matter what, works with JavaScript disabled, and collapses
 * to nothing under prefers-reduced-motion (the global block drops the duration
 * to 0.01ms, so it lands on `visibility: hidden` immediately).
 *
 * It is aria-hidden: the real page is already in the DOM behind it, so screen
 * readers should read that rather than announce a loading screen.
 *
 * ⚠️ Worth knowing: this covers the page for ~1.85s on every full page load,
 * so Lighthouse will likely score the splash itself as the Largest Contentful
 * Paint. If the performance number matters more than the flourish, deleting
 * <Preloader /> from layout.tsx is the whole removal.
 */
export function Preloader() {
  return (
    <div className="preloader" aria-hidden="true">
      <div className="preloader-stage">
        {/* The clip the mark rises through. Its bottom edge is tucked under
            the box, so the mark is genuinely hidden inside it at rest. */}
        <div className="preloader-window">
          <div className="preloader-name">
            <Wordmark asLink={false} size="splash" tagline />
          </div>
        </div>

        <GiftBox />

        <span className="preloader-bar mt-5" />
      </div>
    </div>
  );
}

/**
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │  ILLUSTRATION PALETTE — the splash gift box ONLY.                    │
 * │                                                                      │
 * │  Same rule as the hero flowers: these are hardcoded here rather than │
 * │  added to the theme, so no `bg-ribbon` utility can ever exist and     │
 * │  leak into a button somewhere. The ribbon is the coral from the       │
 * │  reference photograph, which is a deeper, more saturated peach than   │
 * │  --color-peach — it has to be, or the ribbon disappears into the box. │
 * └──────────────────────────────────────────────────────────────────────┘
 */
const C = {
  paper: "#FFF6EC",
  paperShade: "#F7E7D8",
  ribbon: "#D4704A",
  ribbonDark: "#B95B38",
  line: "#332D32",
  bloomBlush: "#F3B9C4",
  bloomSage: "#B8C7B0",
  bloomPeach: "#F0B49A",
} as const;

/** A tiny four-petal flower, the motif printed on the box in the reference. */
function Bloom({ x, y, fill }: { x: number; y: number; fill: string }) {
  return (
    <g transform={`translate(${x} ${y})`} fill={fill}>
      <ellipse cx="0" cy="-3.1" rx="1.7" ry="3" />
      <ellipse cx="0" cy="3.1" rx="1.7" ry="3" />
      <ellipse cx="-3.1" cy="0" rx="3" ry="1.7" />
      <ellipse cx="3.1" cy="0" rx="3" ry="1.7" />
    </g>
  );
}

function GiftBox() {
  return (
    <div className="preloader-box">
      <svg
        viewBox="0 0 160 136"
        className="block h-auto w-full"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          {/* Clips the ribbon to the box so it follows the rounded corners
              instead of poking out past them at the bottom. */}
          <clipPath id="pl-base">
            <rect x="26" y="62" width="108" height="66" rx="9" />
          </clipPath>
          <clipPath id="pl-lid">
            <rect x="16" y="42" width="128" height="26" rx="8" />
          </clipPath>
        </defs>

        {/* ── Box body ── */}
        <g>
          <rect
            x="26"
            y="62"
            width="108"
            height="66"
            rx="9"
            fill={C.paper}
            stroke={C.line}
            strokeWidth="2.5"
          />
          <g clipPath="url(#pl-base)">
            {/* A soft shaded side, so the box has a bit of volume. */}
            <rect x="112" y="62" width="22" height="66" fill={C.paperShade} />
            <rect x="70" y="62" width="20" height="66" fill={C.ribbon} />
            <rect x="84" y="62" width="6" height="66" fill={C.ribbonDark} />
          </g>
          <Bloom x={44} y={80} fill={C.bloomBlush} />
          <Bloom x={57} y={101} fill={C.bloomSage} />
          <Bloom x={45} y={116} fill={C.bloomPeach} />
          <Bloom x={104} y={79} fill={C.bloomSage} />
          <Bloom x={117} y={100} fill={C.bloomBlush} />
          <Bloom x={102} y={117} fill={C.bloomPeach} />
          {/* Redrawn on top of the ribbon so the outline stays unbroken. */}
          <rect
            x="26"
            y="62"
            width="108"
            height="66"
            rx="9"
            fill="none"
            stroke={C.line}
            strokeWidth="2.5"
          />
        </g>

        {/* ── Lid + bow. One group, because they lift together. ── */}
        <g className="preloader-lid">
          <rect
            x="16"
            y="42"
            width="128"
            height="26"
            rx="8"
            fill={C.paper}
            stroke={C.line}
            strokeWidth="2.5"
          />
          <g clipPath="url(#pl-lid)">
            <rect x="70" y="42" width="20" height="26" fill={C.ribbon} />
            <rect x="84" y="42" width="6" height="26" fill={C.ribbonDark} />
          </g>
          <rect
            x="16"
            y="42"
            width="128"
            height="26"
            rx="8"
            fill="none"
            stroke={C.line}
            strokeWidth="2.5"
          />

          {/* Bow: two loops, two tails, a knot over the join. */}
          <g stroke={C.line} strokeWidth="2.5" strokeLinejoin="round">
            <path
              d="M78 42c-6-4-10-14-18-18-7-3-13 2-11 9 2 8 15 11 29 9Z"
              fill={C.ribbon}
            />
            <path
              d="M82 42c6-4 10-14 18-18 7-3 13 2 11 9-2 8-15 11-29 9Z"
              fill={C.ribbon}
            />
            <path d="M74 40 62 50l10 2Z" fill={C.ribbonDark} />
            <path d="M86 40 98 50l-10 2Z" fill={C.ribbonDark} />
            <ellipse cx="80" cy="40" rx="7.5" ry="6" fill={C.ribbonDark} />
          </g>
        </g>
      </svg>
    </div>
  );
}
