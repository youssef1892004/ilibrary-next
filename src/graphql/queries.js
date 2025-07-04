import { gql } from '@apollo/client';

// استعلام للحصول على جميع الكتب
export const GET_BOOKS = gql`
  query GetBooks($limit: Int, $offset: Int, $category: String, $search: String) {
    books(limit: $limit, offset: $offset, category: $category, search: $search) {
      id
      title
      author
      description
      coverImage
      category
      publishedDate
      rating
      totalPages
      language
      isbn
      createdAt
      updatedAt
    }
  }
`;

// استعلام للحصول على كتاب واحد بالتفصيل
export const GET_BOOK = gql`
  query GetBook($id: ID!) {
    book(id: $id) {
      id
      title
      author
      description
      coverImage
      category
      publishedDate
      rating
      totalPages
      language
      isbn
      content
      createdAt
      updatedAt
    }
  }
`;

// استعلام للحصول على محتوى الكتاب للقراءة
export const GET_BOOK_CONTENT = gql`
  query GetBookContent($id: ID!) {
    bookContent(id: $id) {
      id
      title
      author
      totalPages
      pages {
        pageNumber
        content
      }
    }
  }
`;

// استعلام للحصول على الكتب المفضلة للمستخدم
export const GET_USER_FAVORITES = gql`
  query GetUserFavorites {
    userFavorites {
      id
      book {
        id
        title
        author
        description
        coverImage
        category
        rating
      }
      createdAt
    }
  }
`;

// استعلام للحصول على معلومات المستخدم الحالي
export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    me {
      id
      name
      email
      avatar
      createdAt
      preferences {
        language
        theme
        fontSize
      }
    }
  }
`;

// استعلام للحصول على إحصائيات المستخدم
export const GET_USER_STATS = gql`
  query GetUserStats {
    userStats {
      totalBooksRead
      totalFavorites
      totalComments
      totalHighlights
      readingStreak
    }
  }
`;

// استعلام للبحث في الكتب
export const SEARCH_BOOKS = gql`
  query SearchBooks($query: String!, $limit: Int, $offset: Int) {
    searchBooks(query: $query, limit: $limit, offset: $offset) {
      books {
        id
        title
        author
        description
        coverImage
        category
        rating
      }
      totalCount
      hasMore
    }
  }
`;

// استعلام للحصول على الكتب الشائعة
export const GET_POPULAR_BOOKS = gql`
  query GetPopularBooks($limit: Int) {
    popularBooks(limit: $limit) {
      id
      title
      author
      description
      coverImage
      category
      rating
      totalReads
    }
  }
`;

// استعلام للحصول على الكتب الجديدة
export const GET_LATEST_BOOKS = gql`
  query GetLatestBooks($limit: Int) {
    latestBooks(limit: $limit) {
      id
      title
      author
      description
      coverImage
      category
      publishedDate
      rating
    }
  }
`;

// استعلام للحصول على الكتب المقترحة
export const GET_RECOMMENDED_BOOKS = gql`
  query GetRecommendedBooks($limit: Int) {
    recommendedBooks(limit: $limit) {
      id
      title
      author
      description
      coverImage
      category
      rating
      reason
    }
  }
`;

