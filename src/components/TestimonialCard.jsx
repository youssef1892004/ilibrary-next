// src/components/TestimonialCard.jsx
"use client";

import React from 'react';
// 1. استيراد أيقونة المستخدم بدلاً من مكون الصورة
import { FaUserCircle } from 'react-icons/fa';

// 2. إزالة `avatar` من الخصائص (props)
const TestimonialCard = ({ name, role, text }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center h-full">
      {/* 3. استبدال الصورة بالأيقونة */}
      <FaUserCircle className="w-20 h-20 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
      
      <h3 className="font-bold text-xl text-gray-800 dark:text-white">{name}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{role}</p>
      <p className="text-gray-600 dark:text-gray-300 italic">
        "{text}"
      </p>
    </div>
  );
};

export default TestimonialCard;