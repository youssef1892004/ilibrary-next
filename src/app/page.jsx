// src/app/page.tsx

import Hero from '@/components/Hero';
import LatestBooks from '@/components/LatestBooks';
import LatestWriters from '@/components/LatestWriters';
import Testimonials from '@/components/Testimonials';
import ContinueReading from '@/components/ContinueReading';
import FeaturesStats from '@/components/FeaturesStats';
import WhyChooseUs from '@/components/WhyChooseUs';
import StudioPromo from '@/components/StudioPromo';
import CategoriesGrid from '@/components/CategoriesGrid';
import Newsletter from '@/components/Newsletter';
import FAQ from '@/components/FAQ';

export const metadata = {
  title: 'Muejam Library - الآف الكتب الإلكترونية المجانية بين يديك',
  description: 'اكتشف واستكشف آلاف الكتب والروايات الإلكترونية المجانية في مختلف المجالات عبر مكتبة Muejam Library، رفيقك الأول للقراءة أونلاين.',
};

export default function HomePage() {
  return (
    <main className="bg-white dark:bg-gray-900">
      <Hero />

      <div className="py-12">
        <ContinueReading />
      </div>
      {/* --- نهاية التعديل --- */}

      <CategoriesGrid />

      <FeaturesStats />

      <WhyChooseUs />

      <div className="py-12">
        <LatestBooks />
      </div>

      <Newsletter />
      <div className="py-12">
        <LatestWriters />
      </div>
      <div className="py-12">
        <StudioPromo />
      </div>
      <div className="py-12">
        <FAQ />
      </div>
      <div className="py-12">
        <Testimonials />
      </div>
    </main>
  );
}