"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider 
      attribute="class" // <--- Esto le dice a next-themes que ponga la clase "dark" en el HTML
      defaultTheme="dark" // Parte en oscuro por estética Yonko
      enableSystem={true} // Permite detectar si el usuario tiene el PC en modo oscuro
      disableTransitionOnChange={false} // Para que se vea el efecto suave que configuramos
    >
      {children}
    </NextThemesProvider>
  );
}