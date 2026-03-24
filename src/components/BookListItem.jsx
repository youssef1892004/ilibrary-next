"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaHeart, FaRegHeart, FaBookOpen, FaUserAlt, FaTag, FaCalendarAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useDbFavorites } from '@/hooks/useDbFavorites';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';

const BookListItem = ({ book }) => {
    if (!book) return null;

    const { t } = useLanguage();
    const { user } = useAuth();
    const { addFavorite, removeFavorite, isFavorite, loading: favoritesLoading } = useDbFavorites();
    const favoriteStatus = isFavorite(book.id);

    const authorName = book.Book_Author?.[0]?.name;
    const categoryName = book.book_category?.[0]?.name;
    const pubDate = book.publicationDate ? new Date(book.publicationDate).getFullYear() : null;

    const handleFavoriteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user) {
            toast.error("يرجى تسجيل الدخول أولاً لإضافة الكتب إلى المفضلة.");
            return;
        }

        if (favoriteStatus) {
            removeFavorite(book.id);
        } else {
            addFavorite(book.id);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col sm:flex-row group h-auto sm:h-48">
            {/* Cover Image */}
            <Link href={`/books/${book.id}`} className="flex-shrink-0 w-full sm:w-32 h-48 sm:h-full relative overflow-hidden bg-gray-200 dark:bg-gray-700">
                <Image
                    src={book.coverImage || 'https://placehold.co/250x375/e2e8f0/4a5568?text=No+Image'}
                    alt={book.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 150px"
                />
            </Link>

            {/* Content */}
            <div className="flex-grow p-4 sm:p-5 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start">
                        <div className="flex-grow">
                            {categoryName && (
                                <span className="inline-flex items-center gap-1 mb-2 text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 px-2 py-1 rounded-full">
                                    <FaTag size={10} />
                                    {categoryName}
                                </span>
                            )}
                            <Link href={`/books/${book.id}`}>
                                <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                    {book.title}
                                </h3>
                            </Link>
                        </div>

                        <button
                            onClick={handleFavoriteClick}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-all"
                            disabled={favoritesLoading}
                        >
                            {favoriteStatus ? <FaHeart className="text-red-500" size={20} /> : <FaRegHeart size={20} />}
                        </button>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-2">
                        {authorName && (
                            <span className="flex items-center gap-1">
                                <FaUserAlt size={12} />
                                {authorName}
                            </span>
                        )}
                        {pubDate && (
                            <span className="flex items-center gap-1">
                                <FaCalendarAlt size={12} />
                                {pubDate}
                            </span>
                        )}
                    </div>

                    {/* Description could go here if available in the query */}
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={`/books/${book.id}`}
                        className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        <FaBookOpen />
                        {t.readBook || "عرض التفاصيل"}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BookListItem;
