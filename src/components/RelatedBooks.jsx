import React from 'react';
// لم نعد بحاجة لاستيراد Link هنا، فقد تم حذفه
import { booksData } from '@/data/mockData'; // استخدام المسار الصحيح
import BookCard from '@/components/BookCard'; 

const RelatedBooks = ({ currentBookId, category }) => {
  const related = booksData
    .filter(book => book.category === category && book.id !== currentBookId)
    .slice(0, 4); // جلب 4 كتب ذات صلة كحد أقصى

  // لا تعرض أي شيء إذا لم توجد كتب ذات صلة
  if (related.length === 0) {
    return null;
  }

  return (
    <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
      <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        كتب ذات صلة
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {related.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default RelatedBooks;