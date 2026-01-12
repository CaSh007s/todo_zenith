"use client";

import { useTaskStore, Task } from "@/store/useTaskStore";
import { motion } from "framer-motion";
import { Trash2, Check, GripVertical, Star } from "lucide-react";
import { clsx } from "clsx";
import { format, isToday } from "date-fns";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const { toggleTask, deleteTask, togglePriority } = useTaskStore();
  const isDone = task.status === "done";

  // DnD Hook
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative mb-3">
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
        {/* Drag Handle (Visible on Hover) */}
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab text-gray-300 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity p-1 touch-none"
        >
          <GripVertical size={18} />
        </button>

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
            "text-lg font-medium flex-1 transition-all duration-200 select-none", // select-none prevents text highlighting while dragging
            isDone
              ? "text-gray-400 line-through decoration-gray-300"
              : "text-gray-700"
          )}
        >
          {task.title}
        </span>

        {/* Date Badge */}
        <span className="text-xs text-gray-400 font-medium flex items-center gap-2">
          {task.due_date && (
            <span
              className={clsx(
                "px-2 py-1 rounded text-[10px] uppercase tracking-wider",
                isToday(new Date(task.due_date))
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-500"
              )}
            >
              {isToday(new Date(task.due_date))
                ? "Today"
                : format(new Date(task.due_date), "MMM d")}
            </span>
          )}
        </span>

        {/* NEW: Priority Star Button */}
        <button
          onClick={() => togglePriority(task.id, task.priority)}
          className={clsx(
            "p-2 transition-colors duration-200",
            task.priority === "high"
              ? "text-yellow-400 hover:text-yellow-500"
              : "text-gray-300 hover:text-yellow-400 opacity-0 group-hover:opacity-100 focus:opacity-100"
          )}
          title={
            task.priority === "high" ? "Unmark Important" : "Mark Important"
          }
        >
          <Star
            size={18}
            fill={task.priority === "high" ? "currentColor" : "none"}
          />
        </button>

        {/* Delete Button */}
        <button
          onClick={() => deleteTask(task.id)}
          className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-200 p-2 ml-2"
          title="Delete task"
        >
          <Trash2 size={18} />
        </button>
      </motion.div>
    </div>
  );
}
