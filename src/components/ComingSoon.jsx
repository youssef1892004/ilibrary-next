// src/components/ComingSoon.jsx
"use client";

import React from 'react';
import FeatureCard from './FeatureCard'; // استيراد المكون الجديد
import { useLanguage } from '@/context/LanguageContext';

const ComingSoon = () => {
  const { t } = useLanguage(); // استخدام السياق الموجود لديك

  // بيانات الميزات القادمة
  const features = [
    { 
      image: 'https://res.cloudinary.com/dnveptlzm/image/upload/v1751317261/audiobooks_pbqwnf.jpg', 
      title: t.audiobooksTitle || "كتب صوتية", 
      description: "متاح الآن الاستماع إلى كتب وتجربة المزيد من الأصوات العربية الرائعة على موقع Voice Studio.",
      link: "https://www.voicestudio.space/"
    },
    { 
      image: 'https://res.cloudinary.com/dnveptlzm/image/upload/v1751317333/manga_uiwbjb.jpg', 
      title: t.mangaTitle || "مانجا وكوميكس", 
      description: t.mangaDesc || "انغمس في عوالم المانجا والقصص المصورة مع مجموعة واسعة من العناوين الكلاسيكية والجديدة."
    }
  ];

  return (
    <section className="bg-white dark:bg-gray-900 py-20 transition-colors">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
              متاح الآن في مكتبتنا
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
              استكشف الميزات الجديدة والمحتوى الشيق المتاح الآن لإثراء تجربتك
            </p>
            <div className="w-24 h-1 bg-purple-600 mx-auto mt-4 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index} 
              image={feature.image} 
              title={feature.title} 
              description={feature.description}
              link={feature.link} // Pass the link prop
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComingSoon;