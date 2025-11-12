// src/app/books/[id]/BookDetailsClient.jsx
"use client";

import React from 'react';
import BookDetails from '@/components/BookDetails';

// This component is now a client component that receives the book data as a prop.
// It's responsible for rendering the UI that might depend on client-side hooks (like useSearchParams in BookDetails).
const BookDetailsClient = ({ book }) => {
  if (!book) {
    return (
      <div className="container mx-auto text-center py-40">
        <h1 className="text-3xl font-bold">الكتاب غير موجود</h1>
      </div>
    );
  }

  return <BookDetails book={book} />;
};

export default BookDetailsClient;
