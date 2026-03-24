import { Inter, Tajawal } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import ConditionalLayout from "@/components/ConditionalLayout";
import NotificationBanner from "@/components/NotificationBanner"; // Import the new component
import FacebookNotification from "@/components/FacebookNotification"; // Import the new component
import Script from "next/script"; // ✅ مكون السكربت

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const tajawal = Tajawal({ subsets: ["arabic"], weight: ['400', '700'], variable: '--font-tajawal' });

export const metadata = {
  title: "Muejam Library - Your Online Reading Companion",
  description: "Discover and read thousands of books online at Muejam Library.",
};

import { getSession } from "@/lib/auth"; // Import auth helper
import NextTopLoader from 'nextjs-toploader';

export default async function RootLayout({ children }) {
  const session = await getSession(); // Fetch session server-side

  return (
    <html lang="en" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://graphql-333f98f9a304.hosted.ghaymah.systems" />
      </head>
      <body className={`${inter.variable} ${tajawal.variable} font-sans`}>
        <NextTopLoader color="#9333ea" showSpinner={false} />
        <Providers initialUser={session}> {/* Pass session to Providers */}
          <ConditionalLayout>
            {children}
            <NotificationBanner />
            <FacebookNotification />
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
