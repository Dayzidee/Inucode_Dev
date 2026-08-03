import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kota Dev | Software Engineer & AI Researcher",
  description: "Industrial-grade software engineering, AI research, and high-performance digital atelier.",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", type: "image/png" },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="antialiased overflow-x-hidden selection:bg-primary selection:text-on-primary">
        {children}
      </body>
    </html>
  );
}
