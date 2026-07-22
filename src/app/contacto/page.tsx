"use client";

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { motion, useInView } from 'framer-motion';

declare global {
  interface Window {
    onTurnstileSuccess?: (token: string) => void;
    onTurnstileExpired?: () => void;
  }
}

function Toast({ visible }: { visible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={visible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
      className="fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-2xl bg-slate-900 px-6 py-4 text-white shadow-2xl pointer-events-none"
    >
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px]">✓</span>
      <span className="text-sm font-bold">Mensaje recibido — responderemos por correo o WhatsApp</span>
    </motion.div>
  );
}

function CanalCard({ href, icon, label, sublabel, color }: {
  href: string;
  icon: React.ReactNode;
  label: string;
  sublabel: string;
  color: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-200 hover:shadow-lg hover:shadow-slate-100"
    >
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-md transition-transform duration-300 group-hover:scale-110 ${color}`}>
        {icon}
      </div>
      <div>
        <p className="mb-0.5 font-mono text-[8px] uppercase tracking-[0.2em] text-slate-400">{sublabel}</p>
        <p className="text-sm font-black text-slate-900 transition-colors group-hover:text-blue-600">{label}</p>
      </div>
      <svg className="ml-auto h-4 w-4 text-slate-300 transition-colors group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
      </svg>
    </a>
  );
}

export default function ContactoPage() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [area, setArea] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [company, setCompany] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');

  const formRef = useRef(null);
  const formInView = useInView(formRef, { once: true, margin: '-40px' });
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    window.onTurnstileSuccess = (token: string) => setCaptchaToken(token);
    window.onTurnstileExpired = () => setCaptchaToken('');

    return () => {
      delete window.onTurnstileSuccess;
      delete window.onTurnstileExpired;
    };
  }, []);

  const resetForm = () => {
    setNombre('');
    setEmail('');
    setTelefono('');
    setArea('');
    setDescripcion('');
    setCompany('');
    setCaptchaToken('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!area) {
      setError('Por favor selecciona un área de ingeniería.');
      return;
    }

    if (descripcion.trim().length < 20) {
      setError('Cuéntanos un poco más del proyecto para poder responder bien.');
      return;
    }

    if (turnstileSiteKey && !captchaToken) {
      setError('Completa la verificación de seguridad antes de enviar.');
      return;
    }

    setEnviando(true);

    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          email,
          telefono,
          area,
          descripcion,
          company,
          captchaToken,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'No se pudo enviar el mensaje.');

      setEnviado(true);
      resetForm();
      setTimeout(() => setEnviado(false), 4500);
    } catch (err: any) {
      setError(err?.message || 'Error de conexión. Por favor intenta más tarde.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <main suppressHydrationWarning className="min-h-screen overflow-x-hidden bg-white text-slate-900">
      {turnstileSiteKey && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />}
      <Toast visible={enviado} />

      <section className="relative overflow-hidden px-5 pb-10 pt-20 md:px-6 md:pb-12 md:pt-24" style={{ background: 'linear-gradient(160deg, #f0f7ff 0%, #ffffff 55%)' }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#2563eb 1px,transparent 1px),linear-gradient(90deg,#2563eb 1px,transparent 1px)', backgroundSize: '52px 52px' }} />
        <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-blue-100 opacity-50 blur-[120px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3.5 py-1.5 shadow-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-blue-700">Contacto comercial</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }} className="mb-4 text-[clamp(2.05rem,5vw,4rem)] font-black uppercase leading-tight tracking-tight">
            Hablemos de su<br />
            <span className="italic text-blue-600">proyecto.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="max-w-xl text-sm leading-relaxed text-slate-500 md:text-base">
            Cuéntenos qué necesita construir, mejorar o automatizar.{' '}
            <span className="font-semibold text-slate-900">Podemos responder por correo o WhatsApp según el canal que prefiera.</span>
          </motion.p>
        </div>
      </section>

      <section className="bg-white px-5 pb-20 md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="space-y-6 lg:sticky lg:top-28">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
                <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.25em] text-blue-600">Lo que garantizamos</p>
                <div className="space-y-3">
                  {[
                    { icon: '✉️', t: 'Respuesta por canal directo', d: 'Respondemos por correo o WhatsApp, según los datos que dejes.' },
                    { icon: '🔒', t: 'Confidencialidad NDA', d: 'Tu información no se comparte con terceros.' },
                    { icon: '🛡️', t: 'Formulario protegido', d: 'Rate limit, honeypot y captcha contra bots.' },
                  ].map((g) => (
                    <div key={g.t} className="flex items-start gap-3">
                      <span className="mt-0.5 shrink-0 text-lg">{g.icon}</span>
                      <div>
                        <p className="text-xs font-black uppercase tracking-tight text-slate-900">{g.t}</p>
                        <p className="text-xs text-slate-500">{g.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 ml-1 font-mono text-[9px] uppercase tracking-[0.25em] text-slate-400">Contacto directo</p>
                <div className="space-y-3">
                  <CanalCard
                    href="https://wa.me/56942882503"
                    label="WhatsApp"
                    sublabel="Abrir conversación"
                    color="bg-emerald-500"
                    icon={
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.524 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.952 7.952 0 01-4.072-1.117l-.292-.173-3.02.899.899-3.02-.173-.292A7.952 7.952 0 014 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z" />
                      </svg>
                    }
                  />

                  <CanalCard
                    href="mailto:yonkoservicios@gmail.com"
                    label="yonkoservicios@gmail.com"
                    sublabel="Correo electrónico"
                    color="bg-blue-600"
                    icon={
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    }
                  />
                </div>
              </div>
            </motion.div>

            <motion.div ref={formRef} initial={{ opacity: 0, y: 24 }} animate={formInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="rounded-[1.75rem] border border-slate-100 bg-white p-5 shadow-lg shadow-slate-100 md:p-7">
              <div className="mb-7">
                <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.3em] text-blue-600">Formulario de proyecto</p>
                <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900">Brief técnico</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">Déjanos correo y, si prefieres respuesta rápida por WhatsApp, agrega tu teléfono.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 ml-1 block text-[9px] font-black uppercase tracking-[0.2em] text-blue-600">Nombre completo</label>
                    <input required type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} autoComplete="name" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="mb-1.5 ml-1 block text-[9px] font-black uppercase tracking-[0.2em] text-blue-600">Email</label>
                    <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder="empresa@dominio.com" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 placeholder-slate-300 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 ml-1 block text-[9px] font-black uppercase tracking-[0.2em] text-blue-600">Teléfono o WhatsApp</label>
                    <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} autoComplete="tel" placeholder="+56 9 XXXX XXXX" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 placeholder-slate-300 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="mb-1.5 ml-1 block text-[9px] font-black uppercase tracking-[0.2em] text-blue-600">Área de ingeniería</label>
                    <div className="relative">
                      <select value={area} onChange={(e) => setArea(e.target.value)} className="w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="" disabled>Seleccione una especialidad</option>
                        <option value="Desarrollo Web Pro">Desarrollo Web Pro</option>
                        <option value="E-commerce">E-commerce & Conversión</option>
                        <option value="Desarrollo Móvil">Desarrollo Móvil</option>
                        <option value="IA & Data Science">IA & Data Science</option>
                        <option value="Automatización">Automatización de Procesos</option>
                        <option value="Estrategia UX/CX">Estrategia UX/CX</option>
                        <option value="Consultoría Senior">Consultoría Técnica Senior</option>
                      </select>
                      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                        <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 ml-1 block text-[9px] font-black uppercase tracking-[0.2em] text-blue-600">Descripción del proyecto</label>
                  <textarea required value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Cuéntanos tu desafío técnico, objetivos y cualquier detalle relevante..." className="h-36 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 placeholder-slate-300 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                {turnstileSiteKey && (
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                    <div
                      className="cf-turnstile"
                      data-sitekey={turnstileSiteKey}
                      data-callback="onTurnstileSuccess"
                      data-expired-callback="onTurnstileExpired"
                    />
                  </div>
                )}

                {error && (
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2.5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-xs font-medium text-red-700">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-200 text-[9px] font-black text-red-600">!</span>
                    {error}
                  </motion.div>
                )}

                <button type="submit" disabled={enviando} className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 py-4 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-blue-200 transition-all hover:scale-[1.01] hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60">
                  {enviando ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar brief técnico
                      <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </>
                  )}
                </button>

                <div className="flex flex-wrap items-center justify-center gap-4 pt-1">
                  {['🔒 NDA incluido', '⏱️ Respuesta por correo o WhatsApp', '🛡️ Captcha anti-bots'].map((g) => (
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
