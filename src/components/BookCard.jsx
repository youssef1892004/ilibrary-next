// src/components/BookCard.jsx
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaHeart, FaRegHeart, FaBookOpen, FaUserAlt, FaTag } from 'react-icons/fa';
import { useDbFavorites } from '@/hooks/useDbFavorites'; // 1. استيراد الـ Hook الجديد
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext'; // 2. استيراد useAuth للتحقق من المستخدم

const BookCard = ({ book, authorName: authorNameFromProp, sizes }) => {
  if (!book) {
    return null; 
  }

  const { t } = useLanguage();
  const { user } = useAuth(); // 3. جلب المستخدم الحالي
  const { addFavorite, removeFavorite, isFavorite, loading: favoritesLoading } = useDbFavorites(); // 4. استخدام الـ Hook الجديد

  // 5. التحقق إذا كان الكتاب في المفضلة
  const favoriteStatus = isFavorite(book.id);

  const authorName = authorNameFromProp || book.Book_Author?.[0]?.name;
  const categoryName = book.book_category?.[0]?.name;

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // 6. التأكد من أن المستخدم قد سجل دخوله قبل الإضافة/الحذف
    if (!user) {
      // يمكنك هنا إظهار رسالة للمستخدم تطلب منه تسجيل الدخول
      alert("يرجى تسجيل الدخول أولاً لإضافة الكتب إلى المفضلة.");
      return;
    }
    
    if (favoriteStatus) {
      removeFavorite(book.id);
    } else {
      addFavorite(book.id); 
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col h-full transition-shadow duration-300 hover:shadow-2xl group">
      <Link href={`/books/${book.id}`} className="block relative">
        <div className="aspect-[3/4] bg-gray-200 dark:bg-gray-700">
          <Image
            src={book.coverImage || 'https://placehold.co/250x375/e2e8f0/4a5568?text=No+Image'}
            alt={book.title}
            width={250}
            height={375}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            sizes={sizes || '100vw'}
          />
        </div>

        {categoryName && (
          <div className="absolute top-2 left-2">
            <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-semibold bg-purple-600/80 text-white backdrop-blur-sm">
              <FaTag size={10} />
              {categoryName}
            </span>
          </div>
        )}
      </Link>
      
      <div className="p-4 flex flex-col flex-grow">
        <Link href={`/books/${book.id}`} className="block">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2 h-14 group-hover:text-purple-600 dark:group-hover:text-purple-400">
            {book.title}
          </h3>
        </Link>

        {authorName && (
          <p className="text-lg text-gray-700 dark:text-gray-300 font-bold mb-3 truncate">
            {t.by || "بواسطة"}: {authorName}
          </p>
        )}
        
        <div className="flex-grow"></div> 

        <div className="mt-auto pt-4 flex items-center gap-2">
          <Link 
            href={`/books/${book.id}`} 
            className="flex-grow flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
            aria-label={`اقرأ كتاب ${book.title}`}
          >
            <FaBookOpen />
            {t.readBook || "اقرأ الآن"}
          </Link>
          
          <button
            onClick={handleFavoriteClick}
            className="p-2.5 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle Favorite"
            disabled={favoritesLoading} // تعطيل الزر أثناء تحميل البيانات
          >
            {favoriteStatus ? (
              <FaHeart className="text-red-500" size={18} />
            ) : (
              <FaRegHeart className="text-gray-600 dark:text-gray-300" size={18} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;