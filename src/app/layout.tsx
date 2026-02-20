import './globals.css';
import { Outfit, JetBrains_Mono } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';

const outfit = Outfit({ 
  subsets: ['latin'], 
  variable: '--font-outfit' 
});

const jetbrains = JetBrains_Mono({ 
  subsets: ['latin'], 
  variable: '--font-jetbrains' 
});

export const metadata = {
  title: 'YONKO | Ingeniería de Software & UX Strategy',
  description: 'Agencia de consultoría liderada por Magíster en Informática.',
};
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1, // Esto evita el zoom al hacer focus en inputs
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning className={`${outfit.variable} ${jetbrains.variable}`}>
      <body className="font-sans antialiased">
          <Navbar />
          {children}
          <Footer />
      </body>
    </html>
  );
}