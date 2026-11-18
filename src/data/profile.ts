/**
 * Fuente única de contenido del sitio y del CV.
 * Fuentes: CV 2026 de Esteban, certificados oficiales y el sitio original.
 * Editá este archivo para actualizar el portfolio: los componentes no contienen texto de perfil.
 */
import type { ImageMetadata } from 'astro';
import enlaceShot from '../assets/projects/enlace-ar.png';
import rinconShot from '../assets/projects/rincon-gourmet.png';
import chefShot from '../assets/projects/portfolio-chef.png';
import portfolioShot from '../assets/projects/este-portfolio.png';
import certRolling from '../assets/certificates/rolling-code-fullstack.png';
import certProgWeb from '../assets/certificates/programacion-web.png';
import certArgProg from '../assets/certificates/argentina-programa.png';
import certOne from '../assets/certificates/oracle-one-programa.png';
import certOneIA from '../assets/certificates/one-inmersion-agentes-ia.png';

export const site = {
  url: 'https://esteban-molina-cv.netlify.app',
  lang: 'es-AR',
  title: 'Esteban Molina — eCommerce Analyst & VTEX Developer',
  description:
    'Esteban Molina: eCommerce Analyst y VTEX Developer en Tucumán. Integraciones VTEX IO, automatización con IA y desarrollo web full stack. Experiencia, proyectos y CV.',
  repo: 'https://github.com/estebanrm1/Web-Esteban',
};

export const person = {
  name: 'Esteban Molina',
  fullName: 'Esteban Rodrigo Molina',
  role: 'eCommerce Analyst & VTEX Developer',
  focus: 'Integraciones · Automatización · IA aplicada',
  location: 'Tucumán, Argentina',
  modality: 'Remoto · Híbrido · Abierto a reubicación',
  email: 'emolinatuc@gmail.com',
  phoneDisplay: '+54 381 215-7708',
  whatsapp: 'https://wa.me/543812157708',
  whatsappMessage: 'Hola Esteban, vi tu portfolio y me gustaría hablar con vos sobre una oportunidad.',
  linkedin: 'https://www.linkedin.com/in/esteban-molina-dev/',
  linkedinHandle: 'in/esteban-molina-dev',
  github: 'https://github.com/estebanrm1',
  cvPdf: '/cv/esteban-molina-cv.pdf',
  /** Empleador actual descripto de forma genérica (sin nombre por confidencialidad). */
  currentEmployer: 'Retail multisucursal',
};

/** Propuesta de valor (hero). */
export const pitch = {
  headline: 'Traduzco necesidades de negocio en soluciones eCommerce concretas.',
  summary:
    'Perfil híbrido técnico-operativo: en una empresa de retail multisucursal soy el referente técnico interno de VTEX IO. Desarrollo integraciones API, diseño herramientas web a medida y automatizo procesos con IA, reduciendo costos de desarrollo externo. Formación full stack MERN y más de 10 años gestionando operaciones.',
};

/** Datos de un vistazo para reclutadores. */
export const highlights = [
  { value: 'VTEX IO', label: 'referente técnico interno en una empresa de retail' },
  { value: '+10 años', label: 'de experiencia en gestión de operaciones y equipos' },
  { value: '11', label: 'sucursales en el esquema multidepósito que diseñé' },
  { value: '327 h', label: 'de formación en Oracle Next Education' },
];

export const about = {
  paragraphs: [
    'Soy analista de eCommerce y desarrollador VTEX. Me especializo en integrar plataformas, automatizar procesos y traducir necesidades de negocio en soluciones concretas: desde scripts de migración de catálogo hasta aplicaciones internas que reemplazan flujos manuales.',
    'Llegué a la tecnología desde la operación: durante años gestioné equipos y operaciones diarias en gastronomía. Esa experiencia me da algo que valoro mucho en un equipo de producto: entender el negocio desde adentro, priorizar y comunicar con claridad entre áreas técnicas y no técnicas.',
    'Hoy combino formación full stack MERN con un uso intensivo de inteligencia artificial aplicada a flujos de trabajo reales, y sigo formándome en el programa Oracle Next Education.',
  ],
  strengths: [
    {
      title: 'eCommerce y VTEX',
      text: 'VTEX IO, API, catálogo, promociones, checkout y medios de pago. Gestión técnica diaria con el partner de implementación.',
    },
    {
      title: 'Integración y automatización',
      text: 'Integraciones API, scripts en Python y herramientas web a medida que eliminan procesos manuales propensos a errores.',
    },
    {
      title: 'IA aplicada al negocio',
      text: 'Soluciones con Claude API y LLMs para automatizar tareas operativas, con criterio de negocio y de operación.',
    },
  ],
};

export type Role = {
  title: string;
  company: string;
  period: string;
  start: string;
  end?: string;
  summary?: string;
  points: string[];
};

export const experience: Role[] = [
  {
    title: 'Analista de Operaciones eCommerce',
    company: 'Empresa de retail multisucursal',
    period: '2024 — Presente',
    start: '2024',
    points: [
      'Referente técnico interno de VTEX IO: gestiono la relación diaria con el partner de implementación, evalúo propuestas técnicas y ejecuto desarrollos directos, reduciendo horas facturadas a terceros.',
      'Scripts en Python para migración masiva de catálogo vía VTEX API: árbol de categorías, marcas y mapeo de taxonomía de Google, automatizando operaciones antes manuales o tercerizadas.',
      'Diseñé y desarrollé el Hot Sale Command Center (Next.js 15 + TypeScript + Supabase), que centralizó la gestión del evento comercial más importante del año y reemplazó un flujo manual en múltiples hojas de cálculo.',
      'Arquitecturé el esquema multidepósito de 11 sucursales para la nueva cuenta VTEX de una unidad de negocio, documentando la lógica de inventario y envío para la migración.',
      'Investigué e integré múltiples procesadores de pago locales: evaluación técnica, compatibilidad con VTEX y recomendación de rutas de implementación.',
      'Implementé soluciones con Claude API (Anthropic) para automatizar tareas operativas, como la detección de nombres de locales en reseñas y la generación de respuestas.',
      'Diagnostiqué y resolví un bug crítico de rendering en el storefront (conflicto FedCM/Chrome) que afectaba el inicio de sesión con Google.',
    ],
  },
  {
    title: 'Cofundador · Soluciones tecnológicas',
    company: 'Enlace AR',
    period: '2023 — Presente',
    start: '2023',
    points: [
      'Desarrollo de sitios web a medida con HTML, CSS, JavaScript y React para clientes de distintos rubros.',
      'Consultoría técnica para pequeñas empresas en plataformas digitales y optimización de su presencia online.',
      'Diseño de soluciones de automatización, integración de sistemas e IA aplicada para negocios y profesionales.',
    ],
  },
  {
    title: 'Encargado de Operaciones',
    company: 'Porter Brew House',
    period: '2019 — 2023',
    start: '2019',
    end: '2023',
    points: [
      'Gestión integral de equipos: planificación, capacitación y control de las operaciones diarias.',
      'Optimización de procesos internos que mejoraron los tiempos de servicio y la satisfacción del cliente.',
    ],
  },
];

/** Casos destacados (proyectos internos, sin demo pública). */
export const caseStudies = [
  {
    title: 'Hot Sale Command Center',
    context: 'Aplicación web interna · Retail',
    problem: 'La gestión del Hot Sale dependía de un flujo manual repartido en múltiples hojas de cálculo.',
    solution:
      'Aplicación web que centraliza la operación del evento integrando datos del ERP de la empresa y VTEX API en tiempo real.',
    stack: ['Next.js 15', 'TypeScript', 'Tailwind', 'Supabase', 'Drizzle ORM', 'TanStack Query'],
  },
  {
    title: 'Migración de una unidad de negocio a VTEX',
    context: 'Liderazgo técnico · Retail',
    problem: 'Separar una unidad de negocio en su propia cuenta VTEX sin perder catálogo ni lógica de inventario.',
    solution:
      'Análisis de storefront, configuración de catálogo vía API y diseño de un esquema multidepósito para 11 sucursales.',
    stack: ['VTEX API', 'Python', 'Inventario multidepósito'],
  },
  {
    title: 'Automatizador de Condiciones Comerciales',
    context: 'Herramienta interna · VTEX',
    problem: 'Cada mes, condiciones comerciales y reglas de pago se cargaban a mano: un proceso lento y propenso a errores.',
    solution:
      'App en React que procesa las planillas mensuales y configura automáticamente condiciones comerciales y reglas de pago en VTEX.',
    stack: ['React', 'SheetJS', 'VTEX API'],
  },
];

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

/** Sitios publicados (freelance y personales). */
export const projects: Project[] = [
  {
    slug: 'enlace-ar',
    title: 'Enlace AR',
    kind: 'Emprendimiento propio',
    description: 'Sitio de mi emprendimiento de soluciones tecnológicas: diseño propio, formulario de diagnóstico con Netlify Forms, SEO técnico y accesibilidad AA.',
    stack: ['Astro', 'TypeScript', 'CSS', 'Netlify Forms'],
    demo: 'https://enlace-ar.netlify.app/',
    image: enlaceShot,
    imageAlt: 'Captura del sitio Enlace AR: portada con el lema «Primero entendemos tu negocio. Después elegimos la tecnología.» y un diagrama de herramientas conectadas.',
  },
  {
    slug: 'rincon-gourmet',
    title: 'Rincón Gourmet',
    kind: 'Sitio para restaurante',
    description: 'Sitio para un restaurante: carta, reservas y contacto, horarios y búsqueda de personal, con un diseño elegante.',
    stack: ['HTML', 'CSS', 'Bootstrap', 'JavaScript'],
    demo: 'https://demo-pagina-web.netlify.app/',
    image: rinconShot,
    imageAlt: 'Captura del sitio Rincón Gourmet: portada con navegación y fotografía de un salón.',
  },
  {
    slug: 'portfolio-chef',
    title: 'Portfolio Chef',
    kind: 'CV online',
    description: 'CV online para un chef, optimizado para SEO y con formulario de contacto funcional mediante EmailJS.',
    stack: ['HTML', 'CSS', 'Bootstrap', 'JavaScript', 'EmailJS'],
    demo: 'https://am-solucionesweb.github.io/portfoliocv/',
    image: chefShot,
    imageAlt: 'Captura del Portfolio Chef: portada con un plato de sushi y botón «Contáctame».',
  },
  {
    slug: 'este-portfolio',
    title: 'Este portfolio',
    kind: 'Sitio personal · código abierto',
    description: 'Sitio estático con Astro: accesible (WCAG 2.2 AA), rápido, con SEO técnico, modo oscuro y CV descargable.',
    stack: ['Astro', 'TypeScript', 'CSS'],
    demo: 'https://esteban-molina-cv.netlify.app/',
    repo: 'https://github.com/estebanrm1/Web-Esteban',
    image: portfolioShot,
    imageAlt: 'Captura de este portfolio: portada con el nombre Esteban Molina y su propuesta de valor.',
  },
];

export const skills = [
  { group: 'eCommerce / VTEX', items: ['VTEX IO', 'VTEX API', 'Admin', 'Site Editor', 'Catálogo', 'Promociones', 'Checkout', 'Payment Gateway'] },
  { group: 'Front-end', items: ['JavaScript ES6+', 'TypeScript', 'React', 'Next.js', 'HTML5', 'CSS3', 'Tailwind'] },
  { group: 'Back-end y datos', items: ['Node.js', 'Express', 'Python', 'PostgreSQL', 'REST APIs'] },
  { group: 'IA y automatización', items: ['Claude API', 'Integración de LLMs', 'Prompt Engineering'] },
  { group: 'DevOps y herramientas', items: ['Git', 'Docker', 'Postman', 'Supabase', 'Drizzle ORM', 'Figma'] },
  { group: 'Gestión', items: ['Trello', 'Slack', 'MS Teams', 'Google Drive', 'Excel avanzado'] },
];

export const languages = [
  { name: 'Español', level: 'Nativo' },
  { name: 'Inglés', level: 'Lectura técnica fluida: documentación, APIs y foros especializados' },
];

/** Formación en curso. */
export const currentStudy = {
  title: 'Business AI Builder',
  program: 'Oracle Next Education (ONE) · Oracle + Alura Latam',
  text: 'Fase práctica enfocada en aplicar inteligencia artificial a áreas de negocio: IA para Marketing, Ventas, Recursos Humanos y Finanzas. El objetivo es identificar problemas de negocio, elegir las herramientas de IA adecuadas y construir soluciones aplicables al día a día.',
};

export type Certificate = {
  title: string;
  issuer: string;
  date: string;
  dateISO: string;
  detail: string;
  image: ImageMetadata;
  verifyUrl?: string;
};

export const certificates: Certificate[] = [
  {
    title: 'ONE | Inmersión: Agentes de IA para Negocios',
    issuer: 'Oracle Next Education · Alura Latam',
    date: 'Octubre 2026 · 4 h',
    dateISO: '2026-10-12',
    detail: 'Inmersión sobre agentes de inteligencia artificial aplicados a negocios.',
    image: certOneIA,
    verifyUrl: 'https://app.aluracursos.com/immersion/certificate/69e7b2d2-e261-4da9-9223-6d9f138a6376',
  },
  {
    title: 'Programa Oracle Next Education (ONE)',
    issuer: 'Oracle + Alura Latam',
    date: 'Enero 2025 · 327 h',
    dateISO: '2025-01-21',
    detail: '6 formaciones: Principiante en Programación, Front End, React, Desarrollo Personal, Emprendimiento y Agilidad y Protagonismo Profesional.',
    image: certOne,
  },
  {
    title: 'Fullstack Web Developer (MERN)',
    issuer: 'Rolling Code School',
    date: 'Agosto 2023',
    dateISO: '2023-08-23',
    detail: 'Desarrollo web full stack: MongoDB, Express, React y Node.js.',
    image: certRolling,
  },
  {
    title: 'Programación Web',
    issuer: 'Secretaría de Innovación Pública',
    date: 'Septiembre 2022 · 40 h',
    dateISO: '2022-09-20',
    detail: 'Plataforma de Aprendizaje Virtual (Jefatura de Gabinete de Ministros).',
    image: certProgWeb,
  },
  {
    title: 'Argentina Programa: #SéProgramar',
    issuer: 'Ministerio de Desarrollo Productivo · CESSI',
    date: 'Abril 2022',
    dateISO: '2022-04-13',
    detail: 'Fundamentos de programación (primera etapa).',
    image: certArgProg,
  },
];
