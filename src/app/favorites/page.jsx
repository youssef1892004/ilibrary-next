// src/app/favorites/page.jsx
"use client";

import React from 'react';
import { useFavorites } from '@/context/FavoritesContext';
import BookCard from '@/components/BookCard';
import Link from 'next/link'; // استخدام Link من Next.js
import { useLanguage } from '@/context/LanguageContext';

const FavoritesPage = () => {
  const { favorites } = useFavorites();
  const { t } = useLanguage();

  return (
    // استخدام pt-20 لترك مسافة للـ Navbar
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t.favoriteBooksTitle || "الكتب المفضلة"}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t.favoriteBooksSubtitle || "هنا تجد جميع الكتب التي أضفتها إلى قائمتك الخاصة."}
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <p className="text-gray-500 dark:text-gray-400 text-xl mb-6">
              {t.favoritesEmpty || "قائمة المفضلة فارغة."}
            </p>
            <Link href="/books">
                <button className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-lg hover:scale-105 transform">
                    {t.browseBooks || "تصفح الكتب"}
                </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {favorites.map((book) => (
              <BookCard
                key={book.id}
                book={book} // تمرير كائن book بالكامل
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;