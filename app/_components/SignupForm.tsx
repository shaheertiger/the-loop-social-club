"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { site } from "../_lib/site";
import { PickleballIcon } from "./PickleballIcon";

const INTERESTS = ["Pickleball", "Cricket", "Café", "Events & parties"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  "h-[54px] rounded-[14px] border-[1.5px] bg-white px-4 font-sans text-base font-medium text-navy outline-none transition-[border-color,box-shadow] placeholder:text-placeholder focus:border-navy focus:shadow-[0_0_0_4px_rgba(39,61,87,.12)]";
const labelClass = "flex flex-col gap-1.5 font-sans text-[13px] leading-none font-semibold";

type Status = "idle" | "loading" | "success";

export function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [picks, setPicks] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [emailError, setEmailError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const honeypotRef = useRef<HTMLInputElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (status === "success") successHeadingRef.current?.focus();
  }, [status]);

  const togglePick = (label: string) =>
    setPicks((p) => (p.includes(label) ? p.filter((x) => x !== label) : [...p, label]));

  const reset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setPicks([]);
    setEmailError("");
    setSubmitError("");
    setStatus("idle");
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    if (!EMAIL_RE.test(email.trim())) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setSubmitError("");

    // Bots fill the hidden field; quietly pretend it worked.
    if (honeypotRef.current?.value) {
      setStatus("success");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch(site.signupEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          interests: picks.join(", "),
          _subject: "New coming-soon signup — Loop Social",
          _template: "table",
        }),
      });
      const data = (await res.json().catch(() => null)) as { success?: string | boolean } | null;
      if (!res.ok || String(data?.success) === "false") throw new Error("Signup failed");
      setStatus("success");
    } catch {
      setStatus("idle");
      setSubmitError("Something went wrong. Please try again in a moment.");
    }
  }

  if (status === "success") {
    const firstName = name.trim().split(/\s+/)[0];
    return (
      <div className="flex flex-col items-start gap-3.5 py-3" aria-live="polite">
        <PickleballIcon size={56} className="animate-ls-pop" />
        <h2
          ref={successHeadingRef}
          tabIndex={-1}
          className="mt-1.5 font-display text-[clamp(26px,5vw,34px)] leading-[1.05] font-extrabold tracking-[-0.03em] outline-none"
        >
          You&rsquo;re in the loop{firstName ? `, ${firstName}` : ""}.
        </h2>
        <p className="font-sans text-base leading-[1.55] text-pretty text-slate">
          We&rsquo;ll email <strong className="text-navy">{email.trim()}</strong> with opening
          dates and first access to court bookings.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-2 min-h-11 cursor-pointer rounded-full border-[1.5px] border-navy bg-transparent px-[18px] font-sans text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-cream"
        >
          Add another person
        </button>
      </div>
    );
  }

  const loading = status === "loading";

  return (
    <form onSubmit={handleSubmit} noValidate className="m-0 flex flex-col gap-3.5">
      <div className="mb-1.5 flex flex-col gap-1.5">
        <h2 className="font-display text-[clamp(26px,5vw,32px)] leading-[1.05] font-extrabold tracking-[-0.03em]">
          Get in the loop.
        </h2>
        <p className="font-sans text-[15px] leading-normal text-slate">
          Be first to hear when doors open.
        </p>
      </div>

      <label className={labelClass}>
        Your name
        <input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="First and last"
          autoComplete="name"
          className={`${inputClass} border-line`}
        />
      </label>

      <label className={labelClass}>
        Email
        <input
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError("");
          }}
          placeholder="you@email.com"
          autoComplete="email"
          inputMode="email"
          aria-invalid={emailError ? true : undefined}
          aria-describedby={emailError ? "email-error" : undefined}
          className={`${inputClass} ${emailError ? "border-error" : "border-line"}`}
        />
      </label>
      {emailError && (
        <p id="email-error" className="-mt-1.5 font-sans text-[13px] leading-[1.4] font-medium text-error">
          {emailError}
        </p>
      )}

      <label className={labelClass}>
        <span>
          Phone <span className="font-normal text-muted">(optional)</span>
        </span>
        <input
          name="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="(905) 555-0123"
          autoComplete="tel"
          inputMode="tel"
          className={`${inputClass} border-line`}
        />
      </label>

      <fieldset className="m-0 mt-1 flex flex-col gap-2.5 border-0 p-0">
        <legend className="mb-2.5 p-0 font-sans text-[13px] leading-none font-semibold">
          I&rsquo;m most excited for
        </legend>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map((label) => {
            const on = picks.includes(label);
            return (
              <button
                key={label}
                type="button"
                aria-pressed={on}
                onClick={() => togglePick(label)}
                className={`flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full border-[1.5px] border-navy px-4 font-sans text-sm font-semibold transition-colors ${
                  on ? "bg-navy text-cream" : "bg-transparent text-navy"
                }`}
              >
                {on && <span aria-hidden="true">✓</span>}
                {label}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Honeypot: hidden from people, irresistible to bots. */}
      <input
        ref={honeypotRef}
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <button
        type="submit"
        disabled={loading}
        aria-busy={loading}
        className="mt-2.5 flex h-[58px] cursor-pointer items-center justify-center gap-2.5 rounded-full border-0 bg-navy font-display text-[15px] font-semibold tracking-[0.02em] text-cream transition-[transform,background-color] hover:bg-navy-deep active:scale-[.98] disabled:cursor-wait disabled:opacity-80"
      >
        {loading ? (
          "Sending…"
        ) : (
          <>
            Keep me posted <span className="text-lg">→</span>
          </>
        )}
      </button>
      {submitError && (
        <p role="alert" className="text-center font-sans text-[13px] leading-[1.4] font-medium text-error">
          {submitError}
        </p>
      )}
      <p className="mt-0.5 text-center font-sans text-xs leading-[1.4] text-muted">
        Launch news only. Unsubscribe anytime.
      </p>
    </form>
  );
}
