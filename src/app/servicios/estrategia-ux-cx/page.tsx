"use client";

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// ─── Data ─────────────────────────────────────────────────────────────────────
const SERVICIOS_UX = [
  { icon: '🔍', titulo: 'Auditoría UX Completa', desc: 'Evaluación experta de su interfaz actual contra heurísticas de Nielsen, principios de Gestalt y estándares WCAG. Entregamos un reporte con cada fricción identificada y su impacto estimado.' },
  { icon: '🧪', titulo: 'User Testing', desc: 'Sesiones de prueba con usuarios reales de su público objetivo. Grabamos, analizamos y extraemos insights accionables de cómo la gente navega su producto.' },
  { icon: '🔥', titulo: 'Heatmaps & Session Recording', desc: 'Instalación y análisis de Hotjar o Microsoft Clarity. Vemos exactamente dónde hacen clic, dónde se detienen y dónde abandonan.' },
  { icon: '🗺️', titulo: 'Customer Journey Mapping', desc: 'Diseño del mapa completo de experiencia del cliente, desde el primer contacto hasta la fidelización. Identificamos cada punto de quiebre.' },
  { icon: '🧪', titulo: 'A/B Testing', desc: 'Diseño y ejecución de experimentos controlados para validar hipótesis antes de implementar cambios. Decisiones basadas en datos, no en opiniones.' },
  { icon: '📐', titulo: 'Diseño de Solución', desc: 'Una vez identificados los problemas, diseñamos las soluciones en Figma con wireframes y prototipos navegables listos para desarrollo.' },
];


const FRICCIONES = [
  { problema: 'Usuarios abandonan el checkout', causa: 'Demasiados pasos + sin indicador de progreso', impacto: '-34% conversión' },
  { problema: 'Alto rebote en landing page', causa: 'CTA poco visible + propuesta de valor difusa', impacto: '+62% rebote' },
  { problema: 'Usuarios no encuentran el botón de compra', causa: 'Jerarquía visual incorrecta', impacto: '-28% clics' },
  { problema: 'Formulario de contacto sin respuesta', causa: 'Demasiados campos obligatorios', impacto: '-51% envíos' },
];

const DELIVERABLES = [
  { icon: '📄', titulo: 'Reporte de Auditoría', desc: 'Documento detallado con cada fricción encontrada, evidencia visual y recomendación de solución priorizada por impacto.' },
  { icon: '🎬', titulo: 'Videos de Sesiones', desc: 'Grabaciones de usuarios reales interactuando con su producto. Vale más que mil reuniones.' },
  { icon: '🗺️', titulo: 'Journey Map', desc: 'Mapa visual del recorrido completo del cliente con emociones, puntos de dolor y oportunidades.' },
  { icon: '📐', titulo: 'Prototipos Figma', desc: 'Soluciones diseñadas y navegables, listas para entregar al equipo de desarrollo.' },
];

const PLANES = [
  {
    nombre: 'Auditoría',
    precio: 'Cotización según diagnóstico',
    desde: false,
    desc: 'Revisión experta de su interfaz actual con reporte detallado de fricciones.',
    incluye: [
      'Auditoría heurística completa',
      'Análisis de heatmaps según alcance',
      'Reporte PDF con hallazgos',
      'Priorización por impacto/esfuerzo',
      'Sesión de presentación',
      'Acompañamiento posterior acordado'
    ],
    cta: 'Contratar Auditoría',
    destacado: false,
  },
  {
    nombre: 'Research & UX',
    precio: 'Cotización según diagnóstico',
    desde: false,
    desc: 'Auditoría completa + user testing real + journey map + prototipos Figma.',
    incluye: [
      'Todo del plan Auditoría',
      'Sesiones de user testing según alcance',
      'Customer Journey Map',
      'A/B testing según hipótesis priorizadas',
      'Prototipos de solución Figma',
      'Guía de implementación técnica'
    ],
    cta: 'Contratar Research',
    destacado: true,
  },
  {
    nombre: 'Consultancy',
    precio: 'Cotización según diagnóstico',
    mensual: true,
    desc: 'Consultoría continua mensual embebida en su equipo para optimización constante.',
    incluye: [
      'Acompañamiento UX/CX recurrente',
      'Revisión de cada release/update',
      'Dashboard de métricas UX/ROI',
      'Capacitación técnica al equipo',
      'Soporte prioritario según acuerdo',
      'Optimización de funnel activa'
    ],
    cta: 'Agendar Llamada',
    destacado: false,
    especial: true,
  },
];

const PROCESO = [
  { n: '01', t: 'Diagnóstico', d: 'Instalamos herramientas de analítica y recolectamos datos reales de comportamiento durante un periodo acordado según el tráfico y alcance.' },
  { n: '02', t: 'Research', d: 'Sesiones con usuarios reales, análisis de heatmaps y revisión heurística exhaustiva.' },
  { n: '03', t: 'Síntesis', d: 'Transformamos datos en insights. Identificamos patrones y priorizamos por impacto en conversión.' },
  { n: '04', t: 'Diseño', d: 'Diseñamos las soluciones en Figma: wireframes, prototipos navegables y guía de implementación.' },
  { n: '05', t: 'Validación', d: 'Testeamos las soluciones con usuarios antes de implementar. Solo construimos lo que funciona.' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────
function ServicioCard({ s, index }: { s: typeof SERVICIOS_UX[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group bg-white border border-slate-100 rounded-2xl p-6 hover:border-cyan-100 hover:shadow-xl hover:shadow-cyan-50 hover:-translate-y-1 transition-all duration-400"
    >
      <span className="text-2xl mb-4 block">{s.icon}</span>
      <h3 className="text-sm font-black uppercase tracking-tight text-slate-900 mb-2 group-hover:text-cyan-600 transition-colors">{s.titulo}</h3>
      <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
    </motion.div>
  );
}

function PlanCard({ plan, index }: { plan: typeof PLANES[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative rounded-[2.5rem] p-8 flex flex-col border transition-all duration-500
        ${plan.especial ? 'bg-slate-50 border-cyan-200' : ''}
        ${plan.destacado
          ? 'bg-slate-950 text-white border-cyan-300/20 shadow-xl shadow-blue-950/20 z-10'
          : 'bg-white text-slate-900 border-slate-100 hover:border-cyan-100'
        }`}
    >
      {plan.destacado && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
          Máximo Retorno
        </div>
      )}

      <div className="mb-6">
        <p className={`font-mono text-[9px] uppercase tracking-[0.25em] mb-4 ${plan.destacado ? 'text-cyan-200' : 'text-cyan-600'}`}>
          {plan.nombre}
        </p>
        
        <div className="mb-4">
          <div className="flex items-baseline gap-1">
            {plan.desde && <span className={`text-xs font-medium ${plan.destacado ? 'text-cyan-200' : 'text-slate-400'}`}>Desde</span>}
            <span className="text-4xl font-black tracking-tighter tabular-nums">{plan.precio}</span>
            {plan.mensual && <span className="text-sm font-bold opacity-60"> / mes</span>}
          </div>
        </div>
        
        <p className={`text-xs leading-relaxed ${plan.destacado ? 'text-cyan-100' : 'text-slate-500'}`}>{plan.desc}</p>
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {plan.incluye.map((item) => (
          <li key={item} className="flex items-center gap-3 text-xs font-medium">
            <span className={plan.destacado ? 'text-white' : 'text-cyan-600'}>✓</span> {item}
          </li>
        ))}
      </ul>

      <Link href="/contacto" className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-center transition-all ${plan.destacado ? 'bg-white text-slate-950 shadow-lg' : 'bg-slate-900 text-white hover:bg-blue-700'}`}>
        {plan.cta}
      </Link>
    </motion.div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function UXPage() {
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: '-60px' });

  return (
    <main className="min-h-screen bg-white text-slate-900 overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-20 px-5 md:px-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #f0f7ff 0%, #ffffff 55%)' }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(#0891b2 1px,transparent 1px),linear-gradient(90deg,#0891b2 1px,transparent 1px)', backgroundSize: '52px 52px' }} />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-cyan-100 rounded-full blur-[120px] opacity-60 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <Link href="/servicios" className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-600 transition-colors text-xs font-bold uppercase tracking-widest mb-10 group">
              <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Todos los servicios
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
                className="inline-flex items-center gap-2 bg-white border border-cyan-100 shadow-sm px-3.5 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-cyan-700">Master Consultancy</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(2.15rem,5.4vw,4.6rem)] font-black leading-[0.85] tracking-tighter uppercase mb-6"
              >
                PSICOLOGÍA<br />
                <span className="text-cyan-600 italic">digital.</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
                className="text-base md:text-lg text-slate-500 leading-relaxed mb-8 max-w-md">
                Identificamos las fricciones ocultas que le están costando clientes y diseñamos la{' '}
                <span className="text-slate-900 font-semibold">experiencia que convierte y fideliza.</span>
              </motion.p>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
                className="flex flex-wrap gap-4">
                {[
                  { v: '+45%', l: 'Conversión promedio' },
                  { v: '-60%', l: 'Tasa de rebote' },
                  { v: '2 sem', l: 'Primeros insights' },
                ].map((m) => (
                  <div key={m.l} className="bg-white border border-slate-100 rounded-2xl px-5 py-4 shadow-sm">
                    <span className="block text-2xl font-black tracking-tighter text-cyan-600">{m.v}</span>
                    <span className="font-mono text-[8px] uppercase tracking-widest text-slate-400">{m.l}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Visual: reporte de fricción */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block"
            >
              <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-xl">
                <div className="flex items-center justify-between mb-5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-slate-400">Reporte de auditoría</p>
                  <span className="bg-red-50 text-red-600 text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border border-red-100">
                    12 fricciones detectadas
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    { sev: 'CRÍTICO', label: 'CTA invisible en mobile', impact: '-41% conversión', color: 'bg-red-50 border-red-100 text-red-600', dot: 'bg-red-500' },
                    { sev: 'ALTO', label: 'Checkout de 7 pasos', impact: '-29% completación', color: 'bg-orange-50 border-orange-100 text-orange-600', dot: 'bg-orange-500' },
                    { sev: 'ALTO', label: 'Sin social proof en precio', impact: '-18% confianza', color: 'bg-orange-50 border-orange-100 text-orange-600', dot: 'bg-orange-500' },
                    { sev: 'MEDIO', label: 'Formulario con 12 campos', impact: '-52% envíos', color: 'bg-yellow-50 border-yellow-100 text-yellow-700', dot: 'bg-yellow-400' },
                    { sev: 'MEDIO', label: 'Velocidad de carga 6.2s', impact: '-35% retención', color: 'bg-yellow-50 border-yellow-100 text-yellow-700', dot: 'bg-yellow-400' },
                  ].map((row, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl border text-xs ${row.color}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-2 h-2 rounded-full shrink-0 ${row.dot}`} />
                        <div>
                          <span className="font-black text-[8px] uppercase tracking-widest block opacity-70">{row.sev}</span>
                          <span className="font-medium text-slate-700">{row.label}</span>
                        </div>
                      </div>
                      <span className="font-black text-[10px] shrink-0 ml-3">{row.impact}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="font-mono text-[8px] text-slate-400 uppercase tracking-widest">Impacto total estimado</span>
                  <span className="font-mono text-sm font-black text-cyan-600">Impacto medible anual</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FRICCIONES TÍPICAS ────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-5 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-10">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-cyan-600 mb-2">Lo que encontramos</p>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
              Fricciones que <span className="text-cyan-600 italic">cuestan.</span>
            </h2>
            <p className="text-slate-500 text-sm mt-3 max-w-lg">Estos son los problemas más comunes que encontramos en las auditorías. ¿Cuántos tiene su sitio?</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
            {FRICCIONES.map((f, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group bg-white border border-slate-100 rounded-2xl p-6 hover:border-red-100 hover:shadow-lg hover:shadow-red-50 transition-all duration-400"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">{f.problema}</h3>
                  <span className="bg-red-50 text-red-600 text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border border-red-100 whitespace-nowrap shrink-0">{f.impacto}</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  <span className="font-semibold text-slate-700">Causa raíz: </span>{f.causa}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Qué entregamos */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-8">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-cyan-600 mb-2">Entregables</p>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
              Qué <span className="text-cyan-600 italic">recibe.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {DELIVERABLES.map((d, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group bg-cyan-50 border border-cyan-100 rounded-2xl p-5 hover:bg-blue-700 hover:border-transparent hover:shadow-xl hover:shadow-cyan-100 hover:-translate-y-1 transition-all duration-400 text-center"
              >
                <span className="text-2xl mb-3 block">{d.icon}</span>
                <h3 className="text-xs font-black uppercase tracking-tight text-slate-900 mb-2 group-hover:text-white transition-colors">{d.titulo}</h3>
                <p className="text-[10px] text-slate-500 leading-relaxed group-hover:text-cyan-100 transition-colors">{d.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Servicios */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-8">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-cyan-600 mb-2">Metodología</p>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
              Qué <span className="text-cyan-600 italic">hacemos.</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICIOS_UX.map((s, i) => <ServicioCard key={i} s={s} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── PROCESO ───────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-5 md:px-6 relative overflow-hidden"
        style={{ backgroundColor: '#f0f7ff' }}>
        <div className="absolute inset-0 pointer-events-none opacity-40"
          style={{ backgroundImage: 'radial-gradient(#a7f3d0 1px,transparent 1px)', backgroundSize: '22px 22px' }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-10">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-cyan-600 mb-2">El proceso</p>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
              De fricción a <span className="text-cyan-600 italic">conversión.</span>
            </h2>
          </motion.div>
          <div className="relative">
            <div className="hidden md:block absolute top-7 left-6 right-6 h-px bg-cyan-100 z-0" />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
              {PROCESO.map((paso, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group bg-white border border-slate-100 rounded-2xl p-5 hover:border-cyan-100 hover:shadow-lg hover:shadow-cyan-50 hover:-translate-y-1 transition-all duration-400"
                >
                  <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center mb-4">
                    <span className="font-mono text-[9px] font-black text-white">{paso.n}</span>
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-tight text-slate-900 mb-2 group-hover:text-cyan-600 transition-colors">{paso.t}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{paso.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ALCANCES ───────────────────────────────────────────────────────── */}
      {/* ── SECCIÓN: PLANES (INVERSIÓN) ── */}
      <section className="py-14 md:py-20 px-5 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-cyan-600 mb-2">Alcance táctico</p>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter italic">Planes <span className="text-cyan-600">UX/CX.</span></h2>
            <p className="text-slate-500 text-sm mt-4">Una interfaz optimizada no es un gasto, es la inversión con mayor ROI de su negocio.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANES.map((plan, i) => <PlanCard key={i} plan={plan} index={i} />)}
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
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-cyan-200 mb-3">¿Cuánto le cuesta la mala UX?</p>
              <h2 className="text-2xl md:text-3xl font-black tracking-tighter uppercase leading-[0.9] text-white mb-3">
                Auditemos su<br />experiencia gratis.
              </h2>
              <p className="text-cyan-100 text-sm font-light max-w-sm">
                En 30 minutos revisamos su sitio en vivo y le mostramos las 3 fricciones principales que le están costando ventas hoy.
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <Link href="/contacto"
                className="group inline-flex items-center gap-3 bg-white text-slate-950 px-7 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl whitespace-nowrap">
                Auditoría Express Gratis
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link href="/servicios"
                className="inline-flex items-center justify-center gap-2 text-cyan-200 hover:text-white text-xs uppercase tracking-widest font-bold transition-colors">
                Ver todos los servicios →
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

    </main>
  );
}




