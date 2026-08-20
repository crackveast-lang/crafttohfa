import { cn } from "@/lib/cn";

/**
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │  ILLUSTRATION PALETTE — the marquee's corner sprigs ONLY.             │
 * │                                                                      │
 * │  Same rule as HeroFlowers, and for the same reason: these colours are │
 * │  deliberately NOT in the Tailwind theme, so no `bg-sprig-olive`       │
 * │  utility can ever exist and leak into a button or a heading. The      │
 * │  site's UI stays on the seven brand colours; only these drawings use  │
 * │  the botanical palette.                                              │
 * │                                                                      │
 * │  They sit BESIDE the brand colours rather than matching them exactly: │
 * │  the greens are the sage family (--color-sage is #b8c7b0), the        │
 * │  berries the rose family (--color-rose is #ce6249), the hearts the    │
 * │  blush family. Sampling the tokens exactly would have made flat       │
 * │  artwork — an illustration needs a light and a dark of each hue, and  │
 * │  the theme only carries one.                                         │
 * └──────────────────────────────────────────────────────────────────────┘
 */
const C = {
  /* Two greens and a pale one, because a single green makes a spray of twenty
     leaves read as one solid shape. Alternating them is what gives the sprig
     its depth at 100px. */
  olive: "#6E8A67",
  oliveDeep: "#4F6A4C",
  sage: "#9DB495",
  /* The stem is a warm brown-red rather than another green: in the reference
     it is the line that holds the whole spray together, and it only does that
     if it contrasts with the leaves hanging off it. */
  stem: "#8C5B54",
  mustard: "#E7BF57",
  mustardPale: "#F1D68C",
  /* The mimosa dots. Barely darker than the card they sit on, on purpose —
     they are texture, not a third focal colour. */
  cream: "#F3E9D6",
  creamLine: "#E0D0AE",
  berry: "#C4574C",
  heart: "#D28E96",
} as const;

/** The hairline square the foliage sits on. Exported so the card can match. */
export const FRAME_LINE = "#E8CDB4";

const svg = {
  "aria-hidden": true,
  focusable: "false",
} as const;

/**
 * One leaf: a pointed oval 36 long and 16 across, with its base at the origin
 * and its tip pointing right at rotation 0. Everything below positions a copy
 * of this by (x, y, rotation, scale), which is the only way a spray of this
 * many leaves stays editable — nudging one number moves one leaf.
 */
const LEAF = "M0 0C6-8 22-11 36 0 22 11 6 8 0 0Z";

/** [x, y, rotation, scale, dark] — `dark` picks the deeper green. */
type LeafSpec = [number, number, number, number, 0 | 1];

/**
 * TWO BRANCHES MEETING AT THE CORNER, not one diagonal across it.
 *
 * The first attempt drew a single stem sweeping corner to corner, and on the
 * card it read as a vine growing in the GAP BETWEEN two photos rather than as
 * a border on either of them — the lower third of that curve hugged the box's
 * left edge, which is a couple of pixels outside the card, so the leaves lined
 * up in the gutter. A border has to follow the edges it is bordering. So:
 * `TOP_STEM` runs left-to-right along the top edge, `SIDE_STEM` is its mirror
 * running top-to-bottom down the left edge, and they meet at the corner.
 *
 * Both sit at ~15% into the box rather than at 0, so the leaves hanging off
 * their outer side have somewhere to go without being clipped by the viewBox.
 */
const TOP_STEM = "M14 44C56 26 112 24 178 34";
const SIDE_STEM = "M44 14C26 56 24 112 34 178";

/**
 * Leaves in PAIRS along each stem — one on either side, each 48° off the
 * stem's tangent at that point. That pairing is what reads as "a branch"
 * rather than "leaves in a line". They taper from the middle of each branch
 * out to its tip, the way a real spray does.
 *
 * SCALE IS THE WHOLE GAME. The first pass ran these at 0.44–0.60, which is a
 * 16–22 unit leaf in a 200 box — about 8px once the sprig is drawn at 100px on
 * a card. At 8px a leaf is a speck and the spray reads as a bare twig.
 */
const TOP_LEAVES: LeafSpec[] = [
  [34, 37, -64, 0.8, 1], [34, 37, 32, 0.72, 0],
  [63, 31, -56, 0.95, 0], [63, 31, 40, 0.85, 1],
  [95, 28, -50, 1.0, 1], [95, 28, 46, 0.9, 0],
  [130, 29, -44, 0.88, 0], [130, 29, 52, 0.8, 1],
  [162, 32, -40, 0.7, 1], [162, 32, 56, 0.62, 0],
];

const SIDE_LEAVES: LeafSpec[] = [
  [37, 34, 122, 0.8, 1], [37, 34, 26, 0.72, 0],
  [31, 63, 130, 0.95, 0], [31, 63, 34, 0.85, 1],
  [28, 95, 136, 1.0, 1], [28, 95, 40, 0.9, 0],
  [29, 130, 142, 0.88, 0], [29, 130, 46, 0.8, 1],
  [32, 162, 146, 0.7, 1], [32, 162, 50, 0.62, 0],
];

/** A pale layer in the elbow of the L, so the corner itself has some weight —
    without it the two branches read as unrelated and the corner falls empty. */
const ELBOW_LEAVES: LeafSpec[] = [
  [52, 44, -58, 0.55, 0], [48, 52, -30, 0.6, 0],
  [44, 60, 10, 0.5, 0], [58, 40, -74, 0.5, 0],
];

/** The little mustard buds, the same leaf shape at half the size. */
const BUDS: [number, number, number, number][] = [
  [75, 24, -52, 0.5], [84, 30, -14, 0.45], [140, 26, -40, 0.46],
  [24, 75, 142, 0.5], [30, 84, 104, 0.45], [26, 140, 130, 0.46],
];

/** Mimosa clusters: an anchor plus the offsets of the dots around it. */
const CLUSTER_OFFSETS: [number, number][] = [
  [0, 0], [8, -6], [15, 1], [6, 8], [-7, 6], [-8, -4],
  [18, -8], [22, 4], [-3, -11],
];
const CLUSTERS: [number, number][] = [[108, 40], [40, 108]];

/** Berries. Small, few, and always on a stem — never floating. */
const BERRIES: [number, number][] = [
  [52, 34], [88, 28], [140, 29], [34, 52], [28, 88], [29, 140],
];

function Leaf({
  spec: [x, y, rot, scale, dark],
  fill,
}: {
  spec: LeafSpec;
  fill?: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${scale})`}>
      <path d={LEAF} fill={fill ?? (dark ? C.oliveDeep : C.olive)} />
      {/* The centre vein. At this size it is a texture rather than a line you
          read, but without it every leaf is a flat blob. */}
      <path
        d="M4 0H31"
        stroke={dark ? C.olive : C.oliveDeep}
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity=".45"
      />
    </g>
  );
}

/**
 * One corner's worth of foliage: an L hugging the top and left edges of its
 * box. The card rotates copies of this by 90/180/-90 for the other three
 * corners, so there is exactly one drawing to maintain rather than four
 * near-identical ones.
 */
export function BotanicalCorner({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={cn("block h-auto w-full", className)}
      {...svg}
    >
      {/* Stems first, so every leaf lands on top of them. */}
      <g fill="none" stroke={C.stem} strokeLinecap="round" strokeWidth="3">
        <path d={TOP_STEM} />
        <path d={SIDE_STEM} />
      </g>

      {ELBOW_LEAVES.map((spec, i) => (
        <Leaf key={`e${i}`} spec={spec} fill={C.sage} />
      ))}
      {TOP_LEAVES.map((spec, i) => (
        <Leaf key={`t${i}`} spec={spec} />
      ))}
      {SIDE_LEAVES.map((spec, i) => (
        <Leaf key={`s${i}`} spec={spec} />
      ))}

      {BUDS.map(([x, y, rot, scale], i) => (
        <Leaf
          key={`b${i}`}
          spec={[x, y, rot, scale, 0]}
          fill={i % 2 ? C.mustardPale : C.mustard}
        />
      ))}

      {CLUSTERS.map(([cx, cy], ci) =>
        CLUSTER_OFFSETS.map(([dx, dy], di) => (
          <circle
            key={`c${ci}-${di}`}
            cx={cx + dx}
            cy={cy + dy}
            r="3.4"
            fill={C.cream}
            stroke={C.creamLine}
            strokeWidth="0.8"
          />
        )),
      )}

      {BERRIES.map(([cx, cy], i) => (
        <circle key={`r${i}`} cx={cx} cy={cy} r="3.2" fill={C.berry} />
      ))}

      {/* One heart per corner, floating just outside the branch the way the
          reference scatters them. ONE, not a handful: at 100px a second heart
          stops being a charm and starts being a pattern. */}
      <g transform="translate(146 8) scale(1.5)" fill={C.heart}>
        <path d="M6 11C1.5 7.6 0 5.4 0 3.4 0 1.5 1.4 0 3.2 0 4.3 0 5.3.6 6 1.5 6.7.6 7.7 0 8.8 0 10.6 0 12 1.5 12 3.4c0 2-1.5 4.2-6 7.6Z" />
      </g>
    </svg>
  );
}
