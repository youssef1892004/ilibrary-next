// src/app/providers.js
"use client";

import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apollo";
import { AuthProvider } from "@/context/AuthContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "next-themes"; // <--  1. تم التعديل لاستيرادها مباشرة من المكتبة
import { useEffect } from "react";

export function Providers({ children }) {
  useEffect(() => {
    // هذا الكود سيتم تنفيذه مرة واحدة فقط عند تحميل الموقع
    // ملاحظة: هذا سيمسح كل شيء، بما في ذلك بيانات تسجيل دخول المستخدم إذا كانت محفوظة هنا.
    // localStorage.clear(); 
    // console.log("LocalStorage has been cleared on new visit.");
  }, []);

  return (
    <ApolloProvider client={client}>
      <LanguageProvider>
        <AuthProvider>
          <FavoritesProvider>
            {/* 2. التأكد من أن ThemeProvider يحيط بالمحتوى */}
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
            </ThemeProvider>
          </FavoritesProvider>
        </AuthProvider>
      </LanguageProvider>
    </ApolloProvider>
  );
}