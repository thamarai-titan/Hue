import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Hue — Interactive Design System & Theme Studio",
  description:
    "Design harmonious color palettes, test against real-world SaaS, IDE, and E-Commerce apps, and export ready-to-use code for Tailwind v4, CSS, and Shadcn UI.",
  keywords: [
    "design system",
    "theme generator",
    "color palette",
    "tailwind v4",
    "shadcn ui",
    "wcag contrast",
    "web development",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${ubuntu.className}`}>
      <body className="min-h-screen w-full overflow-x-hidden">{children}</body>
    </html>
  );
}
