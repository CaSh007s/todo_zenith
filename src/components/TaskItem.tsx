"use client";

import { useState, useRef, useEffect } from "react";
import { useTaskStore, Task } from "@/store/useTaskStore";
import { motion } from "framer-motion";
import { Trash2, Check, GripVertical, Star, Pencil } from "lucide-react";
import { clsx } from "clsx";
import { format, isToday } from "date-fns";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const { toggleTask, deleteTask, togglePriority, updateTaskTitle } =
    useTaskStore();

  // Local State for Editing
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const getTagColor = (tag?: string) => {
    switch (tag) {
      case "work":
        return "bg-emerald-500";
      case "personal":
        return "bg-blue-500";
      case "learning":
        return "bg-purple-500";
      default:
        return "hidden";
    }
  };

  // Auto-focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = async () => {
    if (editTitle.trim()) {
      await updateTaskTitle(task.id, editTitle);
    } else {
      setEditTitle(task.title); // Revert if empty
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setEditTitle(task.title);
      setIsEditing(false);
    }
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
        {/* Drag Handle */}
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab text-gray-300 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity p-1 touch-none"
        >
          <GripVertical size={18} />
        </button>

        {/* Checkbox */}
        <button
          onClick={() => toggleTask(task.id, task.status)}
          className={clsx(
            "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 shrink-0",
            isDone
              ? "bg-[var(--accent)] border-[var(--accent)]"
              : "border-gray-300 hover:border-[var(--accent)]"
          )}
        >
          {isDone && <Check size={14} className="text-white" strokeWidth={3} />}
        </button>

        {/* EDIT MODE TOGGLE */}
        {isEditing ? (
          <input
            ref={inputRef}
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="flex-1 text-lg font-medium text-gray-900 bg-gray-50 border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
          />
        ) : (
          <span
            onDoubleClick={() => setIsEditing(true)} // Double click shortcut
            className={clsx(
              "text-lg font-medium flex-1 transition-all duration-200 select-none cursor-pointer",
              isDone
                ? "text-gray-400 line-through decoration-gray-300"
                : "text-gray-700"
            )}
          >
            {task.title}
          </span>
        )}

        {/* Date Badge */}
        {!isEditing && (
          <span className="text-xs text-gray-400 font-medium flex items-center gap-2 shrink-0">
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
        )}

        {/* NEW: Tag Badge */}
        {!isEditing && task.tag && (
          <span className="ml-3 px-2 py-1 rounded-full bg-gray-100 text-[10px] uppercase font-bold tracking-wider text-gray-500 flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${getTagColor(task.tag)}`} />
            {task.tag}
          </span>
        )}

        {/* Action Buttons (Hidden when editing) */}
        {!isEditing && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
            {/* Edit Button */}
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-300 hover:text-[var(--accent)] transition-colors p-2"
              title="Edit Title"
            >
              <Pencil size={18} />
            </button>

            {/* Priority Star */}
            <button
              onClick={() => togglePriority(task.id, task.priority)}
              className={clsx(
                "p-2 transition-colors duration-200",
                task.priority === "high"
                  ? "text-yellow-400 hover:text-yellow-500 opacity-100" // Always show if active
                  : "text-gray-300 hover:text-yellow-400"
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
              className="text-gray-300 hover:text-red-500 transition-colors p-2"
              title="Delete task"
            >
              <Trash2 size={18} />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
