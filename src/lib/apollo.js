// src/lib/apollo.js
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://graphql-333f98f9a304.hosted.ghaymah.systems/v1/graphql',
});

const authLink = setContext((_, { headers }) => {
  // هذا الكود يعمل فقط في المتصفح
  if (typeof window !== 'undefined') {
    try {
      const storedSession = localStorage.getItem('session');
      if (storedSession) {
        const session = JSON.parse(storedSession);
        const token = session?.accessToken;

        // إذا وجدنا توكن، أرسله مع الطلب
        if (token) {
          return {
            headers: {
              ...headers,
              authorization: `Bearer ${token}`,
            }
          };
        }
      }
    } catch (error) {
      console.error("Could not parse session, proceeding as guest:", error);
    }
  }

  // إذا لم نجد توكن، استخدم صلاحيات الزائر
  return {
    headers: {
      ...headers,
      'x-hasura-role': 'public',
    }
  };
});

const createApolloClient = () => {
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;