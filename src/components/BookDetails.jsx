import React from 'react';

const BookDetails = ({ book }) => {
  return (
    <section className="flex flex-col md:flex-row gap-8 mb-12">
      {/* Book Cover */}
      <div className="w-full md:w-1/3 flex justify-center">
        <img 
          src={book.coverImage} 
          alt={book.titleAr}
          className="w-64 h-96 object-cover shadow-lg rounded-lg"
        />
      </div>

      {/* Book Details */}
      <div className="w-full md:w-2/3 space-y-6">
        {/* Arabic Details */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{book.titleAr}</h1>
          <h2 className="text-xl text-gray-600 mb-4">الكاتب: {book.authorAr}</h2>
          
          <div className="space-y-2">
            <p className="text-gray-700"><span className="font-semibold">النوع:</span> {book.genreAr}</p>
            <p className="text-gray-700"><span className="font-semibold">اللغة:</span> {book.languageAr}</p>
            <p className="text-gray-700"><span className="font-semibold">الصفحات:</span> {book.totalPages} صفحة</p>
          </div>

          <div className="mt-4 pt-4 border-t">
            <h3 className="font-semibold text-lg mb-2">وصف القصة:</h3>
            <p className="text-gray-700 leading-relaxed">{book.descriptionAr}</p>
          </div>
        </div>

        {/* English Details */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{book.titleEn}</h1>
          <h2 className="text-lg text-gray-600 mb-4">Author: {book.authorEn}</h2>
          
          <div className="space-y-2">
            <p className="text-gray-700"><span className="font-semibold">Genre:</span> {book.genreEn}</p>
            <p className="text-gray-700"><span className="font-semibold">Language:</span> {book.languageEn}</p>
            <p className="text-gray-700"><span className="font-semibold">Pages:</span> {book.totalPages}</p>
          </div>

          <div className="mt-4 pt-4 border-t">
            <h3 className="font-semibold text-lg mb-2">Synopsis:</h3>
            <p className="text-gray-700 leading-relaxed">{book.descriptionEn}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDetails;