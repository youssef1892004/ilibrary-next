// src/components/HomePageBookList.jsx

import React from 'react';
import { Link } from 'react-router-dom';

// ========= تم وضع البيانات هنا مباشرة داخل الملف =========
const booksDataForHomepage = [
  { id: 1, title: ' آلام فريدة', author: 'انعام احمد  محمود رمضان', coverImage: 'https://res.cloudinary.com/dnveptlzm/image/upload/v1751236436/%D9%86%D9%88%D9%81%D9%8A%D9%84%D8%A7_%D8%A5%D9%84%D8%A7_%D8%A7%D8%A8%D9%86%D8%AA%D9%89_%D9%84%D9%84%D9%83%D8%A7%D8%AA%D8%A8%D8%A9_%D9%86%D8%AC%D9%84%D8%A7%D8%A1_%D8%B9%D8%A7%D9%85%D8%B1_mxzyrt.jpg' },
  { id: 2, title: 'عالم موازي.', author: 'نورا محمد علي', coverImage: 'https://res.cloudinary.com/dnveptlzm/image/upload/v1751236438/%D8%B9%D8%A7%D9%84%D9%85_%D9%85%D9%88%D8%A7%D8%B2%D9%8A_rmlwcx.jpg' },
  { id: 3, title: 'بريق ', author: 'سلوى فاضل أحمد', coverImage: 'https://res.cloudinary.com/dnveptlzm/image/upload/v1751236437/%D8%A8%D8%B1%D9%8A%D9%82_jnewrg.jpg' },
  { id: 4, title: 'حكاية أمل الوجه الأول هي ( منقذي وجلادي)', author: 'سلوى فاضل أحمد', coverImage: 'https://res.cloudinary.com/dnveptlzm/image/upload/v1751236437/%D8%AD%D9%83%D8%A7%D9%8A%D8%A9_%D8%A3%D9%85%D9%84_%D8%A7%D9%84%D9%88%D8%AC%D9%87_%D8%A7%D9%84%D8%A3%D9%88%D9%84_%D9%87%D9%8A_%D9%85%D9%86%D9%82%D8%B0%D9%8A_%D9%88%D8%AC%D9%84%D8%A7%D8%AF%D9%8A_jnl732.jpg' },
  { id: 5, title: 'حكاية أمل-الوجه الثاني- هو( قدري ومليكتي)', author: 'سلوى فاضل أحمد', coverImage: 'https://res.cloudinary.com/dnveptlzm/image/upload/v1751236437/%D8%AD%D9%83%D8%A7%D9%8A%D8%A9_%D8%A3%D9%85%D9%84_%D8%A7%D9%84%D9%88%D8%AC%D9%87_%D8%A7%D9%84%D8%A3%D9%88%D9%84_%D9%87%D9%8A_%D9%85%D9%86%D9%82%D8%B0%D9%8A_%D9%88%D8%AC%D9%84%D8%A7%D8%AF%D9%8A_jnl732.jpg' },
  { id: 6, title: '·آسيرة لعينيه', author: 'حنان درويش', coverImage: 'https://res.cloudinary.com/dnveptlzm/image/upload/v1751236437/%D8%A2%D8%B3%D9%8A%D8%B1%D8%A9_%D9%84%D8%B9%D9%8A%D9%86%D9%8A%D9%87_myeqwe.jpg' },
  { id: 7, title: 'قمر الزين', author: 'نشوه عبدالحميد السيد أبوالوفا', coverImage: 'https://res.cloudinary.com/dnveptlzm/image/upload/v1751236439/%D9%82%D9%85%D8%B1_%D8%A7%D9%84%D8%B2%D9%8A%D9%86_-_%D9%86%D8%B4%D9%88%D9%87_%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D8%AD%D9%85%D9%8A%D8%AF_%D8%A7%D9%84%D8%B3%D9%8A%D8%AF_%D8%A3%D8%A8%D9%88%D8%A7%D9%84%D9%88%D9%81%D8%A7_rpbn64.png' },
  { id: 8, title: 'المكلوم', author: 'نشوه عبدالحميد السيد أبوالوفا', coverImage: 'https://res.cloudinary.com/dnveptlzm/image/upload/v1751315645/Picture1_dvbnfc.jpg' },
  { id: 9, title: 'السِرْ', author: 'نشوه عبدالحميد السيد أبوالوفا', coverImage: 'https://res.cloudinary.com/dnveptlzm/image/upload/v1751316216/Picture1_w7t2r7.jpg' },
  { id: 10, title: ' صدمة العمر', author: 'نشوه عبدالحميد السيد أبوالوفا', coverImage: 'https://res.cloudinary.com/dnveptlzm/image/upload/v1751316485/%D8%B5%D8%AF%D9%85%D8%A9_%D8%A7%D9%84%D8%B9%D9%85%D8%B1_fbwt4w.jpg' },
];

// ========= تم وضع مكون البطاقة هنا مباشرة داخل الملف =========
const SimpleBookCard = ({ book }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <Link to={`/book/${book.id}`}>
        <div className="aspect-[3/4] bg-gray-200">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="p-3">
          <h3 className="font-bold text-md text-gray-800 dark:text-white truncate">
            {book.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
            {book.author}
          </p>
        </div>
      </Link>
    </div>
  );
};

// ========= هذا هو المكون الرئيسي الذي سنستخدمه =========
const HomePageBookList = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="text-center mb-12 px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
            أحدث الكتب
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-2 rounded-full"></div>
        </div>
        <div className="flex overflow-x-auto scrollbar-hide py-4">
          <div className="flex flex-nowrap gap-6 px-4 sm:px-6 lg:px-8">
            {booksDataForHomepage.map((book) => (
              <div key={book.id} className="w-60 flex-shrink-0">
                <SimpleBookCard book={book} />
              </div>
            ))}
          </div>
        </div>
        <div className="text-center mt-12">
          <Link to="/books">
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg">
              عرض كل الكتب
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomePageBookList;