// Reads the PNG captures produced by capture-slides.js, splits any slide whose
// content is much taller than the standard viewport (so it stays legible),
// and assembles everything into a single widescreen PPTX file.
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const pptxgen = require('pptxgenjs');

const SLIDES_DIR = path.resolve(__dirname, 'slides');
const OUT_PPTX = path.resolve(__dirname, '..', '..', 'DOCA-Solution-Blueprints.pptx');

// Widescreen 16:9 layout, in inches.
const SLIDE_W = 13.333;
const SLIDE_H = 7.5;
const SLIDE_ASPECT = SLIDE_W / SLIDE_H;

// A slide taller than this multiple of the "standard" slide height gets
// sliced into several pptx slides so text doesn't shrink to unreadable size.
const SPLIT_THRESHOLD_MULT = 1.5;

async function main() {
  const manifest = JSON.parse(fs.readFileSync(path.join(SLIDES_DIR, 'manifest.json'), 'utf8'));

  // Establish the standard (most common) captured height as our baseline.
  const heights = manifest.map((m) => m.height);
  const counts = {};
  for (const h of heights) {
    const key = Math.round(h);
    counts[key] = (counts[key] || 0) + 1;
  }
  const baseline = Number(Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]);
  console.log(`Baseline standard content height: ${baseline}px`);

  const finalImages = []; // { filePath, width, height, title }

  for (const m of manifest) {
    const srcPath = path.join(SLIDES_DIR, m.fileName);
    if (m.height > baseline * SPLIT_THRESHOLD_MULT) {
      const meta = await sharp(srcPath).metadata();
      const pixelScale = meta.height / m.height; // deviceScaleFactor used during capture
      const chunkCount = Math.ceil(m.height / baseline);
      const chunkHeightCss = m.height / chunkCount;
      const chunkHeightPx = Math.round(chunkHeightCss * pixelScale);
      console.log(`Splitting "${m.id}" (${m.height}px) into ${chunkCount} parts of ~${Math.round(chunkHeightCss)}px each.`);

      for (let i = 0; i < chunkCount; i++) {
        const top = Math.min(i * chunkHeightPx, meta.height - 1);
        const height = i === chunkCount - 1 ? meta.height - top : Math.min(chunkHeightPx, meta.height - top);
        const outName = m.fileName.replace(/\.png$/, `-part${i + 1}.png`);
        const outPath = path.join(SLIDES_DIR, outName);
        await sharp(srcPath)
          .extract({ left: 0, top, width: meta.width, height })
          .toFile(outPath);
        finalImages.push({
          filePath: outPath,
          width: meta.width,
          height,
          title: `${m.title} (${i + 1}/${chunkCount})`,
        });
      }
    } else {
      const meta = await sharp(srcPath).metadata();
      finalImages.push({ filePath: srcPath, width: meta.width, height: meta.height, title: m.title });
    }
  }

  const pptx = new pptxgen();
  pptx.defineLayout({ name: 'CUSTOM_16x9', width: SLIDE_W, height: SLIDE_H });
  pptx.layout = 'CUSTOM_16x9';
  pptx.author = 'Barak Rozenfeld';
  pptx.title = 'DOCA Solution Blueprints';

  for (const img of finalImages) {
    const slide = pptx.addSlide();
    slide.background = { color: '05080F' };

    const aspect = img.width / img.height;
    let w, h;
    if (aspect >= SLIDE_ASPECT) {
      w = SLIDE_W;
      h = SLIDE_W / aspect;
    } else {
      h = SLIDE_H;
      w = SLIDE_H * aspect;
    }
    const x = (SLIDE_W - w) / 2;
    const y = (SLIDE_H - h) / 2;

    slide.addImage({ path: img.filePath, x, y, w, h });
    console.log(`Added slide: ${img.title}`);
  }

  await pptx.writeFile({ fileName: OUT_PPTX });
  console.log(`\nSaved ${finalImages.length} slides to ${OUT_PPTX}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
