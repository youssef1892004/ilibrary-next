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
      # Assumes a relationship named 'Books' exists on the 'libaray_Autor' table
      Books(order_by: {publicationDate: desc}) {
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
  const writerId = params.id;

  try {
    const { data } = await client.query({
      query: GET_WRITER_DATA,
      variables: { id: writerId },
    });

    const writer = data?.libaray_Autor_by_pk;

    if (!writer) {
      return {
        title: 'الكاتب غير موجود | iLibrary',
        description: 'لم نتمكن من العثور على الكاتب الذي تبحث عنه.',
      };
    }

    return {
      title: `صفحة الكاتب ${writer.name} | iLibrary`,
      description: writer.bio?.substring(0, 160) || `اكتشف أعمال ومؤلفات الكاتب ${writer.name} على iLibrary.`,
    };
  } catch (error) {
    console.error('Error generating metadata for writer:', error);
    return {
      title: 'خطأ | iLibrary',
      description: 'حدث خطأ أثناء تحميل بيانات الكاتب.',
    };
  }
}

// The main page component, now a Server Component
const WriterProfilePage = async ({ params }) => {
  const client = createApolloClient();
  const writerId = params.id;

  let writer = null;
  let error = null;

  try {
    const { data } = await client.query({
      query: GET_WRITER_DATA,
      variables: { id: writerId },
    });
    writer = data?.libaray_Autor_by_pk;
  } catch (e) {
    console.error("Error fetching writer details on server:", e);
    error = e;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        <p className="text-xl font-bold">حدث خطأ أثناء جلب البيانات.</p>
        <p className="text-sm mt-2">يرجى المحاولة مرة أخرى لاحقًا.</p>
      </div>
    );
  }

  if (!writer) {
    notFound();
  }

  const books = writer.Books || [];

  return <WriterProfileClient writer={writer} books={books} />;
};

export default WriterProfilePage;
