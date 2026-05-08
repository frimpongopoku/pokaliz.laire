"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { appointments, type AppointmentStatus, type Appointment } from "@/lib/admin-data";
import { AppointmentViewSheet } from "@/components/admin/AppointmentViewSheet";
import { NewBookingSheet } from "@/components/admin/NewBookingSheet";
import { RescheduleSheet } from "@/components/admin/RescheduleSheet";
import { CalendarView } from "@/components/admin/CalendarView";
import { Search, Plus, Clock, MoreHorizontal, Check, X, RefreshCw, List, CalendarDays } from "lucide-react";

const ALL_STATUSES: (AppointmentStatus | "All")[] = [
  "All", "Confirmed", "Pending", "In Progress", "Completed", "Cancelled", "No Show",
];

const statusColors: Record<string, string> = {
  Confirmed:    "text-emerald-400 bg-emerald-400/10",
  Pending:      "text-amber-400   bg-amber-400/10",
  "In Progress":"text-blue-400    bg-blue-400/10",
  Completed:    "text-[#4D4560]   bg-[#1C1828]",
  Cancelled:    "text-rose-400    bg-rose-400/10",
  "No Show":    "text-rose-500    bg-rose-500/10",
};

export default function AppointmentsPage() {
  const [activeStatus, setActiveStatus] = useState<AppointmentStatus | "All">("All");
  const [search, setSearch] = useState("");
  const [viewingAppt, setViewingAppt] = useState<Appointment | undefined>(undefined);
  const [reschedulingAppt, setReschedulingAppt] = useState<Appointment | undefined>(undefined);
  const [newBookingOpen, setNewBookingOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");

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
      <AppointmentViewSheet open={!!viewingAppt} onOpenChange={(o) => !o && setViewingAppt(undefined)} appointment={viewingAppt} />
      <RescheduleSheet open={!!reschedulingAppt} onOpenChange={(o) => !o && setReschedulingAppt(undefined)} appointment={reschedulingAppt} />
      <NewBookingSheet open={newBookingOpen} onOpenChange={setNewBookingOpen} />

      <div className="p-6 space-y-5">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="relative">
            <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3D3550]" />
            <input
              type="text"
              placeholder="Search client, service, staff..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#110E16] border border-[#1C1828] pl-8 pr-4 py-2.5 text-[12px] text-[#C0B8CC] placeholder:text-[#3D3550] focus:border-[#C9A55A]/50 focus:outline-none transition-colors w-64 rounded-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            {/* List | Calendar toggle */}
            <div className="flex border border-[#1C1828] rounded-sm overflow-hidden">
              <button
                onClick={() => setViewMode("list")}
                className={`flex items-center gap-1.5 px-3 py-2 text-[12px] font-medium transition-all ${viewMode === "list" ? "bg-[#1C1828] text-[#C0B8CC]" : "text-[#4D4560] hover:text-[#6B6378]"}`}
              >
                <List size={13} /> List
              </button>
              <button
                onClick={() => setViewMode("calendar")}
                className={`flex items-center gap-1.5 px-3 py-2 text-[12px] font-medium transition-all border-l border-[#1C1828] ${viewMode === "calendar" ? "bg-[#1C1828] text-[#C0B8CC]" : "text-[#4D4560] hover:text-[#6B6378]"}`}
              >
                <CalendarDays size={13} /> Calendar
              </button>
            </div>
            <button
              onClick={() => setNewBookingOpen(true)}
              className="flex items-center gap-2 bg-[#C9A55A] text-[#0D0B0E] px-4 py-2.5 text-[12px] font-semibold hover:bg-[#E8C99A] transition-colors rounded-sm"
            >
              <Plus size={13} /> New Booking
            </button>
          </div>
        </div>

        {/* Status tabs */}
        <div className="flex flex-wrap gap-1.5 pb-4 border-b border-[#1C1828]">
          {ALL_STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setActiveStatus(s)}
              className={`flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-sm border transition-all duration-200 ${
                activeStatus === s
                  ? "border-[#C9A55A]/40 text-[#C9A55A] bg-[#C9A55A]/8"
                  : "border-[#1C1828] text-[#4D4560] hover:border-[#2C2438] hover:text-[#6B6378]"
              }`}
            >
              {s}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-sm font-semibold ${activeStatus === s ? "bg-[#C9A55A]/15 text-[#C9A55A]" : "bg-[#1C1828] text-[#4D4560]"}`}>
                {counts[s]}
              </span>
            </button>
          ))}
        </div>

        {/* Calendar view */}
        {viewMode === "calendar" && (
          <CalendarView appointments={filtered} onAppointmentClick={setViewingAppt} />
        )}

        {/* Table */}
        {viewMode === "list" && <motion.div
          className="bg-[#110E16] border border-[#1C1828] overflow-hidden"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1C1828]">
                  {["Client", "Service", "Staff", "Date & Time", "Duration", "Price", "Status", "Actions"].map((h) => (
                    <th key={h} className="px-5 py-2.5 text-left text-[10px] font-semibold uppercase tracking-[0.08em] text-[#4D4560]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((appt) => (
                  <tr key={appt.id} onClick={() => setViewingAppt(appt)} className="border-b border-[#0D0B0E] hover:bg-[#1C1828]/40 transition-colors duration-150 group cursor-pointer">
                    <td className="px-5 py-3">
                      <div className="text-[13px] font-medium text-[#C0B8CC]">{appt.client}</div>
                      <div className="text-[11px] text-[#4D4560]">{appt.email}</div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-[13px] text-[#9B93A8]">{appt.service}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-[13px] text-[#6B6378]">{appt.staff}</span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="text-[13px] text-[#9B93A8]">{appt.date}</div>
                      <div className="flex items-center gap-1 text-[#6B6378] mt-0.5">
                        <Clock size={10} />
                        <span className="text-[11px]">{appt.time}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-[12px] text-[#6B6378]">{appt.duration}m</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-[13px] font-semibold text-[#C9A55A]">${appt.price}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-[11px] font-semibold px-2 py-1 rounded-sm ${statusColors[appt.status]}`}>
                        {appt.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {appt.status === "Pending" && (
                          <button className="w-6 h-6 border border-[#2C2438] rounded-sm flex items-center justify-center hover:border-emerald-500 hover:text-emerald-400 text-[#4D4560] transition-all">
                            <Check size={10} />
                          </button>
                        )}
                        {(appt.status === "Pending" || appt.status === "Confirmed") && (
                          <>
                            <button
                              onClick={(e) => { e.stopPropagation(); setReschedulingAppt(appt); }}
                              className="w-6 h-6 border border-[#2C2438] rounded-sm flex items-center justify-center hover:border-amber-500 hover:text-amber-400 text-[#4D4560] transition-all"
                            >
                              <RefreshCw size={10} />
                            </button>
                            <button className="w-6 h-6 border border-[#2C2438] rounded-sm flex items-center justify-center hover:border-rose-500 hover:text-rose-400 text-[#4D4560] transition-all">
                              <X size={10} />
                            </button>
                          </>
                        )}
                        <button className="w-6 h-6 border border-[#2C2438] rounded-sm flex items-center justify-center hover:border-[#C9A55A] hover:text-[#C9A55A] text-[#4D4560] transition-all">
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
                <p className="text-[14px] font-medium text-[#4D4560]">No appointments found</p>
              </div>
            )}
          </div>
        </motion.div>}
      </div>
    </>
  );
}
