// src/app/admin/page.jsx
"use client";

import React, { useMemo } from 'react';
import { useQuery, gql } from '@apollo/client';
import { FaBook, FaUserTie, FaFileExcel } from 'react-icons/fa';
import Script from 'next/script'; // لاستيراد المكتبات الخارجية بكفاءة

// 1. الاستعلام لجلب كل البيانات المطلوبة
const GET_ADMIN_DATA = gql`
  query GetAdminData {
    ilibarary_Book {
      id
      title
      author_id
    }
    ilibarary_Autor {
      id
      name
      book_num
    }
  }
`;

const AdminPage = () => {
  const { loading, error, data } = useQuery(GET_ADMIN_DATA);

  // إنشاء خريطة للمؤلفين لربط الكتب بهم
  const authorsMap = useMemo(() => {
    if (!data?.ilibarary_Autor) return new Map();
    const map = new Map();
    data.ilibarary_Autor.forEach(author => {
      map.set(author.id, author.name);
    });
    return map;
  }, [data?.ilibarary_Autor]);

  const books = data?.ilibarary_Book || [];
  const authors = data?.ilibarary_Autor || [];

  // 2. دالة لتصدير البيانات إلى Excel
  const handleExport = (dataToExport, fileName) => {
    // التأكد من أن مكتبة xlsx قد تم تحميلها
    if (typeof XLSX === 'undefined') {
      alert('مكتبة الإكسل لم تحمل بعد، يرجى المحاولة مرة أخرى بعد لحظات.');
      return;
    }

    // إنشاء ورقة العمل
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    // إنشاء ملف العمل
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'البيانات');

    // تفعيل تحميل الملف
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  // دالة مخصصة لتصدير الكتب
  const exportBooks = () => {
    const booksDataForSheet = books.map(book => ({
      'عنوان الكتاب': book.title,
      'اسم الكاتب': authorsMap.get(book.author_id) || 'غير معروف'
    }));
    handleExport(booksDataForSheet, 'تقرير_الكتب');
  };

  // دالة مخصصة لتصدير الكُتّاب
  const exportAuthors = () => {
    const authorsDataForSheet = authors.map(author => ({
      'اسم الكاتب': author.name,
      'عدد الكتب': author.book_num
    }));
    handleExport(authorsDataForSheet, 'تقرير_الكتاب');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-center">
        <p className="text-xl">جاري تحميل بيانات لوحة التحكم...</p>
      </div>
    );
  }

  if (error) {
    console.error("Admin Page Error:", error);
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-center text-red-500">
        <p className="text-xl">حدث خطأ أثناء جلب البيانات.</p>
      </div>
    );
  }

  return (
    <>
      {/* 3. تحميل مكتبة xlsx عند الحاجة */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"
        strategy="lazyOnload"
      />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-8">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            لوحة التحكم
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* --- قسم الكتب --- */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold flex items-center gap-3 text-gray-800 dark:text-gray-200">
                  <FaBook className="text-purple-500" />
                  قائمة الكتب ({books.length})
                </h2>
                {/* 4. زر تصدير الكتب */}
                <button
                  onClick={exportBooks}
                  disabled={loading || books.length === 0}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <FaFileExcel />
                  <span>تصدير</span>
                </button>
              </div>
              <div className="overflow-auto max-h-96">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">عنوان الكتاب</th>
                      <th scope="col" className="px-6 py-3">اسم الكاتب</th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.map((book) => (
                      <tr key={book.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{book.title}</td>
                        <td className="px-6 py-4">{authorsMap.get(book.author_id) || 'غير معروف'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* --- قسم الكُتّاب --- */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold flex items-center gap-3 text-gray-800 dark:text-gray-200">
                  <FaUserTie className="text-purple-500" />
                  قائمة الكُتّاب ({authors.length})
                </h2>
                {/* 5. زر تصدير الكُتّاب */}
                <button
                  onClick={exportAuthors}
                  disabled={loading || authors.length === 0}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <FaFileExcel />
                  <span>تصدير</span>
                </button>
              </div>
              <div className="overflow-auto max-h-96">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">اسم الكاتب</th>
                      <th scope="col" className="px-6 py-3">عدد الكتب</th>
                    </tr>
                  </thead>
                  <tbody>
                    {authors.map((author) => (
                      <tr key={author.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{author.name}</td>
                        <td className="px-6 py-4 text-center">{author.book_num}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
