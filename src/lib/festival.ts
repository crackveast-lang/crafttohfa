import { siteConfig } from "@/site.config";
import type { Festival } from "@/types";
import { formatDateIN, pluralise } from "./format";

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  /** True once the festival date has passed. */
  over: boolean;
}

/**
 * The next festival still ahead of us, or null.
 *
 * Returning null is the important half: every piece of urgency UI on the site
 * checks this and renders nothing, so the day after Raksha Bandhan the site
 * quietly stops shouting instead of counting down into negative numbers.
 */
export function getActiveFestival(now: Date = new Date()): Festival | null {
  const upcoming = siteConfig.festivals
    .filter((f) => new Date(f.date).getTime() > now.getTime())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return upcoming[0] ? { ...upcoming[0] } : null;
}

export function getCountdown(target: string | Date, now: Date = new Date()): Countdown {
  const ms = new Date(target).getTime() - now.getTime();
  if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, over: true };

  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms / 3_600_000) % 24),
    minutes: Math.floor((ms / 60_000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
    over: false,
  };
}

/**
 * "Order by 30 October for Diwali delivery." — or null when the festival
 * carries no note, which is how a festival opts out of order-by copy
 * altogether. Every caller has to handle the null and render nothing.
 */
export function getOrderByCopy(festival: Festival): string | null {
  if (!festival.note) return null;
  return festival.note.replace("{orderBy}", formatDateIN(festival.orderByDate));
}

/**
 * "Diwali orders close in 13 days" — null once the order-by date has passed.
 *
 * Also null ON the order-by date itself. That last day used to get its own
 * sentence, "Last day to order for {name}", and it was removed on request for
 * the same reason the Raksha Bandhan note was: we keep taking orders past the
 * cut-off, so the loudest possible version of "you have missed it" is the one
 * line we least want in the announcement bar. Counting down to the day is
 * fine; standing on it and shouting is not.
 */
export function getOrderDeadlineCopy(
  festival: Festival,
  now: Date = new Date(),
): string | null {
  const { days, over } = getCountdown(festival.orderByDate, now);
  if (over || days === 0) return null;
  return `${festival.name} orders close in ${days} ${pluralise(days, "day")}`;
}

/** "Raksha Bandhan is on 28 August" */
export function getFestivalDateCopy(festival: Festival): string {
  return `${festival.name} is on ${formatDateIN(festival.date)}`;
}
