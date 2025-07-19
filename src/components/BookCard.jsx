// src/components/BookCard.jsx
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaHeart, FaRegHeart, FaBookOpen, FaUserAlt, FaTag } from 'react-icons/fa';
import { useFavorites } from '@/context/FavoritesContext';
import { useLanguage } from '@/context/LanguageContext';

const BookCard = ({ book, authorName: authorNameFromProp }) => {
  if (!book) {
    return null; 
  }

  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const { t } = useLanguage();
  const isFavorite = favorites.some((fav) => fav.id === book.id);

  const authorName = authorNameFromProp || book.Book_Author?.[0]?.name;
  const categoryName = book.book_category?.[0]?.name;

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      removeFavorite(book.id);
    } else {
      const bookToAdd = {
        id: book.id,
        title: book.title,
        coverImage: book.coverImage,
        Book_Author: [{ name: authorName }],
        book_category: [{ name: categoryName }]
      };
      addFavorite(bookToAdd); 
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

        {/* --- بداية التعديل: تكبير الخط وجعله BOLD --- */}
        {authorName && (
          <p className="text-lg text-gray-700 dark:text-gray-300 font-bold mb-3 truncate">
            {t.by || "بواسطة"}: {authorName}
          </p>
        )}
        {/* --- نهاية التعديل --- */}
        
        <div className="flex-grow"></div> 

        <div className="mt-auto pt-4 flex items-center gap-2">
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