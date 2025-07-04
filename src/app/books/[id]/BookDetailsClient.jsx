// src/app/books/[id]/BookDetailsClient.jsx
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBookOpen, FaTag, FaBuilding, FaUserCircle, FaCalendarAlt, FaFileAlt } from "react-icons/fa";
import { useLanguage } from '@/context/LanguageContext';
import RelatedBooks from '@/components/RelatedBooks';

export default function BookDetailsClient({ book }) {
  const { t } = useLanguage();

  if (!book) {
    return null;
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 pt-0">
      <div className="relative pt-32 pb-16 overflow-hidden text-white text-center">
        <div className="absolute inset-0 z-0">
          <Image src={book.coverImage} alt={`خلفية غلاف ${book.title}`} layout="fill" objectFit="cover" className="filter blur-2xl scale-110" priority />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center px-4">
          <div className="w-48 md:w-56">
            <Image src={book.coverImage} alt={`غلاف كتاب ${book.title}`} width={400} height={600} className="rounded-lg shadow-2xl mb-6 border-4 border-white/20" />
          </div>
          <h1 className="text-4xl font-bold" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>{book.title}</h1>
          <p className="text-xl mt-2 opacity-90" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>{t.by || "بقلم"}: {book.author}</p>
          <div className="mt-8">
            <Link href={`/read/${book.id}`} className="inline-flex items-center gap-2 px-8 py-3 bg-purple-600 text-white font-bold rounded-full shadow-lg hover:bg-purple-700 transition-transform hover:scale-105">
              <FaBookOpen /><span>{t.startReading || "ابدأ القراءة"}</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 border-b-2 border-purple-500 pb-2">{t.aboutTheBook || "عن الكتاب"}</h2>
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-loose space-y-4"><p>{book.summary || book.description}</p></div>
            </div>
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{t.theAuthor || "الكاتب"}</h3>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center gap-4">
                  <FaUserCircle className="text-purple-500" size={40} />
                  <div>
                    <h4 className="font-bold text-xl text-gray-900 dark:text-gray-100">{book.author}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t.authorRole || "مؤلف الكتاب"}</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{t.bookDetails || "تفاصيل الكتاب"}</h3>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
                  <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300"><FaTag className="text-purple-500" /> <span className="font-semibold">{t.category || "الفئة"}:</span> <span>{book.category}</span></div>
                  <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300"><FaBuilding className="text-purple-500" /> <span className="font-semibold">{t.publisher || "الناشر"}:</span> <span>{book.publisher}</span></div>
                  <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300"><FaFileAlt className="text-purple-500" /> <span className="font-semibold">{t.pages || "الصفحات"}:</span> <span>{book.pages}</span></div>
                  <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300"><FaCalendarAlt className="text-purple-500" /> <span className="font-semibold">{t.publishDate || "تاريخ النشر"}:</span> <span>{book.publishDate}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <RelatedBooks currentBookId={book.id} category={book.category} />
      </div>
    </div>
  );
}