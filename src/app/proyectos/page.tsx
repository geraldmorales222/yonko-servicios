"use client";

import { useState, useEffect, useMemo } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { assetUrl } from '@/lib/project-assets';


// ─── Loader ───────────────────────────────────────────────────────────────────
function ProyectoSkeletonGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="h-44 animate-pulse bg-slate-200" />
          <div className="space-y-3 p-5">
            <div className="h-3 w-24 animate-pulse rounded-full bg-blue-100" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
            <div className="h-3 w-full animate-pulse rounded bg-slate-100" />
            <div className="h-10 w-full animate-pulse rounded-xl bg-slate-100" />
          </div>
        </div>
      ))}
    </div>
  );
}

const PROJECTS_CACHE_KEY = 'yonko:proyectos:v1';
const PROJECTS_CACHE_TTL = 1000 * 60 * 10;

// ─── Proyecto Card (compacta) ─────────────────────────────────────────────────
function ProyectoCard({ proyecto, index }: { proyecto: any; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const techs: string[] = proyecto.tecnologias?.split(',') ?? [];
  
  const coverUrl = assetUrl(proyecto.coverAsset, 400);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-100/60 hover:-translate-y-1 transition-all duration-400 flex flex-col"
    >
      {/* Imagen compacta con optimización dinámica */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-100">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={proyecto.nombre}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600 ease-out"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-900 text-white">
            <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-white/50">Sin portada Drive</span>
          </div>
        )}
        {/* ... Resto del código del badge categoría e índice ... */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-slate-700 text-[8px] font-black uppercase tracking-widest rounded-full border border-white/60 shadow-sm">
            {proyecto.categoria}
          </span>
        </div>
      </div>
      
      {/* ... Resto del contenido de la Card ... */}
      <div className="p-5 flex flex-col flex-1">
         {/* Tech pills, Título y Descripción se mantienen igual */}
         <div className="flex flex-wrap gap-1 mb-3">
          {techs.slice(0, 3).map((tech) => (
            <span key={tech} className="text-[8px] font-bold text-blue-600 uppercase tracking-wide bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md">
              {tech.trim()}
            </span>
          ))}
        </div>
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight leading-tight mb-1.5 group-hover:text-blue-600 transition-colors duration-300">
          {proyecto.nombre}
        </h3>
        <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 mb-4 flex-1">
          {proyecto.descripcion}
        </p>
        <Link
          href={`/proyectos/${proyecto.id}`}
          className="group/btn flex items-center justify-between w-full px-4 py-3 bg-slate-50 hover:bg-blue-600 rounded-xl transition-all duration-300 border border-slate-100 hover:border-transparent"
        >
          <span className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-600 group-hover/btn:text-white transition-colors">
            Ver proyecto
          </span>
          <svg className="w-3.5 h-3.5 text-blue-500 group-hover/btn:text-white group-hover/btn:translate-x-0.5 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function ProyectosPage() {
  const [proyectos, setProyectos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadSlow, setLoadSlow] = useState(false);
  const [filtro, setFiltro] = useState('Todos');

  useEffect(() => {
    let mounted = true;

    const cached = sessionStorage.getItem(PROJECTS_CACHE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < PROJECTS_CACHE_TTL && Array.isArray(parsed.data)) {
          setProyectos(parsed.data);
          setLoading(false);
        }
      } catch {
        sessionStorage.removeItem(PROJECTS_CACHE_KEY);
      }
    }

    const slowTimer = window.setTimeout(() => {
      if (mounted) setLoadSlow(true);
    }, 2200);

    const fetchProyectos = async () => {
      try {
        // Cambio principal: Agregamos el filtro where
        const q = query(
          collection(db, 'proyectos'), 
          where('habilitado', '==', true), // <--- Solo proyectos activos
          orderBy('fecha', 'desc')
        );
        
        const snap = await getDocs(q);
        const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (!mounted) return;
        setProyectos(data);
        sessionStorage.setItem(PROJECTS_CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data }));
      } catch (error) {
        console.error(error);
      } finally {
        if (mounted) {
          setLoading(false);
          setLoadSlow(false);
        }
      }
    };
    fetchProyectos();
    return () => {
      mounted = false;
      window.clearTimeout(slowTimer);
    };
  }, []);

  const categorias = useMemo(() => ['Todos', ...Array.from(new Set(proyectos.map(p => p.categoria).filter(Boolean)))], [proyectos]);
  const filtrados = useMemo(() => filtro === 'Todos' ? proyectos : proyectos.filter(p => p.categoria === filtro), [filtro, proyectos]);

  return (
    <main className="bg-white min-h-screen">

      {/* ── HEADER ───────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-12 px-6 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto">

          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-blue-700">Portafolio técnico</span>
            </div>
          </motion.div>

          <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:items-end mb-10">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(1.95rem,4.2vw,3.3rem)] font-black text-slate-900 tracking-tight leading-tight"
              >
                Ingeniería aplicada a proyectos reales.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-slate-500 text-base leading-relaxed max-w-xl mt-6"
              >
                Soluciones escalables, arquitectura modular y desarrollo de software con{' '}
                <span className="text-slate-800 font-semibold">estándares de alto rendimiento.</span>
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden min-h-[320px] overflow-hidden rounded-[2rem] bg-slate-950 shadow-xl shadow-blue-950/20 lg:block"
            >
              <Image
                src="/imagenes/yonko.webp"
                alt="Equipo presentando proyectos de ingeniería y arquitectura cloud"
                fill
                priority
                sizes="420px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-white/10 bg-slate-950/70 p-4 text-white backdrop-blur-xl">
                <p className="font-mono text-[9px] font-black uppercase tracking-[0.28em] text-cyan-200">Proyectos con sistema</p>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {[
                    { v: String(proyectos.length), l: 'Proyectos' },
                    { v: '99.9%', l: 'Uptime' },
                    { v: '40+', l: 'Clientes' },
                  ].map((m) => (
                    <div key={m.l} className="rounded-2xl bg-white/10 p-3 text-center">
                      <span className="block text-lg font-black tabular-nums">{m.v}</span>
                      <span className="font-mono text-[8px] uppercase tracking-widest text-cyan-100/80">{m.l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
          {/* Filtros */}
          {categorias.length > 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-2"
            >
              {categorias.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFiltro(cat)}
                  className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all duration-200 ${
                    filtro === cat
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ── GRID ─────────────────────────────────────────────────────────── */}
      <section className="px-6 py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <>
              {loadSlow && (
                <div className="mb-5 rounded-2xl border border-blue-100 bg-white px-4 py-3 text-xs font-semibold text-slate-500 shadow-sm">
                  Estamos preparando los proyectos. Si es la primera carga, puede tardar unos segundos; las próximas visitas quedan cacheadas en el navegador.
                </div>
              )}
              <ProyectoSkeletonGrid />
            </>
          ) : filtrados.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-slate-200">
              <p className="text-slate-400 font-mono text-xs uppercase tracking-widest">
                No hay proyectos en esta categoría
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtrados.map((proyecto, index) => (
                <ProyectoCard key={proyecto.id} proyecto={proyecto} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────────────────── */}
      <section className="px-6 py-16 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto rounded-[2rem] border border-cyan-300/20 bg-slate-950 p-7 md:p-10 text-center text-white relative overflow-hidden shadow-xl shadow-blue-950/20"
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/25 rounded-full blur-3xl -mr-36 -mt-36 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-52 h-52 bg-cyan-400/10 rounded-full blur-2xl -ml-24 -mb-24 pointer-events-none" />

          <div className="relative z-10">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-cyan-200 mb-4">¿Siguiente proyecto?</p>
            <h2 className="text-2xl md:text-3xl font-black mb-4 tracking-tighter uppercase leading-[0.9]">
              ¿Tienes un desafío técnico?
            </h2>
            <p className="text-cyan-100/80 text-base mb-8 max-w-lg mx-auto font-light">
              Transformamos ideas complejas en productos digitales robustos y escalables.
            </p>
            <Link
              href="/contacto"
              className="group inline-flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.03] active:scale-[0.98] transition-all shadow-xl"
            >
              Hablemos de tu proyecto
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
