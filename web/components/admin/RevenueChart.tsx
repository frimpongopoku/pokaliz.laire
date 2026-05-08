"use client";

import { revenueByDay } from "@/lib/admin-data";

export function RevenueChart() {
  const max = Math.max(...revenueByDay.map((d) => d.amount));

  // Build SVG line path
  const w = 600;
  const h = 120;
  const pad = { top: 10, right: 20, bottom: 24, left: 48 };
  const chartW = w - pad.left - pad.right;
  const chartH = h - pad.top - pad.bottom;

  const points = revenueByDay.map((d, i) => {
    const x = pad.left + (i / (revenueByDay.length - 1)) * chartW;
    const y = pad.top + chartH - (d.amount / max) * chartH;
    return { x, y, ...d };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  const areaPath = [
    `M ${points[0].x} ${pad.top + chartH}`,
    ...points.map((p) => `L ${p.x} ${p.y}`),
    `L ${points[points.length - 1].x} ${pad.top + chartH}`,
    "Z",
  ].join(" ");

  return (
    <div className="bg-[#0F0C13] border border-[#141118] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p
            className="text-[9px] tracking-[0.3em] uppercase text-[#554D60] mb-1"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Revenue
          </p>
          <p
            className="text-2xl font-light text-[#F2ECE4]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            $27,490
            <span className="text-sm text-[#554D60] ml-2 font-sans">this week</span>
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-[#C9A55A]/10 px-3 py-1.5">
          <span className="text-[10px] text-[#C9A55A]" style={{ fontFamily: "var(--font-manrope)" }}>
            ↑ 16.1%
          </span>
          <span className="text-[9px] text-[#554D60]" style={{ fontFamily: "var(--font-manrope)" }}>
            vs last week
          </span>
        </div>
      </div>

      {/* SVG chart */}
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="w-full"
        style={{ height: 120 }}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C9A55A" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#C9A55A" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
          const y = pad.top + chartH * (1 - pct);
          return (
            <g key={pct}>
              <line
                x1={pad.left}
                y1={y}
                x2={w - pad.right}
                y2={y}
                stroke="#1A1620"
                strokeWidth="1"
              />
              <text
                x={pad.left - 6}
                y={y + 4}
                textAnchor="end"
                fontSize="9"
                fill="#2C2438"
                fontFamily="var(--font-manrope)"
              >
                ${Math.round((max * pct) / 1000)}k
              </text>
            </g>
          );
        })}

        {/* Area fill */}
        <path d={areaPath} fill="url(#areaGrad)" />

        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke="#C9A55A"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Data points + labels */}
        {points.map((p) => (
          <g key={p.day}>
            <circle cx={p.x} cy={p.y} r="3" fill="#C9A55A" />
            <circle cx={p.x} cy={p.y} r="6" fill="#C9A55A" fillOpacity="0.1" />
            <text
              x={p.x}
              y={h - 4}
              textAnchor="middle"
              fontSize="9"
              fill="#2C2438"
              fontFamily="var(--font-manrope)"
            >
              {p.day}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
