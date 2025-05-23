import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

/**
 * Custom hook to handle navbar scrolling behavior and stylings
 */
export function useNavbarScroll() {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero",
        "development-tools",
        "design-tools",
        "ai-tools",
      ];
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
  };

  return {
    scrolled,
    activeSection,
    isActive,
    scrollToSection,
    navbarBg,
    navbarBorder,
    blackText,
    textColorClass,
    mutedTextColorClass,
    activeBgClass,
    hoverBgClass,
    theme,
  };
}
