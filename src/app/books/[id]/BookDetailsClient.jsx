// src/components/BookDetails.jsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FaUserAlt, FaCalendarAlt, FaBook, FaListOl, FaBarcode, FaFileAlt, FaChevronDown } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';

const BookDetails = ({ book }) => {
  const { t } = useLanguage();
  const [isChaptersOpen, setIsChaptersOpen] = useState(false);
  
  // استخلاص البيانات باستخدام أسماء العلاقات الصحيحة
  const author = book.Book_Author;
  const chapters = book.Chapters || [];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <img
              src={book.cover_URL || 'https://placehold.co/400x600/e2e8f0/4a5568?text=No+Image'}
              alt={book.title}
              className="w-full h-auto object-cover rounded-lg shadow-2xl"
              onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x600/e2e8f0/4a5568?text=Error'; }}
            />
            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-4 mb-3">
                    <FaUserAlt className="text-purple-500" />
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">الكاتب</p>
                        <p className="font-semibold text-gray-800 dark:text-gray-200">{author?.name || 'غير معروف'}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <FaCalendarAlt className="text-purple-500" />
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">تاريخ النشر</p>
                        <p className="font-semibold text-gray-800 dark:text-gray-200">{book.publication_date || 'غير محدد'}</p>
                    </div>
                </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">{book.title}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">{book.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 text-center">
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg"><FaListOl className="mx-auto text-purple-500 mb-1" /><p className="text-sm">عدد الأجزاء</p><p className="font-bold">{book.parts_num || 'N/A'}</p></div>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg"><FaFileAlt className="mx-auto text-purple-500 mb-1" /><p className="text-sm">عدد الصفحات</p><p className="font-bold">{book.total_pages || 'N/A'}</p></div>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg"><FaBarcode className="mx-auto text-purple-500 mb-1" /><p className="text-sm">ISBN</p><p className="font-bold">{book.ISBN || 'N/A'}</p></div>
          </div>

          <div className="mt-10">
            <button
              onClick={() => setIsChaptersOpen(!isChaptersOpen)}
              className="w-full flex justify-between items-center text-left text-2xl font-bold mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <span className="flex items-center gap-2"><FaBook />{t.chapters || "فصول الكتاب"}</span>
              <FaChevronDown className={`transition-transform duration-300 ${isChaptersOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isChaptersOpen ? 'max-h-[1000px]' : 'max-h-0'}`}>
              <div className="space-y-3 pt-2">
                {chapters.length > 0 ? (
                  chapters.map((chapter) => (
                    <Link href={`/read/${chapter.id}`} key={chapter.id}>
                      <div className="block p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                        <p className="font-semibold text-purple-600 dark:text-purple-400">{t.chapter || "الفصل"} {chapter.chapter_num}: {chapter.title}</p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">لا توجد فصول متاحة لهذا الكتاب حالياً.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
