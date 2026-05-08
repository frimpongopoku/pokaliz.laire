"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Package,
  UserCog,
  Settings,
  ChevronLeft,
  ChevronRight,
  Globe,
} from "lucide-react";

const navItems = [
  { href: "/admin",              label: "Overview",      icon: LayoutDashboard },
  { href: "/admin/appointments", label: "Appointments",  icon: CalendarDays    },
  { href: "/admin/customers",    label: "Customers",     icon: Users           },
  { href: "/admin/products",     label: "Products",      icon: Package         },
  { href: "/admin/staff",        label: "Staff",         icon: UserCog         },
];

const bottomItems = [
  { href: "/admin/settings", label: "Settings", icon: Settings },
  { href: "/",               label: "View Site", icon: Globe   },
];

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <motion.aside
      animate={{ width: collapsed ? 68 : 240 }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      className="relative flex-shrink-0 h-screen bg-[#07050A] border-r border-[#141118] flex flex-col overflow-hidden sticky top-0"
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-[#141118] flex-shrink-0">
        <Link href="/admin" className="flex items-center gap-3 min-w-0">
          <div className="w-7 h-7 bg-[#C9A55A] flex-shrink-0 flex items-center justify-center">
            <span className="text-[10px] font-semibold text-[#0D0B0E]" style={{ fontFamily: "var(--font-cormorant)" }}>PL</span>
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
                className="leading-none overflow-hidden"
              >
                <div className="text-sm font-light tracking-[0.2em] text-[#F2ECE4] uppercase whitespace-nowrap" style={{ fontFamily: "var(--font-cormorant)" }}>
                  Pokaliz
                </div>
                <div className="text-[9px] tracking-[0.4em] text-[#C9A55A] uppercase whitespace-nowrap" style={{ fontFamily: "var(--font-cormorant)" }}>
                  Laire Admin
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden">
        <div className="space-y-1 px-2">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link key={href} href={href}>
                <div
                  className={`flex items-center gap-3 px-3 py-2.5 transition-all duration-200 group relative ${
                    active
                      ? "bg-[#C9A55A]/10 text-[#C9A55A]"
                      : "text-[#554D60] hover:text-[#887A90] hover:bg-[#141118]"
                  }`}
                >
                  {active && (
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#C9A55A]" />
                  )}
                  <Icon size={16} className="flex-shrink-0" />
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="text-[11px] tracking-[0.12em] uppercase whitespace-nowrap"
                        style={{ fontFamily: "var(--font-manrope)" }}
                      >
                        {label}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Tooltip when collapsed */}
                  {collapsed && (
                    <div className="absolute left-full ml-2 bg-[#141118] border border-[#2C2438] text-[#F2ECE4] text-[10px] px-2.5 py-1.5 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50"
                      style={{ fontFamily: "var(--font-manrope)" }}
                    >
                      {label}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Divider */}
        <div className="mx-3 my-4 border-t border-[#141118]" />

        <div className="space-y-1 px-2">
          {bottomItems.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href}>
              <div className="flex items-center gap-3 px-3 py-2.5 text-[#2C2438] hover:text-[#554D60] hover:bg-[#141118] transition-all duration-200 group relative">
                <Icon size={15} className="flex-shrink-0" />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-[11px] tracking-[0.12em] uppercase whitespace-nowrap"
                      style={{ fontFamily: "var(--font-manrope)" }}
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {collapsed && (
                  <div className="absolute left-full ml-2 bg-[#141118] border border-[#2C2438] text-[#F2ECE4] text-[10px] px-2.5 py-1.5 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50"
                    style={{ fontFamily: "var(--font-manrope)" }}
                  >
                    {label}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="h-10 border-t border-[#141118] flex items-center justify-center text-[#2C2438] hover:text-[#554D60] hover:bg-[#141118] transition-all duration-200 flex-shrink-0"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </motion.aside>
  );
}
