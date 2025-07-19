// src/components/GlobalReview.jsx
"use client";

import React, { useEffect, useState, useCallback } from 'react';
import ReviewModal from './ReviewModal';

const INACTIVITY_TIME = 5 * 60 * 1000; // 5 دقائق
const SESSION_STORAGE_KEY = 'reviewHasBeenSubmitted';

const GlobalReview = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const resetTimer = useCallback(() => {
        // إذا كان المستخدم قد أرسل تقييمًا بالفعل في هذه الجلسة، لا تقم بتشغيل المؤقت
        if (sessionStorage.getItem(SESSION_STORAGE_KEY)) {
            return null;
        }

        const timer = setTimeout(() => {
            setIsModalOpen(true);
        }, INACTIVITY_TIME);

        return timer;
    }, []);

    useEffect(() => {
        let inactivityTimer = resetTimer();

        const events = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'];

        const eventHandler = () => {
            if (inactivityTimer) {
                clearTimeout(inactivityTimer);
            }
            inactivityTimer = resetTimer();
        };

        // إضافة مستمعي الأحداث لإعادة تشغيل المؤقت عند تفاعل المستخدم
        events.forEach(event => window.addEventListener(event, eventHandler));

        // تنظيف المؤقت ومستمعي الأحداث عند مغادرة الصفحة
        return () => {
            if (inactivityTimer) {
                clearTimeout(inactivityTimer);
            }
            events.forEach(event => window.removeEventListener(event, eventHandler));
        };
    }, [resetTimer]);

    const handleSubmitted = () => {
        // عند إرسال التقييم بنجاح، قم بتسجيل ذلك في الـ sessionStorage
        try {
            sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
        } catch (error) {
            console.error("Could not save to sessionStorage", error);
        }
    };

    return (
        <ReviewModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmitted={handleSubmitted}
        />
    );
};

export default GlobalReview;