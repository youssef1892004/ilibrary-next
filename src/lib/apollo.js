// src/lib/apollo.js
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// الرابط الخاص بالـ API
const httpLink = createHttpLink({
  uri: 'https://graphql-333f98f9a304.hosted.ghaymah.systems/v1/graphql',
});

// هذا هو الجزء الأهم: إضافة الهيدر (Header) مع كل طلب
const authLink = setContext((_, { headers }) => {
  // إرجاع الهيدر مع تحديد دور "public"
  // هذا يسمح بالوصول إلى البيانات التي تم تحديد صلاحياتها للعامة في Hasura
  return {
    headers: {
      ...headers,
      'x-hasura-role': 'public',
    }
  };
});

const createApolloClient = () => {
  return new ApolloClient({
    // دمج رابط المصادقة مع رابط الـ HTTP
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
