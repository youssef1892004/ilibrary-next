// src/app/profile/page.jsx
"use client";

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import ChangeEmailForm from '@/components/ChangeEmailForm';
import ChangePasswordForm from '@/components/ChangePasswordForm';
import ChangeAvatarForm from '@/components/ChangeAvatarForm'; // استيراد المكون الجديد

const ProfilePage = () => {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    if (isLoading) {
        return <div className="text-center py-40">جاري التحميل...</div>;
    }

    if (!user) {
        router.push('/auth');
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12">
            <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">الملف الشخصي</h1>
                    <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
                      مرحبًا، {user.displayName || user.email}
                    </p>
                    {/* عرض البريد الإلكتروني للمستخدم */}
                    <p className="text-md text-gray-400 dark:text-gray-500 mt-1">{user.email}</p>
                </header>

                <div className="space-y-10">
                    <ChangeAvatarForm /> {/* إضافة مكون تغيير الصورة */}
                    <ChangeEmailForm />
                    <ChangePasswordForm />
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;