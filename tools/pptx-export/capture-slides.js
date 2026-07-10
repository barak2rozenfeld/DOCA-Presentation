// Captures every .slide element of ../../index.html as a high-res PNG using Playwright.
// Handles slides whose content is taller than the viewport (overflow-y:auto) by
// temporarily growing the viewport so the full slide is captured, not just the visible part.
const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');

const ROOT = path.resolve(__dirname, '..', '..');
const OUT_DIR = path.resolve(__dirname, 'slides');
const VIEWPORT = { width: 1920, height: 1080 };
const SCALE = 1.5; // device scale factor for crisper export images

// Extra settle time (ms) per slide id, on top of the base wait, to let
// JS-driven reveal/chart animations finish before the screenshot is taken.
const EXTRA_WAIT = {
  s0: 400,
  s1: 4600, // multi-phase story animation (delays up to 3700ms)
  s_market: 1400,
  s_customers: 1400,
  s_blueprint: 1200,
  s_roi: 800,
};
const BASE_WAIT = 700;

(async () => {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  // Clean previous run's images.
  for (const f of fs.readdirSync(OUT_DIR)) fs.unlinkSync(path.join(OUT_DIR, f));

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: VIEWPORT,
    deviceScaleFactor: SCALE,
  });

  const fileUrl = 'file:///' + path.join(ROOT, 'index.html').replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'load' });
  await page.waitForTimeout(500);

  const slideMeta = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.slide')).map((s, i) => ({
      index: i,
      id: s.id,
      title: s.dataset.title || s.id,
    }));
  });

  console.log(`Found ${slideMeta.length} slides.`);

  const manifest = [];

  for (const meta of slideMeta) {
    await page.evaluate((i) => window.goTo(i), meta.index);
    await page.waitForTimeout(BASE_WAIT + (EXTRA_WAIT[meta.id] || 0));

    // If the active slide's content is taller than the viewport (it scrolls),
    // temporarily resize the viewport so the whole slide renders without clipping.
    const { scrollHeight, clientHeight, navAndBarHeight } = await page.evaluate(() => {
      const s = document.querySelector('.slide.active');
      const navbar = document.getElementById('navbar');
      const prog = document.getElementById('prog');
      return {
        scrollHeight: s.scrollHeight,
        clientHeight: s.clientHeight,
        navAndBarHeight: (navbar ? navbar.offsetHeight : 0) + (prog ? prog.offsetHeight : 0),
      };
    });

    let resized = false;
    if (scrollHeight > clientHeight + 4) {
      const neededHeight = scrollHeight + navAndBarHeight + 4;
      await page.setViewportSize({ width: VIEWPORT.width, height: neededHeight });
      resized = true;
      // Re-apply active slide state after viewport change triggers relayout.
      await page.waitForTimeout(150);
    }

    const el = await page.$('.slide.active');
    const fileName = `${String(meta.index).padStart(2, '0')}-${meta.id}.png`;
    const filePath = path.join(OUT_DIR, fileName);
    await el.screenshot({ path: filePath });

    const dims = await page.evaluate(() => {
      const s = document.querySelector('.slide.active');
      const r = s.getBoundingClientRect();
      return { width: r.width, height: r.height };
    });

    manifest.push({ ...meta, fileName, width: dims.width, height: dims.height });
    console.log(`Captured [${meta.index}] ${meta.id} -> ${fileName} (${Math.round(dims.width)}x${Math.round(dims.height)}${resized ? ', resized' : ''})`);

    if (resized) {
      await page.setViewportSize(VIEWPORT);
      await page.waitForTimeout(100);
    }
  }

  fs.writeFileSync(path.join(OUT_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2));

  await browser.close();
  console.log('Done capturing slides.');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
