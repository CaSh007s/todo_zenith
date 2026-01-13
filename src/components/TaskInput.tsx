"use client";

import { useState } from "react";
import { useTaskStore } from "@/store/useTaskStore";
import { Plus, Loader2, Hash, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

const TAGS = [
  {
    id: "personal",
    label: "Personal",
    color: "bg-blue-500",
    text: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    id: "work",
    label: "Work",
    color: "bg-emerald-500",
    text: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    id: "learning",
    label: "Learning",
    color: "bg-purple-500",
    text: "text-purple-500",
    bg: "bg-purple-50",
  },
];

export default function TaskInput() {
  const [title, setTitle] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isTagMenuOpen, setIsTagMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addTask = useTaskStore((state) => state.addTask);
  const pathname = usePathname();
  const isTodayView = pathname === "/dashboard/today";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);

    // Determine Date
    const dueDate = isTodayView ? new Date().toISOString() : undefined;

    // Add Task with explicit selectedTag
    await addTask(title, dueDate, selectedTag || undefined);

    // Reset
    setTitle("");
    setSelectedTag(null);
    setIsTagMenuOpen(false);
    setIsSubmitting(false);
  };

  const activeTag = TAGS.find((t) => t.id === selectedTag);

  return (
    <div className="relative mb-8 z-20">
      {" "}
      {/* z-20 ensures menu floats above items */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="relative group"
      >
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[var(--accent)] transition-colors">
          {isSubmitting ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <Plus size={20} />
          )}
        </div>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={
            isTodayView ? "Add a task for Today..." : "Add a new task..."
          }
          className="w-full bg-white border border-[var(--border)] text-gray-900 placeholder:text-gray-400 text-lg py-4 pl-12 pr-32 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] transition-all duration-300 font-medium"
        />

        {/* RIGHT SIDE CONTROLS */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {/* 1. Selected Tag Pill (Click 'X' to remove) */}
          {activeTag && (
            <div
              className={clsx(
                "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold",
                activeTag.bg,
                activeTag.text
              )}
            >
              <span className={`w-2 h-2 rounded-full ${activeTag.color}`} />
              {activeTag.label}
              <button
                type="button"
                onClick={() => setSelectedTag(null)}
                className="hover:text-red-500 ml-1"
              >
                <X size={14} />
              </button>
            </div>
          )}

          {/* 2. Tag Toggle Button */}
          {!activeTag && (
            <button
              type="button"
              onClick={() => setIsTagMenuOpen(!isTagMenuOpen)}
              className={clsx(
                "p-2 rounded-xl transition-colors",
                isTagMenuOpen
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
              )}
              title="Add Tag"
            >
              <Hash size={20} />
            </button>
          )}
        </div>
      </motion.form>
      {/* THE DROPDOWN MENU */}
      <AnimatePresence>
        {isTagMenuOpen && !activeTag && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-[var(--border)] p-2 z-30 overflow-hidden"
          >
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 py-2">
              Select Tag
            </div>
            {TAGS.map((tag) => (
              <button
                key={tag.id}
                onClick={() => {
                  setSelectedTag(tag.id);
                  setIsTagMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-left text-sm font-medium text-gray-700"
              >
                <span className={`w-2 h-2 rounded-full ${tag.color}`} />
                {tag.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
