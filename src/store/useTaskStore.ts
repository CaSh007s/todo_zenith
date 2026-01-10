import { create } from "zustand";
import { supabase } from "@/lib/supabase";

// Define the shape of a Task
export interface Task {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  created_at: string;
}

interface TaskStore {
  tasks: Task[];
  isLoading: boolean;
  fetchTasks: () => Promise<void>;
  addTask: (title: string) => Promise<void>;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  isLoading: false,

  // 1. Fetch Tasks from Supabase
  fetchTasks: async () => {
    set({ isLoading: true });

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false }); // Newest first

    if (error) {
      console.error("Error fetching tasks:", error);
    } else {
      set({ tasks: (data as Task[]) || [] });
    }

    set({ isLoading: false });
  },

  // 2. Add a new Task
  addTask: async (title: string) => {
    // Optimistic Update: Update UI immediately before server responds (feels instant)
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

    // Actual Database Call
    const { data, error } = await supabase
      .from("tasks")
      .insert([{ title }]) // DB generates the real ID
      .select()
      .single();

    if (error) {
      console.error("Error adding task:", error);
      // Rollback if failed (optional, but good practice)
      set({ tasks: currentTasks });
    } else {
      // Replace the temporary task with the real one from DB
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === tempId ? (data as Task) : t)),
      }));
    }
  },
}));
