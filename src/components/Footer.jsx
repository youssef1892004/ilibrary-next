// src/components/Footer.jsx
"use client";

import React from 'react';
import Link from 'next/link'; // استخدام Link من Next.js
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    // تم إزالة mt-16 لترك التحكم في المسافات للصفحة الرئيسية
    <footer className="bg-gray-800 dark:bg-gray-900 text-white transition-colors">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-right">
          
          {/* Logo and Description */}
          <div>
            <h3 className="text-xl font-bold text-white mb-2">ilibrary</h3>
            <p className="text-gray-400 text-sm">
              {t.footerSlogan || "بوابتك إلى المعرفة العربية الأصيلة"}
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors">{t.home || "الرئيسية"}</Link>
              <Link href="/books" className="text-gray-400 hover:text-white transition-colors">{t.books || "الكتب"}</Link>
              <Link href="/writers" className="text-gray-400 hover:text-white transition-colors">{t.writers || "الكُتّاب"}</Link>
              <Link href="/about" className="text-gray-400 hover:text-white transition-colors">{t.about || "عن الموقع"}</Link>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-left">
            <div className="flex justify-center md:justify-start gap-3">
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-gray-700 hover:bg-purple-600 rounded-full flex items-center justify-center transition-colors">
                <FaFacebookF size={14} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-gray-700 hover:bg-purple-600 rounded-full flex items-center justify-center transition-colors">
                <FaTwitter size={14} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-gray-700 hover:bg-purple-600 rounded-full flex items-center justify-center transition-colors">
                <FaInstagram size={14} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-gray-700 hover:bg-purple-600 rounded-full flex items-center justify-center transition-colors">
                <FaLinkedinIn size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-sm">
            {t.copyright || `جميع الحقوق محفوظة © ${currentYear} لموقع iLibrary.`}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;