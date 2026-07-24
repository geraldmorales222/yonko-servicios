import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inteligencia Artificial Aplicada en Chile | IA y Data Science',
  description:
    'Soluciones de Inteligencia Artificial y Machine Learning aplicadas a negocios en Chile. Asistentes virtuales, procesamiento de datos y flujos inteligentes.',
  keywords: [
    'inteligencia artificial empresas Chile',
    'IA aplicada Santiago',
    'desarrollo soluciones IA Chile',
    'machine learning negocios',
  ],
  alternates: {
    canonical: 'https://www.yonkoservicios.com/servicios/sistemas-inteligentes-ia',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
