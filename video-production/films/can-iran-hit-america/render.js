// usage: node render.js <outDir> <fps> <fromFrame> <toFrame>   OR   node render.js stills <t1,t2,...>
const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const [, , mode, a, b, c] = process.argv;
  const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  page.on('console', m => { if (m.type() === 'error') console.error('PAGE:', m.text()); });
  page.on('pageerror', e => console.error('PAGEERR:', e.message));
  await page.goto('http://127.0.0.1:8765/' + (process.env.PAGE || 'index.html'));
  await page.waitForFunction(() => window.READY === true, null, { timeout: 120000 });
  if (mode === 'stills') {
    fs.mkdirSync('stills', { recursive: true });
    for (const t of a.split(',').map(Number)) {
      await page.evaluate(t => (window.renderTrailer ? window.renderTrailer(t) : window.renderAt(t)), t);
      await page.screenshot({ path: `stills/${process.env.TAG||''}t${String(t).padStart(6, '0')}.jpg`, type: 'jpeg', quality: 85 });
    }
  } else {
    const out = mode, fps = +a, from = +b, to = +c;
    fs.mkdirSync(out, { recursive: true });
    const t0 = Date.now();
    for (let f = from; f < to; f++) {
      await page.evaluate(t => (window.renderTrailer ? window.renderTrailer(t) : window.renderAt(t)), f / fps);
      await page.screenshot({ path: `${out}/f${String(f).padStart(5, '0')}.jpg`, type: 'jpeg', quality: 92 });
      if (f % 200 === 0) console.log(`frame ${f} ${((Date.now() - t0) / 1000).toFixed(0)}s`);
    }
  }
  await browser.close();
})();
