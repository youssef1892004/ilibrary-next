// src/components/AdminGuard.jsx
"use client";

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import React from 'react';

const AdminGuard = ({ children }) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>جاري التحقق من الصلاحيات...</p>
      </div>
    );
  }

  // --- التصحيح هنا ---
  // يتم الآن التحقق مما إذا كان المستخدم موجودًا، ولديه مصفوفة "roles"
  // وأن هذه المصفوفة تحتوي على كلمة "admin"
  const isAdmin = user && user.roles && user.roles.includes('admin');

  if (!isAdmin) {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen text-center">
            <h1 className="text-3xl font-bold text-red-500">ممنوع الوصول</h1>
            <p className="text-lg mt-2">هذه الصفحة مخصصة للمسؤولين فقط.</p>
            <button onClick={() => router.push('/')} className="mt-6 px-6 py-2 bg-purple-600 text-white rounded-lg">
                العودة للصفحة الرئيسية
            </button>
        </div>
    );
  }

  // إذا كان المستخدم هو الأدمن، سيتم عرض المحتوى بنجاح
  return <>{children}</>;
};

export default AdminGuard;