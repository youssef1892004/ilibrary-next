// src/app/page.tsx

import Hero from '@/components/Hero';
import LatestBooks from '@/components/LatestBooks';
import LatestWriters from '@/components/LatestWriters';
import Testimonials from '@/components/Testimonials';
import ComingSoon from '@/components/ComingSoon';
import ContinueReading from '@/components/ContinueReading'; // 1. استيراد المكون الجديد

export const metadata = {
  title: 'iLibrary - آلاف الكتب الإلكترونية المجانية بين يديك',
  description: 'اكتشف واستكشف آلاف الكتب والروايات الإلكترونية المجانية في مختلف المجالات عبر مكتبة iLibrary، رفيقك الأول للقراءة أونلاين.',
};

export default function HomePage() {
  return (
    <main className="bg-white dark:bg-gray-900">
      <Hero />
      
      {/* --- بداية التعديل: إضافة قسم "أكمل القراءة" --- */}
      <div className="py-12">
        <ContinueReading />
      </div>
      {/* --- نهاية التعديل --- */}

      <div className="py-12">
        <LatestBooks />
      </div>
      <div className="py-12">
        <LatestWriters />
      </div>
      <div className="py-12">
        <ComingSoon />
      </div>
      <div className="py-12">
        <Testimonials />
      </div>
    </main>
  );
}