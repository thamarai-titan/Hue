import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

import "./globals.css";

export const metadata: Metadata = {
  title: "Hue",
  description: "A tool to help you find your personal style and build a wardrobe that reflects it.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${ubuntu.className}`}
    >
      <body className="max-w-4xl mx-auto">{children}</body>
    </html>
  );
}
