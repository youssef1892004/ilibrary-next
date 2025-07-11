// src/app/auth/page.jsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEnvelope, FaLock, FaUser, FaBookReader } from 'react-icons/fa';
import './AuthPage.css';
import { useAuth } from '@/context/AuthContext';

// دالة بسيطة للتحقق من صيغة البريد الإلكتروني
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  // 1. استخدام حالة لتخزين الأخطاء لكل حقل + خطأ عام
  const [errors, setErrors] = useState({
    email: '',
    general: ''
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // 2. مسح الخطأ عند بدء الكتابة
    if (errors.general || errors.email) {
      setErrors({ email: '', general: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ email: '', general: '' }); // إعادة تعيين الأخطأ قبل كل محاولة

    // 3. التحقق من صيغة البريد الإلكتروني أولاً
    if (!validateEmail(formData.email)) {
      setErrors({ ...errors, email: 'الرجاء إدخال بريد إلكتروني صحيح.' });
      return; // إيقاف التنفيذ إذا كان الإيميل غير صحيح
    }

    setLoading(true);

    const endpoint = isLogin 
      ? 'https://libararyauth-af96ef3792e3.hosted.ghaymah.systems/signin/email-password'
      : 'https://libararyauth-af96ef3792e3.hosted.ghaymah.systems/signup/email-password';

    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : { email: formData.email, password: formData.password, options: { displayName: formData.name } };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'حدث خطأ ما');
      }

      if (data.session) {
        login(data.session);
      } else {
        throw new Error('لم يتم استلام بيانات الجلسة من الخادم.');
      }

    } catch (err) {
      const errorMessage = err.message;
      if (errorMessage.includes('Invalid email or password')) {
        setErrors({ ...errors, general: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.' });
      } else if (errorMessage.includes('already in use')) {
        setErrors({ ...errors, general: 'هذا البريد الإلكتروني مسجل بالفعل.' });
      } else {
        setErrors({ ...errors, general: 'حدث خطأ. يرجى المحاولة مرة أخرى.' });
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <div className="auth-header">
          <FaBookReader className="auth-icon" />
          <h1>{isLogin ? 'أهلاً بعودتك' : 'انضم إلى مكتبتنا'}</h1>
          <p>{isLogin ? 'سجل دخولك لتكمل رحلتك' : 'أنشئ حسابك وابدأ القراءة'}</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-group">
              <FaUser />
              <input type="text" name="name" placeholder="الاسم الكامل" value={formData.name} onChange={handleChange} required />
            </div>
          )}
          <div className="input-group">
            <FaEnvelope />
            <input type="email" name="email" placeholder="البريد الإلكتروني" value={formData.email} onChange={handleChange} required />
          </div>
          {/* 4. عرض رسالة خطأ الإيميل هنا */}
          {errors.email && <p className="error-message">{errors.email}</p>}

          <div className="input-group">
            <FaLock />
            <input type="password" name="password" placeholder="كلمة المرور" value={formData.password} onChange={handleChange} required />
          </div>
          
          {/* 5. عرض رسالة الخطأ العامة هنا */}
          {errors.general && <p className="error-message">{errors.general}</p>}
          
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'جاري...' : (isLogin ? 'تسجيل الدخول' : 'إنشاء حساب')}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {isLogin ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟'}
            <button onClick={() => { setIsLogin(!isLogin); setErrors({ email: '', general: '' }); }} className="switch-button">
              {isLogin ? 'إنشاء حساب' : 'تسجيل الدخول'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;