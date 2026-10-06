"use client";

import { useReducedMotion } from "../_lib/useReducedMotion";
import { PickleballShapes } from "./PickleballIcon";

const LOOP_PATH =
  "M-30 250 C 90 250 170 215 225 160 C 285 100 300 30 245 25 C 190 20 175 115 240 175 C 310 240 450 250 640 110";

/** Decorative loop line that draws in, with a pickleball travelling along it. */
export function LoopArt() {
  // SMIL motion can't be stopped from CSS, so park the ball when motion is reduced.
  const reducedMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 600 300"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className="size-full overflow-visible"
    >
      <path
        d={LOOP_PATH}
        fill="none"
        stroke="var(--color-cream)"
        strokeOpacity={0.16}
        strokeWidth={14}
        strokeLinecap="round"
        className="animate-ls-draw"
      />
      {reducedMotion ? (
        <g transform="translate(245 25)">
          <PickleballShapes />
        </g>
      ) : (
        // Hidden until the motion begins, otherwise it sits at the SVG origin.
        <g opacity={0}>
          <set attributeName="opacity" to="1" begin="1.2s" />
          <animateMotion
            dur="9s"
            repeatCount="indefinite"
            path={LOOP_PATH}
            begin="1.2s"
            keyPoints="0;1"
            keyTimes="0;1"
            calcMode="spline"
            keySplines=".45 0 .55 1"
          />
          <PickleballShapes />
        </g>
      )}
    </svg>
  );
}
