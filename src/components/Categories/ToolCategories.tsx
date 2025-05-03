"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import ToolCard from "../Cards/ToolCard";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Tool, ToolCategoriesProps } from "@/types/tools";

export default function ToolCategories({
  title,
  description,
  tools,
  bgColor = "#050508",
  showViewMore = false,
  initialVisibleCount = 7,
}: ToolCategoriesProps) {
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
      Math.min(prevCount + loadMoreCount, tools.length)
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

  return (
    <section
      ref={sectionRef}
      className="py-16 px-4 md:px-8 lg:px-16 relative"
      style={{ backgroundColor: bgColor }}
    >
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#050508] to-transparent"></div>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div className="flex justify-start mt-10">
            {visibleCount > initialVisibleCount && !hasMoreTools ? (
              <button
                onClick={handleShowLess}
                className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 px-6 rounded-full font-medium hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                disabled={isLoading}
              >
                Show Less <ChevronUp size={16} />
              </button>
            ) : hasMoreTools ? (
              <button
                onClick={handleLoadMore}
                className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 px-6 rounded-full font-medium hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 px-6 rounded-full font-medium hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
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
