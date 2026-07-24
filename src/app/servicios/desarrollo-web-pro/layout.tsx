import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Desarrollo Web en Chile | Páginas Web Profesionales a Medida',
  description:
    'Desarrollo web profesional en Chile con Next.js y React. Sitios ultrarrápidos, optimizados para Google (SEO) y diseñados para convertir visitas en clientes.',
  keywords: [
    'desarrollo web Chile',
    'creación de páginas web Santiago',
    'desarrollo web profesional',
    'agencia web Chile',
    'diseño web responsive',
  ],
  alternates: {
    canonical: 'https://www.yonkoservicios.com/servicios/desarrollo-web-pro',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
