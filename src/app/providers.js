// src/app/providers.js
"use client";


import React from 'react';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from '../lib/apollo';
import { AuthProvider } from '../context/AuthContext';
import { FavoritesProvider } from '../context/FavoritesContext';
import { LanguageProvider } from '../context/LanguageContext';
// import { ThemeProvider } from '../context/ThemeContext';
// 1. استيراد الـ Provider الجديد
import { ReadingProgressProvider } from '../context/ReadingProgressContext';


import { ThemeProvider as NextThemesProvider } from "next-themes";
import ThemeProvider from '@/context/ThemeProvider';
// ...
const client = createApolloClient();

export function Providers({ children }) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <FavoritesProvider>
          <LanguageProvider>
           <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
              <ReadingProgressProvider>
                {children}
              </ReadingProgressProvider>
            </ThemeProvider>
          </LanguageProvider>
        </FavoritesProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}
