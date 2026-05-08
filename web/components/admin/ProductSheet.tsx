"use client";

import { useState, useEffect } from "react";
import { X, Plus, Save } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";

type StockStatus = "In Stock" | "Low Stock" | "Out of Stock";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sold: number;
  status: StockStatus;
  gradient: string;
  accent: string;
}

const GRADIENT_PRESETS = [
  { label: "Rose / Pink",      value: "from-rose-950 to-pink-900",      accent: "#D4A8A8" },
  { label: "Stone / Neutral",  value: "from-stone-950 to-neutral-900",  accent: "#C9A55A" },
  { label: "Amber / Yellow",   value: "from-amber-950 to-yellow-900",   accent: "#C9A55A" },
  { label: "Slate / Zinc",     value: "from-slate-950 to-zinc-900",     accent: "#D4A8A8" },
  { label: "Blue / Indigo",    value: "from-blue-950 to-indigo-900",    accent: "#B57850" },
  { label: "Purple / Violet",  value: "from-purple-950 to-violet-900",  accent: "#E8C99A" },
  { label: "Rose / Amber",     value: "from-rose-950 to-amber-900",     accent: "#B57850" },
  { label: "Gray / Slate",     value: "from-gray-950 to-slate-900",     accent: "#C9A55A" },
];

const CATEGORIES = ["Skincare", "Makeup", "Tools", "Fragrance"];

function deriveStatus(stock: number): StockStatus {
  if (stock === 0) return "Out of Stock";
  if (stock <= 10) return "Low Stock";
  return "In Stock";
}

interface ProductSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product;
}

export function ProductSheet({ open, onOpenChange, product }: ProductSheetProps) {
  const isEditing = !!product;

  const [form, setForm] = useState({
    name: "",
    category: "Skincare",
    price: "",
    stock: "",
    description: "",
    gradient: GRADIENT_PRESETS[0].value,
  });
  const [statusOverride, setStatusOverride] = useState<StockStatus | null>(null);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        category: product.category,
        price: String(product.price),
        stock: String(product.stock),
        description: "",
        gradient: product.gradient,
      });
      setStatusOverride(null);
    } else {
      setForm({ name: "", category: "Skincare", price: "", stock: "", description: "", gradient: GRADIENT_PRESETS[0].value });
      setStatusOverride(null);
    }
  }, [product, open]);

  const stockNum = parseInt(form.stock) || 0;
  const derivedStatus = deriveStatus(stockNum);
  const effectiveStatus: StockStatus = statusOverride ?? derivedStatus;
  const selectedPreset = GRADIENT_PRESETS.find((g) => g.value === form.gradient) ?? GRADIENT_PRESETS[0];

  const statusConfig: Record<StockStatus, { dot: string; text: string; bg: string; border: string }> = {
    "In Stock":     { dot: "bg-emerald-400", text: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/30" },
    "Low Stock":    { dot: "bg-amber-400",   text: "text-amber-400",   bg: "bg-amber-400/10",   border: "border-amber-400/30"   },
    "Out of Stock": { dot: "bg-rose-400",    text: "text-rose-400",    bg: "bg-rose-400/10",    border: "border-rose-400/30"    },
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // UI-only: just close
    onOpenChange(false);
  }

  const previewName = form.name || (isEditing ? product!.name : "Product Name");

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full sm:max-w-[520px] bg-[#0D0B0E] border-l border-[#1C1828] flex flex-col gap-0 p-0 overflow-y-auto"
      >
        {/* Header */}
        <SheetHeader className="px-6 py-5 border-b border-[#1C1828] gap-1">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-[15px] font-semibold text-[#E8E0F0] tracking-[-0.01em]">
              {isEditing ? "Edit Product" : "Add Product"}
            </SheetTitle>
            <SheetClose className="w-7 h-7 border border-[#1C1828] rounded-sm flex items-center justify-center text-[#4D4560] hover:text-[#9B93A8] hover:border-[#2C2438] transition-all">
              <X size={13} />
            </SheetClose>
          </div>
          <SheetDescription className="text-[12px] text-[#4D4560]">
            {isEditing ? `Editing "${product!.name}"` : "Fill in the details to list a new product."}
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1">
          <div className="flex-1 px-6 py-6 space-y-6">

            {/* Live preview card */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378] mb-3">
                Product Colour
              </label>
              <div className="flex items-center gap-4">
                {/* Preview tile */}
                <div className={`relative w-16 h-16 bg-gradient-to-br ${form.gradient} rounded-sm border border-[#2C2438] flex items-center justify-center flex-shrink-0 overflow-hidden`}>
                  <div className="absolute w-10 h-10 rounded-full blur-xl opacity-50" style={{ backgroundColor: selectedPreset.accent }} />
                  <span className="relative text-[9px] font-semibold uppercase tracking-widest text-white/30">
                    {form.category}
                  </span>
                </div>
                {/* Swatch grid */}
                <div className="grid grid-cols-8 gap-1.5">
                  {GRADIENT_PRESETS.map((preset) => (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, gradient: preset.value }))}
                      title={preset.label}
                      className={`w-7 h-7 bg-gradient-to-br ${preset.value} rounded-sm border-2 transition-all ${
                        form.gradient === preset.value
                          ? "border-[#C9A55A] scale-110"
                          : "border-transparent hover:border-[#2C2438]"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-[#1C1828]" />

            {/* Product name */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378] mb-2">
                Product Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Velvet Rose Face Oil"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full bg-[#110E16] border border-[#1C1828] px-3 py-2.5 text-[13px] text-[#C0B8CC] placeholder:text-[#3D3550] focus:border-[#C9A55A]/50 focus:outline-none transition-colors rounded-sm"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378] mb-2">
                Category <span className="text-rose-400">*</span>
              </label>
              <div className="flex gap-2 flex-wrap">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, category: cat }))}
                    className={`px-3 py-2 text-[12px] font-medium border rounded-sm transition-all ${
                      form.category === cat
                        ? "border-[#C9A55A]/40 text-[#C9A55A] bg-[#C9A55A]/8"
                        : "border-[#1C1828] text-[#4D4560] hover:border-[#2C2438] hover:text-[#6B6378]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price + Stock */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378] mb-2">
                  Price (£) <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-[#4D4560] font-medium">£</span>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={form.price}
                    onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                    className="w-full bg-[#110E16] border border-[#1C1828] pl-7 pr-3 py-2.5 text-[13px] text-[#C0B8CC] placeholder:text-[#3D3550] focus:border-[#C9A55A]/50 focus:outline-none transition-colors rounded-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378] mb-2">
                  Stock Count <span className="text-rose-400">*</span>
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  placeholder="0"
                  value={form.stock}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, stock: e.target.value }));
                    setStatusOverride(null); // reset override when stock changes
                  }}
                  className="w-full bg-[#110E16] border border-[#1C1828] px-3 py-2.5 text-[13px] text-[#C0B8CC] placeholder:text-[#3D3550] focus:border-[#C9A55A]/50 focus:outline-none transition-colors rounded-sm"
                />
              </div>
            </div>

            {/* Status — auto-derived + manual override */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378]">
                  Stock Status
                </label>
                {statusOverride && (
                  <button
                    type="button"
                    onClick={() => setStatusOverride(null)}
                    className="text-[10px] text-[#4D4560] hover:text-[#C9A55A] transition-colors"
                  >
                    Reset to auto
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                {(["In Stock", "Low Stock", "Out of Stock"] as StockStatus[]).map((s) => {
                  const cfg = statusConfig[s];
                  const active = effectiveStatus === s;
                  const isAuto = !statusOverride && derivedStatus === s;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setStatusOverride(s)}
                      className={`flex items-center gap-1.5 px-3 py-2 text-[12px] font-medium border rounded-sm transition-all relative ${
                        active
                          ? `${cfg.border} ${cfg.text} ${cfg.bg}`
                          : "border-[#1C1828] text-[#4D4560] hover:border-[#2C2438] hover:text-[#6B6378]"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                      {s}
                      {isAuto && (
                        <span className="text-[9px] text-[#3D3550] font-normal ml-0.5">(auto)</span>
                      )}
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-[#3D3550] mt-1.5">
                Auto-set from stock count — override if needed.
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378] mb-2">
                Description <span className="text-[#3D3550] normal-case tracking-normal font-normal">(optional)</span>
              </label>
              <textarea
                rows={3}
                placeholder="Short product description for the shop listing…"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                className="w-full bg-[#110E16] border border-[#1C1828] px-3 py-2.5 text-[13px] text-[#C0B8CC] placeholder:text-[#3D3550] focus:border-[#C9A55A]/50 focus:outline-none transition-colors rounded-sm resize-none"
              />
            </div>

            {/* Edit-only: sold count info strip */}
            {isEditing && (
              <div className="bg-[#110E16] border border-[#1C1828] rounded-sm px-4 py-3 grid grid-cols-3 gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#4D4560] mb-1">Units Sold</p>
                  <p className="text-[18px] font-bold text-[#E8E0F0]">{product!.sold}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#4D4560] mb-1">Revenue</p>
                  <p className="text-[18px] font-bold text-[#C9A55A]">
                    £{(product!.price * product!.sold).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#4D4560] mb-1">Current Price</p>
                  <p className="text-[18px] font-bold text-[#E8E0F0]">£{product!.price}</p>
                </div>
              </div>
            )}
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
              {isEditing ? <><Save size={13} /> Save Changes</> : <><Plus size={13} /> Add Product</>}
            </button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
