import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

const TONES = {
  cream: "bg-cream text-ink",
  blush: "bg-blush text-ink",
  peach: "bg-peach text-ink",
  sage: "bg-sage text-ink",
  /* The one dark band on the site, and the ONLY large plum surface anywhere —
     plum is budgeted at ~5% of the page and primary buttons already spend
     most of that. One band per page, never two.

     It is plum rather than lavender because white on lavender is 3.56:1,
     which fails AA outright. On plum white is 7.10:1, and that headroom is
     the point: what actually sits on this band is an eyebrow at white/85,
     card copy at white/80, and glass panels whose white/10 fill lightens the
     background underneath the text again. All of them still clear 4.5. */
  plum: "bg-plum text-white",
  none: "",
} as const;

/**
 * Owns vertical rhythm. Padding never drops below py-20 — the generous spacing
 * is precisely what keeps a site covered in doodles and washi tape reading as
 * a premium craft studio rather than a school poster.
 *
 * Horizontal clipping is on by default and deliberately so: rotated scrapbook
 * elements are the number-one cause of horizontal scroll on mobile.
 *
 * It uses `overflow-x: clip`, NOT `overflow-hidden`. `hidden` would make this
 * a scroll container, which silently breaks `position: sticky` for any
 * descendant (the FAQ and policies jump-navs). `clip` doesn't, and it still
 * lets decorations bleed vertically — tape above a card, for instance.
 */
export function Section({
  id,
  tone = "cream",
  className,
  containerClassName,
  width,
  bleed = false,
  clip = true,
  children,
}: {
  id?: string;
  tone?: keyof typeof TONES;
  className?: string;
  containerClassName?: string;
  width?: "default" | "narrow" | "wide";
  /** Skip the Container entirely — for full-bleed layouts. */
  bleed?: boolean;
  clip?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-20 md:py-28 lg:py-32",
        TONES[tone],
        clip && "overflow-x-clip",
        // Anchored sections must not slide under the sticky header
        id && "scroll-mt-28",
        className,
      )}
    >
      {bleed ? (
        children
      ) : (
        <Container width={width} className={cn("relative", containerClassName)}>
          {children}
        </Container>
      )}
    </section>
  );
}
