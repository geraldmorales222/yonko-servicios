'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function MensajesPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mensajes, setMensajes] = useState<any[]>([]);

  // ─── Lógica de Seguridad (Igual al AdminPanel) ───
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
      console.error("Error validando admin:", error);
      return false;
    }
  };

  const fetchMensajes = async () => {
    try {
      const q = query(collection(db, 'consultas'), orderBy('fecha', 'desc'));
      const snap = await getDocs(q);
      setMensajes(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (error) {
      console.error("Error al cargar mensajes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser && currentUser.email) {
        // Validamos con el servidor
        const isAdmin = await verifyAdmin(currentUser.email);
        
        if (isAdmin) {
          setUser(currentUser);
          fetchMensajes();
        } else {
          await signOut(auth);
          setUser(null);
          alert("Acceso denegado.");
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("¿Eliminar este mensaje? Esta acción no se puede deshacer.")) {
      await deleteDoc(doc(db, 'consultas', id));
      fetchMensajes();
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-900 font-black uppercase tracking-widest text-xs">
      Acceso Denegado
    </div>
  );

  return (
    <main className="pt-24 pb-20 bg-[#F8FAFC] min-h-screen text-slate-900">
      <div className="max-w-5xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <Link href="/administracion-yonko-gerald" className="text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-3 block hover:translate-x-1 transition-transform">
              ← Volver al Editor
            </Link>
            <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">Bandeja de Entrada</h1>
          </div>
          <div className="bg-white px-5 py-2 rounded-full border border-slate-200 shadow-sm">
            <p className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest">
              Total Leads: <span className="text-blue-600">{mensajes.length}</span>
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          <AnimatePresence>
            {mensajes.map((m) => (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={m.id} 
                // Añadimos overflow-hidden y break-words para que el texto no se escape
                className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm group relative hover:border-blue-400/30 transition-all overflow-hidden break-words"
              >
                {/* Ajustamos el encabezado para que en móvil se apile verticalmente si no cabe */}
                <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
                  <div className="space-y-1 w-full sm:w-auto">
                    <span className="bg-blue-600 text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest inline-block mb-2">
                      {m.area || 'General'}
                    </span>
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight leading-tight break-words">
                      {m.nombre}
                    </h3>
                  </div>
                  <span className="text-slate-300 text-[10px] font-mono italic shrink-0">
                    {m.fecha?.toDate().toLocaleString()}
                  </span>
                </div>
                
                {/* El email suele ser el principal culpable del desborde */}
                <div className="flex flex-wrap gap-4 mb-6 overflow-hidden">
                  <a href={`mailto:${m.email}`} className="flex items-center gap-2 text-blue-600 font-bold text-xs hover:underline decoration-2 underline-offset-4 break-all">
                    <span className="opacity-50">✉</span> {m.email}
                  </a>
                  {/* ... resto de enlaces (teléfono, whatsapp) ... */}
                </div>

                {/* Ajuste del bloque de Requerimiento */}
                <div className="bg-slate-50 p-5 md:p-6 rounded-3xl border-l-4 border-blue-600 relative">
                  <span className="absolute -top-3 left-6 bg-blue-600 text-white text-[8px] font-black px-2 py-0.5 rounded uppercase">Requerimiento</span>
                  <p className="text-slate-600 text-sm leading-relaxed italic whitespace-pre-wrap">
                    "{m.descripcion}"
                  </p>
                </div>
                
                {/* Botón de borrar: lo hacemos más visible en móvil ya que no hay 'hover' */}
                <button 
                  onClick={() => handleDelete(m.id)}
                  className="absolute top-4 right-4 sm:top-8 sm:right-8 w-10 h-10 flex items-center justify-center bg-red-50 text-red-500 rounded-xl opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:bg-red-600 hover:text-white transition-all shadow-sm z-10"
                >
                  🗑️
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          {mensajes.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
               <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">📥</div>
               <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Bandeja vacía.</p>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}