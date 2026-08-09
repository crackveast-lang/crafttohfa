import { Wordmark } from "./Wordmark";
import { Sunflower } from "@/components/hero/HeroFlowers";

/**
 * The branded splash on first paint.
 *
 * Pure CSS, and that is the whole design decision. A JavaScript-driven overlay
 * that fails to run — hydration error, blocked script, slow 3G timeout —
 * leaves the entire site behind a blank screen. This one dismisses itself
 * after ~1.7s no matter what, works with JavaScript disabled, and collapses to
 * nothing under prefers-reduced-motion (the global block drops the duration to
 * 0.01ms, so it lands on `visibility: hidden` immediately).
 *
 * It is aria-hidden: the real page is already in the DOM behind it, so screen
 * readers should read that rather than announce a loading screen.
 *
 * ⚠️ Worth knowing: this covers the page for ~1.7s on every full page load, so
 * Lighthouse will likely score the splash itself as the Largest Contentful
 * Paint. If the performance number matters more than the flourish, deleting
 * <Preloader /> from layout.tsx is the whole removal.
 */
export function Preloader() {
  return (
    <div className="preloader" aria-hidden="true">
      <div className="flex flex-col items-center gap-6">
        <Sunflower className="preloader-spin w-20 md:w-24" />
        {/* The tagline now comes from the Wordmark itself, so the splash and
            the footer can never drift apart on wording or spelling. It also
            replaces the old Caveat line: Caveat has no Devanagari, so
            "तोहफा" set in it would fall back to a system font mid-sentence. */}
        <Wordmark asLink={false} size="lg" tagline />
        <span className="preloader-bar mt-3" />
      </div>
    </div>
  );
}
