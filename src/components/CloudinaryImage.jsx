// src/components/CloudinaryImage.jsx
"use client";

import React from 'react';
import Image from 'next/image'; // سنستخدم مكون الصور المدمج في Next.js

const CloudinaryImage = ({ publicId, width, height, alt, className }) => {
  // بما أن `publicId` الآن يحتوي على الرابط الكامل، سنستخدمه مباشرة
  // لا حاجة لمكتبة Cloudinary هنا بعد الآن

  // في حال عدم وجود رابط، نعرض عنصراً فارغاً لتجنب الأخطاء
  if (!publicId) {
    return <div style={{ width, height, backgroundColor: '#f0f0f0' }} />;
  }
  
  return (
    <Image
      src={publicId} // <-- نمرر الرابط الكامل مباشرة هنا
      alt={alt}
      width={parseInt(width, 10)}
      height={parseInt(height, 10)}
      className={className || "w-full h-full object-cover"}
      priority // لتحميل الصور الأولى بشكل أسرع (اختياري)
    />
  );
};

export default CloudinaryImage;