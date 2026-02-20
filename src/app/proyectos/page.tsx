"use client";

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const cloudName = "dtbhiodgz";

// ─── Loader ───────────────────────────────────────────────────────────────────
function Loader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-4">
      <div className="w-8 h-8 border-[3px] border-blue-600 border-t-transparent rounded-full animate-spin" />
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-400">Cargando proyectos</span>
    </div>
  );
}

// ─── Proyecto Card (compacta) ─────────────────────────────────────────────────
function ProyectoCard({ proyecto, index }: { proyecto: any; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const techs: string[] = proyecto.tecnologias?.split(',') ?? [];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-100/60 hover:-translate-y-1 transition-all duration-400 flex flex-col"
    >
      {/* Imagen compacta */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-100">
        <img
          src={`https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/v1/${proyecto.cloudinaryId}`}
          alt={proyecto.nombre}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600 ease-out"
        />
        {/* Badge categoría */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-slate-700 text-[8px] font-black uppercase tracking-widest rounded-full border border-white/60 shadow-sm">
            {proyecto.categoria}
          </span>
        </div>
        {/* Número índice */}
        <div className="absolute bottom-3 right-3 z-10">
          <span className="font-mono text-[10px] text-white/50 font-bold">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-5 flex flex-col flex-1">
        {/* Tech pills */}
        <div className="flex flex-wrap gap-1 mb-3">
          {techs.slice(0, 3).map((tech) => (
            <span key={tech} className="text-[8px] font-bold text-blue-600 uppercase tracking-wide bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md">
              {tech.trim()}
            </span>
          ))}
          {techs.length > 3 && (
            <span className="text-[8px] font-bold text-slate-400 py-0.5 px-1">+{techs.length - 3}</span>
          )}
        </div>

        <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight leading-tight mb-1.5 group-hover:text-blue-600 transition-colors duration-300">
          {proyecto.nombre}
        </h3>
        <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 mb-4 flex-1">
          {proyecto.descripcion}
        </p>

        {/* CTA */}
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
  const [filtro, setFiltro] = useState('Todos');

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const q = query(collection(db, 'proyectos'), orderBy('fecha', 'desc'));
        const snap = await getDocs(q);
        setProyectos(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProyectos();
  }, []);

  if (loading) return <Loader />;

  const categorias = ['Todos', ...Array.from(new Set(proyectos.map(p => p.categoria).filter(Boolean)))];
  const filtrados = filtro === 'Todos' ? proyectos : proyectos.filter(p => p.categoria === filtro);

  return (
    <main className="bg-white min-h-screen">

      {/* ── HEADER ───────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-12 px-6 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto">

          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-blue-700">Portafolio Técnico</span>
            </div>
          </motion.div>

          {/* Título + descripción en columnas separadas y bien alineadas */}
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end mb-10">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(3rem,8vw,6.5rem)] font-black text-slate-900 tracking-tighter leading-[0.85] uppercase"
            >
              INGENIERÍA<br />
              <span className="text-blue-600 italic">APLICADA.</span>
            </motion.h1>

            {/* Métricas alineadas a la derecha abajo, sin pisar el título */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:flex flex-col gap-4 pb-2"
            >
              {[
                { v: String(proyectos.length), l: 'Proyectos' },
                { v: '99.9%', l: 'Uptime' },
                { v: '40+', l: 'Clientes' },
              ].map((m) => (
                <div key={m.l} className="flex items-baseline gap-2 pl-4 border-l-2 border-slate-200">
                  <span className="text-xl font-black text-slate-900 tracking-tighter tabular-nums">{m.v}</span>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-blue-600">{m.l}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Descripción debajo del título, sin colisión */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-slate-500 text-base leading-relaxed max-w-xl mb-8"
          >
            Soluciones escalables, arquitecturas modulares y desarrollo de software con{' '}
            <span className="text-slate-800 font-semibold">estándares de alto rendimiento.</span>
          </motion.p>

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
          {filtrados.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-200">
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
          className="max-w-5xl mx-auto bg-blue-600 rounded-[2.5rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-200"
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -mr-36 -mt-36 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-52 h-52 bg-blue-800/40 rounded-full blur-2xl -ml-24 -mb-24 pointer-events-none" />

          <div className="relative z-10">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-blue-200 mb-4">¿Siguiente proyecto?</p>
            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter uppercase leading-[0.9]">
              ¿Tienes un desafío técnico?
            </h2>
            <p className="text-blue-100 text-base mb-8 max-w-lg mx-auto font-light">
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