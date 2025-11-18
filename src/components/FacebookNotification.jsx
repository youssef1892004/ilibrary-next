// src/components/FacebookNotification.jsx
"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { FaFacebookF } from 'react-icons/fa';

const FacebookNotification = () => {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (user) {
      const showTimer = setTimeout(() => {
        setIsVisible(true);
      }, 22000); // Show after 22 seconds (after the first notification)

      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 32000); // Hide after 10 seconds

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
    <div className="fixed bottom-24 right-5 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm animate-fade-in-up">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <FaFacebookF className="mr-3" size={20} />
          <p className="pr-4">
            يمكنك متابعتنا على فيسبوك!{" "}
            <Link href="https://www.facebook.com/lib7ary/" target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-blue-200">
              صفحتنا على فيسبوك
            </Link>
          </p>
        </div>
        <button onClick={handleClose} className="text-white hover:text-gray-200">
          &times;
        </button>
      </div>
    </div>
  );
};

export default FacebookNotification;
