// src/components/ReadingHistoryDropdown.jsx
"use client";

import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useAuth } from '@/context/AuthContext';
import HistoryDropdownItem from './HistoryDropdownItem'; // تأكد من وجود هذا المكون

const GET_READING_HISTORY_BASIC = gql`
  query GetReadingHistoryBasic($userId: uuid!) {
    libaray_Reading_history(
      where: { user_id: { _eq: $userId }, is_completed: { _eq: false } },
      order_by: { last_read_at: desc },
      limit: 5
    ) {
      id
      last_read
      book_id
      last_read_chapter_id
    }
  }
`;

const ReadingHistoryDropdown = () => {
  const { user } = useAuth();
  const { loading, error, data } = useQuery(GET_READING_HISTORY_BASIC, {
    variables: { userId: user?.id },
    skip: !user,
    pollInterval: 15000,
  });
  const history = data?.libaray_Reading_history || [];

  return (
    <div className="absolute left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-20">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-bold text-gray-900 dark:text-white">سجل القراءة</h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {loading && <p className="p-4 text-sm text-gray-500">جاري التحميل...</p>}
        {error && <p className="p-4 text-sm text-red-500">حدث خطأ.</p>}
        {!loading && history.length === 0 && <p className="p-4 text-sm text-gray-500">لا يوجد سجل قراءة.</p>}

        {history.map((item) => (
          <HistoryDropdownItem
            key={item.id}
            bookId={item.book_id}
            chapterId={item.last_read_chapter_id}
            lastRead={item.last_read}
          />
        ))}
      </div>
    </div>
  );
};

export default ReadingHistoryDropdown;