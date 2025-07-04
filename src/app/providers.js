// src/app/providers.js
"use client";

import { AuthProvider } from "@/context/AuthContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext"; // تأكد من استدعائه

export function Providers({ children }) {
  return (
    <LanguageProvider>
      <AuthProvider>
        <FavoritesProvider>
          <ThemeProvider> {/* يجب أن يكون هنا ليغلف كل شيء */}
            {children}
          </ThemeProvider>
        </FavoritesProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}