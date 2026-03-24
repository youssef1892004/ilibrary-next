// src/context/AuthContext.jsx
"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// --- تأكد من وجود هذا السطر ---
import client from '@/lib/apollo';

const AuthContext = createContext();

export const AuthProvider = ({ children, initialUser }) => {
  // Initialize user with server-provided state (SSR) or fall back to null
  const [user, setUser] = useState(initialUser || null);
  // If we have initialUser, we are not loading. If not, we might be checking localStorage (legacy) or just not logged in.
  // Actually, with SSR, we know the status immediately. 
  // But let's keep isLoading true only if we rely *solely* on client side and have no initialUser?
  // No, if initialUser is passed (null or object), we are done loading source of truth.
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Sync with localStorage for Apollo Client (Client-Side Only)
  useEffect(() => {
    if (user) {
      // Create a session object compatible with existing Apollo setup
      const session = { user, accessToken: user.accessToken }; // Ensure accessToken is part of user object from getSession
      localStorage.setItem('session', JSON.stringify(session));
    } else {
      localStorage.removeItem('session');
    }
  }, [user]);

  const login = (session) => {
    if (session && session.user) {
      // API has already set the cookie. We just update Client state.
      // Make sure we have the token if we need it for Apollo immediately
      // The session object from API response should have it.
      setUser({ ...session.user, accessToken: session.accessToken });
      client.resetStore();
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' }); // Clear cookie
      setUser(null);
      client.resetStore();
      router.push('/auth');
      router.refresh(); // Refresh to ensure server-side props are re-fetched without the cookie
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);