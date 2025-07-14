// src/components/LatestBooks.jsx
"use client";

import React, { useMemo } from 'react';
import { useQuery, gql } from '@apollo/client';
import BookCard from './BookCard';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

// 1. الاستعلام الصحيح بناءً على الـ schema الجديدة
const GET_LATEST_BOOKS = gql`
  query GetLatestBooks {
    libaray_Book(limit: 10, order_by: { publicationDate: desc }) {
      id
      title
      coverImage
      # جلب العلاقة مع المؤلف
      Book_Author {
        name
      }
      # جلب العلاقة مع الصنف
      book_category {
        name
      }
    }
  }
`;

const LatestBooks = () => {
  const { t } = useLanguage();
  const { loading, error, data } = useQuery(GET_LATEST_BOOKS);

  if (loading) {
    return (
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg text-gray-500 dark:text-gray-400">جاري تحميل أحدث الكتب...</p>
        </div>
      </section>
    );
  }

  if (error) {
    console.error("ApolloError in LatestBooks:", error);
    return (
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center text-red-500">
          <p>حدث خطأ أثناء جلب البيانات. يرجى التأكد من صلاحيات الوصول في Hasura.</p>
        </div>
      </section>
    );
  }

  const latestBooks = data?.libaray_Book || [];

  return (
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
              {latestBooks.map((book) => {
                // 2. تمرير البيانات الصحيحة لبطاقة الكتاب
                const authorName = book.Book_Author?.[0]?.name;
                return (
                  <div key={book.id} className="w-72 flex-shrink-0">
                    <BookCard book={book} authorName={authorName} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {latestBooks.length === 0 && !loading && (
           <div className="text-center mt-8">
             <p className="text-lg text-gray-500 dark:text-gray-400">لا توجد كتب لعرضها حالياً.</p>
           </div>
        )}

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