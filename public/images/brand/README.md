# Your logo

Two files live here, and both are in use:

| File | Where it appears | Shape |
|---|---|---|
| `logo.png` | Header and footer | Wordmark only, 1000×264 (~3.8:1) |
| `logo-lockup.png` | Preloader splash | Gift box + wordmark, 900×469 (~1.9:1) |

## Why two

A header has a height budget, not a width budget — the header plus the
announcement bar has to stay under ~88px on a 390px phone so the hero headline
is visible without scrolling.

At a 48px header the wide wordmark renders about 182px across and stays
perfectly legible. The lockup at that same 48px would be only ~92px wide, with
the words crammed into the bottom half of it and effectively unreadable. So the
lockup is used only where there is vertical room to spend, which is the
preloader — and there it gets to be the full brand moment, gift box and all.

`Wordmark.tsx` picks between them by size: `sm`/`md` get the wordmark, `lg`
gets the lockup. If only `logo.png` exists, `lg` falls back to it rather than
showing nothing.

## Where these came from

They were lifted from the printed Craftohfa card photographed in
`public/images/products/painting-kits/rocket-paint-kit-1.jpeg` — cropped,
background keyed out to transparency, and sharpened.

**They are therefore only as good as a JPEG photograph of a printed card.**
They are clean and they hold up at the sizes used, but they are not vector and
they will not survive being scaled much larger.

**If you have the original from your designer — `.ai`, `.svg`, `.eps`, or a PNG
exported with a transparent background — replace both files with it.** That is
strictly better. Keep the same two filenames and the same rough proportions and
nothing in the code needs to change.

## Replacing them

| | |
|---|---|
| **Filenames** | `logo.png` and `logo-lockup.png` (`.svg` and `.webp` also work) |
| **Background** | Must be transparent. The header is cream, the footer is shell — a white or off-white box behind the mark shows as a pale rectangle on at least one of them |
| **Size** | ~1000px on the long edge is plenty |

If you change the proportions significantly, update the `width`/`height` in the
`ART` map in `src/components/layout/Wordmark.tsx` to match. Those numbers only
exist to reserve the right space before the image loads, so getting them wrong
causes layout shift rather than a wrong-looking logo.
