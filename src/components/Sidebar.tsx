"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutGrid,
  Calendar,
  Star,
  Hash,
  LogOut,
  Settings,
} from "lucide-react";
import { clsx } from "clsx";
import { supabase } from "@/lib/supabase";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useEffect } from "react";

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
  const router = useRouter();

  // Fetch settings to display Avatar and Name
  const { settings, fetchSettings } = useSettingsStore();

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/auth");
    router.refresh();
  };

  return (
    <aside className="hidden md:flex w-64 h-screen border-r border-[var(--border)] bg-[var(--background)] flex-col p-6 fixed left-0 top-0 z-50">
      {/* HEADER: AVATAR & NAME */}
      <div className="mb-10 pt-2 flex items-center gap-3">
        {settings?.avatar_seed ? (
          <img
            src={`https://api.dicebear.com/9.x/notionists/svg?seed=${settings.avatar_seed}&backgroundColor=e0e7ff,d1fae5,ffedd5`}
            alt="Avatar"
            className="w-10 h-10 rounded-full border border-gray-200 object-cover"
          />
        ) : (
          // Placeholder while loading
          <div className="w-10 h-10 bg-gray-100 rounded-full animate-pulse" />
        )}

        <div className="flex flex-col">
          <h1 className="text-xl font-bold tracking-tighter font-[family-name:var(--font-space)] text-[var(--foreground)]">
            Zenith<span className="text-[var(--accent)]">.</span>
          </h1>
          {/* Show Name or Fallback Title */}
          <p className="text-xs text-gray-400 font-medium truncate max-w-[120px]">
            {settings?.full_name || "Welcome Back"}
          </p>
        </div>
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
                  ? "bg-white shadow-sm text-[var(--accent)] border border-gray-100"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
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
              <Link
                key={tag.label}
                href={`/dashboard/tags/${tag.label.toLowerCase()}`}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-500 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-50"
              >
                <Hash size={14} />
                {tag.label}
                <span className={`ml-auto w-2 h-2 rounded-full ${tag.color}`} />
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* SETTINGS LINK */}
      <div className="mt-auto pt-8">
        <Link
          href="/dashboard/settings"
          className={clsx(
            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
            pathname === "/dashboard/settings"
              ? "bg-gray-100 text-gray-900 font-medium"
              : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
          )}
        >
          <Settings size={20} />
          <span>Settings</span>
        </Link>
      </div>

      {/* Footer / Sign Out */}
      <div className="pt-4 border-t border-[var(--border)] mt-2">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-gray-500 hover:text-red-600 transition-colors rounded-xl hover:bg-red-50"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
