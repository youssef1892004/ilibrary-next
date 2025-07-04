// src/app/page.tsx

import Hero from '@/components/Hero';
import LatestBooks from '@/components/LatestBooks';
import LatestWriters from '@/components/LatestWriters';
import Testimonials from '@/components/Testimonials';
import ComingSoon from '@/components/ComingSoon';

export default function HomePage() {
  return (
    // -- التعديل هنا: أضفنا لون خلفية داكن للصفحة الرئيسية --
    <main className="bg-white dark:bg-gray-900">
      <Hero />
      {/* سنضيف المسافات يدويًا بدلاً من space-y */}
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