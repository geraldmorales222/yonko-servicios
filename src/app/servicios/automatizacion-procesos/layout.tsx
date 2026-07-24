import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Automatización de Procesos en Chile | n8n, APIs e Integraciones',
  description:
    'Automatización de procesos de negocio en Chile. Integración de sistemas, n8n, Zapier, APIs y eliminación de tareas repetitivas para pymes y empresas.',
  keywords: [
    'automatización de procesos Chile',
    'integración de sistemas APIs Santiago',
    'automatizaciones n8n Zapier Chile',
  ],
  alternates: {
    canonical: 'https://www.yonkoservicios.com/servicios/automatizacion-procesos',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
