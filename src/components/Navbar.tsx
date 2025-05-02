"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { ChevronDown, Github, Code, Paintbrush, Cpu } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Offset for navbar height
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'dev-tools', 'design-tools', 'ai-tools'];
      const scrollPosition = window.scrollY + 100;

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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper function to determine if section is active
  const isActive = (sectionId: string) => activeSection === sectionId;

  return (
    <nav className="fixed w-full z-50 bg-[#050508]/80 backdrop-blur-md border-b border-purple-900/20 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo and brand */}
          <div className="flex items-center">
            <button 
              onClick={() => scrollToSection('hero')}
              className="flex items-center pl-1 hover:opacity-90 transition-opacity cursor-pointer"
            >
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 pl-0">
                <span className="text-purple-400">Lazy</span>Stack
              </span>
            </button>
          </div>

          {/* Main navigation - now hidden on both mobile and tablet, visible only on lg screens */}
          <div className="hidden lg:flex items-center space-x-1">
            <div className="flex space-x-1">
              {/* Each navigation item with hover effect */}
              <button
                onClick={() => scrollToSection('dev-tools')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-1.5
                  ${isActive('dev-tools') 
                    ? 'text-white bg-purple-700/30 shadow-glow' 
                    : 'text-gray-300 hover:text-white hover:bg-purple-700/30 hover:shadow-glow'
                  }`}
              >
                <Code className="h-4 w-4" />
                Development
              </button>
              <button
                onClick={() => scrollToSection('design-tools')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-1.5
                  ${isActive('design-tools') 
                    ? 'text-white bg-purple-700/30 shadow-glow' 
                    : 'text-gray-300 hover:text-white hover:bg-purple-700/30 hover:shadow-glow'
                  }`}
              >
                <Paintbrush className="h-4 w-4" />
                Design
              </button>
              <button
                onClick={() => scrollToSection('ai-tools')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-1.5
                  ${isActive('ai-tools') 
                    ? 'text-white bg-purple-700/30 shadow-glow' 
                    : 'text-gray-300 hover:text-white hover:bg-purple-700/30 hover:shadow-glow'
                  }`}
              >
                <Cpu className="h-4 w-4" />
                AI Tools
              </button>
            </div>

            {/* GitHub button */}
            <div className="ml-4 flex items-center">
              <Button
                variant="outline"
                className="border-purple-500/30 bg-purple-500/10 text-white hover:bg-purple-500/30 hover:border-purple-400 hover:shadow-glow rounded-full flex items-center gap-2 text-sm transition-all duration-200"
                size="sm"
                onClick={() => window.open('https://github.com/znarf-y/LazyStack')}
              >
                <Github className="h-4 w-4" />
                <span>Source Code</span>
              </Button>
            </div>
          </div>

          {/* Mobile and tablet menu button - visible on anything smaller than lg screens */}
          <div className="lg:hidden flex items-center justify-center">
            <button 
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-purple-700/30 hover:shadow-glow transition-all duration-200"
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              <div className="relative w-6 h-6 flex items-center justify-center transform transition-all duration-300">
                {/* Three lines that animate to X */}
                <span 
                  className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-0' : 'translate-y-[-8px]'
                  }`} 
                />
                <span 
                  className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`} 
                />
                <span 
                  className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-[8px]'
                  }`} 
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile and tablet menu - visible when open on anything smaller than lg screens */}
        <div 
          className={`lg:hidden mt-3 rounded-lg bg-[#0a0812]/95 backdrop-blur-lg border border-purple-900/20 overflow-hidden shadow-lg transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className={`px-2 pt-2 pb-3 space-y-1 transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-4'}`}>
            <button
              onClick={() => scrollToSection('dev-tools')}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-200 flex items-center gap-2
                ${isActive('dev-tools') 
                  ? 'text-white bg-purple-700/30 shadow-glow' 
                  : 'text-white hover:bg-purple-700/30 hover:shadow-glow'
                }`}
            >
              <Code className="h-4 w-4" />
              Development
            </button>
            <button
              onClick={() => scrollToSection('design-tools')}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-200 flex items-center gap-2
                ${isActive('design-tools') 
                  ? 'text-white bg-purple-700/30 shadow-glow' 
                  : 'text-white hover:bg-purple-700/30 hover:shadow-glow'
                }`}
            >
              <Paintbrush className="h-4 w-4" />
              Design
            </button>
            <button
              onClick={() => scrollToSection('ai-tools')}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-200 flex items-center gap-2
                ${isActive('ai-tools') 
                  ? 'text-white bg-purple-700/30 shadow-glow' 
                  : 'text-white hover:bg-purple-700/30 hover:shadow-glow'
                }`}
            >
              <Cpu className="h-4 w-4" />
              AI Tools
            </button>
            <div className="mt-4 px-3 py-3 border-t border-purple-900/30">
              <Button
                variant="outline"
                className="w-full border-purple-500/30 bg-purple-500/10 text-white hover:bg-purple-500/30 hover:border-purple-400 hover:shadow-glow rounded-md flex items-center justify-center gap-2 text-sm transition-all duration-200"
                size="sm"
                onClick={() => window.open('https://github.com/znarf-y/LazyStack')}
              >
                <Github className="h-4 w-4" />
                <span>Source Code</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
