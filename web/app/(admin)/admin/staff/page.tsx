"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { adminStaff } from "@/lib/admin-data";
import { UserPlus, Star, Mail, Phone, MoreHorizontal } from "lucide-react";

const statusColors: Record<string, string> = {
  Available: "text-emerald-400 bg-emerald-400/10",
  Busy:      "text-amber-400   bg-amber-400/10",
  "Off Today":"text-[#2C2438]   bg-[#141118]",
};

const statusDot: Record<string, string> = {
  Available: "bg-emerald-400",
  Busy:      "bg-amber-400",
  "Off Today":"bg-[#2C2438]",
};

export default function StaffPage() {
  const [view, setView] = useState<"cards" | "table">("cards");

  const totalBookings = adminStaff.reduce((s, m) => s + m.bookingsThisMonth, 0);
  const totalRevenue  = adminStaff.reduce((s, m) => s + m.totalRevenue, 0);
  const avgRating     = (adminStaff.reduce((s, m) => s + m.rating, 0) / adminStaff.length).toFixed(1);

  return (
    <>
      <AdminHeader title="Staff" subtitle={`${adminStaff.length} team members`} />

      <div className="p-6 space-y-5">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Bookings MTD", value: totalBookings, sub: "Across all staff" },
            { label: "Total Revenue",      value: `$${totalRevenue.toLocaleString()}`, sub: "Staff generated" },
            { label: "Avg Rating",         value: avgRating, sub: "Out of 5.0" },
          ].map((item) => (
            <div key={item.label} className="bg-[#0F0C13] border border-[#141118] px-5 py-4">
              <p className="text-[9px] tracking-[0.25em] uppercase text-[#554D60] mb-1" style={{ fontFamily: "var(--font-manrope)" }}>{item.label}</p>
              <p className="font-light text-2xl text-[#F2ECE4]" style={{ fontFamily: "var(--font-cormorant)" }}>{item.value}</p>
              <p className="text-[9px] text-[#2C2438] mt-1" style={{ fontFamily: "var(--font-manrope)" }}>{item.sub}</p>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between">
          <div className="flex border border-[#141118]">
            {(["cards", "table"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`text-[9px] tracking-[0.15em] uppercase px-4 py-2 border-r border-[#141118] last:border-r-0 transition-colors ${
                  view === v ? "bg-[#C9A55A]/10 text-[#C9A55A]" : "text-[#2C2438] hover:text-[#554D60]"
                }`}
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                {v}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 bg-[#C9A55A] text-[#0D0B0E] px-5 py-2.5 text-[10px] tracking-[0.15em] uppercase hover:bg-[#E8C99A] transition-colors"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            <UserPlus size={12} /> Invite Staff
          </button>
        </div>

        {/* Cards view */}
        {view === "cards" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {adminStaff.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="bg-[#0F0C13] border border-[#141118] hover:border-[#2C2438] transition-all p-6 group"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className={`relative w-12 h-12 bg-gradient-to-br ${member.gradient} border border-[#2C2438] flex items-center justify-center flex-shrink-0`}>
                      <span className="text-lg font-light text-[#C9A55A]" style={{ fontFamily: "var(--font-cormorant)" }}>
                        {member.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border border-[#0F0C13] ${statusDot[member.status]}`} />
                    </div>
                    <div>
                      <h3 className="text-base font-light text-[#F2ECE4]" style={{ fontFamily: "var(--font-cormorant)" }}>
                        {member.name}
                      </h3>
                      <p className="text-[9px] tracking-[0.15em] uppercase text-[#C9A55A] mt-0.5" style={{ fontFamily: "var(--font-manrope)" }}>
                        {member.role}
                      </p>
                    </div>
                  </div>
                  <span className={`text-[8px] tracking-[0.1em] uppercase px-2 py-1 ${statusColors[member.status]}`}
                    style={{ fontFamily: "var(--font-manrope)" }}>
                    {member.status}
                  </span>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3 mb-5 pb-5 border-b border-[#141118]">
                  {[
                    { label: "Bookings", value: member.bookingsThisMonth },
                    { label: "Revenue",  value: `$${(member.totalRevenue / 1000).toFixed(1)}k` },
                    { label: "Rating",   value: member.rating },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="font-light text-xl text-[#C9A55A]" style={{ fontFamily: "var(--font-cormorant)" }}>
                        {stat.value}
                      </div>
                      <div className="text-[8px] tracking-[0.2em] uppercase text-[#2C2438]" style={{ fontFamily: "var(--font-manrope)" }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Star rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      size={10}
                      className={j < Math.floor(member.rating) ? "text-[#C9A55A]" : "text-[#2C2438]"}
                      fill={j < Math.floor(member.rating) ? "#C9A55A" : "transparent"}
                    />
                  ))}
                  <span className="text-[9px] text-[#2C2438] ml-1" style={{ fontFamily: "var(--font-manrope)" }}>
                    ({member.reviews})
                  </span>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {member.specialties.map((s) => (
                    <span key={s} className="text-[8px] text-[#554D60] border border-[#1A1620] px-2 py-0.5"
                      style={{ fontFamily: "var(--font-manrope)" }}>{s}</span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="flex-1 flex items-center justify-center gap-1.5 border border-[#2C2438] py-2 text-[9px] tracking-[0.1em] uppercase text-[#554D60] hover:border-[#C9A55A] hover:text-[#C9A55A] transition-all"
                    style={{ fontFamily: "var(--font-manrope)" }}>
                    <Mail size={10} /> Message
                  </button>
                  <button className="w-8 border border-[#2C2438] flex items-center justify-center text-[#2C2438] hover:border-[#C9A55A] hover:text-[#C9A55A] transition-all">
                    <MoreHorizontal size={12} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Table view */}
        {view === "table" && (
          <motion.div
            className="bg-[#0F0C13] border border-[#141118] overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#141118]">
                  {["Staff Member", "Role", "Email", "Bookings MTD", "Revenue", "Rating", "Status", ""].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-[8px] tracking-[0.25em] uppercase text-[#2C2438]"
                      style={{ fontFamily: "var(--font-manrope)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {adminStaff.map((m) => (
                  <tr key={m.id} className="border-b border-[#0D0B0E] hover:bg-[#141118] transition-colors group">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`relative w-8 h-8 bg-gradient-to-br ${m.gradient} border border-[#2C2438] flex items-center justify-center`}>
                          <span className="text-[10px] font-light text-[#C9A55A]" style={{ fontFamily: "var(--font-cormorant)" }}>
                            {m.name.split(" ").map((n) => n[0]).join("")}
                          </span>
                          <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-[#0F0C13] ${statusDot[m.status]}`} />
                        </div>
                        <span className="text-[11px] text-[#F2ECE4]" style={{ fontFamily: "var(--font-manrope)" }}>{m.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4"><span className="text-[10px] text-[#554D60]" style={{ fontFamily: "var(--font-manrope)" }}>{m.role}</span></td>
                    <td className="px-5 py-4"><span className="text-[10px] text-[#2C2438]" style={{ fontFamily: "var(--font-manrope)" }}>{m.email}</span></td>
                    <td className="px-5 py-4"><span className="text-[11px] text-[#887A90]" style={{ fontFamily: "var(--font-manrope)" }}>{m.bookingsThisMonth}</span></td>
                    <td className="px-5 py-4"><span className="text-[11px] font-medium text-[#C9A55A]" style={{ fontFamily: "var(--font-manrope)" }}>${m.totalRevenue.toLocaleString()}</span></td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <Star size={10} fill="#C9A55A" className="text-[#C9A55A]" />
                        <span className="text-[10px] text-[#887A90]" style={{ fontFamily: "var(--font-manrope)" }}>{m.rating}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-[9px] tracking-[0.1em] uppercase px-2 py-1 ${statusColors[m.status]}`}
                        style={{ fontFamily: "var(--font-manrope)" }}>{m.status}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-6 h-6 border border-[#2C2438] flex items-center justify-center hover:border-[#C9A55A] hover:text-[#C9A55A] text-[#2C2438] transition-all"><Mail size={10} /></button>
                        <button className="w-6 h-6 border border-[#2C2438] flex items-center justify-center hover:border-[#C9A55A] hover:text-[#C9A55A] text-[#2C2438] transition-all"><MoreHorizontal size={10} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>
    </>
  );
}
