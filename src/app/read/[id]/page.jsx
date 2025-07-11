// src/app/read/[id]/page.jsx
"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'next/navigation';
import { FaArrowLeft, FaArrowRight, FaBook, FaMinus, FaPlus, FaAlignRight, FaAlignCenter, FaHome } from 'react-icons/fa';
import Link from 'next/link';
import { useReadingProgress } from '@/context/ReadingProgressContext';

const GET_CHAPTER_DETAILS = gql`
  query GetChapterDetails($id: uuid!) {
    ilibarary_Chapter_by_pk(id: $id) {
      id
      title
      content
      chapter_num
      Book {
        id
        title
        Chapters(order_by: { chapter_num: asc }) {
          id
          chapter_num
        }
      }
    }
  }
`;

const ReadPage = () => {
  const params = useParams();
  const { saveProgress } = useReadingProgress();

  const [fontSize, setFontSize] = useState(20);
  const [textAlign, setTextAlign] = useState('text-right');
  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollY = useRef(0);

  const { loading, error, data } = useQuery(GET_CHAPTER_DETAILS, {
    variables: { id: params.id },
    skip: !params.id,
  });

  const chapter = data?.ilibarary_Chapter_by_pk;
  const book = chapter?.Book;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 100) {
        setIsNavVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);
    const handleKeyDown = (e) => {
      if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') || (e.ctrlKey && e.key === 'c')) {
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (book?.id && chapter?.id) {
      saveProgress(book.id, chapter.id);
    }
  }, [book?.id, chapter?.id, saveProgress]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900"><p className="text-xl animate-pulse">جاري تحميل الفصل...</p></div>;
  }
  if (error || !chapter) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900"><h1 className="text-3xl font-bold text-red-500">الفصل غير موجود أو حدث خطأ.</h1></div>;
  }

  const allChapters = chapter.Book.Chapters;
  const currentIndex = allChapters.findIndex(ch => ch.id === chapter.id);
  const prevChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null;

  const renderContent = () => {
    try {
      if (typeof chapter.content === 'string') {
        const parsedContent = JSON.parse(chapter.content);
        return <>{parsedContent}</>;
      }
      if (Array.isArray(chapter.content)) {
        return chapter.content.map((paragraph, index) => <p key={index} className="mb-6">{paragraph}</p>);
      }
    } catch (e) {
      return <p>{chapter.content}</p>;
    }
    return <p className="text-red-500">محتوى هذا الفصل غير قابل للعرض.</p>;
  };

  return (
    <div dir="rtl" className="font-tajawal bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen">
      
      <nav className={`fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm transition-transform duration-300 ${isNavVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container mx-auto max-w-5xl px-5 py-3 flex justify-between items-center">
          <Link href={`/books/${book?.id}`} className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
            <FaBook />
            <span>فهرس الكتاب</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <button onClick={() => setTextAlign('text-right')} className={`p-2 rounded-md ${textAlign === 'text-right' ? 'bg-purple-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`} aria-label="محاذاة لليمين">
              <FaAlignRight />
            </button>
            <button onClick={() => setTextAlign('text-center')} className={`p-2 rounded-md ${textAlign === 'text-center' ? 'bg-purple-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`} aria-label="توسيط">
              <FaAlignCenter />
            </button>
            <button onClick={() => setFontSize(s => Math.max(12, s - 2))} className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full" aria-label="تصغير الخط">
              <FaMinus />
            </button>
            <span className="w-10 text-center font-semibold">{fontSize}px</span>
            <button onClick={() => setFontSize(s => Math.min(40, s + 2))} className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full" aria-label="تكبير الخط">
              <FaPlus />
            </button>
          </div>

          <Link href="/" className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
            <span>الرئيسية</span>
            <FaHome />
          </Link>
        </div>
      </nav>

      <main className="container mx-auto max-w-3xl px-4 sm:px-6 pt-24 pb-24">
        <header className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
                {chapter.title}
            </h1>
            <p className="text-md text-gray-500 dark:text-gray-400 mt-2">الفصل رقم {chapter.chapter_num}</p>
        </header>

        <article 
          className={`chapter-content select-none bg-white dark:bg-gray-800 p-8 sm:p-12 rounded-lg shadow-lg transition-all duration-300 ${textAlign}`}
          style={{ fontSize: `${fontSize}px`, lineHeight: 1.8 }}
        >
          {renderContent()}
        </article>
      </main>

      <footer className={`fixed bottom-0 left-0 right-0 z-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-top transition-transform duration-300 ${isNavVisible ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="container mx-auto max-w-5xl px-4 py-4 flex justify-between items-center">
            {nextChapter ? (
              <Link href={`/read/${nextChapter.id}`} className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  <span>الفصل التالي</span>
                  <FaArrowLeft />
              </Link>
            ) : <div className="w-36"></div>}
            
            <span className="font-bold text-gray-700 dark:text-gray-300 truncate px-4">
              {chapter.Book.title}
            </span>

            {prevChapter ? (
              <Link href={`/read/${prevChapter.id}`} className="flex items-center gap-2 px-6 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">
                  <FaArrowRight />
                  <span>الفصل السابق</span>
              </Link>
            ) : <div className="w-36"></div>}
        </div>
      </footer>
    </div>
  );
};

export default ReadPage;