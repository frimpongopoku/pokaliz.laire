"use client";

import { useState } from "react";
import { X, Plus, Search, Clock, Check, ChevronDown, Star } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { customers, adminStaff } from "@/lib/admin-data";
import { services } from "@/lib/data";

type BookingStatus = "Confirmed" | "Pending";

const TIME_SLOTS = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "1:00 PM",  "1:30 PM",  "2:00 PM",  "2:30 PM",
  "3:00 PM",  "3:30 PM",  "4:00 PM",  "4:30 PM",
  "5:00 PM",  "5:30 PM",
];

interface NewBookingSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type ClientMode = "existing" | "new";

export function NewBookingSheet({ open, onOpenChange }: NewBookingSheetProps) {
  const [clientMode, setClientMode] = useState<ClientMode>("existing");
  const [clientSearch, setClientSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState<typeof customers[number] | null>(null);
  const [newClient, setNewClient] = useState({ name: "", email: "", phone: "" });

  const [selectedService, setSelectedService] = useState<{ name: string; price: number; duration: number; category: string } | null>(null);
  const [serviceCategoryOpen, setServiceCategoryOpen] = useState<string | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<string>("any");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<BookingStatus>("Confirmed");

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
      c.email.toLowerCase().includes(clientSearch.toLowerCase())
  );

  const clientName = clientMode === "existing" ? selectedClient?.name : newClient.name;
  const clientEmail = clientMode === "existing" ? selectedClient?.email : newClient.email;

  const canSubmit =
    !!(clientMode === "existing" ? selectedClient : newClient.name && newClient.email) &&
    !!selectedService &&
    !!selectedDate &&
    !!selectedTime;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // UI-only: reset and close
    setClientMode("existing");
    setClientSearch("");
    setSelectedClient(null);
    setNewClient({ name: "", email: "", phone: "" });
    setSelectedService(null);
    setServiceCategoryOpen(null);
    setSelectedStaff("any");
    setSelectedDate("");
    setSelectedTime("");
    setNotes("");
    setStatus("Confirmed");
    onOpenChange(false);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full sm:max-w-[540px] bg-[#0D0B0E] border-l border-[#1C1828] flex flex-col gap-0 p-0 overflow-y-auto"
      >
        {/* Header */}
        <SheetHeader className="px-6 py-5 border-b border-[#1C1828] gap-1">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-[15px] font-semibold text-[#E8E0F0] tracking-[-0.01em]">
              New Booking
            </SheetTitle>
            <SheetClose className="w-7 h-7 border border-[#1C1828] rounded-sm flex items-center justify-center text-[#4D4560] hover:text-[#9B93A8] hover:border-[#2C2438] transition-all">
              <X size={13} />
            </SheetClose>
          </div>
          <SheetDescription className="text-[12px] text-[#4D4560]">
            Manually create an appointment on behalf of a client.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1">
          <div className="flex-1 px-6 py-6 space-y-6">

            {/* ── 1. CLIENT ── */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378]">
                  Client <span className="text-rose-400">*</span>
                </label>
                <div className="flex border border-[#1C1828] rounded-sm overflow-hidden">
                  {(["existing", "new"] as ClientMode[]).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => { setClientMode(m); setSelectedClient(null); setClientSearch(""); }}
                      className={`px-3 py-1 text-[11px] font-medium capitalize transition-colors ${
                        clientMode === m ? "bg-[#C9A55A]/10 text-[#C9A55A]" : "text-[#4D4560] hover:text-[#6B6378]"
                      }`}
                    >
                      {m === "existing" ? "Existing" : "New Client"}
                    </button>
                  ))}
                </div>
              </div>

              {clientMode === "existing" ? (
                <>
                  {selectedClient ? (
                    <div className="flex items-center gap-3 p-3 bg-[#110E16] border border-[#C9A55A]/30 rounded-sm">
                      <div className="w-8 h-8 bg-[#1C1828] border border-[#2C2438] rounded-sm flex items-center justify-center flex-shrink-0">
                        <span className="text-[10px] font-bold text-[#C9A55A]">
                          {selectedClient.name.split(" ").map((n) => n[0]).join("")}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium text-[#C0B8CC]">{selectedClient.name}</p>
                        <p className="text-[11px] text-[#4D4560] truncate">{selectedClient.email}</p>
                      </div>
                      <button type="button" onClick={() => setSelectedClient(null)} className="text-[#4D4560] hover:text-rose-400 transition-colors flex-shrink-0">
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="relative mb-2">
                        <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3D3550]" />
                        <input
                          type="text"
                          placeholder="Search by name or email…"
                          value={clientSearch}
                          onChange={(e) => setClientSearch(e.target.value)}
                          className="w-full bg-[#110E16] border border-[#1C1828] pl-8 pr-4 py-2.5 text-[13px] text-[#C0B8CC] placeholder:text-[#3D3550] focus:border-[#C9A55A]/50 focus:outline-none transition-colors rounded-sm"
                        />
                      </div>
                      {clientSearch && (
                        <div className="border border-[#1C1828] rounded-sm overflow-hidden max-h-44 overflow-y-auto">
                          {filteredCustomers.length === 0 ? (
                            <p className="px-4 py-3 text-[12px] text-[#4D4560]">No customers found</p>
                          ) : (
                            filteredCustomers.slice(0, 6).map((c) => (
                              <button
                                key={c.id}
                                type="button"
                                onClick={() => { setSelectedClient(c); setClientSearch(""); }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#1C1828] transition-colors text-left border-b border-[#1C1828] last:border-b-0"
                              >
                                <div className="w-6 h-6 bg-[#1C1828] border border-[#2C2438] rounded-sm flex items-center justify-center flex-shrink-0">
                                  <span className="text-[8px] font-bold text-[#C9A55A]">{c.name.split(" ").map((n) => n[0]).join("")}</span>
                                </div>
                                <div className="min-w-0">
                                  <p className="text-[12px] font-medium text-[#C0B8CC] truncate">{c.name}</p>
                                  <p className="text-[10px] text-[#4D4560] truncate">{c.email}</p>
                                </div>
                                <span className={`ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded-sm flex-shrink-0 ${
                                  c.status === "VIP" ? "text-[#C9A55A] bg-[#C9A55A]/10" : "text-[#4D4560] bg-[#1C1828]"
                                }`}>{c.status}</span>
                              </button>
                            ))
                          )}
                        </div>
                      )}
                    </>
                  )}
                </>
              ) : (
                <div className="space-y-3">
                  <input type="text" required placeholder="Full name *" value={newClient.name}
                    onChange={(e) => setNewClient((f) => ({ ...f, name: e.target.value }))}
                    className="w-full bg-[#110E16] border border-[#1C1828] px-3 py-2.5 text-[13px] text-[#C0B8CC] placeholder:text-[#3D3550] focus:border-[#C9A55A]/50 focus:outline-none transition-colors rounded-sm" />
                  <input type="email" required placeholder="Email address *" value={newClient.email}
                    onChange={(e) => setNewClient((f) => ({ ...f, email: e.target.value }))}
                    className="w-full bg-[#110E16] border border-[#1C1828] px-3 py-2.5 text-[13px] text-[#C0B8CC] placeholder:text-[#3D3550] focus:border-[#C9A55A]/50 focus:outline-none transition-colors rounded-sm" />
                  <input type="tel" placeholder="Phone number" value={newClient.phone}
                    onChange={(e) => setNewClient((f) => ({ ...f, phone: e.target.value }))}
                    className="w-full bg-[#110E16] border border-[#1C1828] px-3 py-2.5 text-[13px] text-[#C0B8CC] placeholder:text-[#3D3550] focus:border-[#C9A55A]/50 focus:outline-none transition-colors rounded-sm" />
                </div>
              )}
            </div>

            <div className="border-t border-[#1C1828]" />

            {/* ── 2. SERVICE ── */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378] mb-3">
                Service <span className="text-rose-400">*</span>
              </label>
              {selectedService ? (
                <div className="flex items-center gap-3 p-3 bg-[#110E16] border border-[#C9A55A]/30 rounded-sm">
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-[#C0B8CC]">{selectedService.name}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-[11px] text-[#4D4560]">{selectedService.category}</span>
                      <span className="text-[11px] text-[#4D4560] flex items-center gap-1"><Clock size={9} />{selectedService.duration}m</span>
                    </div>
                  </div>
                  <span className="text-[14px] font-semibold text-[#C9A55A]">${selectedService.price}</span>
                  <button type="button" onClick={() => setSelectedService(null)} className="text-[#4D4560] hover:text-rose-400 transition-colors flex-shrink-0">
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <div className="space-y-1 border border-[#1C1828] rounded-sm overflow-hidden">
                  {services.map((cat) => (
                    <div key={cat.id}>
                      <button
                        type="button"
                        onClick={() => setServiceCategoryOpen(serviceCategoryOpen === cat.id ? null : cat.id)}
                        className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-[#1C1828] transition-colors border-b border-[#1C1828] last:border-b-0"
                      >
                        <span className="text-[12px] font-medium text-[#9B93A8]">{cat.category}</span>
                        <ChevronDown size={12} className={`text-[#4D4560] transition-transform ${serviceCategoryOpen === cat.id ? "rotate-180" : ""}`} />
                      </button>
                      {serviceCategoryOpen === cat.id && (
                        <div className="bg-[#080610]">
                          {cat.items.map((item) => (
                            <button
                              key={item.name}
                              type="button"
                              onClick={() => { setSelectedService({ ...item, category: cat.category }); setServiceCategoryOpen(null); }}
                              className="w-full flex items-center justify-between px-5 py-2.5 hover:bg-[#1C1828] transition-colors border-b border-[#1C1828] last:border-b-0 text-left"
                            >
                              <div>
                                <p className="text-[12px] font-medium text-[#C0B8CC]">{item.name}</p>
                                <p className="text-[10px] text-[#4D4560] flex items-center gap-1 mt-0.5"><Clock size={9} />{item.duration}m</p>
                              </div>
                              <span className="text-[13px] font-semibold text-[#C9A55A]">${item.price}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-[#1C1828]" />

            {/* ── 3. STAFF ── */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378] mb-3">
                Assign Staff
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedStaff("any")}
                  className={`flex items-center gap-2.5 px-3 py-2.5 border rounded-sm text-left transition-all ${
                    selectedStaff === "any"
                      ? "border-[#C9A55A]/40 bg-[#C9A55A]/8"
                      : "border-[#1C1828] hover:border-[#2C2438]"
                  }`}
                >
                  <div className="w-7 h-7 border border-dashed border-[#2C2438] rounded-sm flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] text-[#4D4560]">✦</span>
                  </div>
                  <div>
                    <p className={`text-[12px] font-medium ${selectedStaff === "any" ? "text-[#C9A55A]" : "text-[#9B93A8]"}`}>Any Available</p>
                    <p className="text-[10px] text-[#4D4560]">Auto-assign</p>
                  </div>
                  {selectedStaff === "any" && <Check size={11} className="text-[#C9A55A] ml-auto" />}
                </button>
                {adminStaff.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedStaff(m.id)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 border rounded-sm text-left transition-all ${
                      selectedStaff === m.id
                        ? "border-[#C9A55A]/40 bg-[#C9A55A]/8"
                        : "border-[#1C1828] hover:border-[#2C2438]"
                    }`}
                  >
                    <div className={`relative w-7 h-7 bg-gradient-to-br ${m.gradient} border border-[#2C2438] rounded-sm flex items-center justify-center flex-shrink-0`}>
                      <span className="text-[8px] font-bold text-[#C9A55A]">{m.name.split(" ").map((n) => n[0]).join("")}</span>
                      <div className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-[#0D0B0E] ${
                        m.status === "Available" ? "bg-emerald-400" : m.status === "Busy" ? "bg-amber-400" : "bg-[#2C2438]"
                      }`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`text-[12px] font-medium truncate ${selectedStaff === m.id ? "text-[#C9A55A]" : "text-[#9B93A8]"}`}>{m.name.split(" ")[0]}</p>
                      <div className="flex items-center gap-1">
                        <Star size={8} fill="#C9A55A" className="text-[#C9A55A]" />
                        <span className="text-[9px] text-[#4D4560]">{m.rating}</span>
                      </div>
                    </div>
                    {selectedStaff === m.id && <Check size={11} className="text-[#C9A55A] flex-shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-[#1C1828]" />

            {/* ── 4. DATE & TIME ── */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378] mb-2">
                  Date <span className="text-rose-400">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={selectedDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-[#110E16] border border-[#1C1828] px-3 py-2.5 text-[13px] text-[#C0B8CC] focus:border-[#C9A55A]/50 focus:outline-none transition-colors rounded-sm [color-scheme:dark]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378] mb-2">
                  Time <span className="text-rose-400">*</span>
                </label>
                <select
                  required
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full bg-[#110E16] border border-[#1C1828] px-3 py-2.5 text-[13px] text-[#C0B8CC] focus:border-[#C9A55A]/50 focus:outline-none transition-colors rounded-sm"
                >
                  <option value="">Select time</option>
                  {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            {/* ── 5. STATUS & NOTES ── */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378] mb-2">
                Booking Status
              </label>
              <div className="flex gap-2">
                {(["Confirmed", "Pending"] as BookingStatus[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatus(s)}
                    className={`flex items-center gap-2 px-3 py-2 text-[12px] font-medium border rounded-sm transition-all ${
                      status === s
                        ? s === "Confirmed"
                          ? "border-emerald-500/30 text-emerald-400 bg-emerald-400/8"
                          : "border-amber-500/30 text-amber-400 bg-amber-400/8"
                        : "border-[#1C1828] text-[#4D4560] hover:border-[#2C2438] hover:text-[#6B6378]"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${s === "Confirmed" ? "bg-emerald-400" : "bg-amber-400"}`} />
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378] mb-2">
                Notes <span className="text-[#3D3550] normal-case tracking-normal font-normal">(optional)</span>
              </label>
              <textarea
                rows={2}
                placeholder="Special requests, allergies, preferences…"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-[#110E16] border border-[#1C1828] px-3 py-2.5 text-[13px] text-[#C0B8CC] placeholder:text-[#3D3550] focus:border-[#C9A55A]/50 focus:outline-none transition-colors rounded-sm resize-none"
              />
            </div>

            {/* Summary pill */}
            {canSubmit && (
              <div className="bg-[#110E16] border border-[#1C1828] rounded-sm px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-[12px] font-medium text-[#C0B8CC]">{clientName}</p>
                  <p className="text-[11px] text-[#4D4560] mt-0.5">{selectedService?.name} · {selectedDate} · {selectedTime}</p>
                </div>
                <span className="text-[16px] font-bold text-[#C9A55A]">${selectedService?.price}</span>
              </div>
            )}
          </div>

          {/* Footer */}
          <SheetFooter className="px-6 py-4 border-t border-[#1C1828] flex-row gap-3">
            <SheetClose asChild>
              <button type="button" className="flex-1 py-2.5 text-[12px] font-semibold text-[#6B6378] border border-[#1C1828] rounded-sm hover:border-[#2C2438] hover:text-[#9B93A8] transition-all">
                Cancel
              </button>
            </SheetClose>
            <button
              type="submit"
              disabled={!canSubmit}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 text-[12px] font-semibold bg-[#C9A55A] text-[#0D0B0E] rounded-sm hover:bg-[#E8C99A] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Plus size={13} /> Create Booking
            </button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
