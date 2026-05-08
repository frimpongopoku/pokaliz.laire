"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/shop", label: "Shop" },
  { href: "/book", label: "Book" },
  { href: "/memberships", label: "Memberships" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 60);
  });

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: scrolled ? "rgba(13,11,14,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(44,36,56,0.8)" : "1px solid transparent",
        transition: "all 0.4s ease",
      }}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group">
            <span
              className="text-xl font-light tracking-[0.35em] text-[#F2ECE4] uppercase transition-colors duration-300 group-hover:text-[#C9A55A]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Pokaliz
            </span>
            <span
              className="-mt-1 text-sm font-light tracking-[0.65em] text-[#C9A55A] uppercase"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Laire
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover-line font-sans text-[10px] tracking-[0.25em] uppercase text-[#887A90] hover:text-[#F2ECE4] transition-colors duration-300"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Menu */}
          <div className="flex items-center gap-4">
            <Link href="/book" className="hidden md:inline-flex">
              <button
                className="font-sans text-[10px] tracking-[0.2em] uppercase bg-[#C9A55A] text-[#0D0B0E] px-6 py-3 hover:bg-[#E8C99A] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                Book Now
              </button>
            </Link>

            <Sheet>
              <SheetTrigger asChild>
                <button className="md:hidden p-2 text-[#F2ECE4] hover:text-[#C9A55A] transition-colors">
                  <Menu size={20} />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-[#0D0B0E] border-[#2C2438] w-72 p-8"
              >
                <div className="flex flex-col h-full">
                  <Link href="/" className="flex flex-col leading-none mb-12">
                    <span
                      className="text-2xl font-light tracking-[0.35em] text-[#F2ECE4] uppercase"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      Pokaliz
                    </span>
                    <span
                      className="-mt-1 text-base font-light tracking-[0.65em] text-[#C9A55A] uppercase"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      Laire
                    </span>
                  </Link>

                  <nav className="flex flex-col gap-7 mb-auto">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="font-sans text-sm tracking-[0.25em] uppercase text-[#887A90] hover:text-[#F2ECE4] transition-colors duration-300"
                        style={{ fontFamily: "var(--font-manrope)" }}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>

                  <div className="pt-8 border-t border-[#2C2438]">
                    <Link href="/book" className="block">
                      <button className="w-full font-sans text-[10px] tracking-[0.2em] uppercase bg-[#C9A55A] text-[#0D0B0E] py-4 hover:bg-[#E8C99A] transition-colors">
                        Book Now
                      </button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
