// src/components/Hero.jsx
"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';

const Hero = () => {
  const { t } = useLanguage();

  const heroIllustrationUrl = 'https://res.cloudinary.com/dnveptlzm/image/upload/v1751317304/auth-image_rjnuwu.jpg';

  const heroText = {
    titleLine1: t.heroTitleLine1 || "بوابتك إلى المعرفة",
    titleLine2: t.heroTitleLine2 || "والإبداع العربي",
    subtitle: t.heroSubtitle || "استكشف آلاف الكتب والروايات والمقالات التي تثري العقل وتلهم الروح في أكبر مكتبة عربية رقمية.",
    ctaButton: t.heroCtaButton || "ابدأ رحلتك",
  };

  return (
    // -- أضفنا pt-20 هنا لترك مسافة للـ Navbar --
    <section className="relative bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20 pb-20 px-6 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-200 dark:bg-pink-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce-slow" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="relative z-10 max-w-screen-xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          <div className="lg:w-1/2 text-center lg:text-right">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 dark:text-white mb-6 leading-tight">
              {heroText.titleLine1} <span className="text-purple-600 dark:text-purple-400">{heroText.titleLine2}</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
              {heroText.subtitle}
            </p>
            <Link 
              href="/books"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-transform duration-300 transform hover:scale-105 shadow-lg"
            >
              {heroText.ctaButton}
            </Link>
          </div>
          
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl transform -rotate-6 scale-105 opacity-20 dark:opacity-30"></div>
              <Image 
                src={heroIllustrationUrl} 
                alt="أشخاص يقرؤون الكتب" 
                width={500}
                height={500}
                className="relative w-full max-w-lg mx-auto rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                priority
              />
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-pink-400 rounded-full animate-bounce"></div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;