// src/app/layout.tsx
import './globals.css';
import { Outfit, JetBrains_Mono } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' });

export const metadata: Metadata = {
  title: 'YONKO | Ingeniería de Software & UX Strategy',
  description: 'Agencia de consultoría liderada por Magíster en Informática. Soluciones escalables y arquitectura de software.',
  // --- LOS ICONOS QUE TE FALTABAN ---
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  // --- PARA QUE SE VEA BIEN AL COMPARTIR EN WHATSAPP/CELULAR ---
  openGraph: {
    title: 'YONKO | Ingeniería de Software',
    description: 'Arquitectura de Software y Soluciones SaaS de alto rendimiento.',
    url: 'https://www.yonkoservicios.com',
    siteName: 'Yonko Servicios',
    images: [
      {
        url: 'https://res.cloudinary.com/dtbhiodgz/image/upload/v1/logo-og.png', // Sube tu logo a Cloudinary y pon el link aquí
        width: 1200,
        height: 630,
      },
    ],
    locale: 'es_CL',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning className={`${outfit.variable} ${jetbrains.variable}`}>
      <body className="font-sans antialiased flex flex-col min-h-screen">
          <Navbar />
          {/* El pt-20 asegura que el contenido no quede tapado por el Navbar fijo */}
          <main className="flex-grow pt-20">
            {children}
          </main>
          <Footer />
      </body>
    </html>
  );
}