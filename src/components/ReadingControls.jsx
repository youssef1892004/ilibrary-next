'use client';

import React from 'react';
import { useReadingSettings } from '@/context/ReadingSettingsContext';
import { FaMinus, FaPlus, FaPalette, FaFont, FaAlignJustify } from 'react-icons/fa';

export default function ReadingControls() {
    const { settings, updateSetting, isLoaded } = useReadingSettings();

    if (!isLoaded) return null;

    const themes = [
        { id: 'light', bg: '#ffffff', text: '#1f2937', name: 'أبيض' },
        { id: 'sepia', bg: '#f4ecd8', text: '#5b4636', name: 'ورقي' },
        { id: 'dark', bg: '#1f2937', text: '#f3f4f6', name: 'داكن' },
    ];

    return (
        <div className="fixed bottom-20 left-2 right-2 md:left-1/2 md:right-auto md:transform md:-translate-x-1/2 bg-white dark:bg-gray-800 shadow-2xl rounded-2xl md:rounded-full px-3 md:px-6 py-2 md:py-3 z-50 border border-gray-200 dark:border-gray-700 transition-all duration-300 overflow-x-auto">
            <div className="flex items-center gap-3 md:gap-6 min-w-max">

                {/* Font Size Controls */}
                <div className="flex items-center gap-2 md:gap-3 border-l pl-3 md:pl-4 border-gray-300 dark:border-gray-600">
                    <button
                        onClick={() => updateSetting('fontSize', Math.max(14, settings.fontSize - 2))}
                        className="p-1.5 md:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-700 dark:text-gray-300"
                        aria-label="تصغير الخط"
                    >
                        <FaMinus size={10} />
                    </button>
                    <span className="text-xs md:text-sm font-bold w-5 md:w-6 text-center">{settings.fontSize}</span>
                    <button
                        onClick={() => updateSetting('fontSize', Math.min(32, settings.fontSize + 2))}
                        className="p-1.5 md:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-700 dark:text-gray-300"
                        aria-label="تكبير الخط"
                    >
                        <FaPlus size={10} />
                    </button>
                </div>

                {/* Font Family Toggle */}
                <div className="flex items-center gap-1.5 md:gap-2 border-l pl-3 md:pl-4 border-gray-300 dark:border-gray-600">
                    <button
                        onClick={() => updateSetting('fontFamily', 'Tajawal')}
                        className={`px-2 md:px-3 py-1 text-[10px] md:text-xs rounded-full transition-colors font-tajawal ${settings.fontFamily === 'Tajawal' ? 'bg-purple-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                    >
                        نسخ
                    </button>
                    <button
                        onClick={() => updateSetting('fontFamily', 'Amiri')}
                        className={`px-2 md:px-3 py-1 text-[10px] md:text-xs rounded-full transition-colors font-amiri ${settings.fontFamily === 'Amiri' ? 'bg-purple-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                    >
                        رقعة
                    </button>
                </div>


                {/* Line Height Controls */}
                <div className="flex items-center gap-1.5 md:gap-2 border-l pl-3 md:pl-4 border-gray-300 dark:border-gray-600">
                    <button
                        onClick={() => updateSetting('lineHeight', Math.max(1.2, settings.lineHeight - 0.1))}
                        className="p-1.5 md:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-700 dark:text-gray-300"
                        title="تقليل التباعد"
                    >
                        <FaAlignJustify size={10} className="transform rotate-90" />
                    </button>
                    <button
                        onClick={() => updateSetting('lineHeight', Math.min(2.5, settings.lineHeight + 0.1))}
                        className="p-1.5 md:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-700 dark:text-gray-300"
                        title="زيادة التباعد"
                    >
                        <FaAlignJustify size={10} />
                    </button>
                </div>

                {/* Theme Controls */}
                <div className="flex items-center gap-2 md:gap-3">
                    {themes.map((theme) => (
                        <button
                            key={theme.id}
                            onClick={() => updateSetting('theme', theme.id)}
                            className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 transition-transform hover:scale-110 ${settings.theme === theme.id ? 'border-purple-600 scale-110' : 'border-gray-300 dark:border-gray-600'}`}
                            style={{ backgroundColor: theme.bg }}
                            aria-label={`تغيير للوضع ${theme.name}`}
                            title={theme.name}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
