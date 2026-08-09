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
  variant?: "primary" | "secondary" | "ghost" | "sticker" | "onDark";
  size?: "sm" | "md" | "lg";
  full?: boolean;
  className?: string;
};

export function WhatsAppButton({
  ctx,
  children,
  showIcon = true,
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
