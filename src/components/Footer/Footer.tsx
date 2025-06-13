"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { BackToTopButton } from "./BackToTopButton";
import { FooterBackground } from "./FooterBackground";
import { FooterBrand } from "./FooterBrand";
import { FooterNavigation } from "./FooterNavigation";
import { FooterContact } from "./FooterContact";
import { FooterDivider } from "./FooterDivider";
import { FooterBottom } from "./FooterBottom";

/**
 * Main footer component that combines all footer sections
 */
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
          ? "border-purple-900/20 bg-gradient-to-b from-[#0a0412] via-[#080310] to-[#050208]"
          : "border-purple-200/40 bg-gradient-to-b from-[#f5f5fa] via-[#f8f8fc] to-[#fafafa]"
      } relative border-t pb-10 pt-20`}
    >
      {/* Background effects */}
      <FooterBackground isDark={isDark} />

      {/* Back to top button */}
      <BackToTopButton
        showButton={showButton}
        isDark={isDark}
        onClick={scrollToTop}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-12 md:gap-y-16">
          {/* Brand section */}
          <FooterBrand isDark={isDark} />

          {/* Navigation Links */}
          <FooterNavigation isDark={isDark} />

          {/* Contact section */}
          <FooterContact isDark={isDark} />
        </div>

        {/* Divider */}
        <FooterDivider isDark={isDark} />

        {/* Bottom section */}
        <FooterBottom isDark={isDark} currentYear={currentYear} />
      </div>
    </footer>
  );
}
