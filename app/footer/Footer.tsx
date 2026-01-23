"use client";
import Image from "next/image";
import {
  Brain,
  Truck,
  RotateCcw,
  Shield,
  Users,
  Moon,
  Sun,
  ArrowRight,
  CheckCircle,
  Zap,
  Clock,
  Award,
  Building,
  GraduationCap,
  Home,
  Quote,
  ChevronLeft,
  ChevronRight,
  X,
  MessageCircle,
  Headphones,
  Recycle,
  Monitor,
  ArrowUpRight,
  Facebook as LucideFacebook,
  Twitter as LucideTwitter,
  Instagram as LucideInstagram,
} from "lucide-react";
import { use } from "react";
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row md:items-center  gap-12 lg:gap-8 justify-between items-start">
          <div className="max-w-md flex-col lg:flex-row  md:items-center   flex !items-center">
            <div className="flex flex-col lg:flex-row md:items-center !items-center lg:items-start   gap-4">
              <Image
                src="/logo.png"
                width={100}
                height={100}
                alt="PCBricks Logo"
                className="w-28 h-28"
              />
              <div>
                <p className="mb-2 text-gray-400 leading-relaxed">
                  Empowering teams with intelligent device subscriptions.
                  Transform your business with cutting-edge technology.
                </p>
                <a
                  href="mailto:pcbricksinfo@gmail.com"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800/60 hover:bg-blue-800/70 transition-colors duration-200 w-fit mt-2 group"
                  title="Email us"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12l-4-4-4 4m8 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0V6a2 2 0 00-2-2H6a2 2 0 00-2 2v6"
                    />
                  </svg>
                  <span className="text-gray-200 group-hover:text-white font-medium select-all">
                    pcbricksinfo@gmail.com
                  </span>
                </a>
              </div>
            </div>
          </div>
          {/* Responsive Services Section */}
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto lg:mx-0">
            <h3 className="text-lg font-semibold mb-4 text-center lg:text-left">
              Services
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                {
                  label: "Laptop Rentals",
                  icon: <Monitor className="w-5 h-5 text-blue-400" />,
                },
                {
                  label: "Desktop Rentals",
                  icon: <Monitor className="w-5 h-5 text-purple-400" />,
                },
                {
                  label: "Enterprise Solutions",
                  icon: <Building className="w-5 h-5 text-green-400" />,
                },
                {
                  label: "Support",
                  icon: <Headphones className="w-5 h-5 text-pink-400" />,
                },
              ].map((service, idx) => (
                <a
                  key={service.label}
                  href="#"
                  className={`group flex flex-col items-center justify-center rounded-xl bg-gray-800/60 hover:bg-blue-700/70 transition-all duration-300 p-4 shadow-sm hover:shadow-lg opacity-0 animate-fadein min-h-[90px]`}
                  style={{
                    animationDelay: `${idx * 80}ms`,
                    animationFillMode: "forwards",
                  }}
                >
                  <span className="mb-2">{service.icon}</span>
                  <span className="text-sm text-gray-200 group-hover:text-white font-medium text-center">
                    {service.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
          {/* Company/Legal sections remain commented out */}
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-800 mt-12 pt-8 text-gray-400">
          <p className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} PCBricks.&nbsp;
            <span>All rights reserved.</span>
          </p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-600 transition-colors cursor-pointer"
            >
              <LucideFacebook className="w-5 h-5 text-white" />
            </a>
            <a
              href="https://x.com"
              aria-label="X"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-400 transition-colors cursor-pointer"
            >
              <LucideTwitter className="w-5 h-5 text-white" />
            </a>
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-pink-500 transition-colors cursor-pointer"
            >
              <LucideInstagram className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes fadein {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        .animate-fadein {
          animation: fadein 0.7s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
      `}</style>
    </footer>
  );
}
