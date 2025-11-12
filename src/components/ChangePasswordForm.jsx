// src/components/ChangePasswordForm.jsx
"use client";
import React, { useState } from 'react';
import { FaLock } from 'react-icons/fa';

const ChangePasswordForm = () => {
    const [formData, setFormData] = useState({ newPassword: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (formData.newPassword !== formData.confirmPassword) {
            setError('كلمتا المرور الجديدتان غير متطابقتين.');
            return;
        }
        if (formData.newPassword.length < 6) {
            setError('يجب أن تكون كلمة المرور الجديدة 6 أحرف على الأقل.');
            return;
        }

        setLoading(true);
        
        const storedSession = localStorage.getItem('session');
        if (!storedSession) {
            setError('جلسة المستخدم غير صالحة. يرجى تسجيل الدخول مرة أخرى.');
            setLoading(false);
            return;
        }

        const token = JSON.parse(storedSession)?.accessToken;

        try {
            const response = await fetch('https://libararyauth-af96ef3792e3.hosted.ghaymah.systems/user/password/change', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ newPassword: formData.newPassword })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'فشل تغيير كلمة المرور.');
            }

            setSuccess('تم تغيير كلمة المرور بنجاح!');
            setFormData({ newPassword: '', confirmPassword: '' });

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">تغيير كلمة المرور</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="input-group">
                    <label htmlFor="newPassword" className="sr-only">كلمة المرور الجديدة</label>
                    <FaLock aria-hidden="true" />
                    <input type="password" id="newPassword" name="newPassword" placeholder="كلمة المرور الجديدة" value={formData.newPassword} onChange={handleChange} required className="input-field" />
                </div>
                <div className="input-group">
                    <label htmlFor="confirmPassword" className="sr-only">تأكيد كلمة المرور الجديدة</label>
                    <FaLock aria-hidden="true" />
                    <input type="password" id="confirmPassword" name="confirmPassword" placeholder="تأكيد كلمة المرور الجديدة" value={formData.confirmPassword} onChange={handleChange} required className="input-field" />
                </div>
                
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}

                <button type="submit" disabled={loading} className="w-full auth-button">
                    {loading ? 'جاري التغيير...' : 'تغيير كلمة المرور'}
                </button>
            </form>
        </div>
    );
};

export default ChangePasswordForm;