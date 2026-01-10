import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {/* The Sidebar is now exclusive to this layout */}
      <Sidebar />

      {/* The Content Wrapper */}
      <div className="pl-64">{children}</div>
    </div>
  );
}
