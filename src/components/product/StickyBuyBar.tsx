"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { WhatsAppGlyph } from "@/components/doodles";
import { buildWhatsAppUrl, whatsAppLabel } from "@/lib/whatsapp";
import { formatINR } from "@/lib/format";
import type { Product } from "@/types";

/**
 * Mobile-only bottom bar that fades in once the main buy button scrolls out of
 * view. On a site where ~90% of visitors arrive from Instagram on a phone,
 * this is the single highest-leverage conversion element on the page.
 *
 * Uses IntersectionObserver on the buy box rather than a scroll listener —
 * no per-frame work, so it doesn't fight with smooth scrolling.
 */
export function StickyBuyBar({ product }: { product: Product }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const target = document.getElementById("buy-box");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const ctx = { kind: "product", product } as const;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t-2 border-ink/85 bg-cream/95 backdrop-blur-md transition-transform duration-300 ease-bounce lg:hidden",
        show ? "translate-y-0" : "translate-y-full",
      )}
      // Clears the iOS home indicator / Android gesture bar
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      aria-hidden={!show}
    >
      <div className="flex items-center gap-3 px-4 pt-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium text-ink/65">
            {product.name}
          </p>
          <p className="font-display text-lg font-semibold tabular leading-tight">
            {formatINR(product.price)}
          </p>
        </div>

        <a
          href={buildWhatsAppUrl(ctx)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={whatsAppLabel(ctx)}
          data-wa-kind="product"
          data-wa-slug={product.slug}
          tabIndex={show ? 0 : -1}
          className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-ink px-6 font-semibold text-white shadow-soft"
        >
          <WhatsAppGlyph className="size-5" />
          Order now
        </a>
      </div>
    </div>
  );
}
