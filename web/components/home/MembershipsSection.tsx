"use client";

import { motion } from "framer-motion";
import { memberships } from "@/lib/data";
import { Check } from "lucide-react";
import Link from "next/link";

export function MembershipsSection() {
  return (
    <section className="py-36 px-6 lg:px-10 bg-[#0D0B0E] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vh] bg-[#C9A55A]/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p
            className="text-[10px] tracking-[0.45em] uppercase text-[#C9A55A] mb-4"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Exclusive Membership
          </p>
          <h2
            className="font-light leading-[1] text-[#F2ECE4] mb-6"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2.8rem, 5.5vw, 5.5rem)",
            }}
          >
            Your beauty,
            <br />
            <em className="text-[#554D60]">on a schedule</em>
          </h2>
          <p
            className="text-xs text-[#554D60] max-w-sm mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Join thousands of women who experience Pokaliz Laire on their terms — monthly, seamlessly, luxuriously.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {memberships.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`relative flex flex-col border transition-all duration-300 ${
                plan.featured
                  ? "border-[#C9A55A]/70 bg-[#110E15] scale-[1.03] shadow-[0_0_60px_rgba(201,165,90,0.08)]"
                  : "border-[#1A1620] bg-[#0F0D12] hover:border-[#2C2438]"
              }`}
            >
              {/* Most popular badge */}
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span
                    className="text-[9px] tracking-[0.3em] uppercase bg-[#C9A55A] text-[#0D0B0E] px-4 py-1"
                    style={{ fontFamily: "var(--font-manrope)" }}
                  >
                    Most Loved
                  </span>
                </div>
              )}

              <div className="p-8 flex flex-col flex-1">
                {/* Plan name */}
                <div className="mb-6">
                  <h3
                    className="font-light text-3xl mb-2"
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      color: plan.accent,
                    }}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className="text-[10px] text-[#554D60] leading-relaxed"
                    style={{ fontFamily: "var(--font-manrope)" }}
                  >
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-8 pb-8 border-b border-[#1A1620]">
                  <span
                    className="text-sm text-[#554D60]"
                    style={{ fontFamily: "var(--font-manrope)" }}
                  >
                    $
                  </span>
                  <span
                    className="font-light text-5xl text-[#F2ECE4] leading-none"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {plan.price}
                  </span>
                  <span
                    className="text-xs text-[#554D60]"
                    style={{ fontFamily: "var(--font-manrope)" }}
                  >
                    /{plan.period}
                  </span>
                </div>

                {/* Features */}
                <ul className="space-y-3.5 mb-10 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        size={13}
                        className="mt-0.5 flex-shrink-0"
                        style={{ color: plan.accent }}
                      />
                      <span
                        className="text-[10px] text-[#554D60] leading-relaxed"
                        style={{ fontFamily: "var(--font-manrope)" }}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link href="/book">
                  <button
                    className={`w-full py-4 text-[10px] tracking-[0.25em] uppercase transition-all duration-300 ${
                      plan.featured
                        ? "bg-[#C9A55A] text-[#0D0B0E] hover:bg-[#E8C99A]"
                        : "border border-[#2C2438] text-[#554D60] hover:border-[#C9A55A]/40 hover:text-[#C9A55A]"
                    }`}
                    style={{ fontFamily: "var(--font-manrope)" }}
                  >
                    {plan.cta}
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
