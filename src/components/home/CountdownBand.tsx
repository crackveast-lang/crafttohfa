import { Container } from "@/components/layout/Container";
import { CountdownClock } from "./CountdownClock";
import { Divider } from "@/components/ui/Divider";
import { Button } from "@/components/ui/Button";
import { RakhiThread } from "@/components/doodles";
import {
  getActiveFestival,
  getCountdown,
  getFestivalDateCopy,
  getOrderByCopy,
} from "@/lib/festival";
import { pluralise } from "@/lib/format";

/**
 * Festival urgency band.
 *
 * Returns null when there is no upcoming festival, which is the whole point:
 * the day after Raksha Bandhan this section simply stops existing instead of
 * counting down into negative numbers or needing someone to remove it.
 */
export function CountdownBand() {
  const festival = getActiveFestival();
  if (!festival) return null;

  const { days } = getCountdown(festival.date);
  const srLabel = `${days} ${pluralise(days, "day")} until ${festival.name}.`;

  return (
    <section className="relative overflow-hidden bg-blush text-ink">
      <Divider
        variant="torn"
        className="absolute inset-x-0 -top-px text-cream"
        reveal
      />

      {/* The signature beat of this section: the two rakhi threads draw
          themselves in from the edges of the page toward the clock, the right
          one trailing the left. They are the only decoration here, and having
          them appear fully-formed wasted the one gesture the artwork is for. */}
      <RakhiThread
        aria-hidden="true"
        data-reveal="draw"
        className="pointer-events-none absolute -left-8 top-1/2 hidden size-40 -translate-y-1/2 text-ink/8 [animation-duration:1.1s] lg:block"
      />
      <RakhiThread
        aria-hidden="true"
        data-reveal="draw"
        className="pointer-events-none absolute -right-8 top-1/2 hidden size-40 -translate-y-1/2 text-ink/8 [animation-delay:120ms] [animation-duration:1.1s] lg:block"
      />

      <Container className="relative py-16 text-center md:py-20">
        <p data-reveal="rise" className="text-eyebrow uppercase text-ink/60">
          Almost here
        </p>
        <h2
          data-reveal="rise"
          style={{ animationDelay: "80ms" }}
          className="mx-auto mt-3 max-w-[16ch] text-h2"
        >
          {getFestivalDateCopy(festival)}
        </h2>

        {/* The clock lands BEFORE the headline finishes settling — the four
            ticking tiles are the visual anchor here, not the words. */}
        <div className="mt-9">
          <CountdownClock target={festival.date} srLabel={srLabel} />
        </div>

        <p
          data-reveal="rise"
          style={{ animationDelay: "420ms" }}
          className="mx-auto mt-8 max-w-[42ch] text-body font-medium"
        >
          {getOrderByCopy(festival)}
        </p>

        <div data-reveal="rise" style={{ animationDelay: "500ms" }}>
          <Button href="/shop" size="lg" className="mt-7">
            Shop the rakhi collection
          </Button>
        </div>
      </Container>
    </section>
  );
}
