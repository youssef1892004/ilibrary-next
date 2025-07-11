// src/app/about/page.jsx
import React from 'react';
import Link from 'next/link';

// 1. مكون صغير لعرض كرت عضو الفريق
const TeamMemberCard = ({ name, role, imageUrl }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
      <img
        className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-purple-200 dark:border-purple-700"
        src={imageUrl}
        alt={`صورة ${name}`}
      />
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{name}</h3>
      <p className="text-purple-500 dark:text-purple-400 font-semibold">{role}</p>
    </div>
  );
};

const AboutPage = () => {
  return (
    <div className="bg-white dark:bg-gray-900 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            عن <span className="text-purple-600 dark:text-purple-400">iLibrary</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            مكتبة إلكترونية شاملة للكتب العربية والمحتوى الثقافي الأصيل
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* رؤيتنا */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 shadow-md">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">رؤيتنا</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              نسعى لأن نكون المنصة الرائدة في العالم العربي لنشر وتوزيع الكتب الإلكترونية، 
              ونهدف إلى جعل المعرفة في متناول الجميع، وتشجيع القراءة كجزء أساسي من حياة الفرد اليومية.
            </p>
          </div>

          {/* مهمتنا */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 shadow-md">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">مهمتنا</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              توفير مكتبة رقمية شاملة تضم أفضل الكتب العربية في مختلف المجالات، 
              مع تقديم تجربة قراءة مميزة وتفاعلية للقراء في جميع أنحاء العالم، ودعم المؤلفين والناشرين العرب.
            </p>
          </div>

          {/* 2. إضافة قسم فريق العمل الجديد */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 shadow-md">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">فريق العمل</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <TeamMemberCard 
                name=" ENG. Abd Elsabour" 
                role="Back-End Developer"
                imageUrl="https://ui-avatars.com/api/?name=Abd+Elsabour&background=1f2937&color=fff&size=128"
              />
              <TeamMemberCard 
                name=" ENG. Youssef" 
                role="Front-End Developer"
                imageUrl="https://ui-avatars.com/api/?name=Youssef&background=8b5cf6&color=fff&size=128"
              />
            </div>
            <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
              تمت برمجة وتطوير هذا الموقع بواسطة فريق من المهندسين الشغوفين بنشر المعرفة.
            </p>
          </div>

          {/* دعوة للانضمام */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-10 text-white text-center shadow-lg">
            <h2 className="text-3xl font-bold mb-4">انضم إلى مجتمعنا</h2>
            <p className="mb-6 text-lg">
              كن جزءًا من رحلة نشر المعرفة والثقافة العربية وشاركنا شغفك بالكلمة المقروءة.
            </p>
            <Link href="/books">
                <button className="px-8 py-3 bg-white text-purple-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors transform hover:scale-105">
                    ابدأ التصفح الآن
                </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;