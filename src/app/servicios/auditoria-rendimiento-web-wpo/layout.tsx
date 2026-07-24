import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Auditoría y Rendimiento Web WPO en Chile | Core Web Vitals 100%',
  description:
    'Auditoría y optimización de velocidad de carga WPO en Chile. Llevamos tu web a 95-100% en PageSpeed Insights, optimizando Core Web Vitals y código.',
  keywords: [
    'auditoría rendimiento web Chile',
    'optimización WPO PageSpeed Chile',
    'velocidad de carga sitio web Santiago',
    'Core Web Vitals Chile',
  ],
  alternates: {
    canonical: 'https://www.yonkoservicios.com/servicios/auditoria-rendimiento-web-wpo',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
