import Image, { type StaticImageData } from "next/image";
import cafeLounge from "../public/photos/cafe-lounge.jpg";
import cricketNets from "../public/photos/cricket-nets.jpg";
import eventsGathering from "../public/photos/events-gathering.jpg";
import pickleballRally from "../public/photos/pickleball-rally.jpg";
import { CareersForm } from "./_components/CareersForm";
import { FoundersForm } from "./_components/FoundersForm";
import { HeroVisual } from "./_components/HeroVisual";
import { BoltIcon, HeartIcon, UsersIcon } from "./_components/Icons";
import { site } from "./_lib/site";

// Pre-launch: this coming-soon page is the only public route.
// The full marketing site lives in app/_website (a private, unroutable folder).

const STATS = ["6 indoor pickleball courts", "Cricket training lanes", "Café & lounge", "Private event space"];

const PERKS = [
  {
    figure: "Locked in",
    title: "Founding member rate",
    body: "Your membership price never goes up while you stay a member.",
  },
  {
    figure: "48 hrs",
    title: "First booking window",
    body: "Book courts and lanes for opening week before the public.",
  },
];

type Offering = {
  n: string;
  title: string;
  body: string;
  /** A real photo, or a drawn illustration until one exists. */
  photo?: { src: StaticImageData; alt: string };
  Art?: (props: { className?: string }) => React.ReactElement;
};

const OFFERINGS: Offering[] = [
  {
    n: "01",
    title: "Pickleball",
    body: "6 indoor courts for open play, leagues, lessons, tournaments and social matches.",
    photo: { src: pickleballRally, alt: "A player returning the ball at the net on a blue pickleball court" },
  },
  {
    n: "02",
    title: "Cricket",
    body: "Dedicated indoor cricket lanes for batting, bowling, coaching and team training.",
    photo: { src: cricketNets, alt: "Indoor cricket training lanes with green turf, nets and stumps" },
  },
  {
    n: "03",
    title: "The Café",
    body: "Coffee, bites and a place to hang out before, after or between games.",
    photo: { src: cafeLounge, alt: "Café lounge with leather sofas, plants and woven pendant lights beside the courts" },
  },
  {
    n: "04",
    title: "Events & Gatherings",
    body: "A flexible space for birthdays, private events, team gatherings, celebrations and community events.",
    photo: { src: eventsGathering, alt: "A crowd gathering between the courts at a Loop Social event, with branded court signs and a check-in desk" },
  },
];

const VALUES = [
  { title: "Meet", body: "New people, new connections. Come solo, leave with a crew.", Icon: UsersIcon },
  { title: "Play", body: "Your game, your pace. First-timers and competitors welcome.", Icon: BoltIcon },
  { title: "Belong", body: "Be part of the community from day one. Your new local.", Icon: HeartIcon },
];

const STANDS_FOR = [
  { title: "Everyone plays.", body: "Every age, level and background." },
  { title: "Local first.", body: "Local coaches, suppliers and partners." },
  { title: "Stay a while.", body: "The game is how it starts, not how it ends." },
];

const container = "mx-auto w-full max-w-[1200px] px-[clamp(20px,5vw,48px)]";
const eyebrow = "font-sans text-xs font-semibold tracking-[0.16em] uppercase";
const h2 = "font-display text-[clamp(32px,5vw,52px)] leading-[1.02] font-extrabold tracking-[-0.03em] text-balance";
const pillButton =
  "inline-flex h-12 items-center justify-center rounded-full px-6 font-sans text-[15px] font-semibold whitespace-nowrap transition-colors";

/** Headline full stops take the brand orange, echoing the logo's ball. */
function Dot() {
  return <span className="text-orange">.</span>;
}

export default function ComingSoon() {
  return (
    <div className="flex min-h-svh flex-col overflow-x-clip bg-cream font-sans text-navy-deep">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-navy-deep text-cream">
        <div className={`${container} flex h-16 items-center justify-between gap-4`}>
          <a href="#top" className="flex items-center gap-2.5 no-underline">
            <Image src="/brand/loop-mark.png" alt="" width={34} height={34} priority className="size-[34px]" />
            <span className="font-display text-lg font-extrabold tracking-[0.02em] text-cream">LOOP SOCIAL</span>
          </a>
          <nav aria-label="Main" className="hidden items-center gap-7 text-sm md:flex">
            <a href="#inside" className="text-cream/85 no-underline hover:text-cream">
              What&rsquo;s inside
            </a>
            <a href="#founders" className="text-cream/85 no-underline hover:text-cream">
              Founding perks
            </a>
            <a href="#about" className="text-cream/85 no-underline hover:text-cream">
              About us
            </a>
          </nav>
          <a
            href="#founders"
            className="inline-flex h-10 items-center rounded-full bg-cream px-4 text-sm font-semibold whitespace-nowrap text-navy-deep no-underline transition-colors hover:bg-white sm:px-5"
          >
            <span className="sm:hidden">Join the list</span>
            <span className="hidden sm:inline">Join the Founders List</span>
          </a>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="bg-navy text-cream">
          <div
            className={`${container} grid items-stretch gap-10 py-[clamp(40px,7vw,88px)] md:grid-cols-[1.1fr_1fr] md:gap-12`}
          >
            <div className="flex flex-col justify-center">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border-[1.5px] border-cream bg-cream/5 px-3.5 py-1.5 text-[11px] font-bold tracking-[0.12em]">
                  OPENING VERY SOON
                </span>
                <span className="flex items-center gap-2 rounded-full border-[1.5px] border-cream/35 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.12em] text-cream/90">
                  <span className="size-1.5 rounded-full bg-orange" />
                  SOUTH AJAX, ON · MINUTES FROM HWY 401
                </span>
              </div>
              <h1 className="mt-7 font-display text-[clamp(56px,9vw,104px)] leading-[0.92] font-extrabold tracking-[-0.045em]">
                <span className="block">
                  Play<Dot />
                </span>
                <span className="block">
                  Connect<Dot />
                </span>
                <span className="block text-sky">
                  Stay<Dot />
                </span>
              </h1>
              <p className="mt-7 max-w-[480px] text-[clamp(16px,1.6vw,18px)] leading-[1.6] text-pretty text-cream/90">
                Durham&rsquo;s new social sports club. Six indoor pickleball courts, dedicated cricket
                training lanes, a café worth staying for, and an event space built for celebrating.
              </p>
              <div className="mt-8">
                <a href="#founders" className={`${pillButton} bg-cream text-navy-deep no-underline hover:bg-white`}>
                  Claim a founding spot
                </a>
              </div>
            </div>
            <div className="min-h-[320px] md:min-h-[480px]">
              <HeroVisual />
            </div>
          </div>
        </section>

        {/* Stats strip: an auto-scrolling ribbon (static list when motion is reduced) */}
        <div className="overflow-hidden bg-navy-deep py-4 text-cream">
          <ul aria-hidden="true" className={`${container} m-0 hidden list-none flex-wrap gap-x-8 gap-y-2 motion-reduce:flex`}>
            {STATS.map((s) => (
              <li key={s} className="flex items-center gap-2.5 text-[15px] font-semibold whitespace-nowrap">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-orange" />
                {s}
              </li>
            ))}
          </ul>
          <ul className="sr-only">
            {STATS.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <div
            aria-hidden="true"
            className="flex w-max animate-[ls-marquee_32s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:hidden"
          >
            {/* Two identical halves so the -50% loop is seamless; each half repeats the list to fill wide screens. */}
            {[0, 1].map((half) => (
              <div key={half} className="flex">
                {[...STATS, ...STATS, ...STATS].map((s, i) => (
                  <span key={i} className="flex items-center gap-2.5 pr-12 text-[15px] font-semibold whitespace-nowrap">
                    <span className="size-1.5 rounded-full bg-orange" />
                    {s}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Founding membership */}
        <section id="founders" aria-labelledby="founders-title" className="bg-cream">
          <div className={`${container} grid items-start gap-10 py-[clamp(48px,7vw,88px)] lg:grid-cols-[1fr_minmax(0,440px)] lg:gap-14`}>
            <div className="flex flex-col gap-6">
              <p className={`${eyebrow} flex items-center gap-2 text-navy-deep`}>
                <span aria-hidden="true" className="size-1.5 rounded-full bg-orange" />
                Founding membership · Limited spots
              </p>
              <h2 id="founders-title" className={h2}>
                Be one of the first inside The Loop<Dot />
              </h2>
              <p className="max-w-[520px] text-base leading-[1.6] text-slate">
                Founding members get perks that won&rsquo;t be offered again after opening day. Join the
                list free; no payment until memberships launch.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {PERKS.map((p) => (
                  <div key={p.title} className="flex flex-col gap-2 rounded-2xl bg-white p-6">
                    <p className="font-display text-[28px] leading-none font-extrabold tracking-[-0.02em] text-orange">
                      {p.figure}
                    </p>
                    <h3 className="mt-1 text-base font-bold text-navy-deep">{p.title}</h3>
                    <p className="text-sm leading-[1.55] text-slate">{p.body}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[28px] bg-navy-deep p-[clamp(22px,4vw,32px)] text-cream shadow-[0_30px_60px_-30px_rgba(20,37,57,.6)]">
              <FoundersForm />
            </div>
          </div>
        </section>

        {/* What's inside */}
        <section id="inside" aria-labelledby="inside-title" className="bg-white">
          <div className={`${container} py-[clamp(56px,8vw,96px)]`}>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="flex max-w-[620px] flex-col gap-4">
                <p className={`${eyebrow} flex items-center gap-2 text-navy-deep`}>
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-orange" />
                  What&rsquo;s inside
                </p>
                <h2 id="inside-title" className={h2}>
                  A place to play, eat, gather and celebrate<Dot />
                </h2>
              </div>
              <p className="max-w-[300px] text-[15px] leading-[1.6] text-slate">
                Built for first-timers and competitors alike, and for the people who just come for the coffee.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {OFFERINGS.map(({ n, title, body, photo, Art }) => (
                <article key={n} className="flex flex-col overflow-hidden rounded-2xl bg-cream">
                  <div className="relative grid aspect-[16/9] place-items-center bg-sand sm:aspect-[4/3]">
                    {photo ? (
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        placeholder="blur"
                        sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    ) : (
                      Art && <Art className="w-[62%]" />
                    )}
                  </div>
                  <div className="flex flex-col gap-2 p-5">
                    <span className="text-xs font-semibold tracking-[0.1em] text-slate">{n}</span>
                    <h3 className="font-display text-[22px] leading-[1.1] font-extrabold tracking-[-0.01em]">{title}</h3>
                    <p className="text-sm leading-[1.55] text-slate">{body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section aria-labelledby="values-title" className="bg-navy text-cream">
          <div className={`${container} py-[clamp(56px,8vw,96px)]`}>
            <p className={`${eyebrow} flex items-center gap-2 text-mist`}>
              <span aria-hidden="true" className="size-1.5 rounded-full bg-orange" />
              Something new is coming to South Ajax
            </p>
            <h2 id="values-title" className={`mt-4 ${h2}`}>
              <span className="block">
                A Place to Play<Dot />
              </span>
              <span className="block text-sky">
                A Reason to Stay<Dot />
              </span>
            </h2>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {VALUES.map(({ title, body, Icon }) => (
                <div key={title} className="flex flex-col gap-3 rounded-2xl bg-navy-card p-6">
                  <span className="grid size-11 place-items-center rounded-full border border-cream/30 text-orange">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-2 font-display text-xl font-extrabold">{title}</h3>
                  <p className="text-[15px] leading-[1.55] text-mist">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About us */}
        <section id="about" aria-labelledby="about-title" className="bg-white">
          <div className={`${container} flex flex-col gap-[clamp(40px,6vw,64px)] py-[clamp(56px,8vw,96px)]`}>
            {/* The story */}
            <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
              <div className="flex flex-col gap-5">
                <p className={`${eyebrow} flex items-center gap-2 text-navy-deep`}>
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-orange" />
                  About us
                </p>
                <h2 id="about-title" className={h2}>
                  Built by neighbours, for the neighbourhood<Dot />
                </h2>
              </div>
              <div className="flex flex-col gap-5 lg:pt-9">
                <p className="text-[17px] leading-[1.7] text-slate">
                  Loop Social started with a simple frustration: there was no one place in Durham where a
                  family could play pickleball, a teenager could train for cricket, and friends could grab a
                  coffee, all under one roof, all year long.
                </p>
                <p className="text-[17px] leading-[1.7] text-slate">
                  So we&rsquo;re building it. Loop Social is a place to break a sweat, meet people you&rsquo;d
                  never otherwise meet, and stay a little longer than you planned. That last part is the whole
                  point.
                </p>
              </div>
            </div>

            {/* Our promise */}
            <figure className="relative m-0 overflow-hidden rounded-[28px] bg-navy-deep px-[clamp(24px,6vw,72px)] py-[clamp(36px,6vw,64px)] text-cream">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-3 right-6 font-display text-[clamp(140px,22vw,240px)] leading-none font-extrabold text-orange/45"
              >
                &rdquo;
              </span>
              <p className={`${eyebrow} text-mist`}>Our promise</p>
              <blockquote className="m-0 mt-4 max-w-[900px]">
                <p className="font-display text-[clamp(26px,3.6vw,40px)] leading-[1.2] font-extrabold tracking-[-0.02em] text-balance">
                  We want this to be the place you come for one game, and end up staying for the{" "}
                  <span className="text-orange">whole evening</span>.
                </p>
              </blockquote>
            </figure>

            {/* What we stand for */}
            <div className="flex flex-col gap-6">
              <h3 className="font-display text-[clamp(22px,2.6vw,28px)] leading-tight font-extrabold tracking-[-0.01em]">
                What we stand for
              </h3>
              <ol className="m-0 grid list-none gap-8 p-0 md:grid-cols-3 md:gap-10">
                {STANDS_FOR.map((v, i) => (
                  <li key={v.title} className="flex flex-col gap-2 border-t-2 border-orange pt-5">
                    <span className="font-display text-sm font-extrabold tracking-[0.08em] text-orange">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <strong className="font-display text-xl leading-tight font-extrabold text-navy-deep">{v.title}</strong>
                    <span className="text-[15px] leading-[1.6] text-slate">{v.body}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* CTA band */}
        <section aria-labelledby="cta-title" className="bg-navy text-cream">
          <div className={`${container} flex flex-wrap items-center justify-between gap-6 py-[clamp(48px,7vw,80px)]`}>
            <h2 id="cta-title" className={`max-w-[640px] ${h2}`}>
              Founding spots are limited. Get in The Loop<Dot />
            </h2>
            <a href="#founders" className={`${pillButton} bg-cream text-navy-deep no-underline hover:bg-white`}>
              Join the Founders List
            </a>
          </div>
        </section>

        {/* Hiring */}
        <section aria-labelledby="hiring-title" className="bg-cream">
          <div className={`${container} flex flex-col gap-6 py-[clamp(40px,6vw,64px)] md:flex-row md:flex-wrap md:items-center md:justify-between`}>
            <div className="flex max-w-[620px] flex-col gap-2">
              <h2 id="hiring-title" className="font-display text-[clamp(26px,3.4vw,34px)] leading-[1.1] font-extrabold tracking-[-0.02em]">
                We&rsquo;re hiring<Dot />
              </h2>
              <p className="text-[15px] leading-[1.6] text-slate">
                Pickleball and cricket coaches, front desk, café crew and event hosts. Help build The Loop
                from day one.
              </p>
            </div>
            <CareersForm />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-navy-deep text-cream">
        <div className={`${container} grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]`}>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2.5">
              <Image src="/brand/loop-mark.png" alt="" width={30} height={30} className="size-[30px]" />
              <span className="font-display text-lg font-extrabold tracking-[0.02em]">LOOP SOCIAL</span>
            </div>
            <p className="text-sm text-mist">Pickleball · Cricket · Café · Events</p>
            <p className="text-sm text-mist">South Ajax, Ontario</p>
          </div>
          <div className="flex flex-col gap-1.5 text-sm">
            <h3 className="text-sm font-semibold">Visit</h3>
            <p className="text-mist">South Ajax, ON · Minutes from Hwy 401</p>
            <p className="text-mist">Hours announced at opening</p>
          </div>
          <div className="flex flex-col gap-1.5 text-sm">
            <h3 className="text-sm font-semibold">Contact</h3>
            <a href={`mailto:${site.email}`} className="text-cream underline underline-offset-4 hover:text-white">
              {site.email}
            </a>
            {site.instagramUrl && (
              <a href={site.instagramUrl} className="text-cream underline underline-offset-4 hover:text-white">
                Instagram
              </a>
            )}
          </div>
        </div>
        <div className={`${container} border-t border-cream/10 py-5 text-xs text-mist`}>© 2026 Loop Social</div>
      </footer>
    </div>
  );
}
