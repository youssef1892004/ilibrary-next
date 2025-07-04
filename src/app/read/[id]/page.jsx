// src/app/read/[id]/page.jsx
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { novels } from '@/data/novels';
import {
  FaArrowLeft, FaArrowRight, FaPlus, FaMinus,
  FaComment, FaHighlighter, FaTimes
} from 'react-icons/fa';

// دالة مساعدة لتقليل عدد مرات تنفيذ دالة ما (مهمة للأداء)
function debounce(func, delay) {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
}

const BookReaderPage = () => {
  const params = useParams();
  const { id } = params;

  // --- إدارة الحالات (State Management) ---
  const [bookData, setBookData] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [fontSize, setFontSize] = useState(20);
  const [selectedText, setSelectedText] = useState('');
  
  const [comments, setComments] = useState({});
  const [highlights, setHighlights] = useState({});

  const [showCommentModal, setShowCommentModal] = useState(false);
  const [newComment, setNewComment] = useState('');

  // --- تحميل البيانات واستعادة مكان القراءة ---
  useEffect(() => {
    if (id && novels[id]) {
      setBookData(novels[id]);
      const savedPosition = localStorage.getItem(`reading_progress_${id}_${currentChapter}`);
      if (savedPosition) {
        setTimeout(() => window.scrollTo(0, parseInt(savedPosition, 10)), 100);
      }
    }
    setIsLoading(false);
  }, [id, currentChapter]);

  // --- تأثير لمنع النسخ وفحص العنصر مع السماح بالتحديد ---
  useEffect(() => {
    const handleContextmenu = (e) => e.preventDefault();
    const handleKeydown = (e) => {
      // Block F12, Ctrl+Shift+I/J/C, Ctrl+U
      if (e.keyCode === 123 || (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) || (e.ctrlKey && e.keyCode === 85)) {
        e.preventDefault();
      }
      // Block Ctrl+C (Copy)
      if (e.ctrlKey && e.keyCode === 67) {
        e.preventDefault();
      }
    };
    // Block copy event directly
    const handleCopy = (e) => e.preventDefault();

    document.addEventListener('contextmenu', handleContextmenu);
    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('copy', handleCopy);

    return () => {
      document.removeEventListener('contextmenu', handleContextmenu);
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('copy', handleCopy);
    };
  }, []);
  
  // --- تأثير لحفظ مكان القراءة ---
  const savePositionDebounced = useCallback(debounce((position) => {
    localStorage.setItem(`reading_progress_${id}_${currentChapter}`, position);
  }, 500), [id, currentChapter]);

  const handleScroll = () => {
    savePositionDebounced(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [savePositionDebounced]);

  // --- دوال التعليق والتظليل والتنقل ---
  const handleMouseUp = (e) => {
    // نتأكد أن التحديد لم يحدث على الأزرار نفسها
    if (e.target.closest('button')) return;
    
    const selection = window.getSelection().toString().trim();
    if (selection) {
      setSelectedText(selection);
    }
  };

  const addHighlight = () => {
    if (selectedText) {
      setHighlights(prev => ({ ...prev, [selectedText]: true }));
      setSelectedText('');
    }
  };
  
  const addComment = () => {
    if (newComment.trim() && selectedText) {
      setComments(prev => ({ ...prev, [selectedText]: newComment }));
      setNewComment('');
      setSelectedText('');
      setShowCommentModal(false);
    }
  };

  const goToChapter = (chapterIndex) => {
    if (bookData && chapterIndex >= 0 && chapterIndex < bookData.chapters.length) {
      setCurrentChapter(chapterIndex);
    }
  };
  const goToNextChapter = () => goToChapter(currentChapter + 1);
  const goToPrevChapter = () => goToChapter(currentChapter - 1);
  
  const renderParagraphWithHighlights = (paragraphText, key) => {
    const allHighlights = Object.keys(highlights);
    if (allHighlights.length === 0) {
      return <p key={key} className="mb-6 leading-loose">{paragraphText}</p>;
    }
    const regex = new RegExp(`(${allHighlights.map(t => t.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|')})`, 'g');
    const parts = paragraphText.split(regex);
    return (
      <p key={key} className="mb-6 leading-loose">
        {parts.filter(part => part).map((part, index) => 
          allHighlights.includes(part) ? 
          <mark key={index} className="bg-yellow-300 dark:bg-yellow-500/70 rounded px-1">{part}</mark> : 
          <span key={index}>{part}</span>
        )}
      </p>
    );
  };

  // --- منطق العرض الرئيسي ---
  if (isLoading) { return <div className="flex items-center justify-center min-h-screen dark:text-white">جارٍ التحميل...</div>; }
  if (!bookData || !bookData.chapters || bookData.chapters.length === 0) { return <div className="flex items-center justify-center min-h-screen dark:text-white">محتوى الكتاب غير متوفر.</div>; }
  const chapter = bookData.chapters[currentChapter];

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen pt-20">
      <div className="container mx-auto max-w-7xl px-4 my-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <main className="lg:col-span-2 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            <header className="text-center p-6 border-b dark:border-gray-700">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">{bookData.title}</h1>
            </header>
            <div className="sticky top-20 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 flex justify-center items-center gap-4 border-b dark:border-gray-700 text-gray-800 dark:text-white">
              <span>حجم الخط:</span>
              <button onClick={() => setFontSize(s => Math.max(14, s - 2))} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><FaMinus /></button>
              <span>{fontSize}px</span>
              <button onClick={() => setFontSize(s => Math.min(36, s + 2))} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><FaPlus /></button>
            </div>
            {/* onTouchEnd لتفعيل الميزة على الهاتف */}
            <article onMouseUp={handleMouseUp} onTouchEnd={handleMouseUp} className="p-6 md:p-10 text-gray-800 dark:text-gray-200" dir="rtl" style={{ fontSize: `${fontSize}px` }}>
              <h3 className="text-2xl font-bold mb-8 text-center text-purple-600 dark:text-purple-400">{chapter.name}</h3>
              {chapter.content.map((paragraph, index) => renderParagraphWithHighlights(paragraph, index))}
            </article>
            <footer className="flex justify-between items-center p-6 border-t dark:border-gray-700">
              <button onClick={goToPrevChapter} disabled={currentChapter === 0} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"><FaArrowRight /><span>الفصل السابق</span></button>
              <span>{`الفصل ${currentChapter + 1} / ${bookData.chapters.length}`}</span>
              <button onClick={goToNextChapter} disabled={currentChapter === bookData.chapters.length - 1} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"><span>الفصل التالي</span><FaArrowLeft /></button>
            </footer>
          </main>

          {/* الشريط الجانبي: مخفي على الهاتف، ظاهر على الشاشات الكبيرة */}
          <aside className="hidden lg:block lg:col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 h-fit lg:sticky top-24">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">التعليقات</h3>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto mt-4">
              {Object.keys(comments).length > 0 ? (
                Object.entries(comments).map(([text, comment], index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic border-r-2 border-purple-400 pr-2 mb-2">"{text}"</p>
                    <p className="text-gray-800 dark:text-gray-200">{comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400">لا توجد تعليقات بعد. حدد نصًا لإضافة تعليق.</p>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* Floating Tools and Modal */}
      {selectedText && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-30 bg-gray-800 text-white rounded-full shadow-lg p-2 flex items-center gap-3">
            <button onClick={() => setShowCommentModal(true)} title="إضافة تعليق" className="p-3 hover:bg-gray-700 rounded-full"><FaComment /></button>
            <button onClick={addHighlight} title="تسليط الضوء" className="p-3 hover:bg-gray-700 rounded-full"><FaHighlighter /></button>
            <button onClick={() => setSelectedText('')} title="إغلاق" className="p-3 hover:bg-gray-700 rounded-full"><FaTimes /></button>
        </div>
      )}
      {showCommentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowCommentModal(false)}>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">إضافة تعليق</h3>
                <p className="text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded mb-4 italic">"{selectedText}"</p>
                <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} className="w-full p-2 border dark:border-gray-600 rounded-lg bg-transparent" rows="4" placeholder="اكتب تعليقك هنا..."></textarea>
                <div className="mt-4 flex justify-end gap-3">
                    <button onClick={() => setShowCommentModal(false)} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg">إلغاء</button>
                    <button onClick={addComment} className="px-4 py-2 bg-purple-600 text-white rounded-lg">إضافة</button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default BookReaderPage;