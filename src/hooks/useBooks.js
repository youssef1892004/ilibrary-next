import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOKS, GET_BOOK, GET_BOOK_CONTENT, GET_POPULAR_BOOKS, GET_LATEST_BOOKS } from '../graphql/queries';
import { booksData } from '../data/mockData';

// Hook للحصول على جميع الكتب
export const useBooks = (options = {}) => {
  const { limit, offset, category, search } = options;
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { data, loading: queryLoading, error: queryError, refetch } = useQuery(GET_BOOKS, {
    variables: { limit, offset, category, search },
    skip: !process.env.REACT_APP_GRAPHQL_URI || process.env.REACT_APP_GRAPHQL_URI.includes('localhost:4000'),
    onCompleted: (data) => {
      if (data?.books) {
        setBooks(data.books);
      }
      setLoading(false);
    },
    onError: (error) => {
      console.error('Error fetching books:', error);
      // في حالة الخطأ، استخدم البيانات المحاكية
      setBooks(booksData);
      setError(error);
      setLoading(false);
    }
  });

  // إذا لم يكن GraphQL متاحًا، استخدم البيانات المحاكية
  useEffect(() => {
    if (!process.env.REACT_APP_GRAPHQL_URI || process.env.REACT_APP_GRAPHQL_URI.includes('localhost:4000')) {
      let filteredBooks = [...booksData];

      // تطبيق فلتر البحث
      if (search) {
        filteredBooks = filteredBooks.filter(book => 
          book.title.includes(search) || 
          book.author.includes(search) ||
          book.description.includes(search)
        );
      }

      // تطبيق فلتر الفئة
      if (category) {
        filteredBooks = filteredBooks.filter(book => book.category === category);
      }

      // تطبيق التصفح (pagination)
      if (offset || limit) {
        const start = offset || 0;
        const end = limit ? start + limit : filteredBooks.length;
        filteredBooks = filteredBooks.slice(start, end);
      }

      setBooks(filteredBooks);
      setLoading(false);
    }
  }, [limit, offset, category, search]);

  return {
    books,
    loading: loading || queryLoading,
    error: error || queryError,
    refetch
  };
};

// Hook للحصول على كتاب واحد
export const useBook = (bookId) => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { data, loading: queryLoading, error: queryError, refetch } = useQuery(GET_BOOK, {
    variables: { id: bookId },
    skip: !bookId || !process.env.REACT_APP_GRAPHQL_URI || process.env.REACT_APP_GRAPHQL_URI.includes('localhost:4000'),
    onCompleted: (data) => {
      if (data?.book) {
        setBook(data.book);
      }
      setLoading(false);
    },
    onError: (error) => {
      console.error('Error fetching book:', error);
      // في حالة الخطأ، استخدم البيانات المحاكية
      const mockBook = booksData.find(b => b.id === parseInt(bookId));
      setBook(mockBook || null);
      setError(error);
      setLoading(false);
    }
  });

  // إذا لم يكن GraphQL متاحًا، استخدم البيانات المحاكية
  useEffect(() => {
    if (bookId && (!process.env.REACT_APP_GRAPHQL_URI || process.env.REACT_APP_GRAPHQL_URI.includes('localhost:4000'))) {
      const mockBook = booksData.find(b => b.id === parseInt(bookId));
      setBook(mockBook || null);
      setLoading(false);
    }
  }, [bookId]);

  return {
    book,
    loading: loading || queryLoading,
    error: error || queryError,
    refetch
  };
};

// Hook للحصول على محتوى الكتاب للقراءة
export const useBookContent = (bookId) => {
  const [bookContent, setBookContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { data, loading: queryLoading, error: queryError, refetch } = useQuery(GET_BOOK_CONTENT, {
    variables: { id: bookId },
    skip: !bookId || !process.env.REACT_APP_GRAPHQL_URI || process.env.REACT_APP_GRAPHQL_URI.includes('localhost:4000'),
    onCompleted: (data) => {
      if (data?.bookContent) {
        setBookContent(data.bookContent);
      }
      setLoading(false);
    },
    onError: (error) => {
      console.error('Error fetching book content:', error);
      // في حالة الخطأ، استخدم البيانات المحاكية
      loadMockBookContent();
      setError(error);
      setLoading(false);
    }
  });

  const loadMockBookContent = async () => {
    try {
      // تحميل محتوى الكتاب من ملف JSON
      const response = await fetch('/src/data/book_content.json');
      const content = await response.json();
      setBookContent(content);
    } catch (error) {
      console.error('Error loading mock book content:', error);
      setBookContent(null);
    }
  };

  // إذا لم يكن GraphQL متاحًا، استخدم البيانات المحاكية
  useEffect(() => {
    if (bookId && (!process.env.REACT_APP_GRAPHQL_URI || process.env.REACT_APP_GRAPHQL_URI.includes('localhost:4000'))) {
      loadMockBookContent();
      setLoading(false);
    }
  }, [bookId]);

  return {
    bookContent,
    loading: loading || queryLoading,
    error: error || queryError,
    refetch
  };
};

// Hook للحصول على الكتب الشائعة
export const usePopularBooks = (limit = 10) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { data, loading: queryLoading, error: queryError, refetch } = useQuery(GET_POPULAR_BOOKS, {
    variables: { limit },
    skip: !process.env.REACT_APP_GRAPHQL_URI || process.env.REACT_APP_GRAPHQL_URI.includes('localhost:4000'),
    onCompleted: (data) => {
      if (data?.popularBooks) {
        setBooks(data.popularBooks);
      }
      setLoading(false);
    },
    onError: (error) => {
      console.error('Error fetching popular books:', error);
      // في حالة الخطأ، استخدم البيانات المحاكية
      setBooks(booksData.slice(0, limit));
      setError(error);
      setLoading(false);
    }
  });

  // إذا لم يكن GraphQL متاحًا، استخدم البيانات المحاكية
  useEffect(() => {
    if (!process.env.REACT_APP_GRAPHQL_URI || process.env.REACT_APP_GRAPHQL_URI.includes('localhost:4000')) {
      setBooks(booksData.slice(0, limit));
      setLoading(false);
    }
  }, [limit]);

  return {
    books,
    loading: loading || queryLoading,
    error: error || queryError,
    refetch
  };
};

// Hook للحصول على أحدث الكتب
export const useLatestBooks = (limit = 10) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { data, loading: queryLoading, error: queryError, refetch } = useQuery(GET_LATEST_BOOKS, {
    variables: { limit },
    skip: !process.env.REACT_APP_GRAPHQL_URI || process.env.REACT_APP_GRAPHQL_URI.includes('localhost:4000'),
    onCompleted: (data) => {
      if (data?.latestBooks) {
        setBooks(data.latestBooks);
      }
      setLoading(false);
    },
    onError: (error) => {
      console.error('Error fetching latest books:', error);
      // في حالة الخطأ، استخدم البيانات المحاكية
      const sortedBooks = [...booksData].sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
      setBooks(sortedBooks.slice(0, limit));
      setError(error);
      setLoading(false);
    }
  });

  // إذا لم يكن GraphQL متاحًا، استخدم البيانات المحاكية
  useEffect(() => {
    if (!process.env.REACT_APP_GRAPHQL_URI || process.env.REACT_APP_GRAPHQL_URI.includes('localhost:4000')) {
      const sortedBooks = [...booksData].sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
      setBooks(sortedBooks.slice(0, limit));
      setLoading(false);
    }
  }, [limit]);

  return {
    books,
    loading: loading || queryLoading,
    error: error || queryError,
    refetch
  };
};

