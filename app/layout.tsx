import type { Metadata } from "next";
import { DemoProvider } from "@/lib/demo-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "Retain Demo Builder",
  description: "Live prospect walkthroughs of Paddle Retain",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <DemoProvider>{children}</DemoProvider>
      </body>
    </html>
  );
}
