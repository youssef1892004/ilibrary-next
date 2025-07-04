// src/app/books/BooksPageClient.jsx
"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import BookCard from '@/components/BookCard';
import { booksData } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';
import { FaSearch } from 'react-icons/fa';

// استخلاص كل الكتب والفئات مرة واحدة خارج المكون
const allBooks = booksData.map(book => ({
  ...book, // يتضمن كل خصائص الكتاب الأصلية
  category: book.category || 'عام',
}));

const categories = ['الكل', ...new Set(allBooks.map(book => book.category))];

function BooksPageContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [filteredBooks, setFilteredBooks] = useState(allBooks);
  const [visibleBooks, setVisibleBooks] = useState(15); // عدد الكتب الظاهرة مبدئيًا

  useEffect(() => {
    let filtered = allBooks;

    if (selectedCategory !== 'الكل') {
      filtered = filtered.filter(book => book.category === selectedCategory);
    }

    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(book => 
        book.title.toLowerCase().includes(lowercasedTerm) ||
        book.author.toLowerCase().includes(lowercasedTerm)
      );
    }

    setFilteredBooks(filtered);
    setVisibleBooks(15); // إعادة تعيين عدد الكتب الظاهرة عند كل فلترة
  }, [selectedCategory, searchTerm]);

  const loadMoreBooks = () => {
    setVisibleBooks(prev => prev + 15);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Bar */}
      <div className="mb-10 max-w-2xl mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder={t.searchBooksPlaceholder || "ابحث عن كتاب أو مؤلف..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Category Filters */}
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              selectedCategory === category
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Books Grid */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {selectedCategory === 'الكل' ? (t.allBooks || "جميع الكتب") : selectedCategory}
          </h2>
          <span className="text-gray-600 dark:text-gray-400">
            {filteredBooks.length} {t.book || "كتاب"}
          </span>
        </div>

        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {filteredBooks.slice(0, visibleBooks).map((book) => (
              <BookCard key={book.id} book={book} /> // تمرير كائن book بالكامل
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {t.noBooksFound || "لم يتم العثور على كتب تطابق بحثك"}
            </p>
          </div>
        )}

        {visibleBooks < filteredBooks.length && (
          <div className="text-center mt-12">
            <button
              onClick={loadMoreBooks}
              className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              {t.loadMore || "تحميل المزيد"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// استخدام Suspense للتعامل مع useSearchParams
export default function BooksPageClient() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BooksPageContent />
    </Suspense>
  );
}