// src/components/ReadingHistoryDropdown.jsx
"use client";

import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

// تم إزالة last_read_chapter_id من هنا
const GET_READING_HISTORY = gql`
  query GetReadingHistory($userId: uuid!) {
    libaray_Reading_history(
      where: { user_id: { _eq: $userId }, is_completed: { _eq: false } },
      order_by: { last_read_at: desc },
      limit: 5
    ) {
      id
      last_read
      book_id
    }
  }
`;

const ReadingHistoryDropdown = () => {
  const { user } = useAuth();
  const { loading, error, data } = useQuery(GET_READING_HISTORY, {
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
          // الرابط هنا يوجه إلى صفحة تفاصيل الكتاب
          <Link href={`/books/${item.book_id}`} key={item.id} className="block p-3 hover:bg-gray-100 dark:hover:bg-gray-700">
            <p className="font-semibold text-sm text-gray-900 dark:text-white">
              آخر قراءة: {item.last_read}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ReadingHistoryDropdown;