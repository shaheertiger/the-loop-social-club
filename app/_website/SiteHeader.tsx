"use client";

import { useState } from "react";
import { Logo } from "../_components/Logo";

const NAV = [
  { label: "Pickleball", href: "#pickleball" },
  { label: "Cricket", href: "#cricket" },
  { label: "Café", href: "#cafe" },
  { label: "Events", href: "#events" },
  { label: "Visit", href: "#visit" },
];

/** Sticky header, mobile menu overlay and the mobile sticky booking bar. */
export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-navy/10 bg-cream/92 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1360px] items-center justify-between gap-5 px-[clamp(20px,4vw,48px)] py-3.5">
          <a href="#top" className="block" onClick={close}>
            <Logo tone="navy" priority className="block h-[clamp(38px,5vw,48px)] w-auto" />
          </a>

          <nav className="hidden items-center gap-8 text-[15px] font-semibold nav:flex">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className="text-navy no-underline hover:text-navy-deep">
                {item.label}
              </a>
            ))}
            <a
              href="#pickleball"
              className="flex h-12 items-center rounded-full bg-navy px-[22px] font-display text-[13px] font-semibold text-cream no-underline transition-colors hover:bg-navy-deep"
            >
              Book a court
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            className={`flex size-12 cursor-pointer flex-col items-center justify-center gap-[5px] rounded-full border-[1.5px] border-navy p-0 nav:hidden ${
              menuOpen ? "bg-navy text-cream" : "bg-transparent text-navy"
            }`}
          >
            <span className="h-0.5 w-[18px] rounded-sm bg-current" />
            <span className="h-0.5 w-[18px] rounded-sm bg-current" />
          </button>
        </div>

        {menuOpen && (
          <nav
            id="site-menu"
            className="absolute inset-x-0 top-full flex h-screen animate-ls-fade flex-col gap-1 bg-navy px-5 py-7 text-cream nav:hidden"
          >
            {NAV.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={close}
                className="flex items-baseline justify-between border-b border-cream/15 py-3.5 font-display text-[34px] leading-[1.1] font-extrabold tracking-[-0.03em] text-cream no-underline"
              >
                {item.label}
                <span className="font-display text-xs font-semibold text-mist">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </a>
            ))}
            <p className="mt-6 font-serif text-2xl leading-[1.2] text-mist italic">Ajax, Ontario</p>
          </nav>
        )}
      </header>

      {!menuOpen && (
        <div className="fixed inset-x-3 bottom-3 z-30 flex gap-2 rounded-full bg-navy p-2 shadow-[0_16px_40px_-12px_rgba(10,20,35,.6)] nav:hidden">
          <a
            href="#pickleball"
            className="flex h-[52px] flex-1 items-center justify-center gap-2 rounded-full bg-cream font-display text-[13px] font-semibold text-navy no-underline"
          >
            Book a court
          </a>
          <a
            href="#cafe"
            className="flex h-[52px] flex-none items-center rounded-full border-[1.5px] border-cream/30 px-5 font-display text-[13px] font-semibold text-cream no-underline"
          >
            Café
          </a>
        </div>
      )}
    </>
  );
}
