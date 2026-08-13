import { siteConfig } from "@/site.config";
import type { WhatsAppContext } from "@/types";
import { formatINR } from "./format";

/**
 * WhatsApp is the entire checkout for this site. Everything here runs on the
 * server and produces a plain string, so <WhatsAppButton> can render a real
 * <a href> — no onClick, works with JS disabled, long-pressable, crawlable.
 */

function productUrl(slug: string): string {
  return `${siteConfig.url}/product/${slug}`;
}

export function buildWhatsAppMessage(ctx: WhatsAppContext): string {
  const { greeting, sign } = siteConfig.whatsapp;

  switch (ctx.kind) {
    case "product": {
      const { product, note } = ctx;
      return [
        greeting,
        "I'd like to order:",
        "",
        // *asterisks* render as bold inside WhatsApp — small touch, reads well.
        `*${product.name}*`,
        `Price: ${formatINR(product.price)}`,
        productUrl(product.slug),
        "",
        note ?? sign,
      ].join("\n");
    }

    case "category":
      return [
        greeting,
        `I'm looking at your ${ctx.category.name.toLowerCase()}.`,
        "",
        `${siteConfig.url}/shop?c=${ctx.category.slug}`,
        "",
        "Could you please share what's available right now?",
      ].join("\n");

    case "bulk":
      return [
        greeting,
        "I'd like to enquire about a bulk order.",
        "",
        "Quantity: ",
        "Occasion: ",
        "Needed by: ",
        "",
        "Could you please share pricing and timelines?",
      ].join("\n");

    case "general":
      return [greeting, "", ctx.note ?? "I had a question about your kits."].join(
        "\n",
      );
  }
}

/**
 * encodeURIComponent, NOT encodeURI. encodeURI leaves & # + unescaped, and a
 * '#' silently truncates the whole prefilled message at that point.
 */
export function buildWhatsAppUrl(ctx: WhatsAppContext): string {
  const text = encodeURIComponent(buildWhatsAppMessage(ctx));
  return `https://wa.me/${siteConfig.whatsapp.number}?text=${text}`;
}

/** Accessible name. Never a bare "Order now" — a screen-reader link list
 *  full of identical "Order now" entries is unusable. */
export function whatsAppLabel(ctx: WhatsAppContext): string {
  switch (ctx.kind) {
    case "product":
      return `Order ${ctx.product.name} on WhatsApp`;
    case "category":
      return `Ask about ${ctx.category.name} on WhatsApp`;
    case "bulk":
      return "Enquire about bulk orders on WhatsApp";
    case "general":
      return "Message Craftohfa on WhatsApp";
  }
}

/** Analytics hook — one delegated listener on [data-wa-kind] is all it takes
 *  to wire GA4 or the Meta Pixel later, since there is no cart to measure. */
export function whatsAppDataAttrs(ctx: WhatsAppContext) {
  return {
    "data-wa-kind": ctx.kind,
    "data-wa-slug":
      ctx.kind === "product"
        ? ctx.product.slug
        : ctx.kind === "category"
          ? ctx.category.slug
          : undefined,
  };
}
