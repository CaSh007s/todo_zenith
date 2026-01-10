"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Calendar, Star, Hash, LogOut } from "lucide-react";
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

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen border-r border-[var(--border)] bg-[var(--background)] flex flex-col p-6 fixed left-0 top-0 z-50">
      {/* TEXT-ONLY LOGO */}
      <div className="mb-12 pt-2">
        <h1 className="font-[family-name:var(--font-space)] text-3xl font-black tracking-tighter text-[var(--foreground)] uppercase">
          Zenith<span className="text-[var(--accent)]">.</span>
        </h1>
      </div>

      {/* Main Navigation */}
      <nav className="space-y-2 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium",
                isActive
                  ? "bg-white shadow-sm text-[var(--accent)]"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}

        {/* Tags Section */}
        <div className="mt-8">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-4">
            Tags
          </h3>
          <div className="space-y-1">
            {tags.map((tag) => (
              <button
                key={tag.label}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-500 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-50"
              >
                <Hash size={14} />
                {tag.label}
                <span className={`ml-auto w-2 h-2 rounded-full ${tag.color}`} />
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="pt-6 border-t border-[var(--border)]">
        <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-gray-500 hover:text-red-600 transition-colors rounded-xl hover:bg-red-50">
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
