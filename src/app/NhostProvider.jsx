// src/app/NhostProvider.jsx
"use client";

import { NhostProvider as Provider, NhostClient } from '@nhost/nextjs';
import { ApolloProvider } from '@apollo/client';

// 1. إعداد Nhost Client باستخدام الـ Subdomain والـ Region الخاص بك
// يمكنك إيجاد هذه البيانات في لوحة تحكم مشروعك على Nhost
const nhost = new NhostClient({
  authUrl: 'https://libararyauth-af96ef3792e3.hosted.ghaymah.systems/',
  functionsUrl: 'https://libararyauth-af96ef3792e3.hosted.ghaymah.systems/',
  graphqlUrl: 'https://libararyauth-af96ef3792e3.hosted.ghaymah.systems/',
  storageUrl: 'https://libararyauth-af96ef3792e3.hosted.ghaymah.systems/',
});

// 2. إنشاء مكون الـ Provider
const NhostProvider = ({ children }) => {
  return (
    <Provider nhost={nhost}>
      {/* 3. تغليف التطبيق بـ ApolloProvider ليتصل بـ GraphQL الخاص بـ Nhost */}
      <ApolloProvider client={nhost.graphql.getClient()}>
        {children}
      </ApolloProvider>
    </Provider>
  );
};

export default NhostProvider;
