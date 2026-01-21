'use client';
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import blog1 from '../../public/blogs/lap1.jpg';
import blog2 from '../../public/blogs/lap2.jpg';
import blog3 from '../../public/blogs/lap3.jpg';
import Navbar from "../navbar/Navbar";
import Footer from "@/app/footer/Footer";
export default function BlogPage() {
    const blogs = [
        {
            slug: "best-laptop-rental-services-bangalore",
            title: "Why PCBricks Is Transforming Laptop Rentals in Bangalore’s Tech Ecosystem",
            desc: "Bangalore isn’t just India’s tech capital — it’s a melting pot of startups, freelancers, remote-first teams, and enterprise powerhouses that need efficient computing on-demand. Traditional device purchasing models are struggling to keep up with this rapid shift, and that’s where laptop rentals are quietly becoming the MVP of operational scalability. PCBricks is pioneering this wave by making laptop rentals smarter, faster, and more cost-aligned with how modern teams actually work.",
            image: blog1,
            date: "Jan 19, 2024",
            category: "Web Development"
        },
        {
            slug: "blog-post-2",
            title: "Blog Post 2",
            desc: "This is a summary of blog post 2.",
            image: blog2,
            date: "Jan 18, 2024",
            category: "AI & ML"
        },
        {
            slug: "blog-post-3",
            title: "Blog Post 3",
            desc: "This is a summary of blog post 3. Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. This is a summary of blog post 3. Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            image: blog3,
            date: "Jan 17, 2024",
            category: "Cloud Computing"
        }
    ];

    const truncateWords = (text: string, limit: number = 30) => {
        const words = text.split(" ");
        if (words.length <= limit) {
            return { text, truncated: false };
        }
        return {
            text: words.slice(0, limit).join(" ") + "...",
            truncated: true
        };
    };
    return (
        <>
            <Navbar />
            <div className='bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-white'>
                {/* <div className="min-h-screen bg-linear-to-b from-gray-50 to-white"> */}
                <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 text-gray-200 py-12 sm:py-16">
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Our Latest Blogs</h1>
                        <p className="text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto mb-6">
                            Discover insightful articles on technology, development, and innovation
                        </p>
                    </div>
                </div>

                <div className="max-full min-h-screen mx-auto px-4 py-8 sm:py-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogs.map((blog, index) => {
                            const { text, truncated } = truncateWords(blog.desc, 30);
                            return (
                                <Link
                                    key={index}
                                    href={`/blogdetail?slug=${blog.slug}`}
                                    className="block group"
                                >
                                    <div
                                        className="
                                            bg-white dark:bg-gray-800
                                            rounded-2xl overflow-hidden
                                            border border-gray-200 dark:border-gray-700
                                            shadow-sm dark:shadow-[0_0_20px_rgba(255,255,255,0.05)]
                                            hover:border-blue-300 dark:hover:border-blue-400
                                            hover:shadow-xl dark:hover:shadow-[0_0_25px_rgba(255,255,255,0.08)]
                                            transition-all duration-300
                                            h-full flex flex-col
                                        "
                                    >
                                        <div className="relative h-48 sm:h-56 overflow-hidden">
                                            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent z-10"></div>
                                            <Image
                                                src={blog.image}
                                                alt={blog.title}
                                                fill
                                                className="object-fill group-hover:scale-110 transition-transform duration-500"
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            />

                                            <div className="absolute top-2 left-2 z-20">
                                                <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                                                    {blog.category}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-5 sm:p-6 grow flex flex-col">

                                            <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                                                <span className="flex items-center gap-1 dark:text-white">
                                                    <Calendar size={12} /> {blog.date}
                                                </span>
                                            </div>

                                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                                                {blog.title}
                                            </h2>

                                            <p className="text-gray-600 dark:text-white mb-4 grow">
                                                {text}
                                            </p>

                                            <div className="flex justify-end gap-3 items-center pt-4 border-t border-gray-100 mt-auto">
                                                <div className="flex items-center  gap-2 text-blue-600 font-medium group-hover:gap-3 transition-all">
                                                    <span>View More</span>
                                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}