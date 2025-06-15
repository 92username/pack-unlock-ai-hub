
import React from "react";

type GaugeProps = {
  value: number; // current unlocked value
  goal: number; // maximum (for 100%)
};

export default function Gauge({ value, goal }: GaugeProps) {
  // Compute percent, clamp between 0 and 100
  const percent = Math.min(100, Math.round((value / goal) * 100));
  // Gauge arc: from -110deg to +110deg (220deg)
  const angle = (percent / 100) * 220 - 110;

  // Gauge needle animation: use inline SVG/transform
  return (
    <div className="flex flex-col items-center w-full mb-7">
      <div className="relative w-52 h-28 select-none">
        <svg width="100%" height="100%" viewBox="0 0 208 112">
          {/* Background Arc */}
          <path
            d="M20 100 A88 88 0 0 1 188 100"
            stroke="#e5e7eb"
            strokeWidth="20"
            fill="none"
          />
          {/* Progress Arc */}
          <path
            d={describeArc(104, 100, 88, -110, angle)}
            stroke="#7c3aed"
            strokeWidth="20"
            fill="none"
            style={{ transition: "stroke-dasharray 0.5s, stroke-dashoffset 0.5s" }}
          />
          {/* Needle */}
          <g style={{ transition: "transform 0.6s cubic-bezier(.5,1.6,.6,1);", transform: `rotate(${angle}deg)`, transformOrigin: "104px 100px" }}>
            <rect x="102" y="20" width="4" height="85" rx="2" fill="#4f46e5" />
            <circle cx="104" cy="102" r="10" fill="#7c3aed" stroke="#fff" strokeWidth="3" />
          </g>
          {/* Center Value Label */}
          <text x="104" y="65" textAnchor="middle" fill="#1e293b" fontSize="22" fontWeight="bold">${value}</text>
        </svg>
        {/* Labels */}
        <div className="absolute left-0 top-[94px] w-full flex justify-between px-2 text-xs font-medium text-slate-400 select-none pointer-events-none">
          <span>0%</span>
          <span className="ml-3">25%</span>
          <span className="mx-auto">50%</span>
          <span className="mr-3">75%</span>
          <span>100%</span>
        </div>
      </div>
      <span className="text-sm text-muted-foreground mt-3">Progress toward $5508 goal</span>
    </div>
  );
}

// describeArc helper: polar to arc path for SVGs
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
