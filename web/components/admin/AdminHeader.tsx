"use client";

import { Bell, Search } from "lucide-react";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
}

export function AdminHeader({ title, subtitle }: AdminHeaderProps) {
  return (
    <header className="h-16 bg-[#0D0B0E] border-b border-[#141118] flex items-center justify-between px-6 flex-shrink-0 sticky top-0 z-40">
      {/* Page title */}
      <div>
        <h1
          className="font-light text-xl text-[#F2ECE4] leading-none"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="text-[9px] tracking-[0.2em] uppercase text-[#554D60] mt-0.5"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2C2438]" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-[#141118] border border-[#1A1620] pl-8 pr-4 py-2 text-[10px] text-[#F2ECE4] placeholder:text-[#2C2438] focus:border-[#C9A55A] focus:outline-none transition-colors w-44"
            style={{ fontFamily: "var(--font-manrope)" }}
          />
        </div>

        {/* Notifications */}
        <button className="relative w-8 h-8 border border-[#1A1620] flex items-center justify-center text-[#554D60] hover:border-[#C9A55A]/40 hover:text-[#887A90] transition-all">
          <Bell size={13} />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#C9A55A] rounded-full text-[8px] text-[#0D0B0E] flex items-center justify-center font-semibold">
            4
          </span>
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 bg-gradient-to-br from-rose-900/60 to-amber-900/60 border border-[#2C2438] flex items-center justify-center">
          <span
            className="text-xs font-light text-[#C9A55A]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            FO
          </span>
        </div>
      </div>
    </header>
  );
}
