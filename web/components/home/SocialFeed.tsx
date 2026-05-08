"use client";

import { motion } from "framer-motion";
import { socialPosts } from "@/lib/data";
import { Heart, Play, ExternalLink } from "lucide-react";

export function SocialFeed() {
  return (
    <section className="py-36 bg-[#07050A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <p
              className="text-[10px] tracking-[0.45em] uppercase text-[#C9A55A] mb-4"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Follow the Journey
            </p>
            <h2
              className="font-light text-[#F2ECE4] leading-none"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
              }}
            >
              @pokaliz.laire
            </h2>
          </div>
          <a
            href="#"
            className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-[#554D60] hover:text-[#C9A55A] transition-colors duration-300 group"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Open Instagram
            <ExternalLink size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {socialPosts.map((post, i) => (
            <motion.div
              key={post.id}
              className={
                i === 0
                  ? "col-span-2 row-span-1"
                  : i === 3
                  ? "col-span-2"
                  : "col-span-1"
              }
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <div className="group relative overflow-hidden cursor-pointer aspect-square">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${post.gradient}`}
                />

                {/* Video play icon */}
                {post.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                      <Play size={14} className="text-white" fill="white" />
                    </div>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#0D0B0E]/0 group-hover:bg-[#0D0B0E]/65 transition-all duration-400 z-20" />

                {/* Hover content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 z-30 p-4">
                  <Heart size={18} className="text-white mb-1.5" />
                  <span
                    className="text-white text-xs font-medium"
                    style={{ fontFamily: "var(--font-manrope)" }}
                  >
                    {post.likes}
                  </span>
                  <span
                    className="text-white/60 text-[9px] mt-1 text-center tracking-wide"
                    style={{ fontFamily: "var(--font-manrope)" }}
                  >
                    {post.tag}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
