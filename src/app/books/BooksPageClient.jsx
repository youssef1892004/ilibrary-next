// src/app/books/BooksPageClient.jsx
"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useQuery, gql } from '@apollo/client';
import BookCard from '@/components/BookCard';
import BookListItem from '@/components/BookListItem';
import BookCardSkeleton from '@/components/BookCardSkeleton';
import BooksEmptyState from '@/components/BooksEmptyState';
import MobileFilterDrawer from '@/components/MobileFilterDrawer';
import { useLanguage } from '@/context/LanguageContext';
import { FaSearch, FaFilter, FaSortAmountDown, FaLayerGroup, FaThLarge, FaList, FaTimes } from 'react-icons/fa';

const BOOKS_PER_PAGE = 20;

const GET_BOOKS_WITH_RELATIONS = gql`
  query GetBooksWithRelations($limit: Int!, $offset: Int!, $where: libaray_Book_bool_exp!, $order_by: [libaray_Book_order_by!]) {
    libaray_Book(
      limit: $limit,
      offset: $offset,
      order_by: $order_by,
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
      publicationDate
    }
  }
`;

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
  const [sortBy, setSortBy] = useState('newest'); // newest, oldest, alphabetical
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data: categoriesData } = useQuery(GET_CATEGORIES);
  const categories = categoriesData?.libaray_Category || [];

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const whereClause = useMemo(() => {
    const clause = {
      _or: [
        { title: { _ilike: `%${debouncedSearchTerm}%` } },
        { Book_Author: { name: { _ilike: `%${debouncedSearchTerm}%` } } }
      ]
    };
    if (selectedCategory) {
      clause.book_category = { name: { _eq: selectedCategory } };
    }
    return clause;
  }, [debouncedSearchTerm, selectedCategory]);

  const orderBy = useMemo(() => {
    switch (sortBy) {
      case 'oldest': return { publicationDate: 'asc' };
      case 'alphabetical': return { title: 'asc' };
      case 'newest':
      default: return { publicationDate: 'desc' };
    }
  }, [sortBy]);

  const { loading, error, data, fetchMore } = useQuery(GET_BOOKS_WITH_RELATIONS, {
    variables: {
      limit: BOOKS_PER_PAGE,
      offset: 0,
      where: whereClause,
      order_by: orderBy
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    setHasMore(true);
  }, [debouncedSearchTerm, selectedCategory, sortBy]);

  const booksRaw = data?.libaray_Book || [];

  // Deduplicate books
  const books = useMemo(() => {
    const uniqueIds = new Set();
    return booksRaw.filter(book => {
      if (!book.id) return false;
      if (uniqueIds.has(book.id)) return false;
      uniqueIds.add(book.id);
      return true;
    });
  }, [booksRaw]);

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

  const handleReset = () => {
    setSearchTerm("");
    setSelectedCategory(null);
    setSortBy('newest');
  };

  // Skeletons
  const renderSkeletons = () => {
    return Array(10).fill(0).map((_, i) => (
      <div key={i} className={viewMode === 'list' ? 'h-48' : 'aspect-[2/3]'}>
        <BookCardSkeleton />
      </div>
    ));
  };

  const FilterContent = () => (
    <div className="flex flex-col gap-1">
      <button
        onClick={() => { setSelectedCategory(null); setIsFilterOpen(false); }}
        className={`text-right px-3 py-2 rounded-lg text-sm transition-all ${selectedCategory === null
          ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 font-bold border-r-4 border-purple-500'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
          }`}
      >
        الكل
      </button>
      {categories.map(cat => (
        <button
          key={cat.id}
          onClick={() => { setSelectedCategory(cat.name); setIsFilterOpen(false); }}
          className={`text-right px-3 py-2 rounded-lg text-sm transition-all ${selectedCategory === cat.name
            ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 font-bold border-r-4 border-purple-500'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
            }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)}>
        <FilterContent />
      </MobileFilterDrawer>

      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="w-full md:w-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <FaLayerGroup className="text-purple-600" />
              {t.allBooks || "مكتبة الكتب"}
            </h1>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-1">تصفح مجموعتنا المميزة من الكتب</p>
          </div>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className="lg:hidden p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm text-gray-700 dark:text-gray-200"
            aria-label="Open Filters"
          >
            <FaFilter />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-stretch sm:items-center">
          {/* Controls Container */}
          <div className="flex gap-2 w-full sm:w-auto order-2 sm:order-1">
            {/* View Toggle */}
            <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-lg shrink-0">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-gray-600 shadow-sm text-purple-600' : 'text-gray-500 dark:text-gray-400'}`}
                aria-label="Grid View"
              >
                <FaThLarge />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white dark:bg-gray-600 shadow-sm text-purple-600' : 'text-gray-500 dark:text-gray-400'}`}
                aria-label="List View"
              >
                <FaList />
              </button>
            </div>

            {/* Sort Select */}
            <div className="relative min-w-[140px] flex-grow">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-4 pr-8 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-800 dark:text-white appearance-none cursor-pointer h-full"
              >
                <option value="newest">الأحدث</option>
                <option value="oldest">الأقدم</option>
                <option value="alphabetical">أبجدياً</option>
              </select>
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaSortAmountDown className="text-gray-400" />
              </span>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative flex-grow sm:flex-grow-0 sm:w-64 order-1 sm:order-2">
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <FaSearch className="text-gray-400" />
            </span>
            <input
              type="text"
              placeholder="ابحث عن كتاب..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Active Filters Bar */}
      {(searchTerm || selectedCategory) && (
        <div className="flex flex-wrap gap-2 mb-6 animate-fadeIn">
          <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center h-8">نتائج البحث عن:</span>

          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium hover:bg-purple-200 dark:hover:bg-purple-800/50 transition-colors"
            >
              "{searchTerm}"
              <FaTimes size={12} />
            </button>
          )}

          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors"
            >
              القسم: {selectedCategory}
              <FaTimes size={12} />
            </button>
          )}

          <button
            onClick={handleReset}
            className="text-sm text-gray-500 hover:text-red-500 underline ml-2"
          >
            مسح الكل
          </button>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 sticky top-24 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FaFilter className="text-purple-500" />
                التصنيفات
              </h3>
            </div>
            <div className="max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar">
              <FilterContent />
            </div>
          </div>
        </aside>

        {/* Main Grid */}
        <main className="flex-grow">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-4 rounded-lg text-center mb-6">
              حدث خطأ أثناء تحميل الكتب. يرجى المحاولة مرة أخرى.
            </div>
          )}

          {!loading && !error && books.length === 0 ? (
            <BooksEmptyState onReset={handleReset} />
          ) : (
            <div className={
              viewMode === 'grid'
                ? "grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6" // Smaller gap on mobile
                : "flex flex-col gap-4"
            }>
              {books.map((book) => (
                viewMode === 'grid' ? (
                  <BookCard key={book.id} book={book} sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" />
                ) : (
                  <BookListItem key={book.id} book={book} />
                )
              ))}

              {/* Loading Skeletons */}
              {loading && renderSkeletons()}
            </div>
          )}

          {!hasMore && books.length > 0 && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800 mt-12">
              <p>✨ لقد وصلت إلى نهاية القائمة</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default BooksPageClient;