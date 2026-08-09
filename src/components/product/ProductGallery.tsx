"use client";

import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { WobbleFrame } from "@/components/ui/WobbleFrame";

/**
 * Product image viewer.
 *
 * The images themselves are rendered on the SERVER (CraftImage needs the
 * filesystem to decide photo-vs-placeholder) and passed in as ReactNodes. This
 * component only decides which one is visible, so it stays a thin client shell.
 *
 * Thumbnails behave as a proper radio-style group: arrow keys move between
 * them, and only the selected one is in the tab order.
 */
export function ProductGallery({
  slides,
  thumbs,
  alts,
  seed = 0,
}: {
  slides: ReactNode[];
  thumbs: ReactNode[];
  alts: string[];
  seed?: number;
}) {
  const [active, setActive] = useState(0);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next =
      e.key === "ArrowRight"
        ? (active + 1) % slides.length
        : (active - 1 + slides.length) % slides.length;
    setActive(next);
    thumbRefs.current[next]?.focus();
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative overflow-hidden rounded-frame bg-blush shadow-soft">
        {slides.map((slide, i) => (
          <div key={i} aria-hidden={i !== active} className={cn(i === active ? "block" : "hidden")}>
            {slide}
          </div>
        ))}
        {/* Hand-drawn border sitting over the photo, rather than a flat 1px rule */}
        <WobbleFrame seed={seed} className="z-10 text-ink/45" />
      </div>

      {slides.length > 1 ? (
        <div
          role="group"
          aria-label="Product images"
          onKeyDown={onKeyDown}
          className="scrollbar-none flex gap-3 overflow-x-auto"
        >
          {thumbs.map((thumb, i) => (
            <button
              key={i}
              ref={(el) => {
                thumbRefs.current[i] = el;
              }}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              aria-label={`Show image ${i + 1} of ${slides.length}: ${alts[i] ?? ""}`}
              tabIndex={i === active ? 0 : -1}
              className={cn(
                "relative size-20 shrink-0 overflow-hidden rounded-2xl border-2 transition-all duration-200 md:size-24",
                i === active
                  ? "border-ink shadow-sticker-sm"
                  : "border-ink/15 opacity-70 hover:opacity-100",
              )}
            >
              {thumb}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
