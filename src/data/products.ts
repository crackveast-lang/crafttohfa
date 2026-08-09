import type { CategorySlug, Product } from "@/types";

/**
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │  YOUR PRODUCT CATALOGUE                                              │
 * │                                                                      │
 * │  Four categories, priced from PRICES below — change a price there    │
 * │  and every product in that category follows. Names, descriptions and │
 * │  photos are real, written from your product photographs.             │
 * │                                                                      │
 * │  ⚠️ STILL PLACEHOLDER — please check and correct:                     │
 * │     • every `rating` (delete the field where you have no reviews)    │
 * │                                                                      │
 * │  PHOTOS live in public/images/products/<category>/ and are named     │
 * │  <slug>-1.jpeg. To add a second photo of anything, drop in           │
 * │  <slug>-2.jpeg and add one more alt string to its `photos(...)`.     │
 * └──────────────────────────────────────────────────────────────────────┘
 */

/**
 * One place for every price. Everything in a category shares its price, so
 * changing what a rakhi costs is a one-line edit rather than fifteen.
 */
const PRICES = {
  rakhis: 50,
  paintingKits: 120,
  crochet: 120,
  combos: 499,
} as const;

/**
 * Builds the image set so slugs and filenames can never drift apart.
 * Extensions differ by folder — the combo photos are .jpg, everything shot
 * later is .jpeg — so it is a parameter rather than a hardcoded suffix.
 */
function photos(
  dir: string,
  slug: string,
  alts: string[],
  ext: "jpg" | "jpeg" = "jpeg",
) {
  return alts.map((alt, i) => ({
    src: `/images/products/${dir}/${slug}-${i + 1}.${ext}`,
    alt,
  }));
}

// ═══════════════════════════════  RAKHIS  ═══════════════════════════════════

/** Every rakhi ships the same way, so it is described once. */
const RAKHI_INCLUDES = [
  "1 hand-crocheted rakhi",
  "Adjustable cotton tie",
  "Presented on a printed card",
];

/**
 * The rakhis differ only in what they depict, so the shared fields live here
 * and each entry below supplies just the parts that are actually different.
 * Fifteen near-identical literal objects would bury those differences.
 */
function rakhi(o: {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  alt: string;
  badges?: string[];
  featured?: boolean;
}): Product {
  return {
    slug: o.slug,
    name: o.name,
    category: "rakhis",
    price: PRICES.rakhis,
    tagline: o.tagline,
    description: o.description,
    highlights: o.highlights,
    includes: RAKHI_INCLUDES,
    images: photos("rakhis", o.slug, [o.alt]),
    badges: o.badges,
    featured: o.featured,
    seasonal: true,
    inStock: true,
  };
}

const rakhis: Product[] = [
  rakhi({
    slug: "sunflower-rakhi",
    name: "Sunflower Rakhi",
    tagline: "Yellow petals, a brown centre and two green leaves",
    description:
      "A full sunflower crocheted in yellow with a deep brown centre and a green leaf on each side, finished with pearl beads on the tie. One of the larger rakhis in the range.",
    highlights: [
      "Crocheted petals, centre and leaves worked separately",
      "Pearl beads on the tie",
      "No plastic and no shedding glitter",
    ],
    alt: "A hand-crocheted sunflower rakhi with yellow petals, a brown centre and green leaves, worn on a child's wrist",
    badges: ["Bestseller"],
  }),
  rakhi({
    slug: "peacock-rakhi",
    name: "Peacock Rakhi",
    tagline: "A peacock feather, worked in green, yellow and blue",
    description:
      "The eye of a peacock feather crocheted in three rounds — bright green on the outside, yellow, then a deep blue centre — with a pearl bead either side of the tie. The only one in the range with a feather rather than an animal or a flower.",
    highlights: [
      "Three colours worked in concentric rounds",
      "A pearl bead on each side of the tie",
      "Crocheted by hand in soft cotton",
    ],
    alt: "A hand-crocheted peacock feather rakhi in green, yellow and blue with pearl beads, worn on a child's wrist",
  }),
  rakhi({
    slug: "butterfly-rakhi",
    name: "Butterfly Rakhi",
    tagline: "A pink butterfly with beaded antennae",
    description:
      "A butterfly crocheted in bright pink, with fine black beaded antennae and a pearl bead either side of the tie. The lightest thing in the range to wear.",
    highlights: [
      "Beaded antennae, sewn on by hand",
      "A pearl bead on each side of the tie",
      "Light enough to forget you are wearing it",
    ],
    alt: "A hand-crocheted pink butterfly rakhi with black beaded antennae and pearl beads, worn on a child's wrist",
  }),
  rakhi({
    slug: "lion-rakhi",
    name: "Lion Rakhi",
    tagline: "A dark mane worked all the way round",
    description:
      "A lion with a deep brown mane crocheted in a full ring around a cream face, with ears sewn on top. Sturdy enough to survive a whole day of being shown to people.",
    highlights: [
      "Mane worked as a full ring around the face",
      "Ears crocheted separately and sewn on",
      "Crocheted by hand in soft cotton",
    ],
    alt: "A hand-crocheted lion rakhi with a dark brown mane and a cream face, worn on a child's wrist",
  }),
  rakhi({
    slug: "cute-lion-rakhi",
    name: "Golden Lion Rakhi",
    tagline: "The same lion, in orange and gold",
    description:
      "The lion again, this time with an orange face, a gold mane and a white muzzle with a stitched smile. A pearl and a gold bead sit on the tie. Brighter than the brown one, and the pair sell about equally.",
    highlights: [
      "Orange and gold colourway with a white muzzle",
      "Pearl and gold beads on the tie",
      "Crocheted ears worked separately and sewn on",
    ],
    alt: "A hand-crocheted lion rakhi with an orange face, a gold mane and a white muzzle, worn on a child's wrist",
  }),
  rakhi({
    slug: "teddy-bear-rakhi",
    name: "Red Teddy Bear Rakhi",
    tagline: "A teddy that stays on the wrist",
    description:
      "A crocheted teddy bear face in red and cream cotton, on an adjustable tie. Chunky enough to feel like a toy rather than a decoration.",
    highlights: [
      "Chunky crochet teddy face",
      "Red and cream cotton",
      "Adjustable tie",
    ],
    alt: "A hand-crocheted red teddy bear rakhi",
  }),
  rakhi({
    slug: "blue-car-rakhi",
    name: "Blue Car Rakhi",
    tagline: "For the brother who does not want flowers",
    description:
      "A little blue car crocheted in cotton thread, on an adjustable tie. The one that gets ordered for brothers who have never once wanted a rakhi with beads on it.",
    highlights: [
      "No flowers, no pearls",
      "Crocheted by hand in soft cotton",
      "Adjustable tie",
    ],
    alt: "A hand-crocheted blue car rakhi",
    badges: ["For brothers"],
  }),
  rakhi({
    slug: "evil-eye-rakhi",
    name: "Evil Eye Rakhi",
    tagline: "A nazar, crocheted in blue and white",
    description:
      "A crocheted evil eye in deep blue, pale blue and white, finished with a pearl bead on the tie. Meant as protection, and it happens to go with everything.",
    highlights: [
      "Crocheted nazar in three shades of blue",
      "Single pearl bead on the tie",
      "Adjustable cotton tie",
    ],
    alt: "A hand-crocheted evil eye rakhi in blue and white with a pearl bead",
    badges: ["New"],
  }),
  rakhi({
    slug: "rainbow-spiral-rakhi",
    name: "Rainbow Spiral Rakhi",
    tagline: "Pink, blue and yellow, worked in a spiral",
    description:
      "Concentric rings of pink, pale blue and yellow crocheted into a spiral, with a pearl bead on the tie. The brightest thing in the range.",
    highlights: [
      "Worked as a spiral, not stitched in sections",
      "Pearl bead on the cotton tie",
      "Adjustable tie",
    ],
    alt: "A hand-crocheted rainbow spiral rakhi in pink, blue and yellow with a pearl bead, worn on a child's wrist",
  }),
  rakhi({
    slug: "bhai-word-rakhi",
    name: '"Bhai" Rakhi',
    tagline: "The word crocheted straight into it",
    description:
      "A red disc with a yellow border and BHAI worked into the front in yellow thread — crocheted in, not printed on or stuck to it. Finished with a small gold bead.",
    highlights: [
      "The lettering is crocheted in, not printed",
      "Red and yellow cotton with a gold bead",
      "Adjustable tie",
    ],
    alt: 'A hand-crocheted rakhi in red and yellow with the word "BHAI" worked into the front',
  }),
  rakhi({
    slug: "bro-word-rakhi",
    name: '"Bro" Rakhi',
    tagline: "BRO, embroidered in red on yellow",
    description:
      "A yellow disc with a cream scalloped edge and BRO embroidered across it in red thread. For a brother who would find anything else too much.",
    highlights: [
      "Hand-embroidered lettering",
      "Cream scalloped border",
      "Adjustable tie",
    ],
    alt: 'A hand-crocheted yellow rakhi with a cream scalloped edge and "BRO" embroidered in red',
    badges: ["For brothers"],
  }),
  rakhi({
    slug: "bro-pearl-rakhi",
    name: '"Bro" Pearl Rakhi',
    tagline: "The letters picked out in pearls",
    description:
      "A yellow centre with a pink crocheted border, and BRO spelled out across it in individually sewn pearl beads. The dressiest of the three word rakhis.",
    highlights: [
      "Lettering picked out in sewn pearl beads",
      "Pink and yellow cotton",
      "Adjustable tie",
    ],
    alt: 'A hand-crocheted pink and yellow rakhi with "BRO" spelled out in pearl beads',
  }),
  rakhi({
    slug: "kitty-face-rakhi",
    name: "Kitty Face Rakhi",
    tagline: "A cream cat face with a red bow and a yellow nose",
    description:
      "A cream crochet cat face with a red bow crocheted separately and sewn to one ear, a small yellow nose and embroidered whiskers. On a red tie with a gold and pearl bead.",
    highlights: [
      "Bow worked separately and sewn on",
      "Embroidered whiskers and a yellow nose",
      "Red tie with gold and pearl beads",
    ],
    alt: "A cream hand-crocheted cat face rakhi with a red bow, a yellow nose and embroidered whiskers, worn on a child's wrist",
  }),
  rakhi({
    slug: "spider-web-rakhi",
    name: "Spider Web Rakhi",
    tagline: "A red web mask with white eyes and a blue border",
    description:
      "A red disc with black web lines embroidered across it and two white eyes, finished with a bright blue crocheted border. Made for the brother whose entire personality is superheroes.",
    highlights: [
      "Web lines embroidered over the crochet",
      "White eyes appliquéd on by hand",
      "Blue border worked around the edge",
    ],
    alt: "A hand-crocheted red spider mask rakhi with black web lines, white eyes and a blue border, worn on a child's wrist",
    badges: ["For brothers"],
  }),
  rakhi({
    slug: "captain-shield-rakhi",
    name: "Superhero Shield Rakhi",
    tagline: "Red and white rings around a silver star",
    description:
      "A shield crocheted as concentric rings of red and white around a blue centre, with a silver star sewn on top. The other one for superhero brothers.",
    highlights: [
      "Rings worked in red and white around a blue centre",
      "Silver star appliquéd on by hand",
      "Crocheted by hand in soft cotton",
    ],
    alt: "A hand-crocheted shield rakhi with red and white rings, a blue centre and a silver star, worn on a child's wrist",
    badges: ["For brothers"],
  }),
];

// ═══════════════════════════  DIY PAINTING KITS  ════════════════════════════

/** Every painting kit ships with the same materials. */
const PAINT_KIT_INCLUDES = [
  "Acrylic paint pots",
  "1 paintbrush",
  "Printed CraftTohfa card",
];

const paintingKits: Product[] = [
  {
    slug: "bhai-behen-idol-paint-kit",
    name: "Bhai–Behen Idol Paint Kit",
    category: "painting-kits",
    price: PRICES.paintingKits,
    tagline: "The brother-and-sister idol, ready to paint",
    description:
      "The plaster bhai–behen figure — a sister tying a rakhi on her brother's wrist, the two of them sat cross-legged. It comes blank with paints and a brush, so the two of them decide what it looks like.",
    highlights: [
      "Cast in plaster with real relief detail",
      "Comes blank — the colours are up to you",
      "Paints and brush included",
      "Keeps its place on a shelf long after August",
    ],
    includes: ["1 plaster bhai–behen idol", ...PAINT_KIT_INCLUDES],
    ageRange: "5–12 years",
    craftTime: "30–45 minutes",
    images: photos("painting-kits", "bhai-behen-idol-paint-kit", [
      "An unpainted plaster bhai–behen idol showing a sister tying a rakhi on her brother's wrist",
      "A close view of the same unpainted bhai–behen idol",
    ]),
    badges: ["Most loved"],
    featured: false,
    seasonal: true,
    inStock: true,
  },
  {
    slug: "rocket-paint-kit",
    name: "Rocket Paint Kit",
    category: "painting-kits",
    price: PRICES.paintingKits,
    tagline: "A plaster rocket, three paints and a brush",
    description:
      "A moulded plaster rocket with raised panel lines to paint between, boxed with three acrylic pots and a brush. Small enough to finish in one sitting.",
    highlights: [
      "Raised panel lines to paint between",
      "Three acrylic paints and a brush",
      "Finishes in one sitting",
    ],
    includes: ["1 plaster rocket", ...PAINT_KIT_INCLUDES],
    ageRange: "4–10 years",
    craftTime: "25–40 minutes",
    images: photos("painting-kits", "rocket-paint-kit", [
      "An unpainted plaster rocket with blue, orange and white paint pots and a brush on a CraftTohfa card",
    ]),
    seasonal: false,
    inStock: true,
  },
  {
    slug: "jungle-joy-animal-kit",
    name: "Jungle Joy Animal Art Kit",
    category: "painting-kits",
    price: PRICES.paintingKits,
    tagline: "A hippo and a giraffe in one box",
    description:
      "Two plaster animals — a round hippo and a long-necked giraffe — with three acrylic pots and a brush. Two pieces means two children can paint at the same time instead of taking turns.",
    highlights: [
      "Two figures, so two can paint at once",
      "Hippo and giraffe, both cast in plaster",
      "Three acrylic paints and a brush",
    ],
    includes: [
      "1 plaster hippo",
      "1 plaster giraffe",
      ...PAINT_KIT_INCLUDES,
    ],
    ageRange: "4–10 years",
    craftTime: "40–55 minutes",
    images: photos("painting-kits", "jungle-joy-animal-kit", [
      "An unpainted plaster hippo and giraffe with blue, green and yellow paint pots and a brush on a CraftTohfa card",
    ]),
    badges: ["Two to paint"],
    seasonal: false,
    inStock: true,
  },
  {
    slug: "paint-my-name-kit",
    name: "Paint My Name — Personalised Kit",
    category: "painting-kits",
    price: PRICES.paintingKits,
    tagline: "Their name in plaster letters, plus something to paint",
    description:
      "Plaster letters cast to spell out whichever name you send us, with a plaster figure and four acrylic pots. Tell us the name over WhatsApp when you order — that is the whole process.",
    highlights: [
      "Letters cast to spell any name you send",
      "Comes with a plaster figure as well",
      "Four acrylic paints and a brush",
      "Send the name over WhatsApp when you order",
    ],
    includes: [
      "Plaster letters spelling your chosen name",
      "1 plaster figure",
      ...PAINT_KIT_INCLUDES,
    ],
    ageRange: "4–12 years",
    craftTime: "45–60 minutes",
    images: photos("painting-kits", "paint-my-name-kit", [
      'Unpainted plaster letters spelling "AMAN" with a plaster race car, four paint pots and a brush on a CraftTohfa card',
    ]),
    badges: ["Personalised"],
    seasonal: false,
    inStock: true,
  },
];

// ════════════════════════════  CROCHET KEEPSAKES  ═══════════════════════════

const crochet: Product[] = [
  {
    slug: "teddy-bear-keychain",
    name: "Teddy Bear Keychain",
    category: "crochet",
    price: PRICES.crochet,
    tagline: "A little bear in blue dungarees and a red scarf",
    description:
      "A crocheted teddy in blue dungarees with a red scarf, on a keyring clip. Small enough for a school bag, and sturdy enough to survive being on one.",
    highlights: [
      "Crocheted by hand in soft cotton",
      "Metal keyring clip",
      "Clips onto a school bag or a set of keys",
    ],
    includes: ["1 crochet teddy bear keychain with a keyring clip"],
    images: photos("crochet", "teddy-bear-keychain", [
      "A hand-crocheted teddy bear keychain wearing blue dungarees and a red scarf",
    ]),
    seasonal: false,
    inStock: true,
  },
  {
    slug: "happy-rabbit-keychain",
    name: '"Happy Rabbit" Keychain',
    category: "crochet",
    price: PRICES.crochet,
    tagline: "A bunny holding a note that says you are the happiest person",
    description:
      'A cream crochet bunny on a gold keyring clip, holding a small card reading "Happy Rabbit — today you are the happiest person". The one people buy to cheer someone up rather than for a festival.',
    highlights: [
      "Comes holding its own printed note",
      "Crocheted by hand in cream cotton",
      "Gold keyring clip",
    ],
    includes: [
      "1 crochet bunny keychain with a gold clip",
      '1 "Happy Rabbit" message card',
    ],
    images: photos("crochet", "happy-rabbit-keychain", [
      'A cream hand-crocheted bunny keychain holding a card reading "Happy Rabbit, today you are the happiest person"',
    ]),
    badges: ["New"],
    seasonal: false,
    inStock: true,
  },
];

// ═══════════════════════════════  COMBOS  ═══════════════════════════════════

/** Every combo box contains these. Listed once so it can't fall out of sync. */
const IN_EVERY_BOX = [
  "1 paint-your-own bhai–behen idol",
  "Acrylic paint pots and a brush",
  '"Happy Raksha Bandhan" card',
  "Gift box with shredded-paper filling",
];

const combos: Product[] = [
  {
    slug: "hello-kitty-rakhi-paint-hamper",
    name: "Kitty Rakhi & Paint Combo",
    category: "combos",
    price: PRICES.combos,
    tagline: "A crochet kitty rakhi, a pink piggy friend, and two things to paint",
    description:
      "A hand-crocheted kitty rakhi with pearl beads, a soft pink crochet piggy to keep, and two plaster pieces waiting to be painted — the bhai–behen idol and a kitty face. Four colours and a brush are in the box, so the afternoon carries on after the thread is tied.",
    highlights: [
      "Crochet kitty rakhi with pearl and gold beads",
      "Soft pink crochet piggy — hers to keep afterwards",
      "Two plaster pieces to paint, not one",
      "Everything supplied — nothing else to buy",
    ],
    includes: [
      "1 crochet kitty rakhi on a printed card",
      "1 pink crochet piggy soft toy",
      "1 paint-your-own kitty face",
      ...IN_EVERY_BOX,
    ],
    ageRange: "5–12 years",
    craftTime: "45–60 minutes",
    images: photos(
      "combos",
      "hello-kitty-rakhi-paint-hamper",
      [
        "Kitty rakhi combo box open, showing a pink crochet piggy, a crochet kitty rakhi, a bhai–behen idol and a kitty face to paint with four paint pots",
      ],
      "jpg",
    ),
    badges: ["Bestseller"],
    featured: true,
    seasonal: true,
    inStock: true,
    rating: { value: 5, count: 24 },
  },

  {
    slug: "butterfly-rainbow-rakhi-paint-hamper",
    name: "Butterfly & Rainbow Combo",
    category: "combos",
    price: PRICES.combos,
    tagline: "A crochet rainbow, a butterfly rakhi, and a butterfly to paint",
    description:
      "A pink crocheted rainbow, a matching butterfly rakhi, and a plaster butterfly to paint alongside the bhai–behen idol. The softest of the five, and the one that tends to get chosen for younger sisters.",
    highlights: [
      "Hand-crocheted pink butterfly rakhi with beads",
      "Chunky crochet rainbow — a keepsake, not a filler",
      "Butterfly and idol both ready to paint",
      "Four paint pots and a brush included",
    ],
    includes: [
      "1 crochet butterfly rakhi on a printed card",
      "1 crochet rainbow in pink and cream",
      "1 paint-your-own butterfly",
      ...IN_EVERY_BOX,
    ],
    ageRange: "4–12 years",
    craftTime: "45–60 minutes",
    images: photos(
      "combos",
      "butterfly-rainbow-rakhi-paint-hamper",
      [
        "Butterfly and rainbow combo box with a pink crochet rainbow, a crochet butterfly rakhi, a bhai–behen idol and a plaster butterfly with four paint pots",
      ],
      "jpg",
    ),
    featured: true,
    seasonal: true,
    inStock: true,
    rating: { value: 4.9, count: 18 },
  },

  {
    slug: "little-car-rakhi-paint-hamper",
    name: "Little Car Rakhi & Puppy Combo",
    category: "combos",
    price: PRICES.combos,
    tagline: "For a brother who'd rather have a car than a flower",
    description:
      "A crocheted blue car rakhi instead of the usual florals, a puppy keychain in red dungarees, and a plaster car with a coin slot to paint and then actually use. Made for the brother who has never once wanted a rakhi with beads on it.",
    highlights: [
      "Crochet car rakhi — no flowers, no pearls",
      "Puppy keychain that clips onto a school bag",
      "The plaster car is a working money box",
      "Red, blue and white paints included",
    ],
    includes: [
      "1 crochet car rakhi on a printed card",
      "1 crochet puppy keychain in dungarees",
      "1 paint-your-own car money box",
      ...IN_EVERY_BOX,
    ],
    ageRange: "5–12 years",
    craftTime: "45–60 minutes",
    images: photos(
      "combos",
      "little-car-rakhi-paint-hamper",
      [
        "Little car combo box with a crochet puppy keychain, a blue crochet car rakhi, a bhai–behen idol and a plaster car money box with three paint pots",
      ],
      "jpg",
    ),
    badges: ["For brothers"],
    featured: true,
    seasonal: true,
    inStock: true,
    rating: { value: 4.9, count: 21 },
  },

  {
    slug: "strawberry-bag-rakhi-paint-hamper",
    name: "Strawberry Bag Combo",
    category: "combos",
    price: PRICES.combos,
    tagline: "A crocheted handbag she'll carry long after August",
    description:
      "A hand-crocheted mini handbag with a felted strawberry on the front — the piece in this collection that outlives the festival by months. With a rainbow spiral rakhi, a plaster strawberry to paint, and the bhai–behen idol.",
    highlights: [
      "Crochet mini handbag with a felted strawberry",
      "Rainbow spiral rakhi with pearl and gold beads",
      "Four paints — red, yellow, green and pink",
      "The bag gets used well past Raksha Bandhan",
    ],
    includes: [
      "1 rainbow crochet rakhi on a printed card",
      "1 crochet strawberry handbag",
      "1 paint-your-own strawberry",
      ...IN_EVERY_BOX,
    ],
    ageRange: "5–12 years",
    craftTime: "45–60 minutes",
    images: photos(
      "combos",
      "strawberry-bag-rakhi-paint-hamper",
      [
        "Strawberry bag combo box with a white crochet handbag, a rainbow crochet rakhi, a bhai–behen idol and a plaster strawberry with four paint pots",
      ],
      "jpg",
    ),
    badges: ["Most loved"],
    featured: true,
    seasonal: true,
    inStock: true,
    rating: { value: 5, count: 29 },
  },

  {
    slug: "bunny-rakhi-paint-hamper",
    name: "Bunny Rakhi & Seashore Combo",
    category: "combos",
    price: PRICES.combos,
    tagline: "A bunny with a note, and three pieces to paint",
    description:
      'A cream crochet bunny holding a small card that reads "Happy Rabbit — today you are the happiest person", a rainbow spiral rakhi, and three plaster pieces to paint: the bhai–behen idol, a starfish and a shell. The most to paint of any box here.',
    highlights: [
      "Three plaster pieces to paint, not two",
      "Crochet bunny with its own little note",
      "Rainbow spiral rakhi with pearl beads",
      "Four paint pots and a brush",
    ],
    includes: [
      "1 rainbow crochet rakhi on a printed card",
      "1 cream crochet bunny with a message card",
      "1 paint-your-own starfish and 1 shell",
      ...IN_EVERY_BOX,
    ],
    ageRange: "4–12 years",
    craftTime: "60–75 minutes",
    images: photos(
      "combos",
      "bunny-rakhi-paint-hamper",
      [
        "Bunny combo box with a cream crochet bunny holding a note, a rainbow crochet rakhi, a bhai–behen idol, a starfish and a shell to paint with four paint pots",
      ],
      "jpg",
    ),
    badges: ["Most to paint"],
    featured: false,
    seasonal: true,
    inStock: true,
    rating: { value: 4.8, count: 16 },
  },
];

/**
 * Order matters — this is the order things appear on /shop. Combos lead
 * because they are the highest-value thing on the site, then rakhis (the most
 * numerous and the festival driver), then the two evergreen categories.
 */
export const products: Product[] = [
  ...combos,
  ...rakhis,
  ...paintingKits,
  ...crochet,
];

// ───────────────────────────────  HELPERS  ─────────────────────────────────

export const allSlugs: string[] = products.map((p) => p.slug);

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: CategorySlug): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(limit = 4): Product[] {
  const featured = products.filter((p) => p.featured);
  // Never return an empty row just because nothing is flagged featured.
  return (featured.length ? featured : products).slice(0, limit);
}

/** Same category first, then anything else, so we always fill the row. */
export function getRelatedProducts(slug: string, limit = 4): Product[] {
  const current = getProduct(slug);
  if (!current) return products.slice(0, limit);

  const sameCategory = products.filter(
    (p) => p.slug !== slug && p.category === current.category,
  );
  const rest = products.filter(
    (p) => p.slug !== slug && p.category !== current.category,
  );
  return [...sameCategory, ...rest].slice(0, limit);
}

export function getPriceFrom(category: CategorySlug): number {
  const inCategory = getProductsByCategory(category);
  if (inCategory.length === 0) return 0;
  return Math.min(...inCategory.map((p) => p.price));
}

export const lowestPrice: number = Math.min(...products.map((p) => p.price));
