// src/components/Testimonials.jsx
"use client";

import React from 'react';
// تأكد أن الاستدعاء هكذا (بدون أقواس)
import TestimonialCard from './TestimonialCard';
import { useLanguage } from '@/context/LanguageContext';

const testimonialsData = [
  { id: 1, avatar: "/avatars/user1.jpg", name: "طيب", role: "@tayeb" },
  { id: 2, avatar: "/avatars/user2.jpg", name: "سارة", role: "@sara" },
  { id: 3, avatar: "/avatars/user3.jpg", name: "علي", role: "@ali" }
];

const Testimonials = () => {
    const { t } = useLanguage();

    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
                        {t.testimonials || "آراء القراء"}
                    </h2>
                    <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
                        {t.testimonialsSubtitle || "ماذا يقول عنا مجتمعنا من القراء والمبدعين"}
                    </p>
                    <div className="w-24 h-1 bg-purple-600 mx-auto mt-4 rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonialsData.map((testimonial) => (
                        <TestimonialCard
                            key={testimonial.id}
                            avatar={testimonial.avatar}
                            name={testimonial.name}
                            role={testimonial.role}
                            text={t[`testimonial${testimonial.id}`] || "تجربة قراءة رائعة ومكتبة ثرية بالمحتوى المفيد."}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;