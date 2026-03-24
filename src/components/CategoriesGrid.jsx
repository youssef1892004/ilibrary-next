"use client";

import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Link from 'next/link';
import { FaLayerGroup, FaArrowLeft } from 'react-icons/fa';

const GET_CATEGORIES = gql`
  query GetCategoriesForGrid {
    libaray_Category(order_by: {name: asc}, limit: 8) {
      id
      name
    }
  }
`;

const CategoriesGrid = () => {
    const { loading, error, data } = useQuery(GET_CATEGORIES);

    const categories = data?.libaray_Category || [];

    // Modern gradients for cards - Subtle for Light Mode, Vibrant for Dark Mode
    const getGradient = (index) => {
        const gradients = [
            'group-hover:from-purple-500 group-hover:to-indigo-600',
            'group-hover:from-pink-500 group-hover:to-rose-500',
            'group-hover:from-orange-400 group-hover:to-pink-500',
            'group-hover:from-blue-400 group-hover:to-cyan-500',
        ];
        return gradients[index % gradients.length];
    };

    if (loading) return null;
    if (error) return null;
    if (categories.length === 0) return null;

    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        تصفح حسب القسم
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        اختر القسم المفضل لديك واستمتع بآلاف الكتب المجانية
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {categories.map((cat, index) => (
                        <Link
                            key={cat.id}
                            href={`/search?category=${encodeURIComponent(cat.name)}`}
                            className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
                        >
                            {/* Hover Gradient Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(index)} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                            <div className="relative p-6 h-32 flex flex-col justify-between z-10">
                                <FaLayerGroup className="text-2xl text-purple-600 dark:text-purple-400 group-hover:text-white transition-colors duration-300" />
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-lg text-gray-800 dark:text-gray-100 group-hover:text-white transition-colors duration-300">{cat.name}</span>
                                    <FaArrowLeft className="text-white opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="text-center mt-10">
                    <Link
                        href="/search"
                        className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 font-semibold"
                    >
                        <span>عرض جميع الأقسام</span>
                        <FaArrowLeft className="mr-2" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CategoriesGrid;
