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

Most of the content is real now. What is left is listed here, and the items
still marked ⬜ are the ones that would actually mislead a customer.

### 1. Your WhatsApp number — ✅ done

`src/site.config.ts` is set to `919217208097` / `+91 92172 08097`. If you ever
change it: digits only, no `+`, no spaces, no dashes — India is `91` followed
by your 10-digit number, **12 digits in total**. Get that wrong and it fails
silently: the link still opens WhatsApp perfectly and simply never reaches you.

### 2. Check the products — `src/data/products.ts` — mostly done

26 products across four categories, written from your own photographs. Prices
are real: ₹50 rakhis, ₹120 painting kits and crochet, ₹499 combo boxes, all set
from the `PRICES` block at the top of the file.

Still needs your eye:

- ⬜ **Every `rating`** — invented. Delete the whole `rating` field from any
  product you don't have real reviews for. Only the five combos have one.
- ⬜ **Descriptions** were written from the photos, so they describe colour and
  construction accurately but can't know what you know. Worth a skim.
- ⬜ **Three rakhis are named descriptively** — Kitty Face, Spider Web,
  Superhero Shield — rather than by the characters they resemble. Selling
  merchandise under those trademarks is a real risk for a small shop. Change
  them if you disagree, but that is why they read the way they do.

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

Instagram is set to `instagram.com/craftohfa`. Still to check: the Facebook
link, the email address, shipping rates, and your domain (`url` — currently
`https://crafttohfa.com`, which needs to match wherever you actually deploy or
the sitemap and share cards will point at the wrong place). Check the shipping
and returns wording on `/policies` matches what you actually do.

### 6. Photos

- `public/images/products/` — ✅ all 27 product photos are in, sorted by
  category into `combos/`, `rakhis/`, `painting-kits/` and `crochet/`
- `public/images/brand/` — ✅ logo and lockup are in, though they were lifted
  from a photo of your printed card; see that folder's README
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

### Vercel — the whole process

1. Go to [vercel.com/new](https://vercel.com/new) and sign in **with GitHub**.
2. Find `crafttohfa` in the list and press **Import**. If it isn't listed,
   press *Adjust GitHub App Permissions* and grant access to the repo — it is
   private, so Vercel has to be told it may see it.
3. Change nothing. Vercel detects Next.js and the defaults are correct.
4. Press **Deploy**. It takes about two minutes.

You get a `something.vercel.app` URL immediately. Every push to `main` after
that redeploys on its own.

### One setting to change afterwards

In Vercel → Settings → Environment Variables, add:

```
NEXT_PUBLIC_SITE_URL = https://your-real-domain.com
```

Without it the site falls back to `https://crafttohfa.com` (from
`src/site.config.ts`), which is what the sitemap, the canonical tags and the
WhatsApp/OpenGraph share previews will all advertise. If that isn't where the
site actually lives, those all point at nothing. Redeploy once after adding it.

### A custom domain

Vercel → Settings → Domains → add it, then point your registrar at the records
it shows you. Free, HTTPS included. Update `NEXT_PUBLIC_SITE_URL` to match.

### Why not GitHub Pages

Pages can only serve static files, so it cannot run Next's image optimiser.
This site has 27 product photos; without optimisation they ship at full size
rather than as resized WebP, which is the difference between a fast shop and a
slow one on an Indian mobile connection. Pages on a free account also requires
the repository to be public. Vercel is free here, keeps the optimiser, and
keeps the code private.
