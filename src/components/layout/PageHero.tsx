import type { ReactNode } from "react";
import { Container } from "./Container";
import { Underline } from "@/components/doodles";
import { WashiTape } from "@/components/ui/WashiTape";
import { cn } from "@/lib/cn";

/**
 * Slim page header used by every route except the homepage.
 *
 * It carries the same eyebrow → title → intro stagger as SectionHeading so
 * /shop, /about and the rest don't read as abandoned next to an animated
 * homepage. Reveals rather than a load animation, deliberately: these mount
 * on client-side navigation as often as on a cold load, and an entrance keyed
 * to load time would simply never replay when someone clicks through the nav.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
  aside,
  tone = "blush",
  className,
}: {
  eyebrow?: string;
  /** ReactNode, not string: /shop sets a doodle inside the headline. */
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  /**
   * Optional artwork for the empty half of the band. Without it the layout is
   * exactly what it was: one full-width column. With it the text keeps the
   * left, where it is read first, and this fills the right.
   */
  aside?: ReactNode;
  tone?: "blush" | "cream" | "peach";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border-b border-ink/10",
        tone === "blush" && "bg-blush",
        tone === "cream" && "bg-cream",
        tone === "peach" && "bg-peach",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-peach/45 blur-[2px]"
      />
      {/* Sits fully inside the band. Hanging it off the top edge only ever
          showed half a striped bar, which read as a rendering glitch. */}
      <WashiTape
        className="right-6 top-6 md:right-16 md:top-8"
        tone="sage"
        rotate={-8}
        reveal
        delay={320}
      />

      <Container className="relative py-14 md:py-20">
        <div
          className={cn(
            aside &&
              "grid items-center gap-10 md:grid-cols-[1.15fr_0.85fr] md:gap-12",
          )}
        >
          <div>
            {eyebrow ? (
              <p
                data-reveal="rise"
                className="text-eyebrow uppercase text-plum"
              >
                {eyebrow}
              </p>
            ) : null}
            <h1
              data-reveal="rise"
              style={{ animationDelay: "80ms" }}
              className="relative mt-3 inline-block max-w-[18ch] text-h2 md:text-display"
            >
              {title}
              <Underline
                aria-hidden="true"
                data-reveal="draw"
                style={{ animationDelay: "330ms" }}
                className="absolute -bottom-2 left-0 h-2.5 w-[min(200px,55%)] text-sage md:-bottom-3 md:h-3"
              />
            </h1>
            {intro ? (
              <p
                data-reveal="rise"
                style={{ animationDelay: "150ms" }}
                className="mt-7 max-w-[54ch] text-body leading-relaxed text-ink/75"
              >
                {intro}
              </p>
            ) : null}
            {children ? (
              <div
                data-reveal="rise"
                style={{ animationDelay: "220ms" }}
                className="mt-7"
              >
                {children}
              </div>
            ) : null}
          </div>
          {aside ? (
            <div
              data-reveal="settle"
              style={{ animationDelay: "180ms" }}
              className="mx-auto w-full max-w-[300px] md:mx-0 md:ml-auto"
            >
              {aside}
            </div>
          ) : null}
        </div>
      </Container>
    </div>
  );
}
