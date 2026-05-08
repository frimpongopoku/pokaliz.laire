"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";

const GRADIENT_PRESETS = [
  { label: "Rose / Amber",    value: "from-rose-900/50 to-amber-900/50"   },
  { label: "Pink / Purple",   value: "from-pink-900/50 to-purple-900/50"  },
  { label: "Amber / Rose",    value: "from-amber-900/50 to-rose-900/50"   },
  { label: "Purple / Pink",   value: "from-purple-900/50 to-pink-900/50"  },
  { label: "Orange / Red",    value: "from-orange-900/50 to-red-900/50"   },
  { label: "Teal / Cyan",     value: "from-teal-900/50 to-cyan-900/50"    },
];

const ROLE_SUGGESTIONS = [
  "Lead Makeup Artist",
  "Senior Nail Technician",
  "Lash & Brow Specialist",
  "Skin Therapist",
  "Master Colorist",
  "Spa Therapist",
  "Junior Beautician",
  "Reception & Booking",
];

interface AddStaffSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddStaffSheet({ open, onOpenChange }: AddStaffSheetProps) {
  const [form, setForm] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    status: "Available" as "Available" | "Busy" | "Off Today",
    gradient: GRADIENT_PRESETS[0].value,
  });
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [specialtyInput, setSpecialtyInput] = useState("");
  const [showRoleSuggestions, setShowRoleSuggestions] = useState(false);

  const initials = form.name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  function addSpecialty(value: string) {
    const trimmed = value.trim().replace(/,$/, "");
    if (trimmed && !specialties.includes(trimmed) && specialties.length < 6) {
      setSpecialties((prev) => [...prev, trimmed]);
    }
    setSpecialtyInput("");
  }

  function handleSpecialtyKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSpecialty(specialtyInput);
    } else if (e.key === "Backspace" && specialtyInput === "" && specialties.length > 0) {
      setSpecialties((prev) => prev.slice(0, -1));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // UI-only: just close the sheet
    onOpenChange(false);
    setForm({ name: "", role: "", email: "", phone: "", status: "Available", gradient: GRADIENT_PRESETS[0].value });
    setSpecialties([]);
    setSpecialtyInput("");
  }

  const filteredRoles = ROLE_SUGGESTIONS.filter((r) =>
    r.toLowerCase().includes(form.role.toLowerCase()) && form.role.length > 0
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full sm:max-w-[480px] bg-[#0D0B0E] border-l border-[#1C1828] flex flex-col gap-0 p-0 overflow-y-auto"
      >
        {/* Header */}
        <SheetHeader className="px-6 py-5 border-b border-[#1C1828] gap-1">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-[15px] font-semibold text-[#E8E0F0] tracking-[-0.01em]">
              Add Staff Member
            </SheetTitle>
            <SheetClose className="w-7 h-7 border border-[#1C1828] rounded-sm flex items-center justify-center text-[#4D4560] hover:text-[#9B93A8] hover:border-[#2C2438] transition-all">
              <X size={13} />
            </SheetClose>
          </div>
          <SheetDescription className="text-[12px] text-[#4D4560]">
            Fill in the details below to invite a new team member.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1">
          <div className="flex-1 px-6 py-6 space-y-6">

            {/* Profile preview + gradient picker */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378] mb-3">
                Profile Colour
              </label>
              <div className="flex items-center gap-4">
                {/* Live preview avatar */}
                <div className={`w-14 h-14 bg-gradient-to-br ${form.gradient} border border-[#2C2438] rounded-sm flex items-center justify-center flex-shrink-0`}>
                  <span className="text-[15px] font-bold text-[#C9A55A]">
                    {initials || "??"}
                  </span>
                </div>
                {/* Swatch grid */}
                <div className="grid grid-cols-6 gap-2">
                  {GRADIENT_PRESETS.map((preset) => (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, gradient: preset.value }))}
                      title={preset.label}
                      className={`w-8 h-8 bg-gradient-to-br ${preset.value} rounded-sm border-2 transition-all ${
                        form.gradient === preset.value
                          ? "border-[#C9A55A] scale-110"
                          : "border-transparent hover:border-[#2C2438]"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[#1C1828]" />

            {/* Name */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378] mb-2">
                Full Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Amara Osei"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full bg-[#110E16] border border-[#1C1828] px-3 py-2.5 text-[13px] text-[#C0B8CC] placeholder:text-[#3D3550] focus:border-[#C9A55A]/50 focus:outline-none transition-colors rounded-sm"
              />
            </div>

            {/* Role */}
            <div className="relative">
              <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378] mb-2">
                Job Title / Role <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Senior Nail Technician"
                value={form.role}
                onChange={(e) => {
                  setForm((f) => ({ ...f, role: e.target.value }));
                  setShowRoleSuggestions(true);
                }}
                onBlur={() => setTimeout(() => setShowRoleSuggestions(false), 150)}
                className="w-full bg-[#110E16] border border-[#1C1828] px-3 py-2.5 text-[13px] text-[#C0B8CC] placeholder:text-[#3D3550] focus:border-[#C9A55A]/50 focus:outline-none transition-colors rounded-sm"
              />
              {showRoleSuggestions && filteredRoles.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1 z-10 bg-[#110E16] border border-[#1C1828] rounded-sm overflow-hidden shadow-xl">
                  {filteredRoles.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onMouseDown={() => {
                        setForm((f) => ({ ...f, role: r }));
                        setShowRoleSuggestions(false);
                      }}
                      className="w-full px-3 py-2.5 text-left text-[12px] text-[#9B93A8] hover:bg-[#1C1828] hover:text-[#C0B8CC] transition-colors"
                    >
                      {r}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Email + Phone row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378] mb-2">
                  Email <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@pokaliz.com"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full bg-[#110E16] border border-[#1C1828] px-3 py-2.5 text-[13px] text-[#C0B8CC] placeholder:text-[#3D3550] focus:border-[#C9A55A]/50 focus:outline-none transition-colors rounded-sm"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378] mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  placeholder="+44 7700 000000"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  className="w-full bg-[#110E16] border border-[#1C1828] px-3 py-2.5 text-[13px] text-[#C0B8CC] placeholder:text-[#3D3550] focus:border-[#C9A55A]/50 focus:outline-none transition-colors rounded-sm"
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378] mb-2">
                Initial Status
              </label>
              <div className="flex gap-2">
                {(["Available", "Busy", "Off Today"] as const).map((s) => {
                  const active = form.status === s;
                  const dot = s === "Available" ? "bg-emerald-400" : s === "Busy" ? "bg-amber-400" : "bg-[#4D4560]";
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, status: s }))}
                      className={`flex items-center gap-2 px-3 py-2 text-[12px] font-medium border rounded-sm transition-all ${
                        active
                          ? "border-[#C9A55A]/40 text-[#C9A55A] bg-[#C9A55A]/8"
                          : "border-[#1C1828] text-[#4D4560] hover:border-[#2C2438] hover:text-[#6B6378]"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Specialties tag input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378]">
                  Specialties
                </label>
                <span className="text-[11px] text-[#3D3550]">{specialties.length}/6</span>
              </div>
              <div className={`min-h-[44px] bg-[#110E16] border rounded-sm px-3 py-2 flex flex-wrap gap-1.5 items-center transition-colors focus-within:border-[#C9A55A]/50 ${specialties.length > 0 ? "border-[#1C1828]" : "border-[#1C1828]"}`}>
                {specialties.map((s) => (
                  <span key={s} className="flex items-center gap-1 bg-[#1C1828] border border-[#2C2438] text-[11px] font-medium text-[#9B93A8] px-2 py-0.5 rounded-sm">
                    {s}
                    <button type="button" onClick={() => setSpecialties((prev) => prev.filter((x) => x !== s))} className="text-[#4D4560] hover:text-rose-400 transition-colors">
                      <X size={9} />
                    </button>
                  </span>
                ))}
                {specialties.length < 6 && (
                  <input
                    type="text"
                    placeholder={specialties.length === 0 ? "Type a specialty and press Enter…" : "Add another…"}
                    value={specialtyInput}
                    onChange={(e) => setSpecialtyInput(e.target.value)}
                    onKeyDown={handleSpecialtyKey}
                    onBlur={() => { if (specialtyInput.trim()) addSpecialty(specialtyInput); }}
                    className="flex-1 min-w-[140px] bg-transparent text-[13px] text-[#C0B8CC] placeholder:text-[#3D3550] focus:outline-none"
                  />
                )}
              </div>
              <p className="text-[11px] text-[#3D3550] mt-1.5">Press Enter or comma to add each specialty.</p>
            </div>

            {/* Access level note */}
            <div className="bg-[#110E16] border border-[#1C1828] rounded-sm px-4 py-3 flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C9A55A] mt-1.5 flex-shrink-0" />
              <p className="text-[12px] text-[#6B6378] leading-relaxed">
                An invitation email will be sent to the staff member to set up their account and access the scheduling portal.
              </p>
            </div>
          </div>

          {/* Footer */}
          <SheetFooter className="px-6 py-4 border-t border-[#1C1828] flex-row gap-3">
            <SheetClose asChild>
              <button
                type="button"
                className="flex-1 py-2.5 text-[12px] font-semibold text-[#6B6378] border border-[#1C1828] rounded-sm hover:border-[#2C2438] hover:text-[#9B93A8] transition-all"
              >
                Cancel
              </button>
            </SheetClose>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 text-[12px] font-semibold bg-[#C9A55A] text-[#0D0B0E] rounded-sm hover:bg-[#E8C99A] transition-colors"
            >
              <Plus size={13} /> Add Staff Member
            </button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
