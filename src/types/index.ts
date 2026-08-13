/**
 * The four things Craftohfa sells. `combos` was called `hampers` until the
 * catalogue was split by category; it is the same product line, renamed so the
 * URL (/shop?c=combos) matches what these are called everywhere else.
 *
 * `painting-kits` is back. It was folded into `combos` when there were two
 * paint sets; there are now eleven, and a ₹120 tray of plaster flowers sitting
 * under "Combo Boxes" next to a ₹499 rakhi hamper described neither of them.
 * The slug is the original one, so old /shop?c=painting-kits links work again.
 *
 * Order here is not meaningful. `categories.ts` owns display order.
 */
export type CategorySlug = "rakhis" | "painting-kits" | "crochet" | "combos";

export interface ProductImage {
  /**
   * Path under /public. The file may not exist yet — CraftImage resolves it at
   * render time and falls back to a designed placeholder if it is missing.
   */
  src: string;
  alt: string;
}

export interface Product {
  /** URL segment AND the filename stem for its photos. Keep them in sync. */
  slug: string;
  name: string;
  category: CategorySlug;
  /** Whole rupees. */
  price: number;
  /** Struck-through "was" price. Omit if not on offer. */
  compareAtPrice?: number;
  /** <=70 chars, sits directly under the name. */
  tagline: string;
  /** 2–3 sentences. Doubles as the meta description. */
  description: string;
  highlights: string[];
  /** What's physically in the box. */
  includes: string[];
  ageRange?: string;
  craftTime?: string;
  /** Rakhis per pack, where relevant. */
  pieces?: number;
  /** images[0] is the card image and the OG image. */
  images: ProductImage[];
  badges?: string[];
  featured?: boolean;
  /** Surfaces more prominently during a festival window. */
  seasonal?: boolean;
  inStock: boolean;
  rating?: { value: number; count: number };
}

export interface Category {
  slug: CategorySlug;
  name: string;
  blurb: string;
  doodle: "PaintBrush" | "RakhiThread" | "GiftBox" | "Heart";
  /** Tailwind background token used as this category's colour anchor. */
  tone: "blush" | "peach" | "sage" | "cream";
  image: ProductImage;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  city: string;
  rating: 1 | 2 | 3 | 4 | 5;
  purchased?: string;
  /**
   * ★ Gates review structured data. While ANY testimonial is a placeholder we
   * emit no Review/AggregateRating JSON-LD at all — fake review markup is a
   * Google manual-action risk and a CCPA-2019 problem in India.
   */
  isPlaceholder: boolean;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  group: FaqGroup;
}

export type FaqGroup = "Orders" | "Shipping" | "Products" | "Bulk orders";

export interface Festival {
  name: string;
  date: string;
  orderByDate: string;
  note: string;
}

export type WhatsAppContext =
  | { kind: "product"; product: Product; note?: string }
  | { kind: "category"; category: Category }
  | { kind: "bulk" }
  | { kind: "general"; note?: string };
