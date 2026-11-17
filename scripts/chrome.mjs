// Localiza un Chrome/Edge instalado para usar con playwright-core (sin descargar navegadores).
import { existsSync } from 'node:fs';

const candidates = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter(Boolean);

export const chromePath = candidates.find((p) => existsSync(p));
if (!chromePath) throw new Error('No se encontró Chrome. Definí CHROME_PATH.');
