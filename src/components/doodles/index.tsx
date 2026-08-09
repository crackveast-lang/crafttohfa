import type { SVGProps } from "react";

/**
 * Hand-drawn marks, all inline SVG. No icon library.
 *
 * House rules that keep these charming rather than cluttered:
 *  - everything is stroke="currentColor", so `text-peach` recolours it and we
 *    never need per-colour variants;
 *  - everything is aria-hidden — these are decoration, never information;
 *  - size comes from className (`size-6`), never hardcoded width/height;
 *  - max two doodles visible per section.
 *
 * Every stroked shape also carries `pathLength={1}`, which is what lets these
 * draw themselves on scroll. It redefines the path's length as 1 user unit for
 * dash maths only — nothing about the rendering changes — so a single
 * `stroke-dasharray: 1; stroke-dashoffset: 1 → 0` keyframe animates any doodle
 * regardless of its real geometry. Without it each shape would need its length
 * measured with getTotalLength() in JavaScript. See `drawIn` in globals.css.
 */

/** `data-reveal` is spelled out so callers can hand a doodle to the scroll
    system (`data-reveal="draw"`) without reaching for a wrapper element. */
type D = SVGProps<SVGSVGElement> & { "data-reveal"?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: "false",
} as const;

/** Spread onto every stroked shape. See the note above. */
const drawable = { pathLength: 1 } as const;

export function Squiggle(props: D) {
  return (
    <svg viewBox="0 0 100 24" {...base} {...props}>
      <path
        d="M2 14C10 2 18 2 26 14s16 12 24 0 16-12 24 0 16 12 22 4"
        {...drawable}
      />
    </svg>
  );
}

/** The hand-drawn underline that sits below one word of the hero H1. */
export function Underline(props: D) {
  return (
    <svg viewBox="0 0 200 16" preserveAspectRatio="none" {...base} {...props}>
      <path
        d="M4 11c28-6 60-8 96-7 32 .9 62 3.4 96 8"
        vectorEffect="non-scaling-stroke"
        {...drawable}
      />
      <path
        d="M14 15c30-4 58-5 88-4.6"
        opacity=".55"
        vectorEffect="non-scaling-stroke"
        {...drawable}
      />
    </svg>
  );
}

export function Sparkle(props: D) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path
        d="M12 2.5c.6 5 1.9 6.3 6.9 6.9-5 .6-6.3 1.9-6.9 6.9-.6-5-1.9-6.3-6.9-6.9 5-.6 6.3-1.9 6.9-6.9Z"
        {...drawable}
      />
      <path
        d="M18.5 15.5c.3 2.4.9 3 3.3 3.3-2.4.3-3 .9-3.3 3.3-.3-2.4-.9-3-3.3-3.3 2.4-.3 3-.9 3.3-3.3Z"
        {...drawable}
      />
    </svg>
  );
}

export function Star(props: D) {
  return (
    <svg viewBox="0 0 24 24" {...base} fill="currentColor" stroke="none" {...props}>
      <path d="M12 2.6l2.7 5.9 6.4.7-4.8 4.3 1.3 6.3L12 16.6l-5.6 3.2 1.3-6.3L2.9 9.2l6.4-.7L12 2.6Z" />
    </svg>
  );
}

export function Heart(props: D) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path
        d="M12 20.5S3.5 15.4 3.5 9.6A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8.5 2.6c0 5.8-8.5 10.9-8.5 10.9Z"
        {...drawable}
      />
    </svg>
  );
}

/** Curved arrow, used between the HowItWorks steps. */
export function ArrowCurve(props: D) {
  return (
    <svg viewBox="0 0 80 40" {...base} {...props}>
      <path d="M4 30c14-22 44-26 70-14" {...drawable} />
      <path d="M66 6l8 10-12 3" {...drawable} />
    </svg>
  );
}

export function Blob(props: D) {
  return (
    <svg viewBox="0 0 120 120" {...base} fill="currentColor" stroke="none" {...props}>
      <path d="M60 6c22 0 44 14 50 34s-6 44-24 56-44 12-59-2S6 58 14 38 38 6 60 6Z" />
    </svg>
  );
}

export function Confetti(props: D) {
  return (
    <svg viewBox="0 0 64 64" {...base} {...props}>
      <path
        d="M10 14l4 6M30 6l1 7M52 14l-4 6M8 40l6 2M56 40l-6 2M22 52l3 6M44 52l-3 6"
        {...drawable}
      />
      <circle cx="32" cy="32" r="3" {...drawable} />
      <circle cx="14" cy="28" r="2" {...drawable} />
      <circle cx="50" cy="28" r="2" {...drawable} />
    </svg>
  );
}

export function PaintBrush(props: D) {
  return (
    <svg viewBox="0 0 48 48" {...base} {...props}>
      <path d="M31 6l11 11-15 15-11-11L31 6Z" {...drawable} />
      <path
        d="M16 21l11 11-4 5a8 8 0 0 1-11 0 8 8 0 0 1 0-11l4-5Z"
        {...drawable}
      />
      <path d="M12 37c-2 3-5 4-8 4 1-3 2-6 5-8" {...drawable} />
    </svg>
  );
}

/** A rakhi: thread with a decorated centre. */
export function RakhiThread(props: D) {
  return (
    <svg viewBox="0 0 64 48" {...base} {...props}>
      <path d="M4 32c8-8 14-10 20-10M60 32c-8-8-14-10-20-10" {...drawable} />
      <circle cx="32" cy="22" r="9" {...drawable} />
      <circle cx="32" cy="22" r="3.5" {...drawable} />
      <path d="M32 6v4M23 9l2 3.5M41 9l-2 3.5" {...drawable} />
      <path d="M6 36c3 3 6 4 9 3M58 36c-3 3-6 4-9 3" {...drawable} />
    </svg>
  );
}

export function GiftBox(props: D) {
  return (
    <svg viewBox="0 0 48 48" {...base} {...props}>
      <path d="M6 20h36v22H6z" {...drawable} />
      <path d="M4 13h40v7H4zM24 13v29" {...drawable} />
      <path
        d="M24 13c-4-1-9-3-9-6.5S20 4 24 13Zm0 0c4-1 9-3 9-6.5S28 4 24 13Z"
        {...drawable}
      />
    </svg>
  );
}

export function Leaf(props: D) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M20 4C9 4 4 9 4 16c0 2 .7 3.4.7 3.4S9 12 20 10" {...drawable} />
      <path d="M4.7 19.4C10 21 20 18 20 4" {...drawable} />
    </svg>
  );
}

export function WhatsAppGlyph(props: D) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...props}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.95 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.38-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
      <path d="M12.04 2.5c-5.24 0-9.5 4.26-9.5 9.5 0 1.68.44 3.31 1.28 4.75L2.5 21.5l4.9-1.28a9.46 9.46 0 0 0 4.64 1.2h.01c5.23 0 9.49-4.26 9.49-9.5 0-2.54-.99-4.92-2.78-6.71a9.42 9.42 0 0 0-6.72-2.79Zm5.55 15.05a7.87 7.87 0 0 1-5.55 2.3h-.01a7.87 7.87 0 0 1-4.01-1.1l-.29-.17-2.98.78.8-2.91-.19-.3a7.86 7.86 0 0 1-1.21-4.2 7.9 7.9 0 0 1 13.48-5.58 7.83 7.83 0 0 1 2.31 5.59 7.9 7.9 0 0 1-2.35 5.59Z" />
    </svg>
  );
}

export function InstagramGlyph(props: D) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

/** Keyed by `Category.doodle` — one mark per product category. */
export const doodleMap = {
  PaintBrush,
  RakhiThread,
  GiftBox,
  Heart,
} as const;
