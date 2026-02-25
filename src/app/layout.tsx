// src/app/layout.tsx
import './globals.css';
import { Outfit, JetBrains_Mono } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

// Configuración de la fuente Outfit para textos principales
const outfit = Outfit({ 
  subsets: ['latin'], 
  variable: '--font-outfit' 
});

// Configuración de JetBrains Mono para elementos técnicos o código
const jetbrains = JetBrains_Mono({ 
  subsets: ['latin'], 
  variable: '--font-jetbrains' 
});

export const metadata: Metadata = {
  title: 'YONKO | Ingeniería de Software',
  description: 'Agencia de consultoría liderada por Magíster en Informática.',
  metadataBase: new URL('https://www.yonkoservicios.com'),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" }, // Icono de respaldo (fallback)
      { url: "/icon.png", type: "image/png", sizes: "32x32" }, // Icono estándar
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }, // Icono para dispositivos iOS
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Aplicamos las variables de fuente al HTML
    <html lang="es" suppressHydrationWarning className={`${outfit.variable} ${jetbrains.variable}`}>
      <body className="font-sans antialiased flex flex-col min-h-screen">
          <Navbar />
          
          {/* Main con padding superior para compensar el Navbar fijo */}
          <main className="flex-grow pt-20">
            {children}
          </main>

          <Footer />
      </body>
    </html>
  );
}