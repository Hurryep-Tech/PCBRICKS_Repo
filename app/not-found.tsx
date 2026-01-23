// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center  !bg-white dark:from-gray-900 dark:to-black px-4">
      <div className="max-w-md w-full text-center ">
        {/* 404 Number */}
        <h1 className="text-8xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          404
        </h1>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          Oops! The page you’re trying to reach doesn’t exist or may have been
          moved.
        </p>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
