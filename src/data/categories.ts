import type { Category, CategorySlug } from "@/types";
import { getProductsByCategory } from "./products";

/**
 * The four things Craftohfa sells, in the order they appear on /shop.
 *
 * ORDER IS CHEAPEST-FIRST, and that is a deliberate commercial decision rather
 * than a tidy alphabetical accident: rakhis and painting kits both start at
 * ₹120, crochet at ₹249 and combo boxes at ₹499. Someone landing on /shop
 * meets the ₹120 rakhis first and reads the brand as approachable. Lead with
 * the ₹499 boxes and the same catalogue reads as expensive.
 *
 * If a price changes enough to reorder these, move the entry. It is not
 * derived from the data on purpose: a category list that silently reshuffles
 * itself when one product is repriced is worse than one you edit by hand.
 *
 * Anything that shows categories uses `activeCategories` below, so a category
 * with nothing in it simply doesn't appear rather than leading to a blank page.
 * Each `image` points at a real product photo in that category, never at a
 * photo from a different one, or the chip and the grid disagree.
 */
export const categories: Category[] = [
  {
    slug: "rakhis",
    name: "Handmade Rakhis",
    blurb:
      "Crocheted by hand in soft cotton. No plastic, no shedding glitter, comfortable all day.",
    doodle: "RakhiThread",
    tone: "sage",
    image: {
      src: "/images/products/rakhis/sunflower-rakhi-1.jpeg",
      alt: "A hand-crocheted sunflower rakhi in cotton thread",
    },
  },
  {
    /* Back after being folded into `combos` for one release. Eleven paint sets
       had ended up under "Combo Boxes", where a ₹120 tray of plaster flowers
       sat next to a ₹499 rakhi hamper and the breadcrumb described neither. */
    slug: "painting-kits",
    name: "Painting Kits",
    blurb:
      "Plaster pieces cast blank, with the paints and a brush in the box. Open it and start; nothing else to buy.",
    doodle: "PaintBrush",
    tone: "blush",
    image: {
      src: "/images/products/painting-kits/fruit-basket-paint-combo-1.png",
      alt: "A painting kit with plaster fruits, paint pots and a brush",
    },
  },
  {
    slug: "crochet",
    name: "Crochet Keepsakes",
    blurb:
      "The soft toys and keychains on their own, the part of a box that is still being carried around long after it was opened.",
    doodle: "Heart",
    tone: "cream",
    image: {
      src: "/images/products/crochet/teddy-bear-keychain-1.jpeg",
      alt: "A hand-crocheted keychain toy in blue dungarees",
    },
  },
  {
    /* "Rakhi Combo Boxes" until the paint sets briefly lived here too. Now
       that they have their own category every box in this one really does
       contain a rakhi again, so the blurb can promise it. The slug is
       untouched, so /shop?c=combos and every existing link still work. */
    slug: "combos",
    name: "Combo Boxes",
    blurb:
      "A rakhi, a crochet keepsake and pieces to paint, boxed on shredded paper and ready to give.",
    doodle: "GiftBox",
    tone: "peach",
    image: {
      src: "/images/products/combos/strawberry-bag-rakhi-paint-hamper-1.jpg",
      alt: "A rakhi combo box with a crochet pouch, rakhi and pieces to paint",
    },
  },
];

/** Only the categories that actually have something in them. */
export const activeCategories: Category[] = categories.filter(
  (c) => getProductsByCategory(c.slug).length > 0,
);

export function getCategory(slug: CategorySlug): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function categoryName(slug: CategorySlug): string {
  return getCategory(slug)?.name ?? slug;
}
