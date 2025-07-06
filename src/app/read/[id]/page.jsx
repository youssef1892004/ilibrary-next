// src/app/read/[id]/page.jsx
"use client";

import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';
import { FaArrowLeft, FaArrowRight, FaBook } from 'react-icons/fa';
import Link from 'next/link';

// 1. استعلام GraphQL لجلب محتوى الفصل المحدد، بالإضافة إلى معلومات الكتاب والفصول الأخرى
const GET_CHAPTER_DETAILS = gql`
  query GetChapterDetails($id: uuid!) {
    ilibarary_Chapter_by_pk(id: $id) {
      id
      title
      content
      chapter_num
      # جلب معلومات الكتاب للرجوع إليها
      Book {
        id
        title
        # جلب كل فصول الكتاب لتمكين التنقل
        Chapters(order_by: { chapter_num: asc }) {
          id
          chapter_num
        }
      }
    }
  }
`;

const ReadPage = () => {
  const params = useParams();
  const router = useRouter();
  const chapterId = params.id;

  // 2. جلب بيانات الفصل من الـ API
  const { loading, error, data } = useQuery(GET_CHAPTER_DETAILS, {
    variables: { id: chapterId },
    skip: !chapterId,
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl">جاري تحميل الفصل...</p>
      </div>
    );
  }

  if (error) {
    console.error("ApolloError fetching chapter:", error);
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        <p className="text-xl">عفواً، حدث خطأ أثناء جلب محتوى الفصل.</p>
      </div>
    );
  }

  const chapter = data?.ilibarary_Chapter_by_pk;

  if (!chapter) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-3xl font-bold">الفصل غير موجود</h1>
      </div>
    );
  }

  // 3. منطق إيجاد الفصل التالي والسابق
  const allChapters = chapter.Book.Chapters;
  const currentIndex = allChapters.findIndex(ch => ch.id === chapter.id);
  const prevChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        
        {/* --- رأس الصفحة: عنوان الكتاب والفصل --- */}
        <header className="mb-8 text-center">
          <Link href={`/books/${chapter.Book.id}`} className="text-purple-600 dark:text-purple-400 hover:underline">
            <h2 className="text-xl font-semibold">{chapter.Book.title}</h2>
          </Link>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mt-2">
            {chapter.title}
          </h1>
        </header>

        {/* --- محتوى الفصل --- */}
        <article className="prose prose-lg dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-md">
          {/* 4. عرض محتوى الفصل (الذي هو عبارة عن مصفوفة من النصوص) */}
          {Array.isArray(chapter.content) ? (
            chapter.content.map((paragraph, index) => (
              <p key={index} className="leading-relaxed my-4">
                {paragraph}
              </p>
            ))
          ) : (
            <p>{chapter.content}</p>
          )}
        </article>

        {/* --- أزرار التنقل --- */}
        <nav className="flex justify-between items-center mt-12 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div>
            {prevChapter ? (
              <Link href={`/read/${prevChapter.id}`} className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                <FaArrowLeft />
                <span>الفصل السابق</span>
              </Link>
            ) : (
              <span className="flex items-center gap-2 text-gray-400 dark:text-gray-600 cursor-not-allowed">
                <FaArrowLeft />
                <span>الفصل السابق</span>
              </span>
            )}
          </div>
          
          <Link href={`/books/${chapter.Book.id}`} className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            <FaBook size={24} />
          </Link>

          <div>
            {nextChapter ? (
              <Link href={`/read/${nextChapter.id}`} className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                <span>الفصل التالي</span>
                <FaArrowRight />
              </Link>
            ) : (
              <span className="flex items-center gap-2 text-gray-400 dark:text-gray-600 cursor-not-allowed">
                <span>الفصل التالي</span>
                <FaArrowRight />
              </span>
            )}
          </div>
        </nav>

      </div>
    </div>
  );
};

export default ReadPage;
