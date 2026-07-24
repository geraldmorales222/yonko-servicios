"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ARTICLES } from "./data";

export default function BlogIndexPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="relative overflow-hidden px-5 pb-16 pt-28 md:px-6" style={{ background: "linear-gradient(160deg, #f0f7ff 0%, #ffffff 55%)" }}>
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#2563eb 1px,transparent 1px),linear-gradient(90deg,#2563eb 1px,transparent 1px)", backgroundSize: "52px 52px" }} />
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3.5 py-1.5 shadow-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-600" />
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-blue-700">Conocimiento & Recursos</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }} className="text-[clamp(2.2rem,5vw,4rem)] font-black uppercase leading-[0.94] tracking-tight">
            Blog & Guías de<br />
            <span className="italic text-blue-600">Tecnología y SEO.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="mt-6 max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg">
            Respuestas claras sobre arquitectura de software, posicionamiento en Google y desarrollo web para empresas y pymes.
          </motion.p>
        </div>
      </section>

      <section className="px-5 py-16 md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {ARTICLES.map((article) => (
              <article key={article.slug} className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-50 border-b border-slate-100 flex items-center justify-center p-4">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(59,130,246,0.06),transparent_60%)]" />
                  <div className="relative w-full h-full max-w-[80%] max-h-[85%]">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute left-4 top-4 rounded-full border border-slate-200 bg-white/90 px-3 py-1 font-mono text-[8px] font-black uppercase tracking-widest text-slate-700 backdrop-blur shadow-sm">
                    {article.category}
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h2 className="mt-3 text-lg font-black leading-snug text-slate-950 transition-colors group-hover:text-blue-600">
                      <Link href={`/blog/${article.slug}`}>
                        <span className="absolute inset-0 z-10" />
                        {article.title}
                      </Link>
                    </h2>
                    <p className="mt-3 text-xs leading-relaxed text-slate-500">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-1 text-xs font-black uppercase tracking-wider text-blue-600">
                    Leer artículo completo <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-6">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-slate-950 p-7 text-center text-white shadow-xl shadow-blue-950/20 md:p-10">
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-cyan-200">¿Tienes un proyecto en mente?</p>
          <h2 className="mt-4 text-2xl font-black uppercase tracking-tight md:text-3xl">Hablemos de tu idea.</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-300">
            Diseñamos e implementamos soluciones web, e-commerce, apps móviles y estrategias SEO enfocadas en resultados de negocio.
          </p>
          <Link href="/contacto" className="mt-8 inline-flex rounded-2xl bg-white px-7 py-3.5 text-xs font-black uppercase tracking-widest text-slate-950 transition hover:scale-[1.02]">
            Cotizar proyecto
          </Link>
        </div>
      </section>
    </main>
  );
}
