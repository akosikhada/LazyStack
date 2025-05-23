"use client";

import { useTheme } from "next-themes";
import { ToolCategoriesProps } from "@/types/tool-types";
import { CategoryHeader } from "./CategoryHeader";
import { ToolGrid } from "./ToolGrid";
import { ViewMoreButton } from "./ViewMoreButton";
import { useCategoryTools } from "@/hooks/useCategoryTools";

/**
 * Displays a category of tools with an optional "View More" functionality
 */
export default function ToolCategories({
  title,
  description,
  tools,
  bgColor = "#050508",
  showViewMore = false,
  initialVisibleCount = 7,
}: ToolCategoriesProps) {
  const { theme } = useTheme();

  // Use our custom hook to manage tools state and loading behavior
  const {
    visibleTools,
    visibleCount,
    hasMoreTools,
    isLoading,
    initialToolsLoaded,
    handleLoadMore,
    handleShowLess,
    sectionRef,
  } = useCategoryTools({
    tools,
    initialVisibleCount,
  });

  // Determine background color based on theme
  const sectionBgColor = theme === "light" ? "#f7f7fa" : bgColor;

  return (
    <section
      ref={sectionRef}
      className="relative px-4 py-16 transition-colors duration-300 md:px-8 lg:px-16"
      style={{ backgroundColor: sectionBgColor }}
    >
      <div className="absolute bottom-0 left-0 h-16 w-full bg-gradient-to-t from-background to-transparent"></div>
      <div className="mx-auto max-w-7xl">
        {/* Header with title and description */}
        <CategoryHeader title={title} description={description} />

        {/* Grid of tool cards */}
        <ToolGrid
          tools={visibleTools}
          initialToolsLoaded={initialToolsLoaded}
        />

        {/* View more/less button */}
        {showViewMore && tools.length > initialVisibleCount && (
          <div className="mt-10 flex justify-start">
            <ViewMoreButton
              hasMoreTools={hasMoreTools}
              isLoading={isLoading}
              initialVisibleCount={initialVisibleCount}
              visibleCount={visibleCount}
              onLoadMore={handleLoadMore}
              onShowLess={handleShowLess}
            />
          </div>
        )}
      </div>
    </section>
  );
}
