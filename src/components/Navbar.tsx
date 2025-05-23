"use client";

import { useState } from "react";
import { useNavbarScroll } from "@/hooks/useNavbarScroll";
import { Code, Paintbrush, Cpu, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchDialog from "@/components/Search-Dialog/SearchDialog";
import { ThemeToggle } from "@/components/Theme-Provider/theme-toggle";

// Import modularized navbar components
import { NavbarBrand } from "./Navbar/NavbarBrand";
import { MobileMenu } from "./Navbar/MobileMenu";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Use our custom hook for scroll behavior and styles
  const {
    scrolled,
    scrollToSection,
    isActive,
    navbarBg,
    navbarBorder,
    blackText,
    textColorClass,
    mutedTextColorClass,
    activeBgClass,
    hoverBgClass,
    theme,
  } = useNavbarScroll();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav
        className={`fixed z-50 w-full transition-all duration-300 ${navbarBg} ${
          scrolled ? "py-2 sm:py-3" : "py-3 sm:py-4"
        } border-b ${navbarBorder}`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left side: Logo and navigation links */}
            <div className="flex items-center">
              {/* Brand logo */}
              <NavbarBrand
                scrollToSection={scrollToSection}
                textColorClass={textColorClass}
              />

              {/* Desktop navigation links - only visible on lg screens */}
              <div className="ml-6 hidden items-center space-x-2 lg:flex">
                <button
                  onClick={() => scrollToSection("development-tools")}
                  style={blackText}
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive("development-tools")
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
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ${
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
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive("ai-tools")
                      ? `${textColorClass} ${activeBgClass}`
                      : `${mutedTextColorClass} hover:${textColorClass} ${hoverBgClass}`
                  }`}
                >
                  <Cpu style={blackText} className="h-4 w-4" />
                  AI
                </button>
              </div>
            </div>

            {/* Right side: Tools and mobile menu */}
            <div className="flex items-center">
              {/* Desktop action buttons - only visible on lg screens */}
              <div className="hidden items-center gap-2 lg:flex">
                {/* Search Dialog */}
                <div>
                  <SearchDialog />
                </div>

                {/* Theme Toggle */}
                <div className="ml-2">
                  <ThemeToggle />
                </div>

                {/* GitHub button */}
                <div className="ml-2">
                  <Button
                    variant="outline"
                    style={blackText}
                    className={`${
                      theme === "dark"
                        ? "border-purple-500/40 bg-purple-500/10 text-white hover:bg-purple-500/20"
                        : "border-purple-300 bg-purple-50/80 text-black hover:bg-purple-100"
                    } flex items-center gap-2 rounded-md px-3 py-1 text-sm font-medium transition-all duration-200 hover:border-purple-400/70 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]`}
                    size="sm"
                    onClick={() =>
                      window.open("https://github.com/znarf-y/LazyStack")
                    }
                  >
                    <Github style={blackText} className="h-3.5 w-3.5" />
                    <span style={blackText}>Source Code</span>
                  </Button>
                </div>
              </div>

              {/* Mobile menu toggle - visible on mobile and tablet (md) */}
              <MobileMenu
                isOpen={isMobileMenuOpen}
                toggleMenu={toggleMobileMenu}
                theme={theme}
                blackText={blackText}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu dropdown container - separate from navbar to avoid layout issues */}
      {isMobileMenuOpen && (
        <div
          className="fixed top-[60px] z-40 mt-1 w-full px-4 lg:hidden"
          style={{
            top: scrolled ? "56px" : "64px", // Adjust based on navbar height
          }}
        >
          <div
            className={`rounded-xl ${
              theme === "dark"
                ? "border border-purple-900/20 bg-[#0a0812]/95 shadow-md backdrop-blur-lg"
                : "border border-gray-200 bg-white/95 shadow-md backdrop-blur-lg"
            }`}
          >
            <div className="space-y-1.5 px-3 pb-3 pt-2">
              <button
                onClick={() => {
                  scrollToSection("development-tools");
                  setIsMobileMenuOpen(false);
                }}
                style={blackText}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium ${
                  isActive("development-tools")
                    ? `${theme === "dark" ? "text-white" : "text-black"} ${activeBgClass}`
                    : `${theme === "dark" ? "text-white" : "text-black"} ${hoverBgClass}`
                }`}
              >
                <Code style={blackText} className="h-4 w-4" />
                Development
              </button>
              <button
                onClick={() => {
                  scrollToSection("design-tools");
                  setIsMobileMenuOpen(false);
                }}
                style={blackText}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium ${
                  isActive("design-tools")
                    ? `${theme === "dark" ? "text-white" : "text-black"} ${activeBgClass}`
                    : `${theme === "dark" ? "text-white" : "text-black"} ${hoverBgClass}`
                }`}
              >
                <Paintbrush style={blackText} className="h-4 w-4" />
                Design
              </button>
              <button
                onClick={() => {
                  scrollToSection("ai-tools");
                  setIsMobileMenuOpen(false);
                }}
                style={blackText}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium ${
                  isActive("ai-tools")
                    ? `${theme === "dark" ? "text-white" : "text-black"} ${activeBgClass}`
                    : `${theme === "dark" ? "text-white" : "text-black"} ${hoverBgClass}`
                }`}
              >
                <Cpu style={blackText} className="h-4 w-4" />
                AI
              </button>

              {/* Add search dialog to mobile menu */}
              <div className="mt-3 border-t border-purple-900/30 pt-3">
                <div className="px-2">
                  <SearchDialog />
                </div>

                {/* Source Code button for mobile */}
                <div className="mt-3 px-2 py-2">
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
        </div>
      )}
    </>
  );
}
