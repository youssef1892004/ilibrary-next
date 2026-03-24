"use client";

import React from 'react';
import { useQuery, gql } from '@apollo/client';
import BookCard from '@/components/BookCard';
import BookCardSkeleton from '@/components/BookCardSkeleton';
import { FaLayerGroup } from 'react-icons/fa';

const GET_RELATED_BOOKS = gql`
  query GetRelatedBooks($categoryId: uuid!, $currentBookId: uuid!) {
    libaray_Book(
      where: {
        book_category: { id: { _eq: $categoryId } },
        id: { _neq: $currentBookId }
      },
      limit: 4,
      order_by: { publicationDate: desc }
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

const RelatedBooks = ({ categoryId, currentBookId }) => {
  if (!categoryId) return null;

  const { data, loading, error } = useQuery(GET_RELATED_BOOKS, {
    variables: { categoryId, currentBookId },
    skip: !categoryId,
  });

  const books = data?.libaray_Book || [];

  if (!loading && books.length === 0) return null;

  return (
    <div className="mt-16 border-t border-gray-100 dark:border-gray-800 pt-12">
      <h2 className="text-2xl font-bold mb-8 flex items-center gap-2 text-gray-900 dark:text-white">
        <FaLayerGroup className="text-purple-600" />
        كتب ذات صلة
      </h2>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-[2/3]">
              <BookCardSkeleton />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book} sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" />
          ))}
        </div>
      )}
    </div>
  );
};

export default RelatedBooks;