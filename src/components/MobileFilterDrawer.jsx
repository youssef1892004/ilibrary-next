"use client";

import React from 'react';
import { FaTimes, FaFilter } from 'react-icons/fa';

const MobileFilterDrawer = ({ isOpen, onClose, children }) => {
    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                className={`fixed inset-y-0 right-0 w-80 bg-white dark:bg-gray-900 z-50 transform transition-transform duration-300 ease-in-out lg:hidden shadow-2xl ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
                    <h3 className="font-bold text-lg flex items-center gap-2 text-gray-900 dark:text-white">
                        <FaFilter className="text-purple-600" />
                        تصفية النتائج
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-500 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                    >
                        <FaTimes size={20} />
                    </button>
                </div>

                <div className="p-4 overflow-y-auto h-[calc(100vh-64px)]">
                    {children}
                </div>
            </div>
        </>
    );
};

export default MobileFilterDrawer;
