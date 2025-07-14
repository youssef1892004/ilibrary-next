// src/app/auth/page.jsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEnvelope, FaLock, FaUser, FaBookReader } from 'react-icons/fa';
import './AuthPage.css';
import { useAuth } from '@/context/AuthContext';

// لم نعد بحاجة إلى GraphQL mutations هنا، سنستخدم fetch

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // ---  المنطق الجديد بناءً على الـ REST API ---
    const baseUrl = 'https://graphql-333f98f9a304.hosted.ghaymah.systems/api/rest';
    
    // ملاحظة: تأكد من أن هذه هي المسارات الصحيحة التي قمت بإنشائها في Hasura
    const REGISTER_PATH = '/users'; //  بناءً على صورتك، هذا هو مسار إضافة المستخدم
    const LOGIN_PATH = '/login';   //  هذا لا يزال بحاجة إلى إنشائه بنفس الطريقة

    const endpoint = isLogin ? `${baseUrl}${LOGIN_PATH}` : `${baseUrl}${REGISTER_PATH}`;
    
    // بناء الـ payload ليناسب الـ API الخاص بك
    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : { 
          // هذا الـ payload لعملية الإضافة
          object: {
            displayName: formData.name,
            email: formData.email,
            passwordHash: formData.password // أنت أكدت أن Hasura يهتم بالتشفير
          }
        };

    try {
      if (isLogin) {
          throw new Error("عملية تسجيل الدخول لم يتم إنشاؤها بعد. الرجاء إنشاء REST endpoint لـ Login.");
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'حدث خطأ من الخادم.');
      }
      
      // في حالة نجاح إنشاء الحساب
      alert('تم إنشاء حسابك بنجاح! يمكنك الآن تسجيل الدخول.');
      setIsLogin(true); // تحويل الواجهة لصفحة تسجيل الدخول

    } catch (err) {
      setError(err.message || 'فشل الاتصال بالخادم.');
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
              <FaUser /><input type="text" name="name" placeholder="الاسم الكامل" value={formData.name} onChange={handleChange} required />
            </div>
          )}
          <div className="input-group">
            <FaEnvelope /><input type="email" name="email" placeholder="البريد الإلكتروني" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <FaLock /><input type="password" name="password" placeholder="كلمة المرور" value={formData.password} onChange={handleChange} required />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'جاري...' : (isLogin ? 'تسجيل الدخول' : 'إنشاء حساب')}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {isLogin ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟'}
            <button type="button" onClick={() => { setIsLogin(!isLogin); setError(''); }} className="switch-button">
              {isLogin ? 'إنشاء حساب' : 'تسجيل الدخول'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;