// src/components/FeatureCard.jsx
"use client";

import React from 'react';
import Image from 'next/image';

const FeatureCard = ({ image, title, description }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden group">
      <div className="relative w-full h-80">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 group-hover:scale-110"
        />
        {/* تم حذف السطر الذي كان يضيف الفلتر من هنا */}
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;