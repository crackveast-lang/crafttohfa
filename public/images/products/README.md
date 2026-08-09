# Product photos go in this folder

**You do not need to touch any code to add photos.** Drop the file in here with
the right name, and it replaces the placeholder automatically.

## Naming

Use the product's slug, then `-1`, `-2`, `-3`:

```
sunset-mandala-painting-kit-1.jpg   ← main photo. Also used on cards + WhatsApp previews
sunset-mandala-painting-kit-2.jpg   ← optional
sunset-mandala-painting-kit-3.jpg   ← optional
```

The slug is the part of the web address after `/product/`. You can also find
every slug listed in `src/data/products.ts`.

### All the slugs, ready to copy

```
hello-kitty-rakhi-paint-hamper          ✅ -1 added
butterfly-rainbow-rakhi-paint-hamper    ✅ -1 added
little-car-rakhi-paint-hamper           ✅ -1 added
strawberry-bag-rakhi-paint-hamper       ✅ -1 added
bunny-rakhi-paint-hamper                ✅ -1 added
```

All five main photos are in. To add a **second or third angle** for any of
them — a close-up of the rakhi, or the box closed — drop in e.g.
`bunny-rakhi-paint-hamper-2.jpg` and a thumbnail strip appears automatically
on that product page.

## Photo specs

| | |
|---|---|
| **Shape** | Square, 1:1 — matching the photos you already sent |
| **Size** | 1200 × 1200 px is ideal |
| **Format** | `.jpg` works best. `.png`, `.webp` and `.avif` also work — you don't have to convert anything |
| **File size** | Under 300 KB each. Larger is fine, it just slows the site down |

The site crops to 4:5, so keep the product roughly centred and leave a little
space around the edges.

## Then what?

- While previewing (`npm run dev`) — just refresh the page.
- For the live site — run `npm run build` and deploy again.

Any product without a photo keeps showing its designed placeholder tile, so the
site never looks broken while you work through them one at a time.
