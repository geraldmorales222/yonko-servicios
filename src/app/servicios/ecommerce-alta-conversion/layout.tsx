import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Desarrollo de E-commerce en Chile | Tiendas Online de Alta Conversión',
  description:
    'Desarrollamos tiendas virtuales e-commerce en Chile. Integración de Webpay, MercadoPago, Stripe y pasarelas locales. Rápidas, seguras y enfocadas en ventas.',
  keywords: [
    'desarrollo ecommerce Chile',
    'creación tienda online Chile',
    'tienda virtual Webpay',
    'ecommerce Next.js Shopify',
  ],
  alternates: {
    canonical: 'https://www.yonkoservicios.com/servicios/ecommerce-alta-conversion',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
