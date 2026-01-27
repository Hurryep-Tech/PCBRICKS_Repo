"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { blogs } from "@/app/data/blogs";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function BlogCards() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);

  const truncateWords = (text: string = "", limit = 20) => {
    const words = text.trim().split(/\s+/);
    return words.length > limit
      ? words.slice(0, limit).join(" ") + "..."
      : text;
  };

  return (
    <div className="py-8 relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={24}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        speed={1200}
        pagination={{
          clickable: true,
          el: paginationRef.current,
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          if (prevRef.current && nextRef.current && paginationRef.current) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.params.pagination.el = paginationRef.current;
          }
        }}
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
              key={index}
              href={`/blogdetail/${blog.slug}`}
              className="block group"
            >
              <div
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden
                border border-gray-200 dark:border-gray-700
                shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-fill group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* <span
                    className="absolute top-2 left-2 px-3 py-1 bg-gradient-to-r
                    from-blue-600 to-purple-600 text-white text-sm rounded-full"
                  >
                    {blog.category}
                  </span> */}
                </div>

                <div className="p-5 flex flex-col grow">
                  <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                    <Calendar size={12} /> {blog.date}
                  </div>

                  <h3 className="text-lg font-bold mb-2 line-clamp-2 text-gray-900 dark:text-white">
                    {blog.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 line-clamp-3 min-h-[72px]">
                    {truncateWords(blog.desc)}
                  </p>

                  <div className="flex justify-end items-center !mt-4 text-blue-600 font-medium">
                    View More <ArrowRight className="ml-1" />
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination & Arrows */}
      {/* Custom Pagination & Arrows */}
      <div className="flex justify-center mt-8">
        <div className="flex   items-center  mt-4">
          {/* Previous Arrow */}
          <button
            ref={prevRef}
            className="w-10 h-10 flex items-center  justify-center bg-gray-200 dark:bg-gray-700 rounded-full text-gray-700 dark:text-white hover:bg-blue-600 hover:text-white transition"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Pagination Dots */}
          <div
            ref={paginationRef}
            className="flex items-center gap-1 flex-1 justify-center mx-4"
          ></div>

          {/* Next Arrow */}
          <button
            ref={nextRef}
            className="w-10 h-10 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-full text-gray-700 dark:text-white hover:bg-blue-600 hover:text-white transition"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
