"use client";

import { useState } from "react";
import { useTaskStore } from "@/store/useTaskStore";
import { Plus, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function TaskInput() {
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const addTask = useTaskStore((state) => state.addTask);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    await addTask(title);
    setTitle("");
    setIsSubmitting(false);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="relative group mb-8"
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
        placeholder="Add a new task..."
        className="w-full bg-white border border-[var(--border)] text-gray-900 placeholder:text-gray-400 text-lg py-4 pl-12 pr-4 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] transition-all duration-300 font-medium"
      />

      {/* Keyboard Hint */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200">
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded border border-gray-200 font-medium">
          Enter ↵
        </span>
      </div>
    </motion.form>
  );
}
