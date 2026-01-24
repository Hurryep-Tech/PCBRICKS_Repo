"useclient";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Sun, Moon, Menu, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
const QuoteModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    contactNumber: "",
    serviceInterested: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required";
    }

    if (!formData.serviceInterested) {
      newErrors.serviceInterested = "Please select a service";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Replace with your Formcarry endpoint after signup
    const FORMCARRY_ENDPOINT = "https://formcarry.com/s/WS7il3GH4hI";

    try {
      const response = await fetch(FORMCARRY_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName: formData.companyName,
          email: formData.email,
          contactNumber: formData.contactNumber,
          serviceInterested: formData.serviceInterested,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setFormData({
          companyName: "",
          email: "",
          contactNumber: "",
          serviceInterested: "",
          message: "",
        });
        onClose();
      } else {
        alert(result.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl
      w-full max-w-[90%] sm:max-w-md
      max-h-[90vh] overflow-y-auto
      p-4 sm:p-6
      animate-in slide-in-from-bottom-4 zoom-in-95 duration-300">

        <div className="p-2 ">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Get Your Quote
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                We'll respond within 24 hours
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="absolute top-3 right-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 z-10"
            >
              <X className="h-10 w-10" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) =>
                  handleInputChange("companyName", e.target.value)
                }
                className={`mt-1 ${errors.companyName ? "border-red-500" : ""}`}
                placeholder="Your company name"
              />
              {errors.companyName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.companyName}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`mt-1 ${errors.email ? "border-red-500" : ""}`}
                placeholder="your@company.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <Label htmlFor="contactNumber">Contact Number *</Label>
              <Input
                id="contactNumber"
                value={formData.contactNumber}
                onChange={(e) =>
                  handleInputChange("contactNumber", e.target.value)
                }
                className={`mt-1 ${errors.contactNumber ? "border-red-500" : ""
                  }`}
                placeholder="+91 98765 43210"
              />
              {errors.contactNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.contactNumber}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="serviceInterested">Service Interested In *</Label>
              <Select
                value={formData.serviceInterested}
                onValueChange={(value) =>
                  handleInputChange("serviceInterested", value)
                }
              >
                <SelectTrigger
                  className={`mt-1 ${errors.serviceInterested ? "border-red-500" : ""
                    }`}
                >
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="laptops">Laptops</SelectItem>
                  <SelectItem value="desktops">Desktops</SelectItem>
                  <SelectItem value="mobiles">Mobiles</SelectItem>
                  <SelectItem value="tablets">Tablets</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                  <SelectItem value="others">Others</SelectItem>
                </SelectContent>
              </Select>
              {errors.serviceInterested && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.serviceInterested}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                className="mt-1"
                placeholder="Tell us about your requirements..."
                rows={3}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full py-3 font-semibold transition-all duration-300 hover:scale-105"
            >
              {isSubmitting ? "Submitting..." : "Get My Quote"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // ✅ ADD THIS
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);


  useEffect(() => {
    if (!mounted) return;

    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode, mounted]);

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/20 dark:border-gray-700/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <Link href="/">
                <Image
                  src="/logo.png"
                  width={50}
                  height={50}
                  alt="PCBricks Logo"
                  className="w-10 h-10"
                />
              </Link>
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
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </div>
  );
}
