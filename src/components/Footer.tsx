import Link from "next/link";

const SERVICIOS = [
  { label: "Desarrollo Web", href: "/servicios/desarrollo-web-pro" },
  { label: "E-commerce", href: "/servicios/ecommerce-alta-conversion" },
  { label: "Automatización", href: "/servicios/automatizacion-procesos" },
  { label: "Estrategia UX/CX", href: "/servicios/estrategia-ux-cx" },
  { label: "Ingeniería de Software", href: "/servicios/ingenieria-software" },
];

const NAV = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/servicios" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute left-1/2 top-0 h-56 w-[680px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[90px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-7 pt-9 md:px-6">
        <div className="mb-8 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-[1.2fr_.75fr_1fr_.9fr]">
          <div>
            <Link href="/" className="group mb-4 inline-block">
              <span className="text-2xl font-black tracking-tight text-white transition-colors group-hover:text-blue-400">
                YONKO<span className="text-blue-500">.</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-slate-400">
              Servicios informáticos para negocios que necesitan verse mejor, operar mejor y crecer con tecnología clara.
            </p>
          </div>

          <div>
            <p className="mb-3.5 font-mono text-[9px] uppercase tracking-[0.3em] text-blue-500">Explorar</p>
            <ul className="space-y-2.5">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="group flex items-center gap-1.5 text-sm text-slate-400 transition-colors duration-200 hover:text-white">
                    <span className="h-px w-0 bg-blue-500 transition-all duration-300 group-hover:w-3" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3.5 font-mono text-[9px] uppercase tracking-[0.3em] text-blue-500">Servicios</p>
            <ul className="space-y-2.5">
              {SERVICIOS.map((service) => (
                <li key={service.href}>
                  <Link href={service.href} className="group flex items-center gap-1.5 text-sm text-slate-400 transition-colors duration-200 hover:text-white">
                    <span className="h-px w-0 bg-blue-500 transition-all duration-300 group-hover:w-3" />
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3.5 font-mono text-[9px] uppercase tracking-[0.3em] text-blue-500">Contacto</p>
            <ul className="space-y-3">
              <li>
                <span className="block select-all text-xs text-slate-400">
                  yonkoservicios@gmail.com
                </span>
              </li>
              <li>
                <a
                  href="https://wa.me/56942882503"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-xl border border-slate-800 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-300 transition-colors hover:border-blue-500 hover:text-white"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-800/60 pt-5 sm:flex-row">
          <p className="text-xs text-slate-400">© {currentYear} Yonko SpA. Todos los derechos reservados.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-400">Servicios informáticos</span>
            <span className="h-1 w-1 rounded-full bg-slate-500" />
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-blue-400">Chile</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
