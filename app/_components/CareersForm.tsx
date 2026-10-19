"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { site } from "../_lib/site";
import { EMAIL_RE, submitLeadInBackground, thankYouUrl } from "../_lib/submitLead";
import { markSubmitted, useAlreadySubmitted } from "../_lib/submitted";
import {
  ChipGroup,
  FieldError,
  Honeypot,
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

type Status = "closed" | "open" | "loading";

/** "See open roles" button that opens a short job-interest form. */
export function CareersForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("closed");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [roles, setRoles] = useState<string[]>([]);
  const [about, setAbout] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const honeypotRef = useRef<HTMLInputElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const alreadySubmitted = useAlreadySubmitted("careers");

  useEffect(() => {
    if (status === "open") firstFieldRef.current?.focus();
  }, [status]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    const nameOk = name.trim() !== "";
    const emailOk = EMAIL_RE.test(email.trim());
    setNameError(nameOk ? "" : "Please enter your name.");
    setEmailError(emailOk ? "" : "Please enter a valid email address.");
    if (!nameOk || !emailOk) return;
    setStatus("loading");
    const firstName = name.trim().split(/\s+/)[0];

    if (honeypotRef.current?.value) {
      router.push(thankYouUrl("careers", firstName));
      return;
    }

    const fields = {
      list: "Join our team",
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      roles: roles.join(", "),
      about: about.trim(),
    };

    // Deliver in the background and show the thank-you page straight away.
    submitLeadInBackground("careers", fields);
    markSubmitted("careers");
    router.push(thankYouUrl("careers", firstName));
  }

  if (alreadySubmitted && status !== "loading") {
    return (
      <p className="basis-full text-base leading-[1.5] text-navy-deep md:basis-auto">
        Thanks, we&rsquo;ve got your details and will be in touch. To update them, email{" "}
        <a href={`mailto:${site.email}`} className="underline">
          {site.email}
        </a>
        .
      </p>
    );
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
        </div>
      </form>
    </div>
  );
}
