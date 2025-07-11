// src/components/ChangeEmailForm.jsx
"use client";
import React, { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const ChangeEmailForm = () => {
    const [newEmail, setNewEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        const storedSession = localStorage.getItem('session');
        if (!storedSession) {
            setError('جلسة المستخدم غير صالحة. يرجى تسجيل الدخول مرة أخرى.');
            setLoading(false);
            return;
        }

        const token = JSON.parse(storedSession)?.accessToken;

        try {
            const response = await fetch('https://libararyauth-af96ef3792e3.hosted.ghaymah.systems/user/email/change', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ newEmail })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'فشل تغيير البريد الإلكتروني.');
            }

            setSuccess('تم إرسال رابط التأكيد إلى بريدك الإلكتروني الجديد. يرجى التحقق منه لإكمال التغيير.');
            setNewEmail('');

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">تغيير البريد الإلكتروني</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="input-group">
                    <FaEnvelope />
                    <input type="email" placeholder="البريد الإلكتروني الجديد" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} required className="input-field" />
                </div>
                
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}

                <button type="submit" disabled={loading} className="w-full auth-button">
                    {loading ? 'جاري...' : 'تغيير البريد الإلكتروني'}
                </button>
            </form>
        </div>
    );
};

export default ChangeEmailForm;