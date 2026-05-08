"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { services } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export function ServicesShowcase() {
  return (
    <section className="py-36 px-6 lg:px-10 max-w-7xl mx-auto">
      {/* Section header */}
      <motion.div
        className="mb-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p
          className="text-[10px] tracking-[0.45em] uppercase text-[#C9A55A] mb-4"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          Our Expertise
        </p>
        <h2
          className="font-light leading-[1] text-[#F2ECE4]"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(2.8rem, 5.5vw, 5.5rem)",
          }}
        >
          Crafted for
          <br />
          <em className="text-[#554D60]">Every Woman</em>
        </h2>
      </motion.div>

      {/* 3×2 grid with thin dividers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1A1620]">
        {services.map((service, i) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <Link href={`/services#${service.id}`}>
              <div className="group relative bg-[#0D0B0E] p-10 h-64 flex flex-col justify-between hover:bg-[#110E15] transition-all duration-500 overflow-hidden cursor-pointer">
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#C9A55A]/0 via-transparent to-transparent group-hover:from-[#C9A55A]/4 transition-all duration-700" />

                {/* Top row */}
                <div className="flex items-start justify-between">
                  <span
                    className="text-2xl text-[#C9A55A]/60 group-hover:text-[#C9A55A] transition-all duration-400 group-hover:scale-110 inline-block"
                  >
                    {service.icon}
                  </span>
                  <span
                    className="text-[9px] tracking-[0.3em] text-[#1A1620] group-hover:text-[#2C2438] transition-colors duration-300"
                    style={{ fontFamily: "var(--font-manrope)" }}
                  >
                    0{i + 1}
                  </span>
                </div>

                {/* Bottom content */}
                <div>
                  <h3
                    className="font-light text-2xl text-[#F2ECE4] mb-2 group-hover:text-[#E8C99A] transition-colors duration-300"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {service.category}
                  </h3>
                  <p
                    className="text-[10px] text-[#554D60] leading-relaxed"
                    style={{ fontFamily: "var(--font-manrope)" }}
                  >
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <span
                      className="text-[9px] tracking-[0.25em] uppercase text-[#C9A55A]"
                      style={{ fontFamily: "var(--font-manrope)" }}
                    >
                      Explore
                    </span>
                    <ArrowRight size={11} className="text-[#C9A55A]" />
                  </div>
                </div>

                {/* Gold bottom border on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-[#C9A55A] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* View all link */}
      <motion.div
        className="mt-10 flex justify-end"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <Link
          href="/services"
          className="group flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase text-[#554D60] hover:text-[#C9A55A] transition-colors duration-300"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          View All Services
          <ArrowRight
            size={12}
            className="group-hover:translate-x-1.5 transition-transform duration-300"
          />
        </Link>
      </motion.div>
    </section>
  );
}
