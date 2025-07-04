// src/components/TestimonialCard.jsx
"use client";

import React from 'react';
import Image from 'next/image';

const TestimonialCard = ({ avatar, name, role, text }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center h-full">
      <Image
        src={avatar}
        alt={`صورة ${name}`}
        width={80}
        height={80}
        className="rounded-full mx-auto mb-4 border-4 border-purple-200 dark:border-purple-800"
      />
      <h3 className="font-bold text-xl text-gray-800 dark:text-white">{name}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{role}</p>
      <p className="text-gray-600 dark:text-gray-300 italic">
        "{text}"
      </p>
    </div>
  );
};

// تأكد تمامًا من وجود هذا السطر في النهاية
export default TestimonialCard;