import React from 'react';

const BookCardSkeleton = () => {
    return (
        <div className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden h-full animate-pulse border border-gray-100 dark:border-gray-700">
            {/* Cover Image Skeleton */}
            <div className="relative w-full pt-[150%]" style={{ backgroundColor: '#e2e8f0' /* gray-200 */ }}>
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700"></div>
            </div>

            {/* Content Skeleton */}
            <div className="p-4 flex-grow flex flex-col justify-between space-y-3">
                <div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                    <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </div>
            </div>
        </div>
    );
};

export default BookCardSkeleton;
