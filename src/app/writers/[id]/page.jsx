// src/app/writers/[id]/page.jsx
import React from 'react';
import { notFound } from 'next/navigation';
import { ApolloClient, InMemoryCache, createHttpLink, gql } from '@apollo/client';
import WriterProfileClient from './WriterProfileClient';

// Server-side Apollo Client
const createApolloClient = () => {
  const httpLink = createHttpLink({
    uri: 'https://graphql-333f98f9a304.hosted.ghaymah.systems/v1/graphql',
    headers: {
      'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
    },
  });

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

// Combined query to fetch writer and their books using relationships
const GET_WRITER_DATA = gql`
  query GetWriterDetailsAndBooks($id: uuid!) {
    libaray_Autor_by_pk(id: $id) {
      id
      name
      image_url
      bio
      book_num
      # Corrected relationship name from 'Books' to 'Book_Author'
      Book_Author(order_by: {publicationDate: desc}) {
        id
        title
        coverImage
        book_category {
          name
        }
      }
    }
  }
`;

// generateMetadata for writer page SEO
export async function generateMetadata({ params }) {
  const client = createApolloClient();
  const awaitedParams = await params;
  const writerId = awaitedParams.id;

  try {
    const { data } = await client.query({
      query: GET_WRITER_DATA,
      variables: { id: writerId },
    });

    const writer = data?.libaray_Autor_by_pk;

    if (!writer) {
      return {
        title: 'الكاتب غير موجود | Muejam Library',
        description: 'لم نتمكن من العثور على الكاتب الذي تبحث عنه.',
      };
    }

    return {
      title: `صفحة الكاتب ${writer.name} | Muejam Library`,
      description: writer.bio?.substring(0, 160) || `اكتشف أعمال ومؤلفات الكاتب ${writer.name} على Muejam Library.`,
    };
  } catch (error) {
    console.error('Error generating metadata for writer:', error);
    return {
      title: 'خطأ | Muejam Library',
      description: 'حدث خطأ أثناء تحميل بيانات الكاتب.',
    };
  }
}

// The main page component, now a Server Component
const WriterProfilePage = async ({ params }) => {
  const client = createApolloClient();
  const awaitedParams = await params;
  const writerId = awaitedParams.id;

  let writer = null;

  try {
    const { data } = await client.query({
      query: GET_WRITER_DATA,
      variables: { id: writerId },
    });
    writer = data?.libaray_Autor_by_pk;
  } catch (e) {
    console.error("Error fetching writer details on server:", e);
    // The error is logged on the server.
    // The component will proceed and `writer` will be null.
  }

  if (!writer) {
    notFound();
  }

  // Use the correct relationship name 'Book_Author'
  const books = writer.Book_Author || [];

  return <WriterProfileClient writer={writer} books={books} />;
};

export default WriterProfilePage;
