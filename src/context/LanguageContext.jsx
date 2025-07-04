// src/context/LanguageContext.jsx
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import translations from '@/translations';

// --- خطوة تجريبية لتشخيص المشكلة ---
// هذا السطر سيطبع قيمة "translations" في طرفية المتصفح
// مما يساعدنا على فهم ما إذا كان يتم استيرادها بشكل صحيح
console.log("Imported translations module:", translations);
// ------------------------------------

const LanguageContext = createContext();

export const useLanguage = () => {
  return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ar');

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  // --- كود دفاعي لمنع تعطل التطبيق ---
  // هذا الكود يتأكد من أن "translations" ليس undefined قبل استخدامه
  // وإذا كان كذلك، فإنه يستخدم كائنًا فارغًا كقيمة افتراضية مؤقتة.
  const t = (translations && translations[language]) ? translations[language] : {};
  // ------------------------------------

  const value = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};