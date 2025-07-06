// src/app/books/[id]/page.jsx
"use client";

import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'next/navigation';
import BookDetails from '@/components/BookDetails';
import RelatedBooks from '@/components/RelatedBooks';

// 1. استخدام اسم العلاقة الصحيح والمؤكد: Book_Author
const GET_BOOK_DETAILS = gql`
  query GetBookDetails($id: uuid!) {
    ilibarary_Book_by_pk(id: $id) {
      id
      title
      description
      cover_URL
      publication_date
      parts_num
      total_pages
      ISBN
      # اسم العلاقة الصحيح للكاتب
      Book_Author {
        id
        name
        image_url
      }
      # اسم العلاقة الصحيح للفصول
      Chapters(order_by: { chapter_num: asc }) {
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

  if (loading) {
    return (
      <div className="container mx-auto text-center py-20">
        <p className="text-xl">جاري تحميل تفاصيل الكتاب...</p>
      </div>
    );
  }

  if (error) {
    console.error("ApolloError fetching book details:", error);
    return (
      <div className="container mx-auto text-center py-20 text-red-500">
        <p className="text-xl">عفواً، حدث خطأ أثناء جلب تفاصيل الكتاب.</p>
        <p>الرسالة: {error.message}</p>
      </div>
    );
  }

  const book = data?.ilibarary_Book_by_pk;

  if (!book && !loading) {
    return (
        <div className="container mx-auto text-center py-20">
            <h1 className="text-3xl font-bold">الكتاب غير موجود</h1>
            <p className="mt-4">عفواً، لم نتمكن من العثور على الكتاب الذي تبحث عنه.</p>
        </div>
    );
  }

  return (
    <>
      {book && <BookDetails book={book} />}
      {book && <RelatedBooks currentBookId={book.id} />}
    </>
  );
};

export default BookDetailsPage;
