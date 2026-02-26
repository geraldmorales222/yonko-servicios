// src/app/layout.tsx
import './globals.css';
import { Outfit, JetBrains_Mono } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

// Cargamos Outfit para el branding principal
const outfit = Outfit({ 
  subsets: ['latin'], 
  variable: '--font-outfit',
  display: 'swap',
});

// Cargamos JetBrains Mono para toques técnicos de ingeniería
const jetbrains = JetBrains_Mono({ 
  subsets: ['latin'], 
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'YONKO | Ingeniería de Software',
  description: 'Consultoría liderada por Magíster en Informática.',
  metadataBase: new URL('https://www.yonkoservicios.com'),
  alternates: {
    canonical: '/',
  },

  icons: {

    icon: [
      { url: "/favicon.ico?v=600", sizes: "any" },
      { url: "/icon.png?v=600", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-touch-icon.png?v=600", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning className={`${outfit.variable} ${jetbrains.variable}`}>
      <body className="font-sans antialiased flex flex-col min-h-screen">
          <Navbar />
          
          {/* Main con padding superior para no quedar bajo el Navbar fijo */}
          <main className="flex-grow pt-20">
            {children}
          </main>

          <Footer />
      </body>
    </html>
  );
}