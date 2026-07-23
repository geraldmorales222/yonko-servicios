import type { MetadataRoute } from 'next';

const baseUrl = 'https://www.yonkoservicios.com';

const routes = [
  { path: '', priority: 1 },
  { path: '/servicios', priority: 0.9 },
  { path: '/servicios/desarrollo-web-pro', priority: 0.85 },
  { path: '/servicios/ecommerce-alta-conversion', priority: 0.85 },
  { path: '/servicios/desarrollo-movil', priority: 0.85 },
  { path: '/servicios/ingenieria-software', priority: 0.85 },
  { path: '/servicios/automatizacion-procesos', priority: 0.8 },
  { path: '/servicios/estrategia-ux-cx', priority: 0.6 },
  { path: '/servicios/auditoria-rendimiento-web-wpo', priority: 0.75 },
  { path: '/servicios/sistemas-inteligentes-ia', priority: 0.6 },
  { path: '/proyectos', priority: 0.75 },
  { path: '/nosotros', priority: 0.75 },
  { path: '/contacto', priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map(({ path, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency: 'monthly',
    priority,
  }));
}
