// src/lib/apollo.js

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const createApolloClient = () => {
  const httpLink = new HttpLink({
    uri: 'https://graphql-333f98f9a304.hosted.ghaymah.systems/v1/graphql',
    headers: {
      // هنا نقوم بإضافة الـ secret key من متغيرات البيئة
      'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET
    }
  });

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;