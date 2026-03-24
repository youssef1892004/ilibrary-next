// src/components/BookDetails.jsx
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { FaUserAlt, FaCalendarAlt, FaBook, FaBarcode, FaFileAlt, FaTag, FaBookmark, FaShareAlt, FaHeart, FaRegHeart, FaArrowRight } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useDbFavorites } from '@/hooks/useDbFavorites';
import toast from 'react-hot-toast';
import RelatedBooks from '@/components/RelatedBooks';

const BookDetails = ({ book }) => {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const { addFavorite, removeFavorite, isFavorite, loading: favoritesLoading } = useDbFavorites();

  const favoriteStatus = isFavorite(book.id);

  // Read "Continue Reading" from URL
  const continueFromChapterLabel = searchParams.get('continue_from');
  let targetChapterLabel = continueFromChapterLabel;
  try {
    if (continueFromChapterLabel && continueFromChapterLabel.startsWith('{')) {
      const parsed = JSON.parse(continueFromChapterLabel);
      targetChapterLabel = parsed.label;
    }
  } catch (e) { }

  const author = book.Book_Author?.[0];
  const category = book.book_category?.[0];
  const chapters = book.Bookchapters || [];

  const continueChapterObject = targetChapterLabel
    ? chapters.find(ch => `الفصل ${ch.chapter_num}` === targetChapterLabel)
    : null;

  const handleFavoriteClick = () => {
    if (!user) {
      toast.error("يرجى تسجيل الدخول أولاً لإضافة الكتب إلى المفضلة.");
      return;
    }
    if (favoriteStatus) {
      removeFavorite(book.id);
    } else {
      addFavorite(book.id);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: book.title,
          text: `اقرأ كتاب ${book.title} على مكتبة معجم`,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("تم نسخ الرابط الحافظة!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Hero Section with Blurry Backdrop */}
      <div className="relative w-full h-[350px] md:h-[500px] overflow-hidden">
        {/* Background Image with Blur */}
        <div className="absolute inset-0">
          <Image
            src={book.coverImage || 'https://placehold.co/400x600/e2e8f0/4a5568?text=No+Image'}
            alt=""
            fill
            className="object-cover blur-3xl opacity-50 dark:opacity-30 scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-gray-900 via-transparent to-black/30" />
        </div>

        <div className="absolute top-4 right-4 md:top-6 md:right-6 z-10">
          <Link href="/books" className="flex items-center gap-2 text-white/90 hover:text-white bg-black/20 hover:bg-black/40 px-3 py-1.5 md:px-4 md:py-2 rounded-full backdrop-blur-sm transition-all text-sm md:text-base">
            <FaArrowRight />
            <span>العودة للكتب</span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-60 md:-mt-80 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Main Book Cover & Actions */}
          <div className="lg:w-1/3 flex flex-col items-center">
            <div className="relative w-48 md:w-64 lg:w-80 aspect-[2/3] rounded-xl shadow-2xl overflow-hidden border-4 border-white dark:border-gray-800">
              <Image
                src={book.coverImage || 'https://placehold.co/400x600/e2e8f0/4a5568?text=No+Image'}
                alt={book.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="flex gap-3 md:gap-4 mt-6 w-full max-w-sm justify-center">
              <button
                onClick={handleFavoriteClick}
                disabled={favoritesLoading}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 md:px-6 rounded-xl font-bold transition-all transform active:scale-95 shadow-lg text-sm md:text-base ${favoriteStatus
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
              >
                {favoriteStatus ? <FaHeart /> : <FaRegHeart />}
                <span>{favoriteStatus ? 'في المفضلة' : 'أضف للمفضلة'}</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 py-3 px-4 md:px-6 rounded-xl font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-all transform active:scale-95 shadow-sm"
              >
                <FaShareAlt />
              </button>
            </div>

            {/* Read Button */}
            <div className="mt-4 w-full max-w-sm">
              <Link
                href={continueChapterObject ? `/read/${continueChapterObject.id}` : (chapters[0] ? `/read/${chapters[0].id}` : '#')}
                className={`flex items-center justify-center gap-3 w-full py-3 md:py-4 rounded-xl text-base md:text-lg font-bold shadow-xl transition-all transform hover:-translate-y-1 ${chapters.length > 0
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-purple-500/30'
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                  }`}
              >
                {continueChapterObject ? <FaBookmark /> : <FaBook />}
                <span>
                  {continueChapterObject
                    ? `أكمل القراءة: الفصل ${continueChapterObject.chapter_num}`
                    : (chapters.length > 0 ? 'ابدأ القراءة الآن' : 'لا تتوفر فصول حالياً')}
                </span>
              </Link>
            </div>
          </div>

          {/* Book Info */}
          <div className="lg:w-2/3 mt-8 lg:mt-0">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 md:p-10 shadow-xl border border-white/20 dark:border-gray-700/50">
              {category && (
                <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 mb-4">
                  <FaTag size={10} />
                  {category.name}
                </span>
              )}

              <h1 className="text-2xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 leading-tight">
                {book.title}
              </h1>

              {author && (
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <FaUserAlt />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase">تأليف</p>
                    <Link href={`/writers/${author.id}`} className="text-base md:text-lg font-bold text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                      {author.name}
                    </Link>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6 mb-8 py-6 border-y border-gray-100 dark:border-gray-700/50">
                <div className="text-center sm:text-right">
                  <p className="flex items-center gap-2 text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-1 justify-center sm:justify-start">
                    <FaCalendarAlt className="text-purple-500" />
                    تاريخ النشر
                  </p>
                  <p className="font-bold text-gray-900 dark:text-white text-sm md:text-base">{book.publicationDate ? new Date(book.publicationDate).getFullYear() : 'غير معروف'}</p>
                </div>
                <div className="text-center sm:text-right">
                  <p className="flex items-center gap-2 text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-1 justify-center sm:justify-start">
                    <FaFileAlt className="text-purple-500" />
                    عدد الصفحات
                  </p>
                  <p className="font-bold text-gray-900 dark:text-white text-sm md:text-base">{book.total_pages || '-'}</p>
                </div>
                <div className="text-center sm:text-right col-span-2 sm:col-span-1">
                  <p className="flex items-center gap-2 text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-1 justify-center sm:justify-start">
                    <FaBarcode className="text-purple-500" />
                    ISBN
                  </p>
                  <p className="font-bold text-gray-900 dark:text-white font-mono text-xs md:text-sm">{book.ISBN || '-'}</p>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed mb-10 text-sm md:text-base">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3">نبذة عن الكتاب</h3>
                <p>{book.description || "لا يوجد وصف متاح لهذا الكتاب."}</p>
              </div>

              {/* Chapters Section */}
              <div className="mt-8">
                <h3 className="flex items-center gap-2 text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-6">
                  <FaBook className="text-purple-500" />
                  فصول الكتاب
                  <span className="text-xs font-normal text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">{chapters.length}</span>
                </h3>

                {chapters.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                    {chapters.map((chapter) => (
                      <Link
                        href={`/read/${chapter.id}`}
                        key={chapter.id}
                        className="group flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-all"
                      >
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/50 flex items-center justify-center text-xs font-bold text-gray-500 group-hover:text-purple-600 dark:text-gray-400 dark:group-hover:text-purple-400 transition-colors">
                          {chapter.chapter_num}
                        </span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-purple-700 dark:group-hover:text-purple-300 truncate">
                          {chapter.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                    <p className="text-gray-500">لا توجد فصول متاحة حالياً.</p>
                  </div>
                )}
              </div>

              {/* Related Books */}
              <RelatedBooks categoryId={category?.id} currentBookId={book.id} />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;