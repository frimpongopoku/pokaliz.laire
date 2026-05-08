"use client";

import { X, Edit, Star, Mail, Phone, Calendar, DollarSign } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { adminStaff, appointments } from "@/lib/admin-data";

type StaffMember = typeof adminStaff[number];

const statusConfig: Record<string, { text: string; bg: string; dot: string }> = {
  Available:  { text: "text-emerald-400", bg: "bg-emerald-400/10", dot: "bg-emerald-400" },
  Busy:       { text: "text-amber-400",   bg: "bg-amber-400/10",   dot: "bg-amber-400"   },
  "Off Today":{ text: "text-[#4D4560]",   bg: "bg-[#1C1828]",      dot: "bg-[#4D4560]"   },
};

const apptStatusColor: Record<string, string> = {
  Confirmed:    "text-emerald-400",
  Pending:      "text-amber-400",
  "In Progress":"text-blue-400",
  Completed:    "text-[#4D4560]",
  Cancelled:    "text-rose-400",
  "No Show":    "text-rose-500",
};

interface StaffViewSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member?: StaffMember;
  onEdit?: (member: StaffMember) => void;
}

export function StaffViewSheet({ open, onOpenChange, member, onEdit }: StaffViewSheetProps) {
  if (!member) return null;

  const cfg = statusConfig[member.status];
  const recentAppts = appointments.filter((a) => a.staff === member.name).slice(0, 4);

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
            <SheetTitle className="text-[15px] font-semibold text-[#E8E0F0] tracking-[-0.01em]">
              Staff Profile
            </SheetTitle>
            <SheetClose className="w-7 h-7 border border-[#1C1828] rounded-sm flex items-center justify-center text-[#4D4560] hover:text-[#9B93A8] hover:border-[#2C2438] transition-all">
              <X size={13} />
            </SheetClose>
          </div>
        </SheetHeader>

        <div className="flex-1 px-6 py-6 space-y-6">

          {/* Profile hero */}
          <div className="flex items-center gap-4">
            <div className={`relative w-16 h-16 bg-gradient-to-br ${member.gradient} border border-[#2C2438] rounded-sm flex items-center justify-center flex-shrink-0`}>
              <span className="text-[18px] font-bold text-[#C9A55A]">
                {member.name.split(" ").map((n) => n[0]).join("")}
              </span>
              <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-[#0D0B0E] ${cfg.dot}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[18px] font-bold text-[#E8E0F0] leading-tight">{member.name}</p>
              <p className="text-[13px] font-medium text-[#C9A55A] mt-0.5">{member.role}</p>
              <span className={`inline-flex items-center gap-1.5 mt-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-sm ${cfg.text} ${cfg.bg}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                {member.status}
              </span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378] mb-3">Contact</p>
            <div className="space-y-0 border border-[#1C1828] rounded-sm overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-[#1C1828]">
                <Mail size={12} className="text-[#4D4560] flex-shrink-0" />
                <span className="text-[13px] text-[#9B93A8]">{member.email}</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-3">
                <Phone size={12} className="text-[#4D4560] flex-shrink-0" />
                <span className="text-[13px] text-[#9B93A8]">{member.phone}</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378] mb-3">This Month</p>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#110E16] border border-[#1C1828] rounded-sm px-4 py-3 text-center">
                <Calendar size={13} className="text-[#4D4560] mx-auto mb-1.5" />
                <p className="text-[20px] font-bold text-[#E8E0F0]">{member.bookingsThisMonth}</p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#4D4560] mt-0.5">Bookings</p>
              </div>
              <div className="bg-[#110E16] border border-[#1C1828] rounded-sm px-4 py-3 text-center">
                <DollarSign size={13} className="text-[#C9A55A] mx-auto mb-1.5" />
                <p className="text-[20px] font-bold text-[#C9A55A]">${(member.totalRevenue / 1000).toFixed(1)}k</p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#4D4560] mt-0.5">Revenue</p>
              </div>
              <div className="bg-[#110E16] border border-[#1C1828] rounded-sm px-4 py-3 text-center">
                <Star size={13} className="text-[#C9A55A] mx-auto mb-1.5" />
                <p className="text-[20px] font-bold text-[#E8E0F0]">{member.rating}</p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#4D4560] mt-0.5">Rating</p>
              </div>
            </div>

            {/* Star bar */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={11} fill={i < Math.floor(member.rating) ? "#C9A55A" : "transparent"} className={i < Math.floor(member.rating) ? "text-[#C9A55A]" : "text-[#2C2438]"} />
                ))}
              </div>
              <span className="text-[12px] font-semibold text-[#E8E0F0]">{member.rating}</span>
              <span className="text-[12px] text-[#4D4560]">from {member.reviews} reviews</span>
            </div>
          </div>

          {/* Specialties */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378] mb-3">Specialties</p>
            <div className="flex flex-wrap gap-2">
              {member.specialties.map((s) => (
                <span key={s} className="text-[12px] font-medium text-[#9B93A8] border border-[#2C2438] px-3 py-1 rounded-sm bg-[#110E16]">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Recent appointments */}
          {recentAppts.length > 0 && (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378] mb-3">Recent Appointments</p>
              <div className="space-y-0 border border-[#1C1828] rounded-sm overflow-hidden">
                {recentAppts.map((a, i) => (
                  <div key={a.id} className={`px-4 py-3 flex items-center justify-between ${i < recentAppts.length - 1 ? "border-b border-[#1C1828]" : ""}`}>
                    <div className="min-w-0 flex-1 mr-3">
                      <p className="text-[13px] font-medium text-[#C0B8CC] truncate">{a.client}</p>
                      <p className="text-[11px] text-[#4D4560] mt-0.5">{a.service} · {a.date}</p>
                    </div>
                    <span className={`text-[11px] font-semibold flex-shrink-0 ${apptStatusColor[a.status]}`}>
                      {a.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#1C1828] flex gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 text-[12px] font-semibold bg-[#110E16] border border-[#1C1828] text-[#6B6378] rounded-sm hover:border-[#2C2438] hover:text-[#9B93A8] transition-all">
            <Mail size={13} /> Message
          </button>
          <button
            onClick={() => { onOpenChange(false); onEdit?.(member); }}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 text-[12px] font-semibold bg-[#C9A55A] text-[#0D0B0E] rounded-sm hover:bg-[#E8C99A] transition-colors"
          >
            <Edit size={13} /> Edit Profile
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
