import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  ArrowRight,
  Play,
  Tv,
  Globe,
  Landmark,
  MapPin,
  Megaphone,
  Newspaper,
  Trophy,
  Users,
  Earth,
  Building2,
} from "lucide-react";

import heroImage from "@/assets/juarez-skyline.jpg";
import logoUrl from "@/assets/metroplex-logo.png";
import { FacebookIcon, WhatsAppIcon, YouTubeIcon } from "@/components/brand-icons";
import { Button } from "@/components/ui/button";
import {
  FACEBOOK_URL,
  WEBSITE_URL,
  WHATSAPP_DISPLAY,
  WHATSAPP_MESSAGES,
  YOUTUBE_URL,
  whatsappLink,
} from "@/lib/contact";
import { latestTvVideoQuery } from "@/lib/metroplex-tv.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Metroplex Noticias — Ciudad Juárez | Síguenos y mantente informado" },
      {
        name: "description",
        content:
          "Noticias locales, nacionales e internacionales desde el corazón de Ciudad Juárez. Síguenos en Facebook y anúnciate con Metroplex por WhatsApp.",
      },
      { property: "og:title", content: "Metroplex Noticias — ¡Síguenos y mantente informado!" },
      {
        property: "og:description",
        content:
          "Información local, nacional e internacional con visión ciudadana. Contáctanos por WhatsApp para anunciarte.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(latestTvVideoQuery),
  component: Index,
});

const SECTIONS = [
  { name: "Locales", desc: "Lo que pasa en Juárez: colonias, servicios, seguridad y comunidad.", icon: MapPin },
  { name: "Nacionales", desc: "Los temas que mueven a México, explicados con contexto.", icon: Landmark },
  { name: "Internacionales", desc: "El mundo visto desde la frontera.", icon: Earth },
  { name: "Política", desc: "Decisiones públicas, presupuestos y rumbo electoral.", icon: Building2 },
  { name: "Deportes", desc: "Resultados, análisis y la pasión deportiva de la región.", icon: Trophy },
];

const TICKER = [
  "Locales",
  "Nacionales",
  "Internacionales",
  "Política",
  "Deportes",
  "Metroplex TV",
  "Clasificados",
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Ticker />
      <MetroplexTv />
      <Coverage />
      <Advertise />
      <About />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b-4 border-primary bg-card/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <a href="#inicio" className="flex items-center gap-3">
          <img src={logoUrl} alt="Metroplex Noticias" width={44} height={47} className="h-11 w-auto" />
          <span className="font-display text-2xl font-extrabold leading-none text-ink sm:text-[1.7rem]">
            Metroplex <span className="text-primary">Noticias</span>
          </span>
        </a>
        <nav className="hidden items-center gap-7 font-display text-sm font-bold uppercase tracking-wider text-foreground/80 md:flex">
          <a href="#metroplex-tv" className="transition-colors hover:text-primary">Metroplex TV</a>
          <a href="#cobertura" className="transition-colors hover:text-primary">Cobertura</a>
          <a href="#anunciate" className="transition-colors hover:text-primary">Anúnciate</a>
          <a href="#contacto" className="transition-colors hover:text-primary">Contacto</a>
        </nav>
        <Button asChild variant="whatsapp" size="sm" className="h-10 px-4 font-semibold">
          <a href={whatsappLink(WHATSAPP_MESSAGES.general)} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </Button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="relative isolate overflow-hidden bg-ink text-ink-foreground">
      <img
        src={heroImage}
        alt="Ciudad Juárez al atardecer"
        width={1920}
        height={1088}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-hero-overlay" />
      <div className="slash absolute -left-24 top-0 -z-10 hidden h-full w-56 bg-primary/80 lg:block" />
      <div className="slash absolute -right-16 bottom-0 -z-10 hidden h-2/3 w-40 bg-primary/70 lg:block" />

      <div className="mx-auto max-w-6xl px-5 pb-24 pt-20 sm:pt-28 lg:pb-32">
        <div className="inline-flex items-center gap-2 rounded-sm bg-primary px-3 py-1.5 font-display text-sm font-bold uppercase tracking-[0.2em]">
          <span className="animate-live size-2 rounded-full bg-primary-foreground" />
          Desde Ciudad Juárez
        </div>

        <h1 className="mt-6 max-w-4xl font-display text-6xl font-black uppercase leading-[0.9] sm:text-7xl lg:text-[7.5rem]">
          ¡Síguenos y <br />
          <span className="text-highlight">mantente</span> informado!
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-ink-foreground/85 sm:text-xl">
          Información local, nacional e internacional con visión ciudadana. Te traemos las
          noticias más actuales y relevantes, precisas y al momento.
        </p>

        <div className="mt-10 flex flex-col flex-wrap gap-3 sm:flex-row">
          <Button asChild variant="facebook" size="xl">
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">
              <FacebookIcon />
              Síguenos en Facebook
            </a>
          </Button>
          <Button asChild variant="youtube" size="xl">
            <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">
              <YouTubeIcon />
              Suscríbete en YouTube
            </a>
          </Button>
          <Button asChild variant="whatsapp" size="xl">
            <a href={whatsappLink(WHATSAPP_MESSAGES.general)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              Escríbenos por WhatsApp
            </a>
          </Button>
        </div>

        <dl className="mt-14 grid max-w-2xl grid-cols-3 gap-6 border-t border-ink-foreground/20 pt-8">
          <Stat value="1,4 mil" label="Seguidores en Facebook" />
          <Stat value="5" label="Secciones informativas" />
          <Stat value="Juárez" label="Chihuahua, México" />
        </dl>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="sr-only">{label}</dt>
      <dd className="font-display text-4xl font-extrabold leading-none sm:text-5xl">{value}</dd>
      <dd className="mt-2 text-sm text-ink-foreground/70">{label}</dd>
    </div>
  );
}

function Ticker() {
  const items = [...TICKER, ...TICKER];
  return (
    <div className="flex overflow-hidden bg-primary text-primary-foreground">
      <div className="z-10 flex shrink-0 items-center bg-ink px-5 font-display text-sm font-extrabold uppercase tracking-[0.2em] text-highlight">
        Última hora
      </div>
      <div className="relative flex-1 overflow-hidden py-3">
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap font-display text-lg font-bold uppercase tracking-wide">
          {items.map((t, i) => (
            <span key={i} className="flex items-center gap-10">
              {t}
              <span className="size-1.5 rotate-45 bg-primary-foreground/70" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function MetroplexTv() {
  const { data: video } = useSuspenseQuery(latestTvVideoQuery);
  const [playing, setPlaying] = useState(false);
  if (!video) return null;

  const frame = video.isShort
    ? "mx-auto aspect-[9/16] w-full max-w-[340px] lg:w-[340px]"
    : "aspect-video w-full";

  return (
    <section id="metroplex-tv" className="border-b border-border bg-secondary">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 lg:grid-cols-[1fr_auto]">
        <div className={video.isShort ? "" : "lg:order-2 lg:max-w-sm"}>
          <span className="kicker">Metroplex TV</span>
          <h2 className="mt-4 font-display text-5xl font-extrabold uppercase leading-[0.95] text-ink sm:text-6xl">
            Lo último <span className="text-primary">en video</span>
          </h2>
          <div className="mt-8 border-l-4 border-primary pl-5">
            {video.date && (
              <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
                {video.date}
              </p>
            )}
            <h3 className="mt-2 font-display text-3xl font-bold leading-tight text-ink">{video.title}</h3>
            {video.description && (
              <p className="mt-3 max-w-lg text-muted-foreground">{video.description}</p>
            )}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="youtube" size="lg">
              <a href={video.url} target="_blank" rel="noopener noreferrer">
                <YouTubeIcon />
                Ver en YouTube
              </a>
            </Button>
            <Button asChild variant="ink" size="lg">
              <a href={WEBSITE_URL} target="_blank" rel="noopener noreferrer">
                <Tv />
                Más videos en la web
              </a>
            </Button>
          </div>
        </div>

        <div className={`${frame} relative overflow-hidden rounded-lg bg-ink shadow-card ${video.isShort ? "" : "lg:w-[560px]"}`}>
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Reproducir: ${video.title}`}
              className="group absolute inset-0"
            >
              <img
                src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-hero-overlay opacity-60" />
              <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-sm bg-primary px-2.5 py-1 font-display text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground">
                <span className="animate-live size-1.5 rounded-full bg-primary-foreground" />
                Nuevo
              </span>
              <span className="absolute left-1/2 top-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-youtube text-youtube-foreground shadow-card transition-transform group-hover:scale-110">
                <Play className="ml-1 size-9 fill-current" />
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function Coverage() {
  return (
    <section id="cobertura" className="mx-auto max-w-6xl px-5 py-24">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <span className="kicker">Lo que cubrimos</span>
          <h2 className="mt-4 max-w-xl font-display text-5xl font-extrabold uppercase leading-[0.95] text-ink sm:text-6xl">
            Noticias con visión ciudadana
          </h2>
        </div>
        <Button asChild variant="ink" size="lg" className="self-start md:self-auto">
          <a href={WEBSITE_URL} target="_blank" rel="noopener noreferrer">
            <Newspaper />
            Leer en metroplex.com.mx
            <ArrowRight />
          </a>
        </Button>
      </div>

      <div className="mt-14 grid gap-px overflow-hidden rounded-lg bg-border shadow-card sm:grid-cols-2 lg:grid-cols-5">
        {SECTIONS.map((s, i) => (
          <article key={s.name} className="group relative bg-card p-7 transition-colors hover:bg-ink">
            <span className="font-display text-sm font-bold text-muted-foreground group-hover:text-highlight">
              0{i + 1}
            </span>
            <s.icon className="mt-6 size-8 text-primary" strokeWidth={2.2} />
            <h3 className="mt-5 font-display text-2xl font-extrabold uppercase text-ink group-hover:text-ink-foreground">
              {s.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground group-hover:text-ink-foreground/70">
              {s.desc}
            </p>
            <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-primary transition-transform group-hover:scale-x-100" />
          </article>
        ))}
      </div>
    </section>
  );
}

function Advertise() {
  const perks = [
    { icon: Users, title: "Audiencia local", text: "Llega a miles de juarenses que nos siguen todos los días." },
    { icon: Globe, title: "Web + Facebook", text: "Tu marca en metroplex.com.mx y en nuestras publicaciones." },
    { icon: Megaphone, title: "Atención directa", text: "Cotiza y arma tu campaña directo por WhatsApp." },
  ];
  return (
    <section id="anunciate" className="relative overflow-hidden bg-ink text-ink-foreground">
      <div className="slash absolute -right-20 top-0 hidden h-full w-72 bg-primary lg:block" />
      <div className="relative mx-auto grid max-w-6xl gap-14 px-5 py-24 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <span className="kicker">Anúnciate con nosotros</span>
          <h2 className="mt-4 font-display text-5xl font-extrabold uppercase leading-[0.95] sm:text-6xl">
            Haz que Juárez <span className="text-highlight">conozca</span> tu negocio
          </h2>
          <p className="mt-6 max-w-lg text-lg text-ink-foreground/75">
            Coloca tu anuncio junto a la información que la ciudad lee. Escríbenos y te
            enviamos opciones y precios.
          </p>
          <Button asChild variant="whatsapp" size="xl" className="mt-10">
            <a href={whatsappLink(WHATSAPP_MESSAGES.advertise)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              Quiero anunciarme
            </a>
          </Button>
        </div>

        <ul className="space-y-4">
          {perks.map((p) => (
            <li
              key={p.title}
              className="flex gap-5 rounded-lg border border-ink-foreground/10 bg-ink-soft p-6"
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-md bg-primary">
                <p.icon className="size-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold uppercase">{p.title}</h3>
                <p className="mt-1 text-ink-foreground/70">{p.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 md:grid-cols-[auto_1fr]">
      <div className="mx-auto flex size-56 items-center justify-center rounded-full border-[6px] border-primary bg-card shadow-card">
        <img src={logoUrl} alt="Logotipo de Metroplex Noticias" width={237} height={252} loading="lazy" className="h-36 w-auto" />
      </div>
      <div>
        <span className="kicker">Quiénes somos</span>
        <p className="mt-5 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
          Desde el corazón de Ciudad Juárez, te traemos las noticias más actuales y relevantes
          para mantenerte informado.
        </p>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
          Con un equipo comprometido y cobertura oportuna, nuestro objetivo es ser el referente en
          información precisa y al momento.
        </p>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contacto" className="bg-secondary">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <div className="text-center">
          <span className="kicker">Contacto</span>
          <h2 className="mt-4 font-display text-5xl font-extrabold uppercase text-ink sm:text-6xl">
            Estamos para escucharte
          </h2>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <ContactCard
            href={whatsappLink(WHATSAPP_MESSAGES.general)}
            icon={<WhatsAppIcon className="size-7" />}
            iconClass="bg-whatsapp text-whatsapp-foreground"
            title="WhatsApp"
            value={WHATSAPP_DISPLAY}
            cta="Enviar mensaje"
          />
          <ContactCard
            href={FACEBOOK_URL}
            icon={<FacebookIcon className="size-7" />}
            iconClass="bg-facebook text-facebook-foreground"
            title="Facebook"
            value="@metroplex.jrz"
            cta="Ir a la página"
          />
          <ContactCard
            href={YOUTUBE_URL}
            icon={<YouTubeIcon className="size-7" />}
            iconClass="bg-youtube text-youtube-foreground"
            title="YouTube"
            value="@idea.groupmx"
            cta="Ver videos"
          />
          <ContactCard
            href={WEBSITE_URL}
            icon={<Globe className="size-7" />}
            iconClass="bg-primary text-primary-foreground"
            title="Sitio web"
            value="metroplex.com.mx"
            cta="Leer noticias"
          />
        </div>

        <p className="mt-10 flex items-center justify-center gap-2 text-muted-foreground">
          <MapPin className="size-4 text-primary" />
          Ciudad Juárez, Chihuahua, México · C.P. 32000
        </p>
      </div>
    </section>
  );
}

function ContactCard({
  href,
  icon,
  iconClass,
  title,
  value,
  cta,
}: {
  href: string;
  icon: ReactNode;
  iconClass: string;
  title: string;
  value: string;
  cta: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group rounded-lg bg-card p-8 shadow-card transition-transform hover:-translate-y-1"
    >
      <div className={`flex size-14 items-center justify-center rounded-full ${iconClass}`}>{icon}</div>
      <h3 className="mt-6 font-display text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
        {title}
      </h3>
      <p className="mt-1 font-display text-3xl font-extrabold text-ink">{value}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 font-semibold text-primary">
        {cta}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </span>
    </a>
  );
}

function Footer() {
  return (
    <footer className="border-t-4 border-primary bg-ink text-ink-foreground/70">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 pb-24 pt-8 text-sm sm:flex-row sm:pb-8 sm:pr-28">
        <p>
          <span className="font-display text-lg font-extrabold text-ink-foreground">
            Metroplex <span className="text-primary">Noticias</span>
          </span>{" "}
          · © {new Date().getFullYear()}
        </p>
        <div className="flex items-center gap-4">
          <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="transition-colors hover:text-ink-foreground">
            <FacebookIcon className="size-5" />
          </a>
          <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="transition-colors hover:text-ink-foreground">
            <YouTubeIcon className="size-6" />
          </a>
          <a href={whatsappLink(WHATSAPP_MESSAGES.general)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="transition-colors hover:text-ink-foreground">
            <WhatsAppIcon className="size-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink(WHATSAPP_MESSAGES.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar a Metroplex Noticias por WhatsApp"
      className="animate-pulse-ring fixed bottom-5 right-5 z-50 flex size-16 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-whatsapp transition-transform hover:scale-110"
    >
      <WhatsAppIcon className="size-8" />
    </a>
  );
}
