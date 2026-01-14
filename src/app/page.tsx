"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Zap, Shield, Layout } from "lucide-react";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden relative selection:bg-indigo-500/30">
      {/* --- BACKGROUND FX --- */}
      <div className="absolute inset-0 z-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Aurora Blob 1 (Top Left) */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
        {/* Aurora Blob 2 (Bottom Right) */}
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* --- CONTENT --- */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20">
        {/* HERO SECTION */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-3xl mx-auto mb-24"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-indigo-300 mb-6 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            v1.0 Now Live
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-500"
          >
            ZENITH<span className="text-indigo-500">.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-400 mb-10 leading-relaxed"
          >
            The minimalist operating system for your life.{" "}
            <br className="hidden md:block" />
            Focus on what matters,{" "}
            <span className="text-gray-100 font-medium">ignore the noise.</span>
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/auth"
              className="bg-[var(--foreground)] text-[var(--background)] px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2"
            >
              Get Started
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              href="https://github.com/CaSh007s/todo_zenith"
              target="_blank"
              className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              View Source
            </Link>
          </motion.div>
        </motion.div>

        {/* BENTO GRID FEATURES */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Feature 1: The Core */}
          <div className="md:col-span-2 p-8 rounded-3xl bg-neutral-900/50 border border-white/5 hover:border-white/10 transition-colors backdrop-blur-sm group">
            <div className="h-10 w-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
              <Layout size={20} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Workspace Zero.</h3>
            <p className="text-gray-400">
              A decluttered environment designed to induce flow state.
              Context-aware inputs mean you never leave the keyboard.
            </p>
          </div>

          {/* Feature 2: Smart Tags */}
          <div className="p-8 rounded-3xl bg-neutral-900/50 border border-white/5 hover:border-white/10 transition-colors backdrop-blur-sm group">
            <div className="h-10 w-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
              <Zap size={20} />
            </div>
            <h3 className="text-xl font-bold mb-2">Context Aware.</h3>
            <p className="text-gray-400 text-sm">
              The app knows where you are. Tagging and prioritizing happens
              automatically.
            </p>
          </div>

          {/* Feature 3: Secure */}
          <div className="p-8 rounded-3xl bg-neutral-900/50 border border-white/5 hover:border-white/10 transition-colors backdrop-blur-sm group">
            <div className="h-10 w-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
              <Shield size={20} />
            </div>
            <h3 className="text-xl font-bold mb-2">Local First.</h3>
            <p className="text-gray-400 text-sm">
              Your data persists instantly. Offline support built-in. Speed is a
              feature.
            </p>
          </div>

          {/* Feature 4: Quote */}
          <div className="md:col-span-2 p-8 rounded-3xl bg-gradient-to-br from-indigo-900/20 to-neutral-900/50 border border-white/5 flex items-center justify-center">
            <p className="text-lg font-medium text-center italic text-gray-300">
              &quot;Perfection is achieved not when there is nothing more to
              add, but when there is nothing left to take away.&quot;
            </p>
          </div>
        </motion.div>

        {/* FOOTER */}
        <footer className="mt-32 border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2026 Zenith Inc.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="hover:text-white cursor-pointer transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-white cursor-pointer transition-colors"
            >
              Terms
            </Link>
            <Link
              href="https://github.com/CaSh007s/todo_zenith"
              target="_blank"
              className="hover:text-white cursor-pointer transition-colors"
            >
              GitHub
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
