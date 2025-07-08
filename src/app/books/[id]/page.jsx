// src/app/books/[id]/page.jsx
"use client";

import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'next/navigation';
import BookDetails from '@/components/BookDetails';
import RelatedBooks from '@/components/RelatedBooks';

// الاستعلام الأول: يجلب تفاصيل الكتاب فقط (بدون الكاتب)
const GET_BOOK = gql`
  query GetBook($id: uuid!) {
    ilibarary_Book_by_pk(id: $id) {
      id
      title
      description
      cover_URL
      publication_date
      parts_num
      total_pages
      ISBN
      author_id # نحتاج هذا لجلب الكاتب
      Chapters(order_by: { chapter_num: asc }, limit: 200) {
        id
        title
        chapter_num
      }
    }
  }
`;

// الاستعلام الثاني: يجلب تفاصيل الكاتب فقط
const GET_AUTHOR = gql`
  query GetAuthor($id: uuid!) {
    ilibarary_Autor_by_pk(id: $id) {
      id
      name
      image_url
    }
  }
`;

const BookDetailsPage = () => {
  const params = useParams();
  const bookId = params.id;

  // تنفيذ الاستعلام الأول لجلب الكتاب
  const { loading: bookLoading, error: bookError, data: bookData } = useQuery(GET_BOOK, {
    variables: { id: bookId },
    skip: !bookId,
  });

  const book = bookData?.ilibarary_Book_by_pk;
  const authorId = book?.author_id;

  // تنفيذ الاستعلام الثاني لجلب الكاتب (فقط بعد الحصول على author_id)
  const { loading: authorLoading, error: authorError, data: authorData } = useQuery(GET_AUTHOR, {
    variables: { id: authorId },
    skip: !authorId, // لا تقم بالطلب إذا لم يكن هناك author_id
  });

  const author = authorData?.ilibarary_Autor_by_pk;

  // دمج حالات التحميل والخطأ
  if (bookLoading || (authorId && authorLoading)) {
    return (
      <div className="container mx-auto text-center py-20">
        <p className="text-xl">جاري تحميل تفاصيل الكتاب...</p>
      </div>
    );
  }

  if (bookError || authorError) {
    console.error("ApolloError:", bookError || authorError);
    return (
      <div className="container mx-auto text-center py-20 text-red-500">
        <p>حدث خطأ أثناء جلب البيانات.</p>
      </div>
    );
  }

  if (!book && !bookLoading) {
    return (
      <div className="container mx-auto text-center py-20">
        <h1 className="text-3xl font-bold">الكتاب غير موجود</h1>
      </div>
    );
  }

  return (
    <>
      {/* تمرير بيانات الكتاب والكاتب بشكل منفصل */}
      {book && <BookDetails book={book} author={author} />}
      {book && <RelatedBooks currentBookId={book.id} />}
    </>
  );
};

export default BookDetailsPage;
