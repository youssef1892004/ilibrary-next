import { Inter } from "next/font/google";
import "./globals.css"; // هنا يتم استيراد ملف الـ CSS
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "iLibrary - مكتبتي",
  description: "A modern digital library for everyone",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            {/* إضافة مساحة فارغة تحت الـ Navbar الثابت */}
            <main className="flex-grow pt-20"> 
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}