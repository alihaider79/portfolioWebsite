"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class" // adds "class" (light/dark) to <html>
      defaultTheme="light" // start in light mode
      enableSystem={false} // don’t auto-sync to OS; only manual toggle
    >
      {children}
    </NextThemesProvider>
  );
}
