"use client";

import { useState, useEffect, use } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectAsset, assetKind, assetUrl } from '@/lib/project-assets';

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

// ─── Flat Slider (> 4 fotos) ──────────────────────────────────────────────────
function FlatSlider({ fotos }: { fotos: (ProjectAsset | string)[] }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const prev = () => goTo(current === 0 ? fotos.length - 1 : current - 1);
  const next = () => goTo(current === fotos.length - 1 ? 0 : current + 1);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  return (
    <div className="relative bg-slate-950 w-full select-none">
      {/* Imagen principal */}
      <div className="relative h-[280px] md:h-[520px] overflow-hidden bg-slate-950">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            src={assetUrl(fotos[current], 1200)}
            alt={`Vista ${current + 1}`}
            className="absolute inset-0 w-full h-full object-contain"
            draggable={false}
          />
        </AnimatePresence>

        {/* Flechas */}
        <button onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/40 hover:bg-black/70 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/40 hover:bg-black/70 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        {/* Contador overlay */}
        <div className="absolute bottom-4 right-4 z-20 bg-black/50 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full">
          <span className="font-mono text-[9px] text-white/80 tracking-widest">{current + 1} / {fotos.length}</span>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 px-4 py-4 overflow-x-auto scrollbar-hide">
        {fotos.map((foto, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`relative shrink-0 rounded-xl overflow-hidden transition-all duration-300
              ${i === current
                ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-slate-950 opacity-100 scale-[1.05]'
                : 'opacity-40 hover:opacity-70'
              }`}
            style={{ width: '80px', aspectRatio: '16/9' }}
          >
            <img
              src={assetUrl(foto, 200)}
              alt={`Thumb ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function ProyectoDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [proyecto, setProyecto] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, [id]);

  if (loading) return <LoadingScreen />;
  if (!proyecto) notFound();

  const todasLasFotos = [proyecto.coverAsset, ...(proyecto.assets || [])].filter((asset) => asset && assetKind(asset) === 'image');

  return (
    <main className="min-h-screen bg-white text-slate-900 overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="pt-24 md:pt-28 pb-0 px-5 md:px-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #f0f7ff 0%, #ffffff 60%)' }}>
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

      {/* ── GALERÍA: visor simple sin carrusel 3D ─────────────────────────── */}
      {todasLasFotos.length > 0 ? (
        <FlatSlider fotos={todasLasFotos} />
      ) : (
        <section className="bg-slate-950 px-6 py-20 text-center text-white">
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40">Pendiente de Drive</p>
          <p className="mt-3 text-sm text-white/70">Este proyecto aún no tiene imágenes vinculadas desde Google Drive.</p>
        </section>
      )}

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
