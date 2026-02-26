"use client";

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// ─── Data ─────────────────────────────────────────────────────────────────────
const SERVICIOS = [
  {
    slug: 'desarrollo-web-pro',
    num: '01',
    titulo: 'Desarrollo Web',
    subtitulo: 'Architecture & Scalability',
    desc: 'Diseñamos aplicaciones web de alto rendimiento con arquitecturas modulares y escalables, preparadas para soportar crecimiento masivo sin comprometer velocidad ni estabilidad.',
    tags: ['Next.js 15', 'TypeScript', 'PostgreSQL', 'Etc'],
    acento: 'bg-blue-600',
    desde: 'USD 600',
  },
  {
    slug: 'ecommerce-alta-conversion',
    num: '02',
    titulo: 'E-commerce',
    subtitulo: 'Conversion & CX',
    desc: 'Construimos ecosistemas transaccionales optimizados desde la psicología del usuario y la analítica avanzada, maximizando tasa de conversión, ticket promedio y retención.',
    tags: ['Stripe', 'Headless', 'Analytics', 'Etc'],
    acento: 'bg-indigo-500',
    desde: 'USD 3200',
  },
  {
    slug: 'desarrollo-movil',
    num: '03',
    titulo: 'Apps Móviles',
    subtitulo: 'Mobile Engineering',
    desc: 'Desarrollamos aplicaciones nativas y multiplataforma con experiencias fluidas, rendimiento nativo y arquitectura lista para escalar a millones de usuarios.',
    tags: ['React Native', 'Expo', 'iOS', 'Android'],
    acento: 'bg-rose-500',
    desde: 'USD 4000',
  },

  {
    slug: 'ingenieria-software',
    num: '04',
    titulo: 'Ingeniería de Software',
    subtitulo: 'Enterprise Software',
    desc: 'Diseñamos y construimos el núcleo operativo de las empresas mediante software robusto y escalable. Creamos soluciones a medida que garantizan la integridad de los datos y optimizan la toma de decisiones estratégicas.',
    tags: ['Node.js', 'typescript', 'Aws', 'Etc'],
    acento: 'bg-sky-900',
    desde: 'USD 3000',
  },
  {
    slug: 'automatizacion-procesos',
    num: '05',
    titulo: 'Automatización',
    subtitulo: 'Efficiency Engineering',
    desc: 'Diseñamos flujos automatizados que eliminan redundancias operativas y errores humanos, integrando sistemas y optimizando procesos internos.',
    tags: ['Zapier', 'n8n', 'APIs', 'Etc'],
    acento: 'bg-sky-500',
    desde: 'USD 600',
  },
  {
    slug: 'estrategia-ux-cx',
    num: '06',
    titulo: 'Estrategia UX/CX',
    subtitulo: 'Master Consultancy',
    desc: 'Auditoría integral de experiencia digital. Detectamos fricciones invisibles, optimizamos journeys y rediseñamos interacciones para maximizar conversión y fidelización.',
    tags: ['Auditoría', 'Testing', 'Heatmaps', 'Etc'],
    acento: 'bg-emerald-500',
    desde: 'USD 1000',
    disabled: true,
    
  },
    {
    slug: 'sistemas-inteligentes-ia',
    num: '07',
    titulo: 'IA & Data Science',
    subtitulo: 'Cognitive Systems',
    desc: 'Desarrollamos modelos predictivos, automatización inteligente y pipelines de datos que transforman información operativa en decisiones estratégicas basadas en evidencia.',
    tags: ['Python', 'ML', 'Supabase', 'Etc'],
    acento: 'bg-violet-600',
    desde: 'USD 6000',
    disabled: true, // <--- DESACTIVADO TEMPORALMENTE
  },
];

// ─── Lógica de Conversión ─────────────────────────────────────────────────────
const VALOR_USD_CLP = 970; // Valor promedio para estabilidad de precios

const formatCLP = (usdString: string) => {
  // Extraemos solo los números del string (ej: "USD 700" -> 700)
  const usdValue = parseInt(usdString.replace(/[^0-9]/g, ''), 10);
  const clpValue = usdValue * VALOR_USD_CLP;
  
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(clpValue);
};
// ─── Service Row (Actualizado con conversión) ────────────────────────────────
function ServicioRow({ s, index }: { s: typeof SERVICIOS[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  // Si está desactivado, convertimos el Link en un div para que no sea clickeable
  const Container = s.disabled ? 'div' : Link;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={s.disabled ? 'cursor-not-allowed opacity-40 grayscale' : ''}
    >
      <Container
        href={s.disabled ? '#' : `/servicios/${s.slug}`}
        className="group flex flex-col md:flex-row md:items-center gap-5 md:gap-0 py-7 md:py-8 border-b border-slate-100 transition-all duration-300 relative"
      >
        {!s.disabled && (
          <div className="absolute inset-0 bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none -mx-4 px-4" />
        )}

        {/* Número y Badge de Estado */}
        <div className="w-10 shrink-0 relative z-10 flex flex-col gap-1">
            <span className="font-mono text-[10px] text-slate-300">{s.num}</span>
            {s.disabled && <span className="text-[6px] font-black bg-slate-200 text-slate-500 px-1 py-0.5 rounded uppercase leading-none w-fit">Off</span>}
        </div>

        <div className={`w-2.5 h-2.5 rounded-full ${s.disabled ? 'bg-slate-300' : s.acento} shrink-0 mr-6 hidden md:block relative z-10`} />

        <div className="flex-1 min-w-0 relative z-10">
          <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-slate-900 leading-tight">
            {s.titulo}
            {s.disabled && <span className="block text-[10px] text-red-500 font-bold mt-1 tracking-widest italic">TEMPORALMENTE NO DISPONIBLE</span>}
          </h3>
          <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-slate-400 mt-0.5">{s.subtitulo}</p>
        </div>

        <p className="text-sm text-slate-500 leading-relaxed md:w-64 lg:w-80 shrink-0 relative z-10 md:px-6">
          {s.desc}
        </p>

        <div className="hidden lg:flex flex-wrap items-center gap-2 w-48 shrink-0 relative z-10">
          {s.tags.map(t => (
            <span key={t} className="text-[8px] font-bold uppercase tracking-wide text-slate-00 bg-slate-50 border text-blue-600 px-2 py-0.5 rounded-md">
              {t}
            </span>
          ))}
        </div>

        <div className="md:text-right shrink-0 relative z-10 md:pl-6 min-w-[120px]">
          <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 block mb-1">Desde</span>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-black text-slate-900 leading-none">{s.desde}</span>
            <div className="flex flex-col items-start md:items-end">
              <span className="text-[11px] font-bold text-slate-400 leading-none">{formatCLP(s.desde)}</span>
            </div>
          </div>
        </div>

        <div className="ml-0 md:ml-6 shrink-0 relative z-10">
          <div className={`w-9 h-9 rounded-full border ${s.disabled ? 'border-slate-100' : 'border-slate-200 group-hover:border-blue-600 group-hover:bg-blue-600'} flex items-center justify-center transition-all duration-300`}>
            {s.disabled ? (
                <span className="text-slate-300 text-xs">🔒</span>
            ) : (
                <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
            )}
          </div>
        </div>
      </Container>
    </motion.div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function ServiciosPage() {
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: '-60px' });

  return (
    <main className="min-h-screen bg-white text-slate-900 overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="pt-24 md:pt-32 pb-0 px-5 md:px-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(170deg, #f0f7ff 0%, #ffffff 50%)' }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{ backgroundImage: 'linear-gradient(#2563eb 1px,transparent 1px),linear-gradient(90deg,#2563eb 1px,transparent 1px)', backgroundSize: '52px 52px' }} />
        <div className="absolute -top-24 -left-24 w-[400px] h-[400px] bg-blue-100 rounded-full blur-[100px] opacity-50 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 bg-white border border-blue-100 shadow-sm px-3.5 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-blue-700">Engineering Portfolio</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-end pb-16 md:pb-20">
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}>
              <h1 className="text-[clamp(2.8rem,8vw,6.5rem)] font-black leading-[0.85] tracking-tighter text-slate-900 uppercase mb-6">
                UNIDADES<br />
                <span className="text-blue-600 italic">TÁCTICAS.</span>
              </h1>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:pb-3">
              <p className="text-base md:text-lg text-slate-500 leading-relaxed mb-6 max-w-md">
                Seis especialidades de ingeniería diseñadas para transformar su operación digital bajo estándares avanzados de{' '}
                <span className="text-slate-900 font-semibold">arquitectura, rendimiento y escalabilidad.</span>
              </p>
              <div className="flex gap-6">
                {[{ v: '6', l: 'Servicios' }, { v: '40+', l: 'Proyectos' }, { v: '99.9%', l: 'Uptime' }].map(s => (
                  <div key={s.l} className="pl-3 border-l-2 border-blue-200">
                    <span className="block text-xl font-black text-slate-900 tracking-tighter">{s.v}</span>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-blue-600">{s.l}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-blue-600 via-indigo-400 to-transparent" />
        </div>
      </section>

      {/* Lista de Servicios Filtrada */}
      <section className="px-5 md:px-6 py-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Cabecera de la tabla (Solo Desktop) */}
          <div className="hidden md:flex items-center gap-0 py-3 mb-2 border-b text-slate-200">
            <span className="font-mono text-[8px] uppercase tracking-widest text-slate-900 w-10 shrink-0">#</span>
            <div className="w-2.5 mr-6 hidden md:block" />
            <span className="font-mono text-[8px] uppercase tracking-widest text-slate-900 flex-1">Unidad de Ingeniería</span>
            <span className="font-mono text-[8px] uppercase tracking-widest text-slate-900 w-64 lg:w-80 shrink-0 px-6 hidden md:block">Alcance Técnico</span>
            <span className="font-mono text-[8px] uppercase tracking-widest text-slate-900 w-48 shrink-0 hidden lg:block">Core Stack</span>
            <span className="font-mono text-[8px] uppercase tracking-widest text-slate-900 w-24 shrink-0 text-right">Inversión</span>
            <div className="w-9 ml-6" />
          </div>

          {/* Mapeamos la lista completa 'SERVICIOS'. 
            La lógica de "gris y desactivado" ya está dentro del componente ServicioRow.
          */}
          {SERVICIOS.map((s, i) => (
            <ServicioRow key={s.slug} s={s} index={i} />
          ))}
        </div>
      </section>

      {/* ── TRUST SECTION ────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 px-5 md:px-6 relative overflow-hidden"
        style={{ backgroundColor: '#f8fafc' }}>
        <div className="absolute inset-0 pointer-events-none opacity-40"
          style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '22px 22px' }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: '🎓', title: 'Respaldo Académico', desc: 'Cada solución se fundamenta en metodologías formales de ingeniería de software y arquitectura de sistemas de nivel Magíster.' },
              { icon: '⚡', title: 'Entrega Iterativa', desc: 'Trabajamos con sprints semanales y demostraciones en vivo. El progreso es transparente y medible desde el primer día.' },
              { icon: '🔒', title: 'Gestión y Administración Continua', desc: 'El código y la infraestructura son gestionados por Yonko bajo un modelo de administración mensual. Nos encargamos del mantenimiento, actualizaciones, seguridad y optimización continua para garantizar estabilidad, rendimiento y evolución constante del sistema.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-7 border border-slate-100 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-50 transition-all duration-400 hover:-translate-y-0.5"
              >
                <span className="text-2xl mb-4 block">{item.icon}</span>
                <h3 className="text-sm font-black uppercase tracking-tight text-slate-900 mb-2">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ RÁPIDO ────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 px-5 md:px-6 bg-white">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent mb-16" />

        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-10">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-blue-600 mb-2">Preguntas frecuentes</p>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-slate-900">
              Lo que <span className="text-blue-600 italic">preguntan.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-100 rounded-3xl overflow-hidden border border-slate-100">
            {[
              { q: '¿Cuánto tarda un proyecto?', a: 'Depende del alcance y complejidad. Un sitio web profesional puede entregarse en 2–4 semanas. Sistemas empresariales avanzados pueden requerir entre 2 y 4 meses bajo metodología iterativa.' },
              { q: '¿Trabajan con empresas grandes?', a: 'Sí. Adaptamos nuestra metodología tanto a startups en crecimiento como a organizaciones consolidadas, integrándonos a sus equipos técnicos o directivos.' },
              { q: '¿Qué pasa después de entregar?', a: 'Ofrecemos planes de mantenimiento, soporte continuo y SLA definidos. Además, entregamos documentación estructurada para garantizar continuidad operativa.' },
              { q: '¿Puedo empezar con un servicio pequeño?', a: 'Por supuesto. Muchos clientes inician con una auditoría UX/CX, una automatización puntual, sitios web simples antes de escalar hacia soluciones más complejas.' },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="bg-white p-7 md:p-8 hover:bg-slate-50 transition-colors duration-300"
              >
                <p className="text-sm font-black text-slate-900 mb-2 uppercase tracking-tight">{faq.q}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section ref={ctaRef} className="py-14 md:py-20 px-5 md:px-6"
        style={{ background: 'repeating-linear-gradient(135deg,#f8fafc 0px,#f8fafc 20px,#f1f5f9 20px,#f1f5f9 21px)' }}>
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={ctaInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mx-auto bg-blue-600 rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden shadow-2xl shadow-blue-200"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -mr-40 -mt-40 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-blue-800/40 rounded-full blur-2xl -ml-28 -mb-28 pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none opacity-[0.07]"
            style={{ backgroundImage: 'radial-gradient(#fff 1px,transparent 1px)', backgroundSize: '20px 20px' }} />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-blue-200 mb-3">¿Listo para empezar?</p>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-[0.9] text-white mb-3">
                Hablemos de<br />su proyecto.
              </h2>
              <p className="text-blue-100 text-sm md:text-base font-light max-w-sm">
                Primera consultoría gratuita de 30 minutos. Sin compromiso.
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <Link href="/contacto"
                className="group inline-flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.03] active:scale-[0.98] transition-all shadow-xl whitespace-nowrap">
                Agendar Consultoría
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link href="/proyectos"
                className="inline-flex items-center justify-center gap-2 text-blue-200 hover:text-white text-xs uppercase tracking-widest font-bold transition-colors">
                Ver proyectos →
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

    </main>
  );
}