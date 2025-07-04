// src/context/AuthContext.jsx
"use client";

import React, { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';

// 1. نقوم بإنشاء السياق وتصديره مباشرة
export const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

// 2. نقوم بإنشاء وتصدير "الخطاف" المخصص لتسهيل الاستخدام
export const useAuth = () => {
  return useContext(AuthContext);
};

// 3. نقوم بإنشاء وتصدير "المزود" الذي يحتوي على المنطق
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const login = (userData) => {
    setUser(userData);
    // يمكنك توجيه المستخدم من هنا أو من الصفحة نفسها
    // router.push('/'); 
  };

  const logout = () => {
    setUser(null);
    router.push('/auth'); // توجيه المستخدم لصفحة الدخول عند تسجيل الخروج
  };

  const value = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};