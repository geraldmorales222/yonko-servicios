"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const SERVICIOS = [
  { name: 'Desarrollo Web', href: '/servicios/desarrollo-web-pro', color: 'bg-blue-500', desc: 'Next.js · TypeScript · PostgreSQL', disabled: false },
  { name: 'E-commerce', href: '/servicios/ecommerce-alta-conversion', color: 'bg-indigo-500', desc: 'Stripe · Headless · Analytics', disabled: false },
  { name: 'Desarrollo Movil', href: '/servicios/desarrollo-movil', color: 'bg-rose-500', desc: 'React Native · Expo · iOS · Android', disabled: false },
  { name: 'Automatización', href: '/servicios/automatizacion-procesos', color: 'bg-sky-500', desc: 'n8n · Zapier · APIs', disabled: false },
  { name: 'Estrategia UX/CX', href: '/servicios/estrategia-ux-cx', color: 'bg-emerald-500', desc: 'Auditoría · Testing · Heatmaps', disabled: true },
  { name: 'IA & Data Science', href: '/servicios/sistemas-inteligentes-ia', color: 'bg-violet-500', desc: 'Python · ML · Supabase', disabled: true },
];

const NAV_LINKS = [
  { label: 'Inicio', href: '/' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Proyectos', href: '/proyectos' },
];

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  if (!mounted) return null;

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <nav className={`fixed w-full z-[100] top-0 transition-all duration-300
        ${scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-sm shadow-slate-100 border-b border-slate-100'
          : 'bg-white/80 backdrop-blur-lg border-b border-slate-100/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-6 h-[68px] flex items-center justify-between">

          {/* ── Logo ───────────────────────────────────────────────────── */}
          <Link href="/" className="group flex items-center gap-1.5 shrink-0">
            <span className="text-xl font-black tracking-tighter text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
              YONKO
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse mt-1" />
          </Link>

          {/* ── Desktop Nav ────────────────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-7">

              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href}
                  className={`text-[11px] font-black uppercase tracking-[0.18em] transition-colors duration-200
                    ${isActive(link.href) ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}>
                  {link.label}
                </Link>
              ))}

              {/* Dropdown servicios */}
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.18em] transition-colors duration-200
                    ${pathname.startsWith('/servicios') ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}
                >
                  Servicios
                  <motion.svg
                    animate={{ rotate: dropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-3 h-3"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </motion.svg>
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute left-0 top-full mt-3 w-72 bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-100 p-2 origin-top-left"
                    >
                      {/* Header del dropdown */}
                      <div className="px-3 py-2 mb-1">
                        <Link href="/servicios"
                          className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1.5 group">
                          Ver todos los servicios
                          <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </Link>
                      </div>

                      <div className="w-full h-px bg-slate-100 mb-1" />

                      {SERVICIOS.map((s) =>
                        s.disabled ? (
                          // Deshabilitado: se muestra pero no navega
                          <div
                            key={s.href}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-not-allowed select-none"
                          >
                            <div className={`w-2 h-2 rounded-full ${s.color} opacity-30 shrink-0`} />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="text-[11px] font-black text-slate-300 uppercase tracking-tight">{s.name}</p>
                                <span className="font-mono text-[7px] uppercase tracking-widest bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded-full">Próximo</span>
                              </div>
                              <p className="font-mono text-[8px] text-slate-300 tracking-wide">{s.desc}</p>
                            </div>
                          </div>
                        ) : (
                          // Habilitado: navega normalmente
                          <Link key={s.href} href={s.href}
                            className="group flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors duration-150">
                            <div className={`w-2 h-2 rounded-full ${s.color} shrink-0`} />
                            <div>
                              <p className="text-[11px] font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{s.name}</p>
                              <p className="font-mono text-[8px] text-slate-400 tracking-wide">{s.desc}</p>
                            </div>
                          </Link>
                        )
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* CTA */}
            <div className="border-l border-slate-100 pl-7">
              <Link href="/contacto"
                className="group inline-flex items-center gap-2 bg-blue-600 text-white text-[10px] font-black px-5 py-2.5 rounded-full hover:bg-blue-700 hover:scale-[1.03] active:scale-[0.98] transition-all uppercase tracking-widest shadow-md shadow-blue-100">
                Contáctanos
                <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* ── Hamburger mobile ───────────────────────────────────────── */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22 }}
              className="block w-5 h-0.5 bg-slate-900 rounded-full origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.18 }}
              className="block w-5 h-0.5 bg-slate-900 rounded-full"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22 }}
              className="block w-5 h-0.5 bg-slate-900 rounded-full origin-center"
            />
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[90] bg-slate-900/20 backdrop-blur-sm md:hidden"
              onClick={() => setMenuOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 z-[99] w-[80vw] max-w-sm bg-white shadow-2xl flex flex-col md:hidden"
            >
              {/* Header del panel */}
              <div className="flex items-center justify-between px-6 h-[68px] border-b border-slate-100">
                <span className="text-lg font-black tracking-tighter text-slate-900">YONKO<span className="text-blue-600">.</span></span>
                <button onClick={() => setMenuOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-50 transition-colors">
                  <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Links */}
              <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.div key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <Link href={link.href}
                      className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-black uppercase tracking-wide transition-colors
                        ${isActive(link.href) ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50'}`}>
                      {link.label}
                      {isActive(link.href) && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                    </Link>
                  </motion.div>
                ))}

                {/* Servicios expandible en mobile */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  {/* Servicios — solo abre dropdown, "Ver todos" es el acceso a /servicios */}
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-black uppercase tracking-wide transition-colors
                      ${pathname.startsWith('/servicios') ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50'}`}
                  >
                    Servicios
                    <motion.svg
                      animate={{ rotate: dropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-4 h-4 text-slate-400"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </motion.svg>
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 pt-1 space-y-0.5 border-l-2 border-slate-100 ml-4 mb-1">
                          {SERVICIOS.map((s) =>
                            s.disabled ? (
                              // Deshabilitado en mobile
                              <div key={s.href}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-not-allowed select-none">
                                <div className={`w-2 h-2 rounded-full ${s.color} opacity-30 shrink-0`} />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <p className="text-[11px] font-black text-slate-300 uppercase tracking-tight">{s.name}</p>
                                    <span className="font-mono text-[7px] uppercase tracking-widest bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded-full">Próximo</span>
                                  </div>
                                  <p className="font-mono text-[8px] text-slate-300">{s.desc}</p>
                                </div>
                              </div>
                            ) : (
                              // Habilitado en mobile
                              <Link key={s.href} href={s.href}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors group">
                                <div className={`w-2 h-2 rounded-full ${s.color} shrink-0`} />
                                <div>
                                  <p className="text-[11px] font-black text-slate-800 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{s.name}</p>
                                  <p className="font-mono text-[8px] text-slate-400">{s.desc}</p>
                                </div>
                              </Link>
                            )
                          )}
                          <Link href="/servicios"
                            className="flex items-center gap-2 px-3 py-2.5 text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-700 transition-colors">
                            Ver todos →
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* CTA bottom */}
              <div className="px-4 py-6 border-t border-slate-100">
                <Link href="/contacto"
                  className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100">
                  Contáctanos
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <div className="flex items-center justify-center gap-1.5 mt-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-[8px] uppercase tracking-widest text-slate-400">Disponible Lun–Vie 9–19h</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}