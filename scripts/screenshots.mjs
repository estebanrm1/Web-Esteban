// Genera capturas reales de los sitios publicados → src/assets/projects/*.png
import { chromium } from 'playwright-core';
import { chromePath } from './chrome.mjs';

const targets = [
  { name: 'enlace-ar', url: 'https://enlace-ar.netlify.app/' },
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
