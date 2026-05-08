"use client";

import { useState, useEffect } from "react";
import { X, RefreshCw, Calendar, Clock, User, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { type Appointment } from "@/lib/admin-data";
import { adminStaff } from "@/lib/admin-data";

const TIME_SLOTS = [
  "9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM",
  "12:00 PM","12:30 PM","1:00 PM","1:30 PM","2:00 PM","2:30 PM",
  "3:00 PM","3:30 PM","4:00 PM","4:30 PM","5:00 PM","5:30 PM",
];

const REASONS = [
  "Client request",
  "Staff unavailability",
  "Salon closure",
  "Schedule conflict",
  "Other",
];

const STATUS_DOT: Record<string, string> = {
  Available: "bg-emerald-400",
  Busy:      "bg-amber-400",
  "Off Today": "bg-[#4D4560]",
};

function todayStr() {
  return new Date().toISOString().split("T")[0];
}

interface RescheduleSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointment?: Appointment;
  onConfirm?: (updated: Pick<Appointment, "id" | "date" | "time" | "staff">) => void;
}

export function RescheduleSheet({ open, onOpenChange, appointment, onConfirm }: RescheduleSheetProps) {
  const [newDate, setNewDate]     = useState("");
  const [newTime, setNewTime]     = useState("");
  const [newStaff, setNewStaff]   = useState("");
  const [reason, setReason]       = useState("");
  const [note, setNote]           = useState("");
  const [staffOpen, setStaffOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (open && appointment) {
      setNewDate("");
      setNewTime(appointment.time);
      setNewStaff(appointment.staff);
      setReason("");
      setNote("");
      setStaffOpen(false);
      setConfirmed(false);
    }
  }, [open, appointment]);

  if (!appointment) return null;

  const initials   = appointment.client.split(" ").map((n) => n[0]).join("").slice(0, 2);
  const dateChanged  = newDate !== "";
  const timeChanged  = newTime !== appointment.time;
  const staffChanged = newStaff !== appointment.staff;
  const hasChanges   = dateChanged || timeChanged || staffChanged;
  const canConfirm   = newDate !== "" && newTime !== "";

  const selectedMember = adminStaff.find((s) => s.name === newStaff);

  function handleConfirm() {
    if (!canConfirm) return;
    setConfirmed(true);
    setTimeout(() => {
      onConfirm?.({ id: appointment.id, date: newDate, time: newTime, staff: newStaff });
      onOpenChange(false);
    }, 900);
  }

  // Format display date from yyyy-mm-dd → "May 14, 2025" style
  function fmtDate(str: string) {
    if (!str) return "";
    const [y, m, d] = str.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full sm:max-w-[460px] bg-[#0D0B0E] border-l border-[#1C1828] flex flex-col gap-0 p-0 overflow-y-auto"
      >
        {/* Header */}
        <SheetHeader className="px-6 py-5 border-b border-[#1C1828] gap-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-amber-500/10 border border-amber-500/20 rounded-sm flex items-center justify-center">
                <RefreshCw size={13} className="text-amber-400" />
              </div>
              <SheetTitle className="text-[15px] font-semibold text-[#E8E0F0] tracking-[-0.01em]">
                Reschedule
              </SheetTitle>
            </div>
            <SheetClose className="w-7 h-7 border border-[#1C1828] rounded-sm flex items-center justify-center text-[#4D4560] hover:text-[#9B93A8] hover:border-[#2C2438] transition-all">
              <X size={13} />
            </SheetClose>
          </div>
          <p className="text-[12px] text-[#4D4560] mt-1">{appointment.id.toUpperCase()}</p>
        </SheetHeader>

        <div className="flex-1 px-6 py-6 space-y-6">

          {/* Current booking summary */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378] mb-3">Current Booking</p>
            <div className="bg-[#110E16] border border-[#1C1828] rounded-sm p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-900/50 to-amber-900/50 border border-[#2C2438] rounded-sm flex items-center justify-center flex-shrink-0">
                <span className="text-[12px] font-bold text-[#C9A55A]">{initials}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-[#E8E0F0] truncate">{appointment.client}</p>
                <p className="text-[12px] text-[#6B6378] truncate">{appointment.service}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-[12px] font-medium text-[#9B93A8]">{appointment.date}</p>
                <p className="text-[11px] text-[#4D4560] mt-0.5">{appointment.time}</p>
              </div>
            </div>
          </div>

          {/* New date */}
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378] mb-2 flex items-center gap-1.5">
              <Calendar size={11} /> New Date <span className="text-rose-400">*</span>
            </label>
            <input
              type="date"
              min={todayStr()}
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-full bg-[#110E16] border border-[#1C1828] px-4 py-2.5 text-[13px] text-[#C0B8CC] focus:border-[#C9A55A]/50 focus:outline-none rounded-sm transition-colors [color-scheme:dark]"
            />
          </div>

          {/* New time */}
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378] mb-2 flex items-center gap-1.5">
              <Clock size={11} /> New Time <span className="text-rose-400">*</span>
            </label>
            <select
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="w-full bg-[#110E16] border border-[#1C1828] px-4 py-2.5 text-[13px] text-[#C0B8CC] focus:border-[#C9A55A]/50 focus:outline-none rounded-sm transition-colors appearance-none cursor-pointer"
            >
              <option value="" disabled>Select time</option>
              {TIME_SLOTS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Staff reassignment — collapsible */}
          <div>
            <button
              onClick={() => setStaffOpen((v) => !v)}
              className="w-full flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378] hover:text-[#9B93A8] transition-colors mb-2"
            >
              <span className="flex items-center gap-1.5"><User size={11} /> Reassign Staff</span>
              {staffOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>

            {staffOpen && (
              <div className="grid grid-cols-2 gap-2">
                {/* Keep same */}
                <button
                  onClick={() => setNewStaff(appointment.staff)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 border rounded-sm text-left transition-all ${
                    newStaff === appointment.staff
                      ? "border-[#C9A55A]/40 bg-[#C9A55A]/5"
                      : "border-[#1C1828] hover:border-[#2C2438]"
                  }`}
                >
                  <div className="w-7 h-7 bg-gradient-to-br from-rose-900/50 to-amber-900/50 border border-[#2C2438] rounded-sm flex items-center justify-center flex-shrink-0">
                    <span className="text-[9px] font-bold text-[#C9A55A]">
                      {appointment.staff.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className={`text-[11px] font-semibold truncate ${newStaff === appointment.staff ? "text-[#C9A55A]" : "text-[#9B93A8]"}`}>
                      {appointment.staff.split(" ")[0]}
                    </p>
                    <p className="text-[9px] text-[#4D4560]">Current</p>
                  </div>
                </button>

                {adminStaff
                  .filter((s) => s.name !== appointment.staff)
                  .map((member) => {
                    const selected = newStaff === member.name;
                    const fi = member.name.split(" ").map((n) => n[0]).join("").slice(0, 2);
                    return (
                      <button
                        key={member.id}
                        onClick={() => setNewStaff(member.name)}
                        className={`flex items-center gap-2.5 px-3 py-2.5 border rounded-sm text-left transition-all ${
                          selected
                            ? "border-[#C9A55A]/40 bg-[#C9A55A]/5"
                            : member.status === "Off Today"
                            ? "border-[#1C1828] opacity-40 cursor-not-allowed"
                            : "border-[#1C1828] hover:border-[#2C2438]"
                        }`}
                        disabled={member.status === "Off Today"}
                      >
                        <div className="relative flex-shrink-0">
                          <div className={`w-7 h-7 bg-gradient-to-br ${member.gradient} rounded-sm flex items-center justify-center`}>
                            <span className="text-[9px] font-bold text-white/90">{fi}</span>
                          </div>
                          <span className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-[#0D0B0E] ${STATUS_DOT[member.status]}`} />
                        </div>
                        <div className="min-w-0">
                          <p className={`text-[11px] font-semibold truncate ${selected ? "text-[#C9A55A]" : "text-[#9B93A8]"}`}>
                            {member.name.split(" ")[0]}
                          </p>
                          <p className="text-[9px] text-[#4D4560] truncate">{member.status}</p>
                        </div>
                      </button>
                    );
                  })}
              </div>
            )}
          </div>

          {/* Reason */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378] mb-2">Reason</p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {REASONS.map((r) => (
                <button
                  key={r}
                  onClick={() => setReason(r === reason ? "" : r)}
                  className={`text-[11px] font-medium px-3 py-1.5 border rounded-sm transition-all ${
                    reason === r
                      ? "border-[#C9A55A]/40 text-[#C9A55A] bg-[#C9A55A]/8"
                      : "border-[#1C1828] text-[#4D4560] hover:border-[#2C2438] hover:text-[#6B6378]"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
            <textarea
              placeholder="Additional notes (optional)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              className="w-full bg-[#110E16] border border-[#1C1828] px-4 py-2.5 text-[13px] text-[#C0B8CC] placeholder:text-[#3D3550] focus:border-[#C9A55A]/50 focus:outline-none rounded-sm transition-colors resize-none"
            />
          </div>

          {/* Change summary pill */}
          {hasChanges && newDate && (
            <div className="bg-amber-500/6 border border-amber-500/15 rounded-sm px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-amber-400/70 mb-2.5">Changes</p>
              <div className="space-y-2">
                {dateChanged && (
                  <div className="flex items-center gap-2 text-[12px]">
                    <Calendar size={11} className="text-[#4D4560] flex-shrink-0" />
                    <span className="text-[#4D4560] line-through">{appointment.date}</span>
                    <ArrowRight size={10} className="text-amber-400/60 flex-shrink-0" />
                    <span className="text-amber-300 font-medium">{fmtDate(newDate)}</span>
                  </div>
                )}
                {timeChanged && (
                  <div className="flex items-center gap-2 text-[12px]">
                    <Clock size={11} className="text-[#4D4560] flex-shrink-0" />
                    <span className="text-[#4D4560] line-through">{appointment.time}</span>
                    <ArrowRight size={10} className="text-amber-400/60 flex-shrink-0" />
                    <span className="text-amber-300 font-medium">{newTime}</span>
                  </div>
                )}
                {staffChanged && (
                  <div className="flex items-center gap-2 text-[12px]">
                    <User size={11} className="text-[#4D4560] flex-shrink-0" />
                    <span className="text-[#4D4560] line-through">{appointment.staff.split(" ")[0]}</span>
                    <ArrowRight size={10} className="text-amber-400/60 flex-shrink-0" />
                    <span className="text-amber-300 font-medium">{newStaff.split(" ")[0]}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#1C1828] flex gap-2">
          <SheetClose className="flex-1 py-2.5 text-[12px] font-semibold text-[#6B6378] border border-[#1C1828] rounded-sm hover:border-[#2C2438] hover:text-[#9B93A8] transition-all">
            Cancel
          </SheetClose>
          <button
            onClick={handleConfirm}
            disabled={!canConfirm || confirmed}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[12px] font-semibold rounded-sm transition-all ${
              confirmed
                ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-400"
                : canConfirm
                ? "bg-amber-500/15 border border-amber-500/25 text-amber-300 hover:bg-amber-500/25"
                : "bg-[#110E16] border border-[#1C1828] text-[#3D3550] cursor-not-allowed"
            }`}
          >
            {confirmed ? (
              <>Rescheduled</>
            ) : (
              <><RefreshCw size={12} /> Confirm Reschedule</>
            )}
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
