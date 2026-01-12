"use client";

import { useEffect } from "react";
import { useTaskStore } from "@/store/useTaskStore";
import TaskInput from "@/components/TaskInput";
import TaskItem from "@/components/TaskItem";
import { AnimatePresence } from "framer-motion";
// DnD Imports
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export default function Dashboard() {
  const { tasks, fetchTasks, isLoading, moveTask } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Derived state
  const activeTasks = tasks.filter((t) => t.status !== "done");
  const completedTasks = tasks.filter((t) => t.status === "done");

  // DnD Sensors (Input detection)
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }), // Prevent accidental drags
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      moveTask(active.id as string, over?.id as string);
    }
  };

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
          /* DnD Context Wrapper */
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={activeTasks.map((t) => t.id)}
              strategy={verticalListSortingStrategy}
            >
              <AnimatePresence mode="popLayout">
                {/* Active Tasks (Sortable) */}
                {activeTasks.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </AnimatePresence>
            </SortableContext>

            {/* Completed Tasks (Not Sortable - kept separate) */}
            {completedTasks.length > 0 && (
              <div className="pt-8">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Completed
                </h3>
                {completedTasks.map((task) => (
                  // We render these as plain TaskItems
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>
            )}
          </DndContext>
        )}
      </div>
    </main>
  );
}
