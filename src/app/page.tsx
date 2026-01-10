import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center p-8 bg-[var(--background)]">
      <h1 className="font-[family-name:var(--font-space)] text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6">
        Zenith<span className="text-[var(--accent)]">.</span>
      </h1>

      <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mb-12 leading-relaxed">
        The minimalist operating system for your life. <br />
        Focus on what matters, ignore the noise.
      </p>

      <div className="flex gap-4">
        <Link
          href="/auth"
          className="bg-[var(--foreground)] text-[var(--background)] px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2"
        >
          Get Started <ArrowRight size={20} />
        </Link>
        <a
          href="https://github.com/CaSh007s"
          target="_blank"
          className="bg-white border border-gray-200 text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-colors"
        >
          View GitHub
        </a>
      </div>
    </main>
  );
}
