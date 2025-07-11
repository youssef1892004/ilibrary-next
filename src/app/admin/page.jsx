// src/app/admin/page.jsx
"use client";

import React from 'react';
import AdminGuard from '@/components/AdminGuard'; // 1. استيراد مكون الحماية

const AdminPage = () => {
  return (
    // 2. تغليف الصفحة بالمكون الجديد
    <AdminGuard>
      {/* كل محتوى لوحة التحكم سيوضع هنا */}
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-8">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            لوحة تحكم الأدمن
          </h1>
          <p className="text-center text-lg text-gray-700 dark:text-gray-300">
            أهلاً بك في لوحة التحكم. من هنا يمكنك إدارة محتوى الموقع.
          </p>
          {/* سنضيف هنا مكونات إدارة الكتب والمؤلفين في المرحلة التالية */}
        </div>
      </div>
    </AdminGuard>
  );
};

export default AdminPage;