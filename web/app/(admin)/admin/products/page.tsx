"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { adminProducts } from "@/lib/admin-data";
import { Search, Plus, LayoutGrid, List, Edit, Trash2, AlertTriangle } from "lucide-react";

const stockColors: Record<string, string> = {
  "In Stock":     "text-emerald-400 bg-emerald-400/10",
  "Low Stock":    "text-amber-400   bg-amber-400/10",
  "Out of Stock": "text-rose-400    bg-rose-400/10",
};

const categories = ["All", "Skincare", "Makeup"];

export default function ProductsPage() {
  const [view, setView] = useState<"grid" | "list">("list");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = adminProducts
    .filter((p) => category === "All" || p.category === category)
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  const totalRevenue = adminProducts.reduce((s, p) => s + p.price * p.sold, 0);
  const lowStock = adminProducts.filter((p) => p.status !== "In Stock").length;

  return (
    <>
      <AdminHeader title="Products" subtitle={`${adminProducts.length} products`} />

      <div className="p-6 space-y-5">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Products",  value: adminProducts.length, sub: "Across all categories", alert: false },
            { label: "Total Revenue",   value: `$${totalRevenue.toLocaleString()}`, sub: "From product sales", alert: false },
            { label: "Stock Alerts",    value: lowStock, sub: "Low or out of stock", alert: lowStock > 0 },
          ].map((item) => (
            <div key={item.label} className="bg-[#110E16] border border-[#1C1828] px-5 py-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378]">{item.label}</p>
                {item.alert && <AlertTriangle size={12} className="text-amber-400" />}
              </div>
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
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-[#110E16] border border-[#1C1828] pl-8 pr-4 py-2.5 text-[12px] text-[#C0B8CC] placeholder:text-[#3D3550] focus:border-[#C9A55A]/50 focus:outline-none transition-colors w-52 rounded-sm"
              />
            </div>
            <div className="flex gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`text-[11px] font-medium px-3 py-1.5 border rounded-sm transition-all duration-200 ${
                    category === cat
                      ? "border-[#C9A55A]/40 text-[#C9A55A] bg-[#C9A55A]/8"
                      : "border-[#1C1828] text-[#4D4560] hover:border-[#2C2438] hover:text-[#6B6378]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex border border-[#1C1828] rounded-sm overflow-hidden">
              <button
                onClick={() => setView("list")}
                className={`p-2 transition-colors ${view === "list" ? "bg-[#C9A55A]/10 text-[#C9A55A]" : "text-[#4D4560] hover:text-[#6B6378]"}`}
              >
                <List size={13} />
              </button>
              <button
                onClick={() => setView("grid")}
                className={`p-2 transition-colors ${view === "grid" ? "bg-[#C9A55A]/10 text-[#C9A55A]" : "text-[#4D4560] hover:text-[#6B6378]"}`}
              >
                <LayoutGrid size={13} />
              </button>
            </div>
            <button className="flex items-center gap-2 bg-[#C9A55A] text-[#0D0B0E] px-4 py-2.5 text-[12px] font-semibold hover:bg-[#E8C99A] transition-colors rounded-sm">
              <Plus size={13} /> Add Product
            </button>
          </div>
        </div>

        {/* Grid view */}
        {view === "grid" && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group bg-[#110E16] border border-[#1C1828] hover:border-[#2C2438] transition-all overflow-hidden rounded-sm"
              >
                <div className={`relative bg-gradient-to-br ${p.gradient} aspect-square flex items-center justify-center`}>
                  <div className="absolute w-16 h-16 rounded-full blur-xl opacity-40" style={{ backgroundColor: p.accent }} />
                  <span className="relative text-[11px] font-medium text-white/40 uppercase tracking-widest">
                    {p.category}
                  </span>
                  <div className="absolute inset-0 bg-[#0D0B0E]/0 group-hover:bg-[#0D0B0E]/40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <button className="w-7 h-7 bg-[#0D0B0E]/80 border border-[#2C2438] rounded-sm flex items-center justify-center hover:border-[#C9A55A] hover:text-[#C9A55A] text-[#9B93A8] transition-all">
                      <Edit size={11} />
                    </button>
                    <button className="w-7 h-7 bg-[#0D0B0E]/80 border border-[#2C2438] rounded-sm flex items-center justify-center hover:border-rose-500 hover:text-rose-400 text-[#9B93A8] transition-all">
                      <Trash2 size={11} />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#6B6378] mb-1">{p.category}</p>
                  <p className="text-[13px] font-medium text-[#C0B8CC] mb-3 truncate">{p.name}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold text-[#C9A55A]">${p.price}</span>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-sm ${stockColors[p.status]}`}>
                      {p.stock} left
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* List view */}
        {view === "list" && (
          <motion.div
            className="bg-[#110E16] border border-[#1C1828] overflow-hidden"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1C1828]">
                  {["Product", "Category", "Price", "Stock", "Units Sold", "Revenue", "Status", ""].map((h) => (
                    <th key={h} className="px-5 py-2.5 text-left text-[10px] font-semibold uppercase tracking-[0.08em] text-[#4D4560]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-b border-[#0D0B0E] hover:bg-[#1C1828]/40 transition-colors group">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 bg-gradient-to-br ${p.gradient} flex-shrink-0 rounded-sm`} />
                        <span className="text-[13px] font-medium text-[#C0B8CC]">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3"><span className="text-[12px] text-[#6B6378]">{p.category}</span></td>
                    <td className="px-5 py-3"><span className="text-[13px] font-semibold text-[#C9A55A]">${p.price}</span></td>
                    <td className="px-5 py-3"><span className="text-[13px] text-[#9B93A8]">{p.stock}</span></td>
                    <td className="px-5 py-3"><span className="text-[12px] text-[#6B6378]">{p.sold}</span></td>
                    <td className="px-5 py-3"><span className="text-[13px] font-semibold text-[#C9A55A]">${(p.price * p.sold).toLocaleString()}</span></td>
                    <td className="px-5 py-3">
                      <span className={`text-[11px] font-semibold px-2 py-1 rounded-sm ${stockColors[p.status]}`}>{p.status}</span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-6 h-6 border border-[#2C2438] rounded-sm flex items-center justify-center hover:border-[#C9A55A] hover:text-[#C9A55A] text-[#4D4560] transition-all"><Edit size={10} /></button>
                        <button className="w-6 h-6 border border-[#2C2438] rounded-sm flex items-center justify-center hover:border-rose-500 hover:text-rose-400 text-[#4D4560] transition-all"><Trash2 size={10} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>
    </>
  );
}
