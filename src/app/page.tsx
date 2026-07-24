"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { createElement, useEffect, useRef, useState } from "react";
import LazyModelViewer from "@/components/LazyModelViewer";

interface StatProps {
  val: string;
  label: string;
  index: number;
}

const services = [
  {
    title: "Webs que venden",
    desc: "Landing pages, sitios corporativos y plataformas con foco en conversión, velocidad y mantenimiento real.",
  },
  {
    title: "Sistemas & Apps",
    desc: "Dashboards, paneles internos, apps móviles y software a medida para tu negocio.",
  },
  {
    title: "Posicionamiento SEO",
    desc: "Estrategia On-Page, SEO técnico y posicionamiento orgánico en Google para atraer clientes.",
  },
  {
    title: "IA & Automatización",
    desc: "Flujos de trabajo inteligentes, integraciones de APIs y asistentes para tu operación.",
  },
];

const yonkoLabPoints = [
  {
    id: "estrategia",
    n: "01",
    label: "Estrategia",
    title: "Antes de diseñar, entendemos el negocio",
    desc: "Objetivos, usuarios, oferta, fricción comercial y operación interna. La creatividad empieza con dirección.",
    pos: "left-[9%] top-[16%]",
    line: "right-[-82px] top-1/2 h-px w-[82px]",
    dot: "right-[-88px] top-1/2 -translate-y-1/2",
  },
  {
    id: "identidad",
    n: "02",
    label: "Identidad",
    title: "Identidad para cada proyecto",
    desc: "Diseñamos una presencia propia para cada marca: visual, tono y experiencia alineados al negocio, no una plantilla con colores cambiados.",
    pos: "right-[9%] top-[16%]",
    line: "left-[-82px] top-1/2 h-px w-[82px]",
    dot: "left-[-88px] top-1/2 -translate-y-1/2",
  },
  {
    id: "ejecucion",
    n: "03",
    label: "Ejecución",
    title: "Sitios rápidos y mantenibles",
    desc: "Componentes claros, contenido ordenado, rendimiento técnico y una base preparada para crecer sin rehacer todo.",
    pos: "left-[9%] bottom-[28%]",
    line: "right-[-92px] top-1/2 h-px w-[92px]",
    dot: "right-[-98px] top-1/2 -translate-y-1/2",
  },
  {
    id: "sistemas",
    n: "04",
    label: "Sistemas",
    title: "Automatización con propósito",
    desc: "Formularios, CRM, paneles, integraciones y flujos que reducen trabajo repetitivo donde realmente duele.",
    pos: "right-[9%] bottom-[28%]",
    line: "left-[-92px] top-1/2 h-px w-[92px]",
    dot: "left-[-98px] top-1/2 -translate-y-1/2",
  },
  {
    id: "soporte",
    n: "05",
    label: "Soporte",
    title: "Acompañamiento claro",
    desc: "Prioridades visibles, entrega explicada y mejoras iterativas sin tecnicismos innecesarios.",
    pos: "left-1/2 top-[78%] -translate-x-1/2",
    line: "left-1/2 bottom-full h-[58px] w-px -translate-x-1/2",
    dot: "left-1/2 bottom-[calc(100%+54px)] -translate-x-1/2",
  },
];

const processSteps = [
  {
    n: "01",
    title: "Aterrizamos la idea",
    problem: "Convertimos una idea dispersa en una oferta fácil de entender: qué vendes, para quién es y por qué vale la pena contactarte.",
    deliverable: "Mensaje principal, público objetivo y acción prioritaria.",
  },
  {
    n: "02",
    title: "Diseñamos la experiencia",
    problem: "Organizamos la navegación como una conversación: primero captamos atención, luego damos confianza y finalmente guiamos al contacto.",
    deliverable: "Estructura UX, secciones clave y dirección visual profesional.",
  },
  {
    n: "03",
    title: "Construimos con criterio",
    problem: "Desarrollamos una base rápida, responsive y fácil de mantener. Los efectos acompañan; no esconden problemas.",
    deliverable: "Página funcional, componentes reutilizables e integraciones.",
  },
  {
    n: "04",
    title: "Probamos antes de publicar",
    problem: "Revisamos cómo se siente usarla: lectura, velocidad, mobile, formularios y momentos donde un cliente podría abandonar.",
    deliverable: "Checklist de lanzamiento, ajustes UX y prioridades de mejora.",
  },
];

function YonkoModel() {
  return (
    <div className="relative isolate mx-auto aspect-[4/5] w-full max-w-[300px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950 shadow-xl shadow-blue-950/20 sm:max-w-[360px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(59,130,246,0.55),transparent_34%),linear-gradient(145deg,#020617,#0f172a_55%,#1d4ed8)]" />
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.25) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <LazyModelViewer
        src="/3d/Yonko.glb"
        poster="/imagenes/yonko3d.webp"
        alt="Modelo 3D representando servicios informáticos"
      />

      <div className="absolute left-5 top-5 z-10 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.28em] text-cyan-100/80 backdrop-blur">
        Equipo técnico
      </div>
      <div className="absolute bottom-4 left-4 right-4 z-10 rounded-2xl border border-white/10 bg-slate-950/65 p-3 text-white backdrop-blur-xl sm:bottom-5 sm:left-5 sm:right-5 sm:rounded-3xl sm:p-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-200">Marca con sistema</p>
        <p className="mt-1 text-xs text-slate-300 sm:text-sm">Identidad propia, ingeniería seria y una experiencia que se recuerda.</p>
        </div>
      </div>
  );
}

function useCountUp(target: string, inView: boolean) {
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const num = Number.parseFloat(target.replace(/[^0-9.]/g, ""));
    const suffix = target.replace(/[0-9.]/g, "");
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + num / 50, num);
      setDisplay(`${Number.isInteger(num) ? Math.floor(current) : current.toFixed(1)}${suffix}`);
      if (current >= num) clearInterval(timer);
    }, 28);

    return () => clearInterval(timer);
  }, [inView, target]);

  return display;
}

function AnimatedStat({ val, label, index }: StatProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const display = useCountUp(val, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm"
    >
      <span className="block text-2xl font-black tracking-tight text-slate-950 md:text-3xl">{inView ? display : "0"}</span>
      <span className="mt-2 block font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-blue-600">{label}</span>
    </motion.div>
  );
}

function InteractiveYonkoLab() {
  const [activePoint, setActivePoint] = useState(yonkoLabPoints[1]);

  return (
    <div className="mt-14 grid gap-5 xl:grid-cols-[minmax(760px,1fr)_400px] xl:items-start">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative min-h-[460px] overflow-hidden rounded-[1.75rem] border border-cyan-300/20 bg-slate-950 text-white shadow-xl shadow-blue-950/20 sm:min-h-[500px] lg:min-h-[540px]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(34,211,238,.32),transparent_24%),radial-gradient(circle_at_50%_70%,rgba(37,99,235,.35),transparent_34%),linear-gradient(180deg,#020617,#0f172a)]" />
        <div
          className="absolute inset-0 opacity-[0.11]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(125,211,252,.45) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,.45) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,.18),transparent_58%)]" />

        <div className="absolute left-1/2 top-[45%] h-40 w-40 -translate-x-1/2 rounded-full border border-cyan-300/50 bg-cyan-300/10 shadow-[0_0_60px_rgba(34,211,238,.35)] sm:h-44 sm:w-44 lg:top-[52%]" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute left-1/2 top-[45%] h-52 w-52 -translate-x-1/2 rounded-full border-t border-cyan-200/80 sm:h-56 sm:w-56 lg:top-[52%]"
        />

        <div className="absolute inset-x-0 bottom-[14%] mx-auto h-48 w-64 rounded-full bg-cyan-300/15 blur-3xl" />

        <div className="absolute left-1/2 top-[43%] z-10 h-[360px] w-[260px] -translate-x-1/2 -translate-y-1/2 sm:h-[460px] sm:w-[330px] lg:top-[50%] lg:h-[560px] lg:w-[390px] xl:h-[540px] xl:w-[380px]">
          <LazyModelViewer
            src="/3d/Yonko_trabajando.glb"
            poster=""
            alt="Modelo 3D representando un equipo técnico trabajando"
            rotationPerSecond="16deg"
            shadowIntensity="1"
            exposure="1"
          />
        </div>

        <div className="pointer-events-none absolute left-1/2 top-4 z-20 -translate-x-1/2 rounded-full border border-cyan-200/30 bg-cyan-300/10 px-3 py-1.5 font-mono text-[8px] font-black uppercase tracking-[0.22em] text-cyan-100 backdrop-blur sm:text-[10px] sm:tracking-[0.3em] lg:top-5 lg:px-4">
          Servicio activo / Equipo en marcha
        </div>

        {yonkoLabPoints.map((point) => {
          const isActive = activePoint.id === point.id;

          return (
            <motion.button
              key={point.id}
              type="button"
              onMouseEnter={() => setActivePoint(point)}
              onFocus={() => setActivePoint(point)}
              onClick={() => setActivePoint(point)}
              whileHover={{ scale: 1.03, y: -2 }}
              className={`absolute z-30 hidden w-[210px] rounded-2xl border p-3 text-left backdrop-blur-xl transition duration-300 lg:block xl:w-[225px] ${point.pos} ${
                isActive
                  ? "border-cyan-200/70 bg-cyan-300/15 shadow-[0_0_35px_rgba(34,211,238,.25)]"
                  : "border-cyan-300/20 bg-slate-900/60 hover:border-cyan-200/50 hover:bg-cyan-300/10"
              }`}
            >
              <span className={`absolute ${point.line} ${isActive ? "bg-cyan-200/80" : "bg-cyan-300/25"}`} />
              <span className={`absolute h-2.5 w-2.5 rounded-full ${point.dot} ${isActive ? "bg-cyan-100 shadow-[0_0_18px_rgba(34,211,238,.9)]" : "bg-cyan-300/60"}`} />
              <span className="font-mono text-[9px] font-black uppercase tracking-[0.24em] text-cyan-200">{point.n} / {point.label}</span>
              <span className="mt-1.5 block text-xs font-black uppercase leading-tight tracking-tight text-white xl:text-sm">{point.title}</span>
            </motion.button>
          );
        })}

        <div className="absolute bottom-6 left-6 right-6 z-30 lg:hidden">
          <div className="grid grid-cols-5 gap-2">
            {yonkoLabPoints.map((point) => (
              <button
                key={point.id}
                type="button"
                onClick={() => setActivePoint(point)}
                className={`rounded-2xl border py-3 font-mono text-xs font-black transition ${
                  activePoint.id === point.id ? "border-cyan-200 bg-cyan-300/20 text-white" : "border-cyan-300/20 bg-slate-900/70 text-cyan-200"
                }`}
              >
                {point.n}
              </button>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10" />
      </motion.div>

      <motion.aside
        initial={{ opacity: 0, x: 22, scale: 0.98 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-[1.75rem] border border-blue-100 bg-white p-4 text-left shadow-lg shadow-blue-100/50 sm:p-5 xl:sticky xl:top-28"
      >
        <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-100 blur-3xl" />
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
        <div className="relative z-10">
        <div className="mb-6 grid grid-cols-5 gap-1.5">
          {yonkoLabPoints.map((point) => (
            <button
              key={point.id}
              type="button"
              onClick={() => setActivePoint(point)}
              className={`rounded-2xl border px-1.5 py-2 text-center transition ${
                activePoint.id === point.id
                  ? "border-blue-200 bg-blue-50 text-blue-700 shadow-sm"
                  : "border-slate-200 bg-white/80 text-slate-500 hover:border-slate-300 hover:text-slate-950"
              }`}
            >
              <span className="block font-mono text-[10px] font-black leading-none">{point.n}</span>
              <span className="mt-1 hidden text-[8px] font-black uppercase tracking-wider sm:block">{point.label}</span>
            </button>
          ))}
        </div>

        <motion.div
          key={activePoint.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28 }}
        >
        <p className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">
          {activePoint.n} / {activePoint.label}
        </p>
        <h3 className="mt-4 text-lg font-black leading-tight tracking-tight text-slate-950 sm:text-xl md:text-2xl">
          {activePoint.title}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-slate-500 md:mt-5 md:text-base">{activePoint.desc}</p>

        <div className="mt-5 rounded-[1.5rem] border border-slate-100 bg-slate-950 p-4 text-white">
          <p className="font-mono text-[9px] font-black uppercase tracking-[0.28em] text-cyan-200">Lo que gana el cliente</p>
          <p className="mt-3 text-lg font-bold leading-snug">
            Una decisión más fácil: entiende qué haces, por qué confiar y cómo empezar.
          </p>
        </div>

        </motion.div>
        </div>
      </motion.aside>
    </div>
  );
}

export default function HomePage() {
  const heroRef = useRef(null);
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: "-80px" });
  return (
    <main className="bg-white text-slate-950">
      <section ref={heroRef} className="relative isolate overflow-hidden bg-slate-950 text-white lg:min-h-[760px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(37,99,235,.45),transparent_28%),radial-gradient(circle_at_80%_35%,rgba(14,165,233,.22),transparent_30%)]" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.28) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.28) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <motion.div className="relative z-10">
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 pb-20 pt-24 md:px-6 md:py-16 lg:grid-cols-[1.05fr_.95fr] lg:gap-10 lg:px-8 lg:py-20">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-400/10 px-4 py-2 backdrop-blur"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-cyan-100/80">
                  Yonko Servicios Informáticos
                </span>
              </motion.div>

              <h1
                className="max-w-3xl text-[clamp(2.05rem,4.8vw,3.8rem)] font-black leading-[0.94] tracking-tight"
              >
                Agencia de Desarrollo Web e
                <br />
                <span className="text-blue-400">Ingeniería de Software.</span>
              </h1>

              <p
                className="mt-7 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl"
              >
                Diseñamos presencia digital y sistemas informáticos para personas, pymes y empresas que necesitan verse confiables, operar mejor y crecer con tecnología bien implementada.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.34 }}
                className="mt-8 flex flex-wrap gap-3 sm:gap-4 lg:mt-10"
              >
                <Link href="/contacto" className="rounded-2xl bg-blue-600 px-8 py-4 text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-blue-950/30 transition hover:-translate-y-0.5 hover:bg-blue-500">
                  Cotizar proyecto
                </Link>
                <Link href="/servicios" className="rounded-2xl border border-white/15 bg-white/5 px-8 py-4 text-xs font-black uppercase tracking-widest text-white backdrop-blur transition hover:bg-white/10">
                  Ver servicios
                </Link>
              </motion.div>

              <div className="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4 lg:mt-10">
                {services.map((service) => (
                  <div key={service.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur">
                    <h2 className="text-sm font-black tracking-tight text-white">{service.title}</h2>
                    <p className="mt-2 text-xs leading-relaxed text-slate-400">{service.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.18 }} className="mt-2 lg:mt-0">
              <YonkoModel />
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="px-5 py-10 md:px-6 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { label: "Sitios y sistemas", val: "30+" },
              { label: "Disponibilidad objetivo", val: "99.9%" },
              { label: "Entrega iterativa", val: "2x" },
              { label: "Foco negocio", val: "100%" },
            ].map((s, i) => (
              <AnimatedStat key={s.label} val={s.val} label={s.label} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-slate-50 px-5 py-14 md:px-6 md:py-16">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Cómo se siente trabajar con nuestro equipo</p>
          <h2 className="mt-4 max-w-3xl text-[clamp(1.75rem,3.6vw,2.9rem)] font-black leading-tight tracking-tight text-slate-950">
            Creativo por fuera.
            <br />
            <span className="text-blue-600">Rigurosamente técnico por dentro.</span>
          </h2>
          <div className="mt-8 grid max-w-4xl gap-3 sm:grid-cols-3">
            {[
              ["Se entiende rápido", "El usuario capta tu oferta sin tener que adivinar."],
              ["Se siente distinto", "Diseño con carácter, pero con seriedad empresarial."],
              ["Lleva al contacto", "Cada interacción empuja hacia una acción clara."],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-sm font-black tracking-tight text-slate-950">{title}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">{desc}</p>
              </div>
            ))}
          </div>

          <InteractiveYonkoLab />
        </div>
      </section>

      <section className="overflow-hidden px-5 py-14 md:px-6 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-end gap-8 lg:grid-cols-[.9fr_1.1fr]">
            <div>
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Método de trabajo</p>
              <h2 className="mt-4 max-w-3xl text-[clamp(1.8rem,3.8vw,3rem)] font-black leading-tight tracking-tight text-slate-950">
                Un proceso
                <br />
                <span className="text-blue-600">sin humo.</span>
              </h2>
            </div>
            <div className="max-w-lg rounded-[1.5rem] border border-blue-100 bg-blue-50 p-5 lg:justify-self-end">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.28em] text-blue-600">Promesa del proceso</p>
              <p className="mt-3 text-lg font-semibold leading-relaxed text-slate-800">
                Menos adornos sueltos. Más claridad, confianza y caminos simples para que el cliente te contacte.
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-[420px_1fr]">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative min-h-[400px] overflow-hidden rounded-[1.75rem] bg-slate-950 p-5 text-white shadow-xl shadow-blue-950/20"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(59,130,246,.5),transparent_32%),linear-gradient(180deg,#020617,#0f172a)]" />
              <div className="absolute left-1/2 top-[48%] h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-3xl" />
              <Image
                src="/imagenes/yonkoohumo.webp"
                alt="Proceso claro de servicios informáticos"
                fill
                sizes="(min-width: 1024px) 420px, 100vw"
                className="object-contain object-center p-6 drop-shadow-[0_28px_45px_rgba(59,130,246,0.28)]"
              />
              <div className="absolute left-6 right-6 top-6 rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
                <p className="font-mono text-[10px] font-black uppercase tracking-[0.28em] text-cyan-100/80">Claridad antes que humo</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Si una sección no ayuda a vender, explicar o generar confianza, se simplifica.
                </p>
              </div>
              <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-2">
                {["Claro", "Vendible", "Medible"].map((tag) => (
                  <span key={tag} className="rounded-2xl border border-blue-200/20 bg-blue-300/10 px-3 py-3 text-center text-[10px] font-black uppercase tracking-widest text-cyan-100/80 backdrop-blur">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            <div className="relative">
              <div className="absolute left-6 top-8 hidden h-[calc(100%-4rem)] w-px bg-gradient-to-b from-blue-200 via-blue-500 to-blue-100 md:block" />
              <div className="space-y-4">
                {processSteps.map((step, i) => (
                  <motion.article
                    key={step.n}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: i * 0.08 }}
                    className="group relative rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/60 md:ml-12"
                  >
                    <div className="absolute -left-[4.5rem] top-7 hidden h-12 w-12 items-center justify-center rounded-2xl border border-blue-200 bg-white font-mono text-sm font-black text-blue-600 shadow-lg shadow-blue-100 md:flex">
                      {step.n}
                    </div>
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                      <div className="max-w-xl">
                        <div className="mb-4 inline-flex rounded-full bg-blue-50 px-3 py-1 font-mono text-[10px] font-black uppercase tracking-[0.24em] text-blue-600 md:hidden">
                          {step.n}
                        </div>
                    <h3 className="text-lg font-black leading-tight tracking-tight text-slate-950 md:text-xl">
                          {step.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-slate-500">{step.problem}</p>
                      </div>
                      <div className="rounded-2xl bg-slate-50 p-4 lg:w-64">
                        <p className="font-mono text-[9px] font-black uppercase tracking-[0.25em] text-slate-400">Entregable</p>
                        <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">{step.deliverable}</p>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={ctaRef} className="bg-slate-50 px-5 py-14 md:px-6 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          animate={ctaInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-3xl overflow-hidden rounded-[1.75rem] border border-cyan-300/20 bg-slate-950 p-6 text-center text-white shadow-xl shadow-blue-950/20 md:p-8"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,.45),transparent_45%)]" />
          <div className="relative z-10">
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-cyan-200">Siguiente paso</p>
            <h2 className="mt-4 text-xl font-black leading-tight tracking-tight md:text-3xl">
              Hagamos que tu sitio se sienta propio.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-slate-300">
              Servicios informáticos serios, claros y bien ejecutados. Un equipo técnico trabajando para que su negocio venda, opere y comunique mejor.
            </p>
            <Link href="/contacto" className="mt-9 inline-flex rounded-2xl bg-white px-9 py-4 text-xs font-black uppercase tracking-widest text-slate-950 transition hover:-translate-y-0.5">
              Agendar conversación
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
