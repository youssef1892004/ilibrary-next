import { Inter, Tajawal } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import ConditionalLayout from "@/components/ConditionalLayout";
import Script from "next/script"; // ✅ مكون السكربت

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const tajawal = Tajawal({ subsets: ["arabic"], weight: ['400', '700'], variable: '--font-tajawal' });

export const metadata = {
  title: "iLibrary - Your Online Reading Companion",
  description: "Discover and read thousands of books online.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://graphql-333f98f9a304.hosted.ghaymah.systems" />
      </head>
      <body className={`${inter.variable} ${tajawal.variable} font-sans`}>
        <Providers>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </Providers>
        {/* ✅ استبدال السكربت بهذا المكون */}
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="e787ba1d-f1d5-4e4f-ac8a-deb0942d2f18"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
