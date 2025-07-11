// src/components/ChangeAvatarForm.jsx
"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useMutation, gql } from '@apollo/client';
import Image from 'next/image';
import { FaUserCircle, FaUpload } from 'react-icons/fa';

// Mutation لتحديث رابط الصورة في قاعدة البيانات
const UPDATE_USER_AVATAR = gql`
  mutation UpdateUserAvatar($userId: uuid!, $avatarUrl: String!) {
    update_users_by_pk(
      pk_columns: { id: $userId }, 
      _set: { avatarUrl: $avatarUrl }
    ) {
      id
      avatarUrl
    }
  }
`;

const ChangeAvatarForm = () => {
  const { user, updateUser } = useAuth();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const [updateAvatarMutation] = useMutation(UPDATE_USER_AVATAR);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("الرجاء اختيار صورة أولاً.");
      return;
    }
    setError('');
    setSuccess('');
    setLoading(true);

    // 1. رفع الصورة إلى Cloudinary
    const formData = new FormData();
    formData.append('file', file);
    // **مهم:** استبدل "your_upload_preset" باسم الـ Upload Preset الخاص بك في Cloudinary
    formData.append('upload_preset', 'your_upload_preset'); 

    try {
      const cloudinaryRes = await fetch(
        // **مهم:** استبدل "your_cloud_name" باسم الـ Cloud Name الخاص بك
        'https://api.cloudinary.com/v1_1/your_cloud_name/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      );
      const cloudinaryData = await cloudinaryRes.json();

      if (!cloudinaryData.secure_url) {
        throw new Error("فشل رفع الصورة إلى Cloudinary.");
      }

      const newAvatarUrl = cloudinaryData.secure_url;

      // 2. تحديث رابط الصورة في قاعدة البيانات
      const { data } = await updateAvatarMutation({
        variables: {
          userId: user.id,
          avatarUrl: newAvatarUrl,
        },
      });

      // 3. تحديث حالة المستخدم في التطبيق لتعكس الصورة الجديدة فوراً
      if (data?.update_users_by_pk) {
        updateUser({ avatarUrl: data.update_users_by_pk.avatarUrl });
        setSuccess("تم تحديث الصورة بنجاح!");
        setFile(null);
        setPreview(null);
      }

    } catch (err) {
      console.error(err);
      setError("حدث خطأ أثناء تحديث الصورة.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">تغيير الصورة الشخصية</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
        
        {preview ? (
          <Image src={preview} alt="معاينة الصورة" width={128} height={128} className="rounded-full w-32 h-32 object-cover" />
        ) : user.avatarUrl ? (
          <Image src={user.avatarUrl} alt="الصورة الحالية" width={128} height={128} className="rounded-full w-32 h-32 object-cover" />
        ) : (
          <FaUserCircle className="w-32 h-32 text-gray-400" />
        )}

        <div className="relative">
          <input type="file" id="avatar-upload" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
          <label htmlFor="avatar-upload" className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600">
            <FaUpload />
            <span>اختر صورة...</span>
          </label>
        </div>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        {file && (
          <button type="submit" disabled={loading} className="w-full sm:w-auto auth-button">
            {loading ? 'جاري الرفع...' : 'حفظ الصورة الجديدة'}
          </button>
        )}
      </form>
    </div>
  );
};

export default ChangeAvatarForm;