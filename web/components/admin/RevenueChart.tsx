"use client";

import { revenueByDay } from "@/lib/admin-data";

export function RevenueChart() {
  const max = Math.max(...revenueByDay.map((d) => d.amount));

  const w = 600;
  const h = 130;
  const pad = { top: 12, right: 20, bottom: 28, left: 52 };
  const chartW = w - pad.left - pad.right;
  const chartH = h - pad.top - pad.bottom;

  const points = revenueByDay.map((d, i) => ({
    x: pad.left + (i / (revenueByDay.length - 1)) * chartW,
    y: pad.top + chartH - (d.amount / max) * chartH,
    ...d,
  }));

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  const areaPath = [
    `M ${points[0].x} ${pad.top + chartH}`,
    ...points.map((p) => `L ${p.x} ${p.y}`),
    `L ${points[points.length - 1].x} ${pad.top + chartH}`,
    "Z",
  ].join(" ");

  return (
    <div className="bg-[#110E16] border border-[#1C1828] p-5">
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378] mb-1">
            Revenue — Last 7 Days
          </p>
          <p className="text-[26px] font-bold text-[#E8E0F0] leading-none tracking-tight">
            $27,490
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-1.5 rounded-sm">
          <span className="text-[11px] font-semibold text-emerald-400">↑ 16.1%</span>
          <span className="text-[11px] text-[#4D4560]">vs last week</span>
        </div>
      </div>

      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height: 130 }} preserveAspectRatio="none">
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C9A55A" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#C9A55A" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
          const y = pad.top + chartH * (1 - pct);
          return (
            <g key={pct}>
              <line x1={pad.left} y1={y} x2={w - pad.right} y2={y} stroke="#1C1828" strokeWidth="1" />
              <text x={pad.left - 8} y={y + 4} textAnchor="end" fontSize="10" fill="#3D3550" fontFamily="var(--font-jakarta)">
                ${Math.round((max * pct) / 1000)}k
              </text>
            </g>
          );
        })}

        <path d={areaPath} fill="url(#areaGrad)" />
        <path d={linePath} fill="none" stroke="#C9A55A" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />

        {points.map((p) => (
          <g key={p.day}>
            <circle cx={p.x} cy={p.y} r="3.5" fill="#C9A55A" />
            <circle cx={p.x} cy={p.y} r="7" fill="#C9A55A" fillOpacity="0.1" />
            <text x={p.x} y={h - 6} textAnchor="middle" fontSize="10" fill="#6B6378" fontFamily="var(--font-jakarta)" fontWeight="500">
              {p.day}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
