// src/components/Navbar.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { FaMoon, FaSun, FaBars, FaTimes, FaHeart } from "react-icons/fa";

const NavLink = ({ href, children, onClick }) => (
  <Link href={href} onClick={onClick} className="nav-link">
    {children}
  </Link>
);

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { favorites } = useFavorites();
  const { language, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
            <button onClick={toggleTheme} className="icon-button" aria-label="Toggle theme">
              {theme === 'dark' ? <FaSun className="text-yellow-400" size={22} /> : <FaMoon className="text-gray-200" size={22} />}
            </button>
            
            <Link href="/favorites" className="icon-button relative">
              <FaHeart className="hover:text-red-500" size={24} />
              {favorites.length > 0 && (
                <span className="fav-badge">{favorites.length}</span>
              )}
            </Link>

            <div className="hidden sm:flex items-center gap-4">
              {user ? (
                <button onClick={logout} className="btn-primary-outline">
                  {t.logout || "خروج"}
                </button>
              ) : (
                <>
                  <Link href="/auth" className="btn-primary-outline">
                    {t.login || "دخول"}
                  </Link>
                  <Link href="/auth" className="btn-primary-solid">
                    {t.signup || "تسجيل"}
                  </Link>
                </>
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

      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800 dark:bg-gray-900 border-t border-gray-700">
          <nav className="flex flex-col p-4 space-y-2">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)}>{link.label}</NavLink>
            ))}
             <div className="border-t border-gray-700 pt-4 mt-2 space-y-3">
                {user ? (
                    <>
                      <p className="px-2 text-base font-medium mb-3">مرحباً، {user.name}</p>
                      <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="w-full btn-primary-outline">
                        {t.logout || "خروج"}
                      </button>
                    </>
                ) : (
                    <>
                      <Link href="/auth" className="block w-full btn-primary-outline text-center" onClick={() => setIsMobileMenuOpen(false)}>
                        {t.login || "دخول"}
                      </Link>
                      <Link href="/auth" className="block w-full btn-primary-solid text-center" onClick={() => setIsMobileMenuOpen(false)}>
                        {t.signup || "تسجيل"}
                      </Link>
                    </>
                )}
             </div>
          </nav>
        </div>
      )}
    </header>
  );
}