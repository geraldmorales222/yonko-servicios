"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// ─── Data ─────────────────────────────────────────────────────────────────────
const FEATURES = [
  { icon: '📱', titulo: 'Apps iOS & Android', desc: 'Una sola base de código que corre de forma nativa en ambas plataformas, sin sacrificar rendimiento ni experiencia de usuario en ninguna de ellas.' },
  { icon: '⚡', titulo: 'Rendimiento Nativo', desc: 'Animaciones a 60fps, tiempo de carga inferior a 2 segundos y navegación fluida. Sus usuarios no notarán la diferencia con una app 100% nativa.' },
  { icon: '🔔', titulo: 'Push Notifications', desc: 'Sistema de notificaciones segmentadas y programadas que incrementan la retención y re-engagement de usuarios de forma medible.' },
  { icon: '🔗', titulo: 'Integración de APIs', desc: 'Conexión con cualquier backend, sistema de pago, CRM, ERP o servicio de terceros mediante arquitectura desacoplada y segura.' },
  { icon: '📶', titulo: 'Modo Offline', desc: 'Sincronización inteligente que permite operar sin conexión y actualizar datos automáticamente al reconectar, sin pérdida de información.' },
  { icon: '📊', titulo: 'Analytics & Crashlytics', desc: 'Instrumentación completa con métricas de comportamiento en tiempo real, detección de errores y reportes de uso para decisiones basadas en datos.' },
];


const METRICAS = [
  { icon: '🚀', titulo: 'Time to market', valor: '-40%', desc: 'Frente a desarrollo nativo separado para iOS y Android.' },
  { icon: '⭐', titulo: 'Rating promedio', valor: '4.7★', desc: 'Calificación promedio en stores de las apps publicadas.' },
  { icon: '📲', titulo: 'Retención 30 días', valor: '+38%', desc: 'Con push notifications y onboarding optimizado.' },
  { icon: '💰', titulo: 'ROI de inversión', valor: '5x', desc: 'Retorno medido en los primeros 12 meses post-lanzamiento.' },
];

const ALCANCES_PROYECTO = [
  {
    nombre: 'MVP',
    desc: 'App funcional publicada en iOS y Android con funcionalidades core.',
    incluye: ['1 codebase (React Native)', 'Hasta 8 pantallas', 'Autenticación', 'Integración con 1 API', 'Push notifications', 'Publicación en Stores', 'Deploy backend inicial'],
    cta: 'Agendar diagnóstico',
    destacado: false,
  },
  {
    nombre: 'Product',
    desc: 'App completa lista para escalar con pagos y panel administrativo.',
    incluye: ['Pantallas ilimitadas', 'Pagos (Stripe/MP)', 'Analytics & Crashlytics', 'Modo offline con sync', 'Panel admin web', 'Backend escalable', 'Arquitectura senior'],
    cta: 'Agendar diagnóstico',
    destacado: true,
  },
  {
    nombre: 'Enterprise',
    desc: 'Arquitectura compleja para plataformas móviles de alto impacto.',
    incluye: ['Arquitectura custom', 'Integración ERP / CRM', 'Seguridad avanzada', 'CI/CD Pipeline', 'SLA garantizado', 'Infraestructura distribuida', 'Roadmap evolutivo'],
    cta: 'Agendar Llamada',
    destacado: false,
  },
];

const CONTINUIDAD_MOBILE = [
  {
    nombre: 'Mobile Basic Care',
    target: 'Para MVP simples',
    desc: 'Mantenimiento crítico de servidores y base de datos para apps iniciales.',
    incluye: ['Hosting backend', 'BD gestionada', 'SSL + Backups diarios', 'Monitoreo básico', 'Soporte ante incidentes'],
    noIncluye: ['Nuevas funciones', 'Mejoras de UI', 'Gestión de Stores'],
    acento: 'border-cyan-100 bg-cyan-50/30',
  },
  {
    nombre: 'Mobile Business Care',
    target: 'Para apps Product',
    desc: 'Continuidad operativa y partner técnico para escalar el negocio.',
    incluye: ['Infraestructura elástica', 'BD optimizada', 'Actualizaciones dependencias', '1 ajuste técnico mensual', 'Gestión básica de Stores'],
    acento: 'border-blue-100 bg-blue-50/30',
  },
  {
    nombre: 'Mobile Scale / SaaS',
    target: 'Para ingresos reales',
    desc: 'Operación avanzada para infraestructuras cloud críticas según el nivel de soporte requerido.',
    incluye: ['Infraestructura Cloud Pro', 'Auto-scaling activo', 'Monitoreo con alertas', 'Soporte según acuerdo', 'Gestión de releases'],
    acento: 'border-slate-200 bg-slate-50',
  },
];

const PROCESO = [
  { n: '01', t: 'Discovery', d: 'Definimos el problema, el usuario objetivo y las funcionalidades core. Entregamos un mapa de producto claro antes de escribir código.' },
  { n: '02', t: 'UX & Diseño', d: 'Wireframes y prototipos interactivos en Figma. Testamos el flujo con usuarios reales antes de desarrollar.' },
  { n: '03', t: 'Desarrollo', d: 'Construimos la app por etapas funcionales, con avances revisables en dispositivo según el alcance definido.' },
  { n: '04', t: 'QA & Testing', d: 'Pruebas exhaustivas en dispositivos reales iOS y Android, cobertura de edge cases y performance testing.' },
  { n: '05', t: 'Publicación', d: 'Gestión completa del proceso de revisión en App Store y Google Play hasta aprobación y lanzamiento.' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────
function FeatureCard({ f, index }: { f: typeof FEATURES[0]; index: number }) {
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
      <span className="text-2xl mb-4 block">{f.icon}</span>
      <h3 className="text-sm font-black uppercase tracking-tight text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{f.titulo}</h3>
      <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
    </motion.div>
  );
}

function AlcanceProyectoCard({ plan, index }: { plan: typeof ALCANCES_PROYECTO[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`p-5 sm:p-6 rounded-[1.75rem] border flex flex-col h-full transition-all duration-300
        ${plan.destacado ? 'bg-slate-950 text-white shadow-xl shadow-blue-950/20 ring-1 ring-cyan-300/20 z-10' : 'bg-white border-slate-100'}`}
    >
      <p className={`font-mono text-[9px] uppercase tracking-widest mb-4 ${plan.destacado ? 'text-blue-200' : 'text-blue-500'}`}>{plan.nombre}</p>
      <div className="mb-6">
        <p className={`text-xs font-black uppercase tracking-[0.22em] mb-2 ${plan.destacado ? 'text-white/70' : 'text-slate-400'}`}>Alcance sugerido</p>
        <p className="text-2xl font-black tracking-tighter leading-none">Diagnóstico primero</p>
        <p className={`text-xs font-semibold mt-2 ${plan.destacado ? 'text-white/75' : 'text-slate-600'}`}>Definimos esfuerzo, stores, integraciones y prioridades antes de cotizar.</p>
      </div>
      <p className={`text-xs leading-relaxed mb-8 ${plan.destacado ? 'text-blue-100' : 'text-slate-500'}`}>{plan.desc}</p>
      <ul className="space-y-3 mb-8 flex-1">
        {plan.incluye.map(i => (
          <li key={i} className="flex items-center gap-3 text-xs font-medium">
            <span className={plan.destacado ? 'text-white' : 'text-blue-500'}>✓</span> {i}
          </li>
        ))}
      </ul>
      <Link href="/contacto" className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-center transition-all ${plan.destacado ? 'bg-white text-slate-950 shadow-lg' : 'bg-slate-900 text-white hover:bg-blue-700'}`}>
        {plan.cta}
      </Link>
    </motion.div>
  );
}

function ContinuidadMobileCard({ plan, index }: { plan: typeof CONTINUIDAD_MOBILE[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`p-5 rounded-[1.5rem] border ${plan.acento} flex flex-col h-full hover:shadow-xl transition-all`}
    >
      <div className="mb-4">
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-1">{plan.nombre}</h3>
        <p className="text-[9px] font-bold text-blue-500 uppercase tracking-tighter">{plan.target}</p>
      </div>
      <div className="mb-4">
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">Continuidad según operación</p>
        <p className="mt-1 text-sm font-black text-slate-900">Se recomienda después del lanzamiento</p>
      </div>
      <p className="text-[11px] text-slate-500 leading-relaxed mb-6 italic">"{plan.desc}"</p>
      <div className="space-y-4 flex-1">
        <ul className="space-y-2">
          {plan.incluye.map(i => (
            <li key={i} className="text-[10px] text-slate-600 flex items-center gap-2 font-semibold">
              <span className="w-1 h-1 bg-blue-400 rounded-full" /> {i}
            </li>
          ))}
        </ul>
        {plan.noIncluye && (
          <div className="pt-4 border-t border-slate-100 opacity-60">
            <p className="text-[8px] font-black uppercase text-slate-400 mb-2">No incluye:</p>
            <ul className="space-y-1">
              {plan.noIncluye.map(i => (
                <li key={i} className="text-[9px] text-slate-400 flex items-center gap-2 line-through">{i}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function DesarrolloMovilPage() {
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: '-60px' });

  return (
    <main className="min-h-screen bg-white text-slate-900 overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-20 px-5 md:px-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #f0f7ff 0%, #ffffff 55%)' }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(#2563eb 1px,transparent 1px),linear-gradient(90deg,#2563eb 1px,transparent 1px)', backgroundSize: '52px 52px' }} />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[120px] opacity-60 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <Link href="/servicios" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-500 transition-colors text-xs font-bold uppercase tracking-widest mb-10 group">
              <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Todos los servicios
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
                className="inline-flex items-center gap-2 bg-white border border-blue-100 shadow-sm px-3.5 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-blue-700">Mobile Engineering</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(2.15rem,5.4vw,4.6rem)] font-black leading-[0.85] tracking-tighter uppercase mb-6"
              >
                APPS QUE<br />
                <span className="text-blue-500 italic">retienen.</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
                className="text-base md:text-lg text-slate-500 leading-relaxed mb-8 max-w-md">
                Aplicaciones nativas y multiplataforma con experiencias fluidas,{' '}
                <span className="text-slate-900 font-semibold">publicadas en App Store y Google Play</span>{' '}
                con arquitectura lista para escalar.
              </motion.p>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
                className="flex flex-wrap gap-4">
                {[
                  { v: 'iOS+Android', l: 'Una sola base' },
                  { v: '4.7★', l: 'Rating promedio' },
                  { v: '-40%', l: 'Tiempo vs nativo' },
                ].map((m) => (
                  <div key={m.l} className="bg-white border border-slate-100 rounded-2xl px-5 py-4 shadow-sm">
                    <span className="block text-lg font-black tracking-tighter text-blue-500">{m.v}</span>
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
                src="/imagenes/yonko_appmovil.webp"
                alt="Equipo diseñando una aplicación móvil"
                width={520}
                height={520}
                className="relative z-10 h-auto w-full max-w-[360px] object-contain drop-shadow-2xl xl:max-w-[430px]"
                priority
              />
              <div className="absolute bottom-5 left-5 right-5 z-20 rounded-2xl border border-white/70 bg-white/85 px-4 py-3 shadow-lg backdrop-blur">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">Solución en desarrollo</p>
                <p className="mt-1 text-sm font-semibold leading-snug text-slate-700">Experiencia rápida, simple y lista para uso diario.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MÉTRICAS + FEATURES ──────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-5 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-blue-500 mb-2">Impacto medible</p>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
                Por qué <span className="text-blue-500 italic">mobile.</span>
              </h2>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {METRICAS.map((m, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white border border-slate-100 rounded-2xl p-6 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-50 transition-all duration-400"
              >
                <span className="text-2xl mb-3 block">{m.icon}</span>
                <span className="block text-3xl font-black text-blue-500 tracking-tighter mb-1">{m.valor}</span>
                <span className="font-mono text-[8px] uppercase tracking-widest text-slate-900 font-bold block mb-2">{m.titulo}</span>
                <p className="text-xs text-slate-500 leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-8">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-blue-500 mb-2">Capacidades</p>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
              Qué <span className="text-blue-500 italic">construimos.</span>
            </h2>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FEATURES.map((f, i) => <FeatureCard key={i} f={f} index={i} />)}
            </div>
            <div className="hidden lg:block">
<div className="lg:sticky lg:top-28">
            
            
                        {/* Visual: mockup de app */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.94 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                          className="hidden lg:flex items-center justify-start gap-4"
                        >
                          {/* Phone mockup principal */}
                          <div className="relative">
                            <div className="w-48 bg-slate-950 rounded-[2rem] p-2 shadow-lg">
                              <div className="bg-white rounded-[1.65rem] overflow-hidden">
                                {/* Status bar */}
                                <div className="bg-slate-950 px-4 pt-3 pb-2 flex items-center justify-between">
                                  <span className="text-white text-[9px] font-bold">9:41</span>
                                  <div className="w-16 h-4 bg-slate-800 rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-3" />
                                  <div className="flex items-center gap-1">
                                    <div className="w-3 h-2 border border-white/50 rounded-sm relative">
                                      <div className="absolute inset-0.5 bg-white/60 rounded-sm" />
                                    </div>
                                  </div>
                                </div>
                                {/* App content */}
                                <div className="bg-white p-3.5 space-y-2 min-h-[230px]">
                                  {/* Header app */}
                                  <div className="flex items-center justify-between mb-4">
                                    <div>
                                      <div className="h-2 w-16 bg-slate-200 rounded-full mb-1" />
                                      <div className="h-4 w-20 bg-slate-900 rounded-full" />
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                      <div className="w-4 h-4 rounded-full bg-blue-500" />
                                    </div>
                                  </div>
                                  {/* Stats row */}
                                  <div className="grid grid-cols-3 gap-2">
                                    {['bg-blue-50', 'bg-blue-50', 'bg-cyan-50'].map((c, i) => (
                                      <div key={i} className={`${c} rounded-xl p-2.5`}>
                                        <div className={`h-1.5 w-6 rounded-full mb-1.5 ${i === 0 ? 'bg-blue-200' : i === 1 ? 'bg-blue-200' : 'bg-cyan-200'}`} />
                                        <div className={`h-3 w-7 rounded-full font-black ${i === 0 ? 'bg-blue-400' : i === 1 ? 'bg-blue-400' : 'bg-cyan-400'}`} />
                                      </div>
                                    ))}
                                  </div>
                                  {/* List items */}
                                  {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                                      <div className="w-8 h-8 rounded-full bg-blue-100 shrink-0" />
                                      <div className="flex-1">
                                        <div className="h-2 w-20 bg-slate-200 rounded-full mb-1.5" />
                                        <div className="h-1.5 w-14 bg-slate-100 rounded-full" />
                                      </div>
                                      <div className="h-4 w-10 bg-blue-100 rounded-full" />
                                    </div>
                                  ))}
                                  {/* Bottom nav */}
                                  <div className="flex justify-around pt-2 border-t border-slate-100 mt-auto">
                                    {['🏠', '🔍', '❤️', '👤'].map((icon, i) => (
                                      <div key={i} className={`text-[11px] p-1.5 rounded-xl ${i === 0 ? 'bg-blue-50' : ''}`}>{icon}</div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* Store badges flotantes */}
                            <motion.div
                              animate={{ y: [-4, 4, -4] }}
                              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                              className="absolute -right-10 top-4 bg-slate-900 text-white text-[8px] font-black uppercase tracking-widest px-3 py-2 rounded-xl shadow-lg whitespace-nowrap"
                            >
                              App Store ★ 4.8
                            </motion.div>
                            <motion.div
                              animate={{ y: [4, -4, 4] }}
                              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                              className="absolute -right-10 bottom-16 bg-cyan-600 text-white text-[8px] font-black uppercase tracking-widest px-3 py-2 rounded-xl shadow-lg whitespace-nowrap"
                            >
                              Google Play ★ 4.7
                            </motion.div>
                          </div>
                        </motion.div>
            
          </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESO ───────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-5 md:px-6 relative overflow-hidden"
        style={{ backgroundColor: '#f0f7ff' }}>
        <div className="absolute inset-0 pointer-events-none opacity-40"
          style={{ backgroundImage: 'radial-gradient(#fecdd3 1px,transparent 1px)', backgroundSize: '22px 22px' }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-10">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-blue-500 mb-2">Metodología</p>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
              De idea a <span className="text-blue-500 italic">stores.</span>
            </h2>
          </motion.div>
          <div className="relative">
            <div className="hidden md:block absolute top-7 left-6 right-6 h-px bg-blue-100 z-0" />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
              {PROCESO.map((paso, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group bg-white border border-slate-100 rounded-2xl p-5 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-50 hover:-translate-y-1 transition-all duration-400"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mb-4">
                    <span className="font-mono text-[9px] font-black text-white">{paso.n}</span>
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-tight text-slate-900 mb-2 group-hover:text-blue-500 transition-colors">{paso.t}</h3>
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
          <div className="mb-16">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-blue-600 mb-2">Build & Ship</p>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter italic">Alcances — <span className="text-blue-500">Mobile.</span></h2>
            <p className="text-slate-500 text-sm mt-4">Definimos alcance, prioridades y esfuerzo después de un diagnóstico breve.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ALCANCES_PROYECTO.map((plan, i) => <AlcanceProyectoCard key={i} plan={plan} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── SECCIÓN: CONTINUIDAD ── */}
      <section className="py-14 md:py-20 px-5 md:px-6 bg-[#F8FAFC] border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-blue-600 mb-2">Operación & Continuidad</p>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none">Mobile <span className="italic text-slate-400">Care.</span></h2>
              <p className="text-slate-500 text-sm mt-6 leading-relaxed">
                Acompañamiento técnico para mantener estable, segura y útil la solución después del lanzamiento.
                <span className="text-slate-900 font-bold ml-2 underline decoration-blue-500 decoration-2 underline-offset-4 text-xs">Cotización según alcance</span>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CONTINUIDAD_MOBILE.map((plan, i) => <ContinuidadMobileCard key={i} plan={plan} index={i} />)}
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
          className="max-w-3xl mx-auto rounded-[2rem] border border-cyan-300/20 bg-slate-950 p-7 sm:p-8 md:p-10 relative overflow-hidden shadow-xl shadow-blue-950/20"
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/25 rounded-full blur-3xl -mr-36 -mt-36 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-52 h-52 bg-cyan-400/10 rounded-full blur-2xl -ml-24 -mb-24 pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none opacity-[0.07]"
            style={{ backgroundImage: 'radial-gradient(#fff 1px,transparent 1px)', backgroundSize: '20px 20px' }} />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-cyan-200 mb-3">¿Tiene una idea de app?</p>
              <h2 className="text-2xl md:text-3xl font-black tracking-tighter uppercase leading-[0.9] text-white mb-3">
                Llevémosla al<br />App Store.
              </h2>
              <p className="text-cyan-100/80 text-sm font-light max-w-sm">
                En 30 minutos evaluamos su idea, definimos el MVP y le damos un plan de desarrollo concreto.
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <Link href="/contacto"
                className="group inline-flex items-center gap-3 bg-white text-slate-950 px-7 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl whitespace-nowrap">
                Consultoría Gratis
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link href="/proyectos"
                className="inline-flex items-center justify-center gap-2 text-cyan-200 hover:text-white text-xs uppercase tracking-widest font-bold transition-colors">
                Ver proyectos →
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

    </main>
  );
}
