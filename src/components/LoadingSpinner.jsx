import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            {/* Spinner */}
            <div className="relative w-16 h-16">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-purple-200 rounded-full dark:border-purple-900 opacity-50"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-purple-600 rounded-full animate-spin border-t-transparent shadow-lg dark:border-purple-400"></div>
            </div>

            {/* Loading Text */}
            <p className="text-lg font-medium text-gray-600 dark:text-gray-300 animate-pulse">
                جاري التحميل...
            </p>
        </div>
    );
};

export default LoadingSpinner;
