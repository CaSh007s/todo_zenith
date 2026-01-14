"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-300 p-8 md:p-20 font-[family-name:var(--font-geist-sans)]">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12"
      >
        <ArrowLeft size={18} /> Back to Home
      </Link>

      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-white mb-8">
          Terms of Service.
        </h1>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">1. Acceptance</h2>
          <p>
            By using Zenith, you agree to these terms. Zenith is provided
            &ldquo;as is&ldquo; without any guarantees regarding uptime or data
            persistence.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">2. Usage</h2>
          <p>
            You are responsible for the content you store in your tasks. Do not
            use Zenith for illegal activities.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">3. Open Source</h2>
          <p>
            Zenith is open-source software. You are free to inspect, fork, and
            modify the code as per the repository license.
          </p>
        </section>
      </div>
    </main>
  );
}
