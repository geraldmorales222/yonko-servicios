"use client";

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';

function PillarCard({ title, desc, icon, col, highlight = false }: {
  title: string; desc: string; icon: string; col: string; highlight?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`${col} group p-8 md:p-10 rounded-3xl border transition-all duration-500 hover:-translate-y-1 hover:shadow-xl
        ${highlight
          ? 'bg-slate-900 text-white border-transparent hover:shadow-slate-300'
          : 'bg-white text-slate-900 border-slate-100 hover:border-blue-100 hover:shadow-blue-100'}`}
    >
      <div className="text-3xl mb-6">{icon}</div>
      <h3 className="text-lg font-black uppercase tracking-tight mb-2">{title}</h3>
      <p className={`text-sm leading-relaxed ${highlight ? 'text-slate-400' : 'text-slate-500'}`}>{desc}</p>
    </motion.div>
  );
}

export default function NosotrosPage() {
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: '-60px' });

  return (
    <main className="min-h-screen bg-white text-slate-900 overflow-x-hidden">

      {/* ── 1. HERO — fondo con gradiente azul muy suave + grid pattern ──── */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-24 px-5 md:px-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #f0f7ff 0%, #ffffff 55%)' }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(#2563eb 1px,transparent 1px),linear-gradient(90deg,#2563eb 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[100px] opacity-60 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white border border-blue-100 shadow-sm px-3.5 py-1.5 rounded-full mb-6 md:mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-blue-700">Elite Leadership</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(3rem,9vw,7rem)] font-black leading-[0.85] tracking-tighter text-slate-900 uppercase mb-6"
              >
                EL ARTE DE LA<br />
                <span className="text-blue-600 italic">PRECISIÓN.</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
                className="text-base md:text-lg text-slate-500 mb-8 leading-relaxed max-w-md">
                  <span className="text-slate-900 font-semibold">Yonko</span>, es una firma de ingeniería informática especializada en servicios tecnológicos para empresas. 
                  Fundada por un Magíster en Informática, integra un equipo de expertos en desarrollo de software, 
                  infraestructura y gestión administrativa, ofreciendo soluciones diseñadas para la eficiencia y la escalabilidad global.
              </motion.p>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.35 }}
                className="flex gap-8 border-t border-blue-100 pt-8">
                {[{ v: 'MSc.', l: 'Grado Académico' }, { v: '100%', l: 'Foco en CX/UX' }, { v: '40+', l: 'Proyectos' }].map((s) => (
                  <div key={s.l} className="pl-4 border-l-2 border-blue-200">
                    <span className="block text-2xl font-black text-slate-900 tracking-tighter">{s.v}</span>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-blue-600">{s.l}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="aspect-square rounded-[3rem] flex items-center justify-center relative overflow-hidden border border-blue-100 shadow-xl max-w-sm mx-auto lg:max-w-none"
                style={{ background: 'linear-gradient(135deg, #e0eeff 0%, #f8fbff 100%)' }}>
                <span className="text-blue-100 text-[clamp(8rem,20vw,14rem)] font-black absolute select-none leading-none">Y.</span>
                <span className="text-slate-900 text-[clamp(4rem,10vw,7rem)] font-black relative z-10 tracking-tighter">
                  Y<span className="text-blue-600">.</span>
                </span>
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-xl border border-blue-50 p-5 md:p-6 rounded-2xl shadow-lg">
                  <p className="text-blue-600 text-[8px] font-black uppercase tracking-[0.35em] mb-1.5">Philosophy</p>
                  <p className="text-slate-700 text-sm md:text-base font-medium leading-snug italic">
                    "La complejidad se gestiona en el backend, la simplicidad se entrega al usuario."
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. PILARES — fondo con patrón de puntos ───────────────────────── */}
      <section className="py-16 md:py-24 px-5 md:px-6 relative overflow-hidden"
        style={{ backgroundColor: '#f8fafc' }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.5]"
          style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-10">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-blue-600 mb-2">Fundamentos</p>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-slate-900">
              Cómo <span className="text-blue-600 italic">trabajamos.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <PillarCard col="sm:col-span-1 md:col-span-2" title="Arquitectura" desc="Diseñamos sistemas robustos y escalables bajo estándares de ingeniería de nivel magíster. Nuestra arquitectura tecnológica está pensada para soportar crecimiento, alta demanda y expansión internacional sin comprometer rendimiento ni seguridad." icon="🛡️" />
            <PillarCard col="sm:col-span-1 md:col-span-2" title="Psicología" desc="Aplicamos principios de UX, comportamiento del usuario y optimización de flujos para convertir visitantes en clientes. Cada interfaz se diseña estratégicamente para maximizar interacción, confianza y conversión." icon="🧠" />
            <PillarCard col="sm:col-span-2 md:col-span-4" title="Transformación Digital" desc="Desarrollamos soluciones que automatizan procesos, optimizan operaciones y eliminan límites operativos. Nuestro enfoque no es solo digitalizar, sino crear tecnología que impulse crecimiento sostenible." icon="🚀" highlight />
          </div>
        </div>
      </section>

      {/* ── 3. VALORES — blanco puro con divisor de color ─────────────────── */}
      <section className="py-16 md:py-24 px-5 md:px-6 bg-white">
        <div className="w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-400 to-blue-200 mb-16" />

        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-10">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-blue-600 mb-2">Principios</p>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-slate-900">
              En qué <span className="text-blue-600 italic">creemos.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-100 rounded-3xl overflow-hidden border border-slate-100">
            {[
              { n: '01', title: 'Calidad sin compromisos', desc: 'Desarrollamos bajo estándares de ingeniería rigurosos. Cada componente es revisado, validado y optimizado para garantizar estabilidad, seguridad y escalabilidad. No sacrificamos calidad por velocidad ni entregamos deuda técnica disfrazada de eficiencia.' },
              { n: '02', title: 'Transparencia total', desc: 'Trabajamos con procesos claros y comunicación constante. Nuestros clientes conocen el alcance, los tiempos y las decisiones técnicas en cada etapa del proyecto. Creemos en relaciones basadas en claridad, confianza y responsabilidad profesional.' },
              { n: '03', title: 'Impacto medible', desc: 'Cada solución se diseña con indicadores de rendimiento definidos desde el inicio. Establecemos métricas claras de éxito porque entendemos que lo que no se mide no se puede optimizar ni escalar.' },
            ].map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="group bg-white p-7 md:p-9 hover:bg-blue-600 transition-colors duration-500"
              >
                <span className="font-mono text-xs text-blue-500 group-hover:text-blue-200 mb-5 block transition-colors">{v.n}</span>
                <h3 className="text-base font-black uppercase tracking-tight mb-3 text-slate-900 group-hover:text-white transition-colors">{v.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500 group-hover:text-blue-100 transition-colors">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. PROCESO — fondo con textura diagonal ───────────────────────── */}
      <section className="py-16 md:py-24 px-5 md:px-6 relative overflow-hidden"
        style={{
          background: 'repeating-linear-gradient(135deg, #f8fafc 0px, #f8fafc 20px, #f1f5f9 20px, #f1f5f9 21px)'
        }}>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-10">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-blue-600 mb-2">Metodología</p>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-slate-900">
              Proceso <span className="text-blue-600 italic">probado.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { n: '01', title: 'Evaluación y Diagnóstico', desc: 'Análisis profundo de infraestructura, procesos y arquitectura existente para detectar riesgos estructurales y oportunidades estratégicas.' },
              { n: '02', title: 'Diseño de Arquitectura', desc: 'Definición de stack tecnológico, documentación formal de decisiones técnicas y planificación estructurada para garantizar escalabilidad y sostenibilidad.' },
              { n: '03', title: 'Implementación y Optimización Continua', desc: 'Desarrollo ágil con integración y despliegue continuo, seguimiento de métricas clave y mejora iterativa basada en datos.' },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="group bg-white border border-slate-100 rounded-3xl p-7 md:p-8 hover:border-blue-100 hover:bg-blue-50 hover:shadow-xl hover:shadow-blue-100 transition-all duration-500 hover:-translate-y-1"
              >
                <span className="font-mono text-xs text-blue-500 mb-5 block group-hover:text-blue-600 transition-colors">{step.n}</span>
                <h3 className="text-base font-black uppercase tracking-tight mb-2 text-slate-900 group-hover:text-blue-700 transition-colors">{step.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. VISIÓN, PROPÓSITO, DIFERENCIACIÓN ─────────────────────────── */}
      <section className="py-16 md:py-24 px-5 md:px-6 bg-white">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent mb-16" />
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-12">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-blue-600 mb-2">Identidad</p>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-slate-900">
              Quiénes <span className="text-blue-600 italic">somos.</span>
            </h2>
          </motion.div>

          <div className="divide-y divide-slate-100">
            {[
              {
                tag: 'Visión', title: 'Nuestra Visión', icon: '🔭',
                paras: [
                  'En Yonko proyectamos la ingeniería tecnológica como un pilar estratégico del crecimiento empresarial. Nuestra visión es construir sistemas que trasciendan el corto plazo, diseñados desde su origen para sostener expansión, adaptación y evolución constante en entornos digitales cada vez más competitivos.',
                  'Aspiramos a consolidarnos como un referente en ingeniería tecnológica estratégica, desarrollando soluciones concebidas para escalar globalmente desde su arquitectura inicial. No buscamos simplemente digitalizar procesos, sino redefinir la forma en que las empresas integran tecnología en su estructura operativa y modelo de negocio.',
                  'Creemos que el futuro pertenece a organizaciones que diseñan con previsión, ejecutan con precisión y escalan con inteligencia.',
                ],
              },
              {
                tag: 'Propósito', title: 'Nuestro Propósito', icon: '🎯',
                paras: [
                  'Nuestro propósito es transformar la tecnología en una ventaja competitiva real y medible para las empresas. No concebimos el software como un producto aislado, sino como un activo estratégico capaz de optimizar procesos, reducir fricciones operativas y potenciar el crecimiento sostenible.',
                  'Trabajamos para que cada sistema implementado genere eficiencia, control y capacidad de expansión. Entendemos que detrás de cada proyecto hay objetivos de negocio, equipos de trabajo y decisiones estratégicas que deben respaldarse con infraestructura tecnológica sólida.',
                  'En Yonko, desarrollamos tecnología con estructura, método y visión de largo plazo.',
                ],
              },
              {
                tag: 'Diferenciación', title: 'Nuestra Diferencia', icon: '⚡',
                paras: [
                  'No desarrollamos proyectos aislados ni soluciones improvisadas. Diseñamos sistemas con arquitectura robusta, documentación clara, métricas de rendimiento definidas y proyección de crecimiento sostenible.',
                  'Mientras muchos proveedores se enfocan en entregar funcionalidades rápidas, en Yonko priorizamos estabilidad, escalabilidad y sostenibilidad técnica. Pensamos en el día uno, pero diseñamos para el año cinco.',
                  'Nuestra diferencia radica en la combinación de formación académica avanzada, ejecución técnica rigurosa y enfoque empresarial estratégico. Cada decisión tecnológica se fundamenta en impacto, rendimiento y proyección futura.',
                ],
                quote: 'Construimos sistemas que escalan. No prototipos que colapsan.',
              },
            ].map((item: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8 md:gap-16 py-12 md:py-14 hover:bg-slate-50/60 px-4 -mx-4 rounded-3xl transition-colors duration-300"
              >
                {/* Izquierda */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full">{item.tag}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-slate-900 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <div className="w-8 h-1 bg-blue-600 rounded-full group-hover:w-14 transition-all duration-500" />
                </div>

                {/* Derecha */}
                <div className="space-y-4">
                  {item.paras.map((p: string, pi: number) => (
                    <p key={pi} className="text-sm md:text-base text-slate-500 leading-relaxed">{p}</p>
                  ))}
                  {item.quote && (
                    <div className="mt-4 pl-5 border-l-4 border-blue-600 bg-blue-50 py-4 pr-5 rounded-r-2xl">
                      <p className="text-sm font-black text-slate-900 italic">"{item.quote}"</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CTA ────────────────────────────────────────────────────────── */}
      <section ref={ctaRef} className="py-14 md:py-20 px-5 md:px-6 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={ctaInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto bg-blue-600 rounded-[2.5rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-200"
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -mr-36 -mt-36 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-52 h-52 bg-blue-800/40 rounded-full blur-2xl -ml-24 -mb-24 pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none opacity-[0.08]"
            style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

          <div className="relative z-10">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-blue-200 mb-4">Siguiente paso</p>
            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter uppercase leading-[0.9]">
              ¿Listo para el<br />siguiente nivel?
            </h2>
            <p className="text-blue-100 text-sm md:text-base mb-8 max-w-md mx-auto font-light">
              Construyamos juntos el sistema que su negocio merece.
            </p>
            <Link
              href="/contacto"
              className="group inline-flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.03] active:scale-[0.98] transition-all shadow-xl"
            >
              Iniciar Proyecto
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </section>

    </main>
  );
}