"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// ─── Data ─────────────────────────────────────────────────────────────────────
const FEATURES = [
  { icon: '🛒', titulo: 'Checkout Optimizado', desc: 'Flujo de compra diseñado con psicología del comportamiento. Reducimos el abandono de carrito hasta un 40% con micro-optimizaciones probadas.' },
  { icon: '📈', titulo: 'Escalabilidad de Tráfico', desc: 'Infraestructura que aguanta CyberDay y Black Friday sin caerse. Auto-scaling en tiempo real con alertas proactivas.' },
  { icon: '📦', titulo: 'Integración ERP/WMS', desc: 'Sincronización automática de inventario, facturación y logística. Cero errores de stock manual.' },
  { icon: '🧠', titulo: 'Psicología de Conversión', desc: 'Urgencia, social proof, upsells y cross-sells implementados con A/B testing para maximizar el ticket promedio.' },
  { icon: '💳', titulo: 'Pagos con Stripe', desc: 'Integración completa: tarjetas, cuotas, wallets, pagos recurrentes y gestión de disputas. PCI DSS compliant.' },
  { icon: '📊', titulo: 'Analytics & Funnel', desc: 'Dashboard en tiempo real con métricas de conversión por etapa. Identifica exactamente dónde pierdes clientes.' },
];


const METRICAS = [
  { v: '+40%', l: 'Reducción abandono carrito' },
  { v: '+28%', l: 'Aumento ticket promedio' },
  { v: '3.2x', l: 'Retorno sobre inversión' },
  { v: '<200ms', l: 'Tiempo de respuesta checkout' },
];




const ALCANCES_PROYECTO = [
  {
    nombre: 'Store',
    desc: 'Tienda online completa lista para vender bajo estándares de alto rendimiento.',
    incluye: ['Catálogo administrable', 'Checkout optimizado', 'Panel de administración', 'Gestión de pedidos', 'Estructura técnica base', 'Deploy inicial'],
    cta: 'Agendar diagnóstico',
    destacado: false,
  },
  {
    nombre: 'Growth',
    desc: 'E-commerce optimizado para escalar ventas y mejorar conversión.',
    incluye: ['Catálogo avanzado', 'Upsells & cross-sells', 'Dashboard de métricas', 'Integración ERP / WMS', 'Arquitectura alto tráfico', 'Optimización de checkout'],
    cta: 'Agendar diagnóstico',
    destacado: true,
  },
  {
    nombre: 'Enterprise',
    desc: 'Marketplace, multi-tienda o plataforma compleja con arquitectura distribuida.',
    incluye: ['Multi-tienda / Marketplace', 'Pagos recurrentes', 'Automatización logística', 'Soporte según acuerdo', 'Auditoría de conversión', 'Arquitectura distribuida'],
    cta: 'Agendar llamada',
    destacado: false,
  },
];

const CONTINUIDAD_COMMERCE = [
  {
    nombre: 'Store Care',
    target: 'Para tiendas iniciales',
    desc: 'Mantenimiento crítico para tiendas en crecimiento.',
    incluye: ['Hosting optimizado', 'SSL y backups', 'Monitoreo preventivo', 'Actualizaciones críticas', 'Soporte ante incidentes'],
    acento: 'border-cyan-100 bg-cyan-50/30',
  },
  {
    nombre: 'Growth Care',
    target: 'Para operación activa',
    desc: 'Continuidad técnica y mejoras controladas para vender con estabilidad.',
    incluye: ['Infraestructura escalable', 'Optimización de rendimiento', 'Seguridad reforzada', 'Soporte prioritario', 'Ajustes técnicos mensuales'],
    acento: 'border-blue-100 bg-blue-50/30',
  },
  {
    nombre: 'Commerce Scale',
    target: 'Para operación crítica',
    desc: 'Acompañamiento estratégico para e-commerce de alto impacto.',
    incluye: ['Monitoreo activo', 'SLA por contrato', 'Escalamiento automático', 'Roadmap técnico', 'Optimización continua'],
    acento: 'border-slate-200 bg-slate-50',
  },
];

const PROCESO = [
  { n: '01', t: 'Auditoría CX', d: 'Analizamos el journey de compra actual y los puntos de fricción que cuestan ventas.' },
  { n: '02', t: 'Estrategia', d: 'Definimos arquitectura, stack de pagos, integraciones y KPIs de conversión.' },
  { n: '03', t: 'UX & Diseño', d: 'Wireframes y prototipo del flujo de compra validado con heatmaps y user testing.' },
  { n: '04', t: 'Desarrollo', d: 'Construimos checkout, catálogo, panel e integraciones por etapas revisables según alcance y prioridades comerciales.' },
  { n: '05', t: 'Optimización', d: 'Post-lanzamiento: A/B tests, análisis de funnel y ajustes para maximizar conversión.' },
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
      className={`p-5 sm:p-6 rounded-[1.75rem] border flex flex-col h-full transition-all duration-300 ${plan.destacado ? 'bg-slate-950 text-white shadow-xl shadow-blue-950/20 ring-1 ring-cyan-300/20 z-10' : 'bg-white border-slate-100'}`}
    >
      <p className={`font-mono text-[9px] uppercase tracking-widest mb-4 ${plan.destacado ? 'text-blue-200' : 'text-blue-600'}`}>{plan.nombre}</p>
      <div className="mb-6">
        <p className={`text-xs font-black uppercase tracking-[0.22em] mb-2 ${plan.destacado ? 'text-white/70' : 'text-slate-400'}`}>Alcance</p>
        <p className="text-2xl font-black tracking-tighter leading-none">Cotizar</p>
        <p className={`text-xs font-semibold mt-2 ${plan.destacado ? 'text-white/75' : 'text-slate-600'}`}>Cotización según diagnóstico.</p>
      </div>
      <p className={`text-xs leading-relaxed mb-8 ${plan.destacado ? 'text-blue-100' : 'text-slate-500'}`}>{plan.desc}</p>
      <ul className="space-y-3 mb-8 flex-1">
        {plan.incluye.map(i => (
          <li key={i} className="flex items-center gap-3 text-xs font-medium">
            <span className={plan.destacado ? 'text-white' : 'text-blue-600'}>✓</span> {i}
          </li>
        ))}
      </ul>
      <Link href="/contacto" className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-center transition-all ${plan.destacado ? 'bg-white text-blue-600' : 'bg-slate-900 text-white'}`}>
        {plan.cta}
      </Link>
    </motion.div>
  );
}

function ContinuidadCommerceCard({ plan, index }: { plan: typeof CONTINUIDAD_COMMERCE[0]; index: number }) {
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
        <p className="text-[9px] font-bold text-blue-600 uppercase tracking-tighter">{plan.target}</p>
      </div>
      <div className="mb-4">
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">Continuidad</p>
        <p className="mt-1 text-sm font-black text-slate-900">Cotizar</p>
        <p className="mt-1 text-[10px] font-semibold text-slate-500">Se define según operación real.</p>
      </div>
      <p className="text-[11px] text-slate-500 leading-relaxed mb-6 italic">"{plan.desc}"</p>
      <ul className="space-y-2 flex-1">
        {plan.incluye.map(i => (
          <li key={i} className="text-[10px] text-slate-600 flex items-center gap-2 font-semibold">
            <span className="w-1 h-1 bg-blue-400 rounded-full" /> {i}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function EcommercePage() {
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
            <Link href="/servicios" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors text-xs font-bold uppercase tracking-widest mb-10 group">
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
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-blue-700">Conversion & CX</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(2.15rem,5.4vw,4.6rem)] font-black leading-[0.85] tracking-tighter uppercase mb-6"
              >
                VENDER ES<br />
                <span className="text-blue-600 italic">una ciencia.</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
                className="text-base md:text-lg text-slate-500 leading-relaxed mb-8 max-w-md">
                Ecosistemas transaccionales diseñados desde la{' '}
                <span className="text-slate-900 font-semibold">psicología del usuario</span>{' '}
                para maximizar la conversión y el ticket promedio en cada visita.
              </motion.p>

              {/* Métricas hero */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
                className="flex flex-wrap gap-4">
                {METRICAS.map((m) => (
                  <div key={m.l} className="bg-white border border-slate-100 rounded-2xl px-5 py-4 shadow-sm">
                    <span className="block text-2xl font-black text-slate-900 tracking-tighter tabular-nums text-blue-600">{m.v}</span>
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
                src="/imagenes/yonko_ecommerce.webp"
                alt="Equipo trabajando en una solución e-commerce"
                width={520}
                height={520}
                className="relative z-10 h-auto w-full max-w-[360px] object-contain drop-shadow-2xl xl:max-w-[430px]"
                priority
              />
              <div className="absolute bottom-5 left-5 right-5 z-20 rounded-2xl border border-white/70 bg-white/85 px-4 py-3 shadow-lg backdrop-blur">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">Solución en desarrollo</p>
                <p className="mt-1 text-sm font-semibold leading-snug text-slate-700">Carrito, checkout y operación preparada para vender mejor.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-5 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-blue-600 mb-2">Qué construimos</p>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
                Todo lo que <span className="text-blue-600 italic">vende.</span>
              </h2>
            </div>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FEATURES.map((f, i) => <FeatureCard key={i} f={f} index={i} />)}
            </div>
            <div className="hidden lg:block">
<div className="lg:sticky lg:top-28">
            
            
                        {/* Visual: funnel de conversión */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.94 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                          className="hidden lg:block"
                        >
                          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-md">
                            <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-slate-400 mb-3">Funnel de conversión típico</p>
                            <div className="space-y-2">
                              {[
                                { label: 'Visitas', v: 10000, pct: 100, color: 'bg-blue-100', text: 'text-blue-900' },
                                { label: 'Agregan al carrito', v: 3200, pct: 32, color: 'bg-blue-200', text: 'text-blue-900' },
                                { label: 'Inician checkout', v: 1800, pct: 18, color: 'bg-blue-400', text: 'text-white' },
                                { label: 'Completan compra', v: 1100, pct: 11, color: 'bg-blue-600', text: 'text-white' },
                                { label: 'Con nuestro sistema ✦', v: 1540, pct: 15.4, color: 'bg-slate-900', text: 'text-white' },
                              ].map((row, i) => (
                                <motion.div key={i}
                                  initial={{ opacity: 0, x: -16 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                                  className="flex items-center gap-3"
                                >
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${row.pct}%` }}
                                    transition={{ delay: 0.7 + i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                    className={`h-7 rounded-xl flex items-center px-3 ${row.color} min-w-[80px]`}
                                  >
                                    <span className={`text-[10px] font-black whitespace-nowrap ${row.text}`}>
                                      {row.v.toLocaleString()}
                                    </span>
                                  </motion.div>
                                  <span className="text-[10px] text-slate-500 whitespace-nowrap font-medium">{row.label}</span>
                                </motion.div>
                              ))}
                            </div>
                            <p className="font-mono text-[8px] text-slate-400 mt-5">* Datos promedio de proyectos implementados</p>
                          </div>
                        </motion.div>
            
          </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESO ───────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-5 md:px-6 relative overflow-hidden"
        style={{ backgroundColor: '#f8fafc' }}>
        <div className="absolute inset-0 pointer-events-none opacity-40"
          style={{ backgroundImage: 'radial-gradient(#c7d2fe 1px,transparent 1px)', backgroundSize: '22px 22px' }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-10">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-blue-600 mb-2">Metodología</p>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
              Cómo lo <span className="text-blue-600 italic">hacemos.</span>
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
          <div className="mb-16">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-blue-600 mb-2">Desarrollo & Configuración</p>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter italic">Alcances — <span className="text-blue-600">E-commerce.</span></h2>
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
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none">Managed <span className="italic text-slate-400">Commerce.</span></h2>
              <p className="text-slate-500 text-sm mt-6 leading-relaxed">
                Acompañamiento técnico para mantener estable, segura y útil la solución después del lanzamiento.
                <span className="text-slate-900 font-bold ml-2 underline decoration-blue-500 decoration-2 underline-offset-4 text-xs">Cotización según alcance</span>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CONTINUIDAD_COMMERCE.map((plan, i) => <ContinuidadCommerceCard key={i} plan={plan} index={i} />)}
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
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-cyan-200 mb-3">Hablemos de ROI</p>
              <h2 className="text-2xl md:text-3xl font-black tracking-tighter uppercase leading-[0.9] text-white mb-3">
                Calculemos su<br />retorno de inversión.
              </h2>
              <p className="text-cyan-100/80 text-sm font-light max-w-sm">
                En 30 minutos le mostramos cuánto puede ganar con una tienda bien construida. Sin compromiso.
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <Link href="/contacto"
                className="group inline-flex items-center gap-3 bg-white text-slate-950 px-7 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl whitespace-nowrap">
                Agendar Consultoría
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link href="/proyectos"
                className="inline-flex items-center justify-center gap-2 text-cyan-200 hover:text-white text-xs uppercase tracking-widest font-bold transition-colors">
                Ver tiendas creadas →
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

    </main>
  );
}
