"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { site } from "../_lib/site";
import { EMAIL_RE, submitLead } from "../_lib/submitLead";
import {
  ChipGroup,
  FieldError,
  Honeypot,
  SubmitError,
  borderClass,
  inputClass,
  labelClass,
  outlineButtonClass,
  submitClass,
  toggleIn,
} from "./formParts";
import { PickleballIcon } from "./PickleballIcon";

const INTERESTS = ["Pickleball", "Cricket", "The Café", "Leagues", "Kids & youth", "Events"];
const LEVELS = [
  "Never played, keen to learn",
  "Beginner",
  "Intermediate",
  "Advanced",
  "Competitive / tournament player",
  "Just here for the café & events",
];

const tone = "dark";
const SELECT_ARROW = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%23142539' stroke-width='1.8'/%3E%3C/svg%3E\")",
  backgroundSize: "12px 8px",
  backgroundPosition: "right 16px center",
};
const input = (hasError: boolean) => `h-12 ${inputClass[tone]} ${borderClass(tone, hasError)}`;

type Status = "idle" | "loading" | "success";

/** The Founders List sign-up card (dark), from the Coming Soon design. */
export function FoundersForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [postal, setPostal] = useState("");
  const [picks, setPicks] = useState<string[]>([]);
  const [level, setLevel] = useState(LEVELS[0]);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<{ firstName?: string; email?: string; consent?: string }>({});
  const [submitError, setSubmitError] = useState("");
  const honeypotRef = useRef<HTMLInputElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (status === "success") successHeadingRef.current?.focus();
  }, [status]);

  const reset = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setPostal("");
    setPicks([]);
    setLevel(LEVELS[0]);
    setConsent(false);
    setErrors({});
    setSubmitError("");
    setStatus("idle");
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    const next = {
      firstName: firstName.trim() ? undefined : "Please enter your first name.",
      email: EMAIL_RE.test(email.trim()) ? undefined : "Please enter a valid email address.",
      consent: consent ? undefined : "Please tick the box so we can email you.",
    };
    setErrors(next);
    if (next.firstName || next.email || next.consent) return;
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
        name: `${firstName.trim()} ${lastName.trim()}`.trim(),
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        postal_code: postal.trim().toUpperCase(),
        interests: picks.join(", "),
        level,
        consent: "Yes: email (and text, if a number was given) about launch news, founding offers and events",
      });
      setStatus("success");
    } catch {
      setStatus("idle");
      setSubmitError("Something went wrong. Please try again in a moment.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 py-2" aria-live="polite">
        <PickleballIcon size={56} className="animate-ls-pop" />
        <h3
          ref={successHeadingRef}
          tabIndex={-1}
          className="font-display text-[clamp(26px,4vw,32px)] leading-[1.05] font-extrabold tracking-[-0.02em] text-cream outline-none"
        >
          You&rsquo;re on the Founders List{firstName.trim() ? `, ${firstName.trim()}` : ""}.
        </h3>
        <p className="text-base leading-[1.55] text-pretty text-mist">
          We&rsquo;ll email <strong className="text-cream">{email.trim()}</strong> first with founding
          membership details, opening-week bookings and launch events.
        </p>
        <button type="button" onClick={reset} className={`mt-1 ${outlineButtonClass[tone]}`}>
          Add another person
        </button>
      </div>
    );
  }

  const loading = status === "loading";

  return (
    <form onSubmit={handleSubmit} noValidate className="m-0 flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <h3 className="font-display text-[clamp(24px,3.4vw,30px)] leading-[1.1] font-extrabold tracking-[-0.02em] text-cream">
          Join the Founders List
        </h3>
        <p className="text-sm text-mist">Free, takes 20 seconds.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className={labelClass[tone]}>
            First name
            <input
              name="first_name"
              required
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                setErrors((x) => ({ ...x, firstName: undefined }));
              }}
              autoComplete="given-name"
              aria-invalid={errors.firstName ? true : undefined}
              aria-describedby={errors.firstName ? "founders-first-error" : undefined}
              className={input(!!errors.firstName)}
            />
          </label>
          {errors.firstName && (
            <FieldError id="founders-first-error" tone={tone}>
              {errors.firstName}
            </FieldError>
          )}
        </div>
        <label className={labelClass[tone]}>
          Last name
          <input
            name="last_name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            autoComplete="family-name"
            className={input(false)}
          />
        </label>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass[tone]}>
          Email
          <input
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((x) => ({ ...x, email: undefined }));
            }}
            autoComplete="email"
            inputMode="email"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "founders-email-error" : undefined}
            className={input(!!errors.email)}
          />
        </label>
        {errors.email && (
          <FieldError id="founders-email-error" tone={tone}>
            {errors.email}
          </FieldError>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2">
        <label className={labelClass[tone]}>
          <span>
            Phone <span className="font-normal text-mist">(optional)</span>
          </span>
          <input
            name="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
            inputMode="tel"
            className={input(false)}
          />
        </label>
        <label className={labelClass[tone]}>
          Postal code
          <input
            name="postal_code"
            value={postal}
            onChange={(e) => setPostal(e.target.value)}
            autoComplete="postal-code"
            maxLength={7}
            className={`${input(false)} uppercase`}
          />
        </label>
      </div>

      <ChipGroup
        legend="I’m most excited for"
        options={INTERESTS}
        selected={picks}
        onToggle={(label) => setPicks((p) => toggleIn(p, label))}
        tone={tone}
      />

      <label className={labelClass[tone]}>
        My level
        <select
          name="level"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className={`${input(false)} cursor-pointer appearance-none bg-no-repeat pr-10 text-[15px]`}
          style={SELECT_ARROW}
        >
          {LEVELS.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
      </label>

      <div className="flex flex-col gap-1.5">
        <label className="flex cursor-pointer items-start gap-3 text-[13px] leading-[1.5] text-mist">
          <input
            type="checkbox"
            name="consent"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              setErrors((x) => ({ ...x, consent: undefined }));
            }}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "founders-consent-error" : undefined}
            className="mt-0.5 size-4 flex-none cursor-pointer accent-orange"
          />
          Yes, Loop Social may email (and text, if I gave a number) me launch news, founding offers and
          events. I can unsubscribe anytime.
        </label>
        {errors.consent && (
          <FieldError id="founders-consent-error" tone={tone}>
            {errors.consent}
          </FieldError>
        )}
      </div>

      <Honeypot inputRef={honeypotRef} />

      <button type="submit" disabled={loading} aria-busy={loading} className={submitClass[tone]}>
        {loading ? "Sending…" : "Claim my founding spot"}
      </button>
      {submitError && <SubmitError tone={tone}>{submitError}</SubmitError>}
      <p className="text-center text-xs text-mist">
        Loop Social · South Ajax, ON ·{" "}
        <a href={`mailto:${site.email}`} className="text-cream underline">
          {site.email}
        </a>
      </p>
    </form>
  );
}
