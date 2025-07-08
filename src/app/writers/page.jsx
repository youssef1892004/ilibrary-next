// src/app/writers/page.jsx
"use client";

import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { FaBook } from "react-icons/fa";

// 1. استعلام GraphQL لجلب قائمة بجميع الكُتّاب
// يتم ترتيبهم أبجديًا حسب الاسم
const GET_ALL_WRITERS = gql`
  query GetAllWriters {
    ilibarary_Autor(order_by: { name: asc }) {
      id
      name
      image_url
      bio
      book_num
    }
  }
`;

const WritersPage = () => {
  const { t } = useLanguage();
  // 2. استخدام useQuery لجلب بيانات الكُتّاب من الـ API
  const { loading, error, data } = useQuery(GET_ALL_WRITERS);

  // عرض حالة التحميل
  if (loading) {
    return (
      <div className="container mx-auto text-center py-20">
        <p className="text-xl">جاري تحميل قائمة الكُتّاب...</p>
      </div>
    );
  }

  // عرض حالة الخطأ
  if (error) {
    console.error("ApolloError fetching writers:", error);
    return (
      <div className="container mx-auto text-center py-20 text-red-500">
        <p className="text-xl">حدث خطأ أثناء جلب بيانات الكُتّاب.</p>
      </div>
    );
  }

  // 3. استخلاص قائمة الكُتّاب من البيانات
  const writers = data?.ilibarary_Autor || [];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
            {t.writersPageTitle || "الكُتّاب والمؤلفون"}
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-3 max-w-2xl mx-auto">
            {t.writersPageSubtitle || "اكتشف العقول المبدعة التي أثرت مكتبتنا بأعمالها الرائعة."}
          </p>
        </header>

        {/* 4. عرض شبكة الكُتّاب */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {writers.map((writer) => (
            <Link href={`/writers/${writer.id}`} key={writer.id}>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group">
                
                {/* --- تم إصلاح التصميم هنا --- */}
                <div className="flex flex-col items-center pt-8 bg-purple-50 dark:bg-purple-900/20">
                  <img
                    className="w-28 h-28 rounded-full object-cover border-4 border-white dark:border-gray-800 -mb-14 transition-transform duration-300 group-hover:scale-110"
                    src={writer.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(writer.name)}&background=8b5cf6&color=fff&size=128`}
                    alt={writer.name}
                    onError={(e) => { e.target.onerror = null; e.target.src=`https://ui-avatars.com/api/?name=${encodeURIComponent(writer.name)}&background=8b5cf6&color=fff&size=128`; }}
                  />
                </div>
                
                <div className="p-6 pt-20 text-center flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{writer.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-2 line-clamp-3 flex-grow min-h-[72px]">
                    {writer.bio || "لا يوجد نبذة متاحة حاليًا."}
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-center items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold">
                    <FaBook />
                    <span>{writer.book_num || 0} {t.books || "كتب"}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {writers.length === 0 && !loading && (
           <div className="text-center mt-8">
             <p className="text-lg text-gray-500 dark:text-gray-400">لا يوجد كُتّاب لعرضهم حالياً.</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default WritersPage;
