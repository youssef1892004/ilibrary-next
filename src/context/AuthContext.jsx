// src/context/AuthContext.jsx
"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// --- تأكد من وجود هذا السطر ---
import client from '@/lib/apollo';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedSession = localStorage.getItem('session');
      if (storedSession) {
        const session = JSON.parse(storedSession);
        setUser(session.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to parse session from localStorage", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (session) => {
    if (session && session.user && session.accessToken) {
      localStorage.setItem('session', JSON.stringify(session));
      setUser(session.user);
      // --- وتأكد من وجود هذا السطر ---
      client.resetStore();
    }
  };

  const logout = () => {
    localStorage.removeItem('session');
    setUser(null);
    // --- هذا السطر مهم أيضاً عند تسجيل الخروج ---
    client.resetStore();
    // يمكنك تعديل هذا السطر ليوجه المستخدم لأي صفحة تريدها بعد الخروج
    router.push('/auth'); 
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);