type ImagePlaceholderProps = {
  label: string;
  /** "pill" for fully rounded ends; otherwise a corner radius in px. */
  shape?: "pill" | number;
  tone?: "light" | "dark";
  className?: string;
};

/** Stand-in for photography that hasn't been shot yet. Swap for next/image once it exists. */
export function ImagePlaceholder({ label, shape = 28, tone = "light", className = "" }: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      style={{ borderRadius: shape === "pill" ? 9999 : shape }}
      className={`flex size-full items-center justify-center p-6 text-center text-sm ${
        tone === "dark" ? "bg-cream/10 text-mist" : "bg-navy/8 text-slate"
      } ${className}`}
    >
      {label}
    </div>
  );
}
