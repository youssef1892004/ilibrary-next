'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useQuery, gql } from '@apollo/client';
import { FaSearch, FaFilter, FaBookOpen } from 'react-icons/fa';
import BookCard from '@/components/BookCard';
import LoadingSpinner from '@/components/LoadingSpinner';

const GET_CATEGORIES = gql`
  query GetCategories {
    libaray_Category(order_by: {name: asc}) {
      id
      name
    }
  }
`;

const SEARCH_BOOKS = gql`
  query SearchBooks($limit: Int!, $offset: Int!, $where: libaray_Book_bool_exp!) {
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

function SearchContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const initialQuery = searchParams.get('q') || '';
    const initialCategory = searchParams.get('category') || '';

    const [searchTerm, setSearchTerm] = useState(initialQuery);
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);

    // Update URL when search state changes (debounced)
    useEffect(() => {
        const timer = setTimeout(() => {
            const params = new URLSearchParams();
            if (searchTerm) params.set('q', searchTerm);
            if (selectedCategory) params.set('category', selectedCategory);

            router.push(`/search?${params.toString()}`, { scroll: false });
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm, selectedCategory, router]);

    const { data: categoriesData } = useQuery(GET_CATEGORIES);
    const categories = categoriesData?.libaray_Category || [];

    const whereClause = {
        _and: [
            selectedCategory ? { book_category: { name: { _eq: selectedCategory } } } : {},
            {
                _or: [
                    { title: { _ilike: `%${searchTerm}%` } },
                    { Book_Author: { name: { _ilike: `%${searchTerm}%` } } }
                ]
            }
        ]
    };

    const { data, loading, error } = useQuery(SEARCH_BOOKS, {
        variables: {
            limit: 20,
            offset: 0,
            where: whereClause
        },
        // Don't run query if empty unless category selected
        skip: !searchTerm && !selectedCategory,
    });

    const books = data?.libaray_Book || [];

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    البحث المتقدم
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    ابحث في مكتبتنا الضخمة عن كل ما ترغب في قراءته
                </p>
            </header>

            {/* Search Controls */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg mb-12 max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-grow">
                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400">
                            <FaSearch />
                        </span>
                        <input
                            type="text"
                            placeholder="عن ماذا تبحث؟ (اسم الكتاب، اسم الكاتب...)"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pr-10 pl-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 dark:text-white transition-all"
                        />
                    </div>

                    <div className="relative min-w-[200px]">
                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400">
                            <FaFilter />
                        </span>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full pr-10 pl-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 dark:text-white appearance-none cursor-pointer transition-all"
                        >
                            <option value="">جميع التصنيفات</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.name}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Results */}
            <div>
                {loading && <LoadingSpinner />}

                {error && (
                    <div className="text-center py-10 text-red-500 bg-red-50 dark:bg-red-900/10 rounded-xl">
                        <p>حدث خطأ أثناء البحث. يرجى المحاولة مرة أخرى.</p>
                    </div>
                )}

                {!loading && !error && books.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {books.map((book) => (
                            <BookCard key={book.id} book={book} sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw" />
                        ))}
                    </div>
                )}

                {!loading && !error && books.length === 0 && (searchTerm || selectedCategory) && (
                    <div className="text-center py-20">
                        <div className="inline-block p-6 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                            <FaBookOpen className="text-4xl text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            لم يتم العثور على نتائج
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400">
                            جرب البحث بكلمات مختلفة أو تغيير التصنيف.
                        </p>
                    </div>
                )}

                {!loading && !error && !searchTerm && !selectedCategory && (
                    <div className="text-center py-20 opacity-50">
                        <p className="text-lg">ابدأ الكتابة للبحث...</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <SearchContent />
        </Suspense>
    );
}
