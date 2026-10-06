const HOLES: [number, number][] = [
  [0, 0],
  [0, -8],
  [0, 8],
  [-7.5, -4],
  [7.5, -4],
  [-7.5, 4],
  [7.5, 4],
];

/** Ball shapes in a -16..16 coordinate space, for use inside another SVG. */
export function PickleballShapes() {
  return (
    <>
      <circle r={14} className="fill-cream" />
      {HOLES.map(([cx, cy]) => (
        <circle key={`${cx},${cy}`} cx={cx} cy={cy} r={2.3} className="fill-navy" />
      ))}
    </>
  );
}

export function PickleballIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-16 -16 32 32"
      aria-hidden="true"
      className={className}
      style={{ overflow: "visible" }}
    >
      <PickleballShapes />
    </svg>
  );
}
