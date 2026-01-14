"use client";

import { useEffect, useState } from "react";
import { useSettingsStore } from "@/store/useSettingsStore";
import { motion, AnimatePresence } from "framer-motion";
import {
  Save,
  RefreshCw,
  User,
  Briefcase,
  Sparkles,
  X,
  CheckCircle2,
} from "lucide-react";
import { useRouter } from "next/navigation";

// --- TYPES ---
interface Settings {
  id: number;
  full_name: string;
  title: string;
  bio: string;
  avatar_seed: string;
}

interface SettingsFormProps {
  settings: Settings;
  updateSettings: (updates: Partial<Settings>) => Promise<void>;
}

// --- MAIN PAGE COMPONENT ---
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

// --- FORM COMPONENT ---
function SettingsForm({ settings, updateSettings }: SettingsFormProps) {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    full_name: settings.full_name,
    title: settings.title,
    bio: settings.bio,
    avatar_seed: settings.avatar_seed,
  });

  // Role Logic: Split the string "Student, Developer" into an array ["Student", "Developer"]
  const [roles, setRoles] = useState<string[]>(
    settings.title
      ? settings.title
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : []
  );
  const [roleInput, setRoleInput] = useState("");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    // Combine roles back into a string before saving
    const titleString = roles.join(", ");

    await updateSettings({ ...formData, title: titleString });

    // Show Success & Redirect
    setShowSuccess(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 1500); // 1.5s delay so they can read the message
  };

  const handleRoleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === "Enter" || e.key === ",") && roleInput.trim()) {
      e.preventDefault();
      if (!roles.includes(roleInput.trim())) {
        setRoles([...roles, roleInput.trim()]);
      }
      setRoleInput("");
    } else if (e.key === "Backspace" && !roleInput && roles.length > 0) {
      // Remove last tag if backspace pressed on empty input
      setRoles(roles.slice(0, -1));
    }
  };

  const removeRole = (roleToRemove: string) => {
    setRoles(roles.filter((role) => role !== roleToRemove));
  };

  const randomizeAvatar = () => {
    const randomSeed = Math.random().toString(36).substring(7);
    setFormData((prev) => ({ ...prev, avatar_seed: randomSeed }));
  };

  return (
    <main className="max-w-2xl mx-auto p-8 pt-20 relative">
      {/* SUCCESS POPUP (TOAST) */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -50, x: "-50%" }}
            className="fixed top-10 left-1/2 z-50 bg-emerald-500 text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 font-bold"
          >
            <CheckCircle2 size={24} className="text-emerald-100" />
            <div>
              <p>Settings Updated!</p>
              <p className="text-xs font-medium text-emerald-100 font-normal">
                Redirecting to tasks...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
          {/* Full Name */}
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

          {/* CHIP INPUT for Roles */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <Briefcase size={16} className="text-gray-400" />
              Title / Roles
            </label>
            <div className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-[var(--accent)]/20 focus-within:border-[var(--accent)] transition-all flex flex-wrap gap-2 min-h-[50px]">
              {roles.map((role, index) => (
                <span
                  key={index}
                  className="bg-white border border-gray-200 text-gray-800 px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm animate-in fade-in zoom-in duration-200"
                >
                  {role}
                  <button
                    type="button"
                    onClick={() => removeRole(role)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={roleInput}
                onChange={(e) => setRoleInput(e.target.value)}
                onKeyDown={handleRoleKeyDown}
                className="bg-transparent border-none focus:outline-none flex-1 min-w-[120px] p-1 text-gray-800 font-medium"
                placeholder={
                  roles.length === 0
                    ? "Type role & hit Enter (e.g. Student)"
                    : ""
                }
              />
            </div>
            <p className="text-xs text-gray-400 pl-1">
              Type and press Enter to add multiple roles.
            </p>
          </div>

          {/* Bio / Mantra */}
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
