// src/components/LatestBooks.jsx
"use client";
import React from 'react';
import Link from 'next/link';
import BookCard from './BookCard';
import { booksData } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';

const LatestBooks = () => {
  const { t } = useLanguage();
  const latestBooks = booksData.slice(0, 10);

  return (
    // -- التعديل هنا: تمت إضافة لون خلفية للقسم --
    <section id="latest-books" className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
            {t.latestBooks || "أحدث الكتب"}
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
            {t.latestBooksSubtitle || "تصفح أحدث الإصدارات التي تمت إضافتها إلى مكتبتنا"}
          </p>
          <div className="w-24 h-1 bg-purple-600 mx-auto mt-4 rounded-full"></div>
        </div>
        
        <div className="relative">
          <div className="flex overflow-x-auto scrollbar-hide pb-4 -mx-4 sm:-mx-6 lg:-mx-8">
            <div className="flex flex-nowrap gap-6 px-4 sm:px-6 lg:px-8">
              {latestBooks.map((book) => (
                <div key={book.id} className="w-72 flex-shrink-0">
                  <BookCard book={book} />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Link href="/books">
            <button className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md">
              {t.viewAllBooks || "عرض كل الكتب"}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestBooks;