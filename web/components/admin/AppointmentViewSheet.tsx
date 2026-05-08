"use client";

import { X, Clock, Calendar, User, Scissors, DollarSign, Check, RefreshCw, Ban, MessageSquare } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { type Appointment, type AppointmentStatus } from "@/lib/admin-data";

const statusConfig: Record<AppointmentStatus, { text: string; bg: string; border: string; dot: string }> = {
  Confirmed:    { text: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20", dot: "bg-emerald-400" },
  Pending:      { text: "text-amber-400",   bg: "bg-amber-400/10",   border: "border-amber-400/20",   dot: "bg-amber-400"   },
  "In Progress":{ text: "text-blue-400",    bg: "bg-blue-400/10",    border: "border-blue-400/20",    dot: "bg-blue-400"    },
  Completed:    { text: "text-[#4D4560]",   bg: "bg-[#1C1828]",      border: "border-[#2C2438]",      dot: "bg-[#4D4560]"   },
  Cancelled:    { text: "text-rose-400",    bg: "bg-rose-400/10",    border: "border-rose-400/20",    dot: "bg-rose-400"    },
  "No Show":    { text: "text-rose-500",    bg: "bg-rose-500/10",    border: "border-rose-500/20",    dot: "bg-rose-500"    },
};

const DUMMY_NOTES = "Client requested natural finish. Prefers no glitter or heavy shimmer. Bring own lashes (Ardell 120).";

const DUMMY_HISTORY = [
  { time: "2 hrs ago",  event: "Appointment confirmed via online booking" },
  { time: "Yesterday",  event: "Reminder SMS sent to client" },
  { time: "3 days ago", event: "Booking created by Amara Osei" },
];

interface AppointmentViewSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointment?: Appointment;
}

export function AppointmentViewSheet({ open, onOpenChange, appointment }: AppointmentViewSheetProps) {
  if (!appointment) return null;

  const cfg = statusConfig[appointment.status];
  const canConfirm    = appointment.status === "Pending";
  const canReschedule = appointment.status === "Pending" || appointment.status === "Confirmed";
  const canCancel     = appointment.status === "Pending" || appointment.status === "Confirmed";

  const initials = appointment.client.split(" ").map((n) => n[0]).join("").slice(0, 2);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full sm:max-w-[480px] bg-[#0D0B0E] border-l border-[#1C1828] flex flex-col gap-0 p-0 overflow-y-auto"
      >
        {/* Header */}
        <SheetHeader className="px-6 py-5 border-b border-[#1C1828] gap-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <SheetTitle className="text-[15px] font-semibold text-[#E8E0F0] tracking-[-0.01em]">
                Appointment
              </SheetTitle>
              <span className={`text-[11px] font-semibold px-2 py-1 rounded-sm flex items-center gap-1.5 ${cfg.text} ${cfg.bg}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                {appointment.status}
              </span>
            </div>
            <SheetClose className="w-7 h-7 border border-[#1C1828] rounded-sm flex items-center justify-center text-[#4D4560] hover:text-[#9B93A8] hover:border-[#2C2438] transition-all">
              <X size={13} />
            </SheetClose>
          </div>
          <p className="text-[12px] text-[#4D4560] mt-1">{appointment.id.toUpperCase()}</p>
        </SheetHeader>

        <div className="flex-1 px-6 py-6 space-y-6">

          {/* Client card */}
          <div className="bg-[#110E16] border border-[#1C1828] rounded-sm p-4 flex items-center gap-4">
            <div className="w-11 h-11 bg-gradient-to-br from-rose-900/50 to-amber-900/50 border border-[#2C2438] rounded-sm flex items-center justify-center flex-shrink-0">
              <span className="text-[13px] font-bold text-[#C9A55A]">{initials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-semibold text-[#E8E0F0] truncate">{appointment.client}</p>
              <p className="text-[12px] text-[#4D4560] truncate">{appointment.email}</p>
            </div>
            <button className="w-8 h-8 border border-[#1C1828] rounded-sm flex items-center justify-center text-[#4D4560] hover:border-[#2C2438] hover:text-[#9B93A8] transition-all flex-shrink-0">
              <MessageSquare size={13} />
            </button>
          </div>

          {/* Details grid */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378] mb-3">Details</p>
            <div className="space-y-0 border border-[#1C1828] rounded-sm overflow-hidden">
              {[
                { icon: <Scissors size={12} />,  label: "Service",  value: appointment.service  },
                { icon: <User size={12} />,       label: "Staff",    value: appointment.staff    },
                { icon: <Calendar size={12} />,   label: "Date",     value: appointment.date     },
                { icon: <Clock size={12} />,      label: "Time",     value: appointment.time     },
                { icon: <Clock size={12} />,      label: "Duration", value: `${appointment.duration} min` },
                { icon: <DollarSign size={12} />, label: "Price",    value: `$${appointment.price}`,  gold: true },
              ].map((row, i, arr) => (
                <div key={row.label} className={`flex items-center justify-between px-4 py-3 ${i < arr.length - 1 ? "border-b border-[#1C1828]" : ""}`}>
                  <div className="flex items-center gap-2.5 text-[#4D4560]">
                    {row.icon}
                    <span className="text-[12px] font-medium text-[#6B6378]">{row.label}</span>
                  </div>
                  <span className={`text-[13px] font-semibold ${row.gold ? "text-[#C9A55A]" : "text-[#C0B8CC]"}`}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378] mb-3">Client Notes</p>
            <div className="bg-[#110E16] border border-[#1C1828] rounded-sm px-4 py-3">
              <p className="text-[13px] text-[#9B93A8] leading-relaxed">{DUMMY_NOTES}</p>
            </div>
          </div>

          {/* Activity timeline */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378] mb-3">Activity</p>
            <div className="space-y-3">
              {DUMMY_HISTORY.map((h, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2C2438] mt-1.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] text-[#9B93A8]">{h.event}</p>
                    <p className="text-[11px] text-[#3D3550] mt-0.5">{h.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action footer */}
        {(canConfirm || canReschedule || canCancel) && (
          <div className="px-6 py-4 border-t border-[#1C1828] flex gap-2">
            {canConfirm && (
              <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[12px] font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-sm hover:bg-emerald-500/20 transition-all">
                <Check size={12} /> Confirm
              </button>
            )}
            {canReschedule && (
              <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[12px] font-semibold bg-[#110E16] border border-[#1C1828] text-[#6B6378] rounded-sm hover:border-[#2C2438] hover:text-[#9B93A8] transition-all">
                <RefreshCw size={12} /> Reschedule
              </button>
            )}
            {canCancel && (
              <button className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-[12px] font-semibold bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-sm hover:bg-rose-500/20 transition-all">
                <Ban size={12} /> Cancel
              </button>
            )}
          </div>
        )}

        {!canConfirm && !canReschedule && !canCancel && (
          <div className="px-6 py-4 border-t border-[#1C1828]">
            <SheetClose className="w-full py-2.5 text-[12px] font-semibold text-[#6B6378] border border-[#1C1828] rounded-sm hover:border-[#2C2438] hover:text-[#9B93A8] transition-all">
              Close
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
