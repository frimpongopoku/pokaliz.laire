"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AddStaffSheet } from "@/components/admin/AddStaffSheet";
import { adminStaff } from "@/lib/admin-data";
import { UserPlus, Star, Mail, MoreHorizontal } from "lucide-react";

const statusColors: Record<string, string> = {
  Available:  "text-emerald-400 bg-emerald-400/10",
  Busy:       "text-amber-400   bg-amber-400/10",
  "Off Today":"text-[#4D4560]   bg-[#1C1828]",
};

const statusDot: Record<string, string> = {
  Available:  "bg-emerald-400",
  Busy:       "bg-amber-400",
  "Off Today":"bg-[#2C2438]",
};

export default function StaffPage() {
  const [view, setView] = useState<"cards" | "table">("cards");
  const [sheetOpen, setSheetOpen] = useState(false);

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
            <div key={item.label} className="bg-[#110E16] border border-[#1C1828] px-5 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378] mb-2">{item.label}</p>
              <p className="text-[26px] font-bold text-[#E8E0F0] leading-none">{item.value}</p>
              <p className="text-[11px] text-[#4D4560] mt-1.5">{item.sub}</p>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between">
          <div className="flex border border-[#1C1828] rounded-sm overflow-hidden">
            {(["cards", "table"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`text-[11px] font-medium capitalize px-4 py-2 border-r border-[#1C1828] last:border-r-0 transition-colors ${
                  view === v ? "bg-[#C9A55A]/10 text-[#C9A55A]" : "text-[#4D4560] hover:text-[#6B6378]"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
          <button
            onClick={() => setSheetOpen(true)}
            className="flex items-center gap-2 bg-[#C9A55A] text-[#0D0B0E] px-4 py-2.5 text-[12px] font-semibold hover:bg-[#E8C99A] transition-colors rounded-sm"
          >
            <UserPlus size={12} /> Invite Staff
          </button>
          <AddStaffSheet open={sheetOpen} onOpenChange={setSheetOpen} />
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
                className="bg-[#110E16] border border-[#1C1828] hover:border-[#2C2438] transition-all p-5 group rounded-sm"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`relative w-10 h-10 bg-gradient-to-br ${member.gradient} border border-[#2C2438] rounded-sm flex items-center justify-center flex-shrink-0`}>
                      <span className="text-[11px] font-bold text-[#C9A55A]">
                        {member.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                      <div className={`absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-[#110E16] ${statusDot[member.status]}`} />
                    </div>
                    <div>
                      <h3 className="text-[14px] font-semibold text-[#E8E0F0]">{member.name}</h3>
                      <p className="text-[11px] font-medium text-[#C9A55A] mt-0.5">{member.role}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-1 rounded-sm ${statusColors[member.status]}`}>
                    {member.status}
                  </span>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-[#1C1828]">
                  {[
                    { label: "Bookings", value: member.bookingsThisMonth },
                    { label: "Revenue",  value: `$${(member.totalRevenue / 1000).toFixed(1)}k` },
                    { label: "Rating",   value: member.rating },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-[16px] font-bold text-[#C9A55A]">{stat.value}</div>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#4D4560] mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Star rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      size={10}
                      className={j < Math.floor(member.rating) ? "text-[#C9A55A]" : "text-[#2C2438]"}
                      fill={j < Math.floor(member.rating) ? "#C9A55A" : "transparent"}
                    />
                  ))}
                  <span className="text-[11px] text-[#4D4560] ml-1">({member.reviews})</span>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {member.specialties.map((s) => (
                    <span key={s} className="text-[10px] font-medium text-[#6B6378] border border-[#1C1828] px-2 py-0.5 rounded-sm">
                      {s}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="flex-1 flex items-center justify-center gap-1.5 border border-[#2C2438] rounded-sm py-2 text-[11px] font-medium text-[#6B6378] hover:border-[#C9A55A] hover:text-[#C9A55A] transition-all">
                    <Mail size={10} /> Message
                  </button>
                  <button className="w-8 border border-[#2C2438] rounded-sm flex items-center justify-center text-[#4D4560] hover:border-[#C9A55A] hover:text-[#C9A55A] transition-all">
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
            className="bg-[#110E16] border border-[#1C1828] overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1C1828]">
                  {["Staff Member", "Role", "Email", "Bookings MTD", "Revenue", "Rating", "Status", ""].map((h) => (
                    <th key={h} className="px-5 py-2.5 text-left text-[10px] font-semibold uppercase tracking-[0.08em] text-[#4D4560]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {adminStaff.map((m) => (
                  <tr key={m.id} className="border-b border-[#0D0B0E] hover:bg-[#1C1828]/40 transition-colors group">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`relative w-8 h-8 bg-gradient-to-br ${m.gradient} border border-[#2C2438] rounded-sm flex items-center justify-center`}>
                          <span className="text-[10px] font-bold text-[#C9A55A]">
                            {m.name.split(" ").map((n) => n[0]).join("")}
                          </span>
                          <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#110E16] ${statusDot[m.status]}`} />
                        </div>
                        <span className="text-[13px] font-medium text-[#C0B8CC]">{m.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3"><span className="text-[12px] text-[#6B6378]">{m.role}</span></td>
                    <td className="px-5 py-3"><span className="text-[12px] text-[#4D4560]">{m.email}</span></td>
                    <td className="px-5 py-3"><span className="text-[13px] text-[#9B93A8]">{m.bookingsThisMonth}</span></td>
                    <td className="px-5 py-3"><span className="text-[13px] font-semibold text-[#C9A55A]">${m.totalRevenue.toLocaleString()}</span></td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1">
                        <Star size={10} fill="#C9A55A" className="text-[#C9A55A]" />
                        <span className="text-[12px] text-[#9B93A8]">{m.rating}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-[11px] font-semibold px-2 py-1 rounded-sm ${statusColors[m.status]}`}>{m.status}</span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-6 h-6 border border-[#2C2438] rounded-sm flex items-center justify-center hover:border-[#C9A55A] hover:text-[#C9A55A] text-[#4D4560] transition-all"><Mail size={10} /></button>
                        <button className="w-6 h-6 border border-[#2C2438] rounded-sm flex items-center justify-center hover:border-[#C9A55A] hover:text-[#C9A55A] text-[#4D4560] transition-all"><MoreHorizontal size={10} /></button>
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
