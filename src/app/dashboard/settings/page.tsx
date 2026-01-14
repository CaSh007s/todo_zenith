"use client";

import { useEffect, useState } from "react";
import { useSettingsStore } from "@/store/useSettingsStore";
import { motion } from "framer-motion";
import { Save, RefreshCw, User, Briefcase, Sparkles } from "lucide-react";

// 1. Define the settings data
interface Settings {
  id: number;
  full_name: string;
  title: string;
  bio: string;
  avatar_seed: string;
}

// 2. Define the shape of the Props
interface SettingsFormProps {
  settings: Settings;
  updateSettings: (updates: Partial<Settings>) => Promise<void>;
}

export default function SettingsPage() {
  const { settings, fetchSettings, updateSettings, isLoading } =
    useSettingsStore();

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  if (isLoading || !settings) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }
  return <SettingsForm settings={settings} updateSettings={updateSettings} />;
}

// 3. Apply the Type to the component props
function SettingsForm({ settings, updateSettings }: SettingsFormProps) {
  const [formData, setFormData] = useState({
    full_name: settings.full_name,
    title: settings.title,
    bio: settings.bio,
    avatar_seed: settings.avatar_seed,
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings(formData);
  };

  const randomizeAvatar = () => {
    const randomSeed = Math.random().toString(36).substring(7);
    setFormData((prev) => ({ ...prev, avatar_seed: randomSeed }));
  };

  return (
    <main className="max-w-2xl mx-auto p-8 pt-20">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-2 tracking-tight font-[family-name:var(--font-space)]">
          Settings.
        </h1>
        <p className="text-gray-500 text-lg">Customize your digital persona.</p>
      </header>

      <form onSubmit={handleSave} className="space-y-8">
        {/* AVATAR SECTION */}
        <div className="flex flex-col items-center justify-center p-8 bg-white border border-[var(--border)] rounded-2xl shadow-sm">
          <div
            className="relative group cursor-pointer"
            onClick={randomizeAvatar}
          >
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-lg transition-transform group-hover:scale-105">
              <img
                src={`https://api.dicebear.com/9.x/notionists/svg?seed=${formData.avatar_seed}&backgroundColor=e0e7ff,d1fae5,ffedd5`}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow border border-gray-200 text-gray-500 group-hover:text-[var(--accent)] transition-colors">
              <RefreshCw size={16} />
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-400 font-medium">
            Click avatar to generate a new look
          </p>
        </div>

        {/* DETAILS SECTION */}
        <div className="bg-white border border-[var(--border)] rounded-2xl p-6 space-y-6 shadow-sm">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <User size={16} className="text-gray-400" />
              Full Name
            </label>
            <input
              type="text"
              value={formData.full_name}
              onChange={(e) =>
                setFormData({ ...formData, full_name: e.target.value })
              }
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-all font-medium text-gray-800"
              placeholder="e.g. John Doe"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <Briefcase size={16} className="text-gray-400" />
              Title / Role
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-all font-medium text-gray-800"
              placeholder="e.g. Student & Developer"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <Sparkles size={16} className="text-gray-400" />
              Daily Mantra
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              rows={3}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-all font-medium text-gray-800 resize-none"
              placeholder="What drives you today?"
            />
          </div>
        </div>

        {/* SAVE BUTTON */}
        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="flex items-center gap-2 bg-[var(--foreground)] text-[var(--background)] px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity"
          >
            <Save size={18} />
            Save Changes
          </motion.button>
        </div>
      </form>
    </main>
  );
}
