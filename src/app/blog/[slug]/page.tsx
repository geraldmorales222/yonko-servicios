import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import type { Metadata } from "next";
import { ARTICLES } from "../data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return {};

  return {
    title: `${article.title} | Yonko Servicios Blog`,
    description: article.excerpt,
    keywords: article.keywords,
    alternates: {
      canonical: `https://www.yonkoservicios.com/blog/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://www.yonkoservicios.com/blog/${article.slug}`,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author],
      images: [article.image],
    },
  };
}

export async function generateStaticParams() {
  return ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    image: `https://www.yonkoservicios.com${article.image}`,
    datePublished: article.publishedAt,
    author: {
      "@type": "Organization",
      name: "Yonko Servicios",
      url: "https://www.yonkoservicios.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Yonko Servicios",
      logo: {
        "@type": "ImageObject",
        url: "https://www.yonkoservicios.com/icon.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.yonkoservicios.com/blog/${article.slug}`,
    },
  };

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <Script
        id={`article-jsonld-${article.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article className="relative overflow-hidden px-5 pb-20 pt-28 md:px-6">
        <div className="mx-auto max-w-4xl">
          <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 transition hover:text-blue-600">
            ← Volver al Blog
          </Link>

          <div className="mb-6 inline-flex items-center gap-3">
            <span className="rounded-full bg-blue-50 px-3 py-1 font-mono text-[9px] font-black uppercase tracking-widest text-blue-600">
              {article.category}
            </span>
          </div>

          <h1 className="text-[clamp(1.8rem,4vw,3.2rem)] font-black leading-[1.05] tracking-tight text-slate-950">
            {article.title}
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            {article.excerpt}
          </p>

          <div className="relative my-10 aspect-[16/9] w-full overflow-hidden rounded-[2rem] border border-slate-100 bg-slate-50 flex items-center justify-center p-6 sm:p-10 shadow-xl shadow-blue-950/5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(59,130,246,0.06),transparent_60%)]" />
            <div className="relative w-full h-full max-w-[85%] max-h-[85%]">
              <Image
                src={article.image}
                alt={article.title}
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>

          <div className="prose prose-slate max-w-none space-y-8 text-base leading-relaxed text-slate-700">
            <p className="text-lg font-medium leading-relaxed text-slate-900">
              {article.content.intro}
            </p>

            {article.content.sections.map((section, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-100 bg-slate-50 p-6 sm:p-8">
                <h2 className="text-xl font-black tracking-tight text-slate-950">
                  {section.heading}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">
                  {section.body}
                </p>
              </div>
            ))}

            <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-6 sm:p-8">
              <h3 className="text-lg font-black uppercase tracking-tight text-blue-700">Conclusión</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-base">
                {article.content.conclusion}
              </p>
            </div>
          </div>

          <div className="mt-16 rounded-[2rem] border border-cyan-300/20 bg-slate-950 p-8 text-center text-white shadow-xl shadow-blue-950/20">
            <h3 className="text-xl font-black uppercase tracking-tight md:text-2xl">¿Quieres implementar esta estrategia en tu negocio?</h3>
            <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-slate-300">
              Cotiza con Yonko Servicios y llevemos tu presencia digital al siguiente nivel con tecnología seria y sin humo.
            </p>
            <Link href="/contacto" className="mt-6 inline-flex rounded-2xl bg-white px-6 py-3 text-xs font-black uppercase tracking-widest text-slate-950 transition hover:scale-[1.02]">
              Contactar equipo técnico
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
