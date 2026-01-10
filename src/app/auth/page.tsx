"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, User } from "lucide-react";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState(""); // New Field
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      // Login Logic
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) alert(error.message);
      else router.push("/dashboard");
    } else {
      // Signup Logic with Meta Data
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName, // Saves name to Supabase Auth user object
          },
        },
      });
      if (error) alert(error.message);
      else {
        alert("Account created! Logging you in...");
        router.push("/dashboard");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="font-[family-name:var(--font-space)] text-3xl font-black uppercase tracking-tighter mb-2">
            Zenith<span className="text-[var(--accent)]">.</span>
          </h1>
          <p className="text-gray-500">Welcome back, Architect.</p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          {/* Full Name - Only show on Sign Up */}
          {!isLogin && (
            <div className="relative">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                size={20}
              />
              <input
                type="text"
                placeholder="Full Name"
                required={!isLogin}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                // FIXED COLORS: Dark text (gray-900), Darker placeholder (gray-500)
                className="w-full bg-white border border-gray-300 text-gray-900 placeholder:text-gray-500 font-medium p-4 pl-12 rounded-xl outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
              />
            </div>
          )}

          <div>
            <input
              type="email"
              placeholder="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // FIXED COLORS
              className="w-full bg-white border border-gray-300 text-gray-900 placeholder:text-gray-500 font-medium p-4 rounded-xl outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              // FIXED COLORS
              className="w-full bg-white border border-gray-300 text-gray-900 placeholder:text-gray-500 font-medium p-4 rounded-xl outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-[var(--accent)] text-white font-bold p-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 shadow-lg shadow-blue-500/20"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : isLogin ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-gray-500 hover:text-[var(--accent)] font-medium transition-colors"
          >
            {isLogin
              ? "New here? Create an account"
              : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}
