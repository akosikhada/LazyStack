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
    <footer
      className={`${
        isDark
          ? "border-purple-900/10 bg-gradient-to-b from-[#0a0412] to-[#050208]"
          : "border-purple-200/30 bg-gradient-to-b from-[#f0f0f7] to-[#fafafa]"
      } relative border-t pb-8 pt-16`}
    >
      {/* Subtle background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className={`absolute -top-40 left-1/4 h-[800px] w-[800px] ${
            isDark ? "bg-purple-900/5" : "bg-purple-400/10"
          } rounded-full blur-[180px]`}
        ></div>
        <div
          className={`absolute right-1/4 top-20 h-[600px] w-[600px] ${
            isDark ? "bg-indigo-800/5" : "bg-indigo-400/10"
          } rounded-full blur-[150px]`}
        ></div>
      </div>

      {/* Back to top button with improved animation */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 h-10 w-10 rounded-full ${
          isDark
            ? "bg-purple-600/90 shadow-purple-900/20"
            : "bg-purple-500/90 shadow-purple-400/20"
        } z-50 flex items-center justify-center text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-purple-700 ${
          showButton
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-10 opacity-0"
        }`}
        aria-label="Back to top"
      >
        <ChevronUp className="h-5 w-5" />
      </button>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="mb-14 grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-12">
          {/* Brand section */}
          <div className="space-y-5 md:col-span-5">
            <div className="flex items-center">
              <span
                className={`text-2xl font-bold ${
                  isDark
                    ? "bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                    : "text-gray-800"
                }`}
              >
                <span
                  className={isDark ? "text-purple-400" : "text-purple-600"}
                >
                  Lazy
                </span>
                <span className="text-gray-600 dark:text-gray-200">Stack</span>
              </span>
            </div>
            <p
              className={`${
                isDark ? "text-gray-400" : "text-gray-600"
              } max-w-md text-sm leading-relaxed`}
            >
              The ultimate collection of developer tools to enhance your
              workflow and boost productivity in one place.
            </p>
            <p
              className={`${
                isDark ? "text-gray-400" : "text-gray-600"
              } max-w-md text-sm leading-relaxed`}
            >
              Find the best tools for your projects and streamline your
              development process.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <h3
              className={`${
                isDark ? "text-gray-200" : "text-gray-800"
              } mb-5 text-sm font-medium tracking-wide`}
            >
              Categories
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#development-tools"
                  className={`${
                    isDark
                      ? "text-gray-400 hover:text-purple-300"
                      : "text-gray-600 hover:text-purple-600"
                  } group flex items-center text-sm transition-all duration-200`}
                >
                  <span
                    className={`h-1 w-1 rounded-full ${
                      isDark ? "bg-purple-500/50" : "bg-purple-400/70"
                    } mr-2 transition-all duration-200 group-hover:w-2`}
                  ></span>
                  Development Tools
                </Link>
              </li>
              <li>
                <Link
                  href="#design-tools"
                  className={`${
                    isDark
                      ? "text-gray-400 hover:text-purple-300"
                      : "text-gray-600 hover:text-purple-600"
                  } group flex items-center text-sm transition-all duration-200`}
                >
                  <span
                    className={`h-1 w-1 rounded-full ${
                      isDark ? "bg-purple-500/50" : "bg-purple-400/70"
                    } mr-2 transition-all duration-200 group-hover:w-2`}
                  ></span>
                  Design Tools
                </Link>
              </li>
              <li>
                <Link
                  href="#ai-tools"
                  className={`${
                    isDark
                      ? "text-gray-400 hover:text-purple-300"
                      : "text-gray-600 hover:text-purple-600"
                  } group flex items-center text-sm transition-all duration-200`}
                >
                  <span
                    className={`h-1 w-1 rounded-full ${
                      isDark ? "bg-purple-500/50" : "bg-purple-400/70"
                    } mr-2 transition-all duration-200 group-hover:w-2`}
                  ></span>
                  AI Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact section */}
          <div className="md:col-span-4">
            <h3
              className={`${
                isDark ? "text-gray-200" : "text-gray-800"
              } mb-5 text-sm font-medium tracking-wide`}
            >
              Get In Touch
            </h3>
            <div className="space-y-3.5">
              <a
                href="https://github.com/akosikhada"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center"
              >
                <div
                  className={`h-8 w-8 rounded-full ${
                    isDark
                      ? "border-white/10 bg-white/5 group-hover:border-purple-500/30 group-hover:bg-purple-500/20"
                      : "border-purple-200 bg-purple-50 group-hover:border-purple-300 group-hover:bg-purple-100"
                  } mr-3 flex items-center justify-center border transition-all duration-200`}
                >
                  <Github
                    className={`h-3.5 w-3.5 ${isDark ? "text-gray-300" : "text-gray-600"}`}
                  />
                </div>
                <span
                  className={`${
                    isDark
                      ? "text-gray-400 group-hover:text-purple-300"
                      : "text-gray-600 group-hover:text-purple-600"
                  } flex items-center text-sm transition-colors duration-200`}
                >
                  akosikhada
                  <ExternalLink className="ml-1 h-3 w-3 opacity-70" />
                </span>
              </a>
              <a
                href="https://github.com/znarf-y"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center"
              >
                <div
                  className={`h-8 w-8 rounded-full ${
                    isDark
                      ? "border-white/10 bg-white/5 group-hover:border-purple-500/30 group-hover:bg-purple-500/20"
                      : "border-purple-200 bg-purple-50 group-hover:border-purple-300 group-hover:bg-purple-100"
                  } mr-3 flex items-center justify-center border transition-all duration-200`}
                >
                  <Github
                    className={`h-3.5 w-3.5 ${isDark ? "text-gray-300" : "text-gray-600"}`}
                  />
                </div>
                <span
                  className={`${
                    isDark
                      ? "text-gray-400 group-hover:text-purple-300"
                      : "text-gray-600 group-hover:text-purple-600"
                  } flex items-center text-sm transition-colors duration-200`}
                >
                  znarf-y
                  <ExternalLink className="ml-1 h-3 w-3 opacity-70" />
                </span>
              </a>
              <p
                className={`${
                  isDark ? "text-gray-500" : "text-gray-500"
                } pt-1 text-sm leading-relaxed`}
              >
                We'd love to hear your feedback or answer any questions you may
                have.
              </p>
            </div>
          </div>
        </div>

        {/* Divider with subtle animation */}
        <div className="relative my-8 h-px w-full overflow-hidden">
          <div
            className={`absolute inset-0 bg-gradient-to-r from-transparent ${
              isDark ? "via-purple-500/20" : "via-purple-400/30"
            } to-transparent`}
          ></div>
          <div
            className={`absolute inset-0 bg-gradient-to-r from-transparent ${
              isDark ? "via-purple-400/10" : "via-purple-300/20"
            } animate-pulse to-transparent blur-sm`}
          ></div>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col items-center justify-between pt-4 md:flex-row">
          <p
            className={`${
              isDark ? "text-gray-400" : "text-gray-600"
            } mb-6 text-sm md:mb-0`}
          >
            © {currentYear}{" "}
            <span
              className={`${isDark ? "text-purple-400" : "text-purple-600"} font-medium`}
            >
              Lazy
            </span>
            <span className="font-medium text-gray-600 dark:text-gray-200">
              Stack
            </span>
            . All rights reserved.
          </p>
          <div className="flex items-center text-xs text-gray-400">
            <span className="flex items-center">
              Developed with{" "}
              <Heart className="mx-1 h-3 w-3 fill-pink-500 text-pink-500" /> by
              akosikhada & znarf-y
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
