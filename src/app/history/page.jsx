// src/app/history/page.jsx
"use client";

import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import HistoryBookCard from '@/components/HistoryBookCard';
import { FaTrash } from 'react-icons/fa';
import Link from 'next/link';

// استعلام لجلب كل سجل القراءة (بدون حد)
const GET_FULL_READING_HISTORY = gql`
  query GetFullReadingHistory($userId: uuid!) {
    libaray_Reading_history(
      where: { user_id: { _eq: $userId }, is_completed: { _eq: false } },
      order_by: { last_read_at: desc }
    ) {
      id
      last_read
      book_id
    }
  }
`;

// Mutation لحذف عنصر واحد
const DELETE_HISTORY_ITEM = gql`
  mutation DeleteSingleHistoryItem($id: uuid!) {
    delete_libaray_Reading_history_by_pk(id: $id) {
      id
    }
  }
`;

const HistoryPage = () => {
  const { user } = useAuth();

  const { loading, error, data } = useQuery(GET_FULL_READING_HISTORY, {
    variables: { userId: user?.id },
    skip: !user,
  });

  const [deleteItem, { loading: deleteLoading }] = useMutation(DELETE_HISTORY_ITEM, {
    refetchQueries: ['GetFullReadingHistory', 'GetReadingHistoryBasic']
  });

  const historyItems = data?.libaray_Reading_history || [];

  const handleDelete = async (id) => {
    if (!window.confirm("هل أنت متأكد من أنك تريد حذف هذا السجل؟")) return;

    try {
      await deleteItem({
        variables: { id },
      });
      // لا حاجة لـ refetch() هنا لأنها ستحدث تلقائيًا
    } catch (err) {
      console.error("Failed to delete history item:", err);
      toast.error("حدث خطأ أثناء الحذف.");
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-lg mb-4">يجب تسجيل الدخول لعرض سجل القراءة.</p>
        <Link href="/auth" className="btn-primary">
          الانتقال لصفحة الدخول
        </Link>
      </div>
    );
  }

  if (loading) return <div className="text-center py-20"><p>جاري تحميل السجل...</p></div>;
  if (error) return <div className="text-center py-20 text-red-500"><p>حدث خطأ أثناء تحميل السجل.</p></div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white">
        سجل القراءة
      </h1>

      {historyItems.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">لا يوجد سجل قراءة حتى الآن.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {historyItems.map((item) => (
            <div key={item.id} className="relative group">
              <HistoryBookCard
                bookId={item.book_id}
                lastRead={item.last_read}
              />
              <button
                onClick={() => handleDelete(item.id)}
                disabled={deleteLoading}
                className="absolute top-2 right-2 bg-red-600/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm hover:bg-red-700 disabled:bg-red-400"
                aria-label="حذف السجل"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;