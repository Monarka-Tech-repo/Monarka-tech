import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { RevealOnScroll } from "@/components/effects/reveal-on-scroll";
import { MagneticButton } from "@/components/effects/magnetic-button";

const navLinks = [
  { label: "Trabajo", href: "#work" },
  { label: "Capacidades", href: "#capabilities" },
  { label: "Nosotros", href: "#about" },
];

const capabilities = [
  ["01", "Productos digitales", "Concepto, estrategia y experiencias que se sienten naturales desde el primer toque."],
  ["02", "Apps y plataformas", "Aplicaciones móviles y plataformas web construidas para evolucionar, no para caducar."],
  ["03", "Automatización", "Sistemas inteligentes que eliminan fricción y convierten trabajo repetitivo en impulso."],
  ["04", "Tecnología y soporte", "Infraestructura, implementación y acompañamiento técnico para negocios en movimiento."],
];

function ArrowLink({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  return (
    <MagneticButton
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className={`group inline-flex items-center gap-4 rounded-full border px-6 py-3 text-sm font-semibold transition-colors ${
        light
          ? "border-white/25 text-white hover:bg-white hover:text-black"
          : "border-black/20 text-black hover:bg-black hover:text-white"
      }`}
    >
      {children}
      <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:rotate-45" />
      {external && <span className="sr-only">(abre en una nueva ventana)</span>}
    </MagneticButton>
  );
}

export function MonarkaHomeSections() {
  return (
    <main className="monarka-home bg-[#050505] text-[#f4f4ef]">
      <nav aria-label="Navegación principal" className="fixed inset-x-0 top-0 z-50 mix-blend-difference">
        <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-5 md:px-10">
          <a href="#top" aria-label="Monarka TECH, inicio" className="relative block h-8 w-36">
            <Image src="/assets/monarka-logo-dark.png" alt="" fill priority sizes="144px" className="object-contain object-left" />
          </a>
          <div className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.16em] md:flex">
            {navLinks.map((link) => <a key={link.href} href={link.href} className="transition-opacity hover:opacity-50">{link.label}</a>)}
          </div>
          <a href="mailto:hello@monarka.tech" className="rounded-full border border-white/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors hover:bg-white hover:text-black">
            Hablemos
          </a>
        </div>
      </nav>

      <section id="top" aria-hidden className="h-20" />

      <section aria-label="Manifiesto" className="overflow-hidden border-y border-white/10 py-7">
        <div className="monarka-rail flex w-max items-center whitespace-nowrap text-[clamp(2.5rem,6vw,6rem)] font-medium uppercase leading-none tracking-[-0.05em] text-white/90">
          <span>Sueña grande&nbsp; <i className="font-normal text-[#3d8bff]">✦</i>&nbsp; Transforma completo&nbsp; <i className="font-normal text-[#3d8bff]">✦</i>&nbsp; Vuela más lejos&nbsp; <i className="font-normal text-[#3d8bff]">✦</i>&nbsp;</span>
          <span aria-hidden>Sueña grande&nbsp; <i className="font-normal text-[#3d8bff]">✦</i>&nbsp; Transforma completo&nbsp; <i className="font-normal text-[#3d8bff]">✦</i>&nbsp; Vuela más lejos&nbsp; <i className="font-normal text-[#3d8bff]">✦</i>&nbsp;</span>
        </div>
      </section>

      <section id="work" className="bg-[#efeee8] px-5 py-24 text-[#090909] md:px-10 md:py-36">
        <div className="mx-auto max-w-[1600px]">
          <RevealOnScroll className="mb-12 flex items-end justify-between border-b border-black/20 pb-5 md:mb-20">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#176cff]">Trabajo seleccionado · 01</p>
              <h2 className="text-[clamp(3.5rem,9vw,9rem)] font-medium leading-[0.82] tracking-[-0.075em]">CATA</h2>
            </div>
            <p className="hidden max-w-xs text-right text-sm leading-6 text-black/55 md:block">Producto propio<br />Food discovery · Social journal</p>
          </RevealOnScroll>

          <div className="grid gap-5 lg:grid-cols-[1.65fr_.7fr]">
            <RevealOnScroll className="group relative min-h-[62vh] overflow-hidden rounded-[1.5rem] bg-[#b8442a] md:min-h-[760px]">
              <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,226,173,.5),transparent_32%)]" />
              <Image
                src="/assets/cata/CATA SCREENS/WhatsApp Image 2026-07-20 at 11.53.56 PM.jpeg"
                alt="Pantalla de la aplicación CATA mostrando experiencias gastronómicas"
                fill sizes="(min-width: 1024px) 68vw, 100vw"
                className="object-contain object-center p-8 drop-shadow-2xl transition-transform duration-700 group-hover:scale-[1.035] md:p-16"
              />
              <span className="absolute left-6 top-6 rounded-full bg-[#f7f0e7] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em]">En desarrollo</span>
            </RevealOnScroll>
            <div className="flex min-h-[440px] flex-col justify-between rounded-[1.5rem] bg-[#171717] p-7 text-white md:p-10">
              <RevealOnScroll>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ef9f27]">Producto insignia</p>
                <h3 className="mt-8 text-4xl font-medium leading-[0.95] tracking-[-0.05em] md:text-6xl">Tu mundo de sabores, lugares y memorias.</h3>
              </RevealOnScroll>
              <div>
                <p className="mb-8 max-w-md text-base leading-7 text-white/55">CATA convierte cada comida en una historia. Descubre lugares, registra platillos y comparte experiencias que vale la pena recordar.</p>
                <ArrowLink href="https://cata.life" light>Descubrir CATA</ArrowLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="capabilities" className="px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-[1600px]">
          <RevealOnScroll className="grid gap-8 pb-20 md:grid-cols-2">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3d8bff]">Lo que hacemos</p>
            <h2 className="text-[clamp(2.8rem,5vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.055em]">De una posibilidad<br />a un producto real.</h2>
          </RevealOnScroll>
          <div className="border-t border-white/20">
            {capabilities.map(([num, title, description]) => (
              <RevealOnScroll key={num}>
                <div className="group grid gap-4 border-b border-white/20 py-8 transition-colors hover:text-[#72aaff] md:grid-cols-[5rem_1fr_1fr] md:items-center md:py-11">
                  <span className="text-xs text-white/35">{num}</span>
                  <h3 className="text-3xl font-medium tracking-[-0.04em] md:text-5xl">{title}</h3>
                  <p className="max-w-md text-sm leading-6 text-white/50 transition-colors group-hover:text-white/70 md:justify-self-end md:text-base">{description}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="bg-[#3d8bff] px-5 py-24 text-black md:px-10 md:py-36">
        <div className="mx-auto grid max-w-[1600px] gap-16 lg:grid-cols-[1.15fr_.85fr]">
          <RevealOnScroll>
            <p className="mb-8 text-xs font-bold uppercase tracking-[0.2em]">Monarka TECH · El Paso, Texas</p>
            <h2 className="text-[clamp(3.2rem,7vw,7.5rem)] font-medium leading-[0.86] tracking-[-0.07em]">Construimos para la vida real.</h2>
          </RevealOnScroll>
          <RevealOnScroll className="flex flex-col justify-end">
            <p className="mb-10 max-w-xl text-xl leading-8 md:text-2xl md:leading-9">Somos una compañía de tecnología enfocada en convertir ideas ambiciosas en experiencias digitales intuitivas, útiles y humanas.</p>
            <p className="mb-10 max-w-lg text-base leading-7 text-black/65">Combinamos pensamiento de producto, diseño y desarrollo para crear tecnología con valor práctico—desde aplicaciones propias hasta soluciones para negocios en crecimiento.</p>
            <ArrowLink href="mailto:hello@monarka.tech">Conoce a Monarka</ArrowLink>
          </RevealOnScroll>
        </div>
      </section>

      <footer id="contact" className="relative overflow-hidden px-5 pb-8 pt-28 md:px-10 md:pt-44">
        <div aria-hidden className="absolute bottom-[-30rem] left-1/2 size-[60rem] -translate-x-1/2 rounded-full bg-[#176cff]/20 blur-[140px]" />
        <div className="relative mx-auto max-w-[1600px]">
          <RevealOnScroll>
            <p className="mb-8 text-xs font-bold uppercase tracking-[0.2em] text-[#3d8bff]">¿Tienes una idea?</p>
            <a href="mailto:hello@monarka.tech" className="group block border-b border-white/20 pb-12">
              <span className="flex items-end justify-between gap-6 text-[clamp(3.2rem,9.5vw,10rem)] font-medium leading-[0.82] tracking-[-0.075em]">
                Hagámosla real.
                <ArrowUpRight aria-hidden className="mb-2 size-12 shrink-0 transition-transform group-hover:rotate-45 md:mb-5 md:size-24" />
              </span>
            </a>
          </RevealOnScroll>
          <div className="mt-8 flex flex-col gap-4 text-xs uppercase tracking-[0.14em] text-white/45 md:flex-row md:items-center md:justify-between">
            <p>© 2026 Monarka TECH LLC</p>
            <p>Sueña grande · Transforma completo · Vuela más lejos</p>
            <a href="mailto:hello@monarka.tech" className="text-white hover:text-[#3d8bff]">hello@monarka.tech</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
