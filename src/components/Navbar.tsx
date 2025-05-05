"use client";

import { Button } from "./ui/button";
import { Github, Code, Paintbrush, Cpu, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { ThemeToggle } from "./Theme-Provider/theme-toggle";
import { useTheme } from "next-themes";

export default function Navbar() {
  const { theme } = useTheme();
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

  // Determine navbar background based on theme and scroll position
  const navbarBg = scrolled
    ? theme === "dark"
      ? "bg-[#050508]/95 backdrop-blur-md shadow-lg"
      : "bg-white/95 backdrop-blur-md shadow-lg"
    : "bg-transparent";

  // Determine navbar border based on theme and scroll position
  const navbarBorder = scrolled
    ? theme === "dark"
      ? "border-purple-900/20"
      : "border-gray-200"
    : "border-transparent";

  const isLightMode = theme === "light";

  // Always use black text in light mode, regardless of scroll position
  const blackText = isLightMode ? { color: "black" } : {};

  // Only for elements that need to be white when transparent background in light mode
  const textColorClass =
    isLightMode && !scrolled
      ? "text-black"
      : theme === "dark"
        ? "text-white"
        : "text-black";

  // For items that should be in muted color when not active
  const mutedTextColorClass =
    isLightMode && !scrolled
      ? "text-black/70"
      : theme === "dark"
        ? "text-gray-300"
        : "text-black";

  // Determine active background color
  const activeBgClass =
    theme === "dark"
      ? "bg-purple-700/30 shadow-[0_0_15px_rgba(168,85,247,0.15)]"
      : "bg-purple-100 shadow-[0_0_10px_rgba(168,85,247,0.1)]";

  // Determine hover background color
  const hoverBgClass =
    theme === "dark"
      ? "hover:bg-purple-700/20 hover:shadow-[0_0_10px_rgba(168,85,247,0.1)]"
      : "hover:bg-purple-100 hover:text-purple-600 hover:shadow-[0_0_10px_rgba(168,85,247,0.05)]";

  return (
    <nav
      className={`fixed z-50 w-full transition-all duration-300 ${navbarBg} ${
        scrolled ? "py-3" : "py-5"
      } border-b ${navbarBorder}`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex items-center justify-between">
          {/* Logo and brand */}
          <div className="flex items-center">
            <button
              onClick={() => scrollToSection("hero")}
              className="group flex cursor-pointer items-center transition-all duration-200 hover:opacity-90"
            >
              <span className="text-lg font-bold tracking-tight sm:text-xl">
                <span
                  className={`${
                    theme === "dark"
                      ? "text-purple-400 group-hover:text-purple-300"
                      : "text-purple-700 group-hover:text-purple-600"
                  } transition-colors duration-200`}
                >
                  Lazy
                </span>
                <span style={blackText} className={textColorClass}>
                  Stack
                </span>
              </span>
            </button>
          </div>

          {/* Main navigation - visible only on lg screens */}
          <div className="hidden items-center space-x-2 lg:flex">
            <div className="flex space-x-1.5">
              {/* Navigation items with improved hover effect */}
              <button
                onClick={() => scrollToSection("dev-tools")}
                style={blackText}
                className={`flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive("dev-tools")
                    ? `${textColorClass} ${activeBgClass}`
                    : `${mutedTextColorClass} hover:${textColorClass} ${hoverBgClass}`
                }`}
              >
                <Code style={blackText} className="h-4 w-4" />
                Development
              </button>
              <button
                onClick={() => scrollToSection("design-tools")}
                style={blackText}
                className={`flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive("design-tools")
                    ? `${textColorClass} ${activeBgClass}`
                    : `${mutedTextColorClass} hover:${textColorClass} ${hoverBgClass}`
                }`}
              >
                <Paintbrush style={blackText} className="h-4 w-4" />
                Design
              </button>
              <button
                onClick={() => scrollToSection("ai-tools")}
                style={blackText}
                className={`flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive("ai-tools")
                    ? `${textColorClass} ${activeBgClass}`
                    : `${mutedTextColorClass} hover:${textColorClass} ${hoverBgClass}`
                }`}
              >
                <Cpu style={blackText} className="h-4 w-4" />
                AI Tools
              </button>
            </div>

            {/* Theme toggle */}
            <div className="ml-2">
              <ThemeToggle />
            </div>

            {/* GitHub button with improved styling */}
            <div className="ml-3 flex items-center">
              <Button
                variant="outline"
                style={blackText}
                className={`${
                  theme === "dark"
                    ? "border-purple-500/40 bg-purple-500/10 text-white hover:bg-purple-500/20"
                    : "border-purple-300 bg-purple-50/80 text-black hover:bg-purple-100"
                } flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 hover:border-purple-400/70 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]`}
                size="sm"
                onClick={() =>
                  window.open("https://github.com/znarf-y/LazyStack")
                }
              >
                <Github style={blackText} className="h-4 w-4" />
                <span style={blackText}>Source Code</span>
              </Button>
            </div>
          </div>

          {/* Mobile menu button with theme toggle */}
          <div className="flex items-center justify-center space-x-2 lg:hidden">
            <ThemeToggle />
            <button
              style={blackText}
              className={`inline-flex items-center justify-center rounded-md p-1.5 ${
                theme === "dark"
                  ? "text-gray-300 hover:bg-purple-700/20 hover:text-white"
                  : "text-black hover:bg-purple-100 hover:text-black"
              } transition-all duration-200`}
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X style={blackText} className="h-5 w-5" />
              ) : (
                <Menu style={blackText} className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu - better transitions and styling */}
        <div
          className={`mt-2 rounded-xl lg:hidden ${
            theme === "dark"
              ? "border border-purple-900/20 bg-[#0a0812]/95 backdrop-blur-lg"
              : "border border-gray-200 bg-white/95 backdrop-blur-lg"
          } overflow-hidden shadow-lg transition-all duration-300 ${
            isMobileMenuOpen
              ? "max-h-96 translate-y-0 opacity-100"
              : "pointer-events-none max-h-0 -translate-y-4 opacity-0"
          }`}
        >
          <div className="space-y-1.5 px-3 pb-3 pt-2">
            <button
              onClick={() => scrollToSection("dev-tools")}
              style={blackText}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-all duration-200 ${
                isActive("dev-tools")
                  ? `${theme === "dark" ? "text-white" : "text-black"} ${activeBgClass}`
                  : `${theme === "dark" ? "text-white" : "text-black"} ${hoverBgClass}`
              }`}
            >
              <Code style={blackText} className="h-4 w-4" />
              Development
            </button>
            <button
              onClick={() => scrollToSection("design-tools")}
              style={blackText}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-all duration-200 ${
                isActive("design-tools")
                  ? `${theme === "dark" ? "text-white" : "text-black"} ${activeBgClass}`
                  : `${theme === "dark" ? "text-white" : "text-black"} ${hoverBgClass}`
              }`}
            >
              <Paintbrush style={blackText} className="h-4 w-4" />
              Design
            </button>
            <button
              onClick={() => scrollToSection("ai-tools")}
              style={blackText}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-all duration-200 ${
                isActive("ai-tools")
                  ? `${theme === "dark" ? "text-white" : "text-black"} ${activeBgClass}`
                  : `${theme === "dark" ? "text-white" : "text-black"} ${hoverBgClass}`
              }`}
            >
              <Cpu style={blackText} className="h-4 w-4" />
              AI Tools
            </button>
            <div className="mt-3 border-t border-purple-900/30 px-2 py-2">
              <Button
                variant="outline"
                style={blackText}
                className={`w-full ${
                  theme === "dark"
                    ? "border-purple-500/40 bg-purple-500/10 text-white hover:bg-purple-500/20"
                    : "border-purple-300 bg-purple-50 text-black hover:bg-purple-100"
                } flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-medium transition-all duration-200 hover:border-purple-400/70 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]`}
                onClick={() =>
                  window.open("https://github.com/znarf-y/LazyStack")
                }
              >
                <Github style={blackText} className="h-3.5 w-3.5" />
                <span style={blackText}>Source Code</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
