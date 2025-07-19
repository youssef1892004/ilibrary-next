// src/components/HistoryDropdownItem.jsx
"use client";
import React from 'react';
import Link from 'next/link';
import { useQuery, gql } from '@apollo/client';

const GET_BOOK_DETAILS = gql`
  query GetBookForDropdown($bookId: uuid!) {
    libaray_Book_by_pk(id: $bookId) {
      id
      title
      coverImage
    }
  }
`;

const HistoryDropdownItem = ({ bookId, chapterId, lastRead }) => {
  const { loading, error, data } = useQuery(GET_BOOK_DETAILS, {
    variables: { bookId },
  });

  const book = data?.libaray_Book_by_pk;

  if (loading) {
    return (
      <div className="p-3">
        <div className="flex items-center gap-4 animate-pulse">
          <div className="w-12 h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !book) return null;

  return (
    <Link href={`/read/${chapterId}`} className="block p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
      <div className="flex items-center gap-4">
        <img 
          src={book.coverImage || 'https://placehold.co/100x150'} 
          alt={book.title}
          className="w-12 h-16 object-cover rounded"
        />
        <div>
          <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">{book.title}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            آخر قراءة: {lastRead}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default HistoryDropdownItem;