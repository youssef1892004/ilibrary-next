// src/app/layout.js

import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
// --- 1. استيراد المكون الجديد ---
import ConditionalLayout from "@/components/ConditionalLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "iLibrary - Your Online Reading Companion",
  description: "Discover and read thousands of books online.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="rtl" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {/* --- 2. استخدام المكون الجديد ليقوم بتغليف المحتوى --- */}
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </Providers>
        <script src="https://cloud.umami.is/script.js" data-website-id="e787ba1d-f1d5-4e4f-ac8a-deb0942d2f18">
        </script>
      </body>
    </html>
  );
}
