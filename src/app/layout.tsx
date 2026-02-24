import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Roger Mission Control",
  description: "Roger Autonomous AI Agent - Mission Control",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
