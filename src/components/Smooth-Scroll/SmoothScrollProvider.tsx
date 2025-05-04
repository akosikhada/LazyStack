"use client";

import { useEffect } from "react";

export function SmoothScrollProvider() {
  useEffect(() => {
    // Check if the user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Only apply polyfill if smooth scrolling should be enabled
    if (
      !prefersReducedMotion &&
      (!("scrollBehavior" in document.documentElement.style) ||
        // Some browsers partially support it but not perfectly
        (window.navigator.userAgent.includes("Safari") &&
          !window.navigator.userAgent.includes("Chrome")))
    ) {
      // Dynamically import the polyfill only if needed
      import("smoothscroll-polyfill").then((smoothScroll) => {
        smoothScroll.polyfill();
        console.log("Smooth scroll polyfill loaded");
      });
    }
  }, []);

  // This component doesn't render anything
  return null;
}
