// src/app/books/BooksPageClient.jsx
"use client";

import React, { useState, useMemo } from 'react';
import { useQuery, gql } from '@apollo/client';
import BookCard from '@/components/BookCard';
import Pagination from '@/components/Pagination';
import { useLanguage } from '@/context/LanguageContext';

const BOOKS_PER_PAGE = 20; // عدد الكتب في كل صفحة

// 1. استعلام GraphQL لجلب الكتب مع نظام الصفحات
// يقبل متغيرات limit (للعدد) و offset (لبداية الجلب)
const GET_PAGINATED_BOOKS = gql`
  query GetPaginatedBooks($limit: Int!, $offset: Int!) {
    # جلب قائمة الكتب المقسمة
    ilibarary_Book(limit: $limit, offset: $offset, order_by: { publication_date: desc }) {
      id
      title
      cover_URL
      author_id
    }
    # جلب كل المؤلفين لربطهم بالكتب
    ilibarary_Autor {
      id
      name
    }
    # جلب العدد الإجمالي للكتب لحساب عدد الصفحات
    ilibarary_Book_aggregate {
      aggregate {
        count
      }
    }
  }
`;

const BooksPageClient = () => {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);

  // 2. حساب الـ offset بناءً على الصفحة الحالية
  const offset = (currentPage - 1) * BOOKS_PER_PAGE;

  // 3. تنفيذ الاستعلام مع تمرير المتغيرات
  const { loading, error, data } = useQuery(GET_PAGINATED_BOOKS, {
    variables: { limit: BOOKS_PER_PAGE, offset: offset },
  });

  // 4. إنشاء خريطة للمؤلفين لسهولة الوصول إليهم
  const authorsMap = useMemo(() => {
    if (!data?.ilibarary_Autor) return new Map();
    const map = new Map();
    data.ilibarary_Autor.forEach(author => map.set(author.id, author.name));
    return map;
  }, [data?.ilibarary_Autor]);

  // 5. حساب العدد الإجمالي للصفحات
  const totalBooks = data?.ilibarary_Book_aggregate?.aggregate?.count || 0;
  const totalPages = Math.ceil(totalBooks / BOOKS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // عرض حالة التحميل
  if (loading && !data) {
    return <div className="text-center py-20"><p>جاري تحميل الكتب...</p></div>;
  }

  // عرض حالة الخطأ
  if (error) {
    return <div className="text-center py-20 text-red-500"><p>حدث خطأ في جلب البيانات.</p></div>;
  }

  const books = data?.ilibarary_Book || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
        {t.allBooks || "جميع الكتب"}
      </h1>

      {/* 6. عرض شبكة الكتب */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {books.map((book) => {
          const authorName = authorsMap.get(book.author_id);
          return <BookCard key={book.id} book={book} authorName={authorName} />;
        })}
      </div>
      
      {books.length === 0 && !loading && (
        <div className="text-center py-20">
          <p className="text-lg">لا توجد كتب لعرضها حالياً.</p>
        </div>
      )}

      {/* 7. عرض مكون نظام الصفحات */}
      <div className="mt-12 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default BooksPageClient;
