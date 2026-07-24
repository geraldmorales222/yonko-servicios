import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog de Tecnología, SEO y Desarrollo Web en Chile | Yonko Servicios',
  description:
    'Artículos, guías y consejos sobre desarrollo web, precios de software en Chile, e-commerce, apps móviles y posicionamiento SEO orgánico en Google.',
  keywords: [
    'blog desarrollo web chile',
    'guia precios software chile',
    'consejos seo pymes chile',
    'desarrollo de apps chile blog',
  ],
  alternates: {
    canonical: 'https://www.yonkoservicios.com/blog',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
