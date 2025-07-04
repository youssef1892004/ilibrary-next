// src/components/BookCard.jsx
"use client";

import React from 'react';
import Link from 'next/link';
import { FaHeart, FaRegHeart, FaBookOpen, FaStar, FaStarHalfAlt, FaRegStar, FaUserAlt } from 'react-icons/fa';
import { useFavorites } from '@/context/FavoritesContext';
import CloudinaryImage from './CloudinaryImage';
import { useLanguage } from '@/context/LanguageContext';

const BookCard = ({ book }) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const { t } = useLanguage();
  const isFavorite = favorites.some((fav) => fav.id === book.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      removeFavorite(book.id);
    } else {
      addFavorite(book);
    }
  };

  // --- التعديل هنا: تم إضافة key فريد لكل عنصر ---
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    
    // النجوم الكاملة
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} />);
    }
    
    // النجم النصفي
    if (halfStar) {
      stars.push(<FaStarHalfAlt key="half" />);
    }
    
    // النجوم الفارغة
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} />);
    }
    
    return stars;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col h-full transition-shadow duration-300 hover:shadow-2xl group">
      <Link href={`/books/${book.id}`} className="block relative">
        <div className="aspect-[3/4] bg-gray-200 dark:bg-gray-700">
          <CloudinaryImage
            publicId={book.coverImage}
            alt={book.title}
            width="250"
            height="375"
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

        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
          <FaUserAlt size={12} />
          <p className="text-base font-medium truncate">{book.author}</p>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <div className="flex text-yellow-400">
            {renderStars(book.rating)}
          </div>
          <span className="dark:text-gray-400">({book.reviews})</span>
        </div>

        <div className="flex-grow"></div> 

        <div className="mt-4 flex items-center gap-2">
          <Link 
            href={`/read/${book.id}`} 
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