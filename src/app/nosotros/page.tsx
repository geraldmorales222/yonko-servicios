"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { createElement, useRef, useState } from "react";

const workModes = [
  {
    id: "claridad",
    n: "01",
    label: "Claridad",
    title: "Ordenamos la idea antes de construir",
    desc: "Traducimos lo que quiere lograr el negocio en un mensaje claro, una estructura simple y un camino fácil para el cliente.",
    result: "Oferta clara + camino de contacto",
  },
  {
    id: "experiencia",
    n: "02",
    label: "Confianza",
    title: "Diseñamos para que se entienda y se vea serio",
    desc: "Cuidamos textos, visuales, navegación e interacción para que la persona entienda rápido qué ofrece la empresa y por qué confiar.",
    result: "Sitio claro, atractivo y profesional",
  },
  {
    id: "construccion",
    n: "03",
    label: "Construcción",
    title: "Lo convertimos en una solución funcional",
    desc: "Desarrollamos sitios, sistemas, tiendas, automatizaciones o apps con buena velocidad, seguridad y conexión con las herramientas reales del negocio.",
    result: "Solución lista para operar",
  },
  {
    id: "mejora",
    n: "04",
    label: "Acompañamiento",
    title: "Seguimos mejorando después del lanzamiento",
    desc: "Revisamos rendimiento, formularios, experiencia mobile, seguridad y oportunidades para que la solución no quede abandonada.",
    result: "Soporte, mejora y próximos pasos",
  },
];

const principles = [
  ["Seriedad sin frialdad", "Una empresa tecnológica puede verse confiable sin parecer una plantilla bancaria."],
  ["Diseño con intención", "Si algo se mueve, debe orientar. Si algo brilla, debe ayudar a entender."],
  ["Equipo multidisciplinario", "Unimos tecnología, comunicación, diseño e implementación para resolver el proyecto completo, no solo una parte."],
];

function YonkoAboutModel() {
  return (
    <div className="relative aspect-square overflow-hidden rounded-[1.75rem] border border-blue-200 bg-slate-950 shadow-xl shadow-blue-950/20">
<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(59,130,246,.45),transparent_34%),linear-gradient(180deg,#020617,#0f172a)]" />
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(125,211,252,.55) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,.55) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />
      <div className="absolute left-1/2 top-[46%] h-48 w-48 -translate-x-1/2 rounded-full border border-cyan-300/40 bg-cyan-300/10 shadow-[0_0_70px_rgba(34,211,238,.28)]" />

      <div className="absolute inset-x-0 top-10 bottom-32 z-[2] sm:top-8">
        {createElement("model-viewer", {
          src: "/3d/yonko_nosotros.glb",
          alt: "Modelo 3D representando al equipo de servicios informáticos",
          "camera-controls": true,
          "auto-rotate": true,
          "rotation-per-second": "16deg",
          "interaction-prompt": "none",
          reveal: 'auto',
          loading: 'lazy',
          "shadow-intensity": "0.9",
          exposure: "1",
          style: {
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            filter: "drop-shadow(0 24px 34px rgba(34,211,238,.28))",
          },
        })}
      </div>

      <div className="pointer-events-none absolute left-1/2 top-4 z-20 -translate-x-1/2 rounded-full border border-cyan-200/30 bg-slate-950/55 px-4 py-2 text-center shadow-lg shadow-blue-950/20 backdrop-blur">
        <p className="whitespace-nowrap font-mono text-[8px] font-black uppercase tracking-[0.24em] text-cyan-100 sm:text-[9px] sm:tracking-[0.28em]">Equipo / Servicios informáticos</p>
      </div>

      <div className="absolute bottom-6 left-6 right-6 z-10 rounded-2xl border border-white/10 bg-white/95 p-5 shadow-lg backdrop-blur-xl md:p-6">
        <p className="mb-1.5 text-[8px] font-black uppercase tracking-[0.35em] text-blue-600">Filosofía</p>
        <p className="text-sm font-medium italic leading-snug text-slate-700 md:text-base">
          “La complejidad se gestiona en el backend, la simplicidad se entrega al usuario.”
        </p>
      </div>
    </div>
  );
}

function MethodCore3D({ activeId, onSelect }: {
  activeId: string;
  onSelect: (mode: typeof workModes[number]) => void;
}) {
  const positions = [
    "left-1/2 top-24 -translate-x-1/2",
    "right-8 top-1/2 -translate-y-1/2",
    "left-1/2 bottom-8 -translate-x-1/2",
    "left-8 top-1/2 -translate-y-1/2",
  ];
  const lines = [
    "left-1/2 top-[160px] h-16 w-px -translate-x-1/2",
    "right-[150px] top-1/2 h-px w-28 -translate-y-1/2",
    "left-1/2 bottom-[94px] h-20 w-px -translate-x-1/2",
    "left-[150px] top-1/2 h-px w-28 -translate-y-1/2",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative min-h-[460px] overflow-hidden rounded-[1.75rem] border border-cyan-300/20 bg-slate-950 text-white shadow-xl shadow-blue-950/20 sm:min-h-[500px] lg:min-h-[540px]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(34,211,238,.34),transparent_33%),linear-gradient(180deg,#020617,#0f172a)]" />
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(125,211,252,.55) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,.55) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />

      <div className="absolute left-1/2 top-[44%] h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/45 bg-cyan-300/10 shadow-[0_0_90px_rgba(34,211,238,.32)] sm:h-52 sm:w-52 lg:top-1/2" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute left-1/2 top-[44%] h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full border-t border-cyan-200/80 sm:h-72 sm:w-72 lg:top-1/2"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="absolute left-1/2 top-[44%] h-[21rem] w-[21rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-300/20 sm:h-[25rem] sm:w-[25rem] lg:top-1/2 lg:h-[28rem] lg:w-[28rem]"
      />

      <div className="absolute left-1/2 top-[44%] z-[2] h-[310px] w-[310px] -translate-x-1/2 -translate-y-1/2 sm:h-[380px] sm:w-[380px] lg:top-1/2 lg:h-[430px] lg:w-[430px]">
        {createElement("model-viewer", {
          src: "/3d/yonko_metodo.glb",
          alt: "Modelo 3D representando nuestro método de trabajo",
          "camera-controls": true,
          "auto-rotate": true,
          "rotation-per-second": "18deg",
          "interaction-prompt": "none",
          reveal: 'auto',
          loading: 'lazy',
          "shadow-intensity": "0.9",
          exposure: "1",
          style: {
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            filter: "drop-shadow(0 24px 34px rgba(34,211,238,.35))",
          },
        })}
      </div>

      <div className="pointer-events-none absolute left-1/2 top-5 z-20 -translate-x-1/2 rounded-full border border-cyan-200/30 bg-cyan-300/10 px-3 py-2 backdrop-blur sm:top-6 sm:px-4">
        <p className="font-mono text-[8px] font-black uppercase tracking-[0.24em] text-cyan-100 sm:text-[10px] sm:tracking-[0.3em]">Núcleo del método</p>
      </div>

      <div className="absolute inset-x-4 bottom-5 z-30 grid grid-cols-2 gap-2 lg:hidden">
        {workModes.map((mode) => {
          const isActive = activeId === mode.id;

          return (
            <button
              key={mode.id}
              type="button"
              onClick={() => onSelect(mode)}
              className={`rounded-2xl border px-3 py-3 text-left backdrop-blur-xl transition ${
                isActive
                  ? "border-cyan-200 bg-cyan-300/20 text-white shadow-[0_0_24px_rgba(34,211,238,.24)]"
                  : "border-cyan-300/20 bg-slate-900/70 text-cyan-100"
              }`}
            >
              <span className="font-mono text-[10px] font-black text-cyan-300">{mode.n}</span>
              <span className="mt-1 block text-xs font-black uppercase tracking-widest">{mode.label}</span>
            </button>
          );
        })}
      </div>

      {workModes.map((mode, index) => {
        const isActive = activeId === mode.id;

        return (
          <div key={mode.id}>
            <span className={`pointer-events-none absolute z-10 hidden lg:block ${lines[index]} ${isActive ? "bg-cyan-200/80" : "bg-cyan-300/20"}`} />
            <button
              type="button"
              onMouseEnter={() => onSelect(mode)}
              onFocus={() => onSelect(mode)}
              onClick={() => onSelect(mode)}
              className={`absolute z-30 hidden w-[180px] flex-col items-center justify-center rounded-3xl border px-5 py-4 text-center backdrop-blur-xl transition duration-300 lg:flex ${positions[index]} ${
                isActive
                  ? "border-cyan-200 bg-cyan-300/20 text-white shadow-[0_0_34px_rgba(34,211,238,.34)]"
                  : "border-cyan-300/20 bg-slate-900/70 text-cyan-100 hover:border-cyan-200/60 hover:bg-cyan-300/10"
              }`}
            >
              <span className={`font-mono text-xs font-black ${isActive ? "text-cyan-100" : "text-cyan-300"}`}>{mode.n}</span>
              <span className="mt-1 text-sm font-black uppercase tracking-widest">{mode.label}</span>
            </button>
          </div>
        );
      })}

      <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/10" />
    </motion.div>
  );
}

function MethodDetailPanel({ active }: { active: typeof workModes[number] }) {
  return (
    <motion.aside
      key={active.id}
      initial={{ opacity: 0, x: 22, scale: 0.98 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-[1.75rem] border border-blue-100 bg-white p-4 shadow-lg shadow-blue-100/50 sm:p-5 md:p-6 lg:sticky lg:top-28"
    >
      <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-100 blur-3xl" />
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

      <div className="relative z-10">
        <p className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">
          {active.n} / {active.label}
        </p>
        <h3 className="mt-4 text-lg font-black leading-tight tracking-tight text-slate-950 sm:text-xl md:mt-5 md:text-2xl">
          {active.title}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-slate-500 md:mt-5 md:text-base">
          {active.desc}
        </p>

        <div className="mt-5 rounded-[1.5rem] border border-slate-100 bg-slate-950 p-4 text-white shadow-lg md:mt-6">
          <p className="font-mono text-[9px] font-black uppercase tracking-[0.28em] text-cyan-200">Resultado visible</p>
          <p className="mt-3 text-lg font-bold leading-snug">{active.result}</p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2 sm:gap-3 md:mt-6">
          {["Decisión clara", "Menos fricción", "Funciona bien", "Mejora continua"].map((item) => (
            <div key={item} className="rounded-2xl border border-slate-100 bg-slate-50 px-3 py-3 sm:px-4">
              <p className="text-[11px] font-bold leading-tight text-slate-600">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.aside>
  );
}

function WorkConsole() {
  const [active, setActive] = useState(workModes[0]);

  return (
    <section className="overflow-hidden bg-slate-50 px-4 py-12 sm:px-5 md:px-6 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_.75fr] lg:items-end">
          <div>
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Cómo trabajamos</p>
            <h2 className="mt-4 max-w-3xl text-[clamp(1.7rem,4vw,2.7rem)] font-black leading-tight tracking-tight text-slate-950">
              Método claro, experiencia usable y tecnología con propósito.
            </h2>
          </div>
          <div className="rounded-[1.5rem] border border-blue-100 bg-white p-4 shadow-sm md:p-5">
            <p className="text-sm leading-relaxed text-slate-500">
              Evitamos páginas eternas que nadie lee. La marca debe contar rápido quién eres y dejar confianza suficiente para iniciar una conversación.
            </p>
          </div>
        </div>

        <div className="mt-9 grid gap-4 sm:gap-6 md:mt-12 lg:grid-cols-[1fr_420px] lg:items-start">
          <MethodCore3D activeId={active.id} onSelect={setActive} />
          <MethodDetailPanel active={active} />
        </div>
      </div>
    </section>
  );
}

function ChambaStudio() {
  return (
    <section className="px-5 py-14 md:px-6 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-5 lg:grid-cols-[1.25fr_.75fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="relative min-h-[420px] overflow-hidden rounded-[1.75rem] bg-slate-950 shadow-xl shadow-blue-950/20"
          >
            <Image
              src="/imagenes/yonko.chamba.webp"
              alt="Equipo trabajando en diseño de interfaz y software"
              fill
              sizes="(min-width: 1024px) 65vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/25 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 max-w-lg rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5 text-white backdrop-blur-xl">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-cyan-200">Mesa de trabajo</p>
              <h2 className="mt-3 text-xl font-black leading-tight tracking-tight md:text-2xl">
                La interfaz se piensa antes de decorarla.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Diseñamos pantallas que explican, guían y venden. La estética importa, pero el recorrido del cliente manda.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="relative flex items-center overflow-hidden rounded-[1.75rem] border border-blue-100 bg-blue-50 p-4 shadow-sm"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_16%,rgba(37,99,235,.18),transparent_38%)]" />
            <div className="relative w-full rounded-[1.5rem] bg-white p-5 shadow-sm">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.28em] text-blue-600">Qué cuidamos</p>
              <div className="mt-5 space-y-3">
                {[
                  "Jerarquía visual: el cliente sabe dónde mirar.",
                  "Mensajes cortos: menos ruido, más decisión.",
                  "Acciones claras: contacto, cotización o exploración.",
                ].map((item) => (
                  <div key={item} className="flex gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                    <p className="text-sm leading-relaxed text-slate-600">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function NosotrosPage() {
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: "-60px" });

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-slate-900">
      <section className="relative overflow-hidden px-5 pb-16 pt-24 md:px-6 md:pb-24 md:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(37,99,235,.18),transparent_30%),linear-gradient(160deg,#f0f7ff,#ffffff_58%)]" />
        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage: "linear-gradient(#2563eb 1px,transparent 1px),linear-gradient(90deg,#2563eb 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[.95fr_1.05fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3.5 py-1.5 shadow-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-blue-700">Quién está detrás</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08 }}
              className="max-w-3xl text-[clamp(1.95rem,4.2vw,3.2rem)] font-black leading-tight tracking-tight text-slate-950"
            >
              Tecnología seria, comunicación clara y diseño que se recuerda.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="mt-7 max-w-2xl text-lg leading-relaxed text-slate-500"
            >
              Somos un equipo multidisciplinario que combina tecnología, comunicación, diseño y soporte para construir sitios, sistemas y soluciones digitales que se entienden rápido, se ven profesionales y funcionan bien.
            </motion.p>

            <div className="mt-9 grid max-w-2xl grid-cols-3 gap-3">
              {[
                ["Tech", "Soluciones funcionales"],
                ["UX", "Claridad para vender"],
                ["Visual", "Identidad memorable"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                  <span className="block text-xl font-black tracking-tight text-slate-950">{value}</span>
                  <span className="mt-1 block font-mono text-[9px] font-bold uppercase tracking-widest text-blue-600">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.75, delay: 0.12 }}>
            <YonkoAboutModel />
          </motion.div>
        </div>
      </section>

      <WorkConsole />

      <ChambaStudio />

      <section className="bg-slate-50 px-5 py-14 md:px-6 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Principios</p>
            <h2 className="mt-4 max-w-3xl text-[clamp(1.7rem,3.2vw,2.5rem)] font-black leading-tight tracking-tight text-slate-950">
              Lo que el cliente debería sentir al entrar.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {principles.map(([title, desc], index) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100"
              >
                <span className="font-mono text-xs font-black text-blue-600">0{index + 1}</span>
                <h3 className="mt-5 text-xl font-black leading-tight tracking-tight text-slate-950">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">{desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section ref={ctaRef} className="bg-slate-50 px-5 py-14 md:px-6 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={ctaInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-3xl overflow-hidden rounded-[1.75rem] border border-cyan-300/20 bg-slate-950 p-6 text-center text-white shadow-xl shadow-blue-950/20 md:p-8"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,.45),transparent_45%)]" />
          <div className="relative z-10">
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-cyan-200">Siguiente paso</p>
            <h2 className="mt-4 text-xl font-black leading-tight tracking-tight md:text-3xl">
              Si tu sitio se ve igual que todos, compite igual que todos.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-slate-300">
              Hagamos que tu presencia digital sea clara, confiable y propia.
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
