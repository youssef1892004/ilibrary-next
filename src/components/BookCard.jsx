// src/components/BookCard.jsx
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaHeart, FaRegHeart, FaBookOpen, FaUserAlt, FaTag } from 'react-icons/fa';
import { useFavorites } from '@/context/FavoritesContext';
import { useLanguage } from '@/context/LanguageContext';

// --- تم تعديل المكون ليقبل authorName كخاصية اختيارية ---
const BookCard = ({ book, authorName: authorNameFromProp }) => {
  if (!book) {
    return null; 
  }

  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const { t } = useLanguage();
  const isFavorite = favorites.some((fav) => fav.id === book.id);

  // إذا تم تمرير اسم المؤلف، استخدمه. وإلا، ابحث عنه داخل كائن الكتاب.
  const authorName = authorNameFromProp || book.Book_Author?.[0]?.name;
  const categoryName = book.book_category?.[0]?.name;

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      removeFavorite(book.id);
    } else {
      addFavorite({ ...book, authorName, categoryName }); 
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
          />
        </div>
      </Link>
      
      <div className="p-4 flex flex-col flex-grow">
        <Link href={`/books/${book.id}`} className="block">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2 h-14 group-hover:text-purple-600 dark:group-hover:text-purple-400">
            {book.title}
          </h3>
        </Link>

        {authorName && (
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
            <FaUserAlt size={12} />
            <p className="text-sm font-medium truncate">{authorName}</p>
          </div>
        )}
        
        {categoryName && (
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs mb-3">
                <FaTag size={12}/>
                <span>{categoryName}</span>
            </div>
        )}

        <div className="flex-grow"></div> 

        <div className="mt-4 flex items-center gap-2">
          <Link 
            href={`/books/${book.id}`} 
            className="flex-grow flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <FaBookOpen />
            {t.readBook || "اقرأ الآن"}
          </Link>
          
          <button
            onClick={handleFavoriteClick}
            className="p-2.5 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle Favorite"
          >
            {isFavorite ? (
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