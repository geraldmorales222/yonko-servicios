"use client";

import { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs, orderBy, limit } from 'firebase/firestore';

// ─── Toast de éxito ───────────────────────────────────────────────────────────
function Toast({ visible }: { visible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={visible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 pointer-events-none"
    >
      <span className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-[10px]">✓</span>
      <span className="text-sm font-bold">Mensaje recibido — respuesta en menos de 24h</span>
    </motion.div>
  );
}

// ─── Canal de contacto ────────────────────────────────────────────────────────
function CanalCard({ href, icon, label, sublabel, color }: {
  href: string; icon: React.ReactNode; label: string; sublabel: string; color: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="group flex items-center gap-4 p-5 bg-white border border-slate-100 rounded-2xl hover:border-slate-200 hover:shadow-lg hover:shadow-slate-100 hover:-translate-y-0.5 transition-all duration-300"
    >
      <div className={`w-11 h-11 ${color} rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300 shrink-0`}>
        {icon}
      </div>
      <div>
        <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-slate-400 mb-0.5">{sublabel}</p>
        <p className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors">{label}</p>
      </div>
      <svg className="w-4 h-4 text-slate-300 group-hover:text-blue-500 ml-auto transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
      </svg>
    </a>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function ContactoPage() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');      // ← nuevo
  const [area, setArea] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');

  const formRef = useRef(null);
  const formInView = useInView(formRef, { once: true, margin: '-40px' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!area) {
      setError('Por favor selecciona un área de ingeniería.');
      return;
    }

    setEnviando(true);

    try {
      // Validación anti-spam: 1 mensaje cada 24h por email
      const consultasRef = collection(db, 'consultas');
      const q = query(
        consultasRef,
        where('email', '==', email.toLowerCase().trim()),
        orderBy('fecha', 'desc'),
        limit(1)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const lastDoc = querySnapshot.docs[0].data();
        if (lastDoc.fecha) {
          const diffInHours = (new Date().getTime() - lastDoc.fecha.toDate().getTime()) / (1000 * 60 * 60);
          if (diffInHours < 24) {
            setError(`Solo se permite 1 mensaje cada 24h. Intente en ${Math.ceil(24 - diffInHours)} horas.`);
            setEnviando(false);
            return;
          }
        }
      }

      await addDoc(collection(db, 'consultas'), {
        nombre,
        email: email.toLowerCase().trim(),
        telefono: telefono.trim(),                   // ← nuevo
        area,
        descripcion,
        fecha: serverTimestamp(),
        leido: false,
      });

      setEnviado(true);
      setNombre('');
      setEmail('');
      setTelefono('');                               // ← nuevo
      setArea('');
      setDescripcion('');
      setTimeout(() => setEnviado(false), 4000);

    } catch (err) {
      console.error(err);
      setError('Error de conexión. Por favor intenta más tarde.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
      <Toast visible={enviado} />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="pt-24 md:pt-32 pb-16 px-5 md:px-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #f0f7ff 0%, #ffffff 55%)' }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(#2563eb 1px,transparent 1px),linear-gradient(90deg,#2563eb 1px,transparent 1px)', backgroundSize: '52px 52px' }} />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[120px] opacity-50 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 bg-white border border-blue-100 shadow-sm px-3.5 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-blue-700">Disponible ahora</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(2.8rem,8vw,6.5rem)] font-black leading-[0.85] tracking-tighter uppercase mb-5"
          >
            INICIEMOS LA<br />
            <span className="text-blue-600 italic">consultoría.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base md:text-lg text-slate-500 max-w-md leading-relaxed">
            Auditorías de arquitectura, desarrollos full-stack, IA aplicada y más.{' '}
            <span className="text-slate-900 font-semibold">Respuesta técnica garantizada en menos de 24h.</span>
          </motion.p>
        </div>
      </section>

      {/* ── CONTENIDO PRINCIPAL ───────────────────────────────────────────── */}
      <section className="px-5 md:px-6 pb-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_1.6fr] gap-8 lg:gap-12 items-start">

            {/* Columna izquierda: info + canales */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6 lg:sticky lg:top-28"
            >
              {/* Garantías */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-blue-600 mb-4">Lo que garantizamos</p>
                <div className="space-y-3">
                  {[
                    { icon: '⏱️', t: 'Respuesta en 24h', d: 'Un ingeniero senior responde su consulta.' },
                    { icon: '🔒', t: 'Confidencialidad NDA', d: 'Su información nunca es compartida.' },
                    { icon: '🎯', t: 'Sin spam ni ventas', d: 'Solo contacto técnico y relevante.' },
                  ].map((g) => (
                    <div key={g.t} className="flex items-start gap-3">
                      <span className="text-lg shrink-0 mt-0.5">{g.icon}</span>
                      <div>
                        <p className="text-xs font-black text-slate-900 uppercase tracking-tight">{g.t}</p>
                        <p className="text-xs text-slate-500">{g.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Canales alternativos */}
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-slate-400 mb-3 ml-1">Contacto directo</p>
                <div className="space-y-3">
                  {/* WhatsApp */}
                  <CanalCard
                    href="https://wa.me/56977843656"
                    label="WhatsApp Business"
                    sublabel="Respuesta rápida"
                    color="bg-emerald-500"
                    icon={
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.524 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.952 7.952 0 01-4.072-1.117l-.292-.173-3.02.899.899-3.02-.173-.292A7.952 7.952 0 014 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z"/>
                      </svg>
                    }
                  />

                  {/* Email */}
                  <CanalCard
                    href="mailto:yonko@yonkoservicios.com"
                    label="yonko@yonkoservicios.com"
                    sublabel="Correo electrónico"
                    color="bg-blue-600"
                    icon={
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    }
                  />

                 
                </div>
              </div>

              {/* Horario */}
              <div className="flex items-center gap-3 px-4 py-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <p className="text-xs text-emerald-800 font-medium">
                  <span className="font-black">Disponible Lun–Vie</span> · 9:00 – 19:00 (GMT-3)
                </p>
              </div>
            </motion.div>

            {/* Columna derecha: formulario */}
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, y: 24 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white border border-slate-100 rounded-3xl p-7 md:p-10 shadow-xl shadow-slate-100"
            >
              <div className="mb-7">
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-blue-600 mb-1">Formulario de proyecto</p>
                <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900">Brief técnico</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Nombre + Email */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-blue-600 mb-1.5 ml-1">Nombre completo</label>
                    <input
                      required
                      type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder=""
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-blue-600 mb-1.5 ml-1">Email</label>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="empresa@dominio.com"
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    />
                  </div>
                </div>

                {/* Teléfono + Área */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-blue-600 mb-1.5 ml-1">Teléfono de contacto</label>
                    <input
                      type="tel"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      placeholder="+56 9 XXXX XXXX"
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-blue-600 mb-1.5 ml-1">Área de ingeniería</label>
                    <div className="relative">
                      <select
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer text-sm"
                      >
                        <option value="" disabled>Seleccione una especialidad</option>
                        <option value="Desarrollo Web Pro">Desarrollo Web Pro</option>
                        <option value="E-commerce">E-commerce & Conversión</option>
                        <option value="Desarrollo Móvil">Desarrollo Móvil</option>
                        <option value="IA & Data Science">IA & Data Science</option>
                        <option value="Automatización">Automatización de Procesos</option>
                        <option value="Estrategia UX/CX">Estrategia UX/CX</option>
                        <option value="Consultoría Senior">Consultoría Técnica Senior</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Descripción */}
                <div>
                  <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-blue-600 mb-1.5 ml-1">Descripción del proyecto</label>
                  <textarea
                    required
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    placeholder="Cuéntenos su desafío técnico, objetivos y cualquier detalle relevante..."
                    className="w-full px-4 py-3.5 h-36 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-sm"
                  />
                </div>

                {/* Error */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2.5 bg-red-50 border border-red-100 text-red-700 text-xs font-medium px-4 py-3 rounded-xl"
                  >
                    <span className="w-4 h-4 bg-red-200 text-red-600 rounded-full flex items-center justify-center text-[9px] shrink-0 font-black">!</span>
                    {error}
                  </motion.div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={enviando}
                  className="group w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 hover:scale-[1.01] active:scale-[0.99] transition-all shadow-lg shadow-blue-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {enviando ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar brief técnico
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </>
                  )}
                </button>

                {/* Garantías inline */}
                <div className="flex items-center justify-center gap-5 pt-1">
                  {['🔒 NDA incluido', '⏱️ Respuesta 24h', '🚫 Sin spam'].map((g) => (
                    <span key={g} className="font-mono text-[8px] uppercase tracking-widest text-slate-400">{g}</span>
                  ))}
                </div>

              </form>
            </motion.div>
          </div>
        </div>
      </section>

    </main>
  );
}