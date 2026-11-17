// Genera el CV en PDF, la imagen social (og.png) y la captura del propio portfolio a partir del build.
// Flujo: npm run build && npm run assets:cv && npm run build
import { mkdirSync, readFileSync } from 'node:fs';
import { chromium } from 'playwright-core';
import { chromePath } from './chrome.mjs';
import { startPreview } from './preview.mjs';

const PORT = 4330;
const stopPreview = await startPreview(PORT);

const browser = await chromium.launch({ executablePath: chromePath });
try {
  // ---- CV en PDF ----
  mkdirSync('public/cv', { recursive: true });
  const page = await browser.newPage();
  await page.goto(`http://localhost:${PORT}/cv`, { waitUntil: 'networkidle' });
  await page.evaluate(() => (document.documentElement.dataset.theme = 'light'));
  await page.pdf({ path: 'public/cv/esteban-molina-cv.pdf', format: 'A4', printBackground: true, preferCSSPageSize: true });
  console.log('✓ public/cv/esteban-molina-cv.pdf');

  // ---- Captura del propio portfolio (tarjeta "Este portfolio") ----
  const self = await browser.newPage({ viewport: { width: 1440, height: 900 }, colorScheme: 'light' });
  await self.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' });
  await self.evaluate(() => document.querySelectorAll('[data-reveal]').forEach((e) => e.classList.add('is-visible')));
  // Esperar a que terminen los contadores animados (duran 1,1 s): la captura no debe mostrar cifras intermedias.
  await self.waitForTimeout(3000);
  await self.screenshot({ path: 'src/assets/projects/este-portfolio.png' });
  console.log('✓ src/assets/projects/este-portfolio.png');

  // ---- Imagen social (Open Graph) ----
  const font = (p) => 'data:font/woff2;base64,' + readFileSync(p).toString('base64');
  const photo = 'data:image/jpeg;base64,' + readFileSync('public/esteban-molina.jpg').toString('base64');
  const og = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await og.setContent(`<!doctype html><html><head><style>
    @font-face{font-family:B;src:url(${font('node_modules/@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2')})}
    @font-face{font-family:I;src:url(${font('node_modules/@fontsource-variable/inter-tight/files/inter-tight-latin-wght-normal.woff2')})}
    *{margin:0;box-sizing:border-box}
    body{width:1200px;height:630px;background:#f5f1ea;color:#17131c;font-family:I;display:grid;grid-template-columns:1fr 360px;gap:56px;padding:72px 80px;align-items:center;
      background-image:linear-gradient(to right,#e3dccf 1px,transparent 1px),linear-gradient(to bottom,#e3dccf 1px,transparent 1px);background-size:64px 64px}
    .k{font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:#6a2a85;font-size:20px;display:flex;gap:14px;align-items:center}
    .k:before{content:'';width:36px;height:2px;background:currentColor}
    h1{font-family:B;font-size:92px;line-height:.95;letter-spacing:-.04em;margin-top:26px;font-weight:700}
    h2{font-family:B;font-size:34px;color:#6a2a85;font-weight:600;margin-top:18px;letter-spacing:-.02em}
    p{font-size:24px;color:#4a4352;margin-top:26px;line-height:1.4}
    img{width:360px;height:450px;object-fit:cover;object-position:50% 20%;border-radius:28px;box-shadow:24px 24px 0 -1px #f5f1ea,24px 24px 0 0 #6a2a85}
  </style></head><body><div><div class="k">Portfolio</div><h1>Esteban<br>Molina</h1><h2>eCommerce Analyst &amp; VTEX Developer</h2>
  <p>VTEX IO · Integraciones API · Automatización con IA</p></div><img src="${photo}"></body></html>`);
  await og.evaluate(() => document.fonts.ready);
  await og.screenshot({ path: 'public/og.png' });
  console.log('✓ public/og.png');
} finally {
  await browser.close();
  stopPreview();
}
