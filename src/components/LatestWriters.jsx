// src/components/LatestWriters.jsx
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // استخدام Link من Next.js
import { booksData } from '@/data/mockData'; // استخدام المسار الصحيح
import { FaBookOpen, FaInfoCircle } from "react-icons/fa";
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image'; // استخدام Image من Next.js

const LatestWriters = () => {
  const [featuredBook, setFeaturedBook] = useState(null);
  const { t } = useLanguage();

  useEffect(() => {
    // هذه الدالة تختار كتابًا عشوائيًا عند تحميل المكون
    if (booksData && booksData.length > 0) {
      const randomIndex = Math.floor(Math.random() * booksData.length);
      setFeaturedBook(booksData[randomIndex]);
    }
  }, []); // القوسان الفارغان يعنيان أن هذا التأثير يعمل مرة واحدة فقط عند التحميل

  // في حالة عدم اختيار كتاب بعد (أثناء التحميل)
  if (!featuredBook) {
    return (
      <section className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-6 text-center">
          <p>{t.loadingWriter || "جاري تحميل كاتب مميز..."}</p>
        </div>
      </section>
    );
  }

  // بعد اختيار الكتاب، يتم عرض هذا الجزء
  return (
    <section className="bg-gray-50 dark:bg-gray-800 py-20 transition-colors">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
              {t.writerSpotlight || "تسليط الضوء على كاتب"}
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
              {t.writerSpotlightSubtitle || "نقدم لكم في كل مرة كاتبًا مبدعًا وأحد أبرز أعماله"}
            </p>
            <div className="w-24 h-1 bg-purple-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* الجزء الأيمن: معلومات عن الكاتب والكتاب */}
          <div className="md:w-1/2 text-center md:text-right">
            <p className="font-bold text-purple-600 dark:text-purple-400">
              {t.author || "المؤلف"}
            </p>
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mt-1 mb-4">
              {featuredBook.author}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              {t.writerBio || "كاتب وروائي مبدع، يتميز بأسلوبه الفريد في سرد القصص التي تلامس القلوب وتثير العقول. يعتبر من الأصوات الأدبية البارزة في جيله."}
            </p>
            
            <p className="font-bold text-purple-600 dark:text-purple-400 mt-8">
              {t.featuredBook || "كتاب مميز"}
            </p>
            <h4 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-1 mb-3">
              {featuredBook.title}
            </h4>
            <p className="text-gray-600 dark:text-gray-300 mb-8 line-clamp-3">
              {featuredBook.description}
            </p>

            <div className="flex justify-center md:justify-start gap-4">
              <Link
                href={`/read/${featuredBook.id}`} // تصحيح المسار
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-transform shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <FaBookOpen />
                <span>{t.readBook || "اقرأ الكتاب"}</span>
              </Link>
              <Link
                href={`/books/${featuredBook.id}`} // تصحيح المسار
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-gray-700 dark:border-gray-200 text-gray-700 dark:text-gray-200 font-semibold transition-colors hover:bg-gray-700 hover:text-white dark:hover:bg-gray-200 dark:hover:text-gray-700"
              >
                <FaInfoCircle />
                <span>{t.viewDetails || "عرض التفاصيل"}</span>
              </Link>
            </div>
          </div>
          
          {/* الجزء الأيسر: صورة غلاف الكتاب */}
          <div className="md:w-1/2">
            <Link href={`/books/${featuredBook.id}`} className="group">
                <Image
                    src={featuredBook.coverImage}
                    alt={`غلاف كتاب ${featuredBook.title}`}
                    width={400} // تحديد العرض
                    height={600} // تحديد الارتفاع
                    className="rounded-lg shadow-2xl w-full max-w-sm mx-auto transition-all duration-300 group-hover:shadow-purple-400/30 group-hover:scale-105"
                />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestWriters;