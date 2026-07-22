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
    style: 'currency', currency: 'CLP', maximumFractionDigits: 0,
  }).format(clpValue);
};
// ─── Data ─────────────────────────────────────────────────────────────────────
const FEATURES = [
  { icon: '🔌', titulo: 'Integración API & ERP', desc: 'Conectamos sus plataformas de gestión, CRMs, ERPs y herramientas de terceros en un ecosistema unificado sin silos.' },
  { icon: '🤖', titulo: 'Bots de Operación', desc: 'Agentes autónomos que ejecutan tareas repetitivas de alto volumen: emails, reportes, actualizaciones de datos, notificaciones.' },
  { icon: '📊', titulo: 'Pipeline de Datos', desc: 'Automatización de ingesta, limpieza y distribución de información crítica. Sus reportes se generan solos, siempre actualizados.' },
  { icon: '🔔', titulo: 'Alertas Inteligentes', desc: 'Sistemas que monitorean sus procesos en tiempo real y notifican anomalías antes de que se conviertan en problemas.' },
  { icon: '📋', titulo: 'Flujos de Aprobación', desc: 'Reemplazamos los procesos manuales de aprobación por flujos digitales con lógica condicional y trazabilidad completa.' },
  { icon: '🔄', titulo: 'Sincronización Multi-Sistema', desc: 'Una acción en un sistema se replica automáticamente en todos los demás. Sin copiar y pegar, sin errores humanos.' },
];


const AHORROS = [
  { icon: '⏱️', titulo: 'Tiempo recuperado', valor: '40h/mes', desc: 'Promedio de horas liberadas por empleado en tareas manuales eliminadas.' },
  { icon: '❌', titulo: 'Error humano', valor: '~0%', desc: 'Los flujos automatizados ejecutan exactamente lo que se define, siempre.' },
  { icon: '💰', titulo: 'ROI promedio', valor: '8x', desc: 'Retorno sobre la inversión medido en los primeros 6 meses de operación.' },
  { icon: '🚀', titulo: 'Velocidad operativa', valor: '+3x', desc: 'Los procesos automatizados corren 24/7 sin fatiga ni pausas.' },
];

const EJEMPLOS = [
  { from: 'Formulario web', to: 'CRM + Email + Slack + Factura', icon: '📝', color: 'bg-blue-50 border-blue-100' },
  { from: 'Nuevo pedido', to: 'Stock → ERP → Logística → Cliente', icon: '📦', color: 'bg-cyan-50 border-cyan-100' },
  { from: 'Reporte mensual', to: 'Data → Excel → PDF → Email CEO', icon: '📊', color: 'bg-blue-50 border-blue-100' },
  { from: 'Lead en LinkedIn', to: 'CRM → Asignación → Secuencia email', icon: '🎯', color: 'bg-orange-50 border-orange-100' },
];

const PLANES_IMPLEMENTACION = [
  {
    nombre: 'Micro Automatización',
    precio: 'Cotización según diagnóstico',
    desde: false,
    desc: 'Procesos simples y repetitivos para emprendedores o pequeños negocios.',
    incluye: ['1 automatización puntual', 'Integración entre 1-2 herramientas', 'Flujo: Formulario → Email → Sheets', 'Documentación básica de uso', 'Implementación única'],
    noIncluye: ['Monitoreo continuo', 'Optimización mensual', 'Soporte permanente'],
    cta: 'Empezar Micro',
    destacado: false,
  },
  {
    nombre: 'Estratégica',
    precio: 'Cotización según diagnóstico',
    desde: false,
    desc: 'Digitalización de procesos internos de ventas, atención o gestión PYME.',
    incluye: ['3–5 automatizaciones conectadas', 'Integración CRM, WhatsApp, Agenda', 'Dashboard de métricas inicial', 'Optimización de flujo crítico', '3 meses de soporte técnico'],
    cta: 'Contratar Estratégica',
    destacado: true,
  },
  {
    nombre: 'Transformación',
    precio: 'Cotización según diagnóstico',
    desde: false,
    desc: 'Arquitectura completa para digitalizar la operación de una empresa mediana/grande.',
    incluye: ['Arquitectura de automatización total', 'Integración ERP, CRM y APIs custom', 'Panel ejecutivo con KPIs', 'Capacitación completa al equipo', 'Consultoría de procesos avanzada'],
    cta: 'Solicitar Evaluación',
    destacado: false,
  },
];

const PLANES_MENSUALES = [
  {
    nombre: 'On-Demand Support',
    precio: 'Cotización según diagnóstico',
    desc: 'Pague solo cuando necesite un ajuste o reparación.',
    incluye: ['Soporte por hora según diagnóstico', 'Sin compromiso mensual', 'Atención según disponibilidad'],
    acento: 'border-slate-200 bg-slate-50',
  },
  {
    nombre: 'Active Growth',
    precio: 'Cotización según diagnóstico',
    target: 'Para Estratégica',
    desc: 'Garantice que sus flujos nunca se detengan y sigan optimizándose.',
    incluye: ['Soporte prioritario', 'Ajustes menores incluidos', 'Revisión de rendimiento mensual', 'Monitoreo proactivo de errores'],
    acento: 'border-blue-200 bg-blue-50/30',
  },
  {
    nombre: 'Full Ops Managed',
    precio: 'Cotización según diagnóstico',
    target: 'Para Transformación',
    desc: 'Luna operando como su equipo de ingeniería de procesos dedicado.',
    incluye: ['Nuevas automatizaciones cada mes', 'Análisis de procesos continuo', 'Mejora evolutiva constante', 'Reportes ejecutivos de impacto'],
    acento: 'border-blue-200 bg-blue-50/30',
  },
];

const PROCESO = [
  { n: '01', t: 'Mapeo', d: 'Identificamos todos los procesos manuales y calculamos el costo real de cada uno.' },
  { n: '02', t: 'Priorización', d: 'Ordenamos por impacto vs esfuerzo. Empezamos por lo que libera más tiempo.' },
  { n: '03', t: 'Diseño', d: 'Diseñamos el flujo automatizado con todas sus reglas, excepciones y notificaciones.' },
  { n: '04', t: 'Implementación', d: 'Construimos, probamos y validamos en ambiente de staging antes de producción.' },
  { n: '05', t: 'Monitoreo', d: 'El sistema opera solo. Dashboard en tiempo real y alertas si algo falla.' },
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

function PlanAlcancesCard({ plan, index }: { plan: typeof PLANES_IMPLEMENTACION[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`p-5 sm:p-6 rounded-[1.75rem] border flex flex-col h-full transition-all duration-300
        ${plan.destacado ? 'bg-slate-950 text-white shadow-xl shadow-blue-950/20 ring-1 ring-cyan-300/20 z-10' : 'bg-white border-slate-100'}`}
    >
      <p className={`font-mono text-[9px] uppercase tracking-widest mb-4 ${plan.destacado ? 'text-blue-200' : 'text-blue-600'}`}>{plan.nombre}</p>
      <div className="mb-6">
        <p className={`text-xs font-black uppercase tracking-[0.22em] mb-2 ${plan.destacado ? 'text-white/70' : 'text-slate-400'}`}>Alcance</p><p className="text-2xl font-black tracking-tighter leading-none">Cotización según diagnóstico</p><p className={`text-xs font-semibold mt-2 ${plan.destacado ? 'text-white/75' : 'text-slate-600'}`}>Se define después de entender objetivos, integraciones y tiempos reales.</p>
      </div>
      <p className={`text-xs leading-relaxed mb-8 ${plan.destacado ? 'text-blue-100' : 'text-slate-500'}`}>{plan.desc}</p>
      <ul className="space-y-3 mb-8 flex-1">
        {plan.incluye.map(i => (
          <li key={i} className="flex items-center gap-3 text-xs font-medium">
            <span className={plan.destacado ? 'text-white' : 'text-blue-600'}>✓</span> {i}
          </li>
        ))}
        {plan.noIncluye && plan.noIncluye.map(i => (
          <li key={i} className="flex items-center gap-3 text-xs opacity-50 line-through">
            <span>×</span> {i}
          </li>
        ))}
      </ul>
      <Link href="/contacto" className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-center transition-all ${plan.destacado ? 'bg-white text-slate-950 shadow-lg' : 'bg-slate-900 text-white hover:bg-blue-700'}`}>
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
      transition={{ delay: index * 0.1 }}
      className={`p-5 rounded-[1.5rem] border ${plan.acento} flex flex-col h-full hover:shadow-xl transition-all`}
    >
      <div className="mb-4">
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-1">{plan.nombre}</h3>
        {plan.target && <p className="text-[9px] font-bold text-blue-600 uppercase tracking-tighter">{plan.target}</p>}
      </div>
      <div className="mb-4">
        <span className="text-lg font-black text-slate-900 leading-tight">Soporte según alcance</span>
        <span className="text-[10px] font-bold text-slate-400"> / mes</span>
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
export default function AutomatizacionPage() {
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
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-blue-700">Efficiency Engineering</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(2.15rem,5.4vw,4.6rem)] font-black leading-[0.85] tracking-tighter uppercase mb-6"
              >
                FLUJOS QUE<br />
                <span className="text-blue-600 italic">escalan.</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
                className="text-base md:text-lg text-slate-500 leading-relaxed mb-8 max-w-md">
                Eliminamos la redundancia operativa para que sus equipos hagan más en menos tiempo,{' '}
                <span className="text-slate-900 font-semibold">con error humano cercano a cero.</span>
              </motion.p>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
                className="flex flex-wrap gap-4">
                {[
                  { v: '40h', l: 'Ahorradas / mes' },
                  { v: '~0%', l: 'Error humano' },
                  { v: '8x', l: 'ROI promedio' },
                ].map((m) => (
                  <div key={m.l} className="bg-white border border-slate-100 rounded-2xl px-5 py-4 shadow-sm">
                    <span className="block text-2xl font-black tracking-tighter text-blue-600">{m.v}</span>
                    <span className="font-mono text-[8px] uppercase tracking-widest text-slate-400">{m.l}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Visual: pipeline animado */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block"
            >
              <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-xl">
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-slate-400 mb-6">Pipeline en ejecución</p>

                {/* Nodos del pipeline */}
                <div className="space-y-3">
                  {[
                    { label: 'TRIGGER', sub: 'Nuevo formulario recibido', status: 'done', color: 'bg-cyan-500' },
                    { label: 'PASO 1', sub: 'Crear contacto en CRM', status: 'done', color: 'bg-cyan-500' },
                    { label: 'PASO 2', sub: 'Enviar email de bienvenida', status: 'done', color: 'bg-cyan-500' },
                    { label: 'PASO 3', sub: 'Notificar equipo en Slack', status: 'running', color: 'bg-blue-500' },
                    { label: 'PASO 4', sub: 'Generar factura en ERP', status: 'pending', color: 'bg-slate-200' },
                    { label: 'PASO 5', sub: 'Asignar vendedor', status: 'pending', color: 'bg-slate-200' },
                  ].map((node, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      {/* Dot + línea */}
                      <div className="flex flex-col items-center shrink-0">
                        <div className={`w-3 h-3 rounded-full ${node.color} ${node.status === 'running' ? 'animate-pulse ring-4 ring-sky-100' : ''}`} />
                        {i < 5 && <div className="w-px h-4 bg-slate-100" />}
                      </div>
                      {/* Contenido */}
                      <div className={`flex-1 flex items-center justify-between px-4 py-2.5 rounded-xl border text-xs
                        ${node.status === 'done' ? 'bg-cyan-50 border-cyan-100' :
                          node.status === 'running' ? 'bg-blue-50 border-blue-200' :
                          'bg-slate-50 border-slate-100'}`}
                      >
                        <div>
                          <span className={`font-mono font-bold text-[8px] uppercase tracking-widest block
                            ${node.status === 'done' ? 'text-cyan-600' : node.status === 'running' ? 'text-blue-600' : 'text-slate-300'}`}>
                            {node.label}
                          </span>
                          <span className={`text-[10px] font-medium ${node.status === 'pending' ? 'text-slate-300' : 'text-slate-600'}`}>{node.sub}</span>
                        </div>
                        {node.status === 'done' && <span className="text-cyan-500 text-xs">✓</span>}
                        {node.status === 'running' && <span className="inline-block w-1.5 h-3 bg-blue-400 animate-pulse rounded-sm" />}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="font-mono text-[8px] text-slate-400 uppercase tracking-widest">Tiempo total estimado</span>
                  <span className="font-mono text-xs font-black text-blue-600">1.4s ⚡</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── IMPACTO REAL ─────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-5 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-10">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-blue-600 mb-2">Impacto medible</p>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
              Lo que <span className="text-blue-600 italic">gana.</span>
            </h2>
          </motion.div>

          {/* Métricas de ahorro */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {AHORROS.map((a, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white border border-slate-100 rounded-2xl p-6 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-50 transition-all duration-400"
              >
                <span className="text-2xl mb-3 block">{a.icon}</span>
                <span className="block text-3xl font-black text-blue-600 tracking-tighter mb-1">{a.valor}</span>
                <span className="font-mono text-[8px] uppercase tracking-widest text-slate-900 font-bold block mb-2">{a.titulo}</span>
                <p className="text-xs text-slate-500 leading-relaxed">{a.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Ejemplos de flujos */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-8">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-blue-600 mb-2">Ejemplos reales</p>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
              Flujos que <span className="text-blue-600 italic">automatizamos.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
            {EJEMPLOS.map((e, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`border rounded-2xl p-5 flex items-center gap-4 ${e.color}`}
              >
                <span className="text-2xl shrink-0">{e.icon}</span>
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="text-xs font-black text-slate-700 uppercase tracking-tight shrink-0">{e.from}</span>
                  <svg className="w-5 h-5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                  <span className="text-xs text-slate-500 truncate">{e.to}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Features grid */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-8">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-blue-600 mb-2">Capacidades</p>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
              Qué <span className="text-blue-600 italic">construimos.</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => <FeatureCard key={i} f={f} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── PROCESO ───────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-5 md:px-6 relative overflow-hidden"
        style={{ backgroundColor: '#f0f7ff' }}>
        <div className="absolute inset-0 pointer-events-none opacity-40"
          style={{ backgroundImage: 'radial-gradient(#bae6fd 1px,transparent 1px)', backgroundSize: '22px 22px' }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-10">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-blue-600 mb-2">Metodología</p>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
              Cómo lo <span className="text-blue-600 italic">implementamos.</span>
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

      {/* ── ALCANCES ───────────────────────────────────────────────────────── */}
      {/* ── SECCIÓN: IMPLEMENTACIÓN (CAPEX) ── */}
      <section className="py-14 md:py-20 px-5 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-blue-600 mb-2">Build & Automate</p>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter italic">Alcances — <span className="text-blue-600">Procesos.</span></h2>
            <p className="text-slate-500 text-sm mt-4">Definimos alcance, prioridades y esfuerzo después de un diagnóstico breve.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANES_IMPLEMENTACION.map((plan, i) => <PlanAlcancesCard key={i} plan={plan} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── SECCIÓN: MENSUALIDADES (OPEX / LUNA) ── */}
      <section className="py-14 md:py-20 px-5 md:px-6 bg-[#F8FAFC] border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-blue-600 mb-2">Continuidad & Optimización</p>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none">Managed <span className="italic text-slate-400">Operations.</span></h2>
              <p className="text-slate-500 text-sm mt-6 leading-relaxed">
                El entorno digital cambia, sus automatizaciones deben adaptarse. Gestión mensual de errores, soporte y mejora continua.
                <span className="text-slate-900 font-bold ml-2 underline decoration-blue-500 decoration-2 underline-offset-4 text-xs uppercase">Cotización según alcance</span>
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
          className="max-w-3xl mx-auto rounded-[2rem] border border-cyan-300/20 bg-slate-950 p-7 sm:p-8 md:p-10 relative overflow-hidden shadow-xl shadow-blue-950/20"
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/25 rounded-full blur-3xl -mr-36 -mt-36 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-52 h-52 bg-cyan-400/10 rounded-full blur-2xl -ml-24 -mb-24 pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none opacity-[0.07]"
            style={{ backgroundImage: 'radial-gradient(#fff 1px,transparent 1px)', backgroundSize: '20px 20px' }} />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-cyan-200 mb-3">¿Cuánto tiempo pierde su equipo?</p>
              <h2 className="text-2xl md:text-3xl font-black tracking-tighter uppercase leading-[0.9] text-white mb-3">
                Mapeemos sus<br />procesos gratis.
              </h2>
              <p className="text-cyan-100/80 text-sm font-light max-w-sm">
                En 30 minutos identificamos qué procesos tienen más impacto al automatizarlos y le damos el plan de acción.
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <Link href="/contacto"
                className="group inline-flex items-center gap-3 bg-white text-slate-950 px-7 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl whitespace-nowrap">
                Auditar mis Procesos
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link href="/proyectos"
                className="inline-flex items-center justify-center gap-2 text-cyan-200 hover:text-white text-xs uppercase tracking-widest font-bold transition-colors">
                Ver automatizaciones →
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

    </main>
  );
}




