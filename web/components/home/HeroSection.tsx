"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

const stats = [
  { value: "12K+", label: "Happy Clients" },
  { value: "98%", label: "Satisfaction" },
  { value: "6", label: "Expert Artists" },
];

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Layered gradient background */}
      <div className="absolute inset-0 bg-[#0D0B0E]" />
      <div className="absolute top-0 left-0 w-[70vw] h-[70vh] bg-[#2A1825]/50 rounded-full blur-[140px] -translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-0 right-0 w-[60vw] h-[60vh] bg-[#1A0F1D]/60 rounded-full blur-[120px] translate-x-1/4 translate-y-1/4" />
      <div className="absolute top-1/2 right-1/4 w-[40vw] h-[40vw] bg-[#C9A55A]/4 rounded-full blur-[100px] orb" />
      <div className="absolute bottom-1/3 left-1/3 w-[30vw] h-[30vw] bg-[#B57850]/3 rounded-full blur-[80px] orb-delay" />

      {/* Thin decorative horizontal line */}
      <motion.div
        className="absolute top-[40%] left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #C9A55A18, transparent)" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, delay: 1 }}
      />

      {/* Vertical decorative lines */}
      <motion.div
        className="absolute left-[8%] top-24 bottom-24 w-px bg-gradient-to-b from-transparent via-[#2C2438] to-transparent hidden lg:block"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />

      {/* Main content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pt-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
          <div className="lg:col-span-8">
            {/* Eyebrow label */}
            <motion.div
              className="flex items-center gap-4 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="w-8 h-px bg-[#C9A55A]" />
              <span
                className="text-[10px] tracking-[0.45em] uppercase text-[#C9A55A]"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                Luxury Beauty House · Est. 2025
              </span>
            </motion.div>

            {/* Main headline */}
            <div className="overflow-hidden mb-1">
              <motion.h1
                className="font-light leading-[0.88] tracking-[-0.02em] text-[#F2ECE4]"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(5rem, 12vw, 11rem)",
                }}
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
              >
                Pokaliz
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-10">
              <motion.h1
                className="font-light leading-[0.88] tracking-[-0.02em] gold-shimmer pl-[clamp(2rem,6vw,6rem)]"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(5rem, 12vw, 11rem)",
                }}
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.65, ease: [0.23, 1, 0.32, 1] }}
              >
                Laire
              </motion.h1>
            </div>

            {/* Divider + tagline */}
            <motion.div
              className="flex items-center gap-6 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <div className="w-14 h-px bg-[#C9A55A]/40" />
              <span
                className="text-[10px] tracking-[0.35em] uppercase text-[#554D60]"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                Beauty redefined · Luxury reimagined
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <Link href="/book">
                <button
                  className="text-[10px] tracking-[0.25em] uppercase bg-[#C9A55A] text-[#0D0B0E] px-10 py-4 hover:bg-[#E8C99A] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  Book Your Experience
                </button>
              </Link>
              <Link href="/shop">
                <button
                  className="text-[10px] tracking-[0.25em] uppercase border border-[#2C2438] text-[#F2ECE4] px-10 py-4 hover:border-[#C9A55A]/50 hover:text-[#C9A55A] transition-all duration-300"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  Shop Collection
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Stats column */}
          <motion.div
            className="lg:col-span-4 hidden lg:flex flex-col items-end justify-center gap-12 pl-12"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 1.4 }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-right">
                <div
                  className="font-light text-[#C9A55A] leading-none mb-1"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "clamp(2rem, 3.5vw, 3.5rem)",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-[9px] tracking-[0.3em] uppercase text-[#554D60]"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span
          className="text-[9px] tracking-[0.4em] uppercase text-[#2C2438]"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={12} className="text-[#C9A55A]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
