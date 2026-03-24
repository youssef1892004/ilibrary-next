'use client';

import React from 'react';
import { FaBookOpen, FaUsers, FaCloudDownloadAlt, FaStar } from 'react-icons/fa';

// NOTE: Query disabled to prevent Apollo SSR errors. Using requested marketing numbers.
// const GET_STATS = gql`...`;

export default function FeaturesStats() {
    // const { data, loading, error } = useQuery(GET_STATS, ...);

    // Static marketing data as requested
    const displayBooks = 30; // "+30"
    const displayAuthors = 60; // "+60"

    const stats = [
        {
            id: 1,
            label: 'رواية وكتاب',
            value: `+${displayBooks}`,
            icon: FaBookOpen,
            color: 'text-blue-500',
            bg: 'bg-blue-100 dark:bg-blue-900/30'
        },
        {
            id: 2,
            label: 'كاتب مبدع',
            value: `+${displayAuthors}`,
            icon: FaUsers,
            color: 'text-purple-500',
            bg: 'bg-purple-100 dark:bg-purple-900/30'
        },
        {
            id: 3,
            label: 'تحميل مجاني',
            value: '100%',
            icon: FaCloudDownloadAlt,
            color: 'text-green-500',
            bg: 'bg-green-100 dark:bg-green-900/30'
        },
        {
            id: 4,
            label: 'تقييم القراء',
            value: '4.5/5',
            icon: FaStar,
            color: 'text-yellow-500',
            bg: 'bg-yellow-100 dark:bg-yellow-900/30'
        },
    ];

    return (
        <section className="py-16 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    {stats.map((stat) => (
                        <div key={stat.id} className="p-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300 group">
                            <div className={`inline-flex items-center justify-center p-4 rounded-full mb-4 ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                                <stat.icon size={28} />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                                {stat.value}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 font-medium">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
