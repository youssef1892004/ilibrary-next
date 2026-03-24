"use client";

import React from 'react';
import Link from 'next/link';
import { FaTimes, FaBookOpen } from 'react-icons/fa';

const ChapterDrawer = ({ isOpen, onClose, chapters, currentChapterId }) => {
    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-50 transition-opacity backdrop-blur-sm"
                    onClick={onClose}
                />
            )}

            {/* Drawer */}
            <div
                className={`fixed inset-y-0 right-0 w-80 bg-white dark:bg-gray-900 z-50 transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                        <FaBookOpen className="text-purple-600" />
                        فصول الكتاب
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-full transition-colors"
                    >
                        <FaTimes size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                    {chapters.map((chapter) => (
                        <Link
                            key={chapter.id}
                            href={`/read/${chapter.id}`}
                            onClick={onClose}
                            className={`block p-3 mb-2 rounded-lg transition-all ${chapter.id === currentChapterId
                                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 font-bold border-r-4 border-purple-600'
                                    : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                                }`}
                        >
                            <div className="flex justify-between items-center">
                                <span className="text-sm">الفصل {chapter.chapter_num}</span>
                            </div>
                            <div className="text-base truncate mt-1">{chapter.title}</div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ChapterDrawer;
