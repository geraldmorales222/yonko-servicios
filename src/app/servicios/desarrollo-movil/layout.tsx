import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Desarrollo de Apps Móviles en Chile | Aplicaciones iOS y Android',
  description:
    'Desarrollo de aplicaciones móviles a medida para empresas y startups en Chile. React Native, Expo, publicación en App Store y Google Play.',
  keywords: [
    'desarrollo de apps Chile',
    'creación aplicaciones móviles Santiago',
    'desarrollo app iOS Android Chile',
    'programación aplicaciones móviles',
  ],
  alternates: {
    canonical: 'https://www.yonkoservicios.com/servicios/desarrollo-movil',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
