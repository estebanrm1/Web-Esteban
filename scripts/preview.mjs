// Levanta `astro preview` y devuelve una función para detenerlo (incluye el árbol de procesos en Windows).
import { spawn, execSync } from 'node:child_process';

export async function startPreview(port) {
  const server = spawn('npx', ['astro', 'preview', '--port', String(port)], { shell: true, stdio: 'pipe' });
  await new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error('astro preview no arrancó')), 30000);
    server.stdout.on('data', (d) => {
      if (d.toString().includes(String(port))) {
        clearTimeout(t);
        resolve();
      }
    });
  });
  return () => {
    if (process.platform === 'win32') {
      try {
        execSync(`taskkill /pid ${server.pid} /T /F`, { stdio: 'ignore' });
      } catch {}
    } else {
      server.kill('SIGTERM');
    }
  };
}
