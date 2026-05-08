"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services, staff, bookingDates, timeSlots } from "@/lib/data";
import { Check, ArrowRight, ArrowLeft, Star, Clock } from "lucide-react";

type BookingStep = "service" | "staff" | "datetime" | "details" | "confirm";
const STEPS: BookingStep[] = ["service", "staff", "datetime", "details", "confirm"];
const STEP_LABELS = ["Service", "Stylist", "Date & Time", "Your Details", "Confirm"];

type SelectedItem = { name: string; price: number; duration: number };

export default function BookPage() {
  const [step, setStep] = useState(0);
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [booked, setBooked] = useState(false);

  const current = STEPS[step];
  const canProceed =
    current === "service"
      ? !!selectedItem
      : current === "staff"
      ? !!selectedStaff
      : current === "datetime"
      ? !!selectedDate && !!selectedTime
      : current === "details"
      ? !!(form.name && form.email && form.phone)
      : true;

  if (booked) {
    return (
      <div className="min-h-screen bg-[#0D0B0E] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-16 h-16 border border-[#C9A55A] flex items-center justify-center mx-auto mb-8">
            <Check size={24} className="text-[#C9A55A]" />
          </div>
          <h2
            className="font-light text-4xl text-[#F2ECE4] mb-4"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            You're booked
          </h2>
          <p
            className="text-xs text-[#554D60] mb-2 leading-relaxed"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            A confirmation has been sent to{" "}
            <span className="text-[#C9A55A]">{form.email}</span>. We look forward to
            seeing you.
          </p>
          <div className="mt-10 text-sm font-light text-[#887A90]" style={{ fontFamily: "var(--font-cormorant)" }}>
            {selectedItem?.name} · May {selectedDate}, 2025 · {selectedTime}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0B0E] pt-24">
      <div className="max-w-5xl mx-auto px-6 lg:px-10 py-14">
        {/* Header */}
        <div className="mb-14">
          <p
            className="text-[10px] tracking-[0.45em] uppercase text-[#C9A55A] mb-3"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Reserve Your Experience
          </p>
          <h1
            className="font-light text-[clamp(3rem,6vw,6rem)] text-[#F2ECE4] leading-none"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Book Now
          </h1>
        </div>

        {/* Step progress */}
        <div className="flex items-center mb-16 gap-0">
          {STEP_LABELS.map((label, i) => (
            <div key={label} className="flex items-center flex-1 min-w-0">
              <div className="flex flex-col items-center gap-2 flex-shrink-0">
                <div
                  className={`w-8 h-8 flex items-center justify-center border transition-all duration-400 ${
                    i < step
                      ? "bg-[#C9A55A] border-[#C9A55A]"
                      : i === step
                      ? "border-[#C9A55A]"
                      : "border-[#2C2438]"
                  }`}
                >
                  {i < step ? (
                    <Check size={12} className="text-[#0D0B0E]" />
                  ) : (
                    <span
                      className={`text-[10px] ${i === step ? "text-[#C9A55A]" : "text-[#2C2438]"}`}
                      style={{ fontFamily: "var(--font-manrope)" }}
                    >
                      {i + 1}
                    </span>
                  )}
                </div>
                <span
                  className={`text-[9px] tracking-[0.1em] uppercase whitespace-nowrap transition-colors duration-300 ${
                    i === step
                      ? "text-[#C9A55A]"
                      : i < step
                      ? "text-[#554D60]"
                      : "text-[#2C2438]"
                  }`}
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  {label}
                </span>
              </div>
              {i < STEP_LABELS.length - 1 && (
                <div
                  className={`flex-1 h-px mx-3 transition-colors duration-400 ${
                    i < step ? "bg-[#C9A55A]" : "bg-[#2C2438]"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.3 }}
          >
            {/* ── STEP 1: Service ── */}
            {current === "service" && (
              <div>
                <h2
                  className="font-light text-2xl text-[#F2ECE4] mb-10"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  Choose a Service
                </h2>
                <div className="space-y-10">
                  {services.map((cat) => (
                    <div key={cat.id}>
                      <p
                        className="text-[9px] tracking-[0.35em] uppercase text-[#C9A55A] mb-3 flex items-center gap-2"
                        style={{ fontFamily: "var(--font-manrope)" }}
                      >
                        {cat.icon} {cat.category}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                        {cat.items.map((item) => {
                          const isSelected = selectedItem?.name === item.name;
                          return (
                            <button
                              key={item.name}
                              onClick={() => setSelectedItem(item)}
                              className={`text-left p-5 border transition-all duration-200 ${
                                isSelected
                                  ? "border-[#C9A55A] bg-[#141118]"
                                  : "border-[#1A1620] bg-[#110E15] hover:border-[#2C2438]"
                              }`}
                            >
                              <div
                                className="font-light text-base text-[#F2ECE4] mb-3"
                                style={{ fontFamily: "var(--font-cormorant)" }}
                              >
                                {item.name}
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1 text-[#554D60]">
                                  <Clock size={10} />
                                  <span
                                    className="text-[9px]"
                                    style={{ fontFamily: "var(--font-manrope)" }}
                                  >
                                    {item.duration}m
                                  </span>
                                </div>
                                <span
                                  className="text-sm font-medium text-[#C9A55A]"
                                  style={{ fontFamily: "var(--font-manrope)" }}
                                >
                                  ${item.price}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── STEP 2: Staff ── */}
            {current === "staff" && (
              <div>
                <h2
                  className="font-light text-2xl text-[#F2ECE4] mb-10"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  Choose Your Artist
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {staff.map((member) => {
                    const isSelected = selectedStaff === member.id;
                    return (
                      <button
                        key={member.id}
                        onClick={() => setSelectedStaff(member.id)}
                        className={`text-left p-7 border transition-all duration-200 ${
                          isSelected
                            ? "border-[#C9A55A] bg-[#141118]"
                            : "border-[#1A1620] bg-[#110E15] hover:border-[#2C2438]"
                        }`}
                      >
                        <div
                          className={`w-14 h-14 rounded-full bg-gradient-to-br ${member.gradient} border border-[#2C2438] mb-5 flex items-center justify-center`}
                        >
                          <span
                            className="text-xl font-light text-[#C9A55A]"
                            style={{ fontFamily: "var(--font-cormorant)" }}
                          >
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <h3
                          className="font-light text-xl text-[#F2ECE4] mb-0.5"
                          style={{ fontFamily: "var(--font-cormorant)" }}
                        >
                          {member.name}
                        </h3>
                        <p
                          className="text-[9px] tracking-[0.2em] uppercase text-[#C9A55A] mb-3"
                          style={{ fontFamily: "var(--font-manrope)" }}
                        >
                          {member.role}
                        </p>
                        <div className="flex items-center gap-1.5 mb-4">
                          <Star size={11} fill="#C9A55A" className="text-[#C9A55A]" />
                          <span
                            className="text-xs text-[#554D60]"
                            style={{ fontFamily: "var(--font-manrope)" }}
                          >
                            {member.rating} ({member.reviews} reviews)
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {member.specialties.map((s) => (
                            <span
                              key={s}
                              className="text-[9px] text-[#554D60] border border-[#2C2438] px-2 py-0.5"
                              style={{ fontFamily: "var(--font-manrope)" }}
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </button>
                    );
                  })}

                  {/* Any available option */}
                  <button
                    onClick={() => setSelectedStaff("any")}
                    className={`text-left p-7 border transition-all duration-200 ${
                      selectedStaff === "any"
                        ? "border-[#C9A55A] bg-[#141118]"
                        : "border-[#1A1620] bg-[#110E15] hover:border-[#2C2438]"
                    }`}
                  >
                    <div className="w-14 h-14 rounded-full border border-dashed border-[#2C2438] mb-5 flex items-center justify-center">
                      <span className="text-2xl text-[#2C2438]">✦</span>
                    </div>
                    <h3
                      className="font-light text-xl text-[#F2ECE4] mb-2"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      Any Available
                    </h3>
                    <p
                      className="text-xs text-[#554D60] leading-relaxed"
                      style={{ fontFamily: "var(--font-manrope)" }}
                    >
                      We'll match you with the best available artist for your service.
                    </p>
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 3: Date & Time ── */}
            {current === "datetime" && (
              <div>
                <h2
                  className="font-light text-2xl text-[#F2ECE4] mb-10"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  Select Date & Time
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
                  {/* Date picker */}
                  <div>
                    <p
                      className="text-[9px] tracking-[0.35em] uppercase text-[#554D60] mb-5"
                      style={{ fontFamily: "var(--font-manrope)" }}
                    >
                      May 2025
                    </p>
                    <div className="grid grid-cols-7 gap-2">
                      {bookingDates.map(({ day, date, available }) => (
                        <button
                          key={date}
                          disabled={!available}
                          onClick={() => setSelectedDate(date)}
                          className={`flex flex-col items-center py-3.5 border transition-all duration-200 ${
                            !available
                              ? "border-[#120F15] cursor-not-allowed opacity-30"
                              : selectedDate === date
                              ? "border-[#C9A55A] bg-[#141118]"
                              : "border-[#1A1620] hover:border-[#2C2438]"
                          }`}
                        >
                          <span
                            className="text-[8px] text-[#554D60] mb-1 uppercase"
                            style={{ fontFamily: "var(--font-manrope)" }}
                          >
                            {day}
                          </span>
                          <span
                            className={`font-light text-xl leading-none ${
                              selectedDate === date
                                ? "text-[#C9A55A]"
                                : available
                                ? "text-[#F2ECE4]"
                                : "text-[#2C2438]"
                            }`}
                            style={{ fontFamily: "var(--font-cormorant)" }}
                          >
                            {date}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time slots */}
                  <div>
                    <p
                      className="text-[9px] tracking-[0.35em] uppercase text-[#554D60] mb-5"
                      style={{ fontFamily: "var(--font-manrope)" }}
                    >
                      Available Times
                    </p>
                    <div className="grid grid-cols-4 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-3 text-[10px] border transition-all duration-200 ${
                            selectedTime === time
                              ? "border-[#C9A55A] bg-[#141118] text-[#C9A55A]"
                              : "border-[#1A1620] text-[#554D60] hover:border-[#2C2438] hover:text-[#887A90]"
                          }`}
                          style={{ fontFamily: "var(--font-manrope)" }}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 4: Details ── */}
            {current === "details" && (
              <div>
                <h2
                  className="font-light text-2xl text-[#F2ECE4] mb-10"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  Your Details
                </h2>
                <div className="max-w-lg space-y-6">
                  {(
                    [
                      { key: "name", label: "Full Name", placeholder: "Isabelle Laurent", type: "text" },
                      { key: "email", label: "Email Address", placeholder: "hello@example.com", type: "email" },
                      { key: "phone", label: "Phone Number", placeholder: "+1 (555) 000-0000", type: "tel" },
                      { key: "notes", label: "Special Requests", placeholder: "Any notes for your artist…", type: "text" },
                    ] as const
                  ).map(({ key, label, placeholder, type }) => (
                    <div key={key}>
                      <label
                        className="block text-[9px] tracking-[0.3em] uppercase text-[#554D60] mb-2"
                        style={{ fontFamily: "var(--font-manrope)" }}
                      >
                        {label}
                      </label>
                      <input
                        type={type}
                        placeholder={placeholder}
                        value={form[key]}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, [key]: e.target.value }))
                        }
                        className="w-full bg-transparent border border-[#2C2438] px-4 py-3.5 text-sm text-[#F2ECE4] placeholder:text-[#2C2438] focus:border-[#C9A55A] focus:outline-none transition-colors duration-200"
                        style={{ fontFamily: "var(--font-manrope)" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── STEP 5: Confirm ── */}
            {current === "confirm" && (
              <div className="max-w-lg">
                <h2
                  className="font-light text-2xl text-[#F2ECE4] mb-10"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  Confirm Your Booking
                </h2>

                <div className="bg-[#110E15] border border-[#2C2438] p-8 mb-6">
                  <p
                    className="text-[9px] tracking-[0.35em] uppercase text-[#C9A55A] mb-7"
                    style={{ fontFamily: "var(--font-manrope)" }}
                  >
                    Booking Summary
                  </p>
                  <div className="space-y-4">
                    {[
                      { label: "Service", value: selectedItem?.name ?? "—" },
                      { label: "Duration", value: selectedItem ? `${selectedItem.duration} minutes` : "—" },
                      {
                        label: "Artist",
                        value:
                          selectedStaff === "any"
                            ? "Any Available"
                            : staff.find((s) => s.id === selectedStaff)?.name ?? "—",
                      },
                      { label: "Date", value: selectedDate ? `May ${selectedDate}, 2025` : "—" },
                      { label: "Time", value: selectedTime ?? "—" },
                      { label: "Name", value: form.name || "—" },
                      { label: "Email", value: form.email || "—" },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        className="flex justify-between py-2.5 border-b border-[#1A1620]"
                      >
                        <span
                          className="text-[10px] text-[#554D60]"
                          style={{ fontFamily: "var(--font-manrope)" }}
                        >
                          {label}
                        </span>
                        <span
                          className="text-[10px] text-[#F2ECE4]"
                          style={{ fontFamily: "var(--font-manrope)" }}
                        >
                          {value}
                        </span>
                      </div>
                    ))}
                    <div className="flex justify-between pt-5">
                      <span
                        className="font-light text-xl text-[#F2ECE4]"
                        style={{ fontFamily: "var(--font-cormorant)" }}
                      >
                        Total
                      </span>
                      <span
                        className="font-light text-2xl text-[#C9A55A]"
                        style={{ fontFamily: "var(--font-cormorant)" }}
                      >
                        ${selectedItem?.price ?? 0}
                      </span>
                    </div>
                  </div>
                </div>

                <p
                  className="text-[10px] text-[#554D60] mb-8 leading-relaxed"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  By confirming you agree to our cancellation policy. A confirmation will be sent to{" "}
                  <span className="text-[#C9A55A]">{form.email || "your email"}</span>.
                </p>

                <button
                  onClick={() => setBooked(true)}
                  className="w-full bg-[#C9A55A] text-[#0D0B0E] py-4 text-[10px] tracking-[0.25em] uppercase hover:bg-[#E8C99A] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  Confirm & Reserve
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Nav buttons */}
        {current !== "confirm" && (
          <div className="flex items-center justify-between mt-16 pt-8 border-t border-[#1A1620]">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-[#554D60] hover:text-[#F2ECE4] transition-colors disabled:opacity-25"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              <ArrowLeft size={13} /> Back
            </button>
            <button
              onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
              disabled={!canProceed}
              className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase bg-[#C9A55A] text-[#0D0B0E] px-9 py-3.5 hover:bg-[#E8C99A] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Continue <ArrowRight size={13} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
