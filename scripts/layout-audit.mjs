import { chromium } from "playwright";

const WIDTHS = [320, 360, 390, 430, 768, 1024, 1280];
const PAGES = [
  "/",
  "/shop",
  "/product/hello-kitty-rakhi-paint-hamper",
  "/about",
  "/faq",
  "/contact",
  "/policies",
];

const browser = await chromium.launch();
let problems = 0;

for (const width of WIDTHS) {
  const ctx = await browser.newContext({
    viewport: { width, height: 900 },
    deviceScaleFactor: 1,
    isMobile: width < 768,
    hasTouch: width < 768,
  });
  const page = await ctx.newPage();

  for (const path of PAGES) {
    await page.goto("http://localhost:3000" + path, {
      waitUntil: "networkidle",
    });

    const report = await page.evaluate(() => {
      const de = document.documentElement;
      const out = {
        scrollWidth: de.scrollWidth,
        clientWidth: de.clientWidth,
        overflowers: [],
        clipped: [],
        tinyTargets: [],
      };

      const vw = de.clientWidth;

      const isSrOnly = (el) => {
        let p = el;
        while (p && p !== document.body) {
          const c = getComputedStyle(p);
          if (
            (c.clipPath && c.clipPath !== "none") ||
            c.clip === "rect(0px, 0px, 0px, 0px)" ||
            (p.getBoundingClientRect().width <= 1 &&
              p.getBoundingClientRect().height <= 1)
          )
            return true;
          p = p.parentElement;
        }
        return false;
      };

      for (const el of document.querySelectorAll("body *")) {
        const cs = getComputedStyle(el);
        if (cs.display === "none" || cs.visibility === "hidden") continue;
        const r = el.getBoundingClientRect();
        if (r.width === 0 && r.height === 0) continue;
        if (isSrOnly(el)) continue;
        // Decorative SVG/spans are allowed to bleed; they're aria-hidden and
        // clipped by their section.
        if (el.closest("[aria-hidden='true']")) continue;

        // Elements sticking out past the viewport horizontally
        if (r.right > vw + 1 || r.left < -1) {
          // ignore things that are deliberately clipped by an ancestor
          let clippedByAncestor = false;
          let p = el.parentElement;
          while (p) {
            const pcs = getComputedStyle(p);
            if (
              /hidden|clip|auto|scroll/.test(pcs.overflowX) ||
              /hidden|clip|auto|scroll/.test(pcs.overflow)
            ) {
              clippedByAncestor = true;
              break;
            }
            p = p.parentElement;
          }
          if (!clippedByAncestor) {
            out.overflowers.push({
              tag: el.tagName.toLowerCase(),
              cls: (el.className?.toString?.() || "").slice(0, 70),
              left: Math.round(r.left),
              right: Math.round(r.right),
              text: (el.textContent || "").trim().slice(0, 35),
            });
          }
        }

        // Text overflowing its own box (the reported button bug)
        if (el.children.length === 0 && (el.textContent || "").trim()) {
          if (
            el.scrollWidth > el.clientWidth + 1 &&
            cs.overflow !== "visible" &&
            !/auto|scroll/.test(cs.overflowX)
          ) {
            out.clipped.push({
              tag: el.tagName.toLowerCase(),
              text: (el.textContent || "").trim().slice(0, 35),
              scrollW: el.scrollWidth,
              clientW: el.clientWidth,
            });
          }
        }

        // Tap targets under 44px.
        //
        // A link with a STRETCHED pseudo-element (`after:absolute
        // after:inset-0`) has its whole positioned ancestor as the hit area,
        // not its own text box — that is the pattern ProductCard uses to make
        // an entire card clickable without nesting anchors. Measuring the
        // anchor itself reports every short product title as a 20px target
        // and buries the real findings, so measure what a finger actually
        // hits instead.
        if (
          ["A", "BUTTON"].includes(el.tagName) &&
          r.height > 0 &&
          !el.closest("footer") && !el.closest("nav[aria-label='Breadcrumb']")
        ) {
          const after = getComputedStyle(el, "::after");
          const stretched =
            after.content !== "none" &&
            after.position === "absolute" &&
            ["0px", "auto"].includes(after.top) &&
            after.top === after.bottom &&
            after.left === after.right;

          const hit =
            stretched && el.offsetParent
              ? el.offsetParent.getBoundingClientRect()
              : r;

          if (hit.height < 40) {
            out.tinyTargets.push({
              text: (el.textContent || "").trim().slice(0, 28),
              h: Math.round(hit.height),
            });
          }
        }
      }
      return out;
    });

    const hScroll = report.scrollWidth > report.clientWidth;
    const issues = [];
    if (hScroll)
      issues.push(
        `H-SCROLL ${report.scrollWidth}>${report.clientWidth} (+${report.scrollWidth - report.clientWidth}px)`,
      );
    if (report.overflowers.length)
      issues.push(`${report.overflowers.length} overflowing`);
    if (report.clipped.length) issues.push(`${report.clipped.length} clipped-text`);
    if (report.tinyTargets.length)
      issues.push(`${report.tinyTargets.length} small-tap`);

    if (issues.length) {
      problems++;
      console.log(`\n❌ ${width}px  ${path}`);
      console.log("   " + issues.join(" | "));
      report.overflowers.slice(0, 4).forEach((o) =>
        console.log(
          `   ↔ <${o.tag}> ${o.left}..${o.right}  "${o.text}"  [${o.cls}]`,
        ),
      );
      report.clipped.slice(0, 6).forEach((c) =>
        console.log(`   ✂ <${c.tag}> "${c.text}" ${c.scrollW}px in ${c.clientW}px`),
      );
      report.tinyTargets.slice(0, 4).forEach((t) =>
        console.log(`   ⌖ "${t.text}" only ${t.h}px tall`),
      );
    } else {
      console.log(`✅ ${width}px  ${path}`);
    }
  }
  await ctx.close();
}

await browser.close();
console.log(problems === 0 ? "\n🎉 no layout problems found" : `\n${problems} page/width combos with problems`);
