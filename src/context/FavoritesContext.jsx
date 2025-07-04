// src/context/FavoritesContext.jsx
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. إنشاء وتصدير السياق مع قيم افتراضية
export const FavoritesContext = createContext({
  favorites: [],
  addFavorite: (book) => {},
  removeFavorite: (bookId) => {},
});

// 2. إنشاء وتصدير "الخطاف" المخصص لتسهيل الاستخدام
export const useFavorites = () => {
  return useContext(FavoritesContext);
};

// 3. إنشاء وتصدير "المزود" الذي يحتوي على المنطق
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // تحميل المفضلة من الذاكرة المحلية عند بدء التطبيق
  useEffect(() => {
    try {
      const localFavorites = localStorage.getItem('favorites');
      if (localFavorites) {
        setFavorites(JSON.parse(localFavorites));
      }
    } catch (error) {
      console.error('Could not load favorites from localStorage', error);
      setFavorites([]);
    }
  }, []);

  // حفظ المفضلة في الذاكرة المحلية كلما تغيرت
  useEffect(() => {
    try {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
        console.error('Could not save favorites to localStorage', error);
    }
  }, [favorites]);

  const addFavorite = (book) => {
    setFavorites((prevFavorites) => {
      // التأكد من عدم إضافة الكتاب مرتين
      if (!prevFavorites.find(item => item.id === book.id)) {
        return [...prevFavorites, book];
      }
      return prevFavorites;
    });
  };

  const removeFavorite = (bookId) => {
    setFavorites((prevFavorites) => prevFavorites.filter((book) => book.id !== bookId));
  };

  const value = { favorites, addFavorite, removeFavorite };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};