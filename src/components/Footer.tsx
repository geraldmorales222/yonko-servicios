import Link from 'next/link';

const SERVICIOS = [
  { label: 'Desarrollo Web Pro', href: '/servicios/desarrollo-web-pro' },
  { label: 'E-commerce', href: '/servicios/ecommerce-alta-conversion' },
  { label: 'IA & Data Science', href: '/servicios/sistemas-inteligentes-ia' },
  { label: 'Automatización', href: '/servicios/automatizacion-procesos' },
  { label: 'Estrategia UX/CX', href: '/servicios/estrategia-ux-cx' },
];

const NAV = [
  { label: 'Inicio', href: '/' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Proyectos', href: '/proyectos' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Contacto', href: '/contacto' },
];

const SOCIAL = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-white relative overflow-hidden">
      {/* Orb decorativo de fondo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* ── CTA BAND ─────────────────────────────────────────────────────── */}
      <div className="border-b border-slate-800/60 relative z-10">
        <div className="max-w-7xl mx-auto px-5 md:px-6 py-12 md:py-16">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-blue-500 mb-2">¿Listo para empezar?</p>
              <h2 className="text-2xl md:text-4xl font-black tracking-tighter uppercase leading-tight text-white">
                Construyamos algo<br className="hidden md:block" /> extraordinario.
              </h2>
            </div>
            <Link
              href="/contacto"
              className="group inline-flex items-center gap-3 bg-blue-600 text-white px-7 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-500 hover:scale-[1.03] active:scale-[0.98] transition-all shadow-xl shadow-blue-900/40 whitespace-nowrap shrink-0"
            >
              Iniciar proyecto
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* ── GRID PRINCIPAL ────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-5 md:px-6 pt-14 pb-10 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8 mb-14">

          {/* Branding */}
          <div className="col-span-2 md:col-span-4">
            <Link href="/" className="inline-block mb-6 group">
              <span className="text-3xl font-black tracking-tighter text-white group-hover:text-blue-400 transition-colors">
                YONKO<span className="text-blue-500">.</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              Laboratorio de ingeniería de software liderado por un{' '}
              <span className="text-slate-200 font-medium">Magíster en Informática.</span>{' '}
              Complejidad técnica traducida en resultados reales.
            </p>

            {/* Social */}
            <div className="flex gap-2">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl border border-slate-800 flex items-center justify-center text-slate-500 hover:border-blue-500 hover:text-blue-400 hover:bg-blue-600/10 transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-1" />

          {/* Navegación */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-blue-500 mb-5">Explorar</h4>
            <ul className="space-y-3">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group">
                    <span className="w-0 h-px bg-blue-500 group-hover:w-3 transition-all duration-300" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Servicios */}
          <div className="col-span-1 md:col-span-3">
            <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-blue-500 mb-5">Servicios</h4>
            <ul className="space-y-3">
              {SERVICIOS.map((s) => (
                <li key={s.href}>
                  <Link href={s.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group">
                    <span className="w-0 h-px bg-blue-500 group-hover:w-3 transition-all duration-300" />
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto rápido */}
          <div className="col-span-2 md:col-span-2">
            <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-blue-500 mb-5">Contacto</h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:contacto@yonko.cl"
                  className="group flex items-start gap-2.5 text-slate-400 hover:text-white transition-colors">
                  <span className="mt-0.5 shrink-0 text-slate-600 group-hover:text-blue-500 transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </span>
                  <span className="text-xs">contacto@yonko.cl</span>
                </a>
              </li>
              <li>
                <a href="https://wa.me/569XXXXXXXX" target="_blank" rel="noopener noreferrer"
                  className="group flex items-start gap-2.5 text-slate-400 hover:text-white transition-colors">
                  <span className="mt-0.5 shrink-0 text-slate-600 group-hover:text-emerald-500 transition-colors">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.524 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.952 7.952 0 01-4.072-1.117l-.292-.173-3.02.899.899-3.02-.173-.292A7.952 7.952 0 014 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z"/>
                    </svg>
                  </span>
                  <span className="text-xs">WhatsApp Business</span>
                </a>
              </li>
              <li>
                <a href="https://t.me/yonkodev" target="_blank" rel="noopener noreferrer"
                  className="group flex items-start gap-2.5 text-slate-400 hover:text-white transition-colors">
                  <span className="mt-0.5 shrink-0 text-slate-600 group-hover:text-sky-500 transition-colors">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8l-1.68 7.93c-.12.56-.45.7-.9.43l-2.5-1.84-1.2 1.16c-.13.13-.25.25-.51.25l.18-2.55 4.64-4.19c.2-.18-.04-.28-.31-.1l-5.73 3.61-2.47-.77c-.54-.17-.55-.54.11-.8l9.65-3.72c.45-.17.84.11.72.79z"/>
                    </svg>
                  </span>
                  <span className="text-xs">@yonkodev</span>
                </a>
              </li>

              {/* Disponibilidad */}
              <li className="pt-1">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Lun–Vie · 9–19h</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* ── BOTTOM BAR ─────────────────────────────────────────────────── */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600">
            © {currentYear} Yonko SpA. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-700">MSc. Informatics</span>
            <span className="w-1 h-1 rounded-full bg-slate-700" />
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-700">Engineering Standards</span>
            <span className="w-1 h-1 rounded-full bg-slate-700" />
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-blue-700">Chile</span>
          </div>
        </div>
      </div>
    </footer>
  );
}