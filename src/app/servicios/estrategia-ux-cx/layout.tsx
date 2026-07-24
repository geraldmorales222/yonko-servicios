import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Consultoría Estrategia UX/CX en Chile | Diseño de Experiencia de Usuario',
  description:
    'Consultoría UX/CX para empresas en Chile. Auditoría de usabilidad, diseño de flujos de conversión, testing con usuarios y optimización de experiencia del cliente.',
  keywords: [
    'consultoría UX Chile',
    'estrategia CX Chile',
    'diseño experiencia de usuario Santiago',
    'auditoría usabilidad web',
  ],
  alternates: {
    canonical: 'https://www.yonkoservicios.com/servicios/estrategia-ux-cx',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
