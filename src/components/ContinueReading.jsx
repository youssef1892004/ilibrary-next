// src/components/ContinueReading.jsx
"use client";

import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useAuth } from '@/context/AuthContext';
import HistoryBookCard from './HistoryBookCard';

// استعلام لجلب البيانات الأساسية فقط من السجل
const GET_READING_HISTORY_BASIC = gql`
  query GetReadingHistoryBasic($userId: uuid!) {
    libaray_Reading_history(
      where: { user_id: { _eq: $userId }, is_completed: { _eq: false } },
      order_by: { last_read_at: desc },
      limit: 4
    ) {
      id
      last_read
      book_id
    }
  }
`;

const ContinueReading = () => {
  const { user } = useAuth();

  const { loading, error, data } = useQuery(GET_READING_HISTORY_BASIC, {
    variables: { userId: user?.id },
    skip: !user,
  });

  const historyItems = data?.libaray_Reading_history || [];

  if (!user || loading || error || historyItems.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-10">
          أكمل القراءة
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {historyItems.map((item) => (
            <HistoryBookCard
              key={item.id}
              bookId={item.book_id}
              lastRead={item.last_read}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContinueReading;