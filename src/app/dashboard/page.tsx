"use client";

import { useEffect } from "react";
import { useTaskStore } from "@/store/useTaskStore";
import TaskInput from "@/components/TaskInput";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const { tasks, fetchTasks, isLoading } = useTaskStore();

  // Load tasks when the app starts
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <main className="max-w-3xl mx-auto p-8 pt-20">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-2 tracking-tight">Focus.</h1>
        <p className="text-gray-500 text-lg">
          You have {tasks.filter((t) => t.status !== "done").length} pending
          tasks.
        </p>
      </header>

      {/* The Input Component */}
      <TaskInput />

      {/* The Task List */}
      <div className="space-y-3">
        {isLoading && tasks.length === 0 ? (
          <p className="text-gray-400 text-center py-10">
            Loading your mind...
          </p>
        ) : (
          <AnimatePresence mode="popLayout">
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group flex items-center gap-4 p-4 bg-white border border-[var(--border)] rounded-xl hover:shadow-md transition-all duration-200"
              >
                {/* Checkbox Circle */}
                <button className="w-6 h-6 rounded-full border-2 border-gray-300 hover:border-[var(--accent)] transition-colors" />

                <span className="text-lg text-gray-700 font-medium">
                  {task.title}
                </span>

                <span className="ml-auto text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {new Date(task.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        )}

        {!isLoading && tasks.length === 0 && (
          <div className="text-center py-20 opacity-50">
            <p className="text-xl text-gray-300">No tasks yet.</p>
            <p className="text-sm text-gray-400">Time to seize the day.</p>
          </div>
        )}
      </div>
    </main>
  );
}
