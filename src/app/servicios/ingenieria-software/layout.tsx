import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ingeniería de Software a Medida en Chile | Sistemas y Dashboards',
  description:
    'Desarrollo de software empresarial en Chile: arquitectura de sistemas, APIs REST/GraphQL, plataformas SaaS, dashboards y base de datos de alta velocidad.',
  keywords: [
    'ingeniería de software Chile',
    'desarrollo de software a medida Santiago',
    'sistemas empresariales Chile',
    'software house Chile',
  ],
  alternates: {
    canonical: 'https://www.yonkoservicios.com/servicios/ingenieria-software',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
