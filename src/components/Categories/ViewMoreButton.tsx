import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ViewMoreButtonProps {
  hasMoreTools: boolean;
  isLoading: boolean;
  initialVisibleCount: number;
  visibleCount: number;
  onLoadMore: () => void;
  onResetView: () => void;
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
  onResetView,
}: ViewMoreButtonProps) {
  // Shared button classes
  const baseButtonClasses =
    "group relative flex w-full sm:w-auto items-center justify-center gap-3 rounded-full px-6 sm:px-8 py-2.5 sm:py-3 font-medium shadow-lg transition-all duration-300 overflow-hidden";
  const primaryButtonClasses = `${baseButtonClasses} bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-xl`;
  const outlineButtonClasses = `${baseButtonClasses} bg-transparent border-2 border-purple-500/20 text-purple-600 dark:text-purple-300 hover:border-purple-500/40`;

  if (!hasMoreTools) {
    // This is the "Show Default" button instance
    return (
      <button
        onClick={onResetView}
        className={outlineButtonClasses}
        disabled={isLoading}
      >
        <span className="relative z-10">Reset View</span>
        <ChevronUp
          size={18}
          className="relative z-10 transform transition-transform duration-300 group-hover:-translate-y-1"
        />
        {/* Background glow effect */}
        <span className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"></span>
      </button>
    );
  } else {
    // This is the "Load More" button instance
    return (
      <button
        onClick={onLoadMore}
        className={primaryButtonClasses}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="relative z-10 flex items-center gap-2">
            <svg
              className="h-5 w-5 animate-spin text-white"
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
            <span className="relative z-10">
              {visibleCount > initialVisibleCount ? "Load More" : "View More"}
            </span>
            <ChevronDown
              size={18}
              className="relative z-10 transform transition-transform duration-300 group-hover:translate-y-1"
            />

            {/* Background shine effect */}
            <span className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-30"></span>
            <span className="group-hover:animate-shine absolute left-0 top-0 -z-10 h-full w-[200%] translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent"></span>
          </>
        )}
      </button>
    );
  }
}
