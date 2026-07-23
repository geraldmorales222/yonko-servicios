"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const SERVICIOS = [
  { name: "Desarrollo Web", href: "/servicios/desarrollo-web-pro", color: "bg-blue-500", desc: "Next.js · TypeScript · PostgreSQL", disabled: false },
  { name: "E-commerce", href: "/servicios/ecommerce-alta-conversion", color: "bg-indigo-500", desc: "Stripe · Headless · Analytics", disabled: false },
  { name: "Desarrollo Móvil", href: "/servicios/desarrollo-movil", color: "bg-rose-500", desc: "React Native · Expo · iOS · Android", disabled: false },
  { name: "Ingeniería de Software", href: "/servicios/ingenieria-software", color: "bg-sky-900", desc: "Node.js · TypeScript · AWS", disabled: false },
  { name: "Automatización", href: "/servicios/automatizacion-procesos", color: "bg-sky-500", desc: "n8n · Zapier · APIs", disabled: false },
  { name: "Estrategia UX/CX", href: "/servicios/estrategia-ux-cx", color: "bg-emerald-500", desc: "Auditoría · Testing · Heatmaps", disabled: false },
  { name: "Rendimiento Web WPO", href: "/servicios/auditoria-rendimiento-web-wpo", color: "bg-blue-600", desc: "Core Web Vitals · UX · Velocidad", disabled: false },
  { name: "IA & Data Science", href: "/servicios/sistemas-inteligentes-ia", color: "bg-violet-500", desc: "Python · ML · Supabase", disabled: true },
];

const MOBILE_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Nosotros", href: "/nosotros" },
];

function Logo({ size = 42 }: { size?: number }) {
  return (
    <Image
      src="/icon-navbar.png"
      alt="Yonko Servicios - Inicio"
      width={size}
      height={size}
      priority
      className="rounded-full object-contain"
    />
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  const navClass = (href: string) =>
    `text-[11px] font-black uppercase tracking-[0.2em] transition-colors duration-200 ${
      pathname === href ? "text-blue-600" : "text-slate-500 hover:text-slate-950"
    }`;

  return (
    <>
      <nav
        className={`fixed left-0 top-0 z-[100] w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-slate-100 bg-white/95 shadow-sm shadow-slate-100 backdrop-blur-xl"
            : "border-b border-slate-100/60 bg-white/80 backdrop-blur-lg"
        }`}
      >
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 md:justify-center md:px-6">
          <Link href="/" aria-label="Ir al inicio" className="flex h-12 w-12 items-center justify-center rounded-full ring-1 ring-blue-100 md:hidden">
            <Logo />
          </Link>

          <div className="hidden items-center justify-center gap-9 md:flex">
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setDropdownOpen((open) => !open)}
                className={`flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.2em] transition-colors duration-200 ${
                  pathname.startsWith("/servicios") ? "text-blue-600" : "text-slate-500 hover:text-slate-950"
                }`}
              >
                Servicios
                <motion.svg
                  animate={{ rotate: dropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
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
                    className="absolute left-1/2 top-full mt-4 w-72 -translate-x-1/2 rounded-2xl border border-slate-100 bg-white p-2 shadow-xl shadow-slate-100"
                  >
                    <Link
                      href="/servicios"
                      className="flex items-center gap-1.5 px-3 py-2 text-[9px] font-black uppercase tracking-[0.3em] text-blue-600 transition-colors hover:text-blue-700"
                    >
                      Ver todos los servicios →
                    </Link>
                    <div className="mb-1 h-px w-full bg-slate-100" />

                    {SERVICIOS.map((service) =>
                      service.disabled ? (
                        <div key={service.href} className="flex cursor-not-allowed select-none items-center gap-3 rounded-xl px-3 py-2.5">
                          <div className={`h-2 w-2 shrink-0 rounded-full ${service.color} opacity-30`} />
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-[11px] font-black uppercase tracking-tight text-slate-300">{service.name}</p>
                              <span className="rounded-full bg-slate-100 px-1.5 py-0.5 font-mono text-[7px] uppercase tracking-widest text-slate-400">Próximo</span>
                            </div>
                            <p className="font-mono text-[8px] tracking-wide text-slate-300">{service.desc}</p>
                          </div>
                        </div>
                      ) : (
                        <Link key={service.href} href={service.href} className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150 hover:bg-slate-50">
                          <div className={`h-2 w-2 shrink-0 rounded-full ${service.color}`} />
                          <div>
                            <p className="text-[11px] font-black uppercase tracking-tight text-slate-900 transition-colors group-hover:text-blue-600">{service.name}</p>
                            <p className="font-mono text-[8px] tracking-wide text-slate-400">{service.desc}</p>
                          </div>
                        </Link>
                      )
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/proyectos" className={navClass("/proyectos")}>
              Proyectos
            </Link>

            <Link
              href="/"
              aria-label="Ir al inicio"
              title="Inicio"
              className={`group mx-1 flex h-14 w-16 flex-col items-center justify-center gap-0.5 rounded-2xl transition duration-300 hover:bg-blue-50 ${
                pathname === "/" ? "bg-blue-50/80 text-blue-600" : "text-slate-400 hover:text-blue-600"
              }`}
            >
              <span className={`flex h-10 w-10 items-center justify-center rounded-full ring-1 transition ${
                pathname === "/" ? "ring-blue-200 shadow-sm shadow-blue-100" : "ring-blue-100 group-hover:ring-blue-200"
              }`}>
                <Logo size={34} />
              </span>
              <span className="font-mono text-[7px] font-black uppercase tracking-[0.24em]">
                Inicio
              </span>
            </Link>

            <Link href="/nosotros" className={navClass("/nosotros")}>
              Nosotros
            </Link>

            <Link
              href="/contacto"
              className="group inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-white shadow-md shadow-blue-100 transition-all hover:scale-[1.03] hover:bg-blue-700 active:scale-[0.98]"
            >
              Contáctanos
              <svg className="h-3 w-3 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Abrir menú"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-xl transition-colors hover:bg-slate-50 md:hidden"
          >
            <motion.span animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="block h-0.5 w-5 origin-center rounded-full bg-slate-900" />
            <motion.span animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} className="block h-0.5 w-5 rounded-full bg-slate-900" />
            <motion.span animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="block h-0.5 w-5 origin-center rounded-full bg-slate-900" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[90] bg-slate-900/20 backdrop-blur-sm md:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed bottom-0 right-0 top-0 z-[99] flex w-[80vw] max-w-sm flex-col bg-white shadow-2xl md:hidden"
            >
              <div className="flex h-[68px] items-center justify-between border-b border-slate-100 px-6">
                <Link href="/" aria-label="Ir al inicio" className="flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-blue-100">
                  <Logo size={40} />
                </Link>
                <button onClick={() => setMenuOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-xl transition-colors hover:bg-slate-50">
                  <svg className="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
                {MOBILE_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-black uppercase tracking-wide transition-colors ${
                      pathname === link.href ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {link.label}
                    {pathname === link.href && <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />}
                  </Link>
                ))}

                <Link href="/servicios" className="flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-black uppercase tracking-wide text-slate-700 transition-colors hover:bg-slate-50">
                  Servicios
                </Link>
              </div>

              <div className="border-t border-slate-100 px-4 py-6">
                <Link href="/contacto" className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-4 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-blue-100 transition-colors hover:bg-blue-700">
                  Contáctanos
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
