"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import ToolCard from "../Cards/ToolCard";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Tool, ToolCategoriesProps } from "@/types/tools";
import { useTheme } from "next-themes";

export default function ToolCategories({
  title,
  description,
  tools,
  bgColor = "#050508",
  showViewMore = false,
  initialVisibleCount = 7,
}: ToolCategoriesProps) {
  const { theme } = useTheme();
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);
  const loadMoreCount = 6; // Show 6 more items with each click
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef(0);
  const [isLoading, setIsLoading] = useState(false);
  const [initialToolsLoaded, setInitialToolsLoaded] = useState(false);

  // Fix for React Server Components (useLayoutEffect not available on server)
  const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

  // Initial loading of tools
  useEffect(() => {
    setInitialToolsLoaded(true);
  }, []);

  const handleLoadMore = () => {
    // Prevent multiple clicks during loading
    if (isLoading) return;

    setIsLoading(true);

    // Store exact scroll position before adding more items
    scrollPositionRef.current = window.scrollY;

    // Increase the visible count incrementally
    setVisibleCount((prevCount) =>
      Math.min(prevCount + loadMoreCount, tools.length),
    );
  };

  // Use layout effect to handle scroll position immediately after DOM update
  useIsomorphicLayoutEffect(() => {
    if (isLoading) {
      // Need to wait for the browser to actually render the new content
      requestAnimationFrame(() => {
        // Restore precise scroll position to keep user where they were
        window.scrollTo({
          top: scrollPositionRef.current,
          behavior: "auto",
        });

        // Reset loading state after scroll is adjusted
        setIsLoading(false);
      });
    }
  }, [visibleCount, isLoading]);

  const handleShowLess = () => {
    // Reset to initial visible count
    setVisibleCount(initialVisibleCount);

    // After state update, scroll to the top of the section
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const visibleTools = tools.slice(0, visibleCount);
  const hasMoreTools = visibleCount < tools.length;

  // Determine background color based on theme
  const sectionBgColor = theme === "light" ? "#f7f7fa" : bgColor;

  // Determine gradient color
  const gradientFromColor = theme === "light" ? "#f7f7fa" : "#050508";

  return (
    <section
      ref={sectionRef}
      className="relative px-4 py-16 transition-colors duration-300 md:px-8 lg:px-16"
      style={{ backgroundColor: sectionBgColor }}
    >
      <div className="absolute bottom-0 left-0 h-16 w-full bg-gradient-to-t from-background to-transparent"></div>
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            {title}
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-2 lg:gap-7 xl:grid-cols-3 xl:gap-8">
          {initialToolsLoaded &&
            visibleTools.map((tool, index) => (
              <div key={`${tool.title}-${index}`} className="lazy-load-wrapper">
                <ToolCard
                  title={tool.title}
                  description={tool.description}
                  icon={tool.icon}
                  imageIcon={tool.imageIcon}
                  category={tool.category}
                  highlight={tool.highlight}
                  tryNowLink={tool.link || tool.tryNowLink || "#"}
                  benefits={tool.benefits}
                  index={index}
                />
              </div>
            ))}
        </div>

        {showViewMore && tools.length > initialVisibleCount && (
          <div className="mt-10 flex justify-start">
            {visibleCount > initialVisibleCount && !hasMoreTools ? (
              <button
                onClick={handleShowLess}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-2 font-medium text-white shadow-lg transition-all duration-300 hover:from-purple-600 hover:to-indigo-700 hover:shadow-xl"
                disabled={isLoading}
              >
                Show Less <ChevronUp size={16} />
              </button>
            ) : hasMoreTools ? (
              <button
                onClick={handleLoadMore}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-2 font-medium text-white shadow-lg transition-all duration-300 hover:from-purple-600 hover:to-indigo-700 hover:shadow-xl"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="-ml-1 mr-2 h-4 w-4 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Loading...
                  </span>
                ) : (
                  <>
                    {visibleCount > initialVisibleCount
                      ? "Load More"
                      : "View More"}{" "}
                    <ChevronDown size={16} />
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleShowLess}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-2 font-medium text-white shadow-lg transition-all duration-300 hover:from-purple-600 hover:to-indigo-700 hover:shadow-xl"
                disabled={isLoading}
              >
                Show Less <ChevronUp size={16} />
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
