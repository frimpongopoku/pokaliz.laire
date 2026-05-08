interface StatsCardProps {
  label: string;
  value: string;
  change: number;
  icon?: React.ReactNode;
  accent?: string;
}

export function StatsCard({ label, value, change, icon, accent = "#C9A55A" }: StatsCardProps) {
  const positive = change >= 0;

  return (
    <div className="bg-[#110E16] border border-[#1C1828] p-5 hover:border-[#2C2438] transition-colors duration-200">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378]">
          {label}
        </p>
        {icon && (
          <div className="text-[#3D3550]">{icon}</div>
        )}
      </div>

      <p className="text-[26px] font-bold text-[#E8E0F0] leading-none mb-3 tracking-tight">
        {value}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className={`text-[11px] font-semibold ${positive ? "text-emerald-400" : "text-rose-400"}`}>
            {positive ? "↑" : "↓"} {Math.abs(change)}%
          </span>
          <span className="text-[11px] text-[#4D4560]">vs last month</span>
        </div>
      </div>

      <div className="mt-3 h-1 bg-[#1C1828] w-full rounded-full">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${Math.min(100, 40 + change * 2)}%`,
            backgroundColor: positive ? accent : "#554D60",
          }}
        />
      </div>
    </div>
  );
}
