// src/context/AuthContext.jsx
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const AuthContext = createContext({
  user: null,
  login: (session) => {},
  logout: () => {},
  updateUser: (newUserData) => {}, // دالة جديدة لتحديث المستخدم
  isLoading: true,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedSession = localStorage.getItem('session');
      if (storedSession) {
        const session = JSON.parse(storedSession);
        if (session && session.user) {
          setUser(session.user);
        }
      }
    } catch (error) {
      console.error("Failed to parse session from localStorage", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (session) => {
    try {
      localStorage.setItem('session', JSON.stringify(session));
      setUser(session.user);
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error("Failed to save session", error);
    }
  };

  const logout = () => {
    localStorage.removeItem('session');
    setUser(null);
    router.push('/');
  };

  // --- الدالة الجديدة ---
  // تقوم بتحديث بيانات المستخدم في الحالة وفي الـ localStorage
  const updateUser = (newUserData) => {
    setUser(currentUser => {
      const updatedUser = { ...currentUser, ...newUserData };
      
      try {
        const storedSession = localStorage.getItem('session');
        if (storedSession) {
          const session = JSON.parse(storedSession);
          session.user = updatedUser;
          localStorage.setItem('session', JSON.stringify(session));
        }
      } catch (error) {
        console.error("Failed to update session in localStorage", error);
      }
      
      return updatedUser;
    });
  };

  const value = {
    user,
    login,
    logout,
    updateUser, // إضافة الدالة الجديدة للسياق
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};