// src/app/books/BooksPageClient.jsx
"use client";

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useQuery, gql } from '@apollo/client';
import BookCard from '@/components/BookCard';
import { useLanguage } from '@/context/LanguageContext';
import { FaSearch } from 'react-icons/fa';

const BOOKS_PER_PAGE = 20;

// 1. تعديل الاستعلام لإزالة aggregate التي قد تسبب مشكلة في الصلاحيات
const GET_BOOKS_WITH_SEARCH = gql`
  query GetBooksWithSearch($limit: Int!, $offset: Int!, $search: String!) {
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
    ilibarary_Autor {
      id
      name
    }
  }
`;

const BooksPageClient = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [hasMore, setHasMore] = useState(true);

  // Debouncing لتأخير البحث
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const { loading, error, data, fetchMore } = useQuery(GET_BOOKS_WITH_SEARCH, {
    variables: {
      limit: BOOKS_PER_PAGE,
      offset: 0,
      search: `%${debouncedSearchTerm}%`
    },
    onCompleted: (data) => {
      // إذا كانت الدفعة الأولى من الكتب أقل من الحد الأقصى، فهذا يعني أنه لا يوجد المزيد
      if (data.ilibarary_Book.length < BOOKS_PER_PAGE) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    },
    // إعادة تعيين الحالة عند تغيير البحث
    notifyOnNetworkStatusChange: true,
  });

  // إعادة تعيين hasMore عند بدء بحث جديد
  useEffect(() => {
    setHasMore(true);
  }, [debouncedSearchTerm]);

  const authorsMap = useMemo(() => {
    if (!data?.ilibarary_Autor) return new Map();
    const map = new Map();
    data.ilibarary_Autor.forEach(author => map.set(author.id, author.name));
    return map;
  }, [data?.ilibarary_Autor]);

  const books = data?.ilibarary_Book || [];

  const loadMore = useCallback(() => {
    // لا تقم بالجلب إذا كان هناك طلب قيد التنفيذ أو لا يوجد المزيد من البيانات
    if (loading || !hasMore) return;

    fetchMore({
      variables: {
        offset: books.length
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult || fetchMoreResult.ilibarary_Book.length === 0) {
          setHasMore(false); // لا يوجد المزيد من الكتب
          return prev;
        }
        
        // إذا كانت النتائج الجديدة أقل من المطلوب، فهذه هي النهاية
        if (fetchMoreResult.ilibarary_Book.length < BOOKS_PER_PAGE) {
            setHasMore(false);
        }

        return {
          ...prev,
          ilibarary_Book: [...prev.ilibarary_Book, ...fetchMoreResult.ilibarary_Book],
        };
      },
    });
  }, [loading, hasMore, books.length, fetchMore]);

  // مراقبة التمرير
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 500 || loading || !hasMore) {
        return;
      }
      loadMore();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore, loadMore]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        {t.allBooks || "جميع الكتب"}
      </h1>

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

      {loading && books.length === 0 && <div className="text-center py-10"><p>جاري البحث...</p></div>}
      {error && <div className="text-center py-10 text-red-500"><p>حدث خطأ في جلب البيانات. يرجى المحاولة مرة أخرى.</p></div>}
      
      {!error && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {books.map((book) => {
              const authorName = authorsMap.get(book.author_id);
              return <BookCard key={`${book.id}-${book.title}`} book={book} authorName={authorName} />;
            })}
          </div>
          
          {books.length === 0 && !loading && (
            <div className="text-center py-20">
              <p className="text-lg text-gray-500 dark:text-gray-400">
                لم يتم العثور على نتائج تطابق بحثك.
              </p>
            </div>
          )}
          
          <div className="text-center py-10">
            {loading && books.length > 0 && <p className="animate-pulse">جاري تحميل المزيد...</p>}
            {!hasMore && books.length > 0 && <p>لقد وصلت إلى نهاية القائمة.</p>}
          </div>
        </>
      )}
    </div>
  );
};

export default BooksPageClient;