'use client';

import { useEffect } from 'react';
import { FaExclamationTriangle, FaRedo } from 'react-icons/fa';

export default function Error({ error, reset }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
            <div className="bg-red-100 p-4 rounded-full mb-6 dark:bg-red-900/30">
                <FaExclamationTriangle className="text-5xl text-red-500 dark:text-red-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                عفواً، حدث خطأ غير متوقع!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md">
                نواجه صعوبة في عرض هذه الصفحة حالياً. قد يكون هذا خطأ مؤقت.
            </p>
            <button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-md hover:shadow-lg"
            >
                <FaRedo />
                <span>إعادة المحاولة</span>
            </button>
            <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded text-sm text-gray-500 dark:text-gray-400 text-left dir-ltr overflow-auto max-w-lg max-h-32">
                <p className="font-mono">{error.message}</p>
            </div>
        </div>
    );
}
