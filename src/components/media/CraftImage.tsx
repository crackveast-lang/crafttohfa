import Image from "next/image";
import { cn } from "@/lib/cn";
import { resolvePhoto, seedFrom } from "@/lib/images";
import { PlaceholderArt, type MotifKey } from "./PlaceholderArt";

/**
 * THE only component that renders next/image.
 *
 * Server Component. It asks the filesystem whether the photo exists yet and
 * either renders the real thing or a designed placeholder. Doing this on the
 * server (rather than a client onError fallback) means no 400s from the image
 * optimiser, no flash of a broken image, no extra client JS, and no CLS.
 *
 * To swap in a real photo: drop the file into public/images/products/ with the
 * name the data file already expects. No code change anywhere.
 */
export function CraftImage({
  src,
  alt,
  motif = "generic",
  className,
  imgClassName,
  sizes = "100vw",
  eager = false,
  ratio = "portrait",
  seedKey,
  showPlaceholderLabel = true,
}: {
  src: string;
  alt: string;
  motif?: MotifKey;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  /** LCP image only. Next 16 deprecated `priority` in favour of these two. */
  eager?: boolean;
  ratio?: "portrait" | "square" | "landscape" | "none";
  seedKey?: string;
  showPlaceholderLabel?: boolean;
}) {
  const resolved = resolvePhoto(src);
  const seed = seedFrom(seedKey ?? src);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-shell",
        ratio === "portrait" && "aspect-4/5",
        ratio === "square" && "aspect-square",
        ratio === "landscape" && "aspect-3/2",
        className,
      )}
    >
      {resolved ? (
        <Image
          src={resolved}
          alt={alt}
          fill
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          className={cn("object-cover", imgClassName)}
        />
      ) : (
        <PlaceholderArt
          label={alt}
          seed={seed}
          motif={motif}
          showLabel={showPlaceholderLabel}
          showTag={showPlaceholderLabel}
          className={cn("absolute inset-0", imgClassName)}
        />
      )}
    </div>
  );
}
