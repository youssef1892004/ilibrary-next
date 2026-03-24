'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const ReadingSettingsContext = createContext();

export const ReadingSettingsProvider = ({ children }) => {
    // Default settings
    const [settings, setSettings] = useState({
        theme: 'light', // 'light', 'dark', 'sepia'
        fontSize: 18,
        fontFamily: 'Tajawal', // 'Tajawal' (Sans) or 'Amiri' (Serif)
        lineHeight: 1.8,
    });

    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const savedSettings = localStorage.getItem('readingSettings');
        if (savedSettings) {
            try {
                setSettings(JSON.parse(savedSettings));
            } catch (e) {
                console.error("Failed to parse reading settings:", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('readingSettings', JSON.stringify(settings));
        }
    }, [settings, isLoaded]);

    const updateSetting = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    return (
        <ReadingSettingsContext.Provider value={{ settings, updateSetting, isLoaded }}>
            {children}
        </ReadingSettingsContext.Provider>
    );
};

export const useReadingSettings = () => useContext(ReadingSettingsContext);
