"use client";

import { useEffect } from "react";
import { useTaskStore } from "@/store/useTaskStore";
import TaskInput from "@/components/TaskInput";
import TaskItem from "@/components/TaskItem";
import { AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const { tasks, fetchTasks, isLoading } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Derived state
  const activeTasks = tasks.filter((t) => t.status !== "done");
  const completedTasks = tasks.filter((t) => t.status === "done");

  return (
    <main className="max-w-3xl mx-auto p-8 pt-20">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-2 tracking-tight font-[family-name:var(--font-space)]">
          Focus.
        </h1>
        <p className="text-gray-500 text-lg">
          You have {activeTasks.length} pending tasks.
        </p>
      </header>

      <TaskInput />

      <div className="space-y-3">
        {isLoading && tasks.length === 0 ? (
          <p className="text-gray-400 text-center py-10">
            Loading your mind...
          </p>
        ) : (
          <AnimatePresence mode="popLayout">
            {/* Render Active Tasks First */}
            {activeTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}

            {/* Then Render Completed Tasks */}
            {completedTasks.length > 0 && (
              <>
                <div className="pt-8 pb-2">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                    Completed
                  </h3>
                </div>
                {completedTasks.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </>
            )}
          </AnimatePresence>
        )}

        {!isLoading && tasks.length === 0 && (
          <div className="text-center py-20 opacity-50">
            <p className="text-xl text-gray-300">No tasks yet.</p>
            <p className="text-sm text-gray-400">Carpe Diem.</p>
          </div>
        )}
      </div>
    </main>
  );
}
