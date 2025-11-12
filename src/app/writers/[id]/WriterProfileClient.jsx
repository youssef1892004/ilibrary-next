// src/app/writers/[id]/WriterProfileClient.jsx
"use client";

import React from 'react';
import Image from 'next/image';
import BookCard from '@/components/BookCard';
import { FaBook } from 'react-icons/fa';

// This is the client component responsible for rendering the writer's profile UI.
// It receives writer and books data as props from the parent server component.
const WriterProfileClient = ({ writer, books }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-12">
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

        <section>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <FaBook className="text-purple-500" />
            <span className="text-gray-800 dark:text-gray-200">أعمال الكاتب ({writer.book_num || books.length})</span>
          </h2>
          
          {books.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {books.map((book) => (
                <BookCard 
                  key={book.id} 
                  book={book} 
                  authorName={writer.name} 
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                />
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

export default WriterProfileClient;
