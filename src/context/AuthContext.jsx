// src/context/AuthContext.jsx
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import client from '../lib/apollo'; // استيراد apollo client

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // هذا الجزء يتحقق من وجود جلسة عند تحميل الصفحة لأول مرة
    try {
      const session = JSON.parse(localStorage.getItem('session'));
      if (session?.user && session?.accessToken) {
        setUser(session.user);
      }
    } catch (error) {
      console.error("Could not parse session from localStorage on initial load", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (session) => {
    // ---  التعديل المطلوب هنا ---
    // 1. مسح كل البيانات القديمة من localStorage بشكل كامل
    localStorage.clear();

    // 2. تخزين بيانات الجلسة الجديدة فقط
    localStorage.setItem('session', JSON.stringify(session));

    // 3. تحديث حالة المستخدم في التطبيق وإعادة تعيين Apollo Cache
    setUser(session.user);
    client.resetStore(); 
    router.push('/');
    router.refresh();
  };

  const logout = () => {
    // عند تسجيل الخروج، نقوم أيضًا بمسح كل شيء
    localStorage.clear();
    setUser(null);
    client.resetStore();
    router.push('/auth');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);