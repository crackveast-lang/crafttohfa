const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/** 649 → "₹649"; 189900 → "₹1,89,900" (correct Indian lakh grouping). */
export function formatINR(amount: number): string {
  return inr.format(amount);
}

const dayMonth = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "long",
  timeZone: "Asia/Kolkata",
});

/** "20 August" — always rendered in IST regardless of the viewer's timezone. */
export function formatDateIN(date: Date | string): string {
  return dayMonth.format(typeof date === "string" ? new Date(date) : date);
}

export function pluralise(n: number, one: string, many = `${one}s`): string {
  return n === 1 ? one : many;
}

/**
 * Percentage saved, rounded DOWN. Returns null when there is no discount.
 *
 * Rounding down matters: paired with the ceil() in `listPrice`, the badge can
 * only ever understate the discount, never overstate it. A "10% OFF" label on
 * a saving that is really 10.4% is fine; one on a saving that is really 9.8%
 * is a claim we cannot support.
 */
export function discountPercent(
  price: number,
  compareAt?: number,
): number | null {
  if (!compareAt || compareAt <= price) return null;
  return Math.floor(((compareAt - price) / compareAt) * 100);
}

/** Whole rupees saved. Returns null when there is no discount. */
export function amountSaved(price: number, compareAt?: number): number | null {
  if (!compareAt || compareAt <= price) return null;
  return compareAt - price;
}
