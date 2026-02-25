// src/app/layout.tsx
import './globals.css';
import { Outfit, JetBrains_Mono } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

// Configuramos las fuentes para que Next.js las optimice
const outfit = Outfit({ 
  subsets: ['latin'], 
  variable: '--font-outfit' 
});

const jetbrains = JetBrains_Mono({ 
  subsets: ['latin'], 
  variable: '--font-jetbrains' 
});

export const metadata: Metadata = {
  title: 'YONKO | Ingeniería de Software',
  description: 'Agencia de consultoría liderada por Magíster en Informática.',
  metadataBase: new URL('https://www.yonkoservicios.com'),
  icons: {
    /* Declaramos el favicon.ico como primer recurso (técnica de Duangel).
       Añadimos ?v=15 para obligar al navegador a descargar el archivo nuevo.
    */
    icon: [
      { url: "/favicon.ico?v=15", sizes: "any" },
      { url: "/icon.png?v=15", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-touch-icon.png?v=15", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Aplicamos las clases de las fuentes al HTML
    <html lang="es" suppressHydrationWarning className={`${outfit.variable} ${jetbrains.variable}`}>
      <body className="font-sans antialiased flex flex-col min-h-screen">
          <Navbar />
          
          {/* Main con padding superior para no quedar tapado por el Navbar fijo */}
          <main className="flex-grow pt-20">
            {children}
          </main>

          <Footer />
      </body>
    </html>
  );
}