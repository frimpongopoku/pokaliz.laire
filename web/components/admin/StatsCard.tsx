interface StatsCardProps {
  label: string;
  value: string;
  change: number;
  unit?: string;
  icon?: React.ReactNode;
  accent?: string;
}

export function StatsCard({ label, value, change, icon, accent = "#C9A55A" }: StatsCardProps) {
  const positive = change >= 0;

  return (
    <div className="bg-[#0F0C13] border border-[#141118] p-6 hover:border-[#2C2438] transition-colors duration-300">
      <div className="flex items-start justify-between mb-4">
        <p
          className="text-[9px] tracking-[0.3em] uppercase text-[#554D60]"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          {label}
        </p>
        {icon && (
          <div
            className="w-7 h-7 flex items-center justify-center opacity-30"
            style={{ color: accent }}
          >
            {icon}
          </div>
        )}
      </div>

      <p
        className="font-light text-3xl text-[#F2ECE4] leading-none mb-3"
        style={{ fontFamily: "var(--font-cormorant)", color: undefined }}
      >
        {value}
      </p>

      <div className="flex items-center gap-1.5">
        <span
          className={`text-[10px] font-medium ${positive ? "text-emerald-500" : "text-rose-500"}`}
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          {positive ? "↑" : "↓"} {Math.abs(change)}%
        </span>
        <span
          className="text-[9px] text-[#2C2438]"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          vs last month
        </span>
      </div>

      {/* Mini sparkline bar */}
      <div className="mt-4 h-1 bg-[#141118] w-full">
        <div
          className="h-full transition-all duration-700"
          style={{
            width: `${Math.min(100, 40 + change * 2)}%`,
            backgroundColor: positive ? accent : "#554D60",
          }}
        />
      </div>
    </div>
  );
}
