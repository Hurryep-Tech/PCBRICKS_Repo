"use client";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import { blogs } from "@/app/data/blogs";

import Navbar from "../navbar/Navbar";
import Footer from "@/app/footer/Footer";
export default function BlogPage() {
  const truncateWords = (text: string, limit: number = 30) => {
    const words = text.split(" ");
    if (words.length <= limit) {
      return { text, truncated: false };
    }
    return {
      text: words.slice(0, limit).join(" ") + "...",
      truncated: true,
    };
  };
  return (
    <>
      <Navbar />
      <div className="bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-white">
        {/* <div className="min-h-screen bg-linear-to-b from-gray-50 to-white"> */}
        <div className="mt-12 dark:text-gray-100 text-gray-900 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Our Latest Blogs
            </h1>
            <p className="text-lg sm:text-xl dark:text-gray-100  text-gray-900 max-w-3xl mx-auto ">
              Discover insightful articles on technology, development, and
              innovation
            </p>
          </div>
        </div>

        <div className="max-full min-h-screen mx-auto px-4 py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogs.map((blog, index) => {
              const { text, truncated } = truncateWords(blog.desc, 30);
              return (
                <Link
                  key={index}
                  href={`/blogdetail/${blog.slug}`}
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
  );
}
