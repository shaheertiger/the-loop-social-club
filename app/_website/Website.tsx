import { Logo } from "../_components/Logo";
import { Marquee } from "../_components/Marquee";
import { site } from "../_lib/site";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { SiteHeader } from "./SiteHeader";

// Launch-day marketing home page. NOT routed yet: app/_website is a private
// folder, so nothing here is reachable until app/page.tsx renders <Website />.

const gutter = "px-[clamp(20px,4vw,48px)]";
const sectionY = "py-[clamp(56px,8vw,112px)]";
const eyebrow = "font-display text-xs font-semibold tracking-[0.14em]";
const primaryButton =
  "flex items-center gap-2.5 rounded-full bg-navy font-display font-semibold text-cream no-underline transition-colors hover:bg-navy-deep hover:text-cream";

const PICKLEBALL_TILES = [
  { title: "Open play", sub: "Drop in, rotate in" },
  { title: "Leagues", sub: "Weeknight ladders" },
  { title: "Lessons", sub: "Clinics for all levels" },
  { title: "Court rental", sub: "Book by the hour" },
];

const CRICKET_CARDS = [
  { key: "A", title: "Lane rental", sub: "Solo or team", filled: true },
  { key: "B", title: "Bowling machine", sub: "Set your pace" },
  { key: "C", title: "Coaching & camps", sub: "Juniors to adults" },
];

const CAFE_SHOTS = [
  { title: "Coffee bar", sub: "Espresso & chai", image: "Café counter" },
  { title: "Kitchen", sub: "Bakes & bites", image: "Fresh bakes" },
  { title: "Lounge", sub: "Court views", image: "Lounge with court view" },
];

const DAY = [
  { t: "MORNING", h: "First pour", p: "Coffee and a quiet corner before work." },
  { t: "MIDDAY", h: "Open play", p: "Drop in, paddle up, meet your next partner." },
  { t: "AFTER SCHOOL", h: "Junior nets", p: "Young cricketers sharpen their technique." },
  { t: "EVENING", h: "League night", p: "Ladders on court, the lounge cheering on." },
  { t: "LATE", h: "One more game", p: "Then a chai for the road." },
];

const SOCIAL = [
  { label: "Instagram", href: site.instagramUrl },
  { label: "TikTok", href: site.tiktokUrl },
].filter((s) => s.href);

export function Website() {
  return (
    <div className="overflow-x-clip bg-cream pb-[84px] font-sans text-navy nav:pb-0 [&_section]:scroll-mt-20">
      <SiteHeader />

      {/* Hero */}
      <section id="top" className={`mx-auto max-w-[1360px] pt-[clamp(28px,5vw,64px)] pb-[clamp(40px,6vw,80px)] ${gutter}`}>
        <div className="flex flex-wrap items-end gap-[clamp(24px,4vw,56px)]">
          <div className="min-w-0 flex-[1_1_520px]">
            <p className="mb-5 font-display text-[11px] leading-[1.4] font-semibold tracking-[0.22em] text-slate">
              PICKLEBALL · CRICKET · CAFÉ — AJAX, ON
            </p>
            <h1 className="font-display text-[clamp(52px,11vw,148px)] leading-[.88] font-extrabold tracking-[-0.05em]">
              Play hard.
              <span className="mt-[.04em] block font-serif text-[1.02em] leading-[.95] font-normal tracking-[-0.02em] italic">
                Stay cozy.
              </span>
            </h1>
          </div>
          <div className="flex max-w-[420px] flex-[1_1_300px] flex-col gap-[22px] pb-2">
            <p className="text-[clamp(16px,2vw,19px)] leading-[1.55] text-pretty text-slate">
              Indoor pickleball courts, cricket practice nets and a café built for lingering. One roof
              in Ajax for games, coffee and the people you play with.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <a href="#pickleball" className={`h-14 flex-auto justify-center px-[26px] text-sm ${primaryButton}`}>
                Book a court <span>→</span>
              </a>
              <a
                href="#cafe"
                className="flex h-14 flex-auto items-center justify-center rounded-full border-[1.5px] border-navy px-[26px] font-display text-sm font-semibold text-navy no-underline"
              >
                See the café
              </a>
            </div>
          </div>
        </div>
        <div className="relative mt-[clamp(28px,4vw,48px)] h-[clamp(300px,52vw,560px)]">
          <ImagePlaceholder label="Hero photo — players on court, café lounge in background" shape={32} />
          <div className="pointer-events-none absolute top-[clamp(14px,2vw,24px)] left-[clamp(14px,2vw,24px)] flex items-center gap-2 rounded-full bg-cream px-3.5 py-2.5 text-xs font-semibold">
            <span className="size-2 rounded-full bg-navy" />
            Now booking opening week
          </div>
        </div>
      </section>

      <div className="overflow-hidden bg-navy py-5">
        <Marquee words={["PICKLEBALL", "CRICKET", "CAFÉ", "EVENTS"]} className="text-[clamp(22px,4vw,36px)]" />
      </div>

      {/* 01 Pickleball */}
      <section id="pickleball" className={`bg-navy text-cream ${sectionY} ${gutter}`}>
        <div className="mx-auto flex max-w-[1360px] flex-wrap items-center gap-[clamp(32px,5vw,72px)]">
          <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-6">
            <span className={`${eyebrow} text-mist`}>01 — PICKLEBALL</span>
            <h2 className="font-display text-[clamp(40px,7vw,88px)] leading-[.92] font-extrabold tracking-[-0.045em]">
              Courts that never get rained out.
            </h2>
            <p className="max-w-[480px] text-[17px] leading-[1.6] text-pretty text-mist">
              Climate-controlled indoor courts for first-timers and ladder regulars. Grab a paddle at
              the desk or bring your own.
            </p>
            <div className="grid max-w-[520px] grid-cols-2 gap-2.5">
              {PICKLEBALL_TILES.map((tile) => (
                <div key={tile.title} className="flex flex-col gap-1.5 rounded-[18px] border-[1.5px] border-cream/22 p-4">
                  <b className="font-display text-[15px] font-semibold">{tile.title}</b>
                  <span className="text-sm leading-[1.4] text-mist">{tile.sub}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="h-[clamp(360px,48vw,620px)] min-w-0 flex-[1_1_380px]">
            <ImagePlaceholder label="Pickleball court photo" shape="pill" tone="dark" />
          </div>
        </div>
      </section>

      {/* 02 Cricket */}
      <section id="cricket" className={`bg-sand ${sectionY} ${gutter}`}>
        <div className="mx-auto flex max-w-[1360px] flex-col gap-[clamp(32px,4vw,56px)]">
          <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
            <div className="flex min-w-0 flex-[1_1_560px] flex-col gap-5">
              <span className={`${eyebrow} text-slate`}>02 — CRICKET</span>
              <h2 className="font-display text-[clamp(40px,7vw,96px)] leading-[.9] font-extrabold tracking-[-0.045em]">
                Your nets,
                <span className="block font-serif text-[1.08em] leading-[.9] font-normal tracking-[-0.02em] italic">
                  any season.
                </span>
              </h2>
            </div>
            <div className="flex min-w-0 flex-[0_1_400px] flex-col gap-5">
              <p className="text-[17px] leading-[1.6] text-pretty text-slate">
                Indoor practice lanes for batting and bowling. Book a lane for yourself, a coaching
                session, or the whole squad.
              </p>
              <a href="#visit" className={`h-[52px] self-start px-[22px] text-[13px] ${primaryButton}`}>
                Book a lane →
              </a>
            </div>
          </div>
          <div className="flex flex-wrap items-stretch gap-3">
            <div className="relative min-h-[clamp(340px,44vw,560px)] min-w-0 flex-[1.6_1_440px]">
              <div className="absolute inset-0">
                <ImagePlaceholder label="Batter in the nets" shape={32} />
              </div>
              <div className="pointer-events-none absolute top-[clamp(14px,2vw,24px)] right-[clamp(14px,2vw,24px)] flex aspect-square w-[clamp(104px,12vw,140px)] -rotate-8 flex-col items-center justify-center gap-0.5 rounded-full bg-navy text-center text-cream shadow-[0_12px_30px_-10px_rgba(10,20,35,.5)]">
                <span className="font-serif text-[clamp(22px,2.4vw,28px)] leading-none italic">Year-round</span>
                <span className="font-display text-[9px] leading-[1.3] font-semibold tracking-[0.12em] text-mist">
                  NO WAITING
                  <br />
                  FOR SUMMER
                </span>
              </div>
            </div>
            <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-3">
              {CRICKET_CARDS.map((card) => (
                <div
                  key={card.key}
                  className={`flex min-h-[150px] flex-1 flex-col justify-between gap-6 rounded-[28px] p-6 ${
                    card.filled ? "bg-navy text-cream" : "border-[1.5px] border-navy"
                  }`}
                >
                  <span className={`font-display text-xs font-semibold tracking-[0.1em] ${card.filled ? "text-mist" : "text-slate"}`}>
                    {card.key}
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <b className="font-display text-[22px] leading-[1.1] font-extrabold tracking-[-0.02em]">{card.title}</b>
                    <span className={`font-serif text-xl leading-[1.2] italic ${card.filled ? "text-mist" : "text-slate"}`}>
                      {card.sub}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 03 Café */}
      <section id="cafe" className={`${sectionY} ${gutter}`}>
        <div className="mx-auto flex max-w-[1360px] flex-col gap-[clamp(28px,4vw,48px)]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-5">
              <span className={`${eyebrow} text-slate`}>03 — CAFÉ</span>
              <h2 className="font-serif text-[clamp(52px,9vw,128px)] leading-[.88] font-normal tracking-[-0.02em] italic">
                The best seat
                <span className="mt-[.1em] block font-display text-[.7em] leading-none font-extrabold tracking-[-0.05em] not-italic">
                  is courtside.
                </span>
              </h2>
            </div>
            <p className="flex-[0_1_380px] text-[17px] leading-[1.6] text-pretty text-slate">
              Espresso, chai and fresh bakes in a warm lounge overlooking the courts. Come to play, or
              come for the coffee. Both count.
            </p>
          </div>
          <div className="no-scrollbar -mx-[clamp(20px,4vw,48px)] flex snap-x snap-mandatory gap-3 overflow-x-auto px-[clamp(20px,4vw,48px)]">
            {CAFE_SHOTS.map((shot) => (
              <figure key={shot.title} className="m-0 flex flex-[1_0_min(320px,80vw)] snap-start flex-col gap-3">
                <div className="h-[clamp(300px,34vw,440px)]">
                  <ImagePlaceholder label={shot.image} />
                </div>
                <figcaption className="flex justify-between text-[15px] font-semibold">
                  {shot.title}
                  <span className="font-normal text-slate">{shot.sub}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* A day in the loop */}
      <section className="bg-navy py-[clamp(56px,8vw,104px)] text-cream">
        <div className="mx-auto flex max-w-[1360px] flex-col gap-8">
          <h2 className={`font-display text-[clamp(32px,5vw,56px)] leading-none font-extrabold tracking-[-0.04em] ${gutter}`}>
            A day in the loop
          </h2>
          <ol className={`no-scrollbar m-0 flex list-none snap-x snap-mandatory overflow-x-auto ${gutter}`}>
            {DAY.map((d) => (
              <li key={d.t} className="flex flex-[1_0_min(260px,70vw)] snap-start flex-col gap-[18px] pr-5">
                <div className="flex items-center">
                  <span className="size-4 flex-none rounded-full bg-cream" />
                  <span className="h-0.5 flex-1 bg-cream/30" />
                </div>
                <span className="font-display text-[13px] font-semibold tracking-[0.08em] text-mist">{d.t}</span>
                <b className="font-display text-[22px] leading-[1.1] font-extrabold tracking-[-0.02em]">{d.h}</b>
                <span className="font-serif text-[21px] leading-[1.25] text-mist italic">{d.p}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Events */}
      <section id="events" className={`${sectionY} ${gutter}`}>
        <div className="mx-auto flex max-w-[1360px] flex-wrap items-center justify-between gap-8 rounded-[clamp(28px,4vw,48px)] border-2 border-navy p-[clamp(28px,5vw,64px)]">
          <div className="flex min-w-0 flex-[1_1_460px] flex-col gap-4">
            <span className={`${eyebrow} text-slate`}>EVENTS &amp; PRIVATE BOOKINGS</span>
            <h2 className="font-display text-[clamp(32px,5.5vw,64px)] leading-[.95] font-extrabold tracking-[-0.045em]">
              Birthdays, team nights &amp; tournaments.
            </h2>
            <p className="max-w-[520px] text-[17px] leading-[1.6] text-slate">
              Book courts, nets and the café together. We&rsquo;ll handle the rest.
            </p>
          </div>
          <a
            href="#visit"
            className="flex aspect-square w-[clamp(150px,22vw,220px)] flex-[0_1_auto] flex-col items-center justify-center gap-1.5 rounded-full bg-navy text-center font-display text-[15px] font-semibold text-cream no-underline transition-transform duration-200 hover:scale-[1.04] hover:-rotate-8 hover:text-cream"
          >
            Plan an event
            <span className="text-[22px]">↗</span>
          </a>
        </div>
      </section>

      {/* Visit */}
      <section id="visit" className={`pb-[clamp(56px,8vw,112px)] ${gutter}`}>
        <div className="mx-auto grid max-w-[1360px] grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-3">
          <div className="min-h-[340px]">
            <ImagePlaceholder label="Map / exterior photo" />
          </div>
          <div className="flex flex-col gap-7 rounded-[28px] bg-navy p-[clamp(24px,4vw,40px)] text-cream">
            <h2 className="font-display text-[clamp(32px,4.5vw,48px)] leading-none font-extrabold tracking-[-0.04em]">
              Visit us
            </h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-6">
              <div className="flex flex-col gap-1.5">
                <span className="font-display text-[11px] font-semibold tracking-[0.14em] text-mist">WHERE</span>
                <span className="text-[17px] leading-[1.45] font-medium">
                  Street address
                  <br />
                  Ajax, ON
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="font-display text-[11px] font-semibold tracking-[0.14em] text-mist">HOURS</span>
                <span className="text-[17px] leading-[1.45] font-medium">
                  Mon–Sun
                  <br />
                  Hours TBA
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="font-display text-[11px] font-semibold tracking-[0.14em] text-mist">CONTACT</span>
                <a href={`mailto:${site.email}`} className="text-[17px] leading-[1.45] font-medium text-cream underline">
                  {site.email}
                </a>
              </div>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Loop+Social+Ajax+ON"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto flex h-[52px] items-center gap-2.5 self-start rounded-full bg-cream px-[22px] font-display text-[13px] font-semibold text-navy no-underline"
            >
              Get directions →
            </a>
          </div>
        </div>
      </section>

      <footer className={`bg-navy pt-[clamp(48px,7vw,88px)] pb-8 text-cream ${gutter}`}>
        <div className="mx-auto flex max-w-[1360px] flex-col gap-10">
          <Logo tone="cream" className="block h-auto w-full max-w-[880px]" />
          <div className="flex flex-wrap justify-between gap-x-8 gap-y-4 border-t border-cream/20 pt-6 text-sm leading-[1.4] text-mist">
            <span>© 2026 Loop Social · Ajax, Ontario</span>
            {SOCIAL.length > 0 && (
              <div className="flex flex-wrap gap-5">
                {SOCIAL.map((s) => (
                  <a key={s.label} href={s.href} className="text-cream underline">
                    {s.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
