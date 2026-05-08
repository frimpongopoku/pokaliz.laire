"use client";

import { Bell, Search } from "lucide-react";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
}

export function AdminHeader({ title, subtitle }: AdminHeaderProps) {
  return (
    <header className="h-14 bg-[#0D0B0E] border-b border-[#1C1828] flex items-center justify-between px-6 flex-shrink-0 sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <h1 className="text-[15px] font-semibold text-[#E8E0F0] tracking-[-0.01em]">
          {title}
        </h1>
        {subtitle && (
          <span className="text-xs text-[#4D4560] font-medium border border-[#1C1828] px-2 py-0.5">
            {subtitle}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2.5">
        <div className="relative hidden md:block">
          <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3D3550]" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-[#110E16] border border-[#1C1828] pl-8 pr-4 py-2 text-[12px] text-[#C0B8CC] placeholder:text-[#3D3550] focus:border-[#C9A55A]/50 focus:outline-none transition-colors w-44 rounded-sm"
          />
        </div>

        <button className="relative w-8 h-8 border border-[#1C1828] flex items-center justify-center text-[#4D4560] hover:text-[#9B93A8] hover:border-[#2C2438] transition-all rounded-sm">
          <Bell size={14} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C9A55A] rounded-full text-[8px] text-[#0D0B0E] flex items-center justify-center font-bold leading-none">
            4
          </span>
        </button>

        <div className="flex items-center gap-2 pl-2 border-l border-[#1C1828]">
          <div className="w-7 h-7 bg-gradient-to-br from-rose-900/60 to-amber-900/60 border border-[#2C2438] flex items-center justify-center rounded-sm">
            <span className="text-[10px] font-bold text-[#C9A55A]">FO</span>
          </div>
          <span className="text-[12px] font-medium text-[#9B93A8] hidden md:block">Frimpong</span>
        </div>
      </div>
    </header>
  );
}
