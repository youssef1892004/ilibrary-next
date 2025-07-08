// src/app/books/BooksPageClient.jsx
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import BookCard from '@/components/BookCard';
import Pagination from '@/components/Pagination';
import { useLanguage } from '@/context/LanguageContext';
import { FaSearch } from 'react-icons/fa';

const BOOKS_PER_PAGE = 20;

// 1. تحديث استعلام GraphQL ليقبل متغيرات البحث
// نستخدم _ilike للبحث غير الحساس لحالة الأحرف
const GET_PAGINATED_BOOKS_WITH_SEARCH = gql`
  query GetPaginatedBooksWithSearch($limit: Int!, $offset: Int!, $search: String!) {
    # جلب الكتب التي تطابق شرط البحث
    ilibarary_Book(
      limit: $limit, 
      offset: $offset, 
      order_by: { publication_date: desc },
      where: {
        _or: [
          { title: { _ilike: $search } },
          { Book_Author: { name: { _ilike: $search } } }
        ]
      }
    ) {
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
    # جلب العدد الإجمالي للكتب المطابقة للبحث لحساب عدد الصفحات
 
    
    }
  
`;

const BooksPageClient = () => {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // 2. استخدام Debouncing لتأخير تنفيذ البحث أثناء الكتابة
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // تأخير نصف ثانية

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // 3. إعادة تعيين الصفحة إلى 1 عند تغيير مصطلح البحث
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm]);

  const offset = (currentPage - 1) * BOOKS_PER_PAGE;

  // 4. تنفيذ الاستعلام مع تمرير متغير البحث
  const { loading, error, data } = useQuery(GET_PAGINATED_BOOKS_WITH_SEARCH, {
    variables: { 
      limit: BOOKS_PER_PAGE, 
      offset: offset,
      search: `%${debouncedSearchTerm}%` // إضافة % للبحث الجزئي
    },
  });

  const authorsMap = useMemo(() => {
    if (!data?.ilibarary_Autor) return new Map();
    const map = new Map();
    data.ilibarary_Autor.forEach(author => map.set(author.id, author.name));
    return map;
  }, [data?.ilibarary_Autor]);

  const totalBooks = data?.ilibarary_Book_aggregate?.aggregate?.count || 0;
  const totalPages = Math.ceil(totalBooks / BOOKS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const books = data?.ilibarary_Book || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        {t.allBooks || "جميع الكتب"}
      </h1>

      {/* 5. إضافة شريط البحث */}
      <div className="mb-12 max-w-2xl mx-auto">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <FaSearch className="text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="ابحث عن كتاب أو كاتب..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>

      {loading && <div className="text-center py-10"><p>جاري البحث...</p></div>}
      {error && <div className="text-center py-10 text-red-500"><p>حدث خطأ في جلب البيانات.</p></div>}
      
      {!loading && !error && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {books.map((book) => {
              const authorName = authorsMap.get(book.author_id);
              return <BookCard key={book.id} book={book} authorName={authorName} />;
            })}
          </div>
          
          {books.length === 0 && (
            <div className="text-center py-20">
              <p className="text-lg text-gray-500 dark:text-gray-400">
                لم يتم العثور على نتائج تطابق بحثك.
              </p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BooksPageClient;
