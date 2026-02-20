"use client";

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// ─── Lógica de Conversión ─────────────────────────────────────────────────────
const VALOR_USD_CLP = 970;

const formatCLP = (usdString: string) => {
  if (usdString.includes('medida') || usdString.includes('Personalizado')) return null;
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
const CAPACIDADES = [
  { icon: '🔮', titulo: 'Modelos Predictivos', desc: 'Forecasting de demanda, churn prediction y detección de anomalías. Su negocio anticipa lo que va a pasar antes de que pase.' },
  { icon: '🗣️', titulo: 'Procesamiento de Lenguaje Natural', desc: 'Análisis de sentimiento, clasificación de tickets, chatbots con contexto y resumen automático de documentos.' },
  { icon: '👁️', titulo: 'Visión por Computadora', desc: 'Detección de objetos, control de calidad visual automatizado y reconocimiento de imágenes en tiempo real.' },
  { icon: '🔗', titulo: 'Pipelines de Datos', desc: 'Arquitectura ETL/ELT robusta que centraliza, limpia y transforma sus datos en una fuente única de verdad.' },
  { icon: '📊', titulo: 'Dashboards de Business Intelligence', desc: 'Visualizaciones interactivas que convierten datos crudos en decisiones claras para su equipo directivo.' },
  { icon: '🤖', titulo: 'Automatización con IA', desc: 'Flujos de trabajo inteligentes que aprenden de sus patrones y reducen el trabajo manual repetitivo.' },
];

const STACK = [
  { name: 'Python', color: 'bg-yellow-500 text-slate-900' },
  { name: 'scikit-learn', color: 'bg-violet-600 text-white' },
  { name: 'TensorFlow', color: 'bg-orange-500 text-white' },
  { name: 'Supabase', color: 'bg-emerald-600 text-white' },
  { name: 'Apache Airflow', color: 'bg-slate-900 text-white' },
  { name: 'OpenAI API', color: 'bg-slate-700 text-white' },
  { name: 'Pandas', color: 'bg-blue-600 text-white' },
  { name: 'PostgreSQL', color: 'bg-indigo-600 text-white' },
];

const CASOS = [
  { sector: 'Retail', caso: 'Predicción de demanda', resultado: '-31% de quiebre de stock', icon: '🛍️' },
  { sector: 'SaaS', caso: 'Churn prediction', resultado: '+24% retención de clientes', icon: '📉' },
  { sector: 'Logística', caso: 'Optimización de rutas', resultado: '-18% costo operativo', icon: '🚚' },
  { sector: 'Fintech', caso: 'Detección de fraude', resultado: '99.2% precisión en alertas', icon: '🔐' },
];

const PLANES_INVERSION = [
  {
    nombre: 'Discovery AI',
    precio: 'USD 4000',
    desde: true,
    desc: 'Auditoría de datos y primer modelo predictivo funcional en producción.',
    incluye: ['Auditoría de fuentes de datos', '1 modelo predictivo core', 'Pipeline de datos básico', 'Dashboard de resultados', 'Documentación técnica', 'Implementación inicial'],
    cta: 'Contratar Discovery',
    destacado: false,
  },
  {
    nombre: 'Intelligence',
    precio: 'USD 9500',
    desde: false,
    desc: 'Ecosistema de IA completo con múltiples modelos y automatización de flujos.',
    incluye: ['Hasta 4 modelos de IA custom', 'Pipeline ETL automatizado', 'Dashboard BI interactivo', 'Integración con sistemas legacy', 'Protocolos de seguridad de datos', 'Arquitectura escalable'],
    cta: 'Contratar Intelligence',
    destacado: true,
  },
  {
    nombre: 'Enterprise IA',
    precio: 'A medida',
    desc: 'Transformación cognitiva completa con MLOps y equipo de ciencia de datos dedicado.',
    incluye: ['Modelos ilimitados', 'MLOps & Model Monitoring', 'Infraestructura Data Lake', 'SLA de precisión garantizado', 'Capacitación técnica senior', 'Soporte prioritario 24/7'],
    cta: 'Agendar Llamada',
    destacado: false,
  },
];

const PLANES_MENSUALES = [
  {
    nombre: 'Basic Monitor',
    precio: 'USD 300',
    target: 'Para Discovery',
    desc: 'Mantenimiento del pipeline y monitoreo de salud del modelo inicial.',
    incluye: ['Monitoreo de disponibilidad', 'Backup de datasets', 'Soporte técnico ante caídas', 'Actualizaciones de seguridad'],
    acento: 'border-emerald-100 bg-emerald-50/30',
  },
  {
    nombre: 'Smart Retraining',
    precio: 'USD 800',
    target: 'Para Intelligence',
    desc: 'Reentrenamiento mensual para evitar el "model drift" y mantener la precisión.',
    incluye: ['Reentrenamiento con nuevos datos', 'Ajuste de hiperparámetros', 'Reporte mensual de precisión', 'Soporte prioritario', '1 ajuste de lógica mensual'],
    acento: 'border-violet-100 bg-violet-50/30',
  },
  {
    nombre: 'MLOps Managed',
    precio: 'USD 1800',
    desde: true,
    target: 'Para Enterprise',
    desc: 'Gestión total del ciclo de vida de IA. Máxima precisión y escalamiento.',
    incluye: ['Gestión completa de MLOps', 'Optimización de latencia', 'Nuevos modelos bajo demanda', 'Roadmap de Data Science', 'SLA de respuesta inmediata'],
    acento: 'border-slate-200 bg-slate-50',
  },
];

const PROCESO = [
  { n: '01', t: 'Data Audit', d: 'Evaluamos la calidad, volumen y estructura de sus datos actuales.' },
  { n: '02', t: 'Problema → Modelo', d: 'Traducimos su desafío de negocio al tipo correcto de solución de IA.' },
  { n: '03', t: 'Ingeniería', d: 'Construcción del pipeline, entrenamiento y validación del modelo.' },
  { n: '04', t: 'Deploy', d: 'Integración en sus sistemas actuales con API o dashboard.' },
  { n: '05', t: 'Monitor & Improve', d: 'Seguimiento de métricas del modelo y reentrenamiento periódico.' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────
function CapacidadCard({ c, index }: { c: typeof CAPACIDADES[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group bg-white border border-slate-100 rounded-2xl p-6 hover:border-violet-100 hover:shadow-xl hover:shadow-violet-50 hover:-translate-y-1 transition-all duration-400"
    >
      <span className="text-2xl mb-4 block">{c.icon}</span>
      <h3 className="text-sm font-black uppercase tracking-tight text-slate-900 mb-2 group-hover:text-violet-600 transition-colors">{c.titulo}</h3>
      <p className="text-xs text-slate-500 leading-relaxed">{c.desc}</p>
    </motion.div>
  );
}

function PlanCard({ plan, index, isMonthly = false }: { plan: any; index: number; isMonthly?: boolean }) {
  const clpPrice = formatCLP(plan.precio);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`p-8 rounded-[2.5rem] border flex flex-col h-full transition-all duration-500
        ${plan.destacado ? 'bg-violet-600 text-white shadow-2xl scale-[1.02] z-10' : 'bg-white border-slate-100'}`}
    >
      <div className="mb-4">
        <p className={`font-mono text-[9px] uppercase tracking-widest mb-1 ${plan.destacado ? 'text-violet-200' : 'text-violet-600'}`}>
          {plan.nombre}
        </p>
        {plan.target && <p className="text-[8px] font-black uppercase text-slate-400">{plan.target}</p>}
      </div>
      
      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          {plan.desde && <span className={`text-xs font-medium ${plan.destacado ? 'text-violet-200' : 'text-slate-400'}`}>Desde</span>}
          <span className="text-4xl font-black tracking-tighter tabular-nums">{plan.precio}</span>
          {isMonthly && <span className="text-sm font-bold opacity-60">/ mes</span>}
        </div>
        {clpPrice && (
          <p className={`text-xs font-bold mt-1 ${plan.destacado ? 'text-white/80' : 'text-violet-600'}`}>
            ≈ {clpPrice} <span className="text-[10px] opacity-70">CLP + IVA*</span>
          </p>
        )}
      </div>
      
      <p className={`text-xs leading-relaxed mb-8 ${plan.destacado ? 'text-violet-100' : 'text-slate-500'}`}>{plan.desc}</p>
      
      <ul className="space-y-3 mb-8 flex-1">
        {plan.incluye.map((i: string) => (
          <li key={i} className="flex items-center gap-3 text-xs font-medium">
            <span className={plan.destacado ? 'text-white' : 'text-violet-600'}>✓</span> {i}
          </li>
        ))}
      </ul>
      
      {plan.cta && (
        <Link href="/contacto" className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-center transition-all ${plan.destacado ? 'bg-white text-violet-600 shadow-lg' : 'bg-slate-900 text-white'}`}>
          {plan.cta}
        </Link>
      )}
    </motion.div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function IAPage() {
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: '-60px' });

  return (
    <main className="min-h-screen bg-white text-slate-900 overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-20 px-5 md:px-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #f5f3ff 0%, #ffffff 55%)' }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(#7c3aed 1px,transparent 1px),linear-gradient(90deg,#7c3aed 1px,transparent 1px)', backgroundSize: '52px 52px' }} />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-violet-100 rounded-full blur-[120px] opacity-60 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-violet-50 rounded-full blur-[80px] opacity-80 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <Link href="/servicios" className="inline-flex items-center gap-2 text-slate-400 hover:text-violet-600 transition-colors text-xs font-bold uppercase tracking-widest mb-10 group">
              <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Todos los servicios
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
                className="inline-flex items-center gap-2 bg-white border border-violet-100 shadow-sm px-3.5 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-violet-700">Cognitive Systems</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(2.8rem,8vw,6.5rem)] font-black leading-[0.85] tracking-tighter uppercase mb-6"
              >
                IA &<br />
                <span className="text-violet-600 italic">Data Science.</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
                className="text-base md:text-lg text-slate-500 leading-relaxed mb-8 max-w-md">
                Modelos predictivos y pipelines de datos que convierten la información de su negocio en{' '}
                <span className="text-slate-900 font-semibold">ventaja competitiva real y medible.</span>
              </motion.p>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
                className="flex flex-wrap gap-4">
                {[
                  { v: '95%+', l: 'Precisión promedio' },
                  { v: '3x', l: 'ROI en 6 meses' },
                  { v: '<48h', l: 'Primer insight' },
                ].map((m) => (
                  <div key={m.l} className="bg-white border border-slate-100 rounded-2xl px-5 py-4 shadow-sm">
                    <span className="block text-2xl font-black tracking-tighter text-violet-600">{m.v}</span>
                    <span className="font-mono text-[8px] uppercase tracking-widest text-slate-400">{m.l}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Visual: neural network / data pipeline */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block"
            >
              <div className="bg-slate-950 rounded-3xl p-8 shadow-2xl overflow-hidden relative">
                {/* Glow de fondo */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />

                {/* Header terminal */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="font-mono text-[10px] text-slate-500 ml-3">model_training.py</span>
                </div>

                {/* Código Python decorativo */}
                <div className="font-mono text-sm space-y-1.5 relative z-10">
                  <p><span className="text-violet-400">import</span> <span className="text-white">pandas</span> <span className="text-violet-400">as</span> <span className="text-white">pd</span></p>
                  <p><span className="text-violet-400">from</span> <span className="text-white">sklearn.ensemble</span> <span className="text-violet-400">import</span> <span className="text-yellow-300">RandomForest</span></p>
                  <p className="mt-3"><span className="text-slate-500"># Cargando datos del negocio</span></p>
                  <p><span className="text-white">data</span> <span className="text-slate-400">=</span> <span className="text-white">pd.read_sql</span><span className="text-slate-400">(</span><span className="text-orange-300">"SELECT * FROM ventas"</span><span className="text-slate-400">)</span></p>
                  <p className="mt-3"><span className="text-slate-500"># Entrenando modelo predictivo</span></p>
                  <p><span className="text-white">model</span> <span className="text-slate-400">=</span> <span className="text-yellow-300">RandomForest</span><span className="text-slate-400">(</span></p>
                  <p className="pl-4"><span className="text-green-400">accuracy</span><span className="text-slate-400">=</span><span className="text-blue-300">0.97</span><span className="text-slate-400">,</span></p>
                  <p className="pl-4"><span className="text-green-400">features</span><span className="text-slate-400">=</span><span className="text-blue-300">142</span></p>
                  <p><span className="text-slate-400">)</span></p>
                  <p className="mt-3 flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-green-300 text-xs">Model deployed — accuracy: 97.3%</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-green-400">▶</span>
                    <span className="text-white">Prediciendo próximos 30 días...</span>
                    <span className="inline-block w-2 h-4 bg-violet-400/70 animate-pulse ml-1" />
                  </p>
                </div>

                {/* Mini métricas flotantes */}
                <div className="mt-6 grid grid-cols-3 gap-2">
                  {[
                    { l: 'Precisión', v: '97.3%', c: 'text-green-400' },
                    { l: 'Registros', v: '2.4M', c: 'text-violet-400' },
                    { l: 'Latencia', v: '12ms', c: 'text-blue-400' },
                  ].map((m) => (
                    <div key={m.l} className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
                      <span className={`block text-base font-black ${m.c}`}>{m.v}</span>
                      <span className="font-mono text-[8px] text-slate-500 uppercase tracking-wide">{m.l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STACK MARQUEE ─────────────────────────────────────────────────── */}
      <section className="py-8 border-y border-slate-100 bg-slate-50 overflow-hidden">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          className="flex gap-3 whitespace-nowrap"
        >
          {[...STACK, ...STACK].map((s, i) => (
            <span key={i} className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-black uppercase tracking-wide ${s.color}`}>
              {s.name}
            </span>
          ))}
        </motion.div>
      </section>

      {/* ── CASOS DE USO REALES ───────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-5 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-10">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-violet-600 mb-2">Casos de uso</p>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
              Resultados <span className="text-violet-600 italic">reales.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {CASOS.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group bg-white border border-slate-100 rounded-2xl p-6 hover:border-violet-100 hover:shadow-xl hover:shadow-violet-50 hover:-translate-y-1 transition-all duration-400"
              >
                <span className="text-2xl mb-3 block">{c.icon}</span>
                <p className="font-mono text-[8px] uppercase tracking-widest text-violet-500 mb-1">{c.sector}</p>
                <p className="text-sm font-black text-slate-900 mb-3 uppercase tracking-tight group-hover:text-violet-600 transition-colors">{c.caso}</p>
                <p className="text-xl font-black text-slate-900 tracking-tighter">{c.resultado}</p>
              </motion.div>
            ))}
          </div>

          {/* Capacidades */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-8">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-violet-600 mb-2">Capacidades técnicas</p>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
              Qué <span className="text-violet-600 italic">construimos.</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CAPACIDADES.map((c, i) => <CapacidadCard key={i} c={c} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── PROCESO ───────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-5 md:px-6 relative overflow-hidden"
        style={{ backgroundColor: '#f8fafc' }}>
        <div className="absolute inset-0 pointer-events-none opacity-40"
          style={{ backgroundImage: 'radial-gradient(#ddd6fe 1px,transparent 1px)', backgroundSize: '22px 22px' }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-10">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-violet-600 mb-2">Metodología</p>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
              De datos a <span className="text-violet-600 italic">decisiones.</span>
            </h2>
          </motion.div>
          <div className="relative">
            <div className="hidden md:block absolute top-7 left-6 right-6 h-px bg-violet-100 z-0" />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
              {PROCESO.map((paso, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group bg-white border border-slate-100 rounded-2xl p-5 hover:border-violet-100 hover:shadow-lg hover:shadow-violet-50 hover:-translate-y-1 transition-all duration-400"
                >
                  <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center mb-4">
                    <span className="font-mono text-[9px] font-black text-white">{paso.n}</span>
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-tight text-slate-900 mb-2 group-hover:text-violet-600 transition-colors">{paso.t}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{paso.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRECIOS ───────────────────────────────────────────────────────── */}
      {/* ── SECCIÓN: INVERSIÓN (PROYECTO) ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-violet-600 mb-2">Build & Deploy</p>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic">Inversión — <span className="text-violet-600">Sistemas IA.</span></h2>
            <p className="text-slate-500 text-sm mt-4">Arquitectura y entrenamiento de modelos diseñados para su ventaja competitiva.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANES_INVERSION.map((plan, i) => <PlanCard key={i} plan={plan} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── SECCIÓN: MENSUALIDADES (OPEX) ── */}
      <section className="py-24 px-6 bg-[#F8FAFC] border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-violet-600 mb-2">Continuidad Cognitiva</p>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">Managed <span className="italic text-slate-400">Intelligence.</span></h2>
              <p className="text-slate-500 text-sm mt-6 leading-relaxed">
                La IA no es estática. Los modelos requieren reentrenamiento y monitoreo de sesgos para mantener su efectividad.
                <span className="text-slate-900 font-bold ml-2 underline decoration-violet-500 decoration-2 underline-offset-4 text-xs uppercase">Valores + IVA</span>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANES_MENSUALES.map((plan, i) => <PlanCard key={i} plan={plan} index={i} isMonthly={true} />)}
          </div>
          <p className="text-center text-[9px] text-slate-400 uppercase tracking-widest mt-12">
            * MLOps: Machine Learning Operations. Soporte técnico basado en métricas de precisión de modelos.
          </p>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section ref={ctaRef} className="py-14 md:py-20 px-5 md:px-6"
        style={{ background: 'repeating-linear-gradient(135deg,#f8fafc 0px,#f8fafc 20px,#f1f5f9 20px,#f1f5f9 21px)' }}>
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={ctaInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto bg-violet-600 rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden shadow-2xl shadow-violet-200"
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -mr-36 -mt-36 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-52 h-52 bg-violet-800/40 rounded-full blur-2xl -ml-24 -mb-24 pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none opacity-[0.07]"
            style={{ backgroundImage: 'radial-gradient(#fff 1px,transparent 1px)', backgroundSize: '20px 20px' }} />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-violet-200 mb-3">¿Su data está dormida?</p>
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase leading-[0.9] text-white mb-3">
                Auditemos sus datos<br />sin costo.
              </h2>
              <p className="text-violet-100 text-sm font-light max-w-sm">
                En 30 minutos evaluamos el potencial de su data y le mostramos qué modelos tienen más impacto para su negocio.
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <Link href="/contacto"
                className="group inline-flex items-center gap-3 bg-white text-violet-600 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.03] active:scale-[0.98] transition-all shadow-xl whitespace-nowrap">
                Auditoría Gratuita
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link href="/proyectos"
                className="inline-flex items-center justify-center gap-2 text-violet-200 hover:text-white text-xs uppercase tracking-widest font-bold transition-colors">
                Ver proyectos de IA →
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

    </main>
  );
}