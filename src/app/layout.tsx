// src/app/layout.tsx
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
  description: 'Agencia de consultoría liderada por Magíster en Informática.', //
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning className={`${outfit.variable} ${jetbrains.variable}`}>
      <body className="font-sans antialiased flex flex-col min-h-screen bg-white text-slate-900">
          <Navbar />
          
          {/* Main con el mismo padding-top que te funcionó antes */}
          <main className="flex-grow pt-20">
            {children}
          </main>

          <Footer />
      </body>
    </html>
  );
}