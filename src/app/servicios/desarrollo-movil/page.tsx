"use client";

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// ─── Lógica de Negocio y Conversión ──────────────────────────────────────────
const VALOR_USD_CLP = 970;

const formatCLP = (usdString: string) => {
  if (usdString.includes('Personalizado') || usdString.includes('A medida')) return null;
  const matches = usdString.match(/\d+/g);
  if (!matches) return null;
  
  const usdValue = parseInt(matches[0].replace(/[^0-9]/g, ''), 10);
  const clpValue = usdValue * VALOR_USD_CLP;
  
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(clpValue);
};
// ─── Data ─────────────────────────────────────────────────────────────────────
const FEATURES = [
  { icon: '📱', titulo: 'Apps iOS & Android', desc: 'Una sola base de código que corre de forma nativa en ambas plataformas, sin sacrificar rendimiento ni experiencia de usuario en ninguna de ellas.' },
  { icon: '⚡', titulo: 'Rendimiento Nativo', desc: 'Animaciones a 60fps, tiempo de carga inferior a 2 segundos y navegación fluida. Sus usuarios no notarán la diferencia con una app 100% nativa.' },
  { icon: '🔔', titulo: 'Push Notifications', desc: 'Sistema de notificaciones segmentadas y programadas que incrementan la retención y re-engagement de usuarios de forma medible.' },
  { icon: '🔗', titulo: 'Integración de APIs', desc: 'Conexión con cualquier backend, sistema de pago, CRM, ERP o servicio de terceros mediante arquitectura desacoplada y segura.' },
  { icon: '📶', titulo: 'Modo Offline', desc: 'Sincronización inteligente que permite operar sin conexión y actualizar datos automáticamente al reconectar, sin pérdida de información.' },
  { icon: '📊', titulo: 'Analytics & Crashlytics', desc: 'Instrumentación completa con métricas de comportamiento en tiempo real, detección de errores y reportes de uso para decisiones basadas en datos.' },
];

const STACK = [
  { name: 'React Native', color: 'bg-blue-500 text-white' },
  { name: 'Expo', color: 'bg-slate-900 text-white' },
  { name: 'TypeScript', color: 'bg-blue-700 text-white' },
  { name: 'Firebase', color: 'bg-orange-500 text-white' },
  { name: 'Supabase', color: 'bg-emerald-600 text-white' },
  { name: 'Stripe', color: 'bg-violet-600 text-white' },
  { name: 'App Store', color: 'bg-sky-500 text-white' },
  { name: 'Google Play', color: 'bg-green-600 text-white' },
];

const METRICAS = [
  { icon: '🚀', titulo: 'Time to market', valor: '-40%', desc: 'Frente a desarrollo nativo separado para iOS y Android.' },
  { icon: '⭐', titulo: 'Rating promedio', valor: '4.7★', desc: 'Calificación promedio en stores de las apps publicadas.' },
  { icon: '📲', titulo: 'Retención 30 días', valor: '+38%', desc: 'Con push notifications y onboarding optimizado.' },
  { icon: '💰', titulo: 'ROI de inversión', valor: '5x', desc: 'Retorno medido en los primeros 12 meses post-lanzamiento.' },
];

const PLANES_INVERSION = [
  {
    nombre: 'MVP',
    precio: 'USD 4000',
    desde: true,
    desc: 'App funcional publicada en iOS y Android con funcionalidades core.',
    incluye: ['1 codebase (React Native)', 'Hasta 8 pantallas', 'Autenticación', 'Integración con 1 API', 'Push notifications', 'Publicación en Stores', 'Deploy backend inicial'],
    cta: 'Contratar MVP',
    destacado: false,
  },
  {
    nombre: 'Product',
    precio: 'USD 8500',
    desde: false,
    desc: 'App completa lista para escalar con pagos y panel administrativo.',
    incluye: ['Pantallas ilimitadas', 'Pagos (Stripe/MP)', 'Analytics & Crashlytics', 'Modo offline con sync', 'Panel admin web', 'Backend escalable', 'Arquitectura senior'],
    cta: 'Contratar Product',
    destacado: true,
  },
  {
    nombre: 'Enterprise',
    precio: 'Proyecto a medida',
    desc: 'Arquitectura compleja para plataformas móviles de alto impacto.',
    incluye: ['Arquitectura custom', 'Integración ERP / CRM', 'Seguridad avanzada', 'CI/CD Pipeline', 'SLA garantizado', 'Infraestructura distribuida', 'Roadmap evolutivo'],
    cta: 'Agendar Llamada',
    destacado: false,
  },
];

const PLANES_MENSUALES = [
  {
    nombre: 'Mobile Basic Care',
    precio: 'USD 180',
    rango: '180 – 300',
    target: 'Para MVP simples',
    desc: 'Mantenimiento crítico de servidores y base de datos para apps iniciales.',
    incluye: ['Hosting backend', 'BD gestionada', 'SSL + Backups diarios', 'Monitoreo básico', 'Soporte ante incidentes'],
    noIncluye: ['Nuevas funciones', 'Mejoras de UI', 'Gestión de Stores'],
    acento: 'border-emerald-100 bg-emerald-50/30',
  },
  {
    nombre: 'Mobile Business Care',
    precio: 'USD 500',
    rango: '500 – 900',
    target: 'Para apps Product',
    desc: 'Continuidad operativa y partner técnico para escalar el negocio.',
    incluye: ['Infraestructura elástica', 'BD optimizada', 'Actualizaciones dependencias', '1 ajuste técnico mensual', 'Gestión básica de Stores'],
    acento: 'border-rose-100 bg-rose-50/30',
  },
  {
    nombre: 'Mobile Scale / SaaS',
    precio: 'USD 1200',
    desde: true,
    target: 'Para ingresos reales',
    desc: 'Operación avanzada 24/7 para infraestructuras cloud críticas.',
    incluye: ['Infraestructura Cloud Pro', 'Auto-scaling activo', 'Monitoreo 24/7', 'SLA definido', 'Gestión total de Releases'],
    acento: 'border-slate-200 bg-slate-50',
  },
];

const PROCESO = [
  { n: '01', t: 'Discovery', d: 'Definimos el problema, el usuario objetivo y las funcionalidades core. Entregamos un mapa de producto claro antes de escribir código.' },
  { n: '02', t: 'UX & Diseño', d: 'Wireframes y prototipos interactivos en Figma. Testamos el flujo con usuarios reales antes de desarrollar.' },
  { n: '03', t: 'Desarrollo', d: 'Sprints semanales con entregables visibles. Puede probar la app en su teléfono desde la primera semana.' },
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
      className="group bg-white border border-slate-100 rounded-2xl p-6 hover:border-rose-100 hover:shadow-xl hover:shadow-rose-50 hover:-translate-y-1 transition-all duration-400"
    >
      <span className="text-2xl mb-4 block">{f.icon}</span>
      <h3 className="text-sm font-black uppercase tracking-tight text-slate-900 mb-2 group-hover:text-rose-600 transition-colors">{f.titulo}</h3>
      <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
    </motion.div>
  );
}

function PlanInversionCard({ plan, index }: { plan: typeof PLANES_INVERSION[0]; index: number }) {
  const clpPrice = formatCLP(plan.precio);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`p-8 rounded-[2.5rem] border flex flex-col h-full transition-all duration-500
        ${plan.destacado ? 'bg-rose-500 text-white shadow-2xl scale-[1.02] z-10' : 'bg-white border-slate-100'}`}
    >
      <p className={`font-mono text-[9px] uppercase tracking-widest mb-4 ${plan.destacado ? 'text-rose-200' : 'text-rose-500'}`}>{plan.nombre}</p>
      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          {plan.desde && <span className={`text-xs font-medium ${plan.destacado ? 'text-rose-200' : 'text-slate-400'}`}>Desde</span>}
          <span className="text-4xl font-black tracking-tighter tabular-nums">{plan.precio}</span>
        </div>
        {clpPrice && (
          <p className={`text-xs font-bold mt-1 ${plan.destacado ? 'text-white/80' : 'text-rose-500'}`}>
            ≈ {clpPrice} <span className="text-[10px] opacity-70">CLP + IVA*</span>
          </p>
        )}
      </div>
      <p className={`text-xs leading-relaxed mb-8 ${plan.destacado ? 'text-rose-100' : 'text-slate-500'}`}>{plan.desc}</p>
      <ul className="space-y-3 mb-8 flex-1">
        {plan.incluye.map(i => (
          <li key={i} className="flex items-center gap-3 text-xs font-medium">
            <span className={plan.destacado ? 'text-white' : 'text-rose-500'}>✓</span> {i}
          </li>
        ))}
      </ul>
      <Link href="/contacto" className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-center transition-all ${plan.destacado ? 'bg-white text-rose-500 shadow-lg' : 'bg-slate-900 text-white hover:bg-rose-500'}`}>
        {plan.cta}
      </Link>
    </motion.div>
  );
}

function PlanMensualCard({ plan, index }: { plan: typeof PLANES_MENSUALES[0]; index: number }) {
  const clpPrice = formatCLP(plan.precio);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`p-7 rounded-[2rem] border ${plan.acento} flex flex-col h-full hover:shadow-xl transition-all`}
    >
      <div className="mb-4">
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-1">{plan.nombre}</h3>
        <p className="text-[9px] font-bold text-rose-500 uppercase tracking-tighter">{plan.target}</p>
      </div>
      <div className="mb-4">
        <div className="flex items-baseline gap-1">
          {plan.desde && <span className="text-[10px] font-bold text-slate-400 uppercase">Desde</span>}
          <span className="text-xl font-black text-slate-900">{plan.rango || plan.precio}</span>
          <span className="text-[10px] font-bold text-slate-400">/ mes</span>
        </div>
        {clpPrice && <p className="text-[10px] font-bold text-rose-500">≈ {clpPrice} CLP + IVA</p>}
      </div>
      <p className="text-[11px] text-slate-500 leading-relaxed mb-6 italic">"{plan.desc}"</p>
      <div className="space-y-4 flex-1">
        <ul className="space-y-2">
          {plan.incluye.map(i => (
            <li key={i} className="text-[10px] text-slate-600 flex items-center gap-2 font-semibold">
              <span className="w-1 h-1 bg-rose-400 rounded-full" /> {i}
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
        style={{ background: 'linear-gradient(160deg, #fff1f2 0%, #ffffff 55%)' }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(#f43f5e 1px,transparent 1px),linear-gradient(90deg,#f43f5e 1px,transparent 1px)', backgroundSize: '52px 52px' }} />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-rose-100 rounded-full blur-[120px] opacity-60 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <Link href="/servicios" className="inline-flex items-center gap-2 text-slate-400 hover:text-rose-500 transition-colors text-xs font-bold uppercase tracking-widest mb-10 group">
              <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Todos los servicios
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
                className="inline-flex items-center gap-2 bg-white border border-rose-100 shadow-sm px-3.5 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-rose-700">Mobile Engineering</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(2.8rem,8vw,6.5rem)] font-black leading-[0.85] tracking-tighter uppercase mb-6"
              >
                APPS QUE<br />
                <span className="text-rose-500 italic">retienen.</span>
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
                    <span className="block text-lg font-black tracking-tighter text-rose-500">{m.v}</span>
                    <span className="font-mono text-[8px] uppercase tracking-widest text-slate-400">{m.l}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Visual: mockup de app */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:flex items-center justify-center gap-6"
            >
              {/* Phone mockup principal */}
              <div className="relative">
                <div className="w-56 bg-slate-950 rounded-[2.5rem] p-2 shadow-2xl">
                  <div className="bg-white rounded-[2rem] overflow-hidden">
                    {/* Status bar */}
                    <div className="bg-slate-950 px-5 pt-3 pb-2 flex items-center justify-between">
                      <span className="text-white text-[9px] font-bold">9:41</span>
                      <div className="w-20 h-4 bg-slate-800 rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-3" />
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-2 border border-white/50 rounded-sm relative">
                          <div className="absolute inset-0.5 bg-white/60 rounded-sm" />
                        </div>
                      </div>
                    </div>
                    {/* App content */}
                    <div className="bg-white p-4 space-y-3 min-h-[320px]">
                      {/* Header app */}
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="h-2 w-16 bg-slate-200 rounded-full mb-1" />
                          <div className="h-4 w-24 bg-slate-900 rounded-full" />
                        </div>
                        <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center">
                          <div className="w-4 h-4 rounded-full bg-rose-500" />
                        </div>
                      </div>
                      {/* Stats row */}
                      <div className="grid grid-cols-3 gap-2">
                        {['bg-blue-50', 'bg-rose-50', 'bg-emerald-50'].map((c, i) => (
                          <div key={i} className={`${c} rounded-xl p-2.5`}>
                            <div className={`h-1.5 w-6 rounded-full mb-1.5 ${i === 0 ? 'bg-blue-200' : i === 1 ? 'bg-rose-200' : 'bg-emerald-200'}`} />
                            <div className={`h-3 w-8 rounded-full font-black ${i === 0 ? 'bg-blue-400' : i === 1 ? 'bg-rose-400' : 'bg-emerald-400'}`} />
                          </div>
                        ))}
                      </div>
                      {/* List items */}
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                          <div className="w-8 h-8 rounded-full bg-rose-100 shrink-0" />
                          <div className="flex-1">
                            <div className="h-2 w-20 bg-slate-200 rounded-full mb-1.5" />
                            <div className="h-1.5 w-14 bg-slate-100 rounded-full" />
                          </div>
                          <div className="h-4 w-10 bg-rose-100 rounded-full" />
                        </div>
                      ))}
                      {/* Bottom nav */}
                      <div className="flex justify-around pt-2 border-t border-slate-100 mt-auto">
                        {['🏠', '🔍', '❤️', '👤'].map((icon, i) => (
                          <div key={i} className={`text-sm p-1.5 rounded-xl ${i === 0 ? 'bg-rose-50' : ''}`}>{icon}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Store badges flotantes */}
                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -right-16 top-8 bg-slate-900 text-white text-[8px] font-black uppercase tracking-widest px-3 py-2 rounded-xl shadow-lg whitespace-nowrap"
                >
                  App Store ★ 4.8
                </motion.div>
                <motion.div
                  animate={{ y: [4, -4, 4] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -right-14 bottom-16 bg-emerald-600 text-white text-[8px] font-black uppercase tracking-widest px-3 py-2 rounded-xl shadow-lg whitespace-nowrap"
                >
                  Google Play ★ 4.7
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STACK MARQUEE ─────────────────────────────────────────────────── */}
      <section className="py-8 border-y border-slate-100 bg-slate-50 overflow-hidden">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="flex gap-3 whitespace-nowrap"
        >
          {[...STACK, ...STACK].map((s, i) => (
            <span key={i} className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-black uppercase tracking-wide ${s.color}`}>
              {s.name}
            </span>
          ))}
        </motion.div>
      </section>

      {/* ── MÉTRICAS + FEATURES ──────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-5 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-10">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-rose-500 mb-2">Impacto medible</p>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
              Por qué <span className="text-rose-500 italic">mobile.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {METRICAS.map((m, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white border border-slate-100 rounded-2xl p-6 hover:border-rose-100 hover:shadow-lg hover:shadow-rose-50 transition-all duration-400"
              >
                <span className="text-2xl mb-3 block">{m.icon}</span>
                <span className="block text-3xl font-black text-rose-500 tracking-tighter mb-1">{m.valor}</span>
                <span className="font-mono text-[8px] uppercase tracking-widest text-slate-900 font-bold block mb-2">{m.titulo}</span>
                <p className="text-xs text-slate-500 leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-8">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-rose-500 mb-2">Capacidades</p>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
              Qué <span className="text-rose-500 italic">construimos.</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => <FeatureCard key={i} f={f} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── PROCESO ───────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-5 md:px-6 relative overflow-hidden"
        style={{ backgroundColor: '#fff1f2' }}>
        <div className="absolute inset-0 pointer-events-none opacity-40"
          style={{ backgroundImage: 'radial-gradient(#fecdd3 1px,transparent 1px)', backgroundSize: '22px 22px' }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-10">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-rose-500 mb-2">Metodología</p>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
              De idea a <span className="text-rose-500 italic">stores.</span>
            </h2>
          </motion.div>
          <div className="relative">
            <div className="hidden md:block absolute top-7 left-6 right-6 h-px bg-rose-100 z-0" />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
              {PROCESO.map((paso, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group bg-white border border-slate-100 rounded-2xl p-5 hover:border-rose-100 hover:shadow-lg hover:shadow-rose-50 hover:-translate-y-1 transition-all duration-400"
                >
                  <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center mb-4">
                    <span className="font-mono text-[9px] font-black text-white">{paso.n}</span>
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-tight text-slate-900 mb-2 group-hover:text-rose-500 transition-colors">{paso.t}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{paso.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRECIOS ───────────────────────────────────────────────────────── */}
      {/* ── SECCIÓN: DESARROLLO (CONSTRUCCIÓN) ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-rose-500 mb-2">Build & Ship</p>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic">Inversión — <span className="text-rose-500">Mobile.</span></h2>
            <p className="text-slate-500 text-sm mt-4">Inversión única para el desarrollo multiplataforma de su aplicación.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANES_INVERSION.map((plan, i) => <PlanInversionCard key={i} plan={plan} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── SECCIÓN: MENSUALIDADES (CARE) ── */}
      <section className="py-24 px-6 bg-[#F8FAFC] border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-rose-500 mb-2">Continuidad Mobile</p>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">Managed <span className="italic text-slate-400">Services.</span></h2>
              <p className="text-slate-500 text-sm mt-6 leading-relaxed">
                Gestión estratégica de infraestructura móvil. Seguridad, actualizaciones y uptime garantizado.
                <span className="text-slate-900 font-bold ml-2 underline decoration-rose-500 decoration-2 underline-offset-4 text-xs uppercase">Valores + IVA</span>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANES_MENSUALES.map((plan, i) => <PlanMensualCard key={i} plan={plan} index={i} />)}
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
          className="max-w-4xl mx-auto bg-rose-500 rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden shadow-2xl shadow-rose-200"
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -mr-36 -mt-36 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-52 h-52 bg-rose-700/40 rounded-full blur-2xl -ml-24 -mb-24 pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none opacity-[0.07]"
            style={{ backgroundImage: 'radial-gradient(#fff 1px,transparent 1px)', backgroundSize: '20px 20px' }} />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-rose-200 mb-3">¿Tiene una idea de app?</p>
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase leading-[0.9] text-white mb-3">
                Llevémosla al<br />App Store.
              </h2>
              <p className="text-rose-100 text-sm font-light max-w-sm">
                En 30 minutos evaluamos su idea, definimos el MVP y le damos un plan de desarrollo concreto.
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <Link href="/contacto"
                className="group inline-flex items-center gap-3 bg-white text-rose-500 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.03] active:scale-[0.98] transition-all shadow-xl whitespace-nowrap">
                Consultoría Gratis
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link href="/proyectos"
                className="inline-flex items-center justify-center gap-2 text-rose-200 hover:text-white text-xs uppercase tracking-widest font-bold transition-colors">
                Ver proyectos →
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

    </main>
  );
}