import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLanguage } from '../context/LanguageContext';

const Layout = () => {
  const { language, isDarkMode, toggleLanguage, toggleDarkMode } = useLanguage();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar 
        language={language}
        isDarkMode={isDarkMode}
        toggleLanguage={toggleLanguage}
        toggleDarkMode={toggleDarkMode}
      />
      
      <main className="min-h-screen">
        <Outlet />
      </main>
      
      <Footer language={language} />
    </div>
  );
};

export default Layout;

