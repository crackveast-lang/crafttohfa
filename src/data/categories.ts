import type { Category, CategorySlug } from "@/types";
import { getProductsByCategory } from "./products";

/**
 * The three things Craftohfa sells, in the order they appear on /shop.
 *
 * ORDER IS CHEAPEST-FIRST, and that is a deliberate commercial decision rather
 * than a tidy alphabetical accident: painting kits start at ₹120, crochet at
 * ₹249 and combo boxes at ₹499. Someone landing on /shop meets the ₹120
 * painting kits first and reads the brand as approachable. Lead with the ₹499
 * boxes and the same catalogue reads as expensive.
 *
 * A fourth category, "Handmade Rakhis", sat at the top of this list until
 * Raksha Bandhan 2026 passed and it was retired. Its entry is gone rather
 * than emptied, because `activeCategories` hides an empty category but the
 * type still has to list a slug nothing uses.
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
    /* Back after being folded into `combos` for one release. Eleven paint sets
       had ended up under "Combo Boxes", where a ₹120 tray of plaster flowers
       sat next to a ₹499 combo box and the breadcrumb described neither. */
    slug: "painting-kits",
    name: "Painting Kits",
    blurb:
      "Plaster pieces cast blank, with the paints and a brush in the box. Open it and start; nothing else to buy.",
    doodle: "PaintBrush",
    tone: "blush",
    image: {
      src: "/images/products/painting-kits/fruit-basket-paint-combo-1.jpg",
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
    /* "Rakhi Combo Boxes" until the paint sets briefly lived here too, and
       then simply "Combo Boxes" once the festival wording came out. What is
       packed in them did not change — the crocheted item is described as a
       charm rather than by its festival name. The slug is untouched, so
       /shop?c=combos and every existing link still work. */
    slug: "combos",
    name: "Combo Boxes",
    blurb:
      "A crochet keepsake to hold on to and plaster pieces to paint, boxed on shredded paper and ready to give.",
    doodle: "GiftBox",
    tone: "peach",
    image: {
      src: "/images/products/combos/strawberry-bag-rakhi-paint-hamper-1.jpg",
      alt: "A combo box with a crochet pouch, a crocheted charm and plaster pieces to paint",
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
