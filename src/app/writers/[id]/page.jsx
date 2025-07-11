// src/app/writers/[id]/page.jsx
"use client";

import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import BookCard from '@/components/BookCard';
import { FaBook } from 'react-icons/fa';

// 1. استعلام لجلب تفاصيل الكاتب (بدون كتبه)
const GET_WRITER_DETAILS = gql`
  query GetWriterDetails($id: uuid!) {
    ilibarary_Autor_by_pk(id: $id) {
      id
      name
      image_url
      bio
      book_num
    }
  }
`;

// 2. استعلام منفصل لجلب كتب الكاتب باستخدام author_id
const GET_BOOKS_BY_AUTHOR = gql`
  query GetBooksByAuthor($authorId: uuid!) {
    ilibarary_Book(where: { author_id: { _eq: $authorId } }, order_by: {publication_date: desc}) {
      id
      title
      cover_URL
      author_id
    }
  }
`;


const WriterProfilePage = () => {
  const params = useParams();
  const writerId = params.id;

  // 3. جلب بيانات الكاتب أولاً
  const { loading: writerLoading, error: writerError, data: writerData } = useQuery(GET_WRITER_DETAILS, {
    variables: { id: writerId },
    skip: !writerId,
  });

  const writer = writerData?.ilibarary_Autor_by_pk;

  // 4. جلب كتب الكاتب في طلب منفصل، فقط بعد التأكد من وجود writerId
  const { loading: booksLoading, error: booksError, data: booksData } = useQuery(GET_BOOKS_BY_AUTHOR, {
    variables: { authorId: writerId },
    skip: !writerId,
  });

  const books = booksData?.ilibarary_Book || [];
  const loading = writerLoading || booksLoading;
  const error = writerError || booksError;

  // عرض حالة التحميل
  if (loading) {
    return (
      <div className="container mx-auto text-center py-20">
        <p className="text-xl">جاري تحميل ملف الكاتب...</p>
      </div>
    );
  }

  // عرض حالة الخطأ
  if (error) {
    console.error("ApolloError fetching writer details:", error);
    return (
      <div className="container mx-auto text-center py-20 text-red-500">
        <p className="text-xl">عفواً، حدث خطأ أثناء جلب بيانات الكاتب.</p>
        <p>الرسالة: {error.message}</p>
      </div>
    );
  }

  // في حالة عدم العثور على الكاتب
  if (!writer) {
    return (
      <div className="container mx-auto text-center py-20">
        <h1 className="text-3xl font-bold">الكاتب غير موجود</h1>
        <p className="mt-4">عفواً، لم نتمكن من العثور على الكاتب الذي تبحث عنه.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        
        {/* --- قسم رأس الصفحة: صورة ومعلومات الكاتب --- */}
        <header className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
          <div className="flex-shrink-0">
            <Image
              className="w-40 h-40 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
              src={writer.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(writer.name)}&background=8b5cf6&color=fff&size=160`}
              alt={writer.name}
              width={160}
              height={160}
            />
          </div>
          <div className="text-center md:text-right">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
              {writer.name}
            </h1>
            <div className="mt-4 pt-2 border-t border-gray-200 dark:border-gray-700 inline-block">
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    {writer.bio || "لا توجد نبذة تعريفية متاحة لهذا الكاتب."}
                </p>
            </div>
          </div>
        </header>

        {/* --- قسم أعمال الكاتب --- */}
        <section>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <FaBook className="text-purple-500" />
            <span className="text-gray-800 dark:text-gray-200">أعمال الكاتب ({writer.book_num || books.length})</span>
          </h2>
          
          {books && books.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {books.map((book) => (
                <BookCard key={book.id} book={book} authorName={writer.name} />
              ))}
            </div>
          ) : (
            <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow">
              <p className="text-gray-500 dark:text-gray-400">لا توجد كتب متاحة لهذا الكاتب حاليًا.</p>
            </div>
          )}
        </section>

      </div>
    </div>
  );
};

export default WriterProfilePage;