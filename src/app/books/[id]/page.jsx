// src/app/books/[id]/page.jsx
import { booksData } from "@/data/mockData"; 
import BookDetailsClient from "./BookDetailsClient";

async function getBookData(id) {
  try {
    const book = booksData.find((book) => book.id == id);
    return book;
  } catch (error) {
    console.error("Failed to find book in local data:", error);
    return null;
  }
}

export default async function BookDetailsPage({ params }) {
  const { id } = params;
  const book = await getBookData(id);

  if (!book) {
    return <div className="text-center py-40">لم يتم العثور على الكتاب.</div>;
  }

  return <BookDetailsClient book={book} />;
}