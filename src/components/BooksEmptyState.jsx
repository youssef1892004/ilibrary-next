import React from 'react';
import { FaBookOpen, FaUndo } from 'react-icons/fa';

const BooksEmptyState = ({ onReset }) => {
    return (
        <div className="text-center py-20 px-4">
            {/* Illustration using CSS/SVG or Icons */}
            <div className="inline-flex items-center justify-center w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-full mb-6 relative">
                <FaBookOpen className="text-5xl text-gray-400 dark:text-gray-500" />
                <div className="absolute top-0 right-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg font-bold">?</span>
                </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                لم يتم العثور على كتب
            </h3>

            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8 text-lg">
                للأسف، لم نتمكن من العثور على كتب تطابق معايير البحث الخاصة بك. جرب البحث بكلمات مختلفة أو إزالة الفلاتر.
            </p>

            <button
                onClick={onReset}
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg font-semibold"
            >
                <FaUndo />
                <span>إعادة تعيين الفلاتر</span>
            </button>
        </div>
    );
};

export default BooksEmptyState;
