// src/components/ReviewModal.jsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useMutation, gql } from '@apollo/client';
import { FaStar, FaTimes } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';

const INSERT_REVIEW_MUTATION = gql`
  mutation InsertReview($rating: Int, $q1_answer: String, $q2_answer: String, $q3_answer: String) {
    insert_ilibarary_Review(objects: {rating: $rating, q1_answer: $q1_answer, q2_answer: $q2_answer, q3_answer: $q3_answer}) {
      affected_rows
    }
  }
`;

const ReviewModal = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [answers, setAnswers] = useState({ q1: '', q2: '', q3: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false); // حالة جديدة لعرض طلب الدخول

  const [insertReview] = useMutation(INSERT_REVIEW_MUTATION);

  const handleAnswerChange = (e) => {
    const { name, value } = e.target;
    setAnswers(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // 1. إذا كان المستخدم زائراً، اظهر له رسالة لتسجيل الدخول
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }
    
    if (rating === 0) {
      setError("الرجاء تحديد تقييمك (من 1 إلى 5 نجوم).");
      return;
    }

    setIsSubmitting(true);
    try {
      await insertReview({
        variables: {
          rating: rating,
          q1_answer: answers.q1,
          q2_answer: answers.q2,
          q3_answer: answers.q3,
        }
      });
      setIsSubmitted(true);
      setTimeout(() => onClose(), 3000);
    } catch (err) {
      console.error("Failed to submit review:", err);
      setError("حدث خطأ أثناء إرسال التقييم. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 sm:p-8 w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-4 left-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
          <FaTimes size={20} />
        </button>

        {isSubmitted ? (
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold text-green-500 mb-4">شكرًا لك!</h2>
            <p className="text-gray-700 dark:text-gray-300">تم استلام تقييمك بنجاح.</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">ما رأيك في تجربت في موقعنا؟</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* حقول التقييم والأسئلة ... لا تغيير هنا */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">ما هو تقييمك العام؟</label>
                <div className="flex justify-center" dir="ltr">
                  {[1, 2, 3, 4, 5].map((star) => <FaStar key={star} size={30} className="cursor-pointer" color={(hoverRating || rating) >= star ? '#ffc107' : '#e4e5e9'} onClick={() => setRating(star)} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)} />)}
                </div>
              </div>
              <div>
                <label htmlFor="q1" className="block text-sm font-medium text-gray-700 dark:text-gray-300">ما الذي أعجبك في الموقع؟</label>
                <textarea id="q1" name="q1" rows="2" value={answers.q1} onChange={handleAnswerChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600"></textarea>
              </div>
              <div>
                <label htmlFor="q2" className="block text-sm font-medium text-gray-700 dark:text-gray-300">هل لديك أي اقتراحات للتطوير؟</label>
                <textarea id="q2" name="q2" rows="2" value={answers.q2} onChange={handleAnswerChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600"></textarea>
              </div>
              <div>
                <label htmlFor="q3" className="block text-sm font-medium text-gray-700 dark:text-gray-300">هل واجهت أي مشاكل؟</label>
                <textarea id="q3" name="q3" rows="2" value={answers.q3} onChange={handleAnswerChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600"></textarea>
              </div>

              {/* 2. عرض رسالة الخطأ أو رسالة طلب الدخول */}
              {showLoginPrompt ? (
                <div className="text-center p-4 border border-yellow-300 bg-yellow-50 dark:bg-gray-700 rounded-lg">
                  <p className="font-semibold text-yellow-800 dark:text-yellow-300">يجب تسجيل الدخول أولاً</p>
                  <p className="text-sm text-yellow-700 dark:text-yellow-400 mb-3">لحفظ تقييمك، يرجى تسجيل الدخول.</p>
                  <Link href="/auth" className="inline-block bg-purple-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-purple-700 transition-colors">
                    الانتقال لصفحة الدخول
                  </Link>
                </div>
              ) : error ? (
                <p className="text-red-500 text-sm text-center">{error}</p>
              ) : null}

              {/* 3. إخفاء زر الإرسال إذا ظهر طلب تسجيل الدخول */}
              {!showLoginPrompt && (
                <button type="submit" disabled={isSubmitting} className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-purple-400">
                  {isSubmitting ? 'جاري الإرسال...' : 'إرسال التقييم'}
                </button>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewModal;