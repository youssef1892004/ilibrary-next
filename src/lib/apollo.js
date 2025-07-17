// src/lib/apollo.js
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://graphql-333f98f9a304.hosted.ghaymah.systems/v1/graphql',
});

const authLink = setContext((_, { headers }) => {
  const storedSession = typeof window !== 'undefined' ? localStorage.getItem('session') : null;
  
  if (storedSession) {
    try {
      const session = JSON.parse(storedSession);
      const token = session?.accessToken;
      if (token) {
        return {
          headers: {
            ...headers,
            authorization: `Bearer ${token}`,
          }
        };
      }
    } catch (e) {
      console.error("Could not parse session from localStorage", e);
    }
  }

  return {
    headers: {
      ...headers,
      'x-hasura-role': 'public',
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;