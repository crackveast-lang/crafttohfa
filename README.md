# CraftTohfa

Handmade DIY painting kits, crochet rakhis and rakhi gift hampers.

Built with Next.js 16 (App Router) + TypeScript + Tailwind CSS v4. Every page is
statically generated. **There is no cart and no checkout** — every buy button
opens WhatsApp with the product and price already written into the message.

---

## Running it

```powershell
npm install
npm run dev      # http://localhost:3000
```

To view it on your phone (worth doing — most of your visitors will be on one):

```powershell
npm run dev -- -H 0.0.0.0
```

then open `http://<your-computer's-IP>:3000` on a phone on the same Wi-Fi.
Windows will ask to allow the port through the firewall the first time.

Other commands:

```powershell
npm run build    # production build — run this before deploying
npm run start    # preview the production build
npm run lint
npx tsc --noEmit # type check
```

---

## ⚠️ Before you go live — a checklist

Everything here is placeholder content written so the site looks real today.
Work through these:

### 1. Your WhatsApp number — one line

`src/site.config.ts`:

```ts
whatsapp: {
  number: "919999999999",       // ← country code + number, digits only
  display: "+91 99999 99999",   // ← how it's shown to people
```

Digits only. No `+`, no spaces, no dashes. India is `91` followed by your
10-digit number. This one value feeds every order button on the site.

### 2. Check the products — `src/data/products.ts`

The five hampers are real, written from your photographs. Still needs your eye:

- **Every price** — currently ₹749–₹849, invented.
- **Every `rating`** — invented. Delete the whole `rating` field from any
  product you don't have real reviews for.
- **The paint-pot counts** in each `includes` list, counted off the photos.

### 3. Real reviews — `src/data/testimonials.ts`

All six are placeholders. Replace them with genuine customer messages and set
`isPlaceholder: false` on each.

> Until every review is marked real, the site deliberately sends **no** review
> ratings to Google. Publishing fabricated review markup risks a Google penalty
> and breaches India's CCPA 2019 rules on misleading endorsements. This is
> enforced in `src/lib/seo.ts` — please leave that check alone.

### 4. Your real numbers — `src/site.config.ts`

```ts
trust: {
  familiesServed: "500+",   // ← invented
  citiesShipped: "60+",     // ← invented
  avgRating: 4.9,           // ← invented
}
```

Same reasoning as above: use figures you could back up. Set any of them to
`null` and it disappears from the site cleanly.

### 5. Everything else in `src/site.config.ts`

Instagram and Facebook links, email address, shipping rates, and your domain
(`url`). Check the shipping and returns wording on `/policies` matches what you
actually do.

### 6. Photos

- `public/images/products/` — ✅ **all five hamper photos are in**
- `public/images/about/` — ⬜ founder + 3 workshop photos still needed
- `public/images/social/` — ⬜ 6 Instagram tiles still needed

See the README inside each folder for exact filenames. Until a photo exists,
that spot shows a designed placeholder tile, so the site looks finished either
way and you can add them gradually.

---

## Checking the layout

```powershell
npm run build; npm run start     # in one terminal
npm run audit:layout             # in another
```

Loads every page at 320/360/390/430/768/1024/1280px and reports horizontal
scroll, elements overflowing the viewport, text clipped inside its own box, and
tap targets under 40px. Worth running after any layout change — it catches the
kind of mobile bug that's invisible on a desktop screen.

---

## Where things live

```
src/
├── site.config.ts          ★ WhatsApp number, festival dates, shipping, socials
├── data/
│   ├── products.ts         ★ the catalogue
│   ├── categories.ts
│   ├── testimonials.ts     ★ reviews
│   └── faqs.ts             ★ questions and answers
├── lib/
│   ├── whatsapp.ts         ★ builds every wa.me link — the only purchase path
│   ├── festival.ts         countdown + auto-hiding urgency copy
│   ├── images.ts           decides photo vs placeholder
│   ├── format.ts           ₹ formatting, Indian date formatting
│   └── seo.ts              metadata and structured data
├── app/
│   ├── globals.css         ★ the entire design system (colours, type, shadows)
│   ├── page.tsx            homepage
│   ├── shop/               catalogue + filters
│   ├── product/[slug]/     product pages (one per product, generated)
│   ├── about/  faq/  contact/  policies/
│   ├── icon.tsx  opengraph-image.tsx   generated logo + share card
│   └── sitemap.ts  robots.ts
└── components/
    ├── layout/   header, footer, nav, containers
    ├── ui/       buttons, cards, tape, badges, accordions
    ├── media/    image handling + placeholder art
    ├── product/  cards, gallery, buy box
    ├── home/     the homepage sections
    └── doodles/  all the hand-drawn SVG marks
```

## The festival countdown

Driven entirely by `festivals[]` in `src/site.config.ts`. The countdown band,
the banner at the top and all the urgency wording **hide themselves
automatically** once the date passes — there's nothing to remember to take
down. For next year, change the two dates and you're done.

---

## Notes for whoever works on this next

- **Tailwind v4, no config file.** The design system lives in an `@theme` block
  in `src/app/globals.css`. A `tailwind.config.js` pasted from a v3 tutorial
  will silently do nothing.
- **Six colours only.** New shades come from opacity (`bg-terracotta/10`), never
  new hex values. The accent is `terracotta` (`#B85230`), sampled from the coral
  ink on the printed CrafTohfa card and darkened until white button text clears
  WCAG AA.
- **Contrast rules are documented at the top of `globals.css`**, with measured
  ratios. In short: plain `terracotta` is a fill/icon/large-display colour — it
  clears AA on cream but fails on shell and peach, so small text uses
  `terracotta-deep`. Rose is never a text colour at any size.
- **Only seven client components** (mobile nav, countdown clock, shop filter,
  gallery, sticky buy bar, the hero image tiles, and `MotionController`).
  Everything else is a Server Component, and the whole buy flow — plus every
  scroll animation's end state — works with JavaScript disabled.
- **`WhatsAppButton` is the only component allowed to build a `wa.me` URL**, and
  **`CraftImage` is the only one allowed to render `next/image`.**
- **No analytics are wired up.** Because there's no cart, you have no view of
  which products drive chats. Every WhatsApp link carries `data-wa-kind` and
  `data-wa-slug` — one delegated click listener is all GA4 or the Meta Pixel
  needs.
- **Rotated decorations cause horizontal scroll on mobile** if a section forgets
  `overflow-hidden`. `Section` does it by default; keep it that way.

## Deploying

Works as-is on Vercel or Netlify — connect the repo and accept the defaults.
Set `NEXT_PUBLIC_SITE_URL` to your real domain so links inside WhatsApp
messages and share previews point to the right place.
