"use client";

import { X, Edit, Package, TrendingUp, Archive } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { adminProducts } from "@/lib/admin-data";

type AdminProduct = typeof adminProducts[number];

const stockConfig: Record<string, { text: string; bg: string; dot: string }> = {
  "In Stock":     { text: "text-emerald-400", bg: "bg-emerald-400/10", dot: "bg-emerald-400" },
  "Low Stock":    { text: "text-amber-400",   bg: "bg-amber-400/10",   dot: "bg-amber-400"   },
  "Out of Stock": { text: "text-rose-400",    bg: "bg-rose-400/10",    dot: "bg-rose-400"    },
};

const DUMMY_DESCRIPTION: Record<string, string> = {
  "Velvet Rose Face Oil":      "A luxuriously lightweight face oil infused with Bulgarian rose and squalane. Visibly plumps, brightens, and softens skin overnight.",
  "Noir Matte Lipstick":       "Long-wearing matte formula in a deep noir shade. Intensely pigmented, non-drying. Buildable coverage for all skin tones.",
  "Gold Elixir Serum":         "A concentrated gold-peptide serum that visibly firms and illuminates. Key ingredient: 24k gold nanoparticles + hyaluronic acid.",
  "Lash Amplifier Mascara":    "Volumising and lengthening formula with a curved brush. Buildable, smudge-proof, and easy to remove.",
  "Hydra-Glow Moisturiser":    "24-hour hydration with ceramides and niacinamide. Leaves skin with a natural, lit-from-within glow.",
  "Brow Sculpt Kit":           "Complete brow kit: sculpting wax, micro-fill powder, and spoolie brush. Lasts all day, waterproof.",
  "Rose Gold Lip Set":         "A curated set of 3 rose-gold lip shades — nude, blush, and statement — in long-wear satin formula.",
  "Midnight Repair Mask":      "An overnight treatment mask with retinol, bakuchiol, and peptides. Wake up to visibly smoother, firmer skin.",
};

interface ProductViewSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: AdminProduct;
  onEdit?: (product: AdminProduct) => void;
}

export function ProductViewSheet({ open, onOpenChange, product, onEdit }: ProductViewSheetProps) {
  if (!product) return null;

  const cfg = stockConfig[product.status];
  const revenue = product.price * product.sold;
  const description = DUMMY_DESCRIPTION[product.name] ?? "Premium beauty product from the Pokaliz Laire collection.";
  const stockPct = Math.min(100, (product.stock / 50) * 100);

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
              Product Details
            </SheetTitle>
            <SheetClose className="w-7 h-7 border border-[#1C1828] rounded-sm flex items-center justify-center text-[#4D4560] hover:text-[#9B93A8] hover:border-[#2C2438] transition-all">
              <X size={13} />
            </SheetClose>
          </div>
        </SheetHeader>

        <div className="flex-1 px-6 py-6 space-y-6">

          {/* Product hero */}
          <div className={`relative bg-gradient-to-br ${product.gradient} rounded-sm overflow-hidden h-44 flex items-center justify-center`}>
            <div className="absolute w-32 h-32 rounded-full blur-3xl opacity-40" style={{ backgroundColor: product.accent }} />
            <div className="relative text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/30 mb-2">{product.category}</p>
              <p className="text-[18px] font-bold text-white/70 max-w-[280px] text-center leading-snug px-4">{product.name}</p>
            </div>
            {/* Status badge overlay */}
            <div className={`absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[11px] font-semibold ${cfg.text} ${cfg.bg}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
              {product.status}
            </div>
          </div>

          {/* Pricing + category */}
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378] mb-1">Price</p>
              <p className="text-[28px] font-bold text-[#C9A55A] leading-none">${product.price}</p>
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] px-3 py-1.5 border border-[#2C2438] text-[#6B6378] rounded-sm">
              {product.category}
            </span>
          </div>

          {/* Description */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378] mb-2">About</p>
            <p className="text-[13px] text-[#9B93A8] leading-relaxed">{description}</p>
          </div>

          {/* Stock bar */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378]">Stock Level</p>
              <span className={`text-[12px] font-semibold ${cfg.text}`}>{product.stock} units</span>
            </div>
            <div className="h-1.5 bg-[#1C1828] rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  product.stock === 0 ? "bg-rose-500" : product.stock <= 10 ? "bg-amber-400" : "bg-emerald-400"
                }`}
                style={{ width: `${stockPct}%` }}
              />
            </div>
            {product.stock <= 10 && product.stock > 0 && (
              <p className="text-[11px] text-amber-400/70 mt-1.5">Low stock — consider restocking soon.</p>
            )}
            {product.stock === 0 && (
              <p className="text-[11px] text-rose-400/70 mt-1.5">Out of stock — unavailable in the shop.</p>
            )}
          </div>

          {/* Sales stats */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378] mb-3">Performance</p>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#110E16] border border-[#1C1828] rounded-sm px-4 py-3 text-center">
                <Package size={13} className="text-[#4D4560] mx-auto mb-1.5" />
                <p className="text-[18px] font-bold text-[#E8E0F0]">{product.sold}</p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#4D4560] mt-0.5">Units Sold</p>
              </div>
              <div className="bg-[#110E16] border border-[#1C1828] rounded-sm px-4 py-3 text-center">
                <TrendingUp size={13} className="text-[#C9A55A] mx-auto mb-1.5" />
                <p className="text-[18px] font-bold text-[#C9A55A]">${revenue.toLocaleString()}</p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#4D4560] mt-0.5">Revenue</p>
              </div>
              <div className="bg-[#110E16] border border-[#1C1828] rounded-sm px-4 py-3 text-center">
                <Archive size={13} className="text-[#4D4560] mx-auto mb-1.5" />
                <p className="text-[18px] font-bold text-[#E8E0F0]">{product.stock + product.sold}</p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#4D4560] mt-0.5">Total Stock</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#1C1828] flex gap-3">
          <SheetClose asChild>
            <button className="flex-1 py-2.5 text-[12px] font-semibold text-[#6B6378] border border-[#1C1828] rounded-sm hover:border-[#2C2438] hover:text-[#9B93A8] transition-all">
              Close
            </button>
          </SheetClose>
          <button
            onClick={() => { onOpenChange(false); onEdit?.(product); }}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 text-[12px] font-semibold bg-[#C9A55A] text-[#0D0B0E] rounded-sm hover:bg-[#E8C99A] transition-colors"
          >
            <Edit size={13} /> Edit Product
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
