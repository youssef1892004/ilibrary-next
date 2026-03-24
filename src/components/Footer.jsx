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
            <h3 className="text-xl font-bold text-white mb-2">Muejam Library</h3>
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
              <Link href="/search" className="text-gray-400 hover:text-white transition-colors">البحث</Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">اتصل بنا</Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">الخصوصية</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">الشروط</Link>
            </div>
          </div>

          {/* Sister Sites */}
          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold mb-3">مواقعنا الأخرى</h4>
            <div className="flex flex-col gap-2 text-sm">
              <a href="https://muejam.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center justify-center md:justify-start gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                الموقع الأساسي (Muejam.com)
              </a>
              <a href="https://studio.muejam.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center justify-center md:justify-start gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                استوديو معجم (Muejam Studio)
              </a>
            </div>

            <p className="text-gray-400 text-sm mt-6 mb-3">يمكنك متابعتنا علي الفيس بوك:</p>
            <div className="flex justify-center md:justify-start gap-3">
              <a href="https://www.facebook.com/lib7ary/" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook" className="w-9 h-9 bg-gray-700 hover:bg-purple-600 rounded-full flex items-center justify-center transition-colors">
                <FaFacebookF size={14} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Twitter" className="w-9 h-9 bg-gray-700 hover:bg-purple-600 rounded-full flex items-center justify-center transition-colors">
                <FaTwitter size={14} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram" className="w-9 h-9 bg-gray-700 hover:bg-purple-600 rounded-full flex items-center justify-center transition-colors">
                <FaInstagram size={14} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Follow us on LinkedIn" className="w-9 h-9 bg-gray-700 hover:bg-purple-600 rounded-full flex items-center justify-center transition-colors">
                <FaLinkedinIn size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-sm">
            {t.copyright || `جميع الحقوق محفوظة © ${currentYear} لموقع Muejam Library.`}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;