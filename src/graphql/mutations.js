import { gql } from '@apollo/client';

// تسجيل الدخول
export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
        avatar
        preferences {
          language
          theme
          fontSize
        }
      }
    }
  }
`;

// إنشاء حساب جديد
export const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      token
      user {
        id
        name
        email
        avatar
        preferences {
          language
          theme
          fontSize
        }
      }
    }
  }
`;

// تسجيل الخروج
export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout {
      success
      message
    }
  }
`;

// إضافة كتاب إلى المفضلة
export const ADD_TO_FAVORITES = gql`
  mutation AddToFavorites($bookId: ID!) {
    addToFavorites(bookId: $bookId) {
      id
      book {
        id
        title
        author
        coverImage
      }
      createdAt
    }
  }
`;

// إزالة كتاب من المفضلة
export const REMOVE_FROM_FAVORITES = gql`
  mutation RemoveFromFavorites($bookId: ID!) {
    removeFromFavorites(bookId: $bookId) {
      success
      message
    }
  }
`;

// إضافة تعليق على كتاب
export const ADD_COMMENT = gql`
  mutation AddComment($input: CommentInput!) {
    addComment(input: $input) {
      id
      content
      selectedText
      pageNumber
      position {
        x
        y
      }
      createdAt
      user {
        id
        name
        avatar
      }
    }
  }
`;

// تحديث تعليق
export const UPDATE_COMMENT = gql`
  mutation UpdateComment($id: ID!, $content: String!) {
    updateComment(id: $id, content: $content) {
      id
      content
      updatedAt
    }
  }
`;

// حذف تعليق
export const DELETE_COMMENT = gql`
  mutation DeleteComment($id: ID!) {
    deleteComment(id: $id) {
      success
      message
    }
  }
`;

// إضافة تمييز نص
export const ADD_HIGHLIGHT = gql`
  mutation AddHighlight($input: HighlightInput!) {
    addHighlight(input: $input) {
      id
      selectedText
      pageNumber
      position {
        x
        y
      }
      color
      createdAt
    }
  }
`;

// حذف تمييز نص
export const DELETE_HIGHLIGHT = gql`
  mutation DeleteHighlight($id: ID!) {
    deleteHighlight(id: $id) {
      success
      message
    }
  }
`;

// تحديث تفضيلات المستخدم
export const UPDATE_USER_PREFERENCES = gql`
  mutation UpdateUserPreferences($input: UserPreferencesInput!) {
    updateUserPreferences(input: $input) {
      id
      preferences {
        language
        theme
        fontSize
      }
    }
  }
`;

// تحديث ملف المستخدم الشخصي
export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile($input: UserProfileInput!) {
    updateUserProfile(input: $input) {
      id
      name
      email
      avatar
      updatedAt
    }
  }
`;

// تغيير كلمة المرور
export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($currentPassword: String!, $newPassword: String!) {
    changePassword(currentPassword: $currentPassword, newPassword: $newPassword) {
      success
      message
    }
  }
`;

// تسجيل قراءة صفحة
export const TRACK_READING_PROGRESS = gql`
  mutation TrackReadingProgress($bookId: ID!, $pageNumber: Int!, $timeSpent: Int) {
    trackReadingProgress(bookId: $bookId, pageNumber: $pageNumber, timeSpent: $timeSpent) {
      id
      currentPage
      totalPages
      progressPercentage
      lastReadAt
    }
  }
`;

// إعادة تعيين كلمة المرور
export const RESET_PASSWORD = gql`
  mutation ResetPassword($email: String!) {
    resetPassword(email: $email) {
      success
      message
    }
  }
`;

// تأكيد إعادة تعيين كلمة المرور
export const CONFIRM_PASSWORD_RESET = gql`
  mutation ConfirmPasswordReset($token: String!, $newPassword: String!) {
    confirmPasswordReset(token: $token, newPassword: $newPassword) {
      success
      message
    }
  }
`;

// تحديث آخر نشاط للمستخدم
export const UPDATE_LAST_ACTIVITY = gql`
  mutation UpdateLastActivity {
    updateLastActivity {
      success
      lastActivity
    }
  }
`;

