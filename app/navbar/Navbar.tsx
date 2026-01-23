"useclient";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Sun, Moon, Menu, X } from "lucide-react";
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // ✅ ADD THIS
  const [darkMode, setDarkMode] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/20 dark:border-gray-700/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <Image
                src="/logo.png"
                width={50}
                height={50}
                alt="PCBricks Logo"
                className="w-10 h-10"
              />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="nav-link">
                Solutions
              </a>
              <a href="/" className="nav-link">
                Why Us
              </a>
              <a href="/" className="nav-link">
                Blog
              </a>
              <a href="/" className="nav-link">
                Contact
              </a>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2">
                <Sun className="h-4 w-4" />
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                <Moon className="h-4 w-4" />
              </div>

              <Button
                onClick={() => setIsQuoteModalOpen(true)}
                className="hidden md:inline-flex bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full px-6"
              >
                Get a Quote
              </Button>

              {/* Burger */}
              <button
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 flex flex-col bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 space-y-4">
              <a
                href="/"
                className="mobile-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Solutions
              </a>
              <a
                href="/"
                className="mobile-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Why Us
              </a>
              <a href="/" className="mobile-link">
                Blog
              </a>
              <a
                href="/"
                className="mobile-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>

              <div className="flex items-center gap-3">
                <Sun className="h-4 w-4" />
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                <Moon className="h-4 w-4" />
              </div>

              <Button
                onClick={() => {
                  setIsQuoteModalOpen(true);
                  setIsMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full"
              >
                Get a Quote
              </Button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
