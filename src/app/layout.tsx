import './globals.css';
import { Outfit, JetBrains_Mono } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

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
    icon: [
      /* Agregamos el favicon y el icon con versión para limpiar caché */
      { url: "/favicon.ico?v=5", sizes: "any" },
      { url: "/icon.png?v=5", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-touch-icon.png?v=5", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning className={`${outfit.variable} ${jetbrains.variable}`}>
      <body className="font-sans antialiased flex flex-col min-h-screen">
          <Navbar />
          
          <main className="flex-grow pt-20">
            {children}
          </main>

          <Footer />
      </body>
    </html>
  );
}