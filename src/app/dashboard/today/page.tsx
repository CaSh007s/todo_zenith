"use client";

import { useEffect } from "react";
import { useTaskStore } from "@/store/useTaskStore";
import TaskInput from "@/components/TaskInput";
import TaskItem from "@/components/TaskItem";
import { AnimatePresence } from "framer-motion";
import { isToday, parseISO } from "date-fns";

export default function TodayPage() {
  const { tasks, fetchTasks, isLoading } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // The Filter Logic
  const todayTasks = tasks.filter((task) => {
    if (!task.due_date) return false;
    return isToday(parseISO(task.due_date));
  });

  const activeTasks = todayTasks.filter((t) => t.status !== "done");
  const completedTasks = todayTasks.filter((t) => t.status === "done");

  return (
    <main className="max-w-3xl mx-auto p-8 pt-20">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-2 tracking-tight font-[family-name:var(--font-space)]">
          Today.
        </h1>
        <p className="text-gray-500 text-lg">
          {activeTasks.length > 0
            ? `You have ${activeTasks.length} tasks to finish before midnight.`
            : "Your day is clear."}
        </p>
      </header>

      {/* The input here will automatically tag tasks with Today's date */}
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
              <>
                <div className="pt-8 pb-2">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                    Completed Today
                  </h3>
                </div>
                {completedTasks.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </>
            )}
          </AnimatePresence>
        )}

        {!isLoading && todayTasks.length === 0 && (
          <div className="text-center py-20 opacity-50">
            <p className="text-xl text-gray-300">No tasks for today.</p>
            <p className="text-sm text-gray-400">
              Add one above to get started.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
