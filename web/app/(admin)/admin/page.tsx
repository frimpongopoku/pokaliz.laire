"use client";

import { motion } from "framer-motion";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { StatsCard } from "@/components/admin/StatsCard";
import { RevenueChart } from "@/components/admin/RevenueChart";
import { appointments, topServices, kpis } from "@/lib/admin-data";
import { TrendingUp, CalendarCheck, UserPlus, ShoppingBag, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

const statusColors: Record<string, string> = {
  Confirmed:    "text-emerald-400 bg-emerald-400/10",
  Pending:      "text-amber-400   bg-amber-400/10",
  "In Progress":"text-blue-400    bg-blue-400/10",
  Completed:    "text-[#4D4560]   bg-[#1C1828]",
  Cancelled:    "text-rose-400    bg-rose-400/10",
  "No Show":    "text-rose-500    bg-rose-500/10",
};

function pct(a: number, b: number) { return Math.round(((a - b) / b) * 100); }

export default function AdminDashboard() {
  const recent = appointments.slice(0, 6);

  return (
    <>
      <AdminHeader title="Overview" subtitle="May 2025" />

      <div className="p-6 space-y-5">
        {/* KPI row */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <StatsCard label="Revenue MTD"    value={`$${kpis.revenueMTD.value.toLocaleString()}`}   change={pct(kpis.revenueMTD.value,    kpis.revenueMTD.prev)}   icon={<TrendingUp size={15} />} />
          <StatsCard label="Bookings MTD"   value={String(kpis.bookingsMTD.value)}                  change={pct(kpis.bookingsMTD.value,   kpis.bookingsMTD.prev)}  icon={<CalendarCheck size={15} />} accent="#D4A8A8" />
          <StatsCard label="New Customers"  value={String(kpis.newCustomers.value)}                 change={pct(kpis.newCustomers.value,  kpis.newCustomers.prev)} icon={<UserPlus size={15} />} accent="#B57850" />
          <StatsCard label="Avg Order Value" value={`$${kpis.avgOrderValue.value}`}                 change={pct(kpis.avgOrderValue.value, kpis.avgOrderValue.prev)} icon={<ShoppingBag size={15} />} accent="#E8C99A" />
        </motion.div>

        {/* Chart + top services */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
        >
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>

          <div className="bg-[#110E16] border border-[#1C1828] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378] mb-5">
              Top Services
            </p>
            <div className="space-y-4">
              {topServices.map((s) => (
                <div key={s.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[12px] font-medium text-[#9B93A8] truncate flex-1 mr-3">{s.name}</span>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className={`text-[11px] font-semibold ${s.growth >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                        {s.growth >= 0 ? "+" : ""}{s.growth}%
                      </span>
                      <span className="text-[12px] font-semibold text-[#C9A55A] w-12 text-right">
                        ${(s.revenue / 1000).toFixed(1)}k
                      </span>
                    </div>
                  </div>
                  <div className="h-1 bg-[#1C1828] rounded-full">
                    <div className="h-full bg-[#C9A55A]/50 rounded-full" style={{ width: `${(s.revenue / topServices[0].revenue) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Recent appointments */}
        <motion.div
          className="bg-[#110E16] border border-[#1C1828]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.16 }}
        >
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#1C1828]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378]">
              Recent Appointments
            </p>
            <Link href="/admin/appointments" className="flex items-center gap-1 text-[11px] font-medium text-[#6B6378] hover:text-[#C9A55A] transition-colors">
              View All <ArrowRight size={11} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1C1828]">
                  {["Client", "Service", "Staff", "Date", "Time", "Price", "Status"].map((h) => (
                    <th key={h} className="px-5 py-2.5 text-left text-[10px] font-semibold uppercase tracking-[0.08em] text-[#4D4560]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recent.map((a) => (
                  <tr key={a.id} className="border-b border-[#0D0B0E] hover:bg-[#1C1828]/40 transition-colors">
                    <td className="px-5 py-3">
                      <div className="text-[13px] font-medium text-[#C0B8CC]">{a.client}</div>
                      <div className="text-[11px] text-[#4D4560]">{a.email}</div>
                    </td>
                    <td className="px-5 py-3"><span className="text-[13px] text-[#9B93A8]">{a.service}</span></td>
                    <td className="px-5 py-3"><span className="text-[13px] text-[#6B6378]">{a.staff}</span></td>
                    <td className="px-5 py-3"><span className="text-[13px] text-[#9B93A8]">{a.date}</span></td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1.5 text-[#6B6378]">
                        <Clock size={11} />
                        <span className="text-[12px]">{a.time}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3"><span className="text-[13px] font-semibold text-[#C9A55A]">${a.price}</span></td>
                    <td className="px-5 py-3">
                      <span className={`text-[11px] font-semibold px-2 py-1 rounded-sm ${statusColors[a.status]}`}>
                        {a.status}
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
