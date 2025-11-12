// src/components/FavoriteBookCard.jsx
"use client";
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import BookCard from './BookCard'; // سنقوم بإعادة استخدام تصميم الكارت الأساسي

// استعلام لجلب تفاصيل الكتاب الأساسية
const GET_BOOK_DETAILS_FOR_FAVORITE = gql`
  query GetBookDetailsForFavorite($bookId: uuid!) {
    libaray_Book_by_pk(id: $bookId) {
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

const FavoriteBookCard = ({ bookId, sizes }) => {
  const { loading, error, data } = useQuery(GET_BOOK_DETAILS_FOR_FAVORITE, {
    variables: { bookId },
  });

  const book = data?.libaray_Book_by_pk;

  // في حالة التحميل، اعرض شكلاً مؤقتًا
  if (loading) return <div className="bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse h-[450px]"></div>;
  
  // لا تقم بعرض أي شيء إذا حدث خطأ أو لم يتم العثور على الكتاب
  if (error || !book) return null; 

  // قم بإعادة استخدام مكون BookCard الأصلي مع تمرير بيانات الكتاب الكاملة له
  return <BookCard book={book} sizes={sizes} />;
};

export default FavoriteBookCard;