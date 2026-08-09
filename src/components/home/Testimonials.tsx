import type { CSSProperties } from "react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WashiTape } from "@/components/ui/WashiTape";
import { Rating } from "@/components/ui/Rating";
import { getTestimonials } from "@/data/testimonials";
import { siteConfig } from "@/site.config";

/** Rotations are fixed per index so the layout is stable across renders. */
const TILT = [-1.6, 1.2, -0.8, 1.8, -1.2, 0.9];

/**
 * Splits "4.9★" / "500+" into the parts a roll-up counter needs, so the stat
 * tiles can animate without the numbers having to be written out twice.
 *
 * Returns null for anything that isn't number-shaped, in which case the value
 * is just rendered as-is — the counter is an enhancement, never a
 * precondition for the stat appearing.
 */
function countable(value: string) {
  const match = /^(\D*)(\d+(?:\.\d+)?)(.*)$/.exec(value);
  if (!match) return null;
  const [, prefix, digits, suffix] = match;
  return {
    to: digits,
    decimals: String(digits.split(".")[1]?.length ?? 0),
    prefix,
    suffix,
  };
}

export function Testimonials({
  limit = 6,
  showStats = true,
  tone = "peach",
  eyebrow = "In their words",
  title = "What lands on the doormat",
}: {
  limit?: number;
  showStats?: boolean;
  tone?: "peach" | "cream" | "shell";
  eyebrow?: string;
  title?: string;
}) {
  const items = getTestimonials(limit);
  const { trust } = siteConfig;

  const stats = [
    trust.avgRating ? { value: `${trust.avgRating}★`, label: "Average rating" } : null,
    trust.familiesServed ? { value: trust.familiesServed, label: "Happy families" } : null,
    trust.citiesShipped ? { value: trust.citiesShipped, label: "Cities shipped to" } : null,
  ].filter((s): s is { value: string; label: string } => Boolean(s));

  return (
    <Section tone={tone}>
      <SectionHeading eyebrow={eyebrow} title={title} align="center" underline />

      {/* The stat tiles are the highest-return motion on the page. Three
          numbers that count up read as "premium" more reliably than any
          amount of easing elsewhere, and it costs one attribute per tile.

          The SERVER renders the final string and MotionController restores it
          verbatim on the last frame — so no-JS, reduced motion and crawlers
          all get the real number, and the format is never written twice.
          `.tabular` is already global on these, so nothing shifts width while
          the digits climb. */}
      {showStats && stats.length > 0 ? (
        <ul className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-4">
          {stats.map((s, i) => {
            const count = countable(s.value);
            return (
              <li
                key={s.label}
                data-reveal="pop"
                style={{ animationDelay: `${i * 100}ms` }}
                className="rounded-card border-2 border-ink/85 bg-cream px-3 py-5 text-center shadow-sticker-sm"
              >
                <p
                  className="tabular font-display text-2xl font-semibold md:text-3xl"
                  data-count-to={count?.to}
                  data-count-decimals={count?.decimals}
                  data-count-prefix={count?.prefix}
                  data-count-suffix={count?.suffix}
                  data-count-delay={count ? `${i * 100 + 260}` : undefined}
                >
                  {s.value}
                </p>
                <p className="mt-1 text-xs font-medium leading-tight text-ink/65">
                  {s.label}
                </p>
              </li>
            );
          })}
        </ul>
      ) : null}

      {/* A pinboard being assembled. Each card enters over-tilted and settles
          onto its own resting angle, then its tape presses down a beat later.
          Six pieces of tape landing in sequence is the clearest statement of
          the whole scrapbook metaphor this site is built on.

          The stagger is `i % 3` rather than `i` so each ROW sweeps
          left-to-right instead of the delay accumulating down the grid — with
          six cards, a straight index stagger would leave the last one arriving
          half a second after the first for no reason. */}
      <ul className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
        {items.map((t, i) => {
          const tilt = TILT[i % TILT.length];
          const step = (i % 3) * 80;
          return (
          <li
            key={t.id}
            data-reveal="tilt"
            style={
              {
                animationDelay: `${step}ms`,
                "--tilt-from": `${(tilt * 1.2).toFixed(2)}deg`,
              } as CSSProperties
            }
            className="relative pt-4"
          >
            {/* Tilt via a custom property, not an inline `rotate` — an inline
                style outranks the class and `hover:rotate-0` would never
                fire. Straightening on hover is the sticker language this site
                already speaks, applied to a card. */}
            <figure
              className="relative h-full rotate-[var(--tilt)] rounded-card border border-ink/12 bg-cream p-6 pt-8 shadow-paper transition-transform duration-[220ms] ease-bounce hover:-translate-y-1 hover:rotate-0"
              style={{ "--tilt": `${tilt}deg` } as CSSProperties}
            >
              <WashiTape
                className="left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
                tone={i % 2 === 0 ? "shell" : "rose"}
                rotate={i % 2 === 0 ? -3 : 4}
                reveal
                delay={step + 180}
              />

              <Rating value={t.rating} />

              <blockquote className="mt-4 text-[0.98rem] leading-relaxed text-ink/85">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-ink/10 pt-4 text-sm">
                <span className="font-semibold">{t.name}</span>
                <span className="text-ink/55">{t.city}</span>
                {t.purchased ? (
                  <span className="rounded-full bg-shell px-2.5 py-0.5 text-xs text-ink/70">
                    {t.purchased}
                  </span>
                ) : null}
              </figcaption>
            </figure>
          </li>
          );
        })}
      </ul>
    </Section>
  );
}
