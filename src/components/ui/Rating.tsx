import { Star } from "@/components/doodles";
import { cn } from "@/lib/cn";

/**
 * Star row. The stars themselves are aria-hidden and the whole row carries one
 * readable label — five separate "star" announcements would be noise.
 */
export function Rating({
  value,
  count,
  className,
  size = "sm",
}: {
  value: number;
  count?: number;
  className?: string;
  size?: "sm" | "md";
}) {
  const rounded = Math.round(value);
  const label =
    count !== undefined
      ? `Rated ${value} out of 5 from ${count} reviews`
      : `Rated ${value} out of 5`;

  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span className="flex gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={cn(
              size === "sm" ? "size-3.5" : "size-4",
              i < rounded ? "text-rose" : "text-ink/20",
            )}
          />
        ))}
      </span>
      <span className="sr-only">{label}</span>
      <span aria-hidden="true" className="text-sm font-semibold tabular">
        {value.toFixed(1)}
      </span>
      {count !== undefined ? (
        <span aria-hidden="true" className="text-sm text-ink/60">
          ({count})
        </span>
      ) : null}
    </span>
  );
}
