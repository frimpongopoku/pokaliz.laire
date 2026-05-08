"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/lib/data";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  const t = testimonials[current];

  return (
    <section className="py-36 px-6 lg:px-10 bg-[#0D0B0E] overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p
            className="text-[10px] tracking-[0.45em] uppercase text-[#C9A55A] mb-4"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Client Stories
          </p>
          <h2
            className="font-light leading-[1] text-[#F2ECE4]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2.8rem, 5.5vw, 5.5rem)",
            }}
          >
            Words from
            <br />
            <em className="text-[#554D60]">Our Women</em>
          </h2>
        </motion.div>

        {/* Testimonial block */}
        <div className="relative">
          {/* Giant decorative quote */}
          <div
            className="absolute -top-4 -left-4 text-[10rem] leading-none text-[#C9A55A]/6 select-none pointer-events-none"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            "
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Quote */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.45 }}
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-8">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        fill="#C9A55A"
                        className="text-[#C9A55A]"
                      />
                    ))}
                  </div>

                  {/* Quote text */}
                  <p
                    className="font-light italic leading-[1.6] text-[#D4C8BC] mb-10"
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)",
                    }}
                  >
                    "{t.text}"
                  </p>

                  {/* Attribution */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-px bg-[#C9A55A]" />
                    <div>
                      <div
                        className="text-lg font-light text-[#F2ECE4]"
                        style={{ fontFamily: "var(--font-cormorant)" }}
                      >
                        {t.name}
                      </div>
                      <div
                        className="text-[9px] tracking-[0.25em] uppercase text-[#554D60] mt-0.5"
                        style={{ fontFamily: "var(--font-manrope)" }}
                      >
                        {t.service} · {t.location}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation + other testimonials preview */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              {/* Dot nav */}
              <div className="flex flex-col gap-3">
                {testimonials.map((item, i) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrent(i)}
                    className="flex items-center gap-3 group text-left"
                  >
                    <div
                      className={`h-px transition-all duration-300 ${
                        i === current
                          ? "w-8 bg-[#C9A55A]"
                          : "w-3 bg-[#2C2438] group-hover:bg-[#554D60]"
                      }`}
                    />
                    <span
                      className={`text-[10px] tracking-wide transition-colors duration-300 ${
                        i === current ? "text-[#C9A55A]" : "text-[#2C2438] group-hover:text-[#554D60]"
                      }`}
                      style={{ fontFamily: "var(--font-manrope)" }}
                    >
                      {item.name.split(" ")[0]}
                    </span>
                  </button>
                ))}
              </div>

              {/* Arrow nav */}
              <div className="flex gap-3 mt-8">
                <button
                  onClick={prev}
                  className="w-11 h-11 border border-[#2C2438] flex items-center justify-center hover:border-[#C9A55A] hover:text-[#C9A55A] text-[#554D60] transition-all duration-300"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={next}
                  className="w-11 h-11 border border-[#2C2438] flex items-center justify-center hover:border-[#C9A55A] hover:text-[#C9A55A] text-[#554D60] transition-all duration-300"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
