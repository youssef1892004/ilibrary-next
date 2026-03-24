import Link from 'next/link';
import { FaBookDead, FaHome } from 'react-icons/fa';

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
            <FaBookDead className="text-9xl text-gray-300 dark:text-gray-700 mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
                404
            </h1>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
                عفواً، هذه الصفحة غير موجودة
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
                يبدو أن الكتاب الذي تبحث عنه قد سقط من الرف، أو أن الصفحة التي تحاول الوصول إليها قد تم نقلها.
            </p>
            <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium shadow-md hover:shadow-lg"
            >
                <FaHome />
                <span>العودة للرئيسية</span>
            </Link>
        </div>
    );
}
