// src/app/books/BooksPageClient.jsx
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useQuery, gql } from '@apollo/client';
import BookCard from '@/components/BookCard';
import { useLanguage } from '@/context/LanguageContext';
import { FaSearch } from 'react-icons/fa';

const BOOKS_PER_PAGE = 20;

// --- بداية التعديل: تطبيق استعلامك الديناميكي ---
const GET_BOOKS_WITH_RELATIONS = gql`
  query GetBooksWithRelations($limit: Int!, $offset: Int!, $where: libaray_Book_bool_exp!) {
    libaray_Book(
      limit: $limit,
      offset: $offset,
      order_by: { publicationDate: desc },
      where: $where
    ) {
      id
      title
      coverImage
      Book_Author {
        name
      }
      book_category {
        name
      }
    }
  }
`;
// --- نهاية التعديل ---

const GET_CATEGORIES = gql`
  query GetCategories {
    libaray_Category(order_by: {name: asc}) {
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
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { data: categoriesData } = useQuery(GET_CATEGORIES);
  const categories = categoriesData?.libaray_Category || [];

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // --- بداية التعديل: بناء جملة 'where' بشكل ديناميكي ---
  const whereClause = {
    _or: [
      { title: { _ilike: `%${debouncedSearchTerm}%` } },
      { Book_Author: { name: { _ilike: `%${debouncedSearchTerm}%` } } }
    ]
  };

  if (selectedCategory) {
    whereClause.book_category = { name: { _eq: selectedCategory } };
  }
  // --- نهاية التعديل ---

  const { loading, error, data, fetchMore } = useQuery(GET_BOOKS_WITH_RELATIONS, {
    variables: {
      limit: BOOKS_PER_PAGE,
      offset: 0,
      where: whereClause
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    setHasMore(true);
  }, [debouncedSearchTerm, selectedCategory]);

  const books = data?.libaray_Book || [];

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    fetchMore({
      variables: {
        offset: books.length
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult || fetchMoreResult.libaray_Book.length === 0) {
          setHasMore(false);
          return prev;
        }
        if (fetchMoreResult.libaray_Book.length < BOOKS_PER_PAGE) {
          setHasMore(false);
        }
        return {
          ...prev,
          libaray_Book: [...prev.libaray_Book, ...fetchMoreResult.libaray_Book],
        };
      },
    });
  }, [loading, hasMore, books.length, fetchMore]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 500 || loading) return;
      loadMore();
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, loadMore]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        {t.allBooks || "جميع الكتب"}
      </h1>
      <div className="mb-8 max-w-2xl mx-auto">
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

      <div className="flex justify-center flex-wrap gap-2 mb-12">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${selectedCategory === null ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'}`}
        >
          الكل
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.name)}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${selectedCategory === category.name ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'}`}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      {loading && books.length === 0 && <div className="text-center py-10"><p>جاري البحث...</p></div>}
      {error && <div className="text-center py-10 text-red-500"><p>حدث خطأ أثناء جلب البيانات: {error.message}</p></div>}
      
      {!error && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {books.map((book) => (
              <BookCard key={book.id} book={book} sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw" />
            ))}
          </div>
          
          {books.length === 0 && !loading && (
            <div className="text-center py-20">
              <p className="text-lg text-gray-500 dark:text-gray-400">
                لم يتم العثور على كتب تطابق بحثك أو التصنيف المختار.
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