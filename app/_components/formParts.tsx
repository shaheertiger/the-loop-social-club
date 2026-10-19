import type { Ref } from "react";

// Shared styling and pieces for the forms. "light" sits on cream or white,
// "dark" on the navy Founders List card.

export type Tone = "light" | "dark";

const inputBase =
  "w-full rounded-xl border-[1.5px] px-4 font-sans text-base font-medium text-navy-deep outline-none transition-[border-color,box-shadow] placeholder:text-placeholder";

export const inputClass: Record<Tone, string> = {
  light: `${inputBase} bg-white focus:border-navy focus:shadow-[0_0_0_4px_rgba(38,59,86,.12)]`,
  dark: `${inputBase} bg-cream focus:border-orange focus:shadow-[0_0_0_4px_rgba(188,104,58,.35)]`,
};

export const borderClass = (tone: Tone, hasError: boolean) =>
  hasError ? (tone === "dark" ? "border-error-light" : "border-error") : tone === "dark" ? "border-cream" : "border-line";

export const labelClass: Record<Tone, string> = {
  light: "flex flex-col gap-1.5 font-sans text-[13px] leading-none font-semibold text-navy-deep",
  dark: "flex flex-col gap-1.5 font-sans text-[13px] leading-none font-semibold text-cream",
};

export const submitClass: Record<Tone, string> = {
  light:
    "mt-2 flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-full border-0 bg-navy-deep px-5 font-sans text-[15px] font-semibold text-cream transition-[transform,background-color] hover:bg-navy active:scale-[.98] disabled:cursor-wait disabled:opacity-80",
  dark:
    "mt-2 flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-full border-0 bg-cream px-5 font-sans text-[15px] font-semibold text-navy-deep transition-[transform,background-color] hover:bg-white active:scale-[.98] disabled:cursor-wait disabled:opacity-80",
};

export const outlineButtonClass: Record<Tone, string> = {
  light:
    "min-h-11 cursor-pointer rounded-full border-[1.5px] border-navy-deep bg-transparent px-5 font-sans text-sm font-semibold text-navy-deep transition-colors hover:bg-navy-deep hover:text-cream",
  dark:
    "min-h-11 cursor-pointer rounded-full border-[1.5px] border-cream bg-transparent px-5 font-sans text-sm font-semibold text-cream transition-colors hover:bg-cream hover:text-navy-deep",
};

export function FieldError({ id, tone, children }: { id: string; tone: Tone; children: string }) {
  return (
    <p
      id={id}
      className={`-mt-1.5 font-sans text-[13px] leading-[1.4] font-medium ${tone === "dark" ? "text-error-light" : "text-error"}`}
    >
      {children}
    </p>
  );
}

/** Honeypot field: hidden from people, irresistible to bots. */
export function Honeypot({ inputRef }: { inputRef: Ref<HTMLInputElement> }) {
  return (
    <input
      ref={inputRef}
      type="text"
      name="_honey"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      className="hidden"
    />
  );
}

type ChipGroupProps = {
  legend: string;
  options: string[];
  selected: string[];
  onToggle: (option: string) => void;
  tone: Tone;
};

/** Multi-select pills with a checkbox mark, as in the design. */
export function ChipGroup({ legend, options, selected, onToggle, tone }: ChipGroupProps) {
  const dark = tone === "dark";
  return (
    <fieldset className="m-0 mt-1 flex flex-col border-0 p-0">
      <legend className={`mb-2.5 p-0 font-sans text-[13px] leading-none font-semibold ${dark ? "text-cream" : "text-navy-deep"}`}>
        {legend}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((label) => {
          const on = selected.includes(label);
          return (
            <button
              key={label}
              type="button"
              aria-pressed={on}
              onClick={() => onToggle(label)}
              className={`flex min-h-10 cursor-pointer items-center gap-2 rounded-full border-[1.5px] px-3.5 font-sans text-sm font-medium transition-colors ${
                dark
                  ? on
                    ? "border-cream bg-cream text-navy-deep"
                    : "border-cream/35 bg-transparent text-cream hover:border-cream"
                  : on
                    ? "border-navy-deep bg-navy-deep text-cream"
                    : "border-navy-deep/40 bg-transparent text-navy-deep hover:border-navy-deep"
              }`}
            >
              <span
                aria-hidden="true"
                className={`grid size-3.5 flex-none place-items-center rounded-[3px] text-[10px] leading-none ${
                  on ? "bg-orange text-white" : dark ? "border border-cream/70" : "border border-navy-deep/60"
                }`}
              >
                {on ? "✓" : ""}
              </span>
              {label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export const toggleIn = (list: string[], item: string) =>
  list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
