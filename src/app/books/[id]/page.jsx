// src/app/books/[id]/page.jsx
"use client";

import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'next/navigation';
import BookDetails from '@/components/BookDetails';
import Image from 'next/image';

// The final and 100% correct query
const GET_BOOK_DETAILS = gql`
  query GetBookDetails($id: uuid!) {
    libaray_Book_by_pk(id: $id) {
      id
      title
      description
      coverImage
      publicationDate
      total_pages
      ISBN
      # Fetch author via relationship
      Book_Author {
        id
        name
      }
      # Fetch category via relationship
      book_category {
        id
        name
      }
      # Fetch chapters via relationship
      Bookchapters(order_by: { chapter_num: asc }) {
        id
        title
        chapter_num
      }
    }
  }
`;

const BookDetailsPage = () => {
  const params = useParams();
  const bookId = params.id;

  const { loading, error, data } = useQuery(GET_BOOK_DETAILS, {
    variables: { id: bookId },
    skip: !bookId,
  });

  const book = data?.libaray_Book_by_pk;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl animate-pulse">جاري تحميل تفاصيل الكتاب...</p>
      </div>
    );
  }

  if (error) {
    console.error("ApolloError in BookDetailsPage:", error);
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        <p className="text-xl font-bold">حدث خطأ أثناء جلب البيانات.</p>
        <p className="text-sm mt-2">يرجى التأكد من ضبط الصلاحيات بشكل صحيح في Hasura.</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mx-auto text-center py-40">
        <h1 className="text-3xl font-bold">الكتاب غير موجود</h1>
      </div>
    );
  }

  return (
    <BookDetails book={book} />
  );
};

export default BookDetailsPage;