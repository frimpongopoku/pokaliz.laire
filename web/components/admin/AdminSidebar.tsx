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
  Megaphone,
  Instagram,
  ChevronDown,
} from "lucide-react";

const navItems = [
  { href: "/admin",              label: "Overview",     icon: LayoutDashboard },
  { href: "/admin/appointments", label: "Appointments", icon: CalendarDays    },
  { href: "/admin/customers",    label: "Customers",    icon: Users           },
  { href: "/admin/products",     label: "Products",     icon: Package         },
  { href: "/admin/staff",        label: "Staff",        icon: UserCog         },
];

const marketingItems = [
  { href: "/admin/marketing/social", label: "Social Feed", icon: Instagram },
];

const bottomItems = [
  { href: "/admin/settings", label: "Settings",  icon: Settings },
  { href: "/",               label: "View Site", icon: Globe    },
];

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [marketingOpen, setMarketingOpen] = useState(true);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const marketingActive = marketingItems.some((i) => isActive(i.href));

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 220 }}
      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
      className="relative flex-shrink-0 h-screen bg-[#080610] border-r border-[#1C1828] flex flex-col overflow-hidden sticky top-0"
    >
      {/* Logo */}
      <div className="h-14 flex items-center px-4 border-b border-[#1C1828] flex-shrink-0">
        <Link href="/admin" className="flex items-center gap-3 min-w-0">
          <div className="w-7 h-7 bg-[#C9A55A] flex-shrink-0 flex items-center justify-center text-[11px] font-bold text-[#0D0B0E]">
            PL
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="text-[13px] font-600 text-[#E8E0F0] whitespace-nowrap font-semibold tracking-wide"
              >
                Pokaliz Admin
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 overflow-y-auto overflow-x-hidden">
        {/* Main items */}
        <div className="px-2 space-y-0.5">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link key={href} href={href}>
                <div className={`relative flex items-center gap-3 px-3 py-2.5 rounded-sm transition-all duration-150 group ${
                  active
                    ? "bg-[#C9A55A]/12 text-[#C9A55A]"
                    : "text-[#6B6378] hover:text-[#C0B8CC] hover:bg-[#1C1828]"
                }`}>
                  {active && <div className="absolute left-0 top-1 bottom-1 w-0.5 bg-[#C9A55A] rounded-r" />}
                  <Icon size={16} className="flex-shrink-0" />
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.12 }}
                        className="text-[13px] font-medium whitespace-nowrap"
                      >
                        {label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {collapsed && (
                    <div className="absolute left-full ml-2 z-50 bg-[#1C1828] border border-[#2C2438] text-[#E8E0F0] text-xs px-2.5 py-1.5 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg">
                      {label}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Marketing group */}
        <div className="mx-3 my-3 border-t border-[#1C1828]" />
        <div className="px-2">
          {/* Group header */}
          {!collapsed ? (
            <button
              onClick={() => setMarketingOpen((o) => !o)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-sm transition-all duration-150 group ${
                marketingActive ? "text-[#C9A55A]" : "text-[#3D3550] hover:text-[#6B6378]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Megaphone size={14} className="flex-shrink-0" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.1em] whitespace-nowrap">
                  Marketing
                </span>
              </div>
              <ChevronDown
                size={12}
                className={`transition-transform duration-200 ${marketingOpen ? "rotate-180" : ""}`}
              />
            </button>
          ) : (
            <div className={`relative flex items-center justify-center px-3 py-2.5 rounded-sm group ${
              marketingActive ? "text-[#C9A55A]" : "text-[#3D3550] hover:text-[#6B6378]"
            }`}>
              <Megaphone size={15} className="flex-shrink-0" />
              <div className="absolute left-full ml-2 z-50 bg-[#1C1828] border border-[#2C2438] text-[#E8E0F0] text-xs px-2.5 py-1.5 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg">
                Marketing
              </div>
            </div>
          )}

          {/* Marketing sub-items */}
          <AnimatePresence>
            {(marketingOpen || collapsed) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.18 }}
                className="overflow-hidden space-y-0.5 mt-0.5"
              >
                {marketingItems.map(({ href, label, icon: Icon }) => {
                  const active = isActive(href);
                  return (
                    <Link key={href} href={href}>
                      <div className={`relative flex items-center gap-3 px-3 py-2.5 rounded-sm transition-all duration-150 group ${
                        !collapsed ? "pl-9" : ""
                      } ${
                        active
                          ? "bg-[#C9A55A]/12 text-[#C9A55A]"
                          : "text-[#6B6378] hover:text-[#C0B8CC] hover:bg-[#1C1828]"
                      }`}>
                        {active && <div className="absolute left-0 top-1 bottom-1 w-0.5 bg-[#C9A55A] rounded-r" />}
                        <Icon size={15} className="flex-shrink-0" />
                        <AnimatePresence>
                          {!collapsed && (
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.12 }}
                              className="text-[13px] font-medium whitespace-nowrap"
                            >
                              {label}
                            </motion.span>
                          )}
                        </AnimatePresence>
                        {collapsed && (
                          <div className="absolute left-full ml-2 z-50 bg-[#1C1828] border border-[#2C2438] text-[#E8E0F0] text-xs px-2.5 py-1.5 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg">
                            {label}
                          </div>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mx-3 my-3 border-t border-[#1C1828]" />

        <div className="px-2 space-y-0.5">
          {bottomItems.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href}>
              <div className="relative flex items-center gap-3 px-3 py-2.5 rounded-sm text-[#3D3550] hover:text-[#6B6378] hover:bg-[#1C1828] transition-all duration-150 group">
                <Icon size={15} className="flex-shrink-0" />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-[13px] font-medium whitespace-nowrap"
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {collapsed && (
                  <div className="absolute left-full ml-2 z-50 bg-[#1C1828] border border-[#2C2438] text-[#E8E0F0] text-xs px-2.5 py-1.5 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg">
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
        className="h-9 border-t border-[#1C1828] flex items-center justify-center text-[#3D3550] hover:text-[#6B6378] hover:bg-[#1C1828] transition-all duration-150 flex-shrink-0"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </motion.aside>
  );
}
