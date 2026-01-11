import { create } from "zustand";
import { supabase } from "@/lib/supabase";

export interface Task {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  created_at: string;
  due_date?: string; // We'll need this for the Today view
}

interface TaskStore {
  tasks: Task[];
  isLoading: boolean;
  fetchTasks: () => Promise<void>;
  addTask: (title: string) => Promise<void>;
  toggleTask: (id: string, currentStatus: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
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

  addTask: async (title: string) => {
    const tempId = Math.random().toString();
    const newTask: Task = {
      id: tempId,
      title,
      status: "todo",
      priority: "medium",
      created_at: new Date().toISOString(),
    };

    const currentTasks = get().tasks;
    set({ tasks: [newTask, ...currentTasks] });

    const { data, error } = await supabase
      .from("tasks")
      .insert([{ title }])
      .select()
      .single();

    if (error) {
      set({ tasks: currentTasks }); // Rollback
    } else {
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === tempId ? (data as Task) : t)),
      }));
    }
  },

  // 1. NEW: Toggle Completion
  toggleTask: async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "done" ? "todo" : "done";

    // Optimistic Update
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, status: newStatus } : t
      ),
    }));

    // DB Call
    const { error } = await supabase
      .from("tasks")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      console.error("Error toggling task:", error);
      get().fetchTasks(); // Revert on error
    }
  },

  // 2. NEW: Delete Task
  deleteTask: async (id: string) => {
    const currentTasks = get().tasks;

    // Optimistic Update
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    }));

    // DB Call
    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) {
      console.error("Error deleting task:", error);
      set({ tasks: currentTasks }); // Revert
    }
  },
}));
