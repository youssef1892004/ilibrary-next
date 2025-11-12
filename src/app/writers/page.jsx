// src/app/writers/page.jsx
import React from 'react';
import { ApolloClient, InMemoryCache, createHttpLink, gql } from '@apollo/client';
import WritersPageClient from './WritersPageClient';

// SEO Metadata
export const metadata = {
  title: 'اكتشف مؤلفي iLibrary | تصفح أفضل الكتاب',
  description: 'تعرف على المؤلفين والكتاب الذين يشكلون مكتبة iLibrary. تصفح سيرهم الذاتية واكتشف أعمالهم الأدبية.',
};

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

const GET_ALL_WRITERS = gql`
  query GetAllWriters {
    libaray_Autor(order_by: { name: asc }) {
      id
      name
      image_url
      bio
      book_num
    }
  }
`;

// The main page component, now a Server Component
const WritersPage = async () => {
  const client = createApolloClient();
  let writers = [];
  let error = null;

  try {
    const { data } = await client.query({
      query: GET_ALL_WRITERS,
    });
    writers = data?.libaray_Autor || [];
  } catch (e) {
    console.error("Error fetching writers on server:", e);
    error = e;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        <p className="text-xl font-bold">حدث خطأ أثناء جلب بيانات الكُتّاب.</p>
      </div>
    );
  }

  return <WritersPageClient writers={writers} />;
};

export default WritersPage;
