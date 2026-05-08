"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { products } from "@/lib/data";
import { ShoppingBag, Heart } from "lucide-react";

export function FeaturedProducts() {
  const featured = products.slice(0, 4);

  return (
    <section className="py-36 bg-[#07050A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p
              className="text-[10px] tracking-[0.45em] uppercase text-[#C9A55A] mb-4"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Curated Collection
            </p>
            <h2
              className="font-light leading-[1] text-[#F2ECE4]"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(2.8rem, 5.5vw, 5.5rem)",
              }}
            >
              Beauty,
              <br />
              <em className="text-[#554D60]">Bottled</em>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              href="/shop"
              className="text-[10px] tracking-[0.25em] uppercase text-[#554D60] hover:text-[#C9A55A] transition-colors duration-300 border-b border-[#2C2438] pb-1 hover:border-[#C9A55A]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Shop All Products →
            </Link>
          </motion.div>
        </div>

        {/* Product grid — first card is larger */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
          {featured.map((product, i) => (
            <motion.div
              key={product.id}
              className={
                i === 0
                  ? "lg:col-span-5"
                  : i === 1
                  ? "lg:col-span-4"
                  : "lg:col-span-3"
              }
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <div className="group relative bg-[#110E15] border border-[#1A1620] hover:border-[#C9A55A]/25 transition-all duration-500 overflow-hidden h-full">
                {/* Product visual */}
                <div
                  className={`relative bg-gradient-to-br ${product.gradient} ${
                    i === 0 ? "h-72" : "h-52"
                  } flex items-center justify-center overflow-hidden`}
                >
                  {/* Glowing orb */}
                  <div
                    className="absolute w-28 h-28 rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"
                    style={{ backgroundColor: product.accent }}
                  />
                  <div className="relative z-10 text-center select-none">
                    <div
                      className="text-xl font-light italic text-white/50"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      {product.category}
                    </div>
                  </div>

                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-4 left-4">
                      <span
                        className="text-[9px] tracking-[0.2em] uppercase bg-[#C9A55A] text-[#0D0B0E] px-2 py-1"
                        style={{ fontFamily: "var(--font-manrope)" }}
                      >
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Wishlist */}
                  <button className="absolute top-4 right-4 p-2 bg-[#0D0B0E]/60 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#0D0B0E]">
                    <Heart size={13} className="text-[#F2ECE4]" />
                  </button>

                  {/* Quick add slide-up */}
                  <div className="absolute inset-x-0 bottom-0 bg-[#C9A55A] py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                    <button
                      className="w-full text-[9px] tracking-[0.25em] uppercase text-[#0D0B0E] flex items-center justify-center gap-2"
                      style={{ fontFamily: "var(--font-manrope)" }}
                    >
                      <ShoppingBag size={11} />
                      Quick Add
                    </button>
                  </div>
                </div>

                {/* Product info */}
                <div className="p-5">
                  <p
                    className="text-[9px] tracking-[0.25em] uppercase text-[#554D60] mb-1"
                    style={{ fontFamily: "var(--font-manrope)" }}
                  >
                    {product.category}
                  </p>
                  <h3
                    className="font-light text-lg text-[#F2ECE4] mb-1"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {product.name}
                  </h3>
                  {i === 0 && (
                    <p
                      className="text-[10px] text-[#554D60] mb-4 leading-relaxed"
                      style={{ fontFamily: "var(--font-manrope)" }}
                    >
                      {product.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-3">
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
                    <button className="p-2 border border-[#2C2438] hover:border-[#C9A55A] hover:bg-[#C9A55A] group/btn transition-all duration-300">
                      <ShoppingBag
                        size={12}
                        className="text-[#554D60] group-hover/btn:text-[#0D0B0E] transition-colors"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
