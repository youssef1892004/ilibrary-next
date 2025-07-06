// src/app/layout.js

import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "iLibrary - Your Online Reading Companion",
  description: "Discover and read thousands of books online.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="rtl">
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            {/* --- التعديل هنا: تمت إضافة pt-16 --- */}
            {/* هذا الكلاس يضيف مسافة علوية بحجم شريط التنقل لدفع المحتوى للأسفل */}
            <main className="flex-grow pt-16">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
