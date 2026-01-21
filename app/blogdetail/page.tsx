"use client";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import {
  Calendar,
  ArrowLeft,
  Share2
} from "lucide-react";
import Navbar from "../navbar/Navbar";
import Footer from "@/app/footer/Footer";
import blog1 from '../../public/blogs/lap1.jpg';
import blog2 from '../../public/blogs/lap2.jpg';
import blog3 from '../../public/blogs/lap3.jpg';

export default function BlogDetail() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const slug = searchParams.get("slug");
    // const desc = searchParams.get("desc");
    // const img = searchParams.get("img");
     const blogs = [
        {    
            slug:"blog-post-1",
            title: "Blog Post 1",
            desc: "This is a summary of blog post 1. Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. This is a summary of blog post 1. Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            image: blog1,
            date: "Jan 19, 2024",
            category: "Web Development"
        },
        {
            slug:"blog-post-2",
            title: "Blog Post 2",
            desc: "This is a summary of blog post 2.",
            image: blog2,
            date: "Jan 18, 2024",
            category: "AI & ML"
        },
        {
            slug:"blog-post-3",
            title: "Blog Post 3",
            desc: "This is a summary of blog post 3. Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. This is a summary of blog post 3. Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            image: blog3,
            date: "Jan 17, 2024",           
            category: "Cloud Computing"
        }
    ];

    // if (!slug) {
    //     return (
    //         <div className="min-h-screen flex items-center justify-center">
    //             <div className="text-center">
    //                 <div className="text-5xl mb-4">📄</div>
    //                 <p className="text-gray-600 text-lg">No blog data available</p>
    //             </div>
    //         </div>
    //     );
    // }
    const blog = blogs.find((b) => b.slug === slug);
    if (!blog) return notFound();
    return (
        <>
        <Navbar />
        <div className="bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-white">
           {/*  <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium"
                        >
                            <ArrowLeft /> Back to Blogs
                        </button>
                        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center gap-2 text-white">
                            <Share2 /> Share
                        </button>
                    </div>
                </div>
            </nav> */}
            <article className="max-w-4xl mt-16 mx-auto px-4 py-8">
                <header className="mb-8">
                    <button
                            onClick={() => router.back()}
                            className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 font-medium mb-3"
                        >
                            <ArrowLeft /> Back to Blogs
                        </button>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                            Technology
                        </span>
                        <span className="dark:text-gray-200 text-sm flex items-center gap-2">
                            <Calendar /> {blog.date}
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                        {blog.title}
                    </h1>
                </header>

                {blog.image && (
                    <div className="relative h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden mb-10 shadow-lg">
                        <Image
                            src={blog.image}
                            alt={blog.title}
                            fill
                            className="object-fill"
                            sizes="(max-width: 1200px) 100vw, 1200px"
                        />
                    </div>
                )}

               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    {/* Key Takeaways Card - Takes full width */}
    <div className="lg:col-span-3">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl mb-10 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 rounded-xl">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Key Takeaways
                </h2>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-lg text-gray-800 dark:text-white leading-relaxed text-justify">
                    {blog.desc}
                </p>
                
                {/* Interactive Stats Bar */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></span>
                            <span className="text-sm font-medium text-gray-600 dark:text-white">Key Insights</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse"></span>
                            <span className="text-sm font-medium dark:text-white text-gray-600">Actionable Points</span>
                        </div>
                    </div>
                </div>
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