import { ProductCard } from "./ProductCard";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Squiggle } from "@/components/doodles";
import { cn } from "@/lib/cn";
import type { Product } from "@/types";

/**
 * 2-up on mobile rather than 1-up: a single column feels sparse and pushes
 * everything below the fold on a phone.
 */
export function ProductGrid({
  products,
  className,
  eagerFirst = false,
}: {
  products: Product[];
  className?: string;
  eagerFirst?: boolean;
}) {
  if (products.length === 0) return <EmptyState />;

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-4",
        className,
      )}
    >
      {products.map((product, i) => (
        <ProductCard
          key={product.slug}
          product={product}
          eager={eagerFirst && i === 0}
        />
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-card border-2 border-dashed border-ink/20 px-6 py-16 text-center">
      <Squiggle className="h-5 w-32 text-rose" aria-hidden="true" />
      <h3 className="text-h3">Nothing here just yet</h3>
      <p className="max-w-[40ch] text-body text-ink/70">
        Nothing matches that filter right now. Tell us what you&apos;re after and
        we&apos;ll let you know if we can make it.
      </p>
      <WhatsAppButton
        ctx={{
          kind: "general",
          note: "I'm looking for something in particular — can you help?",
        }}
        className="mt-2"
      >
        Tell us what you need
      </WhatsAppButton>
    </div>
  );
}
