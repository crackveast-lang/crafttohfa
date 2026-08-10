import type { Category, CategorySlug } from "@/types";
import { getProductsByCategory } from "./products";

/**
 * The three things CraftTohfa sells, in the order they appear on /shop.
 * "DIY Painting Kits" used to sit between rakhis and crochet; the plaster
 * paint sets are all combos now, so it went with the products.
 *
 * Anything that shows categories uses `activeCategories` below, so a category
 * with nothing in it simply doesn't appear rather than leading to a blank page.
 * Each `image` points at a real product photo in that category — never at a
 * photo from a different one, or the chip and the grid disagree.
 */
export const categories: Category[] = [
  {
    slug: "combos",
    /* "Rakhi Combo Boxes" until the paint sets were added here. Five of the
       ten items in this category now contain no rakhi and no soft toy, so the
       old name made the breadcrumb on a flower paint set read "Rakhi Combo
       Boxes" — and the blurb promised a rakhi in every one of them. The slug
       is untouched, so /shop?c=combos and every existing link still work. */
    name: "Combo Boxes",
    blurb:
      "Rakhi hampers with a crochet keepsake and pieces to paint, and multi-piece paint sets with everything for a whole afternoon. Boxed and ready to give.",
    doodle: "GiftBox",
    tone: "peach",
    image: {
      src: "/images/products/combos/strawberry-bag-rakhi-paint-hamper-1.jpg",
      alt: "A rakhi combo box with a crochet handbag, rakhi and pieces to paint",
    },
  },
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
    slug: "crochet",
    name: "Crochet Keepsakes",
    blurb:
      "The soft toys and keychains on their own — the part of a box that is still around long after August.",
    doodle: "Heart",
    tone: "cream",
    image: {
      src: "/images/products/crochet/teddy-bear-keychain-1.jpeg",
      alt: "A hand-crocheted teddy bear keychain in blue dungarees",
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
