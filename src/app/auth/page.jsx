// src/app/auth/page.jsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import { FaEnvelope, FaLock, FaUser, FaBookOpen } from 'react-icons/fa';
import './AuthPage.css';

// --- تم تعديل المكون ليعرض أعمدة متعددة ---
const AnimatedBookCovers = () => {
  // قائمة بصور الأغلفة من مجلد public/assets
  // تمت زيادة عدد الصور لتحسين مظهر الحركة
  const allBookCovers = [
    '/assets/book-cover-1.jpg', '/assets/book2.jpg', '/assets/book-cover-3.jpg', '/assets/book4.jpg',
    '/assets/book-cover-2.jpg', '/assets/book1.jpg', '/assets/book5.jpg', '/assets/book3.jpg',
    '/assets/darys-book-cover.jpg', '/assets/auth-image.jpg', '/assets/book-cover-1.jpg', '/assets/book-cover-2.jpg',
    '/assets/book-cover-3.jpg', '/assets/book1.jpg', '/assets/book2.jpg', '/assets/book3.jpg',
  ];

  // --- 1. تم تغيير عدد الأعمدة إلى أربعة ---
  const numColumns = 4;
  const columns = Array.from({ length: numColumns }, () => []);
  allBookCovers.forEach((cover, index) => {
    columns[index % numColumns].push(cover);
  });

  // تكرار الصور داخل كل عمود لضمان حركة سلسة
  const loopedColumns = columns.map(col => [...col, ...col]);

  return (
    <div className="animated-covers-container">
      {loopedColumns.map((column, colIndex) => (
        <div
          key={colIndex}
          className="covers-track"
          // --- 2. تعديل الحركة لتعمل بشكل متعاكس ---
          // الأعمدة الزوجية (0, 2) تتحرك للأعلى (scrollVertical)
          // الأعمدة الفردية (1, 3) تتحرك للأسفل (scrollVerticalReverse)
          style={{
            animationName: colIndex % 2 === 1 ? 'scrollVerticalReverse' : 'scrollVertical',
            animationDuration: `${60 + colIndex * 5}s` // تغيير السرعات بشكل طفيف لكل عمود
          }}
        >
          {column.map((cover, imgIndex) => (
            <img
              key={`${cover}-${imgIndex}`}
              src={cover}
              alt=""
              className="book-cover-item"
            />
          ))}
        </div>
      ))}
    </div>
  );
};


const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, user, isLoading: authIsLoading } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Redirect if user is already logged in
  useEffect(() => {
    if (user && !authIsLoading) {
      router.push('/');
    }
  }, [user, authIsLoading, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      if (isLogin) {
        const response = await fetch('/api/auth/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email, password: formData.password })
        });
        const data = await response.json();
        if (!response.ok) { throw new Error(data.message || "فشل تسجيل الدخول."); }
        login(data);
        router.push('/');
        router.refresh(); // Ensure server components update with new cookie
      } else {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            displayName: formData.name,
            email: formData.email,
            password: formData.password
          })
        });
        const result = await response.json();
        if (!response.ok) { throw new Error(result.message); }
        toast.success('تم إنشاء حسابك بنجاح. يمكنك الآن تسجيل الدخول.');
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.message || "حدث خطأ غير متوقع.");
    } finally {
      setIsLoading(false);
    }
  };

  if (authIsLoading) { // Only show loading if checking auth status
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-xl">جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className="auth-container">
      {/* -- القسم الأيمن: رسالة الترحيب والخلفية المتحركة -- */}
      <div className="welcome-panel">
        <AnimatedBookCovers />
        <div className="welcome-content">
          <FaBookOpen className="welcome-icon" />
          <h1 className="welcome-title">مرحباً بك في Muejam Library</h1>
          <p className="welcome-text">
            بوابتك إلى عالم من المعرفة والمتعة. سجل دخولك أو أنشئ حساباً جديداً لتبدأ رحلتك.
          </p>
        </div>
      </div>

      {/* -- القسم الأيسر: فورم الدخول -- */}
      <div className="form-panel">
        <div className="auth-card">
          <header className="auth-header">
            <h1>{isLogin ? 'أهلاً بعودتك' : 'انضم إلى مكتبتنا'}</h1>
            <p>{isLogin ? 'سجل دخولك لتكمل رحلتك' : 'أنشئ حسابك وابدأ القراءة'}</p>
          </header>

          <form className="auth-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="input-group">
                <label htmlFor="name" className="sr-only">الاسم الكامل</label>
                <FaUser aria-hidden="true" /><input type="text" id="name" name="name" placeholder="الاسم الكامل" value={formData.name} onChange={handleChange} required />
              </div>
            )}
            <div className="input-group">
              <label htmlFor="email" className="sr-only">البريد الإلكتروني</label>
              <FaEnvelope aria-hidden="true" /><input type="email" id="email" name="email" placeholder="البريد الإلكتروني" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="password" className="sr-only">كلمة المرور</label>
              <FaLock aria-hidden="true" /><input type="password" id="password" name="password" placeholder="كلمة المرور" value={formData.password} onChange={handleChange} required />
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="auth-button" disabled={isLoading}>
              {isLoading ? 'جاري...' : (isLogin ? 'تسجيل الدخول' : 'إنشاء حساب')}
            </button>
          </form>

          <footer className="auth-footer">
            <p>
              {isLogin ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟'}
              <button type="button" onClick={() => { setIsLogin(!isLogin); setError(''); }} className="switch-button">
                {isLogin ? 'إنشاء حساب' : 'تسجيل الدخول'}
              </button>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
