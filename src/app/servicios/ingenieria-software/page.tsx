"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const METRICAS = [
  { icon: '⚡', titulo: 'Latencia API', valor: '<80ms', desc: 'Tiempo de respuesta promedio en sistemas de producción optimizados.' },
  { icon: '🟢', titulo: 'Disponibilidad', valor: '99.9%', desc: 'Uptime garantizado en arquitecturas con redundancia y failover automático.' },
  { icon: '📉', titulo: 'Deuda técnica', valor: '-70%', desc: 'Reducción promedio de deuda técnica tras auditoría y refactorización.' },
  { icon: '🚀', titulo: 'Time to Deploy', valor: '10x', desc: 'Aceleración del ciclo de release con pipelines CI/CD bien configurados.' },
];

const CAPACIDADES = [
  { icon: '🏗️', titulo: 'Arquitectura de Microservicios', desc: 'Diseñamos sistemas modulares desacoplados que escalan de forma independiente, eliminando cuellos de botella y garantizando disponibilidad continua.' },
  { icon: '⚙️', titulo: 'Sistemas de Misión Crítica', desc: 'Software diseñado para alta disponibilidad, tolerancia a fallos, recuperación automática e integridad de datos.' },
  { icon: '🚀', titulo: 'Optimización de Algoritmos', desc: 'Análisis y refactorización de procesos computacionales complejos para reducir latencia, consumo de recursos y costos operativos.' },
  { icon: '🗄️', titulo: 'Bases de Datos de Alta Carga', desc: 'Diseño de esquemas, indexación avanzada y tuning para manejar volúmenes masivos de información sin degradación de rendimiento.' },
  { icon: '🔐', titulo: 'Seguridad & Compliance', desc: 'Implementación de autenticación robusta, cifrado de datos, auditoría de accesos y cumplimiento de estándares como ISO 27001 y GDPR.' },
  { icon: '🔄', titulo: 'CI/CD & DevOps', desc: 'Pipelines de integración y despliegue controlado que reducen errores humanos y permiten publicar cambios de forma más segura.' },
];

const PLANES_INVERSION = [
  {
    nombre: 'Auditoría',
    desc: 'Diagnóstico completo de su arquitectura actual con reporte de riesgos y hoja de ruta técnica.',
    incluye: ['Auditoría de arquitectura', 'Análisis de deuda técnica', 'Reporte de riesgos estructurales', 'Hoja de ruta de mejoras', 'Sesión de presentación', 'Plazo según alcance'],
    cta: 'Contratar Auditoría',
    destacado: false,
  },
  {
    nombre: 'Build',
    desc: 'Desarrollo completo de sistema o módulo crítico con arquitectura robusta, documentación y CI/CD.',
    incluye: ['Arquitectura a medida', 'Desarrollo full-stack', 'Base de datos optimizada', 'CI/CD pipeline completo', 'Tests automatizados', 'Documentación técnica', '3 meses de soporte'],
    cta: 'Contratar Build',
    destacado: true,
  },
  {
    nombre: 'Enterprise',
    desc: 'Sistemas de misión crítica con SLA, equipo dedicado e integración a infraestructura existente.',
    incluye: ['Arquitectura distribuida', 'Alta disponibilidad según objetivo', 'Seguridad enterprise', 'Soporte según acuerdo', 'Continuidad operativa', 'Roadmap evolutivo'],
    cta: 'Agendar Llamada',
    destacado: false,
  },
];

const PLANES_MENSUALES = [
  {
    nombre: 'Dev Basic Care',
    target: 'Para sistemas iniciales',
    desc: 'Mantenimiento crítico de servidores, base de datos y monitoreo para sistemas en producción.',
    incluye: ['Hosting & servidor gestionado', 'BD con backups diarios', 'SSL + firewall activo', 'Monitoreo de uptime', 'Soporte ante incidentes'],
    noIncluye: ['Nuevas funcionalidades', 'Refactorizaciones', 'CI/CD avanzado'],
    acento: 'border-cyan-100 bg-cyan-50/30',
  },
  {
    nombre: 'Dev Business Care',
    target: 'Para sistemas productivos',
    desc: 'Continuidad operativa y partner técnico para mantener y escalar su sistema sin sorpresas.',
    incluye: ['Infraestructura elástica', 'BD optimizada y monitorizada', 'Actualizaciones de dependencias', '1 mejora técnica mensual', 'Revisión de seguridad mensual'],
    acento: 'border-blue-100 bg-blue-50/30',
  },
  {
    nombre: 'Dev Scale / SaaS',
    target: 'Para ingresos reales',
    desc: 'Operación avanzada para arquitecturas distribuidas de alto tráfico y misión crítica.',
    incluye: ['Infraestructura Cloud Pro', 'Auto-scaling activo', 'Monitoreo con alertas', 'Acuerdo de soporte según criticidad', 'CI/CD pipeline gestionado'],
    acento: 'border-slate-200 bg-slate-50',
  },
];

const PROCESO = [
  { n: '01', t: 'Auditoría Técnica', d: 'Evaluamos el estado actual de su arquitectura, identificamos deuda técnica, cuellos de botella y riesgos estructurales.' },
  { n: '02', t: 'Diseño de Arquitectura', d: 'Definimos el stack, los patrones de diseño y la estructura de datos óptima para sus requerimientos de escala y rendimiento.' },
  { n: '03', t: 'Desarrollo por etapas', d: 'Avanzamos con entregables funcionales y revisiones técnicas según prioridades, complejidad y forma de trabajo acordada.' },
  { n: '04', t: 'Testing & QA', d: 'Aplicamos pruebas funcionales, integración, carga y seguridad según el tipo de sistema y criticidad del proyecto.' },
  { n: '05', t: 'Despliegue & Monitoreo', d: 'Infraestructura como código, despliegue automatizado y dashboards de observabilidad en tiempo real.' },
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
      className="group bg-white border border-slate-100 rounded-2xl p-6 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-100 hover:-translate-y-1 transition-all duration-400"
    >
      <span className="text-2xl mb-4 block">{c.icon}</span>
      <h3 className="text-sm font-black uppercase tracking-tight text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{c.titulo}</h3>
      <p className="text-xs text-slate-500 leading-relaxed">{c.desc}</p>
    </motion.div>
  );
}

function PlanInversionCard({ plan, index }: { plan: typeof PLANES_INVERSION[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`p-5 sm:p-6 rounded-[1.75rem] border flex flex-col h-full transition-all duration-300
        ${plan.destacado ? 'bg-slate-950 text-white shadow-xl shadow-blue-950/20 ring-1 ring-cyan-300/20 z-10' : 'bg-white border-slate-100'}`}
    >
      <p className={`font-mono text-[9px] uppercase tracking-widest mb-4 ${plan.destacado ? 'text-slate-400' : 'text-blue-600'}`}>{plan.nombre}</p>
      <div className="mb-6">
        <p className={`text-xs font-black uppercase tracking-[0.22em] mb-2 ${plan.destacado ? 'text-white/70' : 'text-slate-400'}`}>Alcance</p>
        <p className={`text-2xl font-black tracking-tighter leading-none ${plan.destacado ? 'text-white' : 'text-slate-900'}`}>Cotizar</p>
        <p className={`text-xs font-semibold mt-2 ${plan.destacado ? 'text-white/75' : 'text-slate-600'}`}>Cotización según diagnóstico.</p>
      </div>
      <p className={`text-xs leading-relaxed mb-8 ${plan.destacado ? 'text-slate-300' : 'text-slate-500'}`}>{plan.desc}</p>
      <ul className="space-y-3 mb-8 flex-1">
        {plan.incluye.map(i => (
          <li key={i} className="flex items-center gap-3 text-xs font-medium">
            <span className={plan.destacado ? 'text-white' : 'text-blue-600'}>✓</span> {i}
          </li>
        ))}
      </ul>
      <Link href="/contacto" className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-center transition-all ${plan.destacado ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'}`}>
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
export default function IngenieriaSoftwarePage() {
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: '-60px' });

  return (
    <main className="min-h-screen bg-white text-slate-900 overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-20 px-5 md:px-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #f0f7ff 0%, #ffffff 55%)' }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(#2563eb 1px,transparent 1px),linear-gradient(90deg,#2563eb 1px,transparent 1px)', backgroundSize: '52px 52px' }} />
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[120px] opacity-60 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <Link href="/servicios"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors text-xs font-bold uppercase tracking-widest mb-10 group">
              <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Todos los servicios
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
                className="inline-flex items-center gap-2 bg-white border border-slate-100 shadow-sm px-3.5 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-700 animate-pulse" />
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-slate-700">Software Engineering</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(2.15rem,5.4vw,4.6rem)] font-black leading-[0.85] tracking-tighter uppercase mb-6"
              >
                INGENIERÍA DE<br />
                <span className="text-blue-600 italic">software.</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
                className="text-base md:text-lg text-slate-500 leading-relaxed mb-8 max-w-md">
                Diseñamos y construimos el núcleo operativo de las empresas.{' '}
                <span className="text-slate-900 font-semibold">Sistemas robustos, escalables y sin deuda técnica.</span>
              </motion.p>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
                className="flex flex-wrap gap-4">
                {[
                  { v: '99.9%', l: 'Uptime' },
                  { v: '<80ms', l: 'Latencia' },
                  { v: '-70%', l: 'Deuda técnica' },
                ].map((m) => (
                  <div key={m.l} className="bg-white border border-slate-100 rounded-2xl px-5 py-4 shadow-sm">
                    <span className="block text-lg font-black tracking-tighter text-slate-900">{m.v}</span>
                    <span className="font-mono text-[8px] uppercase tracking-widest text-blue-600">{m.l}</span>
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
                src="/imagenes/yonko_ingenieria_software.webp"
                alt="Equipo construyendo ingeniería de software"
                width={520}
                height={520}
                className="relative z-10 h-auto w-full max-w-[360px] object-contain drop-shadow-2xl xl:max-w-[430px]"
                priority
              />
              <div className="absolute bottom-5 left-5 right-5 z-20 rounded-2xl border border-white/70 bg-white/85 px-4 py-3 shadow-lg backdrop-blur">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">Solución en desarrollo</p>
                <p className="mt-1 text-sm font-semibold leading-snug text-slate-700">Sistemas robustos, escalables y sin deuda técnica.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MÉTRICAS + CAPACIDADES ────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-5 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-blue-600 mb-2">Impacto medible</p>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
                Por qué <span className="text-blue-600 italic">importa.</span>
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
                <span className="block text-3xl font-black text-slate-900 tracking-tighter mb-1">{m.valor}</span>
                <span className="font-mono text-[8px] uppercase tracking-widest text-blue-600 font-bold block mb-2">{m.titulo}</span>
                <p className="text-xs text-slate-500 leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-8">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-blue-600 mb-2">Capacidades</p>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
              Qué <span className="text-blue-600 italic">construimos.</span>
            </h2>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CAPACIDADES.map((c, i) => <CapacidadCard key={i} c={c} index={i} />)}
            </div>
            <div className="hidden lg:block">
<div className="lg:sticky lg:top-28">
            
            
                        {/* Visual: terminal de código */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.94 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                          className="hidden lg:block"
                        >
                          <div className="bg-slate-950 rounded-[1.5rem] overflow-hidden shadow-lg border border-white/5">
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-slate-900">
                              <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                              </div>
                              <span className="font-mono text-[9px] text-slate-500 ml-2">architecture.ts</span>
                            </div>
                            <div className="p-4 font-mono text-[9px] leading-5 select-none">
                              <div><span className="text-slate-500">1 </span><span className="text-blue-400">import</span><span className="text-white"> {'{ microservice }'} </span><span className="text-blue-400">from</span><span className="text-green-400"> '@empresa/core'</span></div>
                              <div><span className="text-slate-500">2 </span></div>
                              <div><span className="text-slate-500">3 </span><span className="text-blue-400">const</span><span className="text-white"> system </span><span className="text-slate-400">=</span><span className="text-yellow-400"> microservice</span><span className="text-white">{'({'}</span></div>
                              <div><span className="text-slate-500">4 </span><span className="text-white">  </span><span className="text-slate-300">name</span><span className="text-slate-400">:</span><span className="text-green-400"> 'payment-service'</span><span className="text-slate-400">,</span></div>
                              <div><span className="text-slate-500">5 </span><span className="text-white">  </span><span className="text-slate-300">replicas</span><span className="text-slate-400">:</span><span className="text-orange-400"> 3</span><span className="text-slate-400">,</span></div>
                              <div><span className="text-slate-500">6 </span><span className="text-white">  </span><span className="text-slate-300">uptime</span><span className="text-slate-400">:</span><span className="text-green-400"> '99.9%'</span><span className="text-slate-400">,</span></div>
                              <div><span className="text-slate-500">7 </span><span className="text-white">  </span><span className="text-slate-300">latency</span><span className="text-slate-400">:</span><span className="text-green-400"> '&lt;80ms'</span><span className="text-slate-400">,</span></div>
                              <div><span className="text-slate-500">8 </span><span className="text-white">{'}'}</span><span className="text-slate-400">)</span></div>
                              <div><span className="text-slate-500">9 </span></div>
                              <div><span className="text-slate-500">10</span><span className="text-blue-400"> await</span><span className="text-white"> system</span><span className="text-slate-400">.</span><span className="text-yellow-400">deploy</span><span className="text-white">()</span></div>
                              <div><span className="text-slate-500">11</span></div>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-slate-500">12</span>
                                <span className="text-cyan-400">▶ Deployed successfully</span>
                                <span className="inline-block w-1.5 h-4 bg-cyan-400 animate-pulse rounded-sm ml-1" />
                              </div>
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
        style={{ background: 'repeating-linear-gradient(135deg, #f8fafc 0px, #f8fafc 20px, #f1f5f9 20px, #f1f5f9 21px)' }}>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-10">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-blue-600 mb-2">Metodología</p>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
              Proceso <span className="text-blue-600 italic">probado.</span>
            </h2>
          </motion.div>
          <div className="relative">
            <div className="hidden md:block absolute top-7 left-6 right-6 h-px bg-slate-200 z-0" />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
              {PROCESO.map((paso, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group bg-white border border-slate-100 rounded-2xl p-5 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-50 hover:-translate-y-1 transition-all duration-400"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center mb-4">
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

      {/* ── SECCIÓN: INVERSIÓN (CONSTRUCCIÓN) ────────────────────────────── */}
      <section className="py-14 md:py-20 px-5 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-blue-600 mb-2">Build & Ship</p>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter italic">Alcances — <span className="text-blue-600">Software.</span></h2>
            <p className="text-slate-500 text-sm mt-4">Definimos alcance, prioridades y esfuerzo después de un diagnóstico breve.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANES_INVERSION.map((plan, i) => <PlanInversionCard key={i} plan={plan} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── SECCIÓN: MENSUALIDADES (CARE) ─────────────────────────────────── */}
      <section className="py-14 md:py-20 px-5 md:px-6 bg-[#F8FAFC] border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-blue-600 mb-2">Continuidad Técnica</p>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none">Managed <span className="italic text-slate-400">Services.</span></h2>
              <p className="text-slate-500 text-sm mt-6 leading-relaxed">
                Gestión estratégica de infraestructura y sistemas. Seguridad, actualizaciones y uptime garantizado.
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
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl -mr-36 -mt-36 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-52 h-52 bg-cyan-400/10 rounded-full blur-2xl -ml-24 -mb-24 pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{ backgroundImage: 'radial-gradient(#fff 1px,transparent 1px)', backgroundSize: '20px 20px' }} />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-slate-500 mb-3">¿Su sistema necesita una auditoría?</p>
              <h2 className="text-2xl md:text-3xl font-black tracking-tighter uppercase leading-[0.9] text-white mb-3">
                Auditemos su<br />arquitectura gratis.
              </h2>
              <p className="text-slate-400 text-sm font-light max-w-sm">
                30 minutos. Identificamos los principales riesgos técnicos de su sistema actual sin costo.
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <Link href="/contacto"
                className="group inline-flex items-center gap-3 bg-white text-slate-950 px-7 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl whitespace-nowrap">
                Auditoría Gratuita
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link href="/proyectos"
                className="inline-flex items-center justify-center gap-2 text-slate-500 hover:text-white text-xs uppercase tracking-widest font-bold transition-colors">
                Ver proyectos →
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

    </main>
  );
}
