"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

// Create a custom context to track if the component is mounted
const MountedContext = createContext(false);

export const useMounted = () => useContext(MountedContext);

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <MountedContext.Provider value={mounted}>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </MountedContext.Provider>
  );
} 