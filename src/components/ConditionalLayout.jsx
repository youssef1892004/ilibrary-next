// src/components/ConditionalLayout.jsx
"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalReview from "@/components/GlobalReview";

const ConditionalLayout = ({ children }) => {
  const pathname = usePathname();

  // الصفحات التي نريد إخفاء شريط التنقل والفوتر فيها
  const noLayoutPages = ['/read'];

  // التحقق مما إذا كانت الصفحة الحالية تبدأ بأحد الروابط الموجودة في المصفوفة
  const shouldHideLayout = noLayoutPages.some(path => pathname.startsWith(path));

  return (
    <div className="flex flex-col min-h-screen">
      {/* إذا كانت shouldHideLayout تساوي false، قم بعرض الشريط */}
      {!shouldHideLayout && <Navbar />}

      {/* المحتوى الرئيسي للصفحة */}
      <main className={`flex-grow ${!shouldHideLayout ? 'pt-20' : ''}`}>
        {children}
      </main>

      {/* إذا كانت shouldHideLayout تساوي false، قم بعرض الفوتر */}
      {!shouldHideLayout && <Footer />}

      <GlobalReview />
    </div>
  );
};

export default ConditionalLayout;