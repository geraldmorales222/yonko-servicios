import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import AppChrome from '@/components/AppChrome';

export const metadata: Metadata = {
  title: {
    default: 'Yonko Servicios | Desarrollo Web, Apps y Software a Medida en Chile',
    template: '%s | Yonko Servicios',
  },
  description:
    'Agencia de servicios informáticos en Chile: Desarrollo web profesional, e-commerce de alta conversión, aplicaciones móviles iOS/Android e ingeniería de software a medida.',
  metadataBase: new URL('https://www.yonkoservicios.com'),
  alternates: {
    canonical: '/',
  },
  applicationName: 'Yonko Servicios',
  category: 'technology',
  keywords: [
    'Yonko Servicios',
    'desarrollo web Chile',
    'agencia desarrollo web Santiago',
    'posicionamiento SEO Chile',
    'agencia SEO Santiago',
    'servicios informáticos Chile',
    'ingeniería de software a medida',
    'desarrollo de apps móviles Chile',
    'creación e-commerce Chile',
    'automatización de procesos',
    'consultoría informática Santiago',
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
    title: 'Yonko Servicios | Desarrollo Web, Apps y Software a Medida en Chile',
    description:
      'Agencia de servicios informáticos en Chile: Desarrollo web profesional, e-commerce de alta conversión, aplicaciones móviles e ingeniería de software.',
    images: [
      {
        url: '/icon.png',
        width: 1200,
        height: 1200,
        alt: 'Yonko Servicios Informáticos Chile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yonko Servicios | Desarrollo Web, Apps y Software a Medida en Chile',
    description:
      'Agencia de servicios informáticos en Chile: Desarrollo web profesional, e-commerce, apps e ingeniería de software.',
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
  email: 'yonkoservicios@gmail.com',
  telephone: '+56942882503',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'CL',
    addressRegion: 'Región Metropolitana',
    addressLocality: 'Santiago',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -33.4489,
    longitude: -70.6693,
  },
  sameAs: [
    'https://wa.me/56942882503',
  ],
  description:
    'Agencia de servicios informáticos en Chile: desarrollo web a medida, tiendas e-commerce de alta conversión, aplicaciones móviles iOS/Android e ingeniería de software.',
  areaServed: {
    '@type': 'Country',
    name: 'Chile',
  },
  serviceType: [
    'Desarrollo web a medida',
    'Desarrollo de e-commerce',
    'Desarrollo de aplicaciones móviles',
    'Ingeniería de software',
    'Automatización de procesos',
    'Consultoría UX/CX',
    'Posicionamiento SEO y Visibilidad Web',
    'IA y Data Science',
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
