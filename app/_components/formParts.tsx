import type { Ref } from "react";

// Shared styling and pieces for the cream form cards.

export const inputClass =
  "rounded-[14px] border-[1.5px] bg-white px-4 font-sans text-base font-medium text-navy outline-none transition-[border-color,box-shadow] placeholder:text-placeholder focus:border-navy focus:shadow-[0_0_0_4px_rgba(39,61,87,.12)]";
export const labelClass = "flex flex-col gap-1.5 font-sans text-[13px] leading-none font-semibold";
export const submitClass =
  "mt-2.5 flex h-[58px] cursor-pointer items-center justify-center gap-2.5 rounded-full border-0 bg-navy font-display text-[15px] font-semibold tracking-[0.02em] text-cream transition-[transform,background-color] hover:bg-navy-deep active:scale-[.98] disabled:cursor-wait disabled:opacity-80";
export const outlineButtonClass =
  "min-h-11 cursor-pointer rounded-full border-[1.5px] border-navy bg-transparent px-[18px] font-sans text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-cream";

export function FieldError({ id, children }: { id: string; children: string }) {
  return (
    <p id={id} className="-mt-1.5 font-sans text-[13px] leading-[1.4] font-medium text-error">
      {children}
    </p>
  );
}

export function SubmitError({ children }: { children: string }) {
  return (
    <p role="alert" className="text-center font-sans text-[13px] leading-[1.4] font-medium text-error">
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
};

/** Multi-select pill buttons. */
export function ChipGroup({ legend, options, selected, onToggle }: ChipGroupProps) {
  return (
    <fieldset className="m-0 mt-1 flex flex-col gap-2.5 border-0 p-0">
      <legend className="mb-2.5 p-0 font-sans text-[13px] leading-none font-semibold">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((label) => {
          const on = selected.includes(label);
          return (
            <button
              key={label}
              type="button"
              aria-pressed={on}
              onClick={() => onToggle(label)}
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
  );
}

export const toggleIn = (list: string[], item: string) =>
  list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
