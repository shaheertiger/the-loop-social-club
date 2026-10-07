import { CareersForm } from "./_components/CareersForm";
import { FoundersForm } from "./_components/FoundersForm";
import { Logo } from "./_components/Logo";
import { LoopArt } from "./_components/LoopArt";
import { Marquee } from "./_components/Marquee";
import { site } from "./_lib/site";

// Pre-launch: this coming-soon page is the main public route (plus /welcome-2 to
// /welcome-4, standalone pages in public/ linked from the footer).
// The full marketing site lives in app/_website (a private, unroutable folder).

const OFFERINGS = [
  {
    n: "01",
    title: "PICKLEBALL",
    body: "6 indoor courts for open play, leagues, lessons, tournaments and social matches.",
  },
  {
    n: "02",
    title: "CRICKET",
    body: "Dedicated indoor cricket lanes for batting, bowling, coaching and team training.",
  },
  {
    n: "03",
    title: "THE CAFÉ",
    body: "Coffee, bites and a place to hang out before, after or between games.",
    filled: true,
  },
  {
    n: "04",
    title: "EVENTS & GATHERINGS",
    body: "A flexible space for birthdays, private events, team gatherings, celebrations and community events.",
  },
];

const gutter = "px-[clamp(20px,5vw,56px)]";
const eyebrow = "font-display text-[11px] leading-[1.4] font-semibold tracking-[0.22em] text-mist";
const sectionTitle =
  "font-display text-[clamp(32px,5.5vw,60px)] leading-[.98] font-extrabold tracking-[-0.04em] text-balance";

export default function ComingSoon() {
  return (
    <div className="flex min-h-svh flex-col overflow-x-hidden bg-navy font-sans text-cream">
      <header
        className={`mx-auto flex w-full max-w-[1320px] items-center justify-between gap-4 py-5 ${gutter}`}
      >
        <Logo tone="cream" priority className="block h-[clamp(40px,7vw,56px)] w-auto" />
        <div className="flex items-center gap-2 rounded-full border-[1.5px] border-cream/35 px-3.5 py-[9px] font-display text-[11px] leading-none font-semibold tracking-[0.12em] whitespace-nowrap">
          <span className="size-[7px] flex-none rounded-full bg-cream" />
          SOUTH AJAX
          <span className="hidden sm:inline">· MINUTES FROM HWY 401</span>
        </div>
      </header>

      <main
        className={`mx-auto flex w-full max-w-[1320px] flex-1 flex-wrap items-center gap-[clamp(28px,5vw,72px)] pt-[clamp(8px,3vw,40px)] pb-[clamp(40px,6vw,80px)] ${gutter}`}
      >
        <section className="relative min-w-0 flex-[1_1_440px]">
          <div className="pointer-events-none absolute top-[6%] right-[-30%] left-[10%] h-[72%]">
            <LoopArt />
          </div>
          <div className="relative">
            <p className={`mb-[22px] ${eyebrow}`}>OPENING VERY SOON</p>
            <h1 className="font-display text-[clamp(44px,10.5vw,96px)] leading-[.92] font-extrabold tracking-[-0.04em]">
              <span className="block">PLAY.</span>
              <span className="block">CONNECT.</span>
              <span className="block">STAY.</span>
            </h1>
            <p className="mt-7 max-w-[480px] text-[clamp(16px,2.2vw,18px)] leading-[1.55] text-pretty text-mist">
              South Ajax&rsquo;s new social sports destination featuring 6 indoor pickleball courts,
              cricket training lanes, a café and a dedicated event space for parties, gatherings and
              celebrations.
            </p>
            <p className="mt-5 font-serif text-[clamp(20px,3vw,24px)] leading-[1.2] text-cream italic">
              South Ajax · Minutes from Hwy 401
            </p>
          </div>
        </section>

        <section
          id="founders"
          aria-label="Founding memberships"
          className="mx-auto max-w-[520px] min-w-0 scroll-mt-6 flex-[1_1_380px]"
        >
          <div className="rounded-[28px] bg-cream p-[clamp(24px,4vw,36px)] text-navy shadow-[0_30px_60px_-20px_rgba(10,20,35,.55)]">
            <FoundersForm />
          </div>
        </section>
      </main>

      <div className="overflow-hidden border-y-[1.5px] border-cream/18 py-[18px]">
        <Marquee
          words={["PLAY", "CONNECT", "EAT", "GATHER", "CELEBRATE", "SOUTH AJAX"]}
          className="text-[clamp(20px,4vw,32px)]"
        />
      </div>

      <section
        aria-labelledby="offerings-title"
        className="mx-auto w-full max-w-[1320px] pt-[clamp(48px,7vw,96px)] pb-[clamp(32px,5vw,56px)]"
      >
        <div className={`mb-[clamp(24px,4vw,40px)] flex flex-col gap-4 ${gutter}`}>
          <p className={eyebrow}>A SOCIAL SPORTS DESTINATION</p>
          <h2 id="offerings-title" className={`max-w-[880px] ${sectionTitle}`}>
            A place to play, connect, eat, gather and celebrate.
          </h2>
        </div>
        <div
          className={`no-scrollbar flex snap-x snap-mandatory scroll-px-[clamp(20px,5vw,56px)] gap-3.5 overflow-x-auto md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-4 ${gutter}`}
        >
          {OFFERINGS.map((o) => (
            <article
              key={o.n}
              className={`flex min-h-[240px] flex-[1_0_min(280px,78vw)] snap-start flex-col justify-between gap-10 rounded-3xl p-6 ${
                o.filled ? "bg-cream text-navy" : "border-[1.5px] border-cream/22"
              }`}
            >
              <span
                className={`font-display text-xs font-semibold tracking-[0.1em] ${o.filled ? "text-slate" : "text-mist"}`}
              >
                {o.n}
              </span>
              <div className="flex flex-col gap-2.5">
                <h3 className="font-display text-2xl leading-[1.05] font-extrabold tracking-[-0.02em]">
                  {o.title}
                </h3>
                <p
                  className={`font-serif text-[21px] leading-[1.25] italic ${o.filled ? "text-slate" : "text-mist"}`}
                >
                  {o.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="team-title"
        className={`mx-auto w-full max-w-[1320px] pt-[clamp(24px,4vw,48px)] pb-[clamp(48px,7vw,96px)] ${gutter}`}
      >
        <div className="flex flex-col gap-6 rounded-[clamp(28px,4vw,40px)] border-[1.5px] border-cream/22 p-[clamp(24px,5vw,56px)]">
          <h2 id="team-title" className={`max-w-[760px] ${sectionTitle}`}>
            JOIN OUR TEAM
          </h2>
          <p className="max-w-[620px] text-[clamp(16px,2.2vw,18px)] leading-[1.55] text-pretty text-mist">
            We&rsquo;re looking for experienced pickleball and cricket coaches, front-desk staff, café
            staff and energetic people who want to help build The Loop community.
          </p>
          <CareersForm />
        </div>
      </section>

      <footer
        className={`mx-auto flex w-full max-w-[1320px] flex-wrap items-center justify-between gap-x-6 gap-y-3 pt-6 pb-8 text-sm leading-[1.4] text-mist ${gutter}`}
      >
        <span>© 2026 Loop Social · South Ajax, Ontario</span>
        <div className="flex flex-wrap gap-5">
          <a href={`mailto:${site.email}`} className="text-cream underline hover:text-white">
            {site.email}
          </a>
          <a href="/welcome-2" className="text-cream underline hover:text-white">
            Welcome 2
          </a>
          <a href="/welcome-3" className="text-cream underline hover:text-white">
            Welcome 3
          </a>
          <a href="/welcome-4" className="text-cream underline hover:text-white">
            Welcome 4
          </a>
          {site.instagramUrl && (
            <a href={site.instagramUrl} className="text-cream underline hover:text-white">
              Instagram
            </a>
          )}
        </div>
      </footer>
    </div>
  );
}
