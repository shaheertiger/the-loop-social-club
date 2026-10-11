// Line icons and spot illustrations used on the Coming Soon page.
// Navy strokes with the brand orange as the accent.

type IconProps = { className?: string };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function UsersIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...stroke}>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5" />
      <path d="M16 4.8a3.3 3.3 0 0 1 0 6.4M18 14.8c2 .7 3.2 2.4 3.5 5.2" />
    </svg>
  );
}

export function BoltIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...stroke}>
      <path d="M13 2.5 4.5 13.5H12l-1 8 8.5-11H12l1-8Z" />
    </svg>
  );
}

export function HeartIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...stroke}>
      <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20Z" />
    </svg>
  );
}

/** Small pickleball (orange, cream holes) for use inside the illustrations. */
function Ball({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const h = r * 0.17;
  const d = r * 0.5;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} className="fill-orange" />
      {[
        [0, 0],
        [0, -d],
        [0, d],
        [-d * 0.9, -d * 0.5],
        [d * 0.9, -d * 0.5],
        [-d * 0.9, d * 0.5],
        [d * 0.9, d * 0.5],
      ].map(([x, y]) => (
        <circle key={`${x},${y}`} cx={cx + x} cy={cy + y} r={h} className="fill-cream" />
      ))}
    </g>
  );
}

const art = { ...stroke, strokeWidth: 3 };

export function PickleballArt({ className }: IconProps) {
  return (
    <svg viewBox="0 0 160 120" aria-hidden="true" className={className}>
      <g {...art} className="text-navy-deep">
        <ellipse cx="66" cy="54" rx="24" ry="28" transform="rotate(-25 66 54)" />
        <path d="M78 77 92 101" />
        <path d="M86 92l11-6" />
      </g>
      <Ball cx={112} cy={36} r={13} />
      <path d="M100 44c-6 6-10 6-15 4" {...stroke} strokeDasharray="2 5" className="text-navy-deep" />
    </svg>
  );
}

export function CricketArt({ className }: IconProps) {
  return (
    <svg viewBox="0 0 160 120" aria-hidden="true" className={className}>
      <g {...art} className="text-navy-deep">
        {/* stumps and bails */}
        <path d="M58 40v56M70 40v56M82 40v56" />
        <path d="M55 37h14M69 37h16" />
        {/* bat */}
        <path d="M108 28 96 70a6 6 0 0 0 11 3l12-42" />
        <path d="M112 30l5-14" />
      </g>
      <circle cx="122" cy="88" r="9" className="fill-orange" />
      <path d="M115 84c4 2 9 3 14 0" {...stroke} className="text-cream" />
    </svg>
  );
}

export function CafeArt({ className }: IconProps) {
  return (
    <svg viewBox="0 0 160 120" aria-hidden="true" className={className}>
      <g {...art} className="text-navy-deep">
        <path d="M50 52h52l-5 40a6 6 0 0 1-6 5H61a6 6 0 0 1-6-5l-5-40Z" />
        <path d="M102 60h6a10 10 0 0 1 0 20h-8" />
        <path d="M42 104h76" />
      </g>
      <g {...stroke} strokeWidth={3} className="text-orange">
        <path d="M66 42c-4-5 4-8 0-14M78 42c-4-5 4-8 0-14M90 42c-4-5 4-8 0-14" />
      </g>
    </svg>
  );
}

export function EventsArt({ className }: IconProps) {
  return (
    <svg viewBox="0 0 160 120" aria-hidden="true" className={className}>
      <g {...art} className="text-navy-deep">
        {/* party popper */}
        <path d="M46 98 66 48l34 34-54 16Z" />
        <path d="M56 74l12 12" />
      </g>
      <g {...stroke} strokeWidth={3} className="text-orange">
        <path d="M86 40c6-8 14-6 16-14M104 58c8-2 12 4 20 0M96 30l4-10M118 40l10-4" />
      </g>
      <circle cx="112" cy="28" r="4" className="fill-orange" />
      <circle cx="122" cy="62" r="3" className="fill-navy-deep" />
      <circle cx="80" cy="24" r="3" className="fill-navy-deep" />
    </svg>
  );
}
