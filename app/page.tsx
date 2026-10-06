import { Logo } from "./_components/Logo";
import { LoopArt } from "./_components/LoopArt";
import { Marquee } from "./_components/Marquee";
import { SignupForm } from "./_components/SignupForm";
import { site } from "./_lib/site";

// Pre-launch: this coming-soon page is the main public route (plus /welcome-2 to
// /welcome-4, standalone pages in public/ linked from the footer).
// The full marketing site lives in app/_website (a private, unroutable folder).

const FEATURES = [
  { n: "01", title: "Pickleball", body: "Indoor courts, open play and leagues, all year round." },
  { n: "02", title: "Cricket", body: "Practice nets for batting, bowling and team training." },
  { n: "03", title: "Café", body: "Good coffee and a warm seat between games.", filled: true },
];

const gutter = "px-[clamp(20px,5vw,56px)]";

export default function ComingSoon() {
  return (
    <div className="flex min-h-svh flex-col overflow-x-hidden bg-navy font-sans text-cream">
      <header
        className={`mx-auto flex w-full max-w-[1320px] items-center justify-between gap-4 py-5 ${gutter}`}
      >
        <Logo tone="cream" priority className="block h-[clamp(40px,7vw,56px)] w-auto" />
        <div className="flex items-center gap-2 rounded-full border-[1.5px] border-cream/35 px-3.5 py-[9px] font-display text-[11px] leading-none font-semibold tracking-[0.12em] whitespace-nowrap">
          <span className="size-[7px] rounded-full bg-cream" />
          AJAX, ON
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
            <p className="mb-[22px] font-display text-[11px] leading-[1.4] font-semibold tracking-[0.22em] text-mist">
              OPENING SOON IN AJAX, ONTARIO
            </p>
            <h1 className="font-display text-[clamp(56px,13vw,132px)] leading-[.9] font-extrabold tracking-[-0.04em]">
              <span className="block">Rally.</span>
              <span className="block">Bowl.</span>
              <span className="block">Sip.</span>
            </h1>
            <p className="mt-[18px] font-serif text-[clamp(30px,6vw,48px)] leading-[1.05] italic">
              &amp; stay a while.
            </p>
            <p className="mt-7 max-w-[460px] text-[clamp(16px,2.2vw,18px)] leading-[1.55] text-pretty text-mist">
              Loop Social is a new indoor home for pickleball, cricket and a cozy café. Join the
              list for opening dates, early court bookings and launch events.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[520px] min-w-0 flex-[1_1_380px]">
          <div className="rounded-[28px] bg-cream p-[clamp(24px,4vw,36px)] text-navy shadow-[0_30px_60px_-20px_rgba(10,20,35,.55)]">
            <SignupForm />
          </div>
        </section>
      </main>

      <div className="overflow-hidden border-y-[1.5px] border-cream/18 py-[18px]">
        <Marquee
          words={["PICKLEBALL", "CRICKET", "CAFÉ", "AJAX, ON"]}
          className="text-[clamp(20px,4vw,32px)]"
        />
      </div>

      <section className="mx-auto w-full max-w-[1320px] pt-[clamp(40px,6vw,72px)] pb-[clamp(32px,5vw,56px)]">
        <div className={`no-scrollbar flex snap-x snap-mandatory gap-3.5 overflow-x-auto ${gutter}`}>
          {FEATURES.map((f) => (
            <article
              key={f.n}
              className={`flex min-h-[220px] flex-[1_0_min(280px,78vw)] snap-start flex-col gap-10 rounded-3xl p-6 ${
                f.filled ? "bg-cream text-navy" : "border-[1.5px] border-cream/22"
              }`}
            >
              <span
                className={`font-display text-xs font-semibold tracking-[0.1em] ${f.filled ? "text-slate" : "text-mist"}`}
              >
                {f.n}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="font-display text-2xl leading-none font-extrabold tracking-[-0.02em]">
                  {f.title}
                </h3>
                <p
                  className={`font-serif text-[22px] leading-[1.2] italic ${f.filled ? "text-slate" : "text-mist"}`}
                >
                  {f.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer
        className={`mx-auto flex w-full max-w-[1320px] flex-wrap items-center justify-between gap-x-6 gap-y-3 pt-6 pb-8 text-sm leading-[1.4] text-mist ${gutter}`}
      >
        <span>© 2026 Loop Social · Ajax, Ontario</span>
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
