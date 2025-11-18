// src/app/books/[id]/page.jsx
import React from 'react';
import { notFound } from 'next/navigation';
import { ApolloClient, InMemoryCache, createHttpLink, gql } from '@apollo/client';
import BookDetailsClient from './BookDetailsClient';

// We create a new Apollo Client instance for server-side rendering.
// This should not use `localStorage` or other browser-only APIs.
const createApolloClient = () => {
  const httpLink = createHttpLink({
    uri: 'https://graphql-333f98f9a304.hosted.ghaymah.systems/v1/graphql',
    headers: {
      // Use the admin secret for server-side data fetching to ensure access
      'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
    },
  });

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

const GET_BOOK_DETAILS_FOR_SEO = gql`
  query GetBookDetailsForSEO($id: uuid!) {
    libaray_Book_by_pk(id: $id) {
      id
      title
      description
      Book_Author {
        name
      }
    }
  }
`;

// The full query for the page
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
      Book_Author {
        id
        name
      }
      book_category {
        id
        name
      }
      Bookchapters(order_by: { chapter_num: asc }) {
        id
        title
        chapter_num
      }
    }
  }
`;

// generateMetadata function to set dynamic metadata
export async function generateMetadata({ params }) {
  const client = createApolloClient();
  const awaitedParams = await params;
  const bookId = awaitedParams.id;

  try {
    const { data } = await client.query({
      query: GET_BOOK_DETAILS_FOR_SEO,
      variables: { id: bookId },
    });

    const book = data?.libaray_Book_by_pk;

    if (!book) {
      return {
        title: 'الكتاب غير موجود | iLibrary',
        description: 'لم نتمكن من العثور على الكتاب الذي تبحث عنه.',
      };
    }

    const authorName = book.Book_Author?.[0]?.name || 'مؤلف غير معروف';
    return {
      title: `قراءة كتاب ${book.title} - ${authorName} | iLibrary`,
      description: book.description?.substring(0, 160) || `استكشف تفاصيل ومعلومات عن كتاب ${book.title}.`,
    };
  } catch (error) {
    console.error('Error generating metadata for book:', error);
    return {
      title: 'خطأ | iLibrary',
      description: 'حدث خطأ أثناء تحميل بيانات الكتاب.',
    };
  }
}

// The main page component, now a Server Component
const BookDetailsPage = async ({ params }) => {
  const client = createApolloClient();
  const awaitedParams = await params;
  const bookId = awaitedParams.id;

  let book = null;

  try {
    const { data } = await client.query({
      query: GET_BOOK_DETAILS,
      variables: { id: bookId },
    });
    book = data?.libaray_Book_by_pk;
  } catch (e) {
    console.error("Error fetching book details on server:", e);
    // By not re-throwing or passing the error, we ensure nothing non-serializable is sent to the client.
    // The component will proceed with `book` as null.
  }

  if (!book) {
    notFound();
  }

  return <BookDetailsClient book={book} />;
};

export default BookDetailsPage;
