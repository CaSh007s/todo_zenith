import { create } from "zustand";
import { supabase } from "@/lib/supabase";
import { arrayMove } from "@dnd-kit/sortable";

export interface Task {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  created_at: string;
  due_date?: string;
}

interface TaskStore {
  tasks: Task[];
  isLoading: boolean;
  fetchTasks: () => Promise<void>;
  addTask: (title: string, dueDate?: string) => Promise<void>;
  toggleTask: (id: string, currentStatus: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  moveTask: (activeId: string, overId: string) => void;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  isLoading: false,

  fetchTasks: async () => {
    set({ isLoading: true });
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) set({ tasks: (data as Task[]) || [] });
    set({ isLoading: false });
  },

  addTask: async (title: string, dueDate?: string) => {
    const tempId = Math.random().toString();
    const newTask: Task = {
      id: tempId,
      title,
      status: "todo",
      priority: "medium",
      created_at: new Date().toISOString(),
      due_date: dueDate,
    };

    const currentTasks = get().tasks;
    set({ tasks: [newTask, ...currentTasks] });

    const { data, error } = await supabase
      .from("tasks")
      .insert([{ title, due_date: dueDate }])
      .select()
      .single();

    if (error) {
      set({ tasks: currentTasks });
    } else {
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === tempId ? (data as Task) : t)),
      }));
    }
  },

  toggleTask: async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "done" ? "todo" : "done";

    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, status: newStatus } : t
      ),
    }));

    const { error } = await supabase
      .from("tasks")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      console.error("Error toggling task:", error);
      get().fetchTasks();
    }
  },

  deleteTask: async (id: string) => {
    const currentTasks = get().tasks;

    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    }));

    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) {
      console.error("Error deleting task:", error);
      set({ tasks: currentTasks });
    }
  },

  // THIS WAS MISSING:
  moveTask: (activeId: string, overId: string) => {
    const currentTasks = get().tasks;
    const oldIndex = currentTasks.findIndex((t) => t.id === activeId);
    const newIndex = currentTasks.findIndex((t) => t.id === overId);

    if (oldIndex !== -1 && newIndex !== -1) {
      set({
        tasks: arrayMove(currentTasks, oldIndex, newIndex),
      });
    }
  },
}));
