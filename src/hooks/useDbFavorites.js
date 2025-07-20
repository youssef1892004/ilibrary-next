// src/hooks/useDbFavorites.js
"use client";

import { useQuery, useMutation, gql } from '@apollo/client';
import { useAuth } from '@/context/AuthContext';
import { useCallback } from 'react';

// Query to get favorite IDs
const GET_FAVORITES_QUERY = gql`
  query GetFavorites($userId: uuid!) {
    libaray_Favorite(where: { user_id: { _eq: $userId } }) {
      id
      book_id
    }
  }
`;

// --- START OF FIX: Changed timestamptz to date ---
const INSERT_FAVORITE_MUTATION = gql`
  mutation InsertFavorite($book_id: uuid!, $user_id: uuid!, $added_at: date!) {
    insert_libaray_Favorite_one(object: { book_id: $book_id, user_id: $user_id, added_at: $added_at }) {
      id
    }
  }
`;
// --- END OF FIX ---

// Delete mutation remains the same
const DELETE_FAVORITE_MUTATION = gql`
  mutation DeleteFavorite($book_id: uuid!, $user_id: uuid!) {
    delete_libaray_Favorite(where: { book_id: { _eq: $book_id }, user_id: { _eq: $user_id } }) {
      affected_rows
    }
  }
`;

export const useDbFavorites = () => {
  const { user } = useAuth();
  
  const { data, loading, error } = useQuery(GET_FAVORITES_QUERY, {
    variables: { userId: user?.id },
    skip: !user,
  });

  const [addFavoriteMutation] = useMutation(INSERT_FAVORITE_MUTATION, {
    refetchQueries: ['GetFavorites']
  });
  
  const [removeFavoriteMutation] = useMutation(DELETE_FAVORITE_MUTATION, {
    refetchQueries: ['GetFavorites']
  });

  const favorites = data?.libaray_Favorite || [];

  const addFavorite = useCallback((bookId) => {
    if (!user) return;

    // --- START OF FIX: Format date to YYYY-MM-DD ---
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // This gives "YYYY-MM-DD"
    // --- END OF FIX ---

    addFavoriteMutation({
      variables: {
        book_id: bookId,
        user_id: user.id,
        added_at: formattedDate, // Use the correctly formatted date
      }
    }).catch(console.error);
  }, [user, addFavoriteMutation]);

  const removeFavorite = useCallback((bookId) => {
    if (!user) return;
    removeFavoriteMutation({
      variables: {
        book_id: bookId,
        user_id: user.id,
      }
    }).catch(console.error);
  }, [user, removeFavoriteMutation]);

  const isFavorite = (bookId) => favorites.some(fav => fav.book_id === bookId);

  return { favorites, addFavorite, removeFavorite, isFavorite, loading };
};