"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { WhatsAppGlyph } from "@/components/doodles";
import { cn } from "@/lib/cn";
import { buildWhatsAppUrl, whatsAppLabel } from "@/lib/whatsapp";
import { siteConfig } from "@/site.config";

const ctx = { kind: "general" } as const;

/**
 * Slide-down mobile menu. One of only six client components on the site.
 *
 * Handles the full a11y contract: aria-expanded/controls, Escape to close,
 * focus trapped inside while open, focus restored to the trigger on close,
 * and body scroll locked.
 */
export function MobileNav() {
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const pathname = usePathname();

  /**
   * Open-ness is stored as "which route was this opened on", so navigating
   * closes the menu automatically. Deriving it during render beats an effect
   * that calls setState on every pathname change.
   */
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn === pathname;
  const setOpen = useCallback(
    (next: boolean) => setOpenedOn(next ? pathname : null),
    [pathname],
  );

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    // Captured now — by cleanup time the ref may point somewhere else.
    const trigger = triggerRef.current;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    // Move focus into the panel once it exists
    const raf = requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    });

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      cancelAnimationFrame(raf);
      (previouslyFocused ?? trigger)?.focus?.();
    };
  }, [open, setOpen]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        className="grid size-11 place-items-center rounded-full border-2 border-ink/80 text-ink transition-colors hover:bg-ink hover:text-cream md:hidden"
      >
        <svg
          viewBox="0 0 24 24"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.4}
          strokeLinecap="round"
          aria-hidden="true"
        >
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={cn(
          "fixed inset-0 top-0 z-40 bg-ink/35 backdrop-blur-[2px] transition-opacity duration-200 md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <div
        id={panelId}
        ref={panelRef}
        hidden={!open}
        /* Absolute against the sticky <header>, so it tracks the header's
           real position whether or not the announcement bar has scrolled away. */
        className="absolute inset-x-3 top-[calc(100%+0.5rem)] z-50 rounded-card border-2 border-ink bg-cream p-5 shadow-lift md:hidden"
      >
        <nav aria-label="Main">
          <ul className="flex flex-col">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  // Needed for same-path links like /shop → /shop?c=rakhis,
                  // where the pathname never changes so `open` wouldn't reset.
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center border-b border-ink/10 font-display text-lg font-semibold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                className="flex min-h-12 items-center border-b border-ink/10 font-display text-lg font-semibold"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <a
          href={buildWhatsAppUrl(ctx)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={whatsAppLabel(ctx)}
          data-wa-kind="general"
          className="mt-5 flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 font-semibold text-white"
        >
          <WhatsAppGlyph className="size-5" />
          Chat with us
        </a>
        <p className="mt-2 text-center text-xs text-ink/60">
          {siteConfig.whatsapp.responseTime}
        </p>
      </div>
    </>
  );
}
