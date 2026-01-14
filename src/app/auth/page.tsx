"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthPage() {
  const router = useRouter();

  // --- FORCE REDIRECT LOGIC ---
  useEffect(() => {
    // 1. Check if already logged in on load
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        router.push("/dashboard");
      }
    };
    checkSession();

    // 2. Listen for 'Sign In' events in real-time
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || session) {
        router.push("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);
  // -----------------------------

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* --- ANIMATED BACKGROUND --- */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px]"
        />
        <motion.div
          animate={{ x: [0, -100, 0], y: [0, 50, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]"
        />
      </div>

      <Link
        href="/"
        className="absolute top-8 left-8 text-gray-500 hover:text-white transition-colors flex items-center gap-2 z-20 group"
      >
        <ArrowLeft
          size={20}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Back to Home
      </Link>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-neutral-900/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-black tracking-tighter text-white mb-2">
              Welcome Back<span className="text-indigo-500">.</span>
            </h1>
            <p className="text-gray-400 text-sm">
              Sign in to sync your workspace.
            </p>
          </div>

          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: "#6366f1",
                    brandAccent: "#4f46e5",
                    inputText: "white",
                    inputBackground: "rgba(255,255,255,0.05)",
                    inputBorder: "rgba(255,255,255,0.1)",
                    inputPlaceholder: "rgba(255,255,255,0.3)",
                    dividerBackground: "rgba(255,255,255,0.1)",
                    defaultButtonBackground: "white",
                    defaultButtonBackgroundHover: "#e5e7eb",
                    defaultButtonBorder: "transparent",
                    defaultButtonText: "black",
                  },
                  radii: {
                    borderRadiusButton: "12px",
                    inputBorderRadius: "12px",
                  },
                },
              },
              className: {
                container: "w-full",
                button: "font-bold transition-transform active:scale-95",
                input:
                  "font-medium focus:ring-2 focus:ring-indigo-500/50 transition-all",
                label:
                  "text-gray-400 text-xs uppercase font-bold tracking-wider mb-2",
              },
            }}
            providers={[]}
            redirectTo={`${
              typeof window !== "undefined" ? window.location.origin : ""
            }/dashboard`}
          />
        </div>

        <p className="text-center text-gray-600 text-xs mt-8">
          Secure. Encrypted. Private.
        </p>
      </motion.div>
    </div>
  );
}
