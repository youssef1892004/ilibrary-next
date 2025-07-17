// src/app/auth/page.jsx
"use client";

import React, { useState, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { FaEnvelope, FaLock, FaUser, FaBookReader } from 'react-icons/fa';
import './AuthPage.css';

// --- التعديل الأول هنا ---
// تم تغيير نوع المتغير $email إلى citext!
const REGISTER_MUTATION = gql`
  mutation InsertUser($displayName: String!, $email: citext!, $password: String!, $locale: String!) {
    insert_auth_users_one(object: {
      display_name: $displayName, 
      email: $email, 
      password_hash: $password,
      locale: $locale
    }) {
      id
      email
    }
  }
`;

// --- التعديل الثاني هنا ---
// تم تغيير نوع المتغير $email إلى citext!
const LOGIN_MUTATION = gql`
  mutation Login($email: citext!, $password: String!) {
    login(args: {email: $email, password: $password}) {
      accessToken
      user {
        id
        displayName
        email
        roles
      }
    }
  }
`;

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { login, user, isLoading: authIsLoading } = useAuth();
  const router = useRouter();
  
  const [registerUser, { loading: registerLoading }] = useMutation(REGISTER_MUTATION);
  const [loginUser, { loading: loginLoading }] = useMutation(LOGIN_MUTATION);
  const isLoading = registerLoading || loginLoading;

  useEffect(() => {
    if (!authIsLoading && user) {
      router.push('/');
    }
  }, [user, authIsLoading, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        const { data } = await loginUser({ 
          variables: { 
            email: formData.email, 
            password: formData.password 
          } 
        });

        if (!data || !data.login || !data.login.accessToken) {
          throw new Error("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
        }
        login(data.login);

      } else {
        await registerUser({ 
          variables: { 
            displayName: formData.name, 
            email: formData.email, 
            password: formData.password,
            locale: 'ar'
          } 
        });
        alert('تم إنشاء حسابك بنجاح. يمكنك الآن تسجيل الدخول.');
        setIsLogin(true);
      }
    } catch (err) {
      if (err.message.includes('Uniqueness violation')) {
        setError("هذا البريد الإلكتروني مسجل بالفعل.");
      } else if (err.message.includes("Function 'login' not found")) {
        setError("خطأ في الخادم: دالة تسجيل الدخول غير موجودة. يرجى مراجعة مطور الواجهة الخلفية.");
      } else {
        setError("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
      }
      console.error(err);
    }
  };

  if (authIsLoading || user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-xl">جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <header className="auth-header">
          <FaBookReader className="auth-icon" />
          <h1>{isLogin ? 'أهلاً بعودتك' : 'انضم إلى مكتبتنا'}</h1>
          <p>{isLogin ? 'سجل دخولك لتكمل رحلتك' : 'أنشئ حسابك وابدأ القراءة'}</p>
        </header>

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
  );
};

export default AuthPage;