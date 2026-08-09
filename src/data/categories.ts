import type { Category, CategorySlug } from "@/types";
import { getProductsByCategory } from "./products";

/**
 * The four things CraftTohfa sells, in the order they appear on /shop.
 *
 * Anything that shows categories uses `activeCategories` below, so a category
 * with nothing in it simply doesn't appear rather than leading to a blank page.
 * Each `image` points at a real product photo in that category — never at a
 * photo from a different one, or the chip and the grid disagree.
 */
export const categories: Category[] = [
  {
    slug: "combos",
    name: "Rakhi Combo Boxes",
    blurb:
      "A crochet rakhi, a soft toy to keep, and pieces to paint together. Boxed and ready to give.",
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
    slug: "painting-kits",
    name: "DIY Painting Kits",
    blurb:
      "Everything laid out and ready — plaster figures, a brush and pots of colour. Open the box and start.",
    doodle: "PaintBrush",
    tone: "blush",
    image: {
      src: "/images/products/painting-kits/jungle-joy-animal-kit-1.jpeg",
      alt: "A DIY painting kit with plaster animals, a brush and paint pots",
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
