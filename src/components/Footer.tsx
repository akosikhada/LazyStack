"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  Heart,
  ChevronUp,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Get the footer element
      const footer = document.querySelector("footer");

      if (footer) {
        // Get the footer's position relative to the viewport
        const footerRect = footer.getBoundingClientRect();
        // Check if the footer is in the viewport (or partially in the viewport)
        if (footerRect.top < window.innerHeight) {
          setShowButton(true);
        } else {
          setShowButton(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Make sure to check initial position
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-[#0a0412] border-t border-purple-900/20 pt-20 pb-10 px-4 md:px-8 lg:px-16 relative overflow-hidden">
      {/* Enhanced gradient backdrop */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-10 w-[600px] h-[600px] bg-purple-900/10 blur-[150px] rounded-full opacity-30"></div>
        <div className="absolute -top-24 -right-10 w-[600px] h-[600px] bg-indigo-900/10 blur-[150px] rounded-full opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#050508] to-transparent"></div>
      </div>

      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-900/30 hover:bg-purple-700 transition-all duration-300 z-50 ${
          showButton
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        aria-label="Back to top"
      >
        <ChevronUp className="h-6 w-6" />
      </button>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top section with logo and links - better spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10 mb-16">
          {/* Logo and description */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-5">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 pl-0">
                <span className="text-purple-400">Lazy</span>Stack
              </span>
            </div>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed max-w-xs">
              The ultimate collection of developer tools to enhance your
              workflow and boost productivity in one place.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/znarf-y/LazyStack" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-9 h-9 rounded-full border-purple-500/30 bg-purple-500/10 text-white hover:bg-purple-500/30 hover:border-purple-400 hover:shadow-glow transition-all duration-300"
                >
                  <Github className="h-4 w-4" />
                </Button>
              </a>
              <Button
                variant="outline"
                size="icon"
                className="w-9 h-9 rounded-full border-purple-500/30 bg-purple-500/10 text-white hover:bg-purple-500/30 hover:border-purple-400 hover:shadow-glow transition-all duration-300"
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="w-9 h-9 rounded-full border-purple-500/30 bg-purple-500/10 text-white hover:bg-purple-500/30 hover:border-purple-400 hover:shadow-glow transition-all duration-300"
              >
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Categories - better spacing */}
          <div className="lg:col-span-1 mt-2">
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Categories
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#ai-tools"
                  className="text-gray-400 hover:text-purple-400 text-sm transition-colors duration-200 flex items-center"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50 mr-2"></span>
                  AI Development Tools
                </Link>
              </li>
              <li>
                <Link
                  href="#design-tools"
                  className="text-gray-400 hover:text-purple-400 text-sm transition-colors duration-200 flex items-center"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50 mr-2"></span>
                  Design Tools
                </Link>
              </li>
              <li>
                <Link
                  href="#dev-tools"
                  className="text-gray-400 hover:text-purple-400 text-sm transition-colors duration-200 flex items-center"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50 mr-2"></span>
                  AI Development Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact - better spacing */}
          <div className="lg:col-span-1 mt-2">
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mr-3">
                  <Mail className="h-3.5 w-3.5 text-purple-400" />
                </div>
                <a
                  href="mailto:franzjeremysenora@gmail.com"
                  className="text-gray-300 hover:text-purple-400 text-sm transition-colors duration-200"
                >
                  franzjeremysenora@gmail.com
                </a>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                We'd love to hear your feedback or answer any questions you may
                have about our tools.
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced divider with glow effect */}
        <div className="relative h-px w-full my-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/10 to-transparent blur-sm"></div>
        </div>

        {/* Bottom section with improved alignment and spacing */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-2">
          <p className="text-gray-500 text-sm mb-6 md:mb-0">
            © {currentYear}{" "}
            <span className="text-gray-400 font-medium">LazyStack</span>. All
            rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-8 gap-y-3">
            <span className="text-gray-500 text-xs flex items-center">
              Developed by akosikhada & znarf-y
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
