# Esteban Molina — Portfolio

Sitio personal de **Esteban Molina**, eCommerce Analyst & VTEX Developer (integraciones, automatización e IA aplicada).
En producción: https://esteban-molina-cv.netlify.app

## Stack

- **[Astro](https://astro.build)**: sitio estático, sin JavaScript por defecto, optimización de imágenes (AVIF/WebP) en el build.
- **CSS propio** con tokens de diseño, modo claro/oscuro y `prefers-reduced-motion`.
- Contacto directo por **WhatsApp** (`wa.me` con mensaje prellenado), email y LinkedIn: sin formularios ni servicios de terceros.
- Tipografías autoalojadas: Bricolage Grotesque e Inter Tight (`@fontsource-variable`).
- `@astrojs/sitemap`, JSON-LD (`Person`), Open Graph y Twitter Cards.

## Estructura

```
src/
  data/profile.ts      ← TODO el contenido (perfil, experiencia, proyectos, skills, formación). Editá acá.
  components/          ← Header, Hero, About, Experience, Projects, Stack, Education, Contact, Footer, Icon
  layouts/Base.astro   ← <head>, SEO, datos estructurados, tema
  pages/               ← index, cv (CV imprimible), 404
  styles/global.css    ← sistema de diseño
  assets/              ← imágenes fuente (se optimizan en el build)
public/                ← robots.txt, favicon, og.png, cv/esteban-molina-cv.pdf
scripts/               ← generación de assets y QA automatizado
```

## Comandos

| Comando                | Acción                                                                  |
| ---------------------- | ----------------------------------------------------------------------- |
| `npm install`          | Instala dependencias                                                    |
| `npm run dev`          | Servidor de desarrollo en `localhost:4321`                              |
| `npm run build`        | Build de producción en `dist/`                                          |
| `npm run check`        | Chequeo de tipos                                                        |
| `npm run assets:cv`    | Regenera el **CV en PDF**, `og.png` y la captura propia (requiere build) |
| `npm run assets:shots` | Regenera las capturas de los proyectos desde los sitios en vivo         |
| `npm run qa`           | QA end-to-end: axe (WCAG 2.2 AA), CSP, consola, responsive, enlaces, contacto |

Los scripts usan el Chrome/Edge instalado (`playwright-core`, sin descargar navegadores). Si no se encuentra, definí `CHROME_PATH`.

### Actualizar contenido

1. Editá `src/data/profile.ts`.
2. Si cambió algo que aparece en el CV: `npm run build && npm run assets:cv && npm run build`.
3. `npm run qa` antes de publicar.

## Despliegue

Netlify (`netlify.toml`): build `npm run build`, publica `dist/`. Incluye cabeceras de seguridad (CSP, etc.) y caché inmutable para `/_astro/*`.

## Privacidad

Las imágenes de certificados publicadas tienen DNI y CUIL redactados.
