// src/components/NotificationBanner.jsx
"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

const NotificationBanner = () => {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (user) {
      const showTimer = setTimeout(() => {
        setIsVisible(true);
      }, 10000); // Show after 10 seconds

      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 20000); // Hide after another 10 seconds (total 20s)

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [user]);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 bg-purple-600 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm animate-fade-in-up">
      <div className="flex justify-between items-start">
        <p className="pr-4">
          يمكن الآن الاستماع لمزيد من الأصوات على موقعنا الجديد{" "}
          <Link href="https://www.voicestudio.space/" target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-purple-200">
            Voice Studio
          </Link>
        </p>
        <button onClick={handleClose} className="text-white hover:text-gray-200">
          &times;
        </button>
      </div>
    </div>
  );
};

export default NotificationBanner;
