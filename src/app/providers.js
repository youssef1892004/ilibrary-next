// src/app/providers.js
"use client";

import React from 'react';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../lib/apollo';
import { AuthProvider } from '../context/AuthContext';
import { FavoritesProvider } from '../context/FavoritesContext';
import { LanguageProvider } from '../context/LanguageContext';
import { ReadingProgressProvider } from '../context/ReadingProgressContext';
import ThemeProvider from '@/context/ThemeProvider';

export function Providers({ children }) {
  return (
    <ApolloProvider client={apolloClient}>
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