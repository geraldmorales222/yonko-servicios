"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// ─── Data ─────────────────────────────────────────────────────────────────────
const SPECS = [
  {
    icon: '⚙️',
    titulo: 'Arquitectura de Componentes',
    desc: 'Sistemas modulares con patrones de diseño avanzados (Atomic Design, Feature Slicing). Código mantenible que escala con su equipo.',
  },
  {
    icon: '🔍',
    titulo: 'SEO Técnico Estructural',
    desc: 'Indexación optimizada con Server Side Rendering, metadatos dinámicos, sitemap automático y Core Web Vitals en verde.',
  },
  {
    icon: '🔒',
    titulo: 'Seguridad de Aplicación',
    desc: 'Protección contra XSS, CSRF, SQL Injection y OWASP Top 10 desde el núcleo. Autenticación JWT y gestión de sesiones segura.',
  },
  {
    icon: '⚡',
    titulo: 'Performance Extrema',
    desc: 'Lighthouse 100/100, lazy loading inteligente, edge caching y compresión de assets. Carga en menos de 1 segundo.',
  },
  {
    icon: '📱',
    titulo: 'Responsive & Accesible',
    desc: 'Diseño mobile-first con breakpoints precisos. Cumplimiento WCAG 2.1 AA para máxima cobertura de usuarios.',
  },
  {
    icon: '🔗',
    titulo: 'Integraciones & APIs',
    desc: 'Conexión con CRMs, ERPs, pasarelas de pago y servicios externos. Arquitectura headless lista para cualquier backend.',
  },
];

const PLANES = [
  {
    nombre: 'Presencia Básica',
    desc: 'Landing profesional para emprendedores que necesitan presencia digital inmediata.',
    incluye: [
      '1 página tipo landing',
      'Diseño optimizado',
      'Formulario de contacto',
      'Responsive completo',
      'Deploy inicial'
    ],
    cta: 'Contratar Básico',
    destacado: false,
  },
  {
    nombre: 'Web Profesional',
    desc: 'Sitio web corporativo con diseño personalizado y estructura escalable.',
    incluye: [
      'Hasta 8 páginas',
      'UI personalizado',
      'SEO técnico base',
      'CMS integrado',
      'Optimización rendimiento'
    ],
    cta: 'Contratar Profesional',
    destacado: true,
  },
  {
    nombre: 'Plataforma Business',
    desc: 'Aplicación web con autenticación y lógica de negocio.',
    incluye: [
      'Auth & roles',
      'Dashboard admin',
      'API REST',
      'Base de datos PostgreSQL',
      'Arquitectura escalable'
    ],
    cta: 'Contratar Business',
    destacado: false,
  },
  {
    nombre: 'Sistema Avanzado',
    desc: 'Plataformas avanzadas listas para escalar y soportar crecimiento acelerado.',
    incluye: [
      'Arquitectura modular',
      'Integraciones externas',
      'Optimización avanzada',
      'Seguridad reforzada',
      'Documentación técnica'
    ],
    cta: 'Solicitar Evaluación',
    destacado: false,
  },
  {
    nombre: 'Enterprise',
    desc: 'Arquitectura distribuida para empresas de alto tráfico.',
    incluye: [
      'Microservicios',
      'CI/CD',
      'Monitoreo & SLA',
      'Capacitación técnica',
      'Soporte prioritario'
    ],
    cta: 'Agendar Llamada',
    especial: true,
  },

];
const PLANES_MENSUALES = [
  {
    nombre: 'Plan Base',
    desc: 'Solo mantener online. Infraestructura compartida estable.',
    incluye: ['Hosting compartido', 'Dominio estándar', 'SSL automático', 'Backup mensual'],
    noIncluye: ['Soporte técnico', 'Cambios de contenido', 'Actualizaciones'],
    acento: 'border-cyan-100 bg-cyan-50/30',
  },
  {
    nombre: 'Plan Business',
    desc: 'Infraestructura administrada para webs profesionales pequeñas.',
    incluye: ['Hosting dedicado/VPS', 'Dominio + SSL', 'Backups programados', 'Actualizaciones de seguridad', 'Soporte por correo'],
    acento: 'border-blue-100 bg-blue-50/30',
  },
  {
    nombre: 'Plan Pro',
    desc: 'Continuidad operativa y partner técnico activo.',
    incluye: ['Infraestructura optimizada', 'Backups diarios', 'Monitoreo activo', '1 ajuste menor mensual', 'Soporte prioritario'],
    acento: 'border-blue-100 bg-blue-50/30',
  },
  {
    nombre: 'Plan Scale',
    desc: 'Operación estratégica para plataformas de alto tráfico.',
    incluye: ['Infraestructura escalable', 'Monitoreo con alertas', 'Soporte según acuerdo', 'Roadmap técnico', 'Mejoras evolutivas'],
    acento: 'border-slate-200 bg-slate-50',
  },
];
const PROCESO = [
  { n: '01', t: 'Discovery', d: 'Entendemos su negocio, usuarios y objetivos técnicos.' },
  { n: '02', t: 'Arquitectura', d: 'Diseñamos la estructura técnica, definimos el stack y documentamos.' },
  { n: '03', t: 'Diseño UI/UX', d: 'Requerimientos con todos los flujos aprobado por usted antes de codear.' },
  { n: '04', t: 'Desarrollo', d: 'Construimos por etapas visibles, ajustando el ritmo de avance según alcance, prioridades y forma de coordinación del cliente.' },
  { n: '05', t: 'QA & Deploy', d: 'Revisamos funcionamiento, rendimiento, versión mobile y puesta en producción antes del lanzamiento.' },
];

// ─── Subcomponentes ───────────────────────────────────────────────────────────
function SpecCard({ spec, index }: { spec: typeof SPECS[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group bg-white border border-slate-100 rounded-2xl p-6 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-50 hover:-translate-y-1 transition-all duration-400"
    >
      <span className="text-2xl mb-4 block">{spec.icon}</span>
      <h3 className="text-sm font-black uppercase tracking-tight text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{spec.titulo}</h3>
      <p className="text-xs text-slate-500 leading-relaxed">{spec.desc}</p>
    </motion.div>
  );
}

function PlanCard({ plan, index }: { plan: typeof PLANES[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`relative rounded-[1.75rem] p-5 sm:p-6 flex flex-col border transition-all duration-300
        ${plan.especial ? 'border-blue-200 bg-blue-50/30' : ''}
        ${plan.destacado
          ? 'bg-slate-950 text-white border-cyan-300/20 shadow-xl shadow-blue-950/20 z-10'
          : 'bg-white text-slate-900 border-slate-100 hover:border-blue-100'
        }`}
    >
      {plan.destacado && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-xl">
          Arquitectura recomendada
        </div>
      )}

      <div className="mb-6">
        <p className={`font-mono text-[9px] uppercase tracking-[0.25em] mb-2 ${plan.destacado ? 'text-blue-200' : 'text-blue-600'}`}>
          {plan.nombre}
        </p>
        
        <div className="flex flex-col gap-1 mb-3">
          <div>
            <p className={`text-xs font-black uppercase tracking-[0.22em] mb-2 ${plan.destacado ? 'text-white/70' : 'text-slate-400'}`}>Alcance</p>
            <p className={`text-2xl font-black tracking-tighter leading-none ${plan.destacado ? 'text-white' : 'text-slate-900'}`}>Cotizar</p>
            <p className={`text-xs font-semibold mt-2 ${plan.destacado ? 'text-white/75' : 'text-slate-600'}`}>Cotización según diagnóstico.</p>
          </div>
        </div>
        
        <p className={`text-xs leading-relaxed ${plan.destacado ? 'text-blue-100' : 'text-slate-500'}`}>{plan.desc}</p>
      </div>

      <ul className="space-y-2.5 mb-8 flex-1">
        {plan.incluye.map((item) => (
          <li key={item} className="flex items-center gap-2.5 text-xs">
            <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-[9px]
              ${plan.destacado ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-600'}`}>✓</span>
            <span className={plan.destacado ? 'text-blue-50' : 'text-slate-600'}>{item}</span>
          </li>
        ))}
      </ul>

      <Link
        href="/contacto"
        className={`w-full py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest text-center transition-all
          ${plan.destacado
            ? 'bg-white text-blue-600 hover:bg-slate-50 shadow-lg'
            : 'bg-slate-900 text-white hover:bg-blue-700'
          }`}
      >
        {plan.cta}
      </Link>
    </motion.div>
  );
}
function PlanMensualCard({ plan, index }: { plan: typeof PLANES_MENSUALES[0]; index: number }) {
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className={`p-5 rounded-[1.5rem] border ${plan.acento} flex flex-col h-full hover:shadow-xl transition-all group relative overflow-hidden`}
    >
      <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-1">{plan.nombre}</h3>
      
      <div className="mb-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">Continuidad</p>
          <p className="mt-1 text-sm font-black text-slate-900">Cotizar</p>
          <p className="mt-1 text-[10px] font-semibold text-slate-500">Se define según operación real.</p>
        </div>
      </div>

      <p className="text-[11px] text-slate-500 leading-relaxed mb-6 italic">"{plan.desc}"</p>
      
      <div className="space-y-4 flex-1">
        <div>
          <p className="text-[8px] font-black uppercase text-slate-400 mb-2 tracking-widest">Incluye:</p>
          <ul className="space-y-2">
            {plan.incluye.map(i => (
              <li key={i} className="text-[10px] text-slate-600 flex items-center gap-2 font-semibold">
                <span className="w-1 h-1 bg-blue-400 rounded-full" /> {i}
              </li>
            ))}
          </ul>
        </div>

        {plan.noIncluye && (
          <div className="pt-4 border-t border-slate-100">
            <p className="text-[8px] font-black uppercase text-slate-300 mb-2 tracking-widest">No incluye:</p>
            <ul className="space-y-1 opacity-50">
              {plan.noIncluye.map(i => (
                <li key={i} className="text-[9px] text-slate-400 flex items-center gap-2 line-through decoration-slate-300">{i}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <Link href="/contacto" className="mt-6 w-full py-3 bg-white border border-slate-200 text-slate-900 font-black text-[9px] uppercase tracking-[0.2em] rounded-xl hover:bg-blue-700 hover:text-white hover:border-transparent transition-all text-center">
        Suscribir
      </Link>
    </motion.div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function DesarrolloWebPage() {
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: '-60px' });

  return (
    <main className="min-h-screen bg-white text-slate-900 overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-20 px-5 md:px-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #f0f7ff 0%, #ffffff 55%)' }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{ backgroundImage: 'linear-gradient(#2563eb 1px,transparent 1px),linear-gradient(90deg,#2563eb 1px,transparent 1px)', backgroundSize: '52px 52px' }} />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[120px] opacity-50 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Back */}
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <Link href="/servicios" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors text-xs font-bold uppercase tracking-widest mb-10 group">
              <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Todos los servicios
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              {/* Badge */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
                className="inline-flex items-center gap-2 bg-white border border-blue-100 shadow-sm px-3.5 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-blue-700">Architecture & Scalability</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(2.15rem,5.4vw,4.6rem)] font-black leading-[0.85] tracking-tighter uppercase mb-6"
              >
                WEB<br />
                <span className="text-blue-600 italic">Engineering.   </span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
                className="text-base md:text-lg text-slate-500 leading-relaxed mb-8 max-w-md">
                Interfaces que no solo se ven bien — construidas bajo estándares de ingeniería para soportar{' '}
                <span className="text-slate-900 font-semibold">millones de peticiones con latencia mínima.</span>
              </motion.p>

              {/* Métricas hero */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
                className="flex flex-wrap gap-5">
                {[
                  { v: '100', u: '/100', l: 'Lighthouse Score' },
                  { v: '<1s', u: '', l: 'Tiempo de carga' },
                  { v: '99.9%', u: '', l: 'Uptime SLA' },
                ].map((m) => (
                  <div key={m.l} className="bg-white border border-slate-100 rounded-2xl px-5 py-4 shadow-sm">
                    <span className="block text-2xl font-black text-slate-900 tracking-tighter tabular-nums">
                      {m.v}<span className="text-blue-600">{m.u}</span>
                    </span>
                    <span className="font-mono text-[8px] uppercase tracking-widest text-slate-400">{m.l}</span>
                  </div>
                ))}
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex min-h-[360px] items-center justify-center overflow-hidden rounded-[2.5rem] border border-blue-100 bg-white/75 p-8 shadow-2xl shadow-blue-100/60"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(59,130,246,.16),transparent_42%)]" />
              <div className="absolute bottom-8 h-28 w-72 rounded-full bg-blue-200/30 blur-3xl" />
              <Image
                src="/imagenes/yonko_desarrolloweb.png"
                alt="Equipo desarrollando una solución web"
                width={520}
                height={520}
                className="relative z-10 h-auto w-full max-w-[360px] object-contain drop-shadow-2xl xl:max-w-[430px]"
                priority
              />
              <div className="absolute bottom-5 left-5 right-5 z-20 rounded-2xl border border-white/70 bg-white/85 px-4 py-3 shadow-lg backdrop-blur">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">Solución en desarrollo</p>
                <p className="mt-1 text-sm font-semibold leading-snug text-slate-700">Velocidad, arquitectura y confianza desde la primera carga.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SPECS ─────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-5 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-blue-600 mb-2">Especificaciones técnicas</p>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
                Qué está <span className="text-blue-600 italic">incluido.</span>
              </h2>
            </div>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SPECS.map((spec, i) => <SpecCard key={i} spec={spec} index={i} />)}
            </div>
            <div className="hidden lg:block">
<div className="lg:sticky lg:top-28">
            
            
                        {/* Visual tech stack */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.94 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                          className="hidden lg:block"
                        >
                          <div className="relative bg-slate-900 rounded-2xl p-4 shadow-lg overflow-hidden">
                            {/* Terminal header */}
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-3 h-3 rounded-full bg-red-400" />
                              <div className="w-3 h-3 rounded-full bg-yellow-400" />
                              <div className="w-3 h-3 rounded-full bg-green-400" />
                              <span className="font-mono text-[10px] text-slate-500 ml-3">architecture.config.ts</span>
                            </div>
                            {/* Código decorativo */}
                            <div className="font-mono text-[11px] space-y-2">
                              <p><span className="text-blue-400">const</span> <span className="text-white">stack</span> <span className="text-slate-400">=</span> <span className="text-yellow-300">{'{'}</span></p>
                              <p className="pl-4"><span className="text-green-400">framework</span><span className="text-slate-400">:</span> <span className="text-orange-300">'Next.js 15'</span><span className="text-slate-400">,</span></p>
                              <p className="pl-4"><span className="text-green-400">language</span><span className="text-slate-400">:</span> <span className="text-orange-300">'TypeScript'</span><span className="text-slate-400">,</span></p>
                              <p className="pl-4"><span className="text-green-400">database</span><span className="text-slate-400">:</span> <span className="text-orange-300">'PostgreSQL'</span><span className="text-slate-400">,</span></p>
                              <p className="pl-4"><span className="text-green-400">deploy</span><span className="text-slate-400">:</span> <span className="text-orange-300">'Vercel Edge'</span><span className="text-slate-400">,</span></p>
                              <p className="pl-4"><span className="text-green-400">lighthouse</span><span className="text-slate-400">:</span> <span className="text-blue-300">100</span><span className="text-slate-400">,</span></p>
                              <p className="pl-4"><span className="text-green-400">uptime</span><span className="text-slate-400">:</span> <span className="text-blue-300">99.9</span><span className="text-slate-400">,</span></p>
                              <p><span className="text-yellow-300">{'}'}</span></p>
                              <p className="mt-4"><span className="text-slate-500">// ✓ Ready for production</span></p>
                              <p className="flex items-center gap-2">
                                <span className="text-green-400">▶</span>
                                <span className="text-white">npm run deploy</span>
                                <span className="inline-block w-2 h-4 bg-white/70 animate-pulse ml-1" />
                              </p>
                            </div>
                          </div>
                        </motion.div>
            
          </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESO ───────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-5 md:px-6 relative overflow-hidden"
        style={{ background: 'repeating-linear-gradient(135deg,#f8fafc 0px,#f8fafc 20px,#f1f5f9 20px,#f1f5f9 21px)' }}>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-10">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-blue-600 mb-2">Metodología</p>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
              Cómo lo <span className="text-blue-600 italic">construimos.</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Línea conectora — solo desktop */}
            <div className="hidden md:block absolute top-7 left-6 right-6 h-px bg-slate-200 z-0" />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
              {PROCESO.map((paso, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group bg-white border border-slate-100 rounded-2xl p-5 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-50 hover:-translate-y-1 transition-all duration-400"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mb-4">
                    <span className="font-mono text-[9px] font-black text-white">{paso.n}</span>
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-tight text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{paso.t}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{paso.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECCIÓN: ALCANCES ── */}
      <section className="py-14 md:py-20 px-5 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-blue-600 mb-2">Desarrollo & configuración</p>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter italic">Alcances — <span className="text-blue-600">Web.</span></h2>
            <p className="text-slate-500 text-sm mt-4 max-w-xl mx-auto">Cards para entender qué podemos construir. La cotización se define después de revisar alcance, objetivos e integraciones.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">
            {PLANES.map((plan, i) => <PlanCard key={i} plan={plan} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── SECCIÓN: CONTINUIDAD ── */}
      <section className="py-14 md:py-20 px-5 md:px-6 bg-[#F8FAFC] border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-blue-600 mb-2">Operación & continuidad</p>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none">Managed <span className="italic text-slate-400">Web.</span></h2>
              <p className="text-slate-500 text-sm mt-6 leading-relaxed">
                Acompañamiento técnico para mantener el sitio estable, seguro y útil después del lanzamiento.
                <span className="text-slate-900 font-bold ml-2 underline decoration-blue-500 decoration-2 underline-offset-4 text-xs">Cotización según alcance</span>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {PLANES_MENSUALES.map((plan, i) => <PlanMensualCard key={i} plan={plan} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section ref={ctaRef} className="py-14 md:py-20 px-5 md:px-6 bg-slate-50">
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={ctaInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto rounded-[2rem] border border-cyan-300/20 bg-slate-950 p-7 sm:p-8 md:p-10 relative overflow-hidden shadow-xl shadow-blue-950/20"
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/25 rounded-full blur-3xl -mr-36 -mt-36 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-52 h-52 bg-cyan-400/10 rounded-full blur-2xl -ml-24 -mb-24 pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none opacity-[0.07]"
            style={{ backgroundImage: 'radial-gradient(#fff 1px,transparent 1px)', backgroundSize: '20px 20px' }} />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-cyan-200 mb-3">Primer paso</p>
              <h2 className="text-2xl md:text-3xl font-black tracking-tighter uppercase leading-[0.9] text-white mb-3">
                Consultoría gratuita<br />de 30 minutos.
              </h2>
              <p className="text-cyan-100/80 text-sm font-light max-w-sm">
                Analizamos su proyecto sin compromiso y le decimos exactamente qué necesita y cuánto costaría.
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <Link href="/contacto"
                className="group inline-flex items-center gap-3 bg-white text-slate-950 px-7 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl whitespace-nowrap">
                Agendar Ahora
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link href="/proyectos"
                className="inline-flex items-center justify-center gap-2 text-cyan-200 hover:text-white text-xs uppercase tracking-widest font-bold transition-colors">
                Ver proyectos web →
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

    </main>
  );
}
