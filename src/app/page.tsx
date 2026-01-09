export default function Home() {
  return (
    <main className="max-w-4xl mx-auto p-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-2 tracking-tight">
          Good Morning.
        </h1>
        <p className="text-gray-500 text-lg">
          Focus is the key to productivity.
        </p>
      </header>

      {/* Task List Area */}
      <div className="space-y-4">
        <div className="p-8 border border-[var(--border)] rounded-2xl bg-white/50 border-dashed flex items-center justify-center text-gray-400 h-64">
          Tasks loading...
        </div>
      </div>
    </main>
  );
}
