'use client';

import React from 'react';
import { FaLaptopCode, FaMoon, FaHistory, FaSearch } from 'react-icons/fa';

const features = [
    {
        title: 'قراءة في أي مكان',
        description: 'استمتع بقراءة كتبك المفضلة على الهاتف، التابلت، أو الكمبيوتر بتصميم متجاوب وسلس.',
        icon: FaLaptopCode,
        color: 'bg-indigo-500',
    },
    {
        title: 'وضع القراءة المريح',
        description: 'وفرنا لك وضعاً ليلياً (Dark Mode) وتحكم كامل في حجم الخطوط لراحة عينيك أثناء القراءة الطويلة.',
        icon: FaMoon,
        color: 'bg-purple-500',
    },
    {
        title: 'مكتبتك الشخصية',
        description: 'احتفظ بسجل قراءاتك، وتابع من حيث توقفت، وأضف الكتب لقائمة المفضلة للعودة إليها لاحقاً.',
        icon: FaHistory,
        color: 'bg-pink-500',
    },
    {
        title: 'بحث ذكي وسريع',
        description: 'محرك بحث متطور يتيح لك الوصول لأي كتاب أو كاتب أو تصنيف في أجزاء من الثانية.',
        icon: FaSearch,
        color: 'bg-blue-500',
    },
];

export default function WhyChooseUs() {
    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        لماذا تختار <span className="text-purple-600 dark:text-purple-400">Muejam Library</span>؟
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        نحن لا نقدم مجرد كتب، بل نقدم تجربة قراءة رقمية متكاملة مصممة خصيصاً للقارئ العربي.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gray-100 to-transparent dark:from-gray-700 rounded-bl-full opacity-50 transition-transform group-hover:scale-110"></div>

                            <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center text-white mb-6 shadow-lg transform group-hover:rotate-6 transition-transform duration-300`}>
                                <feature.icon size={24} />
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
