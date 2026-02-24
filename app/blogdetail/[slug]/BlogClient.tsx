"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Calendar, ArrowLeft, CheckCircle, MapPin } from "lucide-react";
import Navbar from "../../navbar/Navbar";
import Footer from "@/app/footer/Footer";

// Bangalore locations array
const BANGALORE_LOCATIONS = [
  "Koramangala",
  "HSR Layout",
  "Indiranagar",
  "Whitefield",
  "Electronic City",
  "Marathahalli",
  "Bannerghatta Road",
  "Bellandur",
  "Manyata Tech Park",
];

export default function BlogDetailClient({ blog }) {
  const router = useRouter();

  // Format content from array structure
  // const formatContent = (content) => {
  //   if (!content || !Array.isArray(content)) return null;

  //   return content.map((section, sectionIndex) => (
  //     <div key={sectionIndex} className="mb-8">
  //       {/* Section Heading */}
  //       {section.heading && (
  //         <div className="flex items-center gap-3 mb-4">
  //           <div className="hidden lg:block md:block">
  //             <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
  //               {section.heading.split(".")[0]}
  //             </div>
  //           </div>
  //           <h3 className="text-xl font-bold text-gray-900 dark:text-white">
  //             {section.heading.substring(section.heading.indexOf(" ") + 1)}
  //           </h3>
  //         </div>
  //       )}

  //       {/* Section Paragraphs */}
  //       <div className="space-y-3">
  //         {section.paragraphs?.map((para, paraIndex) => {
  //           const trimmedPara = para.trim();

  //           // Handle bullet points with checkmarks
  //           if (trimmedPara.startsWith("✔")) {
  //             return (
  //               <div key={paraIndex} className="flex items-start gap-2 ml-4">
  //                 <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
  //                 <span className="text-gray-700 dark:text-gray-300">
  //                   {trimmedPara.replace("✔", "").trim()}
  //                 </span>
  //               </div>
  //             );
  //           }

  //           // Handle Bangalore locations
  //           if (BANGALORE_LOCATIONS.includes(trimmedPara)) {
  //             return (
  //               <div key={paraIndex} className="flex items-center gap-2 ml-6">
  //                 <MapPin className="w-4 h-4 text-blue-500" />
  //                 <span className="text-gray-600 dark:text-gray-300">
  //                   {trimmedPara}
  //                 </span>
  //               </div>
  //             );
  //           }

  //           // Handle bullet points (short lines that start with capital letter)
  //           if (trimmedPara.length < 100 && /^[A-Z]/.test(trimmedPara) && !trimmedPara.endsWith(":")) {
  //             return (
  //               <div key={paraIndex} className="flex items-start gap-2">
  //                 <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 flex-shrink-0"></div>
  //                 <span className="text-gray-700 dark:text-gray-300 font-medium">
  //                   {trimmedPara}
  //                 </span>
  //               </div>
  //             );
  //           }

  //           // Handle questions
  //           if (trimmedPara.endsWith("?")) {
  //             return (
  //               <div key={paraIndex} className="my-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
  //                 <p className="text-gray-800 dark:text-gray-200 font-medium italic">
  //                   {trimmedPara}
  //                 </p>
  //               </div>
  //             );
  //           }

  //           // Default paragraph
  //           return (
  //             <p key={paraIndex} className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
  //               {trimmedPara}
  //             </p>
  //           );
  //         })}
  //       </div>
  //     </div>
  //   ));
  // };
  const formatContent = (content) => {
    if (!content || !Array.isArray(content)) return null;

    return content.map((section, sectionIndex) => {
      // ✅ Handle contact type section
      if (section.type === "contact") {
        return (
          <div key={sectionIndex} className="mt-8 p-6  rounded-xl space-y-4">
            <h3 className="text-xl font-bold text-black dark:text-white">
              Contact PCBricks
            </h3>

            <a
              href="tel:+917975506175"
              className="block text-black dark:text-white font-medium hover:underline"
            >
              📞 Call Us Now: +91 79 7550 6175
            </a>

            <a
              href="mailto:pcbricksinfo@gmail.com"
              className="block text-black dark:!text-white font-medium hover:underline"
            >
              📧 Email: pcbricksinfo@gmail.com
            </a>

            <a
              href="https://www.pcbricks.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-black dark:text-white font-medium hover:underline"
            >
              🌐 Get Your Quote: Visit PCBricks
            </a>
          </div>
        );
      }

      // ✅ Handle FAQ Section
      if (section.type === "faq") {
        return (
          <div key={sectionIndex} className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              {section.faqs.map((faq, faqIndex) => (
                <div
                  key={faqIndex}
                  className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
                >
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Q{faqIndex + 1}: {faq.question}
                  </h4>

                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      }
      // ✅ Normal Section Rendering
      return (
        <div key={sectionIndex} className="mb-8">
          {section.heading && (
            <div className="flex items-center gap-3 mb-4">
              <div className="hidden lg:block md:block">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {section.heading.split(".")[0]}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {section.heading.substring(section.heading.indexOf(" ") + 1)}
              </h3>
            </div>
          )}

          <div className="space-y-3">
            {section.paragraphs?.map((para, paraIndex) => {
              const trimmedPara = para.trim();
              return (
                <p
                  key={paraIndex}
                  className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed"
                >
                  {trimmedPara}
                </p>
              );
            })}
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <article className="max-w-4xl mx-auto px-4 py-8 mt-20">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Blogs</span>
          </button>

          {/* Blog Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-4">
              <Calendar size={16} />
              <span className="text-sm">{blog.date}</span>
              {blog.category && (
                <>
                  <span className="mx-2">•</span>
                  <span className="text-sm bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-blue-600 dark:text-blue-400">
                    {blog.category}
                  </span>
                </>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {blog.title}
            </h1>
          </header>

          {/* Featured Image */}
          {blog.image && (
            <div className="relative w-full h-[300px] md:h-[400px] lg:h-[600px] rounded-xl overflow-hidden mb-10 shadow-lg">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                priority
              />
            </div>
          )}

          {/* Description/Key Takeaways */}
          {blog.desc && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 mb-8 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                Key Takeaways
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {blog.desc}
              </p>
            </div>
          )}

          {/* Main Content */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 mb-8 shadow-sm">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {formatContent(blog.content)}
            </div>

            {blog.link && (
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <a
                  href="https://www.pcbricks.com/#contact"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {blog.link}
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                </a>
              </div>
            )}
          </div>

          {/* Contact Section */}
          <ContactSection />
        </article>
      </div>
      <Footer />
    </>
  );
}

// Contact Section Component
function ContactSection() {
  const contactInfo = [
    { icon: "phone", label: "Phone/WhatsApp", value: "+91 8105891568" },
    { icon: "email", label: "Email", value: "pcbricksinfo@gmail.com" },
    { icon: "website", label: "Website", value: "www.pcbricks.com" },
  ];

  const serviceAreas = [
    "Koramangala",
    "HSR Layout",
    "Indiranagar",
    "Whitefield",
    "Electronic City",
    "Marathahalli",
    "Bannerghatta Road",
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 md:p-8">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Ready to Get Started?
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-semibold text-gray-800 dark:text-white mb-4">
            Contact Information
          </h4>
          <div className="space-y-4">
            {contactInfo.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                  <Icon name={item.icon} />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.label}
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 dark:text-white mb-4">
            Service Areas
          </h4>
          <p className="text-gray-600 dark:text-gray-300 mb-3">
            Serving all across Bangalore including:
          </p>
          <div className="flex flex-wrap gap-2">
            {serviceAreas.map((area, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 bg-white dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300 shadow-sm"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Icon component
function Icon({ name }) {
  const icons = {
    phone: (
      <svg
        className="w-5 h-5 text-blue-600 dark:text-blue-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    ),
    email: (
      <svg
        className="w-5 h-5 text-blue-600 dark:text-blue-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    website: (
      <svg
        className="w-5 h-5 text-blue-600 dark:text-blue-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9 3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
        />
      </svg>
    ),
  };

  return icons[name] || null;
}
