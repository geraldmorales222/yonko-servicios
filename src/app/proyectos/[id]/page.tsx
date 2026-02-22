"use client";

import { useState, useEffect, use } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// ─── DocSection ───────────────────────────────────────────────────────────────
function DocSection({ num, title, content, accent = false }: {
  num: string; title: string; content: string; accent?: boolean;
}) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-[10px] font-black text-slate-300 bg-slate-100 px-2 py-0.5 rounded-md">{num}</span>
        <h3 className={`text-base font-black uppercase tracking-tight ${accent ? 'text-blue-600' : 'text-slate-900'}`}>{title}</h3>
      </div>
      <div className={`pl-5 border-l-2 ${accent ? 'border-blue-200' : 'border-slate-100'}`}>
        <p className="text-slate-500 text-sm md:text-base leading-relaxed break-words overflow-wrap-anywhere" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
          {content || 'Documentación pendiente.'}
        </p>
      </div>
    </div>
  );
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────
function LoadingScreen() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-slate-400">Cargando proyecto</span>
      </div>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function ProyectoDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [proyecto, setProyecto] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(0);

  const xDrag = useMotionValue(0);
  const rotateY = useSpring(useTransform(xDrag, (val) => val * 0.2), {
    stiffness: 45,
    damping: 25,
  });

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    const loadData = async () => {
      try {
        const docRef = doc(db, 'proyectos', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setProyecto({ id: docSnap.id, ...docSnap.data() });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
    return () => window.removeEventListener('resize', handleResize);
  }, [id]);

  if (loading) return <LoadingScreen />;
  if (!proyecto) notFound();

  const todasLasFotos = [proyecto.cloudinaryId, ...(proyecto.galeria || [])];
  const isMobile = windowWidth < 768;
  const radius = isMobile ? 180 : 450;
  const itemWidth = isMobile ? 220 : 500;

  return (
    <main className="min-h-screen bg-white text-slate-900 overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="pt-24 md:pt-28 pb-0 px-5 md:px-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #f0f7ff 0%, #ffffff 60%)' }}>
        {/* Grid pattern sutil */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(#2563eb 1px,transparent 1px),linear-gradient(90deg,#2563eb 1px,transparent 1px)', backgroundSize: '52px 52px' }} />
        <div className="absolute -top-24 -right-24 w-[400px] h-[400px] bg-blue-100 rounded-full blur-[100px] opacity-50 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Back */}
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <Link href="/proyectos"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors text-xs font-bold uppercase tracking-widest mb-10 group">
              <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Portafolio
            </Link>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 md:pb-14">
            <div className="flex-1">
              {/* Badge categoría */}
              {proyecto.categoria && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
                  className="inline-flex items-center gap-2 bg-white border border-blue-100 shadow-sm px-3 py-1.5 rounded-full mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-blue-700">{proyecto.categoria}</span>
                </motion.div>
              )}

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(2.5rem,7vw,6rem)] font-black tracking-tighter leading-[0.85] uppercase mb-3 text-slate-900"
              >
                {proyecto.nombre}
              </motion.h1>

              {proyecto.subtitulo && (
                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.18 }}
                  className="text-base md:text-xl text-blue-600 font-semibold italic">
                  {proyecto.subtitulo}
                </motion.p>
              )}
            </div>

            {/* CTA */}
            {proyecto.urlProyecto && (
              <motion.a
                href={proyecto.urlProyecto}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-3 bg-blue-600 text-white px-7 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 transition-colors shrink-0"
              >
                Ver proyecto en vivo
                <svg className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </motion.a>
            )}
          </div>

          {/* Divider con gradiente */}
          <div className="w-full h-px bg-gradient-to-r from-blue-600 via-indigo-400 to-transparent" />
        </div>
      </section>

      {/* ── CARRUSEL 3D ───────────────────────────────────────────────────── */}
      <section className="relative bg-slate-950 py-8 md:py-0">
        {/* Hint de arrastre */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute top-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full pointer-events-none"
        >
          <svg className="w-3.5 h-3.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
          <span className="font-mono text-[8px] uppercase tracking-widest text-white/60">Arrastra para rotar</span>
        </motion.div>

        <div className="relative h-[300px] md:h-[550px] w-full flex items-center justify-center">
          {/* Capa de arrastre */}
          <motion.div
            drag="x"
            style={{ x: 0, zIndex: 50 }}
            dragConstraints={{ left: 0, right: 0 }}
            onDrag={(_, info) => xDrag.set(xDrag.get() + info.delta.x)}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          />

          <div style={{ perspective: isMobile ? '800px' : '1500px', pointerEvents: 'none' }}>
            <motion.div
              style={{
                rotateY: rotateY,
                transformStyle: 'preserve-3d',
                width: '200px',
                height: '150px',
              }}
              className="relative flex items-center justify-center"
            >
              {todasLasFotos.map((foto: string, index: number) => {
                const angleStep = 360 / todasLasFotos.length;
                const currentAngle = angleStep * index;

                return (
                  <div
                    key={index}
                    className="absolute rounded-[1.5rem] md:rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl bg-slate-900"
                    style={{
                      width: `${itemWidth}px`,
                      aspectRatio: '16/9',
                      transform: `rotateY(${currentAngle}deg) translateZ(${radius}px)`,
                      WebkitBoxReflect: isMobile ? 'none' : 'below 10px linear-gradient(to bottom, transparent, rgba(0,0,0,0.1))',
                    }}
                  >
                    <img
                      src={`https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,w_${isMobile ? 400 : 800}/v1/${foto}`}
                      alt={`Vista ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Contador de fotos */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <span className="font-mono text-[8px] uppercase tracking-widest text-white/40">{todasLasFotos.length} imágenes</span>
        </div>
      </section>

      {/* ── INFO TÉCNICA ──────────────────────────────────────────────────── */}
      <section className="px-5 md:px-6 py-14 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-5">

              {/* Stack tecnológico */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-blue-600 mb-4">Stack tecnológico</p>
                <div className="flex flex-wrap gap-2">
                  {proyecto.tecnologias?.split(',').map((tech: string) => (
                    <span key={tech}
                      className="px-3 py-1.5 bg-white border border-slate-100 text-slate-700 text-[10px] font-bold rounded-xl uppercase tracking-wide shadow-sm hover:border-blue-200 hover:text-blue-700 transition-colors">
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              </div>

              {/* Métricas si existen */}
              {proyecto.uptime && (
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-blue-600 mb-4">Métricas</p>
                  <div className="space-y-3">
                    {proyecto.uptime && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500 uppercase font-bold tracking-wide">Uptime</span>
                        <span className="font-black text-slate-900 text-sm">{proyecto.uptime}</span>
                      </div>
                    )}
                    {proyecto.lighthouse && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500 uppercase font-bold tracking-wide">Lighthouse</span>
                        <span className="font-black text-slate-900 text-sm">{proyecto.lighthouse}</span>
                      </div>
                    )}
                    {proyecto.año && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500 uppercase font-bold tracking-wide">Año</span>
                        <span className="font-black text-slate-900 text-sm">{proyecto.año}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Link al proyecto */}
              {proyecto.urlProyecto && (
                <a
                  href={proyecto.urlProyecto}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-3 bg-blue-600 text-white px-5 py-4 rounded-2xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
                >
                  <span className="text-xs font-black uppercase tracking-widest">Ver en vivo</span>
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              )}
            </div>

            {/* Documentación */}
            <div className="lg:col-span-8 space-y-10">
              <DocSection num="01" title="Descripción" content={proyecto.descripcion} />
              <div className="w-full h-px bg-slate-100" />
              <DocSection num="02" title="Desafíos" content={proyecto.desafio} accent />
              <div className="w-full h-px bg-slate-100" />
              <DocSection num="03" title="Solución" content={proyecto.solucion} />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ─────────────────────────────────────────────────────── */}
      <section className="px-5 md:px-6 py-14 md:py-16"
        style={{ background: 'repeating-linear-gradient(135deg,#f8fafc 0px,#f8fafc 20px,#f1f5f9 20px,#f1f5f9 21px)' }}>
        <div className="max-w-4xl mx-auto bg-blue-600 rounded-[2.5rem] p-10 md:p-14 relative overflow-hidden shadow-2xl shadow-blue-200">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-800/40 rounded-full blur-2xl -ml-20 -mb-20 pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none opacity-[0.07]"
            style={{ backgroundImage: 'radial-gradient(#fff 1px,transparent 1px)', backgroundSize: '20px 20px' }} />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-blue-200 mb-3">¿Le gustaría algo similar?</p>
              <h2 className="text-2xl md:text-4xl font-black tracking-tighter uppercase leading-[0.9] text-white mb-2">
                Construyamos su<br />próximo proyecto.
              </h2>
              <p className="text-blue-100 text-sm font-light max-w-sm">Primera consultoría gratuita de 30 minutos. Sin compromiso.</p>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <Link href="/contacto"
                className="group inline-flex items-center gap-3 bg-white text-slate-900 px-7 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.03] active:scale-[0.98] transition-all shadow-xl whitespace-nowrap">
                Iniciar Proyecto
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link href="/proyectos"
                className="inline-flex items-center justify-center gap-2 text-blue-200 hover:text-white text-xs uppercase tracking-widest font-bold transition-colors">
                Ver más proyectos →
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}