// src/app/auth/page.jsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaEnvelope, FaLock, FaUser, FaBookReader } from 'react-icons/fa';
import './AuthPage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
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

      // في حالة النجاح، يتم حفظ بيانات الجلسة وتوجيه المستخدم
      if (data.session) {
        localStorage.setItem('session', JSON.stringify(data.session));
        router.push('/'); // توجيه للصفحة الرئيسية
        router.refresh(); // تحديث الصفحة لإظهار حالة المستخدم الجديدة في الـ Navbar
      }

    } catch (err) {
      const errorMessage = err.message;
      if (errorMessage.includes('Invalid email or password')) {
        setError('البريد الإلكتروني أو كلمة المرور غير صحيحة.');
      } else if (errorMessage.includes('already in use')) {
        setError('هذا البريد الإلكتروني مسجل بالفعل.');
      } else {
        setError('حدث خطأ. يرجى المحاولة مرة أخرى.');
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
          <div className="input-group">
            <FaLock />
            <input type="password" name="password" placeholder="كلمة المرور" value={formData.password} onChange={handleChange} required />
          </div>
          
          {error && <p className="error-message">{error}</p>}
          
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'جاري...' : (isLogin ? 'تسجيل الدخول' : 'إنشاء حساب')}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {isLogin ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟'}
            <button onClick={() => setIsLogin(!isLogin)} className="switch-button">
              {isLogin ? 'إنشاء حساب' : 'تسجيل الدخول'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
