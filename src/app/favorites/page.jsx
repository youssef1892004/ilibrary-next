// src/app/favorites/page.jsx
"use client";

import React from 'react';
import { useDbFavorites } from '@/hooks/useDbFavorites';
import FavoriteBookCard from '@/components/FavoriteBookCard'; // 1. استيراد المكون الجديد
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

const FavoritesPage = () => {
  const { user } = useAuth();
  const { favorites, loading } = useDbFavorites();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-lg mb-4">يجب تسجيل الدخول لعرض قائمة المفضلة.</p>
        <Link href="/auth" className="btn-primary">
          الانتقال لصفحة الدخول
        </Link>
      </div>
    );
  }

  if (loading) return <div className="text-center py-20"><p>جاري تحميل المفضلة...</p></div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white">
        مكتبتي المفضلة
      </h1>
      
      {favorites.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">لم تقم بإضافة أي كتب إلى المفضلة بعد.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {/* 2. استخدام المكون الجديد هنا */}
          {favorites.map((fav) => (
            <FavoriteBookCard key={fav.id} bookId={fav.book_id} sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw" />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;