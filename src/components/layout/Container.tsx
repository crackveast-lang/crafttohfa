import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * The single definition of max-width and horizontal gutters on this site.
 * Nothing else should set page-level px-*. If a section needs to bleed past
 * the gutter, put the background outside the Container, not padding inside it.
 */
export function Container({
  as: Tag = "div",
  className,
  children,
  width = "default",
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  width?: "default" | "narrow" | "wide";
}) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-5 md:px-8",
        width === "default" && "max-w-[1200px]",
        width === "narrow" && "max-w-[760px]",
        width === "wide" && "max-w-[1440px]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
