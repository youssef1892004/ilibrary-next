// src/app/auth/page.jsx
import React from 'react';
import Link from 'next/link';
import { FaTools } from 'react-icons/fa'; // أيقونة للتوضيح

const AuthPrototypePage = () => {
  return (
    // حاوية لتوسيط المحتوى في الصفحة
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="text-center p-8 max-w-lg mx-auto">
        <div className="flex justify-center mb-6">
          <FaTools className="text-purple-500" size={60} />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          الصفحة تحت التطوير
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          هذه الصفحة هي نموذج أولي (Prototype) للعرض فقط في الوقت الحالي.
          نعمل بجد لإضافة وظائف تسجيل الدخول وإنشاء الحسابات قريباً!
        </p>
        <Link href="/">
          <button className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-lg hover:scale-105 transform">
            العودة إلى الصفحة الرئيسية
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AuthPrototypePage;