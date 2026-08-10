import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Button } from "./Button";
import { WhatsAppGlyph } from "@/components/doodles";
import {
  buildWhatsAppUrl,
  whatsAppDataAttrs,
  whatsAppLabel,
} from "@/lib/whatsapp";
import type { WhatsAppContext } from "@/types";

/**
 * THE only component allowed to build a wa.me URL.
 *
 * It renders a real <a> whose href is computed on the server, so the buy flow
 * survives JS being disabled, the link is long-pressable on mobile, and it is
 * crawlable. Never convert this to an onClick handler.
 */
type ButtonStyleProps = {
  variant?: ComponentPropsWithoutRef<typeof Button>["variant"];
  size?: "sm" | "md" | "lg";
  full?: boolean;
  className?: string;
};

export function WhatsAppButton({
  ctx,
  children,
  showIcon = true,
  /* Green by default. These buttons are the entire checkout on this site, and
     WhatsApp's own colour is what makes one recognisable as "this opens
     WhatsApp" before the label is read. Callers can still override — the dark
     band uses `onDark`, and the hero pairs a `secondary` with the primary
     next to it so the row doesn't read as two competing buttons. */
  variant = "whatsapp",
  ...rest
}: {
  ctx: WhatsAppContext;
  children: ReactNode;
  showIcon?: boolean;
} & ButtonStyleProps &
  Omit<
    ComponentPropsWithoutRef<"a">,
    "href" | "children" | keyof ButtonStyleProps
  >) {
  return (
    <Button
      href={buildWhatsAppUrl(ctx)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={whatsAppLabel(ctx)}
      variant={variant}
      {...whatsAppDataAttrs(ctx)}
      {...rest}
    >
      {showIcon ? (
        <WhatsAppGlyph className="size-4 shrink-0 sm:size-5" />
      ) : null}
      {children}
    </Button>
  );
}
