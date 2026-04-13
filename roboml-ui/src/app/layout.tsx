import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RoboML Control Center",
  description: "Interactive Robotics & Machine Learning Dashboard built with React + Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}
