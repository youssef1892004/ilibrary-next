// src/hooks/useReadingHistory.js
import { useMutation, gql } from '@apollo/client';
import { useAuth } from '@/context/AuthContext';
import { useCallback } from 'react';

const DELETE_OLD_HISTORY = gql`
  mutation DeleteOldHistory($bookId: uuid!, $userId: uuid!) {
    delete_libaray_Reading_history(
      where: { book_id: { _eq: $bookId }, user_id: { _eq: $userId } }
    ) {
      affected_rows
    }
  }
`;

// تم إزالة last_read_chapter_id من هنا
const INSERT_NEW_HISTORY = gql`
  mutation InsertReadingHistory($last_read: String, $last_read_at: timestamptz, $book_id: uuid, $user_id: uuid) {
    insert_libaray_Reading_history_one(object: {
      last_read: $last_read, 
      last_read_at: $last_read_at, 
      book_id: $book_id, 
      user_id: $user_id,
      is_completed: false
    }) {
      id
    }
  }
`;

export const useReadingHistory = () => {
  const { user } = useAuth();
  const [deleteHistory] = useMutation(DELETE_OLD_HISTORY);
  const [insertHistory] = useMutation(INSERT_NEW_HISTORY);

  // الدالة الآن لا تحتاج لمعرّف الفصل
  const saveProgress = useCallback(async (bookId, chapterLabel) => {
    if (!user || !bookId || !chapterLabel) return;
    
    try {
      await deleteHistory({
        variables: { bookId: bookId, userId: user.id },
      });

      await insertHistory({
        variables: {
          book_id: bookId,
          user_id: user.id,
          last_read: chapterLabel,
          last_read_at: new Date().toISOString(),
        }
      });
    } catch (err) {
      console.error("Failed to save reading history:", err);
    }
  }, [user, deleteHistory, insertHistory]);

  return { saveProgress };
};