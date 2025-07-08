// src/context/ReadingProgressContext.jsx
"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const READING_PROGRESS_KEY = 'iLibraryReadingProgress';

const ReadingProgressContext = createContext();

export const useReadingProgress = () => useContext(ReadingProgressContext);

export const ReadingProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState({});

  // تحميل البيانات المحفوظة من المتصفح عند بدء تشغيل التطبيق
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(READING_PROGRESS_KEY);
      if (savedProgress) {
        setProgress(JSON.parse(savedProgress));
      }
    } catch (error) {
      console.error("Failed to load reading progress from localStorage", error);
    }
  }, []);

  // دالة لحفظ تقدم المستخدم (تم إصلاحها لمنع الحلقة اللانهائية)
  const saveProgress = useCallback((bookId, chapterId) => {
    if (!bookId || !chapterId) return;
    
    setProgress(currentProgress => {
      // لا تقم بالتحديث إذا كانت القيمة لم تتغير
      if (currentProgress[bookId] === chapterId) {
        return currentProgress;
      }
      
      const newProgress = { ...currentProgress, [bookId]: chapterId };
      
      try {
        localStorage.setItem(READING_PROGRESS_KEY, JSON.stringify(newProgress));
      } catch (error) {
        console.error("Failed to save reading progress to localStorage", error);
      }
      
      return newProgress;
    });
  }, []); // <-- المصفوفة الفارغة هنا تجعل الدالة ثابتة ولا تتغير

  // دالة لجلب التقدم المحفوظ لكتاب معين
  const getProgress = useCallback((bookId) => {
    return progress[bookId] || null;
  }, [progress]);

  const value = {
    saveProgress,
    getProgress,
  };

  return (
    <ReadingProgressContext.Provider value={value}>
      {children}
    </ReadingProgressContext.Provider>
  );
};
