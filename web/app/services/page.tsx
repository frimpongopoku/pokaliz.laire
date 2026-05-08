"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { services } from "@/lib/data";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

const categories = ["All", ...services.map((s) => s.category)];

export default function ServicesPage() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? services : services.filter((s) => s.category === active);

  return (
    <div className="min-h-screen bg-[#0D0B0E] pt-28">
      {/* Page header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 border-b border-[#1A1620]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p
            className="text-[10px] tracking-[0.45em] uppercase text-[#C9A55A] mb-4"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            What We Offer
          </p>
          <h1
            className="font-light leading-[1] text-[#F2ECE4] mb-6"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(3.5rem, 8vw, 8rem)",
            }}
          >
            Our Services
          </h1>
          <div className="w-16 h-px bg-[#C9A55A]" />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`text-[10px] tracking-[0.2em] uppercase px-5 py-2.5 transition-all duration-200 ${
                active === cat
                  ? "bg-[#C9A55A] text-[#0D0B0E]"
                  : "border border-[#2C2438] text-[#554D60] hover:border-[#C9A55A]/40 hover:text-[#887A90]"
              }`}
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Service groups */}
        <div className="space-y-24">
          {filtered.map((service, si) => (
            <motion.div
              key={service.id}
              id={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Category header */}
              <div className="flex items-center gap-5 mb-10 pb-6 border-b border-[#1A1620]">
                <span className="text-3xl text-[#C9A55A]">{service.icon}</span>
                <div>
                  <h2
                    className="font-light text-3xl text-[#F2ECE4]"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {service.category}
                  </h2>
                  <p
                    className="text-[10px] text-[#554D60] mt-1"
                    style={{ fontFamily: "var(--font-manrope)" }}
                  >
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Service items */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {service.items.map((item, ii) => (
                  <motion.div
                    key={item.name}
                    className="group bg-[#110E15] border border-[#1A1620] p-7 hover:border-[#C9A55A]/30 transition-all duration-300 flex flex-col justify-between"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: ii * 0.08 }}
                  >
                    <div>
                      <h3
                        className="font-light text-xl text-[#F2ECE4] mb-4 group-hover:text-[#E8C99A] transition-colors duration-300"
                        style={{ fontFamily: "var(--font-cormorant)" }}
                      >
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-[#554D60]">
                        <Clock size={11} />
                        <span
                          className="text-[10px]"
                          style={{ fontFamily: "var(--font-manrope)" }}
                        >
                          {item.duration} min
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-8">
                      <span
                        className="font-light text-2xl text-[#C9A55A]"
                        style={{ fontFamily: "var(--font-cormorant)" }}
                      >
                        ${item.price}
                      </span>
                      <Link href="/book">
                        <button
                          className="flex items-center gap-2 text-[9px] tracking-[0.2em] uppercase border border-[#2C2438] text-[#554D60] px-3 py-2 group-hover:border-[#C9A55A]/50 group-hover:text-[#C9A55A] transition-all duration-300"
                          style={{ fontFamily: "var(--font-manrope)" }}
                        >
                          Book <ArrowRight size={10} />
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
