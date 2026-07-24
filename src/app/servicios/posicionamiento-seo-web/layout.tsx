import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Posicionamiento SEO y Optimización Web en Chile | Yonko Servicios',
  description:
    'Servicios de Posicionamiento SEO técnico y orgánico en Chile. Auditoría de palabras clave, SEO On-Page, estructuración de contenidos y posicionamiento en Google.',
  keywords: [
    'posicionamiento SEO Chile',
    'agencia SEO Santiago',
    'SEO técnico desarrollo web',
    'optimización buscadores Chile',
    'posicionar página web Google Chile',
  ],
  alternates: {
    canonical: 'https://www.yonkoservicios.com/servicios/posicionamiento-seo-web',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
