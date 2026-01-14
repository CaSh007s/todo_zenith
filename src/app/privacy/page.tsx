"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-300 p-8 md:p-20 font-[family-name:var(--font-geist-sans)]">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12"
      >
        <ArrowLeft size={18} /> Back to Home
      </Link>

      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy.</h1>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">
            1. Data Collection
          </h2>
          <p>
            Zenith is a &ldquo;Local First&ldquo; application. We do not sell
            your data. Your tasks, settings, and profile information are stored
            in your own secure Supabase database instance.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">
            2. Local Storage
          </h2>
          <p>
            To improve performance, Zenith caches your profile settings locally
            on your device. This data remains on your machine and is never
            transmitted to third-party tracking services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">3. Security</h2>
          <p>
            Authentication is handled via secure, encrypted tokens. We recommend
            using a strong password to protect your workspace.
          </p>
        </section>
      </div>
    </main>
  );
}
