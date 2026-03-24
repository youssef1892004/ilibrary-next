// src/app/books/page.jsx

import React, { Suspense } from 'react';
import BooksPageClient from './BooksPageClient';

export const metadata = {
  title: 'تصفح آلاف الكتب الإلكترونية | Muejam Library',
  description: 'ابحث وتصفح مكتبتنا الضخمة من الكتب الإلكترونية في جميع الفئات. ابدأ مغامرتك في القراءة اليوم مع Muejam Library.',
};

export default function BooksPage() {
  return (
    // -- التعديل هنا: تمت إضافة لون خلفية وهيكل للصفحة --
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <Suspense fallback={<div className="text-center py-20">جاري التحميل...</div>}>
        <BooksPageClient />
      </Suspense>
    </div>
  );
}