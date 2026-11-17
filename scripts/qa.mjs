// QA end-to-end sobre el build de producción (requiere `npm run build`).
// Uso: npm run qa  → capturas en qa-output/, informe en consola, exit 1 si hay fallas.
import { mkdirSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { chromium } from 'playwright-core';
import { chromePath } from './chrome.mjs';
import { startPreview } from './preview.mjs';

const require = createRequire(import.meta.url);
const axeSource = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const PORT = 4329;
const BASE = `http://localhost:${PORT}`;
const OUT = 'qa-output';
mkdirSync(OUT, { recursive: true });

const failures = [];
const fail = (msg) => {
  failures.push(msg);
  console.log('  ✗', msg);
};
const ok = (msg) => console.log('  ✓', msg);

const stopPreview = await startPreview(PORT);

const browser = await chromium.launch({ executablePath: chromePath });

// `astro preview` no aplica las cabeceras de netlify.toml: inyectamos la misma CSP en los
// documentos para detectar localmente lo que el navegador bloquearía en producción.
const CSP = readFileSync('netlify.toml', 'utf8').match(/Content-Security-Policy = "([^"]+)"/)?.[1];
const newContext = async (opts) => {
  const ctx = await browser.newContext(opts);
  if (CSP) {
    await ctx.route(`${BASE}/**`, async (route) => {
      if (route.request().resourceType() !== 'document') return route.continue();
      const res = await route.fetch();
      await route.fulfill({ response: res, headers: { ...res.headers(), 'content-security-policy': CSP } });
    });
  }
  return ctx;
};
if (CSP) ok('CSP de netlify.toml aplicada a las pruebas');
else fail('no se encontró la CSP en netlify.toml');

async function audit(page, label) {
  await page.addScriptTag({ content: axeSource });
  const res = await page.evaluate(() =>
    // @ts-ignore
    axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa', 'best-practice'] }),
  );
  if (res.violations.length === 0) ok(`axe ${label}: 0 violaciones`);
  for (const v of res.violations) fail(`axe ${label}: ${v.id} (${v.impact}) — ${v.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(' | ')}`);
}

try {
  for (const scheme of ['light', 'dark']) {
    for (const vp of [
      { name: 'desktop', width: 1440, height: 900 },
      { name: 'mobile', width: 390, height: 844 },
    ]) {
      const label = `${vp.name}-${scheme}`;
      console.log(`\n▶ ${label}`);
      const ctx = await newContext({ viewport: vp, colorScheme: scheme, deviceScaleFactor: 1 });
      const page = await ctx.newPage();
      const errors = [];
      page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
      page.on('pageerror', (e) => errors.push(e.message));
      await page.goto(BASE + '/', { waitUntil: 'networkidle' });

      const theme = await page.evaluate(() => document.documentElement.dataset.theme);
      theme === scheme ? ok(`tema inicial = ${scheme}`) : fail(`tema inicial ${theme} ≠ ${scheme}`);

      // Desbordamiento horizontal
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      overflow <= 0 ? ok('sin scroll horizontal') : fail(`scroll horizontal de ${overflow}px`);

      // Recorrer la página (dispara lazy-loading como un usuario real) y verificar imágenes
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 500) {
          window.scrollTo({ top: y, behavior: 'instant' });
          await new Promise((r) => setTimeout(r, 60));
        }
        window.scrollTo({ top: 0, behavior: 'instant' });
      });
      await page.waitForLoadState('networkidle');
      const broken = await page.evaluate(() =>
        [...document.images].filter((i) => !i.closest('dialog') && (!i.complete || i.naturalWidth === 0)).map((i) => i.currentSrc || i.src),
      );
      broken.length ? fail(`imágenes sin cargar: ${broken.join(', ')}`) : ok('todas las imágenes cargan');
      await page.evaluate(() => document.querySelectorAll('[data-reveal]').forEach((e) => e.classList.add('is-visible')));
      await page.waitForTimeout(900);
      await page.screenshot({ path: `${OUT}/${label}-fold.png` });
      await page.screenshot({ path: `${OUT}/${label}-full.png`, fullPage: true });
      await audit(page, label);

      // Objetivos táctiles en mobile
      if (vp.name === 'mobile') {
        const small = await page.evaluate(() =>
          [...document.querySelectorAll('a, button, input, textarea')]
            .filter((el) => {
              const r = el.getBoundingClientRect();
              const cs = getComputedStyle(el);
              return r.width > 0 && cs.visibility !== 'hidden' && !el.closest('.hp, .skip-link') && (r.height < 24 || r.width < 24);
            })
            .map((el) => el.textContent.trim().slice(0, 30) || el.getAttribute('aria-label')),
        );
        small.length ? fail(`objetivos táctiles < 24px: ${small.join(', ')}`) : ok('objetivos táctiles ≥ 24px');

        // Menú móvil: teclado + Escape
        const toggle = page.locator('[data-menu-toggle]');
        await toggle.focus();
        await page.keyboard.press('Enter');
        (await toggle.getAttribute('aria-expanded')) === 'true' ? ok('menú abre con teclado') : fail('menú no abre');
        await page.screenshot({ path: `${OUT}/${label}-menu.png` });
        await page.keyboard.press('Escape');
        (await toggle.getAttribute('aria-expanded')) === 'false' ? ok('menú cierra con Escape') : fail('menú no cierra');
      }

      errors.length ? fail(`errores de consola: ${errors.join(' | ')}`) : ok('sin errores de consola');
      await ctx.close();
    }
  }

  // ---- Interacciones ----
  console.log('\n▶ interacciones');
  const ctx = await newContext({ viewport: { width: 1280, height: 860 } });
  const page = await ctx.newPage();
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });

  // Toggle de tema persiste
  const before = await page.evaluate(() => document.documentElement.dataset.theme);
  await page.click('[data-theme-toggle]');
  await page.reload({ waitUntil: 'networkidle' });
  const after = await page.evaluate(() => document.documentElement.dataset.theme);
  before !== after ? ok(`tema alterna y persiste (${before} → ${after})`) : fail('tema no persiste');

  // Skip link
  await page.keyboard.press('Tab');
  const firstFocus = await page.evaluate(() => document.activeElement?.textContent?.trim());
  firstFocus === 'Saltar al contenido' ? ok('primer Tab = enlace de salto') : fail(`primer Tab = ${firstFocus}`);

  // Visor de certificados
  await page.locator('[data-cert-open]').first().click();
  const open = await page.evaluate(() => document.querySelector('[data-cert-dialog]').open);
  await page.waitForFunction(() => document.querySelector('[data-cert-img]').complete);
  const natural = await page.evaluate(() => document.querySelector('[data-cert-img]').naturalWidth);
  open && natural > 0 ? ok(`visor de certificado abre y carga imagen (${natural}px)`) : fail('visor de certificado');
  await page.screenshot({ path: `${OUT}/certificado-visor.png` });
  await page.keyboard.press('Escape');
  !(await page.evaluate(() => document.querySelector('[data-cert-dialog]').open)) ? ok('visor cierra con Escape') : fail('visor no cierra');

  // Contacto: WhatsApp con mensaje prellenado y sin formulario
  await page.locator('#contacto').scrollIntoViewIfNeeded();
  const wa = await page.locator('#contacto a[href*="wa.me"]').first().getAttribute('href');
  const waUrl = new URL(wa);
  waUrl.pathname === '/543812157708' && (waUrl.searchParams.get('text') || '').length > 10
    ? ok(`WhatsApp con mensaje prellenado: "${waUrl.searchParams.get('text')}"`)
    : fail(`enlace de WhatsApp inválido: ${wa}`);
  (await page.locator('#contacto form').count()) === 0 ? ok('sin formulario en contacto') : fail('el formulario sigue presente');
  await page.locator('#contacto').screenshot({ path: `${OUT}/contacto.png` });

  // Copiar email
  await ctx.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.click('[data-copy]');
  const clip = await page.evaluate(() => navigator.clipboard.readText());
  clip === 'emolinatuc@gmail.com' ? ok('botón copiar email funciona') : fail(`copiar email: "${clip}"`);

  // ---- Enlaces ----
  console.log('\n▶ enlaces');
  const links = await page.evaluate(() => [...new Set([...document.querySelectorAll('a[href]')].map((a) => a.href))]);
  for (const href of links) {
    const u = new URL(href);
    if (u.protocol === 'mailto:' || u.hostname === 'wa.me') continue;
    if (u.origin === BASE && u.hash) {
      const exists = await page.evaluate((id) => !!document.getElementById(id), u.hash.slice(1));
      exists ? null : fail(`ancla rota ${u.hash}`);
      continue;
    }
    if (u.hostname.includes('linkedin.com')) {
      ok(`(omitido, LinkedIn bloquea bots) ${href}`);
      continue;
    }
    const r = await fetch(href, { redirect: 'follow' }).catch((e) => ({ status: String(e) }));
    r.status === 200 ? ok(`${r.status} ${href}`) : fail(`${r.status} ${href}`);
  }

  // ---- SEO ----
  console.log('\n▶ SEO');
  const seo = await page.evaluate(() => ({
    title: document.title,
    desc: document.querySelector('meta[name=description]')?.content,
    canonical: document.querySelector('link[rel=canonical]')?.href,
    og: document.querySelector('meta[property="og:image"]')?.content,
    h1: document.querySelectorAll('h1').length,
    ld: JSON.parse(document.querySelector('script[type="application/ld+json"]')?.textContent || 'null'),
    imgsNoAlt: [...document.querySelectorAll('img:not([alt])')].length,
  }));
  seo.title.length <= 65 ? ok(`title (${seo.title.length}): ${seo.title}`) : fail(`title largo ${seo.title.length}`);
  seo.desc && seo.desc.length <= 170 ? ok(`description (${seo.desc.length})`) : fail('description');
  seo.canonical ? ok(`canonical ${seo.canonical}`) : fail('sin canonical');
  seo.h1 === 1 ? ok('un único h1') : fail(`${seo.h1} h1`);
  seo.ld?.['@graph']?.[0]?.['@type'] === 'Person' ? ok('JSON-LD Person') : fail('JSON-LD');
  seo.imgsNoAlt === 0 ? ok('todas las imágenes con alt') : fail(`${seo.imgsNoAlt} imágenes sin alt`);
  for (const path of ['/robots.txt', '/sitemap-index.xml', '/og.png', '/cv/esteban-molina-cv.pdf', '/cv', '/favicon.svg', '/no-existe']) {
    const r = await fetch(BASE + path);
    const expected = path === '/no-existe' ? 404 : 200;
    r.status === expected ? ok(`${r.status} ${path}`) : fail(`${r.status} ${path} (esperado ${expected})`);
  }

  // CV
  const cv = await ctx.newPage();
  await cv.goto(BASE + '/cv', { waitUntil: 'networkidle' });
  await audit(cv, 'cv');
  await ctx.close();
} finally {
  await browser.close();
  stopPreview();
}

console.log(`\n${failures.length ? `✗ ${failures.length} falla(s)` : '✓ QA sin fallas'}`);
process.exit(failures.length ? 1 : 0);
