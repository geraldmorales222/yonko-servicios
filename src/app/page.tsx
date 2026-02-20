"use client";

import Link from 'next/link';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import Navbar from '@/components/Navbar'; // <--- IMPORTA EL NAVBAR

// ─── Tipos ───────────────────────────────────────────────────────────────────
interface TechCardProps { pos: string; label: string; value: string; color: string; delay?: number; }
interface BentoCardProps { title: string; desc: string; icon: string; col: string; highlight?: boolean; dark?: boolean; }
interface StatProps { val: string; label: string; index: number; }

// ─── Hook contador ───────────────────────────────────────────────────────────
function useCountUp(target: string, inView: boolean) {
  const [display, setDisplay] = useState('0');
  useEffect(() => {
    if (!inView) return;
    const num = parseFloat(target.replace(/[^0-9.]/g, ''));
    const suffix = target.replace(/[0-9.]/g, '');
    const duration = 1800;
    const steps = 60;
    let current = 0;
    const inc = num / steps;
    const timer = setInterval(() => {
      current = Math.min(current + inc, num);
      setDisplay(Number.isInteger(num) ? Math.floor(current) + suffix : current.toFixed(1) + suffix);
      if (current >= num) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);
  return display;
}

// ─── AnimatedStat ─────────────────────────────────────────────────────────────
function AnimatedStat({ val, label, index }: StatProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const display = useCountUp(val, inView);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group pl-6 border-l-2 border-slate-200 hover:border-blue-500 transition-colors duration-500"
    >
      <span className="block text-5xl md:text-6xl font-black tracking-tighter text-slate-900 tabular-nums mb-1">
        {inView ? display : '0'}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-blue-600 font-bold">{label}</span>
    </motion.div>
  );
}

// ─── TechCard ─────────────────────────────────────────────────────────────────
function TechCard({ pos, label, value, color, delay = 0 }: TechCardProps) {
  return (
    <motion.div
      className={`absolute ${pos} z-20`}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: delay + 0.9, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay }}
        className="bg-white border border-slate-200 shadow-xl shadow-slate-200/80 px-5 py-4 rounded-2xl"
      >
        <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-slate-400 mb-1">{label}</p>
        <p className={`text-2xl font-black ${color}`}>{value}</p>
      </motion.div>
    </motion.div>
  );
}

// ─── BentoCard ────────────────────────────────────────────────────────────────
function BentoCard({ title, desc, icon, col, highlight, dark }: BentoCardProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  const base = 'group relative overflow-hidden p-10 rounded-[2.5rem] flex flex-col justify-between min-h-[260px] transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl';
  const style = highlight
    ? `${base} bg-blue-600 text-white shadow-xl shadow-blue-200`
    : dark
    ? `${base} bg-slate-900 text-white`
    : `${base} bg-white border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-slate-200/80`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`${col} ${style}`}
    >
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2.5rem]
        ${highlight ? 'bg-gradient-to-br from-white/10 to-transparent' : 'bg-gradient-to-br from-blue-50 to-transparent'}`} />
      <span className="text-4xl block">{icon}</span>
      <div>
        <h3 className={`text-lg font-black uppercase tracking-tight mb-2 ${highlight || dark ? 'text-white' : 'text-slate-900'}`}>{title}</h3>
        <p className={`text-sm leading-relaxed ${highlight ? 'text-blue-100' : dark ? 'text-slate-400' : 'text-slate-500'}`}>{desc}</p>
      </div>
    </motion.div>
  );
}

// ─── Marquee ──────────────────────────────────────────────────────────────────
function Marquee() {
  const techs = ['Next.js 15', 'TypeScript', 'PostgreSQL', 'Django', 'Supabase', 'Framer Motion', 'Tailwind v4', 'AWS', 'Python AI', 'Docker', 'Redis', 'GraphQL'];
  return (
    <div className="overflow-hidden py-8 border-y border-slate-100 bg-slate-50">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        className="flex gap-10 whitespace-nowrap"
      >
        {[...techs, ...techs].map((tech, i) => (
          <span key={i} className="text-2xl font-black uppercase tracking-tighter italic text-slate-300 inline-flex items-center gap-10">
            {tech}
            <span className="text-blue-400 not-italic font-light">/</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function HomePage() {


  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: '-80px' });

  return (
    <main className="bg-white text-slate-900">
      
      {/* ── 1. HERO ───────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-white">
        {/* Fondo sutil con gradiente radial azul muy suave */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_30%,_#eff6ff,_transparent)] pointer-events-none" />
        {/* Grid pattern muy sutil */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(#1e40af 1px, transparent 1px), linear-gradient(90deg, #1e40af 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="w-full">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center py-24">

            {/* Copy */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 mb-8 bg-blue-50 border border-blue-100 px-4 py-2 rounded-full"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-blue-700">
                  Yonko Science in Informatics
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(4rem,11vw,8.5rem)] font-black leading-[0.85] tracking-tighter uppercase mb-8 text-slate-900"
              >
                SISTEMAS
                <br />
                <span className="text-blue-600 italic">ELITE.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="text-lg text-slate-500 max-w-md mb-10 leading-relaxed"
              >
                Arquitecturas escalables donde la{' '}
                <span className="text-slate-900 font-semibold">complejidad técnica</span>{' '}
                se traduce en{' '}
                <span className="text-slate-900 font-semibold">simplicidad de usuario.</span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  href="/contacto"
                  className="group relative overflow-hidden bg-blue-600 text-white px-9 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Iniciar Proyecto
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-blue-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Link>
                <Link
                  href="/nosotros"
                  className="border border-slate-200 text-slate-700 px-9 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-slate-50 hover:border-slate-300 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  Ver Visión
                </Link>
              </motion.div>

              {/* Social proof */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-4 mt-10 pt-10 border-t border-slate-100"
              >
                <div className="flex -space-x-2">
                  {['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b'].map((c, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white" style={{ backgroundColor: c }} />
                  ))}
                </div>
                <p className="text-sm text-slate-500">
                  <span className="font-semibold text-slate-900">+40 clientes</span> confían en nuestros sistemas
                </p>
              </motion.div>
            </div>

            {/* Visual orbit */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-full max-w-[400px] aspect-square">
                <div className="absolute inset-0 border border-slate-100 rounded-full" />
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-6 border-t-2 border-blue-200 rounded-full" />
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-16 border border-blue-100 rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-blue-50 rounded-3xl flex items-center justify-center shadow-inner border border-blue-100">
                    <span className="text-5xl font-black text-blue-200 uppercase tracking-widest select-none">Y</span>
                  </div>
                </div>
                <TechCard pos="top-2 -left-14" label="Latency" value="0.04ms" color="text-emerald-600" delay={0} />
                <TechCard pos="bottom-20 -right-12" label="Uptime" value="99.9%" color="text-blue-600" delay={0.2} />
                <TechCard pos="bottom-2 left-10" label="Req/s" value="12K" color="text-violet-600" delay={0.4} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-widest text-slate-300">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-8 bg-gradient-to-b from-slate-300 to-transparent" />
        </motion.div>
      </section>

      {/* ── 2. MARQUEE ────────────────────────────────────────────────────── */}
      <Marquee />

      {/* ── 3. MÉTRICAS ───────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Proyectos Cloud', val: '30+' },
              { label: 'Líneas de Código', val: '1M+' },
              { label: 'Disponibilidad', val: '99.9%' },
              { label: 'Retorno Inversión', val: '250%' },
            ].map((s, i) => <AnimatedStat key={i} val={s.val} label={s.label} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── 4. BENTO ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <motion.p 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }} 
              viewport={{ once: true }}
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-blue-600 mb-3"
            >
              Capacidades
            </motion.p>
            
            {/* Título responsivo corregido con clamp y leading ajustado */}
            <motion.h2 
              initial={{ opacity: 0, y: 16 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-[clamp(2.5rem,10vw,4.5rem)] font-black uppercase tracking-tighter leading-[0.95] text-slate-900 break-words"
            >
              Expertise<br />
              <span className="text-blue-600 italic">Multidisciplinario.</span>
            </motion.h2>
          </div>

          {/* Grid responsivo: 1 columna en móvil, 12 en desktop */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <BentoCard col="md:col-span-12" title="Desarrollo Web" desc="Proceso integral de creación y mantenimiento de aplicaciones web escalables." icon="💻" />
            <BentoCard col="md:col-span-8" title="Sistemas Distribuidos" desc="Arquitecturas backend que soportan crecimiento global sin degradación." icon="⚙️" />
            <BentoCard col="md:col-span-4" title="IA Aplicada" desc="Modelado de datos para automatización inteligente." icon="🧠" dark />
            <BentoCard col="md:col-span-5" title="UX / CX Strategy" desc="Diseño centrado en la conversión y psicología del usuario." icon="✦" />
            <BentoCard col="md:col-span-7" title="Infraestructura Cloud" desc="Seguridad enterprise y escalabilidad automática." icon="☁️" highlight />
          </div>
        </div>
      </section>

      {/* ── 5. PROCESO ────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-blue-600 mb-3">Metodología</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-slate-900">
              Proceso <span className="text-blue-600 italic">Probado.</span>
            </motion.h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
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
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group bg-white border border-slate-100 rounded-3xl p-8 hover:border-blue-100 hover:bg-blue-50 hover:shadow-xl hover:shadow-blue-100 transition-all duration-500 hover:-translate-y-1"
              >
                <span className="font-mono text-sm text-blue-500 mb-6 block">{step.n}</span>
                <h3 className="text-xl font-black uppercase tracking-tight mb-3 text-slate-900 group-hover:text-blue-700 transition-colors">{step.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CTA FINAL ──────────────────────────────────────────────────── */}
      <section ref={ctaRef} className="py-20 px-6 bg-slate-50">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={ctaInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mx-auto bg-blue-600 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-200"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -mr-40 -mt-40 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-800/40 rounded-full blur-2xl -ml-28 -mb-28 pointer-events-none" />
          <div className="relative z-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-blue-200 mb-5">Siguiente paso</p>
            <h2 className="text-4xl md:text-6xl font-black mb-5 tracking-tighter uppercase leading-[0.9]">
              ¿Construimos el futuro<br />de su sistema?
            </h2>
            <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto font-light">
              Deje de gestionar deuda técnica. Empiece a construir activos digitales que escalan.
            </p>
            <Link
              href="/contacto"
              className="group inline-flex items-center gap-3 bg-white text-slate-900 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-[1.03] active:scale-[0.98] transition-all shadow-xl"
            >
              Agendar Consultoría Senior
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}