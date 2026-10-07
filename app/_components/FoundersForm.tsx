"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { EMAIL_RE, submitLead } from "../_lib/submitLead";
import {
  ChipGroup,
  FieldError,
  Honeypot,
  SubmitError,
  inputClass,
  labelClass,
  outlineButtonClass,
  submitClass,
  toggleIn,
} from "./formParts";
import { PickleballIcon } from "./PickleballIcon";

const INTERESTS = ["Pickleball", "Cricket", "The Café", "Events & gatherings"];

type Status = "idle" | "loading" | "success";

/** Founding Memberships section: collects names and emails for the Founders List. */
export function FoundersForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [picks, setPicks] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const honeypotRef = useRef<HTMLInputElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (status === "success") successHeadingRef.current?.focus();
  }, [status]);

  const reset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setPicks([]);
    setNameError("");
    setEmailError("");
    setSubmitError("");
    setStatus("idle");
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    const nameOk = name.trim() !== "";
    const emailOk = EMAIL_RE.test(email.trim());
    setNameError(nameOk ? "" : "Please enter your name.");
    setEmailError(emailOk ? "" : "Please enter a valid email address.");
    if (!nameOk || !emailOk) return;
    setSubmitError("");

    // Bots fill the hidden field; quietly pretend it worked.
    if (honeypotRef.current?.value) {
      setStatus("success");
      return;
    }

    setStatus("loading");
    try {
      await submitLead("New Founders List signup — Loop Social", {
        list: "Founders List",
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        interests: picks.join(", "),
      });
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
          You&rsquo;re on the Founders List{firstName ? `, ${firstName}` : ""}.
        </h2>
        <p className="font-sans text-base leading-[1.55] text-pretty text-slate">
          We&rsquo;ll email <strong className="text-navy">{email.trim()}</strong> first with founding
          membership details, opening-week bookings and launch events.
        </p>
        <button type="button" onClick={reset} className={`mt-2 ${outlineButtonClass}`}>
          Add another person
        </button>
      </div>
    );
  }

  const loading = status === "loading";

  return (
    <form onSubmit={handleSubmit} noValidate className="m-0 flex flex-col gap-3.5">
      <div className="mb-1.5 flex flex-col gap-2">
        <p className="font-display text-[11px] leading-[1.4] font-semibold tracking-[0.18em] text-slate">
          FOUNDING MEMBERSHIPS
        </p>
        <h2 className="font-display text-[clamp(24px,4.5vw,30px)] leading-[1.08] font-extrabold tracking-[-0.03em] text-balance">
          Be one of the first inside The Loop.
        </h2>
        <p className="font-sans text-[15px] leading-normal text-pretty text-slate">
          Join our Founders List for priority access to memberships, opening-week bookings, launch
          events and exclusive founding-member perks.
        </p>
      </div>

      <label className={labelClass}>
        Your name
        <input
          name="name"
          required
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setNameError("");
          }}
          placeholder="First and last"
          autoComplete="name"
          aria-invalid={nameError ? true : undefined}
          aria-describedby={nameError ? "founders-name-error" : undefined}
          className={`h-[54px] ${inputClass} ${nameError ? "border-error" : "border-line"}`}
        />
      </label>
      {nameError && <FieldError id="founders-name-error">{nameError}</FieldError>}

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
          aria-describedby={emailError ? "founders-email-error" : undefined}
          className={`h-[54px] ${inputClass} ${emailError ? "border-error" : "border-line"}`}
        />
      </label>
      {emailError && <FieldError id="founders-email-error">{emailError}</FieldError>}

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
          className={`h-[54px] ${inputClass} border-line`}
        />
      </label>

      <ChipGroup
        legend="I’m most excited for"
        options={INTERESTS}
        selected={picks}
        onToggle={(label) => setPicks((p) => toggleIn(p, label))}
      />

      <Honeypot inputRef={honeypotRef} />

      <button type="submit" disabled={loading} aria-busy={loading} className={submitClass}>
        {loading ? (
          "Sending…"
        ) : (
          <>
            Join the Founders List <span className="text-lg">→</span>
          </>
        )}
      </button>
      {submitError && <SubmitError>{submitError}</SubmitError>}
      <p className="mt-0.5 text-center font-sans text-xs leading-[1.4] text-muted">
        Membership packages coming soon. Unsubscribe anytime.
      </p>
    </form>
  );
}
