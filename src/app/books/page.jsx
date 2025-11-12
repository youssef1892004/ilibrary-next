// src/app/books/page.jsx

import BooksPageClient from './BooksPageClient';

export const metadata = {
  title: 'تصفح آلاف الكتب الإلكترونية | iLibrary',
  description: 'ابحث وتصفح مكتبتنا الضخمة من الكتب الإلكترونية في جميع الفئات. ابدأ مغامرتك في القراءة اليوم مع iLibrary.',
};

export default function BooksPage() {
  return (
    // -- التعديل هنا: تمت إضافة لون خلفية وهيكل للصفحة --
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <BooksPageClient />
    </div>
  );
}