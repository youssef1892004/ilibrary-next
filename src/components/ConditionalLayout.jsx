// src/components/ConditionalLayout.jsx
"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from "@/components/Navbar"; // استخدام مسار واحد وثابت
import Footer from "@/components/Footer";
import GlobalReview from "@/components/GlobalReview";

const ConditionalLayout = ({ children }) => {
  const pathname = usePathname();

  // --- تم دمج الشروط هنا ---
  // سنقوم بإخفاء الـ Layout إذا كانت الصفحة هي /auth بالضبط
  // أو إذا كانت تبدأ بـ /read (مثل /read/123)
  const hideLayout = pathname === '/auth' || pathname.startsWith('/read');

  return (
    <div className="flex flex-col min-h-screen">
      {/* إذا لم تكن hideLayout صحيحة، قم بعرض الشريط */}
      {!hideLayout && <Navbar />}

      {/* المحتوى الرئيسي للصفحة */}
      {/* يتم إضافة padding-top فقط إذا كان الـ Navbar ظاهراً */}
      <main className={`flex-grow ${!hideLayout ? 'pt-20' : ''}`}>
        {children}
      </main>

      {/* إذا لم تكن hideLayout صحيحة، قم بعرض الفوتر و GlobalReview */}
      {!hideLayout && (
        <>
          <Footer />
          <GlobalReview />
        </>
      )}
    </div>
  );
};

export default ConditionalLayout;
