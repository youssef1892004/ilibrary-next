// src/app/read/[id]/page.jsx
"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'next/navigation';
import { FaArrowLeft, FaArrowRight, FaBook, FaMinus, FaPlus, FaAlignRight, FaAlignCenter, FaHome, FaSave, FaList, FaExpand, FaCompress } from 'react-icons/fa';
import Link from 'next/link';
import { useReadingHistory } from '@/hooks/useReadingHistory';
import { useReadingSettings } from '@/context/ReadingSettingsContext';
import ReadingControls from '@/components/ReadingControls';
import ChapterDrawer from '@/components/ChapterDrawer';
import { useAuth } from '@/context/AuthContext';

// الاستعلام لجلب آخر مكان للمستخدم في هذا الكتاب
const GET_MY_READING_HISTORY = gql`
  query GetMyReadingHistory($userId: uuid!, $bookId: uuid!) {
    libaray_Reading_history(
      where: { user_id: { _eq: $userId }, book_id: { _eq: $bookId } }
      limit: 1
    ) {
      last_read
    }
  }
`;

// الاستعلام الأول: لجلب محتوى الفصل ومعرّف الكتاب (book__id)
const GET_CHAPTER_CONTENT = gql`
  query GetChapterContent($id: uuid!) {
    libaray_Chapter_by_pk(id: $id) {
      id
      title
      content
      chapter_num
      book__id
    }
  }
`;

// الاستعلام الثاني: لجلب بيانات الكتاب والفصول الأخرى للتنقل
const GET_BOOK_NAVIGATION = gql`
  query GetBookNavigation($bookId: uuid!) {
    libaray_Book_by_pk(id: $bookId) {
      id
      title
      Bookchapters(order_by: { chapter_num: asc }) {
        id
        title
        chapter_num
      }
    }
  }
`;

const ReadPage = () => {
  const params = useParams();
  const { user } = useAuth();
  const { saveProgress } = useReadingHistory();
  const { settings } = useReadingSettings();

  const [textAlign, setTextAlign] = useState('text-right');
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isImmersive, setIsImmersive] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  const lastScrollY = useRef(0);
  const saveTimeoutRef = useRef(null);
  const [saveStatus, setSaveStatus] = useState('');

  // تنفيذ الاستعلام الأول
  const { data: chapterData, loading: chapterLoading, error: chapterError } = useQuery(GET_CHAPTER_CONTENT, {
    variables: { id: params.id },
    skip: !params.id,
  });

  const chapter = chapterData?.libaray_Chapter_by_pk;
  const bookId = chapter?.book__id;

  // تنفيذ الاستعلام الثاني
  const { data: bookData, loading: bookLoading, error: bookError } = useQuery(GET_BOOK_NAVIGATION, {
    variables: { bookId: bookId },
    skip: !bookId,
  });

  const book = bookData?.libaray_Book_by_pk;
  const allChapters = book?.Bookchapters || [];

  const loading = chapterLoading || bookLoading;
  const error = chapterError || bookError;

  // Fetch Reading History
  const { data: historyData } = useQuery(GET_MY_READING_HISTORY, {
    variables: { userId: user?.id, bookId: bookId },
    skip: !user || !bookId,
    fetchPolicy: 'network-only'
  });

  // Restore Scroll Position
  useEffect(() => {
    if (!historyData?.libaray_Reading_history?.[0] || !chapter) return;

    const history = historyData.libaray_Reading_history[0];

    try {
      if (history.last_read && history.last_read.startsWith('{')) {
        const parsed = JSON.parse(history.last_read);
        if (parsed.chapterId === chapter.id) {
          if (parsed.position) {
            window.scrollTo({ top: parsed.position, behavior: 'smooth' });
            setSaveStatus('تم استعادة مكان القراءة');
            setTimeout(() => setSaveStatus(''), 3000);
          }
        }
      }
    } catch (e) {
      console.error("Failed to parse history for resume", e);
    }
  }, [historyData, chapter]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (currentScrollY / totalHeight) * 100 : 0;
      setReadingProgress(Math.min(100, Math.max(0, progress)));

      // Auto-save logic (Debounced)
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

      saveTimeoutRef.current = setTimeout(() => {
        if (bookId && chapter?.chapter_num) {
          handleSaveProgress(true); // true = silent mode
        }
      }, 2000);

      if (!isImmersive) {
        if (currentScrollY < 100) {
          setIsNavVisible(true);
        } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          setIsNavVisible(false);
        } else {
          setIsNavVisible(true);
        }
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [bookId, chapter, isImmersive]);

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

  const handleSaveProgress = useCallback((silent = false) => {
    if (!bookId || !chapter?.chapter_num) return;

    if (!silent) setSaveStatus('جاري الحفظ...');

    const chapterLabel = `الفصل ${chapter.chapter_num}`;
    const scrollY = window.scrollY;

    saveProgress(bookId, chapterLabel, chapter.id, scrollY);

    if (!silent) {
      setTimeout(() => {
        setSaveStatus('تم الحفظ بنجاح!');
        setTimeout(() => setSaveStatus(''), 2000);
      }, 1000);
    }
  }, [bookId, chapter, saveProgress]);

  const toggleImmersive = () => {
    setIsImmersive(!isImmersive);
    setIsNavVisible(isImmersive); // If turning OFF immersive, show nav
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900"><p className="text-xl animate-pulse">جاري تحميل الفصل...</p></div>;
  }
  if (error) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900"><h1 className="text-3xl font-bold text-red-500">الفصل غير موجود أو حدث خطأ.</h1></div>;
  }
  if (!chapter) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900"><h1 className="text-3xl font-bold">لم يتم العثور على الفصل.</h1></div>;
  }

  const currentIndex = allChapters.findIndex(ch => ch.id === chapter.id);
  const prevChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null;

  const renderContent = () => {
    const content = chapter?.content;
    if (!content) {
      return <p className="text-gray-400">لا يوجد محتوى لعرضه في هذا الفصل.</p>;
    }
    try {
      if (typeof content === 'string') {
        const parsedContent = JSON.parse(content);
        return parsedContent ? <>{parsedContent}</> : <p className="text-gray-400">لا يوجد محتوى لعرضه.</p>;
      }
      if (Array.isArray(content)) {
        if (content.length === 0) return <p className="text-gray-400">لا يوجد محتوى لعرضه في هذا الفصل.</p>;
        return content.map((paragraph, index) => <p key={index} className="mb-6">{paragraph}</p>);
      }
    } catch (e) {
      return <p>{content}</p>;
    }
    return <p className="text-red-500">صيغة محتوى هذا الفصل غير مدعومة.</p>;
  };

  return (
    <div
      dir="rtl"
      className={`min-h-screen transition-colors duration-300 ${settings.fontFamily === 'Amiri' ? 'font-amiri' : 'font-tajawal'}`}
      style={{ backgroundColor: settings.theme === 'light' ? '#f3f4f6' : settings.theme === 'dark' ? '#111827' : '#f4ecd8' }}
    >
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800 z-50">
        <div
          className="h-full bg-purple-600 transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <nav className={`fixed top-0 left-0 right-0 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm transition-transform duration-300 ${!isImmersive && isNavVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container mx-auto max-w-5xl px-5 py-3 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              <FaList />
              <span className="hidden sm:inline">الفصول</span>
            </button>
          </div>

          <h1 className="text-sm md:text-lg font-bold truncate max-w-[150px] md:max-w-xs text-gray-800 dark:text-gray-100">
            {chapter.title}
          </h1>

          <div className="flex items-center gap-4">
            <button onClick={toggleImmersive} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300" title="وضع الانغماس">
              {isImmersive ? <FaCompress /> : <FaExpand />}
            </button>

            <Link href="/" className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
              <FaHome size={20} />
            </Link>
          </div>
        </div>
      </nav>

      <main className={`container mx-auto max-w-3xl px-4 sm:px-6 pb-24 transition-all duration-500 ${isImmersive ? 'pt-12' : 'pt-24'}`}>
        {!isImmersive && (
          <header className="mb-10 text-center">
            <h1
              className="text-3xl md:text-4xl font-extrabold"
              style={{ color: settings.theme === 'dark' ? '#ffffff' : '#1f2937' }}
            >
              {chapter.title}
            </h1>
            <p className="text-md text-gray-500 mt-2">الفصل رقم {chapter.chapter_num}</p>
          </header>
        )}

        <article
          className={`chapter-content select-none p-6 sm:p-12 rounded-lg shadow-sm ${textAlign} transition-all duration-300`}
          style={{
            fontSize: `${settings.fontSize}px`,
            lineHeight: settings.lineHeight,
            fontFamily: settings.fontFamily === 'Amiri' ? '"Amiri", serif' : '"Tajawal", sans-serif',
            backgroundColor: settings.theme === 'light' ? '#ffffff' : settings.theme === 'dark' ? '#1f2937' : '#fdf6e3',
            color: settings.theme === 'dark' ? '#e5e7eb' : '#374151',
            boxShadow: isImmersive ? 'none' : undefined
          }}
        >
          {renderContent()}
        </article>
      </main>

      {/* Floating Controls */}
      {!isImmersive && <ReadingControls />}

      {/* Immersive Exit Button (Visible only when immersive) */}
      {isImmersive && (
        <button
          onClick={toggleImmersive}
          className="fixed bottom-6 right-6 z-50 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 backdrop-blur-sm transition-all shadow-lg"
        >
          <FaCompress size={20} />
        </button>
      )}

      <footer className={`fixed bottom-0 left-0 right-0 z-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-top transition-transform duration-300 ${!isImmersive && isNavVisible ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="container mx-auto max-w-5xl px-4 py-4 flex justify-between items-center">
          {nextChapter ? (
            <Link href={`/read/${nextChapter.id}`} className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm md:text-base">
              <span>التالي</span>
              <FaArrowLeft />
            </Link>
          ) : <div className="w-24"></div>}

          <div className="flex flex-col items-center">
            <div className="flex gap-2">
              <button onClick={() => setTextAlign('text-right')} className={`p-2 rounded-md ${textAlign === 'text-right' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' : 'text-gray-500'}`}>
                <FaAlignRight />
              </button>
              <button onClick={() => setTextAlign('text-center')} className={`p-2 rounded-md ${textAlign === 'text-center' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' : 'text-gray-500'}`}>
                <FaAlignCenter />
              </button>
            </div>
          </div>

          {prevChapter ? (
            <Link href={`/read/${prevChapter.id}`} className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 text-sm md:text-base">
              <FaArrowRight />
              <span>السابق</span>
            </Link>
          ) : <div className="w-24"></div>}
        </div>
      </footer>

      <ChapterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        chapters={allChapters}
        currentChapterId={chapter.id}
      />
    </div>
  );
};

export default ReadPage;