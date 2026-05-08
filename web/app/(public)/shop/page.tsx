"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { products } from "@/lib/data";
import { ShoppingBag, Heart, Search, ExternalLink } from "lucide-react";

const categories = ["All", "Skincare", "Makeup"];
const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Newest"];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Featured");
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);

  const filtered = products
    .filter((p) => activeCategory === "All" || p.category === activeCategory)
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "Price: Low to High") return a.price - b.price;
    if (sortBy === "Price: High to Low") return b.price - a.price;
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#0D0B0E] pt-28">
      {/* Page header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 border-b border-[#1A1620]">
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <p
              className="text-[10px] tracking-[0.45em] uppercase text-[#C9A55A] mb-4"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              The Collection
            </p>
            <h1
              className="font-light leading-none text-[#F2ECE4]"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(3.5rem, 8vw, 8rem)",
              }}
            >
              Shop
            </h1>
          </div>

          {/* Cart indicator */}
          {cartCount > 0 && (
            <div className="flex items-center gap-3 border border-[#C9A55A]/30 bg-[#141118] px-5 py-3">
              <ShoppingBag size={15} className="text-[#C9A55A]" />
              <span
                className="text-xs text-[#F2ECE4]"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                {cartCount} {cartCount === 1 ? "item" : "items"} in bag
              </span>
            </div>
          )}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        {/* Filters */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 mb-14">
          {/* Category buttons */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] tracking-[0.2em] uppercase px-5 py-2.5 transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#C9A55A] text-[#0D0B0E]"
                    : "border border-[#2C2438] text-[#554D60] hover:border-[#C9A55A]/40 hover:text-[#887A90]"
                }`}
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search + Sort */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search
                size={12}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#2C2438]"
              />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent border border-[#2C2438] pl-9 pr-4 py-2.5 text-[10px] text-[#F2ECE4] placeholder:text-[#2C2438] focus:border-[#C9A55A] focus:outline-none transition-colors w-40"
                style={{ fontFamily: "var(--font-manrope)" }}
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#0D0B0E] border border-[#2C2438] px-3 py-2.5 text-[10px] text-[#554D60] focus:outline-none focus:border-[#C9A55A] transition-colors cursor-pointer"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {sortOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count */}
        <p
          className="text-[9px] tracking-[0.25em] uppercase text-[#2C2438] mb-8"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          {sorted.length} {sorted.length === 1 ? "product" : "products"}
        </p>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-28">
          {sorted.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group"
            >
              <div className="bg-[#110E15] border border-[#1A1620] hover:border-[#C9A55A]/25 transition-all duration-500 overflow-hidden">
                {/* Product visual */}
                <div
                  className={`relative bg-gradient-to-br ${product.gradient} aspect-square flex items-center justify-center overflow-hidden`}
                >
                  {/* Glow */}
                  <div
                    className="absolute w-24 h-24 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                    style={{ backgroundColor: product.accent }}
                  />
                  <div className="relative z-10 text-center select-none px-4">
                    <div
                      className="text-base font-light italic text-white/40"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      {product.category}
                    </div>
                  </div>

                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-3 left-3 z-10">
                      <span
                        className="text-[8px] tracking-[0.2em] uppercase bg-[#C9A55A] text-[#0D0B0E] px-2 py-0.5"
                        style={{ fontFamily: "var(--font-manrope)" }}
                      >
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Wishlist */}
                  <button className="absolute top-3 right-3 z-10 w-7 h-7 bg-[#0D0B0E]/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#0D0B0E]">
                    <Heart size={11} className="text-[#F2ECE4]" />
                  </button>

                  {/* Quick add slide-up */}
                  <div className="absolute inset-x-0 bottom-0 bg-[#C9A55A] py-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-350 z-10">
                    <button
                      onClick={() => setCartCount((c) => c + 1)}
                      className="w-full text-[8px] tracking-[0.25em] uppercase text-[#0D0B0E] flex items-center justify-center gap-2"
                      style={{ fontFamily: "var(--font-manrope)" }}
                    >
                      <ShoppingBag size={10} />
                      Add to Bag
                    </button>
                  </div>
                </div>

                {/* Product info */}
                <div className="p-4">
                  <p
                    className="text-[8px] tracking-[0.2em] uppercase text-[#554D60] mb-1"
                    style={{ fontFamily: "var(--font-manrope)" }}
                  >
                    {product.category}
                  </p>
                  <h3
                    className="font-light text-base text-[#F2ECE4] mb-1 leading-tight"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {product.name}
                  </h3>
                  <p
                    className="text-[9px] text-[#554D60] mb-3 leading-relaxed line-clamp-2"
                    style={{ fontFamily: "var(--font-manrope)" }}
                  >
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span
                        className="text-sm font-medium text-[#C9A55A]"
                        style={{ fontFamily: "var(--font-manrope)" }}
                      >
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span
                          className="text-xs text-[#2C2438] line-through"
                          style={{ fontFamily: "var(--font-manrope)" }}
                        >
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => setCartCount((c) => c + 1)}
                      className="w-7 h-7 border border-[#2C2438] hover:border-[#C9A55A] hover:bg-[#C9A55A] flex items-center justify-center group/btn transition-all duration-300"
                    >
                      <ShoppingBag
                        size={11}
                        className="text-[#554D60] group-hover/btn:text-[#0D0B0E] transition-colors"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {sorted.length === 0 && (
          <div className="text-center py-24">
            <p
              className="font-light text-3xl text-[#2C2438] mb-3"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              No products found
            </p>
            <p
              className="text-xs text-[#2C2438]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
