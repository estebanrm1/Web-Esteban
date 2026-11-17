/**
 * Fuente única de contenido del sitio y del CV.
 * Todo lo que aparece aquí proviene del sitio original o de los certificados.
 * Editá este archivo para actualizar el portfolio: los componentes no contienen texto de perfil.
 */
import type { ImageMetadata } from 'astro';
import amShot from '../assets/projects/am-soluciones-web.png';
import rinconShot from '../assets/projects/rincon-gourmet.png';
import chefShot from '../assets/projects/portfolio-chef.png';
import portfolioShot from '../assets/projects/este-portfolio.png';
import certRolling from '../assets/certificates/rolling-code-fullstack.png';
import certProgWeb from '../assets/certificates/programacion-web.png';
import certArgProg from '../assets/certificates/argentina-programa.png';

export const site = {
  url: 'https://esteban-molina-cv.netlify.app',
  lang: 'es-AR',
  title: 'Esteban Molina — Desarrollador Full Stack MERN · Frontend & UI',
  description:
    'Esteban Molina, desarrollador Full Stack MERN (React, Node.js, MongoDB) con foco en frontend y UI. Proyectos publicados, certificaciones y CV descargable.',
  repo: 'https://github.com/estebanrm1/Web-Esteban',
};

export const person = {
  name: 'Esteban Molina',
  fullName: 'Esteban Rodrigo Molina',
  role: 'Desarrollador Full Stack MERN',
  focus: 'Frontend & UI',
  location: 'Argentina',
  email: 'solsel90@gmail.com',
  phoneDisplay: '+54 381 215-7708',
  whatsapp: 'https://wa.me/543812157708',
  linkedin: 'https://www.linkedin.com/in/esteban-molina-front-end/',
  github: 'https://github.com/estebanrm1',
  cvPdf: '/cv/esteban-molina-cv.pdf',
};

/** Propuesta de valor (hero). */
export const pitch = {
  headline: 'Construyo interfaces web claras, rápidas y pensadas para quien las usa.',
  summary:
    'Programador web Full Stack MERN certificado por Rolling Code School, con formación front-end avalada por la Secretaría de Innovación Pública. Antes del código pasé más de 10 años en gastronomía, en atención al cliente y como encargado: esa mirada centrada en las personas es lo que traigo a cada proyecto.',
};

/** Datos de un vistazo para reclutadores. */
export const highlights = [
  { value: 'MERN', label: 'MongoDB · Express · React · Node.js' },
  { value: '+10 años', label: 'de atención al cliente y gestión como encargado' },
  { value: '3', label: 'certificaciones en programación y desarrollo web' },
  { value: '4', label: 'proyectos publicados y en línea' },
];

export const about = {
  paragraphs: [
    'La programación transformó mi vida laboral y personal. Durante más de 10 años trabajé en el rubro gastronómico, en atención al cliente y como encargado. Ahí desarrollé habilidades clave en comunicación y resolución de problemas, hasta que descubrí el desarrollo web y encontré mi verdadera pasión.',
    'Me considero una persona creativa y detallista, con un fuerte foco en la interfaz de usuario: busco que las aplicaciones no solo funcionen bien, sino que ofrezcan una experiencia visual atractiva y amigable. Me encanta resolver problemas y enfrentar nuevos desafíos, y eso me impulsa a seguir aprendiendo.',
    'Me entusiasma colaborar en proyectos que marquen la diferencia y aportar al desarrollo de soluciones efectivas y dinámicas.',
  ],
  strengths: [
    {
      title: 'Interfaz primero',
      text: 'Foco en UI y experiencia de usuario: jerarquía, detalle visual y usabilidad en cada pantalla.',
    },
    {
      title: 'Full Stack MERN',
      text: 'Formación completa en MongoDB, Express, React y Node.js para entender el producto de punta a punta.',
    },
    {
      title: 'Oficio con personas',
      text: '+10 años de atención al público y como encargado: comunicación clara y resolución de problemas en tiempo real.',
    },
  ],
};

export type Project = {
  slug: string;
  title: string;
  kind: string;
  description: string;
  stack: string[];
  demo: string;
  repo?: string;
  image: ImageMetadata;
  imageAlt: string;
};

export const projects: Project[] = [
  {
    slug: 'am-soluciones-web',
    title: 'A.M Soluciones Web',
    kind: 'Emprendimiento propio',
    description:
      'Sitio de mi emprendimiento de soluciones web. Desarrollado con React, Bootstrap y múltiples librerías para ofrecer una experiencia moderna y funcional.',
    stack: ['React', 'Bootstrap', 'JavaScript'],
    demo: 'https://am-soluciones-web.netlify.app/',
    image: amShot,
    imageAlt: 'Captura del sitio A.M Soluciones Web: portada con el lema «Creamos tu web».',
  },
  {
    slug: 'rincon-gourmet',
    title: 'Rincón Gourmet',
    kind: 'Sitio para restaurante',
    description:
      'Sitio para un restaurante con un diseño elegante para mostrar el menú y mejorar la experiencia del cliente: carta, reservas y contacto, horarios y búsqueda de personal.',
    stack: ['HTML', 'CSS', 'Bootstrap', 'JavaScript'],
    demo: 'https://demo-pagina-web.netlify.app/',
    image: rinconShot,
    imageAlt: 'Captura del sitio Rincón Gourmet: portada con navegación y fotografía de un salón.',
  },
  {
    slug: 'portfolio-chef',
    title: 'Portfolio Chef',
    kind: 'CV online',
    description:
      'CV online para un chef, optimizado para SEO, con formulario de contacto funcional mediante EmailJS y un diseño atractivo y funcional.',
    stack: ['HTML', 'CSS', 'Bootstrap', 'JavaScript', 'EmailJS', 'SEO'],
    demo: 'https://am-solucionesweb.github.io/portfoliocv/',
    image: chefShot,
    imageAlt: 'Captura del Portfolio Chef: portada con un plato de sushi y botón «Contáctame».',
  },
  {
    slug: 'este-portfolio',
    title: 'Este portfolio',
    kind: 'Sitio personal · código abierto',
    description:
      'Mi portfolio personal, reconstruido con Astro como sitio estático: accesible, rápido, con SEO técnico, modo oscuro y CV descargable.',
    stack: ['Astro', 'TypeScript', 'CSS', 'EmailJS'],
    demo: 'https://esteban-molina-cv.netlify.app/',
    repo: 'https://github.com/estebanrm1/Web-Esteban',
    image: portfolioShot,
    imageAlt: 'Captura de este portfolio: portada con el nombre Esteban Molina y su propuesta de valor.',
  },
];

export const skills = [
  { group: 'Frontend', items: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Bootstrap'] },
  { group: 'Backend y datos', items: ['Node.js', 'Express', 'MongoDB'] },
  {
    group: 'Producto y entrega',
    items: ['UI / UX', 'Diseño responsive', 'SEO on-page', 'EmailJS', 'Git y GitHub', 'Netlify'],
  },
];

export type Certificate = {
  title: string;
  issuer: string;
  date: string;
  dateISO: string;
  detail: string;
  image: ImageMetadata;
};

export const certificates: Certificate[] = [
  {
    title: 'Fullstack Web Developer',
    issuer: 'Rolling Code School',
    date: 'Agosto 2023',
    dateISO: '2023-08-23',
    detail: 'Desarrollo web full stack MERN: MongoDB, Express, React y Node.js.',
    image: certRolling,
  },
  {
    title: 'Programación Web',
    issuer: 'Secretaría de Innovación Pública',
    date: 'Septiembre 2022 · 40 h',
    dateISO: '2022-09-20',
    detail: 'Plataforma de Aprendizaje Virtual (Jefatura de Gabinete de Ministros). Enfoque front-end.',
    image: certProgWeb,
  },
  {
    title: 'Argentina Programa: #SéProgramar',
    issuer: 'Ministerio de Desarrollo Productivo · CESSI',
    date: 'Abril 2022',
    dateISO: '2022-04-13',
    detail: 'Primera etapa aprobada: fundamentos de programación y desarrollo web.',
    image: certArgProg,
  },
];

/** Trayectoria: del oficio a la tecnología. Solo hitos documentados. */
export const journey = [
  {
    when: '+10 años',
    title: 'Gastronomía — atención al cliente y encargado',
    text: 'Trato directo con clientes, gestión y resolución de problemas en tiempo real.',
  },
  {
    when: '2022',
    title: 'Argentina Programa · Programación Web',
    text: 'Formación inicial certificada: fundamentos de programación y desarrollo front-end.',
  },
  {
    when: '2023',
    title: 'Fullstack Web Developer — Rolling Code School',
    text: 'Certificación full stack MERN: MongoDB, Express, React y Node.js.',
  },
  {
    when: 'Emprendimiento',
    title: 'A.M Soluciones Web',
    text: 'Desarrollo de sitios web para clientes: gastronomía y perfiles profesionales.',
  },
  {
    when: 'Formación',
    title: 'Oracle Next Education (ONE) — Alura Latam',
    text: 'Ampliando conocimientos en programación con inteligencia artificial.',
  },
];
