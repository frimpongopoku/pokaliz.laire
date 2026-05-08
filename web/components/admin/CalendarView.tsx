"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type Appointment } from "@/lib/admin-data";

const HOUR_HEIGHT = 64; // px per hour
const START_HOUR  = 9;
const END_HOUR    = 18; // 6pm
const TOTAL_HOURS = END_HOUR - START_HOUR;

const HOURS = Array.from({ length: TOTAL_HOURS }, (_, i) => START_HOUR + i);

const STATUS_STYLE: Record<string, { bg: string; border: string; title: string; sub: string; dot: string }> = {
  Confirmed:    { bg: "bg-emerald-400/12", border: "border-l-emerald-400", title: "text-emerald-300", sub: "text-emerald-400/60", dot: "bg-emerald-400" },
  Pending:      { bg: "bg-amber-400/12",   border: "border-l-amber-400",   title: "text-amber-300",   sub: "text-amber-400/60",   dot: "bg-amber-400"   },
  "In Progress":{ bg: "bg-blue-400/12",    border: "border-l-blue-400",    title: "text-blue-300",    sub: "text-blue-400/60",    dot: "bg-blue-400"    },
  Completed:    { bg: "bg-[#1C1828]",      border: "border-l-[#4D4560]",   title: "text-[#4D4560]",   sub: "text-[#3D3550]",      dot: "bg-[#4D4560]"   },
  Cancelled:    { bg: "bg-rose-400/10",    border: "border-l-rose-400",    title: "text-rose-400",    sub: "text-rose-400/50",    dot: "bg-rose-400"    },
  "No Show":    { bg: "bg-rose-500/10",    border: "border-l-rose-500",    title: "text-rose-400",    sub: "text-rose-400/50",    dot: "bg-rose-500"    },
};

const WEEKS = [
  {
    label: "May 5–11, 2025",
    days: [
      { label: "Mon", short: "5",  dateStr: "May 5, 2025"  },
      { label: "Tue", short: "6",  dateStr: "May 6, 2025"  },
      { label: "Wed", short: "7",  dateStr: "May 7, 2025"  },
      { label: "Thu", short: "8",  dateStr: "May 8, 2025"  },
      { label: "Fri", short: "9",  dateStr: "May 9, 2025"  },
      { label: "Sat", short: "10", dateStr: "May 10, 2025" },
      { label: "Sun", short: "11", dateStr: "May 11, 2025" },
    ],
  },
  {
    label: "May 12–18, 2025",
    days: [
      { label: "Mon", short: "12", dateStr: "May 12, 2025" },
      { label: "Tue", short: "13", dateStr: "May 13, 2025" },
      { label: "Wed", short: "14", dateStr: "May 14, 2025" },
      { label: "Thu", short: "15", dateStr: "May 15, 2025" },
      { label: "Fri", short: "16", dateStr: "May 16, 2025" },
      { label: "Sat", short: "17", dateStr: "May 17, 2025" },
      { label: "Sun", short: "18", dateStr: "May 18, 2025" },
    ],
  },
];

// "today" for the demo — the day with the most appointments
const TODAY = "May 12, 2025";

function parseMinutes(time: string): number {
  const [timePart, period] = time.split(" ");
  const [h, m] = timePart.split(":").map(Number);
  const hour = period === "PM" && h !== 12 ? h + 12 : period === "AM" && h === 12 ? 0 : h;
  return hour * 60 + m;
}

function minutesFromStart(time: string): number {
  return parseMinutes(time) - START_HOUR * 60;
}

// Assign lanes (columns within a day) to handle overlapping appointments
function assignLanes(appts: Appointment[]): Array<{ appt: Appointment; lane: number; laneCount: number }> {
  if (appts.length === 0) return [];

  const sorted = [...appts].sort((a, b) => parseMinutes(a.time) - parseMinutes(b.time));
  const laneEnds: number[] = []; // end-minute of the last appointment in each lane

  const lanes = sorted.map((appt) => {
    const start = parseMinutes(appt.time);
    const end   = start + appt.duration;
    let lane    = laneEnds.findIndex((e) => e <= start);
    if (lane === -1) { lane = laneEnds.length; laneEnds.push(end); }
    else laneEnds[lane] = end;
    return { appt, lane };
  });

  const laneCount = laneEnds.length;
  return lanes.map((l) => ({ ...l, laneCount }));
}

interface CalendarViewProps {
  appointments: Appointment[];
  onAppointmentClick: (appt: Appointment) => void;
}

export function CalendarView({ appointments, onAppointmentClick }: CalendarViewProps) {
  const [weekIdx, setWeekIdx] = useState(1); // default to May 12–18
  const week = WEEKS[weekIdx];

  function formatHour(h: number) {
    if (h === 12) return "12 pm";
    return h > 12 ? `${h - 12} pm` : `${h} am`;
  }

  return (
    <div className="bg-[#110E16] border border-[#1C1828] rounded-sm overflow-hidden select-none">

      {/* Week navigation bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#1C1828]">
        <button
          onClick={() => setWeekIdx((i) => Math.max(0, i - 1))}
          disabled={weekIdx === 0}
          className="w-7 h-7 border border-[#1C1828] rounded-sm flex items-center justify-center text-[#4D4560] hover:border-[#2C2438] hover:text-[#9B93A8] transition-all disabled:opacity-25 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={13} />
        </button>
        <span className="text-[13px] font-semibold text-[#C0B8CC]">{week.label}</span>
        <button
          onClick={() => setWeekIdx((i) => Math.min(WEEKS.length - 1, i + 1))}
          disabled={weekIdx === WEEKS.length - 1}
          className="w-7 h-7 border border-[#1C1828] rounded-sm flex items-center justify-center text-[#4D4560] hover:border-[#2C2438] hover:text-[#9B93A8] transition-all disabled:opacity-25 disabled:cursor-not-allowed"
        >
          <ChevronRight size={13} />
        </button>
      </div>

      {/* Day header row */}
      <div className="grid border-b border-[#1C1828]" style={{ gridTemplateColumns: "52px repeat(7, 1fr)" }}>
        <div className="border-r border-[#1C1828]" />
        {week.days.map((day, i) => {
          const isToday    = day.dateStr === TODAY;
          const hasAppts   = appointments.some((a) => a.date === day.dateStr);
          const apptCount  = appointments.filter((a) => a.date === day.dateStr).length;
          return (
            <div
              key={day.dateStr}
              className={`py-3 text-center ${i < 6 ? "border-r border-[#1C1828]" : ""} ${isToday ? "bg-[#C9A55A]/5" : ""}`}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#4D4560]">{day.label}</p>
              <div className={`w-7 h-7 mx-auto mt-1 rounded-sm flex items-center justify-center ${isToday ? "bg-[#C9A55A]" : ""}`}>
                <p className={`text-[15px] font-bold leading-none ${isToday ? "text-[#0D0B0E]" : hasAppts ? "text-[#E8E0F0]" : "text-[#2C2438]"}`}>
                  {day.short}
                </p>
              </div>
              {hasAppts && !isToday && (
                <div className="flex justify-center gap-0.5 mt-1.5">
                  {Array.from({ length: Math.min(apptCount, 3) }).map((_, j) => (
                    <div key={j} className="w-1 h-1 rounded-full bg-[#C9A55A]/60" />
                  ))}
                </div>
              )}
              {isToday && (
                <div className="flex justify-center gap-0.5 mt-1.5">
                  {Array.from({ length: Math.min(apptCount, 3) }).map((_, j) => (
                    <div key={j} className="w-1 h-1 rounded-full bg-[#C9A55A]" />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Scrollable time grid */}
      <div className="overflow-y-auto" style={{ maxHeight: "560px" }}>
        <div className="grid relative" style={{ gridTemplateColumns: "52px repeat(7, 1fr)", height: TOTAL_HOURS * HOUR_HEIGHT }}>

          {/* Time axis */}
          <div className="border-r border-[#1C1828] relative z-10 bg-[#110E16]">
            {HOURS.map((h) => (
              <div
                key={h}
                className="absolute right-0 flex items-start justify-end pr-2"
                style={{ top: (h - START_HOUR) * HOUR_HEIGHT, height: HOUR_HEIGHT }}
              >
                <span className="text-[10px] font-medium text-[#3D3550] mt-[-6px]">
                  {formatHour(h)}
                </span>
              </div>
            ))}
          </div>

          {/* Day columns */}
          {week.days.map((day, dayIdx) => {
            const dayAppts   = appointments.filter((a) => a.date === day.dateStr);
            const positioned = assignLanes(dayAppts);
            const isToday    = day.dateStr === TODAY;

            return (
              <div
                key={day.dateStr}
                className={`relative ${dayIdx < 6 ? "border-r border-[#1C1828]" : ""} ${isToday ? "bg-[#C9A55A]/3" : ""}`}
              >
                {/* Hour grid lines */}
                {HOURS.map((h) => (
                  <div
                    key={h}
                    className="absolute left-0 right-0 border-t border-[#1C1828]"
                    style={{ top: (h - START_HOUR) * HOUR_HEIGHT }}
                  />
                ))}
                {/* Half-hour lines */}
                {HOURS.map((h) => (
                  <div
                    key={`${h}-half`}
                    className="absolute left-0 right-0 border-t border-[#1C1828]/30"
                    style={{ top: (h - START_HOUR) * HOUR_HEIGHT + HOUR_HEIGHT / 2 }}
                  />
                ))}

                {/* Appointment blocks */}
                {positioned.map(({ appt, lane, laneCount }) => {
                  const top    = (minutesFromStart(appt.time) / 60) * HOUR_HEIGHT;
                  const height = (appt.duration / 60) * HOUR_HEIGHT;
                  const st     = STATUS_STYLE[appt.status] ?? STATUS_STYLE.Confirmed;
                  const pct    = 100 / laneCount;
                  const isShort = height < 44;
                  const isTiny  = height < 28;

                  return (
                    <button
                      key={appt.id}
                      onClick={() => onAppointmentClick(appt)}
                      title={`${appt.service} · ${appt.client} · ${appt.time}`}
                      className={`absolute overflow-hidden border-l-2 px-1.5 py-1 text-left rounded-r-sm hover:brightness-110 transition-all group ${st.bg} ${st.border}`}
                      style={{
                        top:    top + 2,
                        height: Math.max(height - 4, 20),
                        left:   `${lane * pct + 1}%`,
                        width:  `${pct - 2}%`,
                      }}
                    >
                      {!isTiny && (
                        <p className={`text-[9px] font-semibold leading-tight truncate ${st.title}`}>
                          {appt.service}
                        </p>
                      )}
                      {!isShort && (
                        <>
                          <p className={`text-[8px] truncate mt-0.5 ${st.sub}`}>{appt.client}</p>
                          <p className={`text-[8px] truncate ${st.sub}`}>{appt.time}</p>
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
