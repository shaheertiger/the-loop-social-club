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
  submitClass,
  toggleIn,
} from "./formParts";

const ROLES = ["Pickleball coach", "Cricket coach", "Front desk", "Café", "Something else"];

type Status = "closed" | "open" | "loading" | "success";

/** "Work with us" button that opens a short job-interest form. */
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
        className="flex h-14 cursor-pointer items-center gap-2.5 self-start rounded-full border-0 bg-cream px-[26px] font-display text-sm font-semibold text-navy transition-[transform,background-color] hover:bg-white active:scale-[.98]"
      >
        WORK WITH US <span className="text-lg">→</span>
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
        className="font-serif text-[clamp(24px,4vw,32px)] leading-[1.2] text-cream italic outline-none"
      >
        Thanks{firstName ? `, ${firstName}` : ""}. We&rsquo;ll be in touch about joining the team.
      </p>
    );
  }

  const loading = status === "loading";

  return (
    <div className="w-full max-w-[620px] rounded-[28px] bg-cream p-[clamp(24px,4vw,36px)] text-navy">
      <form onSubmit={handleSubmit} noValidate className="m-0 flex flex-col gap-3.5" aria-label="Work with us">
        <label className={labelClass}>
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
            placeholder="First and last"
            autoComplete="name"
            aria-invalid={nameError ? true : undefined}
            aria-describedby={nameError ? "careers-name-error" : undefined}
            className={`h-[54px] ${inputClass} ${nameError ? "border-error" : "border-line"}`}
          />
        </label>
        {nameError && <FieldError id="careers-name-error">{nameError}</FieldError>}

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
            aria-describedby={emailError ? "careers-email-error" : undefined}
            className={`h-[54px] ${inputClass} ${emailError ? "border-error" : "border-line"}`}
          />
        </label>
        {emailError && <FieldError id="careers-email-error">{emailError}</FieldError>}

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
          legend="I’m interested in"
          options={ROLES}
          selected={roles}
          onToggle={(role) => setRoles((r) => toggleIn(r, role))}
        />

        <label className={labelClass}>
          <span>
            About you <span className="font-normal text-muted">(optional)</span>
          </span>
          <textarea
            name="about"
            rows={4}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Experience, certifications, availability…"
            className={`resize-y py-3.5 leading-normal ${inputClass} border-line`}
          />
        </label>

        <Honeypot inputRef={honeypotRef} />

        <button type="submit" disabled={loading} aria-busy={loading} className={submitClass}>
          {loading ? (
            "Sending…"
          ) : (
            <>
              Send <span className="text-lg">→</span>
            </>
          )}
        </button>
        {submitError && <SubmitError>{submitError}</SubmitError>}
      </form>
    </div>
  );
}
