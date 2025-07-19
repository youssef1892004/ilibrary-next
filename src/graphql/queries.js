import { gql } from '@apollo/client';

// استعلام للحصول على جميع الكتب (مع طلب العلاقات الصحيحة)
export const GET_BOOKS = gql`
  query GetBooks($limit: Int, $offset: Int, $category: String, $search: String) {
    # قد يكون اسم الجدول libaray_Book أو books
    libaray_Book(limit: $limit, offset: $offset, where: {category: {name: {_eq: $category}}, title: {_ilike: $search}}) {
      id
      title
      coverImage
      # طلب كائن المؤلف للحصول على الاسم
      author {
        name
      }
      # طلب كائن التصنيف للحصول على الاسم
      category {
        name
      }
    }
  }
`;

// استعلام للحصول على كتاب واحد بالتفصيل (مع كل العلاقات الصحيحة)
export const GET_BOOK = gql`
  query GetBook($id: uuid!) {
    # قد يكون اسم الجدول libaray_Book_by_pk أو book_by_pk
    libaray_Book_by_pk(id: $id) {
      id
      title
      description
      coverImage
      publication_date: publicationDate
      ISBN
      total_pages
      
      # طلب كائن المؤلف للحصول على الاسم
      author {
        name
      }
      
      # طلب كائن التصنيف للحصول على الاسم
      category {
        name
      }

      # طلب قائمة الفصول كاملة
      chapter {
        id
        title
        chapter_num
      }
    }
  }
`;

// --- باقي الاستعلامات ---

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

export const GET_USER_FAVORITES = gql`
  query GetUserFavorites {
    userFavorites {
      id
      book {
        id
        title
        coverImage
        author {
          name
        }
        category {
          name
        }
      }
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    me {
      id
      name
      email
      avatar
    }
  }
`;

export const SEARCH_BOOKS = gql`
  query SearchBooks($query: String!, $limit: Int, $offset: Int) {
    searchBooks(query: $query, limit: $limit, offset: $offset) {
      books {
        id
        title
        coverImage
        author {
          name
        }
        category {
          name
        }
      }
    }
  }
`;