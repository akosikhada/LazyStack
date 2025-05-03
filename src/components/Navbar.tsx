"use client";

import { Button } from "./ui/button";
import { Github, Code, Paintbrush, Cpu, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Offset for navbar height
        behavior: "smooth",
      });
      setActiveSection(sectionId);
    }
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "dev-tools", "design-tools", "ai-tools"];
      const scrollPosition = window.scrollY + 100;

      // Add scrolled state for navbar appearance change
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Helper function to determine if section is active
  const isActive = (sectionId: string) => activeSection === sectionId;

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#050508]/95 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-5"
      } border-b ${scrolled ? "border-purple-900/20" : "border-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex justify-between items-center">
          {/* Logo and brand */}
          <div className="flex items-center">
            <button
              onClick={() => scrollToSection("hero")}
              className="flex items-center hover:opacity-90 transition-all duration-200 cursor-pointer group"
            >
              <span className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200 tracking-tight">
                <span className="text-purple-400 group-hover:text-purple-300 transition-colors duration-200">
                  Lazy
                </span>
                Stack
              </span>
            </button>
          </div>

          {/* Main navigation - visible only on lg screens */}
          <div className="hidden lg:flex items-center space-x-2">
            <div className="flex space-x-1.5">
              {/* Navigation items with improved hover effect */}
              <button
                onClick={() => scrollToSection("dev-tools")}
                className={`px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2
                  ${
                    isActive("dev-tools")
                      ? "text-white bg-purple-700/30 shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                      : "text-gray-300 hover:text-white hover:bg-purple-700/20 hover:shadow-[0_0_10px_rgba(168,85,247,0.1)]"
                  }`}
              >
                <Code className="h-4 w-4" />
                Development
              </button>
              <button
                onClick={() => scrollToSection("design-tools")}
                className={`px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2
                  ${
                    isActive("design-tools")
                      ? "text-white bg-purple-700/30 shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                      : "text-gray-300 hover:text-white hover:bg-purple-700/20 hover:shadow-[0_0_10px_rgba(168,85,247,0.1)]"
                  }`}
              >
                <Paintbrush className="h-4 w-4" />
                Design
              </button>
              <button
                onClick={() => scrollToSection("ai-tools")}
                className={`px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2
                  ${
                    isActive("ai-tools")
                      ? "text-white bg-purple-700/30 shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                      : "text-gray-300 hover:text-white hover:bg-purple-700/20 hover:shadow-[0_0_10px_rgba(168,85,247,0.1)]"
                  }`}
              >
                <Cpu className="h-4 w-4" />
                AI Tools
              </button>
            </div>

            {/* GitHub button with improved styling */}
            <div className="ml-5 flex items-center">
              <Button
                variant="outline"
                className="border-purple-500/40 bg-purple-500/10 text-white hover:bg-purple-500/20 hover:border-purple-400/70 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] rounded-full flex items-center gap-2 text-sm transition-all duration-200 px-5 py-2 font-medium"
                size="sm"
                onClick={() =>
                  window.open("https://github.com/znarf-y/LazyStack")
                }
              >
                <Github className="h-4 w-4" />
                <span>Source Code</span>
              </Button>
            </div>
          </div>

          {/* Mobile menu button - improved design */}
          <div className="lg:hidden flex items-center justify-center">
            <button
              className="inline-flex items-center justify-center p-1.5 rounded-md text-gray-300 hover:text-white hover:bg-purple-700/20 transition-all duration-200"
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu - better transitions and styling */}
        <div
          className={`lg:hidden mt-2 rounded-xl bg-[#0a0812]/95 backdrop-blur-lg border border-purple-900/20 overflow-hidden shadow-lg transition-all duration-300 ${
            isMobileMenuOpen
              ? "max-h-96 opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <div className="px-3 pt-2 pb-3 space-y-1.5">
            <button
              onClick={() => scrollToSection("dev-tools")}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2
                ${
                  isActive("dev-tools")
                    ? "text-white bg-purple-700/30 shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                    : "text-white hover:bg-purple-700/20 hover:shadow-[0_0_10px_rgba(168,85,247,0.1)]"
                }`}
            >
              <Code className="h-4 w-4" />
              Development
            </button>
            <button
              onClick={() => scrollToSection("design-tools")}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2
                ${
                  isActive("design-tools")
                    ? "text-white bg-purple-700/30 shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                    : "text-white hover:bg-purple-700/20 hover:shadow-[0_0_10px_rgba(168,85,247,0.1)]"
                }`}
            >
              <Paintbrush className="h-4 w-4" />
              Design
            </button>
            <button
              onClick={() => scrollToSection("ai-tools")}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2
                ${
                  isActive("ai-tools")
                    ? "text-white bg-purple-700/30 shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                    : "text-white hover:bg-purple-700/20 hover:shadow-[0_0_10px_rgba(168,85,247,0.1)]"
                }`}
            >
              <Cpu className="h-4 w-4" />
              AI Tools
            </button>
            <div className="mt-3 px-2 py-2 border-t border-purple-900/30">
              <Button
                variant="outline"
                className="w-full border-purple-500/40 bg-purple-500/10 text-white hover:bg-purple-500/20 hover:border-purple-400/70 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] rounded-lg flex items-center justify-center gap-2 text-xs font-medium transition-all duration-200 py-2"
                onClick={() =>
                  window.open("https://github.com/znarf-y/LazyStack")
                }
              >
                <Github className="h-3.5 w-3.5" />
                <span>Source Code</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
