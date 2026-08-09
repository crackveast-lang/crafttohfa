"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * The only client component the whole motion system needs.
 *
 * Everything below the hero is driven by plain data attributes written by
 * SERVER components — `data-reveal`, `data-drift`, `data-count-to`. This one
 * island, mounted once in the root layout, is what makes them move. No
 * section had to become a client component to get animated, which is the
 * whole reason it is built this way: `src/app/page.tsx` still renders twelve
 * server components and ships no per-section JavaScript.
 *
 * Three jobs, one file so they share a single rAF loop and a single pass over
 * the DOM per navigation:
 *
 *   1. REVEALS   — unpause a paused entrance animation when its element
 *                  scrolls into view (see the block comment in globals.css
 *                  for why they are paused rather than hidden).
 *   2. DRIFT     — scroll-linked parallax, capped at a handful of elements.
 *   3. COUNTERS  — the testimonial stat numbers rolling up from zero.
 *
 * All three no-op under prefers-reduced-motion, and all three are additive:
 * if this component never mounts, the inline script in layout.tsx releases
 * everything after 3s and the page is simply static.
 */

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/* ── 1. Reveals ─────────────────────────────────────────────────────────── */

/**
 * Whether an observed element should be released, judged on three grounds
 * rather than `isIntersecting` alone.
 *
 * The third one is not paranoia — it is a bug this already hit. An entrance
 * whose first frame clips the element (clip-path, and anything else folded
 * into intersection geometry) reports a zero-area intersection rect, so the
 * observer that would START the animation never fires, and the element stays
 * clipped to nothing forever. The animation hides itself from its own
 * trigger. Falling back to plain viewport geometry makes that class of
 * deadlock impossible for any variant added later.
 */
function shouldReveal(entry: IntersectionObserverEntry) {
  if (entry.isIntersecting) return true;

  const rect = entry.boundingClientRect;

  // Already scrolled past — landing mid-page on a #hash, or a restored scroll
  // position. These never "enter" the viewport, so they would wait forever.
  if (rect.bottom <= 0) return true;

  // Geometrically on screen despite what the observer reported.
  const vh = window.innerHeight || 0;
  return rect.bottom > 0 && rect.top < vh * 0.88;
}

function setupReveals(reduced: boolean) {
  const targets = document.querySelectorAll<HTMLElement>(
    "[data-reveal]:not([data-revealed])",
  );

  if (reduced || typeof IntersectionObserver === "undefined") {
    targets.forEach((el) => el.setAttribute("data-revealed", ""));
    return () => {};
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!shouldReveal(entry)) continue;
        entry.target.setAttribute("data-revealed", "");
        io.unobserve(entry.target);
      }
    },
    // Threshold 0, not a fraction: a section taller than ~7 viewports can
    // never reach 15% visibility and would simply never fire. The negative
    // bottom margin is what makes elements trigger just before they reach the
    // viewport edge rather than after.
    { threshold: 0, rootMargin: "0px 0px -12% 0px" },
  );

  targets.forEach((el) => io.observe(el));
  return () => io.disconnect();
}

/* ── 2. Scroll-linked drift ─────────────────────────────────────────────── */

function setupDrift(reduced: boolean) {
  if (reduced) return () => {};

  const nodes = Array.from(
    document.querySelectorAll<HTMLElement>("[data-drift]"),
  );
  if (nodes.length === 0) return () => {};

  // Only elements currently on screen are measured, so the loop stays at a
  // couple of rect reads per frame no matter how long the page gets.
  const onScreen = new Set<HTMLElement>();
  let queued = false;

  const frame = () => {
    queued = false;
    const vh = window.innerHeight || 1;

    // Read every rect first, then write every style. Interleaving them would
    // force a layout per element, which is exactly the per-frame cost this
    // whole design is trying to avoid.
    const measured: Array<[HTMLElement, number]> = [];
    for (const el of onScreen) {
      const rect = el.getBoundingClientRect();
      // −1 when the element sits a viewport below the fold, +1 a viewport
      // above it, 0 when its centre is centred.
      const progress = 1 - ((rect.top + rect.height / 2) / vh) * 2;
      measured.push([el, Math.max(-1, Math.min(1, progress))]);
    }

    for (const [el, progress] of measured) {
      const amount = Number(el.dataset.drift) || 0;
      el.style.setProperty("--drift", `${(progress * amount).toFixed(2)}px`);
      const tilt = Number(el.dataset.driftTilt) || 0;
      if (tilt) {
        el.style.setProperty(
          "--drift-tilt",
          `${(progress * tilt).toFixed(3)}deg`,
        );
      }
    }
  };

  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(frame);
  };

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) onScreen.add(el);
        else onScreen.delete(el);
      }
      schedule();
    },
    { threshold: 0 },
  );

  nodes.forEach((el) => io.observe(el));
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
  schedule();

  return () => {
    io.disconnect();
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
  };
}

/* ── 4. Header condense flag ────────────────────────────────────────────── */

/**
 * Flips `data-scrolled` on <html> past 80px. Everything visual hangs off that
 * one attribute in globals.css, so Header stays a server component instead of
 * going client-side for a single boolean.
 *
 * Runs regardless of reduced-motion: this is a state change, not an
 * animation, and the transitions attached to it are already collapsed to
 * 0.01ms by the global block. Someone who asked for less motion should still
 * get the more legible header.
 */
function setupHeader() {
  const root = document.documentElement;
  let queued = false;
  let scrolled = false;

  const apply = () => {
    queued = false;
    const next = window.scrollY > 80;
    if (next === scrolled) return;
    scrolled = next;
    root.toggleAttribute("data-scrolled", next);
  };

  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(apply);
  };

  window.addEventListener("scroll", schedule, { passive: true });
  apply();

  return () => window.removeEventListener("scroll", schedule);
}

/* ── 3. Stat counters ───────────────────────────────────────────────────── */

/**
 * Rolls an already-rendered number up from zero.
 *
 * The server renders the FINAL string ("4.9", "500+", "60+") and that string
 * is restored verbatim on the last frame — the animation only ever borrows
 * the element's text. So no-JS, reduced-motion and crawlers all see the real
 * number, and there is no format to keep in sync in two places.
 */
function runCounter(el: HTMLElement) {
  const target = Number(el.dataset.countTo);
  if (!Number.isFinite(target)) return;

  const finalText = el.textContent ?? "";
  const decimals = Number(el.dataset.countDecimals) || 0;
  const prefix = el.dataset.countPrefix ?? "";
  const suffix = el.dataset.countSuffix ?? "";
  const delay = Number(el.dataset.countDelay) || 0;
  const duration = 1200;

  el.setAttribute("data-counted", "");

  // Expo-out, so it sprints and then eases into the final number — the same
  // shape as --ease-settle, which is what every other entrance uses.
  const ease = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

  let start = 0;
  const step = (now: number) => {
    if (!start) start = now;
    const t = Math.min(1, (now - start) / duration);
    if (t < 1) {
      el.textContent = prefix + (target * ease(t)).toFixed(decimals) + suffix;
      requestAnimationFrame(step);
    } else {
      el.textContent = finalText;
    }
  };

  window.setTimeout(() => requestAnimationFrame(step), delay);
}

function setupCounters(reduced: boolean) {
  if (reduced || typeof IntersectionObserver === "undefined") return () => {};

  const nodes = document.querySelectorAll<HTMLElement>(
    "[data-count-to]:not([data-counted])",
  );
  if (nodes.length === 0) return () => {};

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        io.unobserve(entry.target);
        runCounter(entry.target as HTMLElement);
      }
    },
    { threshold: 0, rootMargin: "0px 0px -10% 0px" },
  );

  nodes.forEach((el) => io.observe(el));
  return () => io.disconnect();
}

/* ── Mount ──────────────────────────────────────────────────────────────── */

export function MotionController() {
  // App Router swaps the DOM under us on navigation, so the new page's
  // elements need observing. A pathname dependency is enough and costs
  // nothing; a MutationObserver over the whole body would fire on every
  // filter toggle and gallery click for no benefit.
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;

    // Tells the inline bail-out script that the controller is alive, so it
    // leaves data-motion in place instead of releasing every animation.
    //
    // Deliberately does NOT set data-motion itself. If hydration took longer
    // than the script's 3s deadline the attribute has already been dropped
    // and every entrance is mid-flight; re-adding it here would re-pause them
    // all and freeze the page half-animated. The script owns that flag.
    root.setAttribute("data-motion-ready", "");

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia(REDUCED_MOTION).matches;

    const teardown = [
      setupReveals(reduced),
      setupDrift(reduced),
      setupCounters(reduced),
      setupHeader(),
    ];

    return () => teardown.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
