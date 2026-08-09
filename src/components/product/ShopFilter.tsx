"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";

export interface FilterOption {
  id: string;
  label: string;
  count: number;
}

/**
 * Filter pills for the shop.
 *
 * The product cards are rendered on the SERVER and handed in as `children`.
 * This component only hides and shows the already-rendered DOM nodes, which
 * means: every product is in the HTML for Google, the page stays fully static,
 * and with JavaScript disabled you simply see all of them. Nothing breaks.
 *
 * The active filter is mirrored into the URL with replaceState so a filtered
 * view can be shared — deliberately not a ?searchParam prop, which would opt
 * the whole page out of static generation for no benefit.
 */
function subscribeToUrl(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
}

function readUrlCategory(): string | null {
  return new URLSearchParams(window.location.search).get("c");
}

export function ShopFilter({
  options,
  children,
}: {
  options: FilterOption[];
  children: React.ReactNode;
}) {
  // Read ?c= as an external store rather than in an effect: no cascading
  // render, and the server snapshot (null) keeps the page statically rendered.
  const urlCategory = useSyncExternalStore(
    subscribeToUrl,
    readUrlCategory,
    () => null,
  );

  const [override, setOverride] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const validIds = useMemo(() => new Set(options.map((o) => o.id)), [options]);

  const active =
    override ??
    (urlCategory && validIds.has(urlCategory) ? urlCategory : "all");

  // Derived during render — no state, so no chance of it drifting out of sync.
  const visibleCount = options.find((o) => o.id === active)?.count ?? 0;

  const select = useCallback((id: string) => {
    setOverride(id);
    const url = new URL(window.location.href);
    if (id === "all") url.searchParams.delete("c");
    else url.searchParams.set("c", id);
    window.history.replaceState(null, "", url);
  }, []);

  // Syncing the real DOM is exactly what an effect is for.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    grid.querySelectorAll<HTMLElement>("[data-category]").forEach((item) => {
      const price = Number(item.dataset.price ?? 0);
      item.hidden = !(
        active === "all" ||
        (active === "under-800"
          ? price < 800
          : item.dataset.category === active)
      );
    });
  }, [active]);

  return (
    <>
      <div
        role="group"
        aria-label="Filter products"
        className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:px-0"
      >
        {options.map((option) => {
          const isActive = active === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => select(option.id)}
              aria-pressed={isActive}
              className={cn(
                "inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full border-2 px-4 text-sm font-semibold transition-all duration-200",
                isActive
                  ? "border-ink bg-ink text-cream"
                  : "border-ink/25 bg-transparent text-ink/80 hover:border-ink/60 hover:bg-ink/5",
              )}
            >
              {option.label}
              <span
                className={cn(
                  "tabular text-xs",
                  isActive ? "text-cream/70" : "text-ink/45",
                )}
              >
                {option.count}
              </span>
            </button>
          );
        })}
      </div>

      <div
        ref={gridRef}
        className="mt-8 grid grid-cols-2 gap-4 md:mt-10 md:grid-cols-3 md:gap-6 xl:grid-cols-4"
      >
        {children}
      </div>

      {visibleCount === 0 ? (
        <p className="mt-10 rounded-card border-2 border-dashed border-ink/20 px-6 py-12 text-center text-body text-ink/70">
          Nothing matches that filter yet.{" "}
          <button
            type="button"
            onClick={() => select("all")}
            className="font-semibold underline decoration-sage decoration-2 underline-offset-4"
          >
            Show everything
          </button>
        </p>
      ) : null}
    </>
  );
}
