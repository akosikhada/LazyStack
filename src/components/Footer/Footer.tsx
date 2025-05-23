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
          ? "border-purple-900/10 bg-gradient-to-b from-[#0a0412] to-[#050208]"
          : "border-purple-200/30 bg-gradient-to-b from-[#f0f0f7] to-[#fafafa]"
      } relative border-t pb-8 pt-16`}
    >
      {/* Background effects */}
      <FooterBackground isDark={isDark} />

      {/* Back to top button */}
      <BackToTopButton
        showButton={showButton}
        isDark={isDark}
        onClick={scrollToTop}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="mb-14 grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-12">
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
