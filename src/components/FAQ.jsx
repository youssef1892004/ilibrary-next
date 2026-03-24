"use client";

import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from 'react-icons/fa';

const FAQItem = ({ question, answer, isOpen, toggle }) => {
    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-md">
            <button
                onClick={toggle}
                className="w-full px-6 py-4 flex items-center justify-between text-right bg-white dark:bg-gray-800 focus:outline-none"
            >
                <div className="flex items-center gap-3">
                    <FaQuestionCircle className="text-purple-500 flex-shrink-0" />
                    <span className="font-semibold text-gray-900 dark:text-gray-100">{question}</span>
                </div>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <FaChevronDown className="text-gray-400" />
                </span>
            </button>
            <div
                className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="px-6 pb-4 pt-0 text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-700/50 mt-2">
                    <p className="pt-2">{answer}</p>
                </div>
            </div>
        </div>
    );
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        {
            question: "هل قراءة الكتب مجانية بالكامل؟",
            answer: "نعم، جميع الكتب المتوفرة في مكتبة معجم متاحة للقراءة المجانية 100% ولا تتطلب أي رسوم اشتراك."
        },
        {
            question: "كيف يمكنني حفظ تقدمي في القراءة؟",
            answer: "يتم حفظ تقدمك تلقائياً أثناء القراءة. عند عودتك، يمكنك تكمال القراءة من حيث توقفت عبر زر 'أكمل القراءة' في الصفحة الرئيسية أو صفحة الكتاب."
        },
        {
            question: "هل يمكنني قراءة الكتب بدون اتصال بالإنترنت؟",
            answer: "حالياً، تتطلب المكتبة اتصالاً بالإنترنت لتصفح وقراءة الكتب. نعمل على توفير ميزة القراءة دون اتصال في التحديثات القادمة."
        },
        {
            question: "كيف يمكنني تغيير مظهر القراءة (الوضع الليلي)؟",
            answer: "يمكنك تغيير الوضع من داخل صفحة القراءة عن طريق لوحة التحكم العائمة، حيث يمكنك الاختيار بين الوضع النهاري، الليلي، أو الورقي."
        },
        {
            question: "هل يمكنني المساهمة وإضافة كتب للمكتبة؟",
            answer: "نسعد بمساهماتكم! يمكنك التواصل معنا عبر صفحة 'اتصل بنا' لإرسال اقتراحات الكتب أو إذا كنت كاتباً وترغب في نشر أعمالك."
        }
    ];

    return (
        <section className="py-20 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        الأسئلة الشائعة
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        إجابات سريعة على معظم استفساراتكم
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            toggle={() => setOpenIndex(index === openIndex ? -1 : index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
