import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Tool } from "@/types/tool-types";

interface UseCategoryToolsParams {
  tools: Tool[];
  initialVisibleCount: number;
  loadMoreCount?: number;
}

interface UseCategoryToolsReturn {
  visibleTools: Tool[];
  visibleCount: number;
  hasMoreTools: boolean;
  isLoading: boolean;
  initialToolsLoaded: boolean;
  handleLoadMore: () => void;
  handleResetView: () => void;
  sectionRef: React.RefObject<HTMLDivElement>;
}

/**
 * Custom hook for managing tool category loading and pagination
 */
export function useCategoryTools({
  tools,
  initialVisibleCount,
  loadMoreCount = 6,
}: UseCategoryToolsParams): UseCategoryToolsReturn {
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);
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

  const handleResetView = () => {
    // If current visible count is greater than 6, set to 6
    // Otherwise, reset to initialVisibleCount (this preserves initial behavior if there are fewer than 6 items)
    if (visibleCount > 6) {
      setVisibleCount(6);
    } else {
      setVisibleCount(initialVisibleCount);
    }

    // After state update, scroll to the top of the section
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const visibleTools = tools.slice(0, visibleCount);
  const hasMoreTools = visibleCount < tools.length;

  return {
    visibleTools,
    visibleCount,
    hasMoreTools,
    isLoading,
    initialToolsLoaded,
    handleLoadMore,
    handleResetView,
    sectionRef,
  };
}
