"use client";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import {
    Calendar,
    ArrowLeft,
    CheckCircle,
    MapPin,
    TrendingUp
} from "lucide-react";
import Navbar from "../navbar/Navbar";
import Footer from "@/app/footer/Footer";

export default function BlogDetailClient({ blog }: { blog: any }) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const slug = searchParams.get("slug");

    // Format the content - simple and clean
    const formatContent = (content) => {

        const lines = content.split('\n');
        return lines.map((line, index) => {
            const trimmedLine = line.trim();
            const isBullet =
                trimmedLine.length > 0 &&
                trimmedLine.length < 120 &&
                !/[.:?]$/.test(trimmedLine) &&
                /[a-zA-Z]/.test(trimmedLine);

            // Skip empty lines
            if (!trimmedLine) return <div key={index} className="h-4" />;

            // Check for numbered sections (1., 2., 3., 4.)
            if (/^\d+\.\s/.test(trimmedLine)) {
                return (
                    <div key={index} className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                                {trimmedLine.split('.')[0]}
                            </div>
                            <h3 className="text-xl  font-bold text-gray-900 dark:text-white ">
                                {trimmedLine.substring(trimmedLine.indexOf(' ') + 1)}
                            </h3>
                        </div>
                    </div>
                );
            }

            // Check for checkmark items (✔)
            if (trimmedLine.includes('✔')) {
                return (
                    <div key={index} className="flex items-start gap-2 mb-2 ml-6">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300 text-justify">
                            {trimmedLine.replace('✔', '').trim()}
                        </span>
                    </div>
                );
            }

            // Check for bullet list items (starts with capital letter, not too long)
            if (isBullet) {
                return (
                    <div key={index} className="flex items-start gap-2 mb-0 ml-0 ">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                        <span className="text-gray-700 font-bold dark:text-gray-300 text-justify">
                            {trimmedLine}
                        </span>
                    </div>
                );
            }

            // Check for location items
            if (['Koramangala', 'HSR Layout', 'Indiranagar', 'Whitefield', 'Electronic City', 'Marathahalli', 'Bannerghatta Road', 'Bellandur', 'Manyata Tech Park'].some(loc => trimmedLine === loc)) {
                return (
                    <div key={index} className="flex items-center gap-2 mb-1 ml-8">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        <span className="text-gray-600 dark:text-gray-400 text-justify">
                            {trimmedLine}
                        </span>
                    </div>
                );
            }

            // Check for comparison lines
            if (trimmedLine.includes('depreciates') || trimmedLine.includes('CapEx') || trimmedLine.includes('OpEx')) {
                const parts = trimmedLine.split(/\s{2,}/);
                return (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        {parts.map((part, i) => (
                            <div key={i} className={`flex items-center gap-2 ${i === 0 ? 'text-blue-600 dark:text-blue-400' : 'text-green-600 dark:text-green-400'}`}>
                                {i === 0 ? (
                                    <>
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <span className="font-medium text-justify">{part}</span>
                                    </>
                                ) : (
                                    <>
                                        <TrendingUp className="w-4 h-4" />
                                        <span className="font-medium text-justify">{part}</span>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                );
            }

            // Check for CTA section (contains Call/WhatsApp, Website, Email)
            if (trimmedLine.includes('Call / WhatsApp') || trimmedLine.includes('Website:') || trimmedLine.includes('Email:')) {
                return (
                    <div key={index} className="mb-3">
                        <span className="text-gray-800 dark:text-gray-200 font-medium text-justify">
                            {trimmedLine}
                        </span>
                    </div>
                );
            }

            // Check for section heading (bold text without numbers)
            if (trimmedLine.split(' ').length <= 8 && /^[A-Z][a-zA-Z\s]+$/.test(trimmedLine)) {
                return (
                    <h4 key={index} className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">
                        {trimmedLine}
                    </h4>
                );
            }

            // Check for question
            if (trimmedLine.endsWith('?')) {
                return (
                    <div key={index} className="my-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                        <p className="text-gray-800 dark:text-gray-200 font-medium italic text-justify">
                            {trimmedLine}
                        </p>
                    </div>
                );
            }

            // Regular paragraph
            return (
                <p key={index} className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed text-justify">
                    {trimmedLine}
                </p>
            );
        });
    };

    return (
        <>
            <Navbar />
            <div className="bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
                <article className="max-w-4xl mx-auto px-4 py-8 mt-20">
                    {/* Back Button */}
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium mb-8"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Blogs
                    </button>

                    {/* Header */}
                    <header className="mb-10">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                                {blog.category}
                            </span>
                            <span className="text-sm flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                <Calendar size={16} />
                                {blog.date}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                            {blog.title}
                        </h1>
                    </header>

                    {/* Featured Image */}
                    {blog.image && (
                        <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-10 lg:h-[400px]">
                            <Image
                                src={blog.image}
                                alt={blog.title}
                                fill
                                className="object-fill"
                                sizes="(max-width: 1200px) 100vw, 1200px"
                                priority
                            />
                        </div>
                    )}

                    {/* Key Takeaways */}
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 mb-10 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                Key Takeaways
                            </h2>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                            {blog.desc}
                        </p>
                    </div>

                    {/* Main Content */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 mb-10">
                        <div className="space-y-6">
                            {formatContent(blog.content)}
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 md:p-8">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            Ready to Get Started?
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Contact Information</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white dark:bg-gray-700 rounded-lg">
                                            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Phone/WhatsApp</p>
                                            <p className="font-medium text-gray-900 dark:text-white">+91 8105891568</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white dark:bg-gray-700 rounded-lg">
                                            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                                            <p className="font-medium text-gray-900 dark:text-white">pcbricksinfo@gmail.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white dark:bg-gray-700 rounded-lg">
                                            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9 3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Website</p>
                                            <p className="font-medium text-gray-900 dark:text-white">www.pcbricks.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Service Areas</h4>
                                <p className="text-gray-600 dark:text-gray-300 mb-3">
                                    Serving all across Bangalore including:
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {['Koramangala', 'HSR Layout', 'Indiranagar', 'Whitefield', 'Electronic City', 'Marathahalli', 'Bannerghatta Road'].map((area, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-white dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300">
                                            {area}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
            <Footer />
        </>
    );
}