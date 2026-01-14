import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { supabase } from "@/lib/supabase";

interface Settings {
  id: number;
  full_name: string;
  title: string;
  bio: string;
  avatar_seed: string;
}

interface SettingsStore {
  settings: Settings | null;
  isLoading: boolean;
  fetchSettings: () => Promise<void>;
  updateSettings: (updates: Partial<Settings>) => Promise<void>;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set, get) => ({
      settings: null,
      isLoading: false,

      fetchSettings: async () => {
        if (!get().settings) {
          set({ isLoading: true });
        }

        try {
          // 1. Try to get the settings
          const { data, error } = await supabase
            .from("settings")
            .select("*")
            .limit(1)
            .maybeSingle();

          if (data) {
            set({ settings: data as Settings });
          } else {
            // 2. IF NO DATA: Auto-create the default profile
            console.log("No profile found. Creating default...");

            const { data: newData, error: createError } = await supabase
              .from("settings")
              .insert([
                {
                  full_name: "Guest User",
                  title: "Productive Human",
                  bio: "Focusing on what matters.",
                  avatar_seed: "Felix",
                },
              ])
              .select()
              .single();

            if (newData) {
              set({ settings: newData as Settings });
            } else if (createError) {
              console.error("Failed to create default profile:", createError);
            }
          }
        } catch (err) {
          console.error("Unexpected error in fetchSettings:", err);
        } finally {
          // Always turn off loading, no matter what
          set({ isLoading: false });
        }
      },

      updateSettings: async (updates: Partial<Settings>) => {
        const current = get().settings;
        if (!current) return;

        // Optimistic Update
        set({ settings: { ...current, ...updates } });

        const { error } = await supabase
          .from("settings")
          .update(updates)
          .eq("id", current.id);

        if (error) {
          console.error("Failed to update settings:", error);
          // Revert if needed, but usually optimistic is fine for this
        }
      },
    }),
    {
      name: "zenith-settings-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ settings: state.settings }),
    }
  )
);
