"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const METRICAS = [
  { v: "Top #1-3", l: "Objetivo orgánico" },
  { v: "100%", l: "SEO Técnico base" },
  { v: "2.5x", l: "Tráfico calificado" },
];

const SEO_PILAS = [
  {
    icon: "🎯",
    titulo: "SEO Técnico y Estructural",
    desc: "Optimizamos arquitectura SSR, datos estructurados (Schema JSON-LD), canonicals, sitemap XML, robots.txt y rendimiento en Google.",
  },
  {
    icon: "🔑",
    titulo: "Keyword Research Comercial",
    desc: "Detectamos búsquedas con intención real de compra y contratación en Chile, no solo términos genéricos sin conversión.",
  },
  {
    icon: "📍",
    titulo: "SEO Local y Google Maps",
    desc: "Optimizamos tu perfil de Google Business Profile para aparecer en las primeras posiciones del mapa local en Santiago y Chile.",
  },
  {
    icon: "📝",
    titulo: "Estrategia de Contenidos",
    desc: "Diseñamos una arquitectura de contenidos orientada a Autoridad Temática (Topical Authority) para responder lo que tus clientes buscan.",
  },
  {
    icon: "⚡",
    titulo: "Core Web Vitals y WPO",
    desc: "Aseguramos la máxima puntuación en PageSpeed Insights. Google premia sitios ultra rápidos y penaliza páginas lentas.",
  },
  {
    icon: "📊",
    titulo: "Monitoreo y Analytics",
    desc: "Integración con Google Search Console y Analytics para medir clics reales, impresiones, posiciones y conversiones mensuales.",
  },
];

const PROCESO = [
  { n: "01", t: "Auditoría SEO Inicial", d: "Revisamos tu sitio actual: indexación, palabras clave, competencia local y errores técnicos." },
  { n: "02", t: "Estrategia de Palabras Clave", d: "Mapeamos las búsquedas con mayor potencial de venta en Chile para tu industria." },
  { n: "03", t: "Optimización On-Page", d: "Ajustamos meta titles, H1/H2, estructura HTML, imágenes WebP, URLs y Schema JSON-LD." },
  { n: "04", t: "Indexación y Seguimiento", d: "Enviamos sitemap a Search Console y monitoreamos la evolución del ranking mes a mes." },
];

const ENTREGABLES = [
  "Auditoría técnica SEO y diagnóstico de indexación",
  "Estudio de Palabras Clave comerciales en Chile",
  "Implementación de Schema JSON-LD (Local Business)",
  "Optimización On-Page de títulos, metadatos y H1-H3",
  "Configuración de Google Search Console y Sitemap",
  "Reporte mensual de posiciones e impresiones",
];

const PLANES = [
  {
    nombre: "Auditoría SEO Técnico",
    desc: "Para sitios existentes que no logran aparecer en los primeros resultados de Google.",
    items: ["Diagnóstico técnico SEO", "Estudio de Palabras Clave", "Revisión de Indexación", "Plan de optimización"],
    destacado: false,
  },
  {
    nombre: "SEO On-Page + Técnico",
    desc: "La solución recomendada: auditamos, implementamos cambios en el código y optimizamos para Chile.",
    items: ["Todo lo de Auditoría SEO", "Implementación On-Page en código", "Schema JSON-LD Local", "Integración Search Console"],
    destacado: true,
  },
  {
    nombre: "SEO & Posicionamiento Mensual",
    desc: "Para empresas que buscan liderar su sector en Google de forma continua.",
    items: ["Optimización mensual de palabras clave", "Creación de contenidos estratégicos", "Reporte mensual de ranking", "Soporte técnico dedicado"],
    destacado: false,
  },
];

function PlanCard({ plan }: { plan: typeof PLANES[0] }) {
  return (
    <div className={`rounded-[1.75rem] border p-6 ${plan.destacado ? "border-blue-500 bg-slate-950 text-white shadow-xl shadow-blue-950/20" : "border-slate-100 bg-white"}`}>
      <p className={`mb-2 font-mono text-[9px] font-black uppercase tracking-[0.25em] ${plan.destacado ? "text-cyan-200" : "text-blue-600"}`}>Alcance</p>
      <h3 className="text-lg font-black uppercase tracking-tight">{plan.nombre}</h3>
      <p className={`mt-3 text-sm leading-relaxed ${plan.destacado ? "text-slate-300" : "text-slate-500"}`}>{plan.desc}</p>
      <p className={`mt-5 text-2xl font-black tracking-tight ${plan.destacado ? "text-white" : "text-slate-950"}`}>Cotizar</p>
      <ul className="mt-5 space-y-3">
        {plan.items.map((item) => (
          <li key={item} className={`flex gap-3 text-sm font-semibold ${plan.destacado ? "text-slate-200" : "text-slate-600"}`}>
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
            {item}
          </li>
        ))}
      </ul>
      <Link href="/contacto" className={`mt-6 inline-flex w-full justify-center rounded-2xl px-5 py-3 text-[10px] font-black uppercase tracking-widest transition ${plan.destacado ? "bg-white text-slate-950 hover:bg-blue-50" : "bg-slate-950 text-white hover:bg-blue-700"}`}>
        Cotizar estrategia SEO
      </Link>
    </div>
  );
}

export default function SeoPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="relative overflow-hidden px-5 pb-16 pt-28 md:px-6" style={{ background: "linear-gradient(160deg, #f0f7ff 0%, #ffffff 55%)" }}>
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#2563eb 1px,transparent 1px),linear-gradient(90deg,#2563eb 1px,transparent 1px)", backgroundSize: "52px 52px" }} />
        <div className="relative z-10 mx-auto max-w-7xl">
          <Link href="/servicios" className="mb-10 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 transition hover:text-blue-600">
            ← Todos los servicios
          </Link>

          <div className="grid gap-10 lg:grid-cols-[1fr_.85fr] lg:items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3.5 py-1.5 shadow-sm">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-blue-700">Search Engine Optimization</span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }} className="text-[clamp(2rem,5vw,4.2rem)] font-black uppercase leading-[0.92] tracking-tight">
                Posicionamiento SEO &<br />
                <span className="italic text-blue-600">Visibilidad en Google.</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="mt-7 max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg">
                Posicionamos tu empresa en las primeras opciones de Google en Chile. Combinamos SEO técnico de alto rendimiento, optimización geográfica local y palabras clave de alta intención comercial.
              </motion.p>

              <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
                {METRICAS.map((m) => (
                  <div key={m.l} className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
                    <span className="block text-xl font-black text-slate-950">{m.v}</span>
                    <span className="mt-1 block font-mono text-[8px] uppercase tracking-widest text-blue-600">{m.l}</span>
                  </div>
                ))}
              </div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }} className="relative overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-slate-950 p-6 text-white shadow-xl shadow-blue-950/20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(34,211,238,.25),transparent_35%),linear-gradient(180deg,#020617,#0f172a)]" />
              <div className="relative z-10">
                <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-cyan-200">Estrategia SEO Integral</p>
                <div className="mt-6 space-y-4">
                  {[
                    ["Público objetivo", "Búsquedas genéricas", "Intención comercial"],
                    ["Código", "Sin estructura", "Schema JSON-LD"],
                    ["Velocidad", "Carga lenta", "PageSpeed 100/100"],
                    ["Visibilidad", "Página 3 o más", "Top Google Chile"],
                  ].map(([a, b, c]) => (
                    <div key={a} className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 text-xs">
                      <span className="font-black text-slate-300">{a}</span>
                      <span className="text-slate-500">→</span>
                      <span className="text-right font-black text-cyan-200">{c}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4">
                  <p className="text-sm font-black uppercase tracking-tight">Objetivo: atraer clientes calificados listos para cotizar tu servicio.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-6">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-blue-600">Pilares de posicionamiento</p>
          <h2 className="mt-4 max-w-3xl text-[clamp(1.8rem,3.2vw,2.7rem)] font-black leading-tight tracking-tight">
            SEO técnico, contenido estratégico y presencia local.
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SEO_PILAS.map((item) => (
              <div key={item.titulo} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-50">
                <span className="text-2xl">{item.icon}</span>
                <h3 className="mt-4 text-sm font-black uppercase tracking-tight">{item.titulo}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f0f7ff] px-5 py-16 md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-blue-600">Metodología</p>
              <h2 className="mt-4 text-[clamp(1.8rem,3vw,2.5rem)] font-black leading-tight tracking-tight">
                Paso a paso para conquistar la primera página de Google.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {PROCESO.map((step) => (
                <div key={step.n} className="rounded-2xl border border-blue-100 bg-white p-5">
                  <span className="font-mono text-[10px] font-black text-blue-600">{step.n}</span>
                  <h3 className="mt-3 text-sm font-black uppercase tracking-tight">{step.t}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">{step.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-blue-600">Entregables</p>
              <h2 className="mt-4 text-[clamp(1.8rem,3vw,2.5rem)] font-black leading-tight tracking-tight">
                Qué incluye la estrategia SEO.
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {ENTREGABLES.map((item) => (
                <div key={item} className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm font-bold text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            {PLANES.map((plan) => (
              <PlanCard key={plan.nombre} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-6">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-slate-950 p-7 text-center text-white shadow-xl shadow-blue-950/20 md:p-10">
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-cyan-200">¿Quieres que más clientes te encuentren en Google?</p>
          <h2 className="mt-4 text-2xl font-black uppercase tracking-tight md:text-3xl">Posiciona tu negocio hoy.</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-300">
            Auditamos la visibilidad de tu sitio web, analizamos las palabras clave con intención de venta y diseñamos el plan para llevarte a los primeros lugares.
          </p>
          <Link href="/contacto" className="mt-8 inline-flex rounded-2xl bg-white px-7 py-3.5 text-xs font-black uppercase tracking-widest text-slate-950 transition hover:scale-[1.02]">
            Solicitar propuesta SEO
          </Link>
        </div>
      </section>
    </main>
  );
}
