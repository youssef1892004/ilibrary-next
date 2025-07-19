// src/components/Navbar.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useLanguage } from "@/context/LanguageContext";
import { FaBars, FaTimes, FaHeart, FaBookmark } from "react-icons/fa"; // 1. إضافة أيقونة جديدة
import ThemeSwitcher from "@/context/ThemeSwitcher";
import ReadingHistoryDropdown from "./ReadingHistoryDropdown"; // 2. استيراد المكون الجديد

const NavLink = ({ href, children, onClick }) => (
  <Link href={href} onClick={onClick} className="nav-link">
    {children}
  </Link>
);

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // --- بداية التعديلات ---
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const historyRef = useRef(null);
  // --- نهاية التعديلات ---

  const { user, logout, isLoading } = useAuth();
  const { favorites } = useFavorites();
  const { t } = useLanguage();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- بداية التعديلات: منطق إغلاق القائمة عند الضغط خارجها ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (historyRef.current && !historyRef.current.contains(event.target)) {
        setIsHistoryOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  // --- نهاية التعديلات ---

  const navLinks = [
    { href: "/", label: t.home || "الرئيسية" },
    { href: "/books", label: t.books || "الكتب" },
    { href: "/about", label: t.about || "عن الموقع" },
    { href: "/writers", label: t.writers || "احدث الكتاب" },
  ];

  return (
    <header className="bg-gray-800 dark:bg-gray-900 text-white transition-colors w-full fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
              <Image 
                src="/logo.png" 
                alt="iLibrary Logo" 
                width={105}
                height={35}
                priority 
              />
            </Link>
          </div>

          <nav className="hidden md:flex flex-grow justify-center items-center gap-10">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href}>{link.label}</NavLink>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-4 sm:gap-5">
            <ThemeSwitcher/>
            
            <Link href="/favorites" className="icon-button relative">
              <FaHeart className="hover:text-red-500" size={24} />
              {favorites.length > 0 && (
                <span className="fav-badge">{favorites.length}</span>
              )}
            </Link>

            {/* --- بداية التعديلات: إضافة أيقونة سجل القراءة --- */}
            {user && (
              <div className="relative" ref={historyRef}>
                <button 
                  onClick={() => setIsHistoryOpen(!isHistoryOpen)} 
                  className="icon-button"
                  aria-label="سجل القراءة"
                >
                  <FaBookmark size={22} />
                </button>
                {isHistoryOpen && <ReadingHistoryDropdown />}
              </div>
            )}
            {/* --- نهاية التعديلات --- */}

            <div className="hidden sm:flex items-center gap-4">
              {isLoading ? (
                <div className="h-9 w-24 bg-gray-700 rounded-lg animate-pulse"></div>
              ) : user ? (
                <div className="flex items-center gap-3">
                  <Link href="/profile" className="font-semibold hover:text-purple-400 transition-colors">
                    {user.displayName || user.email}
                  </Link>
                  <button onClick={logout} className="btn-primary-outline">
                    {t.logout || "خروج"}
                  </button>
                </div>
              ) : (
                <Link href="/auth" className="btn-primary-outline">
                  {t.login || "دخول"}
                </Link>
              )}
            </div>
            
            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="icon-button">
                {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800 dark:bg-gray-900 border-t border-gray-700">
          {/* ... (الكود هنا يبقى كما هو) ... */}
        </div>
      )}
    </header>
  );
}