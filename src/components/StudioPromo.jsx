'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaMicrophone, FaVideo, FaImage, FaMagic } from 'react-icons/fa';

export default function StudioPromo() {
    const features = [
        { icon: FaImage, label: 'تعديل الصور بالذكاء الاصطناعي' },
        { icon: FaMicrophone, label: 'هندسة صوتية احترافية' },
        { icon: FaVideo, label: 'مونتاج فيديو سينمائي' },
        { icon: FaMagic, label: 'أدوات إبداعية غير محدودة' },
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    <div className="lg:w-1/2 text-center lg:text-right">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-semibold mb-6">
                            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                            جديد من معجم
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                            أطلق العنان لإبداعك مع <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Muejam Studio</span>
                        </h2>

                        <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                            استوديو شامل يجمع كل ما تحتاجه من أدوات لتعديل الصور، الصوت، والفيديو في مكان واحد. صمم، عدل، وأنتج محتوى احترافي بسهولة.
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mb-10 max-w-lg mx-auto lg:mx-0">
                            {features.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
                                        <item.icon size={16} />
                                    </div>
                                    <span className="text-sm font-medium text-gray-200">{item.label}</span>
                                </div>
                            ))}
                        </div>

                        <a
                            href="https://studio.muejam.com/login"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-white text-gray-900 hover:bg-gray-100 font-bold py-4 px-10 rounded-xl text-lg transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl"
                        >
                            <FaMagic className="text-purple-600" />
                            جرب الاستوديو مجاناً
                        </a>
                    </div>

                    <div className="lg:w-1/2 relative">
                        <div className="relative z-10 bg-gray-800 rounded-2xl p-2 shadow-2xl border border-gray-700 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                            <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden relative group">
                                {/* Mockup UI / Screenshot placeholder */}
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50 group-hover:bg-gray-800/30 transition-colors">
                                    <FaVideo className="text-6xl text-white/20" />
                                </div>
                                <Image
                                    src="https://res.cloudinary.com/dnveptlzm/image/upload/v1751317304/auth-image_rjnuwu.jpg" // Using auth image as placeholder for now, user said "go see it" but I can't screenshot. 
                                    alt="Muejam Studio Interface"
                                    width={800}
                                    height={450}
                                    className="w-full h-full object-cover opacity-80"
                                />
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce-slow"></div>
                        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce-slow" style={{ animationDelay: '1s' }}></div>
                    </div>

                </div>
            </div>
        </section>
    );
}
