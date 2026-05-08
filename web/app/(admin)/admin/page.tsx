"use client";

import { motion } from "framer-motion";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { StatsCard } from "@/components/admin/StatsCard";
import { RevenueChart } from "@/components/admin/RevenueChart";
import { appointments, topServices, kpis } from "@/lib/admin-data";
import {
  TrendingUp,
  CalendarCheck,
  UserPlus,
  ShoppingBag,
  ArrowRight,
  Clock,
} from "lucide-react";
import Link from "next/link";

const statusColors: Record<string, string> = {
  Confirmed:   "text-emerald-400 bg-emerald-400/10",
  Pending:     "text-amber-400  bg-amber-400/10",
  "In Progress":"text-blue-400   bg-blue-400/10",
  Completed:   "text-[#554D60]  bg-[#554D60]/10",
  Cancelled:   "text-rose-400   bg-rose-400/10",
  "No Show":   "text-rose-600   bg-rose-600/10",
};

function pct(current: number, prev: number) {
  return Math.round(((current - prev) / prev) * 100);
}

export default function AdminDashboard() {
  const recent = appointments.slice(0, 6);

  return (
    <>
      <AdminHeader title="Overview" subtitle="May 2025" />

      <div className="flex-1 p-6 space-y-6">
        {/* KPI cards */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <StatsCard
            label="Revenue MTD"
            value={`$${kpis.revenueMTD.value.toLocaleString()}`}
            change={pct(kpis.revenueMTD.value, kpis.revenueMTD.prev)}
            icon={<TrendingUp size={16} />}
          />
          <StatsCard
            label="Bookings MTD"
            value={String(kpis.bookingsMTD.value)}
            change={pct(kpis.bookingsMTD.value, kpis.bookingsMTD.prev)}
            icon={<CalendarCheck size={16} />}
            accent="#D4A8A8"
          />
          <StatsCard
            label="New Customers"
            value={String(kpis.newCustomers.value)}
            change={pct(kpis.newCustomers.value, kpis.newCustomers.prev)}
            icon={<UserPlus size={16} />}
            accent="#B57850"
          />
          <StatsCard
            label="Avg Order Value"
            value={`$${kpis.avgOrderValue.value}`}
            change={pct(kpis.avgOrderValue.value, kpis.avgOrderValue.prev)}
            icon={<ShoppingBag size={16} />}
            accent="#E8C99A"
          />
        </motion.div>

        {/* Chart + top services */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>

          {/* Top services */}
          <div className="bg-[#0F0C13] border border-[#141118] p-6">
            <div className="flex items-center justify-between mb-5">
              <p
                className="text-[9px] tracking-[0.3em] uppercase text-[#554D60]"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                Top Services
              </p>
            </div>
            <div className="space-y-4">
              {topServices.map((s, i) => {
                const maxRev = topServices[0].revenue;
                return (
                  <div key={s.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className="text-[10px] text-[#887A90] truncate flex-1 mr-3"
                        style={{ fontFamily: "var(--font-manrope)" }}
                      >
                        {s.name}
                      </span>
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-[9px] ${s.growth >= 0 ? "text-emerald-500" : "text-rose-500"}`}
                          style={{ fontFamily: "var(--font-manrope)" }}
                        >
                          {s.growth >= 0 ? "+" : ""}{s.growth}%
                        </span>
                        <span
                          className="text-[10px] text-[#C9A55A] font-medium w-14 text-right"
                          style={{ fontFamily: "var(--font-manrope)" }}
                        >
                          ${(s.revenue / 1000).toFixed(1)}k
                        </span>
                      </div>
                    </div>
                    <div className="h-1 bg-[#141118]">
                      <div
                        className="h-full bg-[#C9A55A]/40"
                        style={{ width: `${(s.revenue / maxRev) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Recent appointments */}
        <motion.div
          className="bg-[#0F0C13] border border-[#141118]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#141118]">
            <p
              className="text-[9px] tracking-[0.3em] uppercase text-[#554D60]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Recent Appointments
            </p>
            <Link
              href="/admin/appointments"
              className="flex items-center gap-1 text-[9px] tracking-[0.15em] uppercase text-[#554D60] hover:text-[#C9A55A] transition-colors"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              View All <ArrowRight size={10} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#141118]">
                  {["Client", "Service", "Staff", "Date", "Time", "Price", "Status"].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-3 text-left text-[8px] tracking-[0.25em] uppercase text-[#2C2438]"
                      style={{ fontFamily: "var(--font-manrope)" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recent.map((appt) => (
                  <tr
                    key={appt.id}
                    className="border-b border-[#0D0B0E] hover:bg-[#141118] transition-colors duration-150"
                  >
                    <td className="px-6 py-3.5">
                      <div>
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
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <span
                        className="text-[11px] text-[#887A90]"
                        style={{ fontFamily: "var(--font-manrope)" }}
                      >
                        {appt.service}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <span
                        className="text-[11px] text-[#554D60]"
                        style={{ fontFamily: "var(--font-manrope)" }}
                      >
                        {appt.staff}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <span
                        className="text-[11px] text-[#554D60]"
                        style={{ fontFamily: "var(--font-manrope)" }}
                      >
                        {appt.date}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-1 text-[#2C2438]">
                        <Clock size={10} />
                        <span
                          className="text-[10px]"
                          style={{ fontFamily: "var(--font-manrope)" }}
                        >
                          {appt.time}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <span
                        className="text-[11px] font-medium text-[#C9A55A]"
                        style={{ fontFamily: "var(--font-manrope)" }}
                      >
                        ${appt.price}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <span
                        className={`text-[9px] tracking-[0.1em] uppercase px-2 py-1 ${statusColors[appt.status]}`}
                        style={{ fontFamily: "var(--font-manrope)" }}
                      >
                        {appt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </>
  );
}
