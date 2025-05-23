import React from "react";
import { MousePosition } from "../../types/jumbotron-types";

interface JumbotronBackgroundProps {
  isDark: boolean;
  isMounted: boolean;
  isMobileOrTablet: boolean;
  mousePosition: MousePosition;
}

/**
 * Component for displaying all the background visual elements of the jumbotron
 */
export function JumbotronBackground({
  isDark,
  isMounted,
  isMobileOrTablet,
  mousePosition,
}: JumbotronBackgroundProps) {
  return (
    <>
      {/* Main gradient background */}
      <div
        className={`absolute inset-0 ${
          isDark
            ? "bg-gradient-to-br from-[#050210] via-[#0a0418] to-[#020205]"
            : "bg-gradient-to-br from-white via-[#f7f7fa] to-[#f0f0f7]"
        } z-0`}
      />

      {/* Polka dot pattern */}
      <div
        className="absolute inset-0 z-0"
        style={{
          opacity: isDark ? 0.25 : 0.35,
          backgroundImage: isDark
            ? "radial-gradient(circle, rgba(138, 63, 252, 0.6) 1px, transparent 1px), radial-gradient(circle, rgba(107, 35, 255, 0.4) 2px, transparent 2px)"
            : "radial-gradient(circle, rgba(138, 63, 252, 0.7) 1px, transparent 1px), radial-gradient(circle, rgba(107, 35, 255, 0.5) 2px, transparent 2px)",
          backgroundSize: "36px 36px, 72px 72px",
          backgroundPosition: "0 0, 18px 18px",
        }}
      />

      {/* Animated gradient overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          opacity: isDark ? 0.4 : 0.4,
          background: isMounted
            ? isMobileOrTablet
              ? isDark
                ? "radial-gradient(circle at 50% 50%, rgba(138, 63, 252, 0.2) 0%, rgba(13, 9, 31, 0) 65%)"
                : "radial-gradient(circle at 50% 50%, rgba(138, 63, 252, 0.25) 0%, rgba(255, 255, 255, 0) 65%)"
              : isDark
                ? `radial-gradient(circle at ${
                    50 + (mousePosition.x / window.innerWidth) * 25
                  }% ${
                    50 + (mousePosition.y / window.innerHeight) * 25
                  }%, rgba(138, 63, 252, 0.2) 0%, rgba(13, 9, 31, 0) 65%)`
                : `radial-gradient(circle at ${
                    50 + (mousePosition.x / window.innerWidth) * 25
                  }% ${
                    50 + (mousePosition.y / window.innerHeight) * 25
                  }%, rgba(138, 63, 252, 0.25) 0%, rgba(255, 255, 255, 0) 65%)`
            : isDark
              ? "radial-gradient(circle at 50% 50%, rgba(138, 63, 252, 0.2) 0%, rgba(13, 9, 31, 0) 65%)"
              : "radial-gradient(circle at 50% 50%, rgba(138, 63, 252, 0.25) 0%, rgba(255, 255, 255, 0) 65%)",
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          opacity: isDark ? 0.08 : 0.05,
          backgroundImage: isDark
            ? "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)"
            : "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
    </>
  );
}
