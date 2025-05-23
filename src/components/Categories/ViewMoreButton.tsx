import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ViewMoreButtonProps {
  hasMoreTools: boolean;
  isLoading: boolean;
  initialVisibleCount: number;
  visibleCount: number;
  onLoadMore: () => void;
  onShowLess: () => void;
}

/**
 * Button component for loading more tools or showing less
 */
export function ViewMoreButton({
  hasMoreTools,
  isLoading,
  initialVisibleCount,
  visibleCount,
  onLoadMore,
  onShowLess,
}: ViewMoreButtonProps) {
  // Show the "Show Less" button when:
  // 1. There are no more tools to show AND the visible count is greater than initial
  const showLessButton = visibleCount > initialVisibleCount && !hasMoreTools;

  // Show the "Load More" button when:
  // 1. There are more tools to show
  const showLoadMoreButton = hasMoreTools;

  if (showLessButton) {
    return (
      <button
        onClick={onShowLess}
        className="flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-2 font-medium text-white shadow-lg transition-all duration-300 hover:from-purple-600 hover:to-indigo-700 hover:shadow-xl"
        disabled={isLoading}
      >
        Show Less <ChevronUp size={16} />
      </button>
    );
  }

  if (showLoadMoreButton) {
    return (
      <button
        onClick={onLoadMore}
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
            {visibleCount > initialVisibleCount ? "Load More" : "View More"}{" "}
            <ChevronDown size={16} />
          </>
        )}
      </button>
    );
  }

  // Default fallback
  return (
    <button
      onClick={onShowLess}
      className="flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-2 font-medium text-white shadow-lg transition-all duration-300 hover:from-purple-600 hover:to-indigo-700 hover:shadow-xl"
      disabled={isLoading}
    >
      Show Less <ChevronUp size={16} />
    </button>
  );
}
