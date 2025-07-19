// src/components/BookDetails.jsx
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaUserAlt, FaCalendarAlt, FaBook, FaListOl, FaBarcode, FaFileAlt, FaTag } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';

const BookDetails = ({ book }) => {
  const { t } = useLanguage();

  const author = book.Book_Author?.[0];
  const category = book.book_category?.[0];
  const chapters = book.Bookchapters || [];
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
        
        <div className="lg:col-span-1 flex justify-center">
          <Image
            src={book.coverImage || 'https://placehold.co/400x600/e2e8f0/4a5568?text=No+Image'}
            alt={book.title}
            width={400}
            height={600}
            className="w-full max-w-sm h-auto object-cover rounded-lg shadow-2xl"
          />
        </div>

        <div className="lg:col-span-2">
          {category && (
            <div className="mb-3">
              <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-sm font-semibold bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                <FaTag />
                {category.name}
              </span>
            </div>
          )}

          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-2">{book.title}</h1>
          
          {author && (
            <div className="mb-6">
              <Link href={`/writers/${author.id}`} className="text-xl text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors inline-flex items-center gap-2">
                <FaUserAlt />
                <span>{author.name || 'غير معروف'}</span>
              </Link> {/* --- تم تصحيح الخطأ الإملائي هنا --- */}
            </div>
          )}
          
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            {book.description}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg"><FaCalendarAlt className="mx-auto text-purple-500 mb-1" /><p className="text-sm">تاريخ النشر</p><p className="font-bold">{book.publicationDate || 'N/A'}</p></div>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg"><FaFileAlt className="mx-auto text-purple-500 mb-1" /><p className="text-sm">عدد الصفحات</p><p className="font-bold">{book.total_pages || 'N/A'}</p></div>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg"><FaBarcode className="mx-auto text-purple-500 mb-1" /><p className="text-sm">ISBN</p><p className="font-bold">{book.ISBN || 'N/A'}</p></div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 justify-center">
            <FaBook className="text-purple-500"/>
            <span>{t.chapters || "فصول الكتاب"}</span>
        </h2>
        
        {chapters.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {chapters.map((chapter) => (
              <Link href={`/read/${chapter.id}`} key={chapter.id}>
                <div className="block p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg hover:border-purple-500 border-2 border-transparent transition-all duration-300 transform hover:-translate-y-1">
                  <p className="font-semibold text-gray-700 dark:text-gray-300 truncate">
                    <span className="text-purple-600 dark:text-purple-400">الفصل {chapter.chapter_num}:</span> {chapter.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <p>لا توجد فصول متاحة لهذا الكتاب حالياً.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetails;