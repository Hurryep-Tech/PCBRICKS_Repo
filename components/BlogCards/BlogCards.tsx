'use client';

import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import { blogs } from "@/app/data/blogs";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function BlogCards() {

  // Function to truncate blog description
  const truncateWords = (text: string, limit = 30) => {
    const words = text.split(" ");
    return words.length <= limit
      ? text
      : words.slice(0, limit).join(" ") + "...";
  };

  return (
    <div className="py-8">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={24}
        loop={true} // Important for continuous autoplay
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        speed={1200} // Slide transition speed
        pagination={{ clickable: true }}
        navigation
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        className="pb-12"
      >
        {blogs.map((blog, index) => (
          <SwiperSlide key={index}>
            <Link
              href={`/blogdetail?slug=${blog.slug}`}
              className="block group h-full"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden
                border border-gray-200 dark:border-gray-700
                shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col"
              >
                {/* Blog Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <span className="absolute top-2 left-2 px-3 py-1 bg-gradient-to-r
                    from-blue-600 to-purple-600 text-white text-sm rounded-full">
                    {blog.category}
                  </span>
                </div>

                {/* Blog Content */}
                <div className="p-5 flex flex-col grow">
                  <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                    <Calendar size={12} /> {blog.date}
                  </div>

                  <h3 className="text-lg font-bold mb-2 line-clamp-2 text-gray-900 dark:text-white">
                    {blog.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 grow">
                    {truncateWords(blog.desc)}
                  </p>

                  <div className="flex justify-end items-center mt-4 text-blue-600 font-medium">
                    View More <ArrowRight className="ml-1" />
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
