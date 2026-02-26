// src/app/sitemap.ts
import { MetadataRoute } from 'next';

/**
 * Generador de Sitemap para YONKO
 * Este archivo genera dinámicamente el /sitemap.xml para Google.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.yonkoservicios.com';

  // Definimos las rutas de forma explícita para evitar errores de tipo
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly', // Frecuencia: siempre como string literal
      priority: 1,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/nosotros`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/proyectos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/servicios`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/servicios/automatizacion-procesos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/servicios/desarrollo-movil`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/servicios/desarrollo-web-pro`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/servicios/ecommerce-alta-conversion`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/servicios/estrategia-ux-cx`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/servicios/sistemas-inteligentes-ia`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
}