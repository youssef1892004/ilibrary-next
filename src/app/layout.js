// src/app/layout.js

import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeProvider from "@/context/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "iLibrary - Your Online Reading Companion",
  description: "Discover and read thousands of books online.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="rtl" suppressHydrationWarning>
      <body className={inter.className}>
        {/* <ThemeProvider attribute="class" defaultTheme="light" enableSystem> */}
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
        {/* </ThemeProvider> */}
        <script defer src="https://cloud.umami.is/script.js" data-website-id="e787ba1d-f1d5-4e4f-ac8a-deb0942d2f18">
        </script>
      </body>
    </html>
  );
}
