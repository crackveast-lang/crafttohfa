"use client";

import { useEffect, useState } from "react";
import { getCountdown, type Countdown } from "@/lib/festival";
import { cn } from "@/lib/cn";

/**
 * `roll` is off for seconds on purpose. A digit that animates its rollover
 * once a second is a metronome in the corner of the eye, and this band sits
 * directly under a hero that is trying to read as calm. Days, hours and
 * minutes change rarely enough that the roll registers as craft rather than
 * as a tic.
 */
const UNITS = [
  { key: "days", label: "days", roll: true },
  { key: "hours", label: "hrs", roll: true },
  { key: "minutes", label: "min", roll: true },
  { key: "seconds", label: "sec", roll: false },
] as const;

/**
 * The ticking digits only.
 *
 * Rendered as dashes until mount: a static page is generated at build time, so
 * any server-rendered clock would be stale and would mismatch on hydration.
 * The wrapper reserves its full height either way, so nothing shifts (CLS 0).
 *
 * Accessibility: the digits are aria-hidden and a single visually-hidden
 * sentence carries the meaning. It is deliberately NOT aria-live — a region
 * that updates every second is a screen-reader denial-of-service.
 */
export function CountdownClock({
  target,
  srLabel,
}: {
  target: string;
  srLabel: string;
}) {
  const [time, setTime] = useState<Countdown | null>(null);

  useEffect(() => {
    let frame: ReturnType<typeof setInterval> | null = null;

    const tick = () => setTime(getCountdown(target));

    const start = () => {
      tick();
      frame ??= setInterval(tick, 1000);
    };
    const stop = () => {
      if (frame) clearInterval(frame);
      frame = null;
    };

    // Don't burn battery ticking in a backgrounded tab.
    const onVisibility = () =>
      document.visibilityState === "visible" ? start() : stop();

    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [target]);

  return (
    <>
      <p className="sr-only">{srLabel}</p>
      <ul
        aria-hidden="true"
        className="flex items-stretch justify-center gap-2 sm:gap-3"
      >
        {UNITS.map(({ key, label, roll }, i) => {
          const value = time ? String(time[key]).padStart(2, "0") : "––";
          return (
            <li
              key={key}
              // Four stamps pressed down in sequence. These are the anchor of
              // the whole band, so they land early rather than after the copy.
              data-reveal="pop"
              style={{ animationDelay: `${140 + i * 90}ms` }}
              className="min-w-[4.25rem] rounded-2xl border-2 border-ink/85 bg-cream px-2 py-3 text-center shadow-sticker-sm sm:min-w-[5.5rem] sm:px-4"
            >
              {/* Clips the roll so the outgoing digit disappears behind the
                  tile edge instead of over the border. */}
              <span className="block overflow-hidden">
                <span
                  // Re-keying on the value is what replays the animation: React
                  // mounts a fresh node each time the number changes, so the
                  // CSS runs again without any state or timer to manage.
                  key={roll ? value : undefined}
                  className={cn(
                    "block font-display text-3xl font-semibold tabular leading-none sm:text-5xl",
                    roll && "digit-roll",
                  )}
                >
                  {value}
                </span>
              </span>
              <span className="mt-1.5 block text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink/60 sm:text-xs">
                {label}
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
}
