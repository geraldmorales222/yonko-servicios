'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, deleteDoc, doc, getDocs, orderBy, query } from 'firebase/firestore';

export default function MensajesPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mensajes, setMensajes] = useState<any[]>([]);

  const verifyAdmin = async (email: string) => {
    try {
      const res = await fetch('/api/auth/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      return data.isAdmin;
    } catch (error) {
      console.error('Error validando admin:', error);
      return false;
    }
  };

  const fetchMensajes = async () => {
    try {
      const q = query(collection(db, 'consultas'), orderBy('fecha', 'desc'));
      const snap = await getDocs(q);
      setMensajes(snap.docs.map((item) => ({ id: item.id, ...item.data() })));
    } catch (error) {
      console.error('Error al cargar mensajes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser?.email) {
        const isAdmin = await verifyAdmin(currentUser.email);
        if (isAdmin) {
          setUser(currentUser);
          await fetchMensajes();
        } else {
          await signOut(auth);
          setUser(null);
          alert('Acceso denegado.');
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este mensaje? Esta acción no se puede deshacer.')) return;
    await deleteDoc(doc(db, 'consultas', id));
    await fetchMensajes();
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-xs font-black uppercase tracking-widest text-slate-900">
        Acceso denegado
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 border-r border-slate-200 bg-white/90 p-4 backdrop-blur-xl lg:flex lg:flex-col">
        <Link href="/administracion-yonko-gerald" className="mb-4 flex items-center gap-3 rounded-2xl bg-slate-950 p-2.5 text-white">
          <img src="/icon.png" alt="Yonko" className="h-9 w-9 rounded-2xl bg-white object-contain p-1" />
          <div>
            <p className="text-sm font-black uppercase leading-none tracking-tight">Yonko ERP</p>
            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.22em] text-blue-200">Bandeja comercial</p>
          </div>
        </Link>

        <Link href="/" className="mb-2 rounded-xl border border-slate-200 bg-white p-3 text-center text-[9px] font-black uppercase tracking-widest text-slate-500 transition hover:border-blue-200 hover:text-blue-600">Ver sitio público</Link>

        <Link href="/administracion-yonko-gerald" className="rounded-2xl bg-slate-100 p-4 text-xs font-black uppercase tracking-widest text-slate-600 transition hover:bg-blue-600 hover:text-white">
          ← Volver al panel
        </Link>

        <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <p className="font-mono text-[9px] font-black uppercase tracking-[0.22em] text-slate-400">Total leads</p>
          <p className="mt-3 text-4xl font-black text-blue-600">{mensajes.length}</p>
          <p className="mt-1 text-xs font-semibold text-slate-500">Consultas guardadas en Firebase</p>
        </div>

        <div className="mt-auto rounded-2xl border border-slate-100 p-3">
          <p className="break-all text-[11px] font-bold text-slate-500">{user.email}</p>
          <button onClick={() => signOut(auth)} className="mt-4 w-full rounded-2xl bg-red-50 py-3 text-[10px] font-black uppercase tracking-widest text-red-500 transition hover:bg-red-600 hover:text-white">
            Salir
          </button>
        </div>
      </aside>

      <div className="lg:pl-60">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 px-3 py-2.5 backdrop-blur-xl lg:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <Link href="/administracion-yonko-gerald" className="mb-2 block text-[10px] font-black uppercase tracking-[0.22em] text-blue-600 lg:hidden">← Volver al panel</Link>
              <p className="font-mono text-[9px] font-black uppercase tracking-[0.3em] text-blue-600">CRM interno</p>
              <h1 className="mt-1 text-xl font-black uppercase tracking-tight text-slate-950">Bandeja de entrada</h1>
            </div>
            <div className="rounded-2xl bg-white px-5 py-3 text-[10px] font-black uppercase tracking-widest text-slate-500 shadow-sm ring-1 ring-slate-200">
              Total leads: <span className="text-blue-600">{mensajes.length}</span>
            </div>
          </div>
        </header>

        <section className="px-4 py-5 lg:px-6">
          <div className="grid gap-5">
            <AnimatePresence>
              {mensajes.map((m) => {
                const tel = String(m.telefono || '').trim();
                const whatsappHref = tel ? `https://wa.me/${tel.replace(/\D/g, '')}` : '';

                return (
                  <motion.article
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    key={m.id}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-200 md:p-5"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div className="min-w-0">
                        <span className="mb-3 inline-flex rounded-full bg-blue-600 px-3 py-1 text-[8px] font-black uppercase tracking-widest text-white">
                          {m.area || 'General'}
                        </span>
                        <h2 className="break-words text-xl font-black uppercase tracking-tight text-slate-950">{m.nombre}</h2>
                        <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-slate-400">
                          {m.fecha?.toDate ? m.fecha.toDate().toLocaleString() : 'Sin fecha'}
                        </p>
                      </div>
                      <button onClick={() => handleDelete(m.id)} className="rounded-2xl bg-red-50 px-3 py-2.5 text-[10px] font-black uppercase tracking-widest text-red-500 transition hover:bg-red-600 hover:text-white">
                        Eliminar
                      </button>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <a href={`mailto:${m.email}`} className="rounded-2xl bg-blue-50 px-3 py-2.5 text-xs font-bold text-blue-700 transition hover:bg-blue-600 hover:text-white break-all">
                        ✉ {m.email}
                      </a>
                      {tel && (
                        <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="rounded-2xl bg-emerald-50 px-3 py-2.5 text-xs font-bold text-emerald-700 transition hover:bg-emerald-600 hover:text-white">
                          WhatsApp {tel}
                        </a>
                      )}
                    </div>

                    <div className="mt-4 rounded-2xl border-l-4 border-blue-600 bg-slate-50 p-5 md:p-6">
                      <p className="mb-2 text-[9px] font-black uppercase tracking-[0.22em] text-blue-600">Requerimiento</p>
                      <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-slate-600">{m.descripcion}</p>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>

            {mensajes.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-[3rem] border-2 border-dashed border-slate-200 bg-white py-20 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-2xl">📥</div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Bandeja vacía.</p>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
