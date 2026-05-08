"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { customers } from "@/lib/admin-data";
import { Search, UserPlus, MoreHorizontal, Mail } from "lucide-react";

const statusColors: Record<string, string> = {
  VIP:      "text-[#C9A55A] bg-[#C9A55A]/10",
  Active:   "text-emerald-400 bg-emerald-400/10",
  Inactive: "text-[#4D4560] bg-[#1C1828]",
};

const filters = ["All", "VIP", "Active", "Inactive"];

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState<"spend" | "bookings" | "name">("spend");

  const filtered = customers
    .filter((c) => filter === "All" || c.status === filter)
    .filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "spend") return b.totalSpend - a.totalSpend;
      if (sortBy === "bookings") return b.bookings - a.bookings;
      return a.name.localeCompare(b.name);
    });

  const totalRevenue = customers.reduce((s, c) => s + c.totalSpend, 0);
  const vipCount = customers.filter((c) => c.status === "VIP").length;

  return (
    <>
      <AdminHeader title="Customers" subtitle={`${customers.length} total`} />

      <div className="p-6 space-y-5">
        {/* Summary strip */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Customers", value: customers.length, sub: "+34 this month" },
            { label: "VIP Members",     value: vipCount,          sub: "Top spenders" },
            { label: "Total Revenue",   value: `$${totalRevenue.toLocaleString()}`, sub: "All time" },
          ].map((item) => (
            <div key={item.label} className="bg-[#110E16] border border-[#1C1828] px-5 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378] mb-2">{item.label}</p>
              <p className="text-[26px] font-bold text-[#E8E0F0] leading-none">{item.value}</p>
              <p className="text-[11px] text-[#4D4560] mt-1.5">{item.sub}</p>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3D3550]" />
              <input
                type="text"
                placeholder="Search customers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-[#110E16] border border-[#1C1828] pl-8 pr-4 py-2.5 text-[12px] text-[#C0B8CC] placeholder:text-[#3D3550] focus:border-[#C9A55A]/50 focus:outline-none transition-colors w-56 rounded-sm"
              />
            </div>
            <div className="flex gap-1.5">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`text-[11px] font-medium px-3 py-1.5 border rounded-sm transition-all duration-200 ${
                    filter === f
                      ? "border-[#C9A55A]/40 text-[#C9A55A] bg-[#C9A55A]/8"
                      : "border-[#1C1828] text-[#4D4560] hover:border-[#2C2438] hover:text-[#6B6378]"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="bg-[#110E16] border border-[#1C1828] px-3 py-2.5 text-[12px] text-[#6B6378] focus:outline-none rounded-sm"
            >
              <option value="spend">Sort: Total Spend</option>
              <option value="bookings">Sort: Bookings</option>
              <option value="name">Sort: Name</option>
            </select>
            <button className="flex items-center gap-2 bg-[#C9A55A] text-[#0D0B0E] px-4 py-2.5 text-[12px] font-semibold hover:bg-[#E8C99A] transition-colors rounded-sm">
              <UserPlus size={12} /> Add Customer
            </button>
          </div>
        </div>

        {/* Table */}
        <motion.div
          className="bg-[#110E16] border border-[#1C1828] overflow-hidden"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1C1828]">
                  {["Customer", "Location", "Total Spend", "Bookings", "Last Visit", "Joined", "Status", ""].map((h) => (
                    <th key={h} className="px-5 py-2.5 text-left text-[10px] font-semibold uppercase tracking-[0.08em] text-[#4D4560]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} className="border-b border-[#0D0B0E] hover:bg-[#1C1828]/40 transition-colors duration-150 group">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 bg-[#1C1828] border border-[#2C2438] rounded-sm flex items-center justify-center flex-shrink-0">
                          <span className="text-[10px] font-bold text-[#C9A55A]">
                            {c.name.split(" ").map((n) => n[0]).join("")}
                          </span>
                        </div>
                        <div>
                          <div className="text-[13px] font-medium text-[#C0B8CC]">{c.name}</div>
                          <div className="text-[11px] text-[#4D4560]">{c.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-[12px] text-[#6B6378]">{c.location}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-[13px] font-semibold text-[#C9A55A]">${c.totalSpend.toLocaleString()}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-[13px] text-[#9B93A8]">{c.bookings}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-[12px] text-[#6B6378]">{c.lastVisit}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-[12px] text-[#4D4560]">{c.joined}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-[11px] font-semibold px-2 py-1 rounded-sm ${statusColors[c.status]}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-6 h-6 border border-[#2C2438] rounded-sm flex items-center justify-center hover:border-[#C9A55A] hover:text-[#C9A55A] text-[#4D4560] transition-all">
                          <Mail size={10} />
                        </button>
                        <button className="w-6 h-6 border border-[#2C2438] rounded-sm flex items-center justify-center hover:border-[#C9A55A] hover:text-[#C9A55A] text-[#4D4560] transition-all">
                          <MoreHorizontal size={10} />
                        </button>
                      </div>
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
