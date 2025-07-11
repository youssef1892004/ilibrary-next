// src/components/GlobalReview.jsx
"use client";

import React, { useEffect, useState } from 'react';
import ReviewModal from './ReviewModal';

// 1. إعادة المؤقت إلى 5 دقائق
const FIVE_MINUTES = 5 * 60 * 1000; 
const LOCAL_STORAGE_KEY = 'reviewModalHasBeenShown'; // اسم المفتاح في الـ localStorage

const GlobalReview = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // 2. التحقق أولاً إذا كانت النافذة قد ظهرت من قبل
        const hasBeenShown = localStorage.getItem(LOCAL_STORAGE_KEY);

        // إذا كانت قد ظهرت، لا تقم بتشغيل المؤقت مرة أخرى
        if (hasBeenShown) {
            return;
        }

        // إذا لم تكن قد ظهرت، قم بتشغيل المؤقت
        const timer = setTimeout(() => {
            // 3. عند انتهاء المؤقت، قم بتسجيل أنها ظهرت في الـ localStorage
            try {
                localStorage.setItem(LOCAL_STORAGE_KEY, 'true');
            } catch (error) {
                console.error("Could not save to localStorage", error);
            }
            
            // ثم قم بإظهار النافذة
            setIsModalOpen(true);
        }, FIVE_MINUTES);

        // تنظيف المؤقت عند مغادرة الصفحة
        return () => clearTimeout(timer);
        
    }, []); // مصفوفة فارغة تعني أن هذا الكود سيعمل مرة واحدة فقط عند بداية الجلسة

    return (
        <ReviewModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
        />
    );
};

export default GlobalReview;