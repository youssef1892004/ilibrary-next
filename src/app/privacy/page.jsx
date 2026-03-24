import React from 'react';

export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">سياسة الخصوصية</h1>

            <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    آخر تحديث: {new Date().toLocaleDateString('ar-EG')}
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">1. مقدمة</h2>
                    <p>
                        مرحباً بك في Muejam Library. نحن نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية. توضح سياسة الخصوصية هذه كيفية جمعنا واستخدامنا وحمايتنا لمعلوماتك عند استخدامك لموقعنا.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">2. البيانات التي نجمعها</h2>
                    <ul className="list-disc pr-6 space-y-2">
                        <li><strong>معلومات الحساب:</strong> الاسم، البريد الإلكتروني، وكلمة المرور (مشفرة).</li>
                        <li><strong>تفضيلات القراءة:</strong> سجل الكتب المقروءة، العلامات المرجعية، والكتب المفضلة.</li>
                        <li><strong>البيانات التقنية:</strong> عنوان IP، نوع المتصفح، ومعلومات الجهاز لتحسين الأداء والأمان.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">3. كيف نستخدم بياناتك</h2>
                    <p>نستخدم المعلومات التي نجمعها من أجل:</p>
                    <ul className="list-disc pr-6 space-y-2">
                        <li>توفير وتحسين خدمات المكتبة وتجربة القراءة.</li>
                        <li>حفظ تقدمك في القراءة ومزامنة بياناتك عبر الأجهزة.</li>
                        <li>إرسال تحديثات مهمة حول حسابك أو تغييرات في الخدمة (عند الضرورة).</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">4. ملفات تعريف الارتباط (Cookies)</h2>
                    <p>
                        نحن نستخدم ملفات تعريف الارتباط (Cookies) لتحسين تجربة استخدامك، والحفاظ على جلسة تسجيل دخولك نشطة، وتذكر تفضيلاتك مثل الوضع الليلي.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">5. أمن البيانات</h2>
                    <p>
                        نحن نتخذ تدابير أمنية مناسبة لحماية بياناتك من الوصول غير المصرح به أو التغيير أو الكشف أو الإتلاف. ومع ذلك، لا يمكن ضمان أمان نقل البيانات عبر الإنترنت بنسبة 100%.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">6. اتصل بنا</h2>
                    <p>
                        إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى التواصل معنا عبر صفحة <a href="/contact" className="text-purple-600 hover:underline">اتصل بنا</a>.
                    </p>
                </section>
            </div>
        </div>
    );
}
