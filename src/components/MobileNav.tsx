"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Calendar,
  Star,
  Menu,
  X,
  Hash,
  LogOut,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

const navItems = [
  { icon: LayoutGrid, label: "All Tasks", href: "/dashboard" },
  { icon: Calendar, label: "Today", href: "/dashboard/today" },
  { icon: Star, label: "Important", href: "/dashboard/important" },
];

const tags = [
  { label: "Personal", color: "bg-blue-500" },
  { label: "Work", color: "bg-emerald-500" },
  { label: "Learning", color: "bg-purple-500" },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Top Bar (Visible only on Mobile) */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--border)] flex items-center justify-between px-4 z-40">
        <span className="font-[family-name:var(--font-space)] text-xl font-black uppercase tracking-tighter">
          Zenith<span className="text-[var(--accent)]">.</span>
        </span>

        <button
          onClick={() => setIsOpen(true)}
          className="p-2 text-gray-600 hover:text-[var(--accent)] transition-colors"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* The Slide-Out Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop (Dark overlay) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 md:hidden backdrop-blur-sm"
            />

            {/* Drawer Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-3/4 max-w-sm bg-[var(--background)] border-l border-[var(--border)] z-50 p-6 shadow-2xl md:hidden flex flex-col"
            >
              <div className="flex justify-end mb-8">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-2 flex-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)} // This closes the menu immediately
                      className={clsx(
                        "flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-200 text-base font-medium",
                        isActive
                          ? "bg-white shadow-sm text-[var(--accent)]"
                          : "text-gray-500 hover:bg-gray-100"
                      )}
                    >
                      <Icon size={20} />
                      {item.label}
                    </Link>
                  );
                })}

                <div className="mt-8">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-4">
                    Tags
                  </h3>
                  <div className="space-y-1">
                    {tags.map((tag) => (
                      <div
                        key={tag.label}
                        className="flex items-center gap-3 px-4 py-3 text-gray-500"
                      >
                        <Hash size={16} />
                        {tag.label}
                        <span
                          className={`ml-auto w-2 h-2 rounded-full ${tag.color}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </nav>

              <div className="pt-6 border-t border-[var(--border)]">
                <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-gray-500 hover:text-red-600 transition-colors">
                  <LogOut size={18} />
                  Sign Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
