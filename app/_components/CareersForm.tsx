"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
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

const ROLES = ["Pickleball coach", "Cricket coach", "Front desk", "Café crew", "Event host", "Something else"];

const tone = "light";
const input = (hasError: boolean) => `h-12 ${inputClass[tone]} ${borderClass(tone, hasError)}`;

type Status = "closed" | "open" | "loading" | "success";

/** "See open roles" button that opens a short job-interest form. */
export function CareersForm() {
  const [status, setStatus] = useState<Status>("closed");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [roles, setRoles] = useState<string[]>([]);
  const [about, setAbout] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const honeypotRef = useRef<HTMLInputElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (status === "open") firstFieldRef.current?.focus();
    if (status === "success") successRef.current?.focus();
  }, [status]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    const nameOk = name.trim() !== "";
    const emailOk = EMAIL_RE.test(email.trim());
    setNameError(nameOk ? "" : "Please enter your name.");
    setEmailError(emailOk ? "" : "Please enter a valid email address.");
    if (!nameOk || !emailOk) return;
    setSubmitError("");

    if (honeypotRef.current?.value) {
      setStatus("success");
      return;
    }

    setStatus("loading");
    try {
      await submitLead("New job interest — Loop Social", {
        list: "Join our team",
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        roles: roles.join(", "),
        about: about.trim(),
      });
      setStatus("success");
    } catch {
      setStatus("open");
      setSubmitError("Something went wrong. Please try again in a moment.");
    }
  }

  if (status === "closed") {
    return (
      <button
        type="button"
        onClick={() => setStatus("open")}
        aria-expanded={false}
        className={`self-start whitespace-nowrap md:self-center ${outlineButtonClass[tone]}`}
      >
        See open roles
      </button>
    );
  }

  if (status === "success") {
    const firstName = name.trim().split(/\s+/)[0];
    return (
      <p
        ref={successRef}
        tabIndex={-1}
        aria-live="polite"
        className="basis-full font-display text-xl leading-[1.3] font-bold text-navy-deep outline-none"
      >
        Thanks{firstName ? `, ${firstName}` : ""}. We&rsquo;ll be in touch about joining the team.
      </p>
    );
  }

  const loading = status === "loading";

  return (
    <div className="basis-full rounded-3xl bg-white p-[clamp(20px,4vw,32px)] shadow-[0_12px_40px_-24px_rgba(20,37,57,.45)]">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="m-0 grid grid-cols-1 gap-4 md:grid-cols-2"
        aria-label="Apply to join the team"
      >
        <div className="flex flex-col gap-1.5">
          <label className={labelClass[tone]}>
            Your name
            <input
              ref={firstFieldRef}
              name="name"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameError("");
              }}
              autoComplete="name"
              aria-invalid={nameError ? true : undefined}
              aria-describedby={nameError ? "careers-name-error" : undefined}
              className={input(!!nameError)}
            />
          </label>
          {nameError && (
            <FieldError id="careers-name-error" tone={tone}>
              {nameError}
            </FieldError>
          )}
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
                setEmailError("");
              }}
              autoComplete="email"
              inputMode="email"
              aria-invalid={emailError ? true : undefined}
              aria-describedby={emailError ? "careers-email-error" : undefined}
              className={input(!!emailError)}
            />
          </label>
          {emailError && (
            <FieldError id="careers-email-error" tone={tone}>
              {emailError}
            </FieldError>
          )}
        </div>

        <label className={labelClass[tone]}>
          <span>
            Phone <span className="font-normal text-muted">(optional)</span>
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

        <div className="md:col-span-2">
          <ChipGroup
            legend="I’m interested in"
            options={ROLES}
            selected={roles}
            onToggle={(role) => setRoles((r) => toggleIn(r, role))}
            tone={tone}
          />
        </div>

        <label className={`md:col-span-2 ${labelClass[tone]}`}>
          <span>
            About you <span className="font-normal text-muted">(optional)</span>
          </span>
          <textarea
            name="about"
            rows={4}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Experience, certifications, availability…"
            className={`resize-y py-3 leading-normal ${inputClass[tone]} ${borderClass(tone, false)}`}
          />
        </label>

        <Honeypot inputRef={honeypotRef} />

        <div className="flex flex-col gap-3 md:col-span-2">
          <button type="submit" disabled={loading} aria-busy={loading} className={`md:max-w-[280px] ${submitClass[tone]}`}>
            {loading ? "Sending…" : "Send application"}
          </button>
          {submitError && <SubmitError tone={tone}>{submitError}</SubmitError>}
        </div>
      </form>
    </div>
  );
}
