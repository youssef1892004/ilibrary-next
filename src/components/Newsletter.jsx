"use client";

import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');

        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            toast.success('تم الاشتراك بنجاح! شكراً لك.');
            setEmail('');

            // Reset status after a few seconds
            setTimeout(() => setStatus('idle'), 3000);
        }, 1500);
    };

    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background accents - Softer for Light Mode */}
            <div className="absolute inset-0 bg-purple-50 dark:bg-black">
                {/* Subtle pattern for light mode, dark bg for dark mode */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 dark:opacity-10 invert dark:invert-0"></div>
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-200 dark:bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-20 animate-blob"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-200 dark:bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-20 animate-blob animation-delay-2000"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                        كن أول من يعلم بالكتب الجديدة 📚
                    </h2>
                    <p className="text-gray-600 dark:text-purple-100 mb-10 text-lg">
                        اشترك في نشرتنا البريدية للحصول على تحديثات أسبوعية حول أحدث الكتب المضافة والمجموعات الحصرية. لا رسائل مزعجة، نعدك بذلك!
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                        <div className="flex-grow relative">
                            <input
                                type="email"
                                placeholder="أدخل بريدك الإلكتروني..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-6 py-4 rounded-full border border-gray-200 dark:border-none focus:ring-2 focus:ring-purple-400 bg-white dark:bg-white/10 dark:backdrop-blur-md text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-purple-200 transition-all shadow-sm"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={status === 'loading' || status === 'success'}
                            className={`px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg ${status === 'success'
                                ? 'bg-green-500 text-white cursor-default'
                                : 'bg-purple-600 text-white hover:bg-purple-700 hover:scale-105'
                                }`}
                        >
                            {status === 'loading' ? (
                                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            ) : status === 'success' ? (
                                <span>تم الاشتراك ✔</span>
                            ) : (
                                <>
                                    <span>اشتراك</span>
                                    <FaPaperPlane className="text-sm" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="mt-4 text-xs text-gray-500 dark:text-purple-300 opacity-70">
                        من خلال الاشتراك، أنت توافق على سياسة الخصوصية الخاصة بنا.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
