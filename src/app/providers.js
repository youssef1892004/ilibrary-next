// src/app/providers.js
"use client";

import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apollo";
import { AuthProvider } from "@/context/AuthContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { ReadingSettingsProvider } from "@/context/ReadingSettingsContext";
import { ThemeProvider } from "next-themes";
import { Toaster } from 'react-hot-toast';
import { useEffect } from "react";

export function Providers({ children, initialUser }) { // Accept initialUser
  useEffect(() => {
    // هذا الكود سيتم تنفيذه مرة واحدة فقط عند تحميل الموقع
    // ملاحظة: هذا سيمسح كل شيء، بما في ذلك بيانات تسجيل دخول المستخدم إذا كانت محفوظة هنا.
    // localStorage.clear(); 
    // console.log("LocalStorage has been cleared on new visit.");
  }, []);

  return (
    <ApolloProvider client={client}>
      <LanguageProvider>
        <AuthProvider initialUser={initialUser}> {/* Pass to AuthProvider */}
          <FavoritesProvider>
            {/* 2. التأكد من أن ThemeProvider يحيط بالمحتوى */}
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <ReadingSettingsProvider>
                {children}
                <Toaster position="bottom-right" reverseOrder={false} />
              </ReadingSettingsProvider>
            </ThemeProvider>
          </FavoritesProvider>
        </AuthProvider>
      </LanguageProvider>
    </ApolloProvider>
  );
}