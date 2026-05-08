"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { appointments, type AppointmentStatus } from "@/lib/admin-data";
import { Search, Plus, Clock, MoreHorizontal, Check, X, RefreshCw } from "lucide-react";

const ALL_STATUSES: (AppointmentStatus | "All")[] = [
  "All", "Confirmed", "Pending", "In Progress", "Completed", "Cancelled", "No Show",
];

const statusColors: Record<string, string> = {
  Confirmed:    "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  Pending:      "text-amber-400   bg-amber-400/10   border-amber-400/20",
  "In Progress":"text-blue-400    bg-blue-400/10    border-blue-400/20",
  Completed:    "text-[#554D60]   bg-[#554D60]/10   border-[#554D60]/20",
  Cancelled:    "text-rose-400    bg-rose-400/10    border-rose-400/20",
  "No Show":    "text-rose-600    bg-rose-600/10    border-rose-600/20",
};

export default function AppointmentsPage() {
  const [activeStatus, setActiveStatus] = useState<AppointmentStatus | "All">("All");
  const [search, setSearch] = useState("");

  const filtered = appointments.filter((a) => {
    const matchStatus = activeStatus === "All" || a.status === activeStatus;
    const matchSearch =
      a.client.toLowerCase().includes(search.toLowerCase()) ||
      a.service.toLowerCase().includes(search.toLowerCase()) ||
      a.staff.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const counts = ALL_STATUSES.reduce<Record<string, number>>((acc, s) => {
    acc[s] = s === "All"
      ? appointments.length
      : appointments.filter((a) => a.status === s).length;
    return acc;
  }, {});

  return (
    <>
      <AdminHeader title="Appointments" subtitle={`${filtered.length} total`} />

      <div className="p-6 space-y-5">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="relative">
            <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2C2438]" />
            <input
              type="text"
              placeholder="Search client, service, staff..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#0F0C13] border border-[#141118] pl-8 pr-4 py-2.5 text-[10px] text-[#F2ECE4] placeholder:text-[#2C2438] focus:border-[#C9A55A] focus:outline-none transition-colors w-64"
              style={{ fontFamily: "var(--font-manrope)" }}
            />
          </div>
          <button className="flex items-center gap-2 bg-[#C9A55A] text-[#0D0B0E] px-5 py-2.5 text-[10px] tracking-[0.15em] uppercase hover:bg-[#E8C99A] transition-colors"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            <Plus size={13} /> New Booking
          </button>
        </div>

        {/* Status tabs */}
        <div className="flex flex-wrap gap-2 pb-4 border-b border-[#141118]">
          {ALL_STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setActiveStatus(s)}
              className={`flex items-center gap-1.5 text-[9px] tracking-[0.15em] uppercase px-3 py-2 border transition-all duration-200 ${
                activeStatus === s
                  ? "border-[#C9A55A] text-[#C9A55A] bg-[#C9A55A]/5"
                  : "border-[#141118] text-[#2C2438] hover:border-[#2C2438] hover:text-[#554D60]"
              }`}
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {s}
              <span className={`text-[8px] px-1.5 py-0.5 ${activeStatus === s ? "bg-[#C9A55A]/15 text-[#C9A55A]" : "bg-[#141118] text-[#2C2438]"}`}>
                {counts[s]}
              </span>
            </button>
          ))}
        </div>

        {/* Table */}
        <motion.div
          className="bg-[#0F0C13] border border-[#141118] overflow-hidden"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#141118]">
                  {["Client", "Service", "Staff", "Date & Time", "Duration", "Price", "Status", "Actions"].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-left text-[8px] tracking-[0.25em] uppercase text-[#2C2438]"
                      style={{ fontFamily: "var(--font-manrope)" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((appt) => (
                  <tr
                    key={appt.id}
                    className="border-b border-[#0D0B0E] hover:bg-[#141118] transition-colors duration-150 group"
                  >
                    <td className="px-5 py-4">
                      <div
                        className="text-[11px] text-[#F2ECE4]"
                        style={{ fontFamily: "var(--font-manrope)" }}
                      >
                        {appt.client}
                      </div>
                      <div
                        className="text-[9px] text-[#2C2438]"
                        style={{ fontFamily: "var(--font-manrope)" }}
                      >
                        {appt.email}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className="text-[11px] text-[#887A90]"
                        style={{ fontFamily: "var(--font-manrope)" }}
                      >
                        {appt.service}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className="text-[11px] text-[#554D60]"
                        style={{ fontFamily: "var(--font-manrope)" }}
                      >
                        {appt.staff}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div
                        className="text-[11px] text-[#887A90]"
                        style={{ fontFamily: "var(--font-manrope)" }}
                      >
                        {appt.date}
                      </div>
                      <div className="flex items-center gap-1 text-[#2C2438] mt-0.5">
                        <Clock size={9} />
                        <span
                          className="text-[9px]"
                          style={{ fontFamily: "var(--font-manrope)" }}
                        >
                          {appt.time}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className="text-[10px] text-[#554D60]"
                        style={{ fontFamily: "var(--font-manrope)" }}
                      >
                        {appt.duration}m
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className="text-[11px] font-medium text-[#C9A55A]"
                        style={{ fontFamily: "var(--font-manrope)" }}
                      >
                        ${appt.price}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`text-[9px] tracking-[0.1em] uppercase px-2 py-1 border ${statusColors[appt.status]}`}
                        style={{ fontFamily: "var(--font-manrope)" }}
                      >
                        {appt.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {appt.status === "Pending" && (
                          <button className="w-6 h-6 border border-[#2C2438] flex items-center justify-center hover:border-emerald-500 hover:text-emerald-400 text-[#2C2438] transition-all">
                            <Check size={10} />
                          </button>
                        )}
                        {(appt.status === "Pending" || appt.status === "Confirmed") && (
                          <>
                            <button className="w-6 h-6 border border-[#2C2438] flex items-center justify-center hover:border-amber-500 hover:text-amber-400 text-[#2C2438] transition-all">
                              <RefreshCw size={10} />
                            </button>
                            <button className="w-6 h-6 border border-[#2C2438] flex items-center justify-center hover:border-rose-500 hover:text-rose-400 text-[#2C2438] transition-all">
                              <X size={10} />
                            </button>
                          </>
                        )}
                        <button className="w-6 h-6 border border-[#2C2438] flex items-center justify-center hover:border-[#C9A55A] hover:text-[#C9A55A] text-[#2C2438] transition-all">
                          <MoreHorizontal size={10} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div className="py-16 text-center">
                <p
                  className="font-light text-2xl text-[#2C2438]"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  No appointments found
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}
