import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import AppChrome from '@/components/AppChrome';

export const metadata: Metadata = {
  title: {
    default: 'Yonko Servicios | Ingeniería, desarrollo web, apps y automatización',
    template: '%s | Yonko Servicios',
  },
  description:
    'Servicios informáticos para empresas: desarrollo web, e-commerce, apps móviles, ingeniería de software, automatización, UX/CX e IA aplicada.',
  metadataBase: new URL('https://www.yonkoservicios.com'),
  alternates: {
    canonical: '/',
  },
  applicationName: 'Yonko Servicios',
  category: 'technology',
  keywords: [
    'Yonko Servicios',
    'desarrollo web Chile',
    'servicios informáticos',
    'ingeniería de software',
    'apps móviles',
    'e-commerce',
    'automatización de procesos',
    'consultoría informática',
    'UX CX',
    'IA aplicada',
  ],
  authors: [{ name: 'Yonko Servicios' }],
  creator: 'Yonko Servicios',
  publisher: 'Yonko Servicios',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: '/',
    siteName: 'Yonko Servicios',
    title: 'Yonko Servicios | Ingeniería y servicios informáticos',
    description:
      'Desarrollo web, e-commerce, apps móviles, ingeniería de software y automatización para empresas que necesitan operar mejor.',
    images: [
      {
        url: '/icon.png',
        width: 1200,
        height: 1200,
        alt: 'Yonko Servicios',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yonko Servicios | Ingeniería y servicios informáticos',
    description:
      'Servicios informáticos para empresas: desarrollo web, apps, e-commerce, automatización e ingeniería de software.',
    images: ['/icon.png'],
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico?v=700', sizes: 'any' },
      { url: '/icon.png?v=700', type: 'image/png', sizes: '32x32' },
    ],
    apple: [{ url: '/apple-touch-icon.png?v=700', sizes: '180x180', type: 'image/png' }],
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Yonko Servicios',
  url: 'https://www.yonkoservicios.com',
  logo: 'https://www.yonkoservicios.com/icon.png',
  image: 'https://www.yonkoservicios.com/icon.png',
  description:
    'Servicios informáticos para empresas: desarrollo web, e-commerce, apps móviles, ingeniería de software, automatización, UX/CX e IA aplicada.',
  areaServed: 'CL',
  serviceType: [
    'Desarrollo web',
    'E-commerce',
    'Apps móviles',
    'Ingeniería de software',
    'Automatización de procesos',
    'UX/CX',
    'IA aplicada',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CL" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <Script
          id="yonko-json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}
