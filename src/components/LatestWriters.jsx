// src/components/LatestWriters.jsx
"use client";

import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

const GET_LATEST_WRITERS = gql`
  query GetLatestWriters {
    libaray_Autor(limit: 8, order_by: { book_num: desc }) {
      id
      name
      image_url
      bio
    }
  }
`;

const LatestWriters = () => {
  const { t } = useLanguage();
  const { loading, error, data } = useQuery(GET_LATEST_WRITERS);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg text-gray-500 dark:text-gray-400">جاري تحميل بيانات الكُتّاب...</p>
        </div>
      </section>
    );
  }

  if (error) {
    console.error("ApolloError fetching writers:", error);
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center text-red-500">
          <p>حدث خطأ أثناء جلب بيانات الكُتّاب.</p>
        </div>
      </section>
    );
  }

  const writers = data?.libaray_Autor || [];

  return (
    <section id="latest-writers" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
            {t.writerSpotlight || "تسليط الضوء على كاتب"}
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
            {t.writerSpotlightSubtitle || "تعرف على العقول المبدعة وراء قصصك المفضلة"}
          </p>
          <div className="w-24 h-1 bg-purple-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {writers.map((writer) => (
            <div key={writer.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center transition-transform duration-300 hover:-translate-y-2">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <Image
                  className="w-full h-full rounded-full object-cover border-4 border-purple-200 dark:border-purple-700"
                  src={writer.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(writer.name)}&background=random`}
                  alt={writer.name}
                  width={128}
                  height={128}
                  sizes="128px"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{writer.name}</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2 line-clamp-3 h-20">
                {writer.bio}
              </p>
              {/* --- تم التعديل هنا: إزالة legacyBehavior و وسم <a> --- */}
              <Link
                href={`/writers/${writer.id}`}
                className="mt-4 inline-block px-6 py-2 bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-purple-200 font-semibold rounded-lg hover:bg-purple-200 dark:hover:bg-purple-700 transition-colors"
              >
                {t.viewProfile || "عرض الملف الشخصي"}
              </Link>
            </div>
          ))}
        </div>

        {writers.length === 0 && !loading && (
           <div className="text-center mt-8">
             <p className="text-lg text-gray-500 dark:text-gray-400">لا يوجد كُتّاب لعرضهم حالياً.</p>
           </div>
        )}
      </div>
    </section>
  );
};

export default LatestWriters;