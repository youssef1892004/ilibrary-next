// src/components/HistoryBookCard.jsx
"use client";
import React from 'react';
import Link from 'next/link';
import { useQuery, gql } from '@apollo/client';
import { FaBookmark } from 'react-icons/fa';

const GET_BOOK_DETAILS_FOR_HISTORY = gql`
  query GetBookDetailsForHistory($bookId: uuid!) {
    libaray_Book_by_pk(id: $bookId) {
      id
      title
      coverImage
    }
  }
`;

const HistoryBookCard = ({ bookId, lastRead, chapterId }) => {
  const { loading, error, data } = useQuery(GET_BOOK_DETAILS_FOR_HISTORY, {
    variables: { bookId },
  });

  const book = data?.libaray_Book_by_pk;

  if (loading) return <div className="bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse h-[320px]"></div>;
  if (error || !book) return null; 

  // --- بداية التعديل: استخدام chapterId في الرابط ---
  return (
    <Link href={`/read/${chapterId}`} className="block group">
    {/* --- نهاية التعديل --- */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 group-hover:-translate-y-2">
        <img
          src={book.coverImage || 'https://placehold.co/250x375/e2e8f0/4a5568?text=No+Image'}
          alt={book.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white truncate group-hover:text-purple-600">
            {book.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-2">
            <FaBookmark className="text-purple-500" />
            <span>آخر قراءة: {lastRead}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default HistoryBookCard;