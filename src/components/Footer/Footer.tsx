"use client";

import Link from "next/link";
import { Github, ChevronUp, ExternalLink, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [showButton, setShowButton] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const handleScroll = () => {
      // Show button when user scrolls 300px down
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Check initial position
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
    <footer className={`${
      isDark 
        ? "bg-gradient-to-b from-[#0a0412] to-[#050208] border-purple-900/10" 
        : "bg-gradient-to-b from-[#f0f0f7] to-[#fafafa] border-purple-200/30"
    } border-t pt-16 pb-8 relative`}>
      {/* Subtle background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute -top-40 left-1/4 w-[800px] h-[800px] ${
          isDark ? "bg-purple-900/5" : "bg-purple-400/10"
        } blur-[180px] rounded-full`}></div>
        <div className={`absolute top-20 right-1/4 w-[600px] h-[600px] ${
          isDark ? "bg-indigo-800/5" : "bg-indigo-400/10"
        } blur-[150px] rounded-full`}></div>
      </div>

      {/* Back to top button with improved animation */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-10 h-10 rounded-full ${
          isDark 
            ? "bg-purple-600/90 shadow-purple-900/20" 
            : "bg-purple-500/90 shadow-purple-400/20"
        } backdrop-blur-sm text-white flex items-center justify-center shadow-lg hover:bg-purple-700 hover:scale-105 transition-all duration-300 z-50 ${
          showButton
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        aria-label="Back to top"
      >
        <ChevronUp className="h-5 w-5" />
      </button>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-10 mb-14">
          {/* Brand section */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center">
              <span className={`text-2xl font-bold ${
                isDark 
                  ? "bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300" 
                  : "text-gray-800"
              }`}>
                <span className={isDark ? "text-purple-400" : "text-purple-600"}>Lazy</span>Stack
              </span>
            </div>
            <p className={`${
              isDark ? "text-gray-400" : "text-gray-600"
            } text-sm leading-relaxed max-w-md`}>
              The ultimate collection of developer tools to enhance your
              workflow and boost productivity in one place.
            </p>
            <p className={`${
              isDark ? "text-gray-400" : "text-gray-600"
            } text-sm leading-relaxed max-w-md`}>
              Find the best tools for your projects and streamline your
              development process.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <h3 className={`${
              isDark ? "text-gray-200" : "text-gray-800"
            } font-medium mb-5 text-sm tracking-wide`}>
              Categories
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#development-tools"
                  className={`${
                    isDark ? "text-gray-400 hover:text-purple-300" : "text-gray-600 hover:text-purple-600"
                  } text-sm transition-all duration-200 flex items-center group`}
                >
                  <span className={`w-1 h-1 rounded-full ${
                    isDark ? "bg-purple-500/50" : "bg-purple-400/70"
                  } mr-2 group-hover:w-2 transition-all duration-200`}></span>
                  Development Tools
                </Link>
              </li>
              <li>
                <Link
                  href="#design-tools"
                  className={`${
                    isDark ? "text-gray-400 hover:text-purple-300" : "text-gray-600 hover:text-purple-600"
                  } text-sm transition-all duration-200 flex items-center group`}
                >
                  <span className={`w-1 h-1 rounded-full ${
                    isDark ? "bg-purple-500/50" : "bg-purple-400/70"
                  } mr-2 group-hover:w-2 transition-all duration-200`}></span>
                  Design Tools
                </Link>
              </li>
              <li>
                <Link
                  href="#ai-tools"
                  className={`${
                    isDark ? "text-gray-400 hover:text-purple-300" : "text-gray-600 hover:text-purple-600"
                  } text-sm transition-all duration-200 flex items-center group`}
                >
                  <span className={`w-1 h-1 rounded-full ${
                    isDark ? "bg-purple-500/50" : "bg-purple-400/70"
                  } mr-2 group-hover:w-2 transition-all duration-200`}></span>
                  AI Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact section */}
          <div className="md:col-span-4">
            <h3 className={`${
              isDark ? "text-gray-200" : "text-gray-800"
            } font-medium mb-5 text-sm tracking-wide`}>
              Get In Touch
            </h3>
            <div className="space-y-3.5">
              <a
                href="https://github.com/znarf-y"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center group"
              >
                <div className={`w-8 h-8 rounded-full ${
                  isDark 
                    ? "bg-white/5 border-white/10 group-hover:bg-purple-500/20 group-hover:border-purple-500/30" 
                    : "bg-purple-50 border-purple-200 group-hover:bg-purple-100 group-hover:border-purple-300"
                } border flex items-center justify-center mr-3 transition-all duration-200`}>
                  <Github className={`h-3.5 w-3.5 ${isDark ? "text-gray-300" : "text-gray-600"}`} />
                </div>
                <span className={`${
                  isDark 
                    ? "text-gray-400 group-hover:text-purple-300" 
                    : "text-gray-600 group-hover:text-purple-600"
                } text-sm transition-colors duration-200 flex items-center`}>
                  znarf-y
                  <ExternalLink className="h-3 w-3 ml-1 opacity-70" />
                </span>
              </a>
              <a
                href="https://github.com/akosikhada"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center group"
              >
                <div className={`w-8 h-8 rounded-full ${
                  isDark 
                    ? "bg-white/5 border-white/10 group-hover:bg-purple-500/20 group-hover:border-purple-500/30" 
                    : "bg-purple-50 border-purple-200 group-hover:bg-purple-100 group-hover:border-purple-300"
                } border flex items-center justify-center mr-3 transition-all duration-200`}>
                  <Github className={`h-3.5 w-3.5 ${isDark ? "text-gray-300" : "text-gray-600"}`} />
                </div>
                <span className={`${
                  isDark 
                    ? "text-gray-400 group-hover:text-purple-300" 
                    : "text-gray-600 group-hover:text-purple-600"
                } text-sm transition-colors duration-200 flex items-center`}>
                  akosikhada
                  <ExternalLink className="h-3 w-3 ml-1 opacity-70" />
                </span>
              </a>
              <p className={`${
                isDark ? "text-gray-500" : "text-gray-500"
              } text-sm leading-relaxed pt-1`}>
                We'd love to hear your feedback or answer any questions you may
                have.
              </p>
            </div>
          </div>
        </div>

        {/* Divider with subtle animation */}
        <div className="relative h-px w-full my-8 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-r from-transparent ${
            isDark ? "via-purple-500/20" : "via-purple-400/30"
          } to-transparent`}></div>
          <div className={`absolute inset-0 bg-gradient-to-r from-transparent ${
            isDark ? "via-purple-400/10" : "via-purple-300/20"
          } to-transparent blur-sm animate-pulse`}></div>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-4">
          <p className={`${
            isDark ? "text-gray-500" : "text-gray-500"
          } text-sm mb-6 md:mb-0`}>
            © {currentYear}{" "}
            <span className={isDark ? "text-gray-400" : "text-gray-600"}>LazyStack</span>. All
            rights reserved.
          </p>
          <div className="flex items-center text-gray-500 text-xs">
            <span className="flex items-center">
              Developed with{" "}
              <Heart className="h-3 w-3 mx-1 text-pink-500 fill-pink-500" /> by
              akosikhada & znarf-y
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
