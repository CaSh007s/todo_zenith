"use client";

import { useEffect, use } from "react";
import { useTaskStore } from "@/store/useTaskStore";
import TaskInput from "@/components/TaskInput";
import TaskItem from "@/components/TaskItem";
import { AnimatePresence } from "framer-motion";

// This helps Next.js understand the dynamic parameter
export default function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tasks, fetchTasks, isLoading } = useTaskStore();

  // Unwrap params (Next.js 15+ requirement)
  const resolvedParams = use(params);
  const currentTag = resolvedParams.tag; // e.g., "personal"

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Filter Logic
  const filteredTasks = tasks.filter(
    (t) => t.tag?.toLowerCase() === currentTag.toLowerCase()
  );

  const activeTasks = filteredTasks.filter((t) => t.status !== "done");
  const completedTasks = filteredTasks.filter((t) => t.status === "done");

  // Capitalize for display
  const displayTitle = currentTag.charAt(0).toUpperCase() + currentTag.slice(1);

  return (
    <main className="max-w-3xl mx-auto p-8 pt-20">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-2 tracking-tight font-[family-name:var(--font-space)] flex items-center gap-3">
          <span className="text-[var(--accent)]">#</span>
          {displayTitle}
        </h1>
        <p className="text-gray-500 text-lg">
          {activeTasks.length > 0
            ? `${activeTasks.length} tasks tagged as ${displayTitle}.`
            : `No open tasks in ${displayTitle}.`}
        </p>
      </header>

      <TaskInput />

      <div className="space-y-3">
        {isLoading && tasks.length === 0 ? (
          <p className="text-gray-400 text-center py-10">Loading...</p>
        ) : (
          <AnimatePresence mode="popLayout">
            {activeTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}

            {completedTasks.length > 0 && (
              <div className="pt-8 opacity-60">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Completed
                </h3>
                {completedTasks.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>
            )}
          </AnimatePresence>
        )}
      </div>
    </main>
  );
}
