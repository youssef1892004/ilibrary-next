'use client';

import { FaExclamationTriangle, FaRedo } from 'react-icons/fa';
import './globals.css'; // Import globals to ensure basic styling

export default function GlobalError({ error, reset }) {
    return (
        <html lang="ar" dir="rtl">
            <body>
                <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-sans">
                    <div className="bg-red-100 p-4 rounded-full mb-6 dark:bg-red-900/30">
                        <FaExclamationTriangle className="text-6xl text-red-600 dark:text-red-400" />
                    </div>
                    <h2 className="text-4xl font-bold mb-4">
                        خطأ جسيم في النظام
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                        حدث خطأ غير متوقع منع التطبيق من العمل.
                    </p>
                    <button
                        onClick={() => reset()}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-bold text-lg shadow-lg"
                    >
                        <FaRedo />
                        <span>إعادة تحميل التطبيق</span>
                    </button>
                </div>
            </body>
        </html>
    );
}
