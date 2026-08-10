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
  {
    /* Kept separate from `rocket-paint-kit` rather than replacing its photo:
       that one is a single flat rocket, this is a shuttle with two boosters
       cast as three pieces. Different mould, different price of admission in
       minutes. If you'd rather sell only one of the two, delete this entry —
       the older one is the one with the shorter craft time. */
    slug: "space-shuttle-paint-kit",
    name: "Space Shuttle Paint Kit",
    category: "painting-kits",
    price: PRICES.paintingKits,
    tagline: "A shuttle and two booster rockets, panelled and ready",
    description:
      "A plaster space shuttle with a booster rocket either side, moulded with the panel lines and heat tiles raised so a brush catches them. Three paints — blue, red and white — which is exactly the palette the real thing uses.",
    highlights: [
      "Three pieces: the shuttle and both boosters",
      "Panel lines and tile detail raised for painting between",
      "Blue, red and white — the actual shuttle palette",
      "Sits nose-up on a shelf when it's done",
    ],
    includes: [
      "1 plaster space shuttle",
      "2 plaster booster rockets",
      ...PAINT_KIT_INCLUDES,
    ],
    ageRange: "5–12 years",
    craftTime: "35–50 minutes",
    images: photos("painting-kits", "space-shuttle-paint-kit", [
      "An unpainted plaster space shuttle with two booster rockets, blue, red and white paint pots and a brush on a printed CraftTohfa card",
    ]),
    badges: ["New"],
    seasonal: false,
    inStock: true,
  },
  {
    slug: "dino-squad-paint-kit",
    name: "Dino Squad Paint Kit",
    category: "painting-kits",
    price: PRICES.paintingKits,
    tagline: "A T-rex, a stegosaurus and a triceratops",
    description:
      "Three dinosaurs cast in plaster — a grinning T-rex, a plated stegosaurus and a horned triceratops — with six acrylic pots. Three pieces and six colours means nobody has to agree on what colour a dinosaur is.",
    highlights: [
      "Three different dinosaurs, not three of the same",
      "Plates, horns and scales moulded in relief",
      "Six acrylic colours and a brush",
      "The set that gets asked for by name",
    ],
    includes: [
      "1 plaster T-rex",
      "1 plaster stegosaurus",
      "1 plaster triceratops",
      ...PAINT_KIT_INCLUDES,
    ],
    ageRange: "4–10 years",
    craftTime: "45–60 minutes",
    images: photos("painting-kits", "dino-squad-paint-kit", [
      "Three unpainted plaster dinosaurs — a T-rex, a stegosaurus and a triceratops — with six paint pots and a brush around a printed CraftTohfa card",
    ]),
    badges: ["New"],
    seasonal: false,
    inStock: true,
  },
];

// ════════════════════════════  CROCHET KEEPSAKES  ═══════════════════════════

/**
 * The clip-on pieces — pouches, mini bags and charms — all of which are one
 * crocheted item on a keyring clip. Same shape of entry fourteen times over,
 * so the parts that actually differ live in the call and nothing else does.
 *
 * NOT used for the two originals below it: those have their own `includes`
 * (the bunny ships with a printed card) and rewriting them to fit this helper
 * would change live product pages for no reason.
 */
function charm(o: {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  /** What is physically in the packet, beyond the piece itself. */
  includes: string[];
  alt: string;
  badges?: string[];
}): Product {
  return {
    slug: o.slug,
    name: o.name,
    category: "crochet",
    price: PRICES.crochet,
    tagline: o.tagline,
    description: o.description,
    highlights: o.highlights,
    includes: o.includes,
    images: photos("crochet", o.slug, [o.alt]),
    badges: o.badges,
    seasonal: false,
    inStock: true,
  };
}

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

  // ── Mini bags and pouches ───────────────────────────────────────────────
  // Named from the photographs rather than the filenames: two of the files say
  // "pink" for bags that are plainly blue and peach, and one says "kitty" for
  // a bunny. The photo is the source of truth.

  charm({
    slug: "cream-tulip-mini-bag",
    name: "Cream Tulip Mini Bag",
    tagline: "Two rows of tulips worked straight into the bag",
    description:
      "A little cream drawstring bag with a row of yellow tulips above a row of pink ones, each flower crocheted into the fabric rather than sewn on afterwards. Closes with a pearl button and hangs off a bag on a gold clip.",
    highlights: [
      "Tulips worked into the stitch, not appliquéd on",
      "Pearl button closure",
      "Gold clip — clips to a school bag or a set of keys",
    ],
    includes: ["1 crochet mini bag with a pearl button and gold clip"],
    alt: "A cream hand-crocheted mini bag with rows of yellow and pink tulips, a pearl button and a gold clip",
    badges: ["New"],
  }),

  charm({
    slug: "blue-tulip-mini-bag",
    name: "Blue Tulip Mini Bag",
    tagline: "The tulip bag in cornflower blue",
    description:
      "The same tulip bag worked in a soft cornflower blue, with yellow tulips above pink ones and a pearl button at the top. The blue is what makes the yellow read — it is the brightest of the three tulip bags.",
    highlights: [
      "Cornflower blue with yellow and pink tulips",
      "Pearl button closure",
      "Gold clip and split ring",
    ],
    includes: ["1 crochet mini bag with a pearl button and gold clip"],
    alt: "A cornflower blue hand-crocheted mini bag with rows of yellow and pink tulips, a pearl button and a gold clip",
    badges: ["New"],
  }),

  charm({
    slug: "peach-tulip-mini-bag",
    name: "Peach Tulip Mini Bag",
    tagline: "Purple and yellow tulips on soft peach",
    description:
      "The tulip bag again in pale peach, this time with purple tulips over yellow ones. The softest colourway of the three and the one that goes with everything.",
    highlights: [
      "Peach ground with purple and yellow tulips",
      "Pearl button closure",
      "Gold clip and split ring",
    ],
    includes: ["1 crochet mini bag with a pearl button and gold clip"],
    alt: "A pale peach hand-crocheted mini bag with rows of purple and yellow tulips, a pearl button and a gold clip",
    badges: ["New"],
  }),

  charm({
    slug: "strawberry-cloud-handbag",
    name: "Strawberry Cloud Handbag",
    tagline: "A plush strawberry on cloud-soft white",
    description:
      "A tiny handbag crocheted in thick cloud-puff yarn, with a plush strawberry and a felt leaf on the front. Squashier than the cotton bags and the one small children reach for first.",
    highlights: [
      "Worked in thick puff yarn — soft rather than stiff",
      "Plush strawberry with a felt leaf",
      "Top handle, sized for a small hand",
    ],
    includes: ["1 crochet puff-yarn handbag with a plush strawberry"],
    alt: "A white cloud-puff crochet handbag with a plush red strawberry and a green felt leaf on the front",
    badges: ["New"],
  }),

  charm({
    slug: "fluffy-kitty-handbag",
    name: "Fluffy Kitty Handbag",
    tagline: "A winking cat face on a peach puff bag",
    description:
      "A peach puff-yarn handbag with a fluffy white cat face across the front — one eye winking, whiskers and a yellow nose embroidered in, and a bow over one ear. The softest thing in the range to hold.",
    highlights: [
      "Fluffy appliquéd cat face with an embroidered wink",
      "Thick peach puff yarn",
      "Top handle, sized for a small hand",
    ],
    includes: ["1 crochet puff-yarn handbag with a fluffy cat-face front"],
    alt: "A peach cloud-puff crochet handbag with a fluffy white winking cat face, embroidered whiskers and a yellow nose",
    badges: ["New"],
  }),

  charm({
    slug: "red-bunny-pouch",
    name: "Red Bunny Pouch",
    tagline: "A sleepy bunny on a red drawstring pouch",
    description:
      "A red drawstring pouch with a white bunny face crocheted onto the front, ears up and eyes closed. The green drawstring is threaded through leaf-shaped loops and finishes in a little berry.",
    highlights: [
      "Bunny face worked separately and sewn on",
      "Green drawstring threaded through crocheted leaves",
      "Gold clip and split ring",
    ],
    includes: ["1 crochet drawstring pouch with a gold clip"],
    alt: "A red hand-crocheted drawstring pouch with a white sleepy bunny face, green leaf loops and a gold clip",
    badges: ["New"],
  }),

  charm({
    slug: "carrot-pouch-keychain",
    name: "Carrot Pouch Keychain",
    tagline: "A carrot on a plate, on a yellow pouch",
    description:
      "A sunny yellow drawstring pouch with an orange carrot sitting on a white scalloped disc, and mint-green flowers on the ends of the drawstring. Big enough for coins, earphones or a folded note.",
    highlights: [
      "Carrot and scalloped disc worked separately and sewn on",
      "Mint flowers on both drawstring ends",
      "Gold clip and split ring",
    ],
    includes: ["1 crochet drawstring pouch with a gold clip"],
    alt: "A yellow hand-crocheted drawstring pouch with an orange carrot on a white scalloped disc and mint-green flower drawstrings",
    badges: ["New"],
  }),

  charm({
    slug: "blue-strawberry-pouch",
    name: "Blue Strawberry Pouch",
    tagline: "A big red strawberry on powder blue",
    description:
      "A powder-blue drawstring pouch with a large crocheted strawberry across the front, its seeds picked out in white stitches and a dark green top sewn over it. Leaf loops carry the drawstring.",
    highlights: [
      "Seeds embroidered in white over the crochet",
      "Green leaf loops around the top",
      "Gold clip and split ring",
    ],
    includes: ["1 crochet drawstring pouch with a gold clip"],
    alt: "A powder-blue hand-crocheted drawstring pouch with a large red strawberry, white seed stitches and green leaf loops",
    badges: ["New"],
  }),

  // ── Charms ──────────────────────────────────────────────────────────────

  charm({
    slug: "pink-rainbow-keychain",
    name: "Pink Rainbow Keychain",
    tagline: "Three shades of pink between two sand clouds",
    description:
      "A chunky crocheted rainbow in coral, blush and cream, resting on two sand-coloured clouds, on a gold ring. Solid enough to keep its arch rather than flopping the way a stuffed one would.",
    highlights: [
      "Three pink shades worked as concentric arches",
      "Sand clouds at both ends",
      "Gold split ring",
    ],
    includes: ["1 crochet rainbow charm on a gold ring"],
    alt: "A hand-crocheted rainbow charm in coral, blush and cream with sand-coloured clouds, on a gold ring",
    badges: ["New"],
  }),

  charm({
    slug: "blue-rainbow-keychain",
    name: "Blue Rainbow Keychain",
    tagline: "The rainbow again, in blues",
    description:
      "The same chunky rainbow worked in teal, lilac and mint with lilac clouds, on a gold clip and ring. The pair of them sell about equally, and people quite often take both.",
    highlights: [
      "Teal, lilac and mint arches",
      "Lilac clouds at both ends",
      "Gold clip and split ring",
    ],
    includes: ["1 crochet rainbow charm with a gold clip"],
    alt: "A hand-crocheted rainbow charm in teal, lilac and mint with lilac clouds, on a gold clip",
    badges: ["New"],
  }),

  charm({
    slug: "pink-piggy-keychain",
    name: "Pink Piggy Keychain",
    tagline: "A sitting piglet with a red snout",
    description:
      "A little pink pig crocheted in the round, sitting with its legs out in front, with a red snout and black bead eyes. On a gold clip, and small enough to disappear into a coat pocket.",
    highlights: [
      "Crocheted in the round — arms, legs and ears all worked separately",
      "Red snout and black bead eyes",
      "Gold clip and split ring",
    ],
    includes: ["1 crochet piglet charm with a gold clip"],
    alt: "A pink hand-crocheted sitting piglet charm with a red snout and black bead eyes, on a gold clip",
    badges: ["New"],
  }),

  charm({
    slug: "positive-moo-cow",
    name: '"Positive Moo" Cow',
    tagline: "A little cow holding a note that believes in you",
    description:
      'A round cream cow with a caramel fringe, horns and a pink snout, holding a card that reads "Positive Moo — don\'t underestimate yourself. I believe in you." The one people buy for a friend sitting an exam rather than for a festival.',
    highlights: [
      "Comes holding its own printed note",
      "Caramel fringe, horns and hooves worked separately",
      "Sits up on a desk on its own",
    ],
    includes: [
      "1 crochet cow",
      '1 "Positive Moo" message card',
    ],
    alt: 'A cream hand-crocheted cow with a caramel fringe and pink snout, holding a card reading "Positive Moo, don\'t underestimate yourself, I believe in you"',
    badges: ["New"],
  }),
];

// ═══════════════════════════════  COMBOS  ═══════════════════════════════════

/** Every combo box contains these. Listed once so it can't fall out of sync. */
const IN_EVERY_BOX = [
  "1 paint-your-own bhai–behen idol",
  "Acrylic paint pots and a brush",
  '"Happy Raksha Bandhan" card',
  "Gift box with shredded-paper filling",
];

/**
 * The multi-piece paint sets, shipped as combos at your instruction.
 *
 * They deliberately do NOT use IN_EVERY_BOX. Every photograph of these shows
 * plaster pieces, paint pots, a brush and the printed card — there is no
 * bhai–behen idol and no "Happy Raksha Bandhan" card in any of them, so
 * listing those would be describing a box we don't pack. `includes` per set
 * below states only what is actually in the shot, plus the paints and brush.
 *
 * They are also NOT seasonal: nothing in them is rakhi-linked, so they should
 * keep selling in November.
 */
const PAINT_SET_EXTRAS = [
  "Acrylic paint pots and a brush",
  "Printed CraftTohfa card",
];

/** Shared by the paint sets — the difference between them is only the pieces. */
function paintSet(o: {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  pieces: string[];
  alt: string;
  ageRange: string;
  craftTime: string;
  badges?: string[];
  featured?: boolean;
}): Product {
  return {
    slug: o.slug,
    name: o.name,
    category: "combos",
    price: PRICES.combos,
    tagline: o.tagline,
    description: o.description,
    highlights: o.highlights,
    includes: [...o.pieces, ...PAINT_SET_EXTRAS],
    ageRange: o.ageRange,
    craftTime: o.craftTime,
    images: photos("combos", o.slug, [o.alt], "jpg"),
    badges: o.badges,
    featured: o.featured,
    seasonal: false,
    inStock: true,
  };
}

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

  // ── The multi-piece paint sets ──────────────────────────────────────────
  // No ratings on any of these: they are new, so there is nothing to average.

  paintSet({
    slug: "little-vehicles-paint-combo",
    name: "Little Vehicles Paint Set",
    tagline: "Seven plaster vehicles, and an afternoon to get through them",
    description:
      "A whole fleet cast in plaster — a car, a jeep, two buses, a train engine and its carriages — waiting to be painted. The biggest set here by piece count, and the one that keeps two or three children busy at the same table.",
    highlights: [
      "Seven separate pieces, so nobody has to take turns",
      "Chunky moulds with raised windows and wheels to paint between",
      "Every piece stands up on a shelf afterwards",
      "Paints and brush supplied — nothing else to buy",
    ],
    pieces: [
      "1 plaster car and 1 plaster jeep",
      "2 plaster buses",
      "1 plaster train engine with carriages",
    ],
    alt: "Seven unpainted plaster vehicles — a car, a jeep, buses and a train engine with carriages — arranged around a printed CraftTohfa card",
    ageRange: "4–10 years",
    craftTime: "60–90 minutes",
    badges: ["Most pieces"],
    featured: true,
  }),

  paintSet({
    slug: "train-and-friends-paint-combo",
    name: "Train & Friends Paint Set",
    tagline: "A train, a bus, a panda and a slice of watermelon",
    description:
      "A deliberately mixed set — a chunky train engine, a bus, a round panda face and a watermelon slice — with seven paint pots rather than the usual three or four. The variety is the point: nothing in the box looks like anything else in it.",
    highlights: [
      "Four different moulds, not four of the same thing",
      "Seven acrylic colours — the fullest palette in the range",
      "Deep relief on the train, so the detail survives a heavy hand",
      "Finishes in one long sitting",
    ],
    pieces: [
      "1 plaster train engine",
      "1 plaster bus",
      "1 plaster panda face",
      "1 plaster watermelon slice",
    ],
    alt: "An unpainted plaster train engine, bus, panda face and watermelon slice with seven paint pots and a brush around a printed CraftTohfa card",
    ageRange: "4–10 years",
    craftTime: "50–70 minutes",
    featured: true,
  }),

  paintSet({
    slug: "flower-garden-paint-combo",
    name: "Flower Garden Paint Set",
    tagline: "A daisy, a rose, a tulip bunch and a blossom",
    description:
      "Four plaster flowers, each moulded from a different bloom — a flat-petalled daisy, a spiral rose, a bunch of tulips and a cherry blossom with its stamens picked out. The quietest set in the range, and the one that tends to get chosen by older children.",
    highlights: [
      "Four distinct flowers, each with its own petal detail",
      "The rose spiral and blossom stamens reward a fine brush",
      "White, purple, yellow and pink paints supplied",
      "Looks like something you'd keep on a windowsill",
    ],
    pieces: [
      "1 plaster daisy",
      "1 plaster rose",
      "1 plaster tulip bunch",
      "1 plaster cherry blossom",
    ],
    alt: "Four unpainted plaster flowers — a daisy, a rose, a tulip bunch and a cherry blossom — with white, purple, yellow and pink paint pots and a brush on a printed CraftTohfa card",
    ageRange: "5–12 years",
    craftTime: "45–60 minutes",
  }),

  paintSet({
    slug: "fruit-basket-paint-combo",
    name: "Fruit Basket Paint Set",
    tagline: "Strawberry, pineapple, watermelon and orange",
    description:
      "Four fruits cast in plaster, each with the texture moulded in — pips on the strawberry, segments on the orange, the crosshatch on the pineapple. Six paint pots, which is enough to get all four right rather than compromising on one.",
    highlights: [
      "Pips, segments and rind textures moulded into every piece",
      "Six acrylic colours — enough for all four fruits",
      "The one set where the colours are obvious, so younger children can work unaided",
      "Four pieces, one brush, one afternoon",
    ],
    pieces: [
      "1 plaster strawberry",
      "1 plaster pineapple",
      "1 plaster watermelon slice",
      "1 plaster orange slice",
    ],
    alt: "Four unpainted plaster fruits — a strawberry, a pineapple, a watermelon slice and an orange slice — with six paint pots and a brush around a printed CraftTohfa card",
    ageRange: "4–10 years",
    craftTime: "45–60 minutes",
    featured: true,
  }),

  paintSet({
    slug: "teddy-and-butterfly-paint-combo",
    name: "Teddy & Butterfly Paint Set",
    tagline: "One for each of them, in the same box",
    description:
      "A wide-winged butterfly and a sitting teddy bear, both cast in plaster with deep relief, and six paints between them. Two pieces of roughly equal appeal is the whole idea — it is the set that gets bought when there are two children and only one box.",
    highlights: [
      "Two pieces, so two children can paint at once",
      "Deep wing veins and a moulded teddy face to work into",
      "Six acrylic colours including brown and black for the bear",
      "Both pieces stand on their own afterwards",
    ],
    pieces: ["1 plaster butterfly", "1 plaster teddy bear"],
    alt: "An unpainted plaster butterfly and teddy bear with six paint pots and a brush around a printed CraftTohfa card",
    ageRange: "4–10 years",
    craftTime: "40–55 minutes",
    badges: ["Two to paint"],
  }),
];

// ═════════════════════════════  LIST PRICING  ═══════════════════════════════

/**
 * The struck-through price shown next to every product, and the size of the
 * "OFF" badge derived from it.
 *
 * ⚠️ READ THIS BEFORE CHANGING IT. What you actually charge does not move.
 * `price` stays exactly what it has always been; this only adds a HIGHER
 * number to strike through, so the same ₹499 box reads as reduced from ₹555.
 *
 * You asked for this and it is a completely standard way to run a festive
 * sale, so it is built. One thing worth knowing so the decision is yours with
 * the facts in hand: in India a struck-through figure that was never a real
 * selling price is the kind of claim the CCPA's 2023 dark-patterns guidelines
 * cover, and "MRP" specifically has a legal meaning under the Legal Metrology
 * (Packaged Commodities) Rules. Two things follow from that in the code:
 *
 *   • The word "MRP" is deliberately NOT used anywhere in the UI. The label
 *     is the bare struck-through number, which reads as a list price rather
 *     than as a regulated declaration.
 *   • It is kept OUT of the Product structured data (see lib/seo.ts, which
 *     emits `price` only). Feeding a never-charged "was" price to Google is
 *     what turns a display choice into a merchant-policy problem.
 *
 * If you would rather not run it at all, delete the `.map()` below and every
 * strike-through and badge on the site disappears — nothing else references
 * this.
 */
const DISCOUNT = 0.1;

/**
 * ceil, not round. `price / 0.9` is the figure that makes the saving land on
 * exactly 10%, and rounding UP guarantees the real discount is never below
 * the 10% the badge claims:
 *   ₹50 → ₹56 (10.7%)   ₹120 → ₹134 (10.4%)   ₹499 → ₹555 (10.0%)
 * Rounding to nearest would put ₹120 and ₹499 at 9%, and the badge would be
 * advertising a discount larger than the one actually given.
 */
function listPrice(price: number): number {
  return Math.ceil(price / (1 - DISCOUNT));
}

/**
 * Order matters — this is the order things appear on /shop. Combos lead
 * because they are the highest-value thing on the site, then rakhis (the most
 * numerous and the festival driver), then the two evergreen categories.
 *
 * The list price is derived here rather than typed into each product, so it
 * can never drift out of step with `price` when a price changes.
 */
export const products: Product[] = [
  ...combos,
  ...rakhis,
  ...paintingKits,
  ...crochet,
].map((p) => ({ ...p, compareAtPrice: listPrice(p.price) }));

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
