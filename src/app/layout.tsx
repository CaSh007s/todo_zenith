import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar"; // Import Sidebar here

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zenith | Peak Productivity",
  description: "A minimalist task manager.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-[var(--background)]`}
      >
        {/* Global Sidebar */}
        <Sidebar />

        {/* Main Content Wrapper (pushes content to the right of sidebar) */}
        <div className="pl-64 min-h-screen">{children}</div>
      </body>
    </html>
  );
}
