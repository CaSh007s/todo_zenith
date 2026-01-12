"use client";

import { useEffect } from "react";
import { useTaskStore } from "@/store/useTaskStore";
import TaskInput from "@/components/TaskInput";
import TaskItem from "@/components/TaskItem";
import { AnimatePresence } from "framer-motion";

export default function ImportantPage() {
  const { tasks, fetchTasks, isLoading } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Filter for High Priority
  const importantTasks = tasks.filter((t) => t.priority === "high");
  const activeTasks = importantTasks.filter((t) => t.status !== "done");
  const completedTasks = importantTasks.filter((t) => t.status === "done");

  return (
    <main className="max-w-3xl mx-auto p-8 pt-20">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-2 tracking-tight font-[family-name:var(--font-space)]">
          Important.
        </h1>
        <p className="text-gray-500 text-lg">
          {activeTasks.length > 0
            ? `You have ${activeTasks.length} critical tasks.`
            : "No critical tasks pending."}
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
              <div className="pt-8">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Completed High Priority
                </h3>
                {completedTasks.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>
            )}
          </AnimatePresence>
        )}

        {!isLoading && importantTasks.length === 0 && (
          <div className="text-center py-20 opacity-50">
            <p className="text-xl text-gray-300">Nothing important here.</p>
            <p className="text-sm text-gray-400">
              Mark a task with a star to see it here.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
