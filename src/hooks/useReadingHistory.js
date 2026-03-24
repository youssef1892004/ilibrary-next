// src/hooks/useReadingHistory.js
import { useMutation, gql } from '@apollo/client';
import { useAuth } from '@/context/AuthContext';
import { useCallback } from 'react';

// لا تغيير هنا
const DELETE_OLD_HISTORY = gql`
  mutation DeleteOldHistory($bookId: uuid!, $userId: uuid!) {
    delete_libaray_Reading_history(
      where: { book_id: { _eq: $bookId }, user_id: { _eq: $userId } }
    ) {
      affected_rows
    }
  }
`;

// لا تغيير هنا
const INSERT_NEW_HISTORY = gql`
  mutation InsertReadingHistory($book_id: uuid, $user_id: uuid, $last_read: String, $last_read_at: timestamptz) {
    insert_libaray_Reading_history_one(object: {
      book_id: $book_id, 
      user_id: $user_id, 
      last_read: $last_read, 
      last_read_at: $last_read_at,
      is_completed: false
    }) {
      id
    }
  }
`;

export const useReadingHistory = () => {
  const { user } = useAuth();

  // --- بداية التعديل: إضافة refetchQueries ---
  const [deleteHistory] = useMutation(DELETE_OLD_HISTORY);
  const [insertHistory] = useMutation(INSERT_NEW_HISTORY, {
    refetchQueries: ['GetReadingHistoryBasic'] // <-- هذا السطر يخبر Apollo بإعادة جلب بيانات السجل
  });
  // --- نهاية التعديل ---

  const saveProgress = useCallback(async (bookId, chapterLabel, chapterId = null, scrollPosition = 0) => {
    if (!user || !bookId) return;

    // Create JSON for last_read if we have detailed info
    let lastReadValue = chapterLabel;
    if (chapterId) {
      // We store it as a JSON string to keep compatibility while adding data
      // Consumers must parse this or use it as legacy string if parsing fails
      // Actually, let's keep it simple: "Chapter X" OR JSON.
      // To avoid breaking old clients, we might face issues. 
      // But since we control the frontend, we will update consumers to tryParse.
      lastReadValue = JSON.stringify({
        label: chapterLabel,
        position: scrollPosition,
        timestamp: Date.now()
      });
    }

    try {
      await deleteHistory({ variables: { bookId: bookId, userId: user.id } });
      await insertHistory({
        variables: {
          book_id: bookId,
          user_id: user.id,
          last_read: lastReadValue,
          last_read_at: new Date().toISOString()
        }
      });
    } catch (err) {
      console.error("Failed to save reading history:", err);
    }
  }, [user, deleteHistory, insertHistory]);

  return { saveProgress };
};