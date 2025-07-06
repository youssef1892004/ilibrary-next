"use client";

import React from 'react';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from '../lib/apollo'; // استيراد الدالة التي تنشئ العميل
import { AuthProvider } from '../context/AuthContext';
import { FavoritesProvider } from '../context/FavoritesContext';
import { LanguageProvider } from '../context/LanguageContext';
import { ThemeProvider } from '../context/ThemeContext';

// نقوم بإنشاء نسخة من العميل مرة واحدة
const client = createApolloClient();

export function Providers({ children }) {
  return (
    // 1. إضافة ApolloProvider كأب رئيسي
    <ApolloProvider client={client}>
      <AuthProvider>
        <FavoritesProvider>
          <LanguageProvider>
            <ThemeProvider>
              {children}
            </ThemeProvider>
          </LanguageProvider>
        </FavoritesProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}