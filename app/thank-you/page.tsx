import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PickleballIcon } from "../_components/PickleballIcon";
import { site } from "../_lib/site";

// Confirmation page the forms send visitors to as soon as they submit.
// Query: ?form=founders|careers&name=First

export const metadata: Metadata = {
  title: "Thank you — Loop Social",
  robots: { index: false, follow: false },
};

const container = "mx-auto w-full max-w-[1200px] px-[clamp(20px,5vw,48px)]";

export default async function ThankYouPage({ searchParams }: PageProps<"/thank-you">) {
  const params = await searchParams;
  const form = params.form === "careers" ? "careers" : "founders";
  const name = (typeof params.name === "string" ? params.name : "").trim().slice(0, 60);
  const greeting = name ? `, ${name}` : "";

  return (
    <div className="flex min-h-svh flex-col bg-navy font-sans text-cream">
      <header className="bg-navy-deep">
        <div className={`${container} flex h-16 items-center md:h-[76px]`}>
          <Link href="/" className="flex items-center no-underline">
            <Image
              src="/brand/loop-wordmark-cream.png"
              alt="The Loop Social"
              width={960}
              height={240}
              priority
              className="h-9 w-auto md:h-11"
            />
          </Link>
        </div>
      </header>

      <main className={`${container} flex flex-1 flex-col items-start justify-center gap-5 py-[clamp(48px,10vw,120px)]`}>
        <PickleballIcon size={64} className="animate-ls-pop" />
        {form === "careers" ? (
          <>
            <h1 className="font-display text-[clamp(32px,6vw,56px)] leading-[1.02] font-extrabold tracking-[-0.02em] text-balance">
              Thanks{greeting}. We&rsquo;ve got your details.
            </h1>
            <p className="max-w-[56ch] text-lg leading-[1.55] text-pretty text-mist">
              We&rsquo;ll be in touch about joining the team as we get closer to opening.
            </p>
          </>
        ) : (
          <>
            <h1 className="font-display text-[clamp(32px,6vw,56px)] leading-[1.02] font-extrabold tracking-[-0.02em] text-balance">
              You&rsquo;re on the Founders List{greeting}.
            </h1>
            <p className="max-w-[56ch] text-lg leading-[1.55] text-pretty text-mist">
              You&rsquo;ll hear from us first with founding membership details, opening-week bookings and launch
              events.
            </p>
          </>
        )}
        <Link
          href="/"
          className="mt-2 inline-flex h-12 items-center rounded-full bg-cream px-6 text-[15px] font-semibold text-navy-deep no-underline transition-colors hover:bg-white"
        >
          Back to the site
        </Link>
        <p className="text-sm text-mist">
          Questions?{" "}
          <a href={`mailto:${site.email}`} className="text-cream underline underline-offset-4 hover:text-white">
            {site.email}
          </a>
        </p>
      </main>

      <footer className="bg-navy-deep">
        <div className={`${container} flex flex-wrap justify-between gap-x-6 gap-y-2 py-5 text-xs text-mist`}>
          <span>© 2026 Loop Social · South Ajax, Ontario</span>
          <div className="flex gap-5">
            {site.instagramUrl && (
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream underline underline-offset-4 hover:text-white"
              >
                Instagram
              </a>
            )}
            {site.facebookUrl && (
              <a
                href={site.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream underline underline-offset-4 hover:text-white"
              >
                Facebook
              </a>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
