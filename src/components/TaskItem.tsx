"use client";

import { useTaskStore, Task } from "@/store/useTaskStore";
import { motion } from "framer-motion";
import { Trash2, Check } from "lucide-react";
import { clsx } from "clsx";

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const { toggleTask, deleteTask } = useTaskStore();

  const isDone = task.status === "done";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={clsx(
        "group flex items-center gap-4 p-4 bg-white border rounded-xl transition-all duration-200",
        isDone
          ? "border-gray-100 bg-gray-50"
          : "border-[var(--border)] hover:shadow-md"
      )}
    >
      {/* Checkbox Button */}
      <button
        onClick={() => toggleTask(task.id, task.status)}
        className={clsx(
          "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200",
          isDone
            ? "bg-[var(--accent)] border-[var(--accent)]"
            : "border-gray-300 hover:border-[var(--accent)]"
        )}
      >
        {isDone && <Check size={14} className="text-white" strokeWidth={3} />}
      </button>

      {/* Title */}
      <span
        className={clsx(
          "text-lg font-medium flex-1 transition-all duration-200",
          isDone
            ? "text-gray-400 line-through decoration-gray-300"
            : "text-gray-700"
        )}
      >
        {task.title}
      </span>

      {/* Delete Button (Visible on Hover) */}
      <button
        onClick={() => deleteTask(task.id)}
        className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200 p-2"
        title="Delete task"
      >
        <Trash2 size={18} />
      </button>
    </motion.div>
  );
}
