import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Mobile Navigation */}
      <MobileNav />

      {/* Desktop Sidebar (Hidden on Mobile) */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="md:pl-64 pt-16 md:pt-0 transition-all duration-300">
        {children}
      </div>
    </div>
  );
}
