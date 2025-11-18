// src/components/FeatureCard.jsx
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Import Link component

const FeatureCard = ({ image, title, description, link }) => {
  const content = (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden group h-full flex flex-col">
      <div className="relative w-full h-48 md:h-64 lg:h-80"> {/* Adjusted height for better responsiveness */}
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-6 flex-grow">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </div>
  );

  return link ? (
    <Link href={link} target="_blank" rel="noopener noreferrer" className="block h-full">
      {content}
    </Link>
  ) : (
    content
  );
};

export default FeatureCard;