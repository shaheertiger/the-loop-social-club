import { LoopArt } from "./LoopArt";

/** Hero panel: a pickleball court seen from above, with the orange ball travelling the loop. */
export function HeroVisual() {
  return (
    <div
      aria-hidden="true"
      className="relative h-full min-h-[300px] overflow-hidden rounded-[28px] border border-cream/15 bg-navy-deep/45"
    >
      <svg viewBox="0 0 400 520" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
        <g fill="none" stroke="currentColor" strokeWidth="2" className="text-cream/15">
          <rect x="70" y="40" width="260" height="440" rx="4" />
          <line x1="70" y1="260" x2="330" y2="260" strokeWidth="4" />
          <line x1="70" y1="190" x2="330" y2="190" />
          <line x1="70" y1="330" x2="330" y2="330" />
          <line x1="200" y1="40" x2="200" y2="190" />
          <line x1="200" y1="330" x2="200" y2="480" />
        </g>
      </svg>
      <div className="absolute inset-x-[4%] top-[18%] h-[52%]">
        <LoopArt />
      </div>
      <p className="absolute right-5 bottom-5 left-5 text-sm leading-snug text-mist">
        6 indoor courts · cricket lanes · café · event space
      </p>
    </div>
  );
}
