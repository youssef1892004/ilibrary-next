import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">شروط الاستخدام</h1>

            <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    آخر تحديث: {new Date().toLocaleDateString('ar-EG')}
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">1. قبول الشروط</h2>
                    <p>
                        بوصولك واستخدامك لموقع Muejam Library، فإنك توافق على الالتزام بشروط الاستخدام هذه وجميع القوانين واللوائح المعمول بها. إذا كنت لا توافق على أي من هذه الشروط، يُحظر عليك استخدام هذا الموقع.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">2. ترخيص الاستخدام</h2>
                    <p>
                        يُسمح لك ب閲覧 (تصفح) وقراءة الكتب المتاحة على الموقع للاستخدام الشخصي وغير التجاري فقط. بموجب هذا الترخيص، لا يجوز لك:
                    </p>
                    <ul className="list-disc pr-6 space-y-2">
                        <li>تعديل أو نسخ المواد (إلا ما يُسمح به قانوناً للاستخدام العادل).</li>
                        <li>استخدام المواد لأي غرض تجاري أو للعرض العام.</li>
                        <li>محاولة فك تشفير أو عكس هندسة أي برنامج موجود على الموقع.</li>
                        <li>نقل المواد إلى شخص آخر أو "نسخ متطابق" للمواد على أي خادم آخر.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">3. إخلاء المسؤولية</h2>
                    <p>
                        يتم توفير المواد على موقع Muejam Library "كما هي". لا تقدم Muejam Library أي ضمانات، صريحة أو ضمنية، وتنفي بموجب هذا وتلغي جميع الضمانات الأخرى بما في ذلك، على سبيل المثال لا الحصر، الضمانات الضمنية أو شروط التسويق أو الملاءمة لغرض معين.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">4. حقوق الملكية الفكرية</h2>
                    <p>
                        جميع المحتويات (الكتب، النصوص، الشعارات) هي ملك لأصحابها الشرعيين. نحن نسعى لتوفير المحتوى المتاح قانونياً أو برخصة المشاع الإبداعي. إذا كنت تعتقد أن هناك محتوى ينتهك حقوق الملكية الخاصة بك، يرجى <Link href="/contact" className="text-purple-600 hover:underline">الاتصال بنا</Link> فوراً لإزالته.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">5. الحساب والأمان</h2>
                    <p>
                        أنت مسؤول عن الحفاظ على سرية معلومات حسابك وكلمة المرور الخاصة بك، وتوافق على قبول المسؤولية عن جميع الأنشطة التي تحدث تحت حسابك.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">6. تعديلات الشروط</h2>
                    <p>
                        قد تقوم Muejam Library بمراجعة شروط الخدمة هذه في أي وقت دون إشعار مسبق. باستخدامك لهذا الموقع، النك توافق على الالتزام بالإصدار الحالي من شروط الاستخدام هذه.
                    </p>
                </section>
            </div>
        </div>
    );
}
