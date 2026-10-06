const REPEATS = 8;

type MarqueeProps = {
  words: string[];
  className?: string;
};

/** Infinitely scrolling band of words, alternating solid and outlined. */
export function Marquee({ words, className = "" }: MarqueeProps) {
  const items = Array.from({ length: REPEATS }, (_, i) =>
    words.map((word, j) => (
      <span
        key={`${i}-${j}`}
        className="flex items-center gap-7 pr-7 font-display leading-none font-extrabold tracking-[-0.01em] whitespace-nowrap"
        style={
          j % 2
            ? { color: "transparent", WebkitTextStroke: "1.5px var(--color-cream)" }
            : { color: "var(--color-cream)" }
        }
      >
        {word}
        <span className="size-3 flex-none rounded-full bg-cream" />
      </span>
    )),
  );

  return (
    <div aria-hidden="true" className={`flex w-max animate-ls-marquee ${className}`}>
      {items}
    </div>
  );
}
