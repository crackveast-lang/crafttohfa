import { cn } from "@/lib/cn";

/**
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │  ILLUSTRATION PALETTE — hero flowers ONLY.                           │
 * │                                                                      │
 * │  These colours are deliberately NOT in the Tailwind theme. They are  │
 * │  hardcoded here so no `bg-bloom-yellow` utility can ever exist and    │
 * │  leak into a button, a heading or a background somewhere else.        │
 * │  The site's UI stays on the six brand colours; only these drawings    │
 * │  use the reference artwork's palette.                                 │
 * └──────────────────────────────────────────────────────────────────────┘
 */
const C = {
  /* The big flower. Yellow petals with the light tone moved to the middle.
     History, because it has been round twice: it started at #F8D64E, a
     saturated school-poster yellow that pulled harder than the headline; it
     was then taken all the way to apricot, which read as orange. This is the
     resolution of both — a soft buttery yellow that is unmistakably yellow
     without shouting, and the apricot demoted to the inner disc where it is
     the quiet part. */
  petalYellow: "#F7D77E",
  petalYellowLine: "#E0BB62",
  /* The centre. Deeper than the petals rather than lighter, or the disc
     vanishes into them: a light centre inside a light flower leaves no
     middle at all. It replaces the deep plum this used to have. */
  centreApricot: "#EFB489",
  petalPink: "#F08CA4",
  petalPinkLine: "#E2748F",
  centreYellow: "#F9DC5C",
  leafGreen: "#5FB85E",
  leafGreenDark: "#2E7D3A",
  leafBlue: "#7FB3E3",
  leafBlueDark: "#5892C9",
  ink: "#2B2B2B",
  blush: "#F2879E",
} as const;

const svg = {
  "aria-hidden": true,
  focusable: "false",
} as const;

/** One long petal, widest in the middle, rounded at the tip. */
const LONG_PETAL =
  "M100 10c8 0 14 10 15 22 1 10 0 22-2 34-1 8-5 14-13 14s-12-6-13-14c-2-12-3-24-2-34 1-12 7-22 15-22Z";

function PetalRing({
  count,
  fill,
  line,
  spin = 0,
}: {
  count: number;
  fill: string;
  line: string;
  spin?: number;
}) {
  return (
    <g transform={`rotate(${spin} 100 100)`}>
      {Array.from({ length: count }, (_, i) => (
        <g key={i} transform={`rotate(${(360 / count) * i} 100 100)`}>
          <path d={LONG_PETAL} fill={fill} />
          {/* the faint crease down each petal */}
          <path
            d="M100 24v44"
            stroke={line}
            strokeWidth="2.4"
            strokeLinecap="round"
            opacity=".55"
          />
        </g>
      ))}
    </g>
  );
}

/** Big yellow sunflower with the soft apricot centre. */
export function Sunflower({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={cn("block h-auto w-full", className)} {...svg}>
      <PetalRing count={18} fill={C.petalYellow} line={C.petalYellowLine} spin={4} />
      {/* A hairline ring, because two soft tones meeting with no edge between
          them reads as a smudge rather than as a flower with a middle. */}
      <circle
        cx="100"
        cy="100"
        r="30"
        fill={C.centreApricot}
        stroke={C.petalYellowLine}
        strokeWidth="2"
      />
      {/* face */}
      <ellipse cx="90" cy="96" rx="3.4" ry="4.6" fill="#1F1026" />
      <ellipse cx="110" cy="96" rx="3.4" ry="4.6" fill="#1F1026" />
      <ellipse cx="82" cy="106" rx="5.6" ry="3.6" fill={C.blush} opacity=".85" />
      <ellipse cx="118" cy="106" rx="5.6" ry="3.6" fill={C.blush} opacity=".85" />
      <path
        d="M94 107c3 3 9 3 12 0"
        fill="none"
        stroke="#1F1026"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Pink daisy with the buttery yellow centre and a wide smile. */
export function PinkDaisy({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={cn("block h-auto w-full", className)} {...svg}>
      <PetalRing count={15} fill={C.petalPink} line={C.petalPinkLine} spin={12} />
      <circle cx="100" cy="100" r="32" fill={C.centreYellow} />
      <path
        d="M86 92c1.8-2.6 5-2.6 6.8 0M107.2 92c1.8-2.6 5-2.6 6.8 0"
        fill="none"
        stroke={C.ink}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <ellipse cx="82" cy="106" rx="6" ry="4" fill={C.blush} opacity=".8" />
      <ellipse cx="118" cy="106" rx="6" ry="4" fill={C.blush} opacity=".8" />
      <path
        d="M92 104c2 4 6 6 8 6s6-2 8-6"
        fill="none"
        stroke={C.ink}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The pointed green leaf with a dark outline and side veins. */
export function GreenLeaf({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 200" className={cn("block h-auto w-full", className)} {...svg}>
      <path
        d="M60 6c34 34 52 70 52 104 0 48-30 86-52 86S8 158 8 110C8 76 26 40 60 6Z"
        fill={C.leafGreen}
        stroke={C.leafGreenDark}
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <g
        stroke={C.leafGreenDark}
        strokeWidth="3.4"
        strokeLinecap="round"
        fill="none"
        opacity=".85"
      >
        <path d="M60 26v154" />
        <path d="M60 60 32 88M60 60l28 28M60 100 34 126M60 100l26 26M60 138l-19 20M60 138l19 20" />
      </g>
    </svg>
  );
}

/**
 * The lobed blue leaf, with the thin contour lines that sit behind it in the
 * reference. Built as one symmetric path of paired lobes.
 */
export function BlueLeaf({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 210" className={cn("block h-auto w-full", className)} {...svg}>
      {/* contour lines behind */}
      <g
        stroke={C.ink}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity=".55"
      >
        <path d="M118 16c34 8 56 26 62 52" />
        <path d="M112 30c32 8 52 24 58 48" />
        <path d="M106 44c30 8 48 22 54 44" />
        <path d="M100 58c28 8 44 20 50 40" />
      </g>

      <path
        d="M70 8c8 20 26 16 30 28 4 12-10 18-4 28 6 10 26 8 28 22 2 14-18 18-14 30 4 12 22 14 20 28-2 14-26 10-30 20-4 10-8 20-30 34-22-14-26-24-30-34-4-10-28-6-30-20-2-14 16-16 20-28 4-12-16-16-14-30 2-14 22-12 28-22 6-10-8-16-4-28 4-12 22-8 30-28Z"
        fill={C.leafBlue}
      />

      <g stroke={C.ink} strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M70 24v156" />
        <path d="M70 62 40 46M70 62l30-16M70 100 38 86M70 100l32-14M70 138l-28-12M70 138l28-12" />
        {/* stem */}
        <path d="M70 172c0 18-6 26-16 34" strokeWidth="4" />
      </g>
    </svg>
  );
}

/** Three little ticks, the way they cluster in the reference. */
export function SeedCluster({
  className,
  rotate = 0,
}: {
  className?: string;
  rotate?: number;
}) {
  return (
    <svg viewBox="0 0 40 30" className={cn("block h-auto w-full", className)} {...svg}>
      <g fill={C.ink} transform={`rotate(${rotate} 20 15)`}>
        <rect x="4" y="2" width="3.6" height="9" rx="1.8" transform="rotate(-24 5.8 6.5)" />
        <rect x="18" y="9" width="3.6" height="9" rx="1.8" transform="rotate(12 19.8 13.5)" />
        <rect x="30" y="1" width="3.6" height="9" rx="1.8" transform="rotate(-8 31.8 5.5)" />
      </g>
    </svg>
  );
}

/**
 * The little scattered tick marks from the reference.
 *
 * Deliberately NOT an SVG stretched across the section: a viewBox with
 * preserveAspectRatio="none" scales x and y by different amounts, which turns
 * every mark into a fat capsule on a wide screen and a tall bar on a narrow
 * one. Fixed-size elements at percentage positions stay the same shape at
 * every viewport.
 *
 * Positions are [left%, top%, rotation]. They used to keep clear of the LEFT
 * column, which is where the headline and paragraph sat. The hero is centred
 * now, so the sixteen marks were pushed out to the two outer thirds and the
 * band under the buttons — the same scatter, wrapped around the words instead
 * of sitting beside them. Sixteen faint ticks behind a headline read as dirt
 * on the screen; the middle has to stay empty.
 */
const SEEDS: [number, number, number][] = [
  [5, 14, -32], [11, 38, 20], [4, 62, -12], [14, 80, 34],
  [22, 10, 14], [19, 54, -28], [25, 70, 40], [30, 90, -18],
  [70, 12, 26], [76, 44, -36], [69, 74, 10], [82, 24, -22],
  [88, 58, 30], [95, 14, -14], [92, 84, 18], [50, 94, -30],
];

export function SeedScatter({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("absolute inset-0", className)}>
      {SEEDS.map(([x, y, r], i) => (
        <span
          key={i}
          className="absolute block h-2.5 w-[2.5px] rounded-full bg-current md:h-3"
          style={{ left: `${x}%`, top: `${y}%`, rotate: `${r}deg` }}
        />
      ))}
    </div>
  );
}

/** Faint grid paper, the way the reference backs everything onto a notebook. */
export function GridPaper({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{
        backgroundImage:
          "linear-gradient(to right, rgb(51 45 50 / .055) 1px, transparent 1px), linear-gradient(to bottom, rgb(51 45 50 / .055) 1px, transparent 1px)",
        backgroundSize: "38px 38px",
        maskImage:
          "radial-gradient(120% 100% at 50% 0%, black 55%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(120% 100% at 50% 0%, black 55%, transparent 100%)",
      }}
    />
  );
}
