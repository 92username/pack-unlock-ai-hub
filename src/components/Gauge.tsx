
import React from "react";

type GaugeProps = {
  value: number;
  goal: number;
};

const SEGMENT_COLORS = [
  "#f87171", // Red
  "#fb923c", // Orange
  "#facc15", // Yellow
  "#a3e635", // Lime
  "#4ade80"  // Green
];

const SEGMENT_COUNT = SEGMENT_COLORS.length;
const START_ANGLE = -110;
const END_ANGLE = 110;
const TOTAL_ANGLE = END_ANGLE - START_ANGLE;

export default function Gauge({ value, goal }: GaugeProps) {
  const percent = Math.min(100, Math.max(0, Math.round((value / goal) * 100)));
  const angle = (percent / 100) * TOTAL_ANGLE + START_ANGLE;

  // Render each segment as an arc
  const segmentArcs = Array.from({ length: SEGMENT_COUNT }, (_, i) => {
    const anglePerSegment = TOTAL_ANGLE / SEGMENT_COUNT;
    const segStart = START_ANGLE + i * anglePerSegment;
    const segEnd = segStart + anglePerSegment;
    return (
      <path
        key={i}
        d={describeArc(104, 100, 88, segStart, segEnd)}
        stroke={SEGMENT_COLORS[i]}
        strokeWidth="20"
        fill="none"
        strokeLinecap="round"
      />
    );
  });

  return (
    <div className="flex flex-col items-center w-full mb-7">
      <div className="relative w-52 h-28 select-none">
        <svg width="100%" height="100%" viewBox="0 0 208 112">
          {/* Segments */}
          {segmentArcs}
          {/* Needle */}
          <g style={{
            transition: "transform 0.6s cubic-bezier(.5,1.6,.6,1)",
            transform: `rotate(${angle}deg)`,
            transformOrigin: "104px 100px"
          }}>
            <rect x="102" y="20" width="4" height="85" rx="2" fill="#1e293b" />
            <circle cx="104" cy="102" r="10" fill="#1e293b" stroke="#fff" strokeWidth="3" />
          </g>
          {/* Value Label */}
          <text x="104" y="65" textAnchor="middle" fill="#1e293b" fontSize="22" fontWeight="bold">
            ${value.toLocaleString()}
          </text>
        </svg>
      </div>
      <span className="text-sm text-muted-foreground mt-3">
        Progress toward ${goal.toLocaleString()} goal
      </span>
    </div>
  );
}

// describeArc helper
function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  var start = polarToCartesian(cx, cy, r, endAngle);
  var end = polarToCartesian(cx, cy, r, startAngle);
  var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return [
    "M", start.x, start.y,
    "A", r, r, 0, largeArcFlag, 0, end.x, end.y
  ].join(" ");
}

function polarToCartesian(cx: number, cy: number, r: number, a: number) {
  var rad = ((a - 90) * Math.PI) / 180.0;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad)
  };
}
