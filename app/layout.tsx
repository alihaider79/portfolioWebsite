import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Faisal Yaseen — Portfolio",
  description: "Crafting clean interfaces & delightful product experiences.",
  themeColor: "#ffffff", // stable browser UI color
  other: { "color-scheme": "light" }, // hint UA controls to use light palette
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // Force light mode regardless of OS setting
    <html
      lang="en"
      className="light"
      style={{ colorScheme: "light" }}
      suppressHydrationWarning
    >
      <head>
        {/* extra safety for some UAs */}
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content="#ffffff" />
      </head>

      <body
        className={[
          geistSans.variable,
          geistMono.variable,
          "antialiased",
          // lock base colors app-wide
          "min-h-screen bg-white text-slate-900",
        ].join(" ")}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
