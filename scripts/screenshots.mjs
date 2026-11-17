// Genera capturas reales de las demos publicadas → src/assets/projects/*.png
import { chromium } from 'playwright-core';
import { chromePath } from './chrome.mjs';

const targets = [
  { name: 'portfolio-chef', url: 'https://am-solucionesweb.github.io/portfoliocv/' },
  { name: 'am-soluciones-web', url: 'https://am-soluciones-web.netlify.app/', enter: 'text=INGRESAR' },
  { name: 'rincon-gourmet', url: 'https://demo-pagina-web.netlify.app/' },
];

const browser = await chromium.launch({ executablePath: chromePath });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
for (const t of targets) {
  await page.goto(t.url, { waitUntil: 'networkidle' });
  if (t.enter) {
    await page.click(t.enter).catch(() => {});
    await page.waitForTimeout(2500);
  }
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `src/assets/projects/${t.name}.png` });
  console.log('✓', t.name);
}
await browser.close();
