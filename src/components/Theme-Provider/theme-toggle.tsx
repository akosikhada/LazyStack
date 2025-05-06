"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { gsap } from "gsap";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const switchThemeRef = React.useRef<HTMLDivElement>(null);
  const knobEffectRef = React.useRef<HTMLDivElement>(null);
  const isAnimatingRef = React.useRef(false);
  const themeTimelineRef = React.useRef<gsap.core.Timeline | null>(null);
  const lastToggleTimeRef = React.useRef<number>(0);
  const PreventRapidClicks = 500; // Prevent clicks within 500ms

  // Only initialize once on component mount
  React.useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");

    if (knobEffectRef.current) {
      // Create initial position without animation
      gsap.set(knobEffectRef.current, {
        translateX: isDark ? 24 : 0,
        force3D: true, // Force hardware acceleration
      });
    }

    // Clean up any lingering animations on unmount
    return () => {
      if (themeTimelineRef.current) {
        themeTimelineRef.current.kill();
      }
    };
  }, []);

  const toggleTheme = React.useCallback(() => {
    // Prevent rapid clicking
    const now = Date.now();
    if (now - lastToggleTimeRef.current < PreventRapidClicks) {
      return;
    }
    lastToggleTimeRef.current = now;

    // Don't toggle if already animating or if the knob element doesn't exist
    if (isAnimatingRef.current || !knobEffectRef.current) return;

    // Kill any existing animation
    if (themeTimelineRef.current) {
      themeTimelineRef.current.kill();
    }

    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);

    isAnimatingRef.current = true;

    // Create a new timeline for smoother animation control
    themeTimelineRef.current = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });

    // Use translateX instead of x for better performance
    themeTimelineRef.current.to(knobEffectRef.current, {
      translateX: newTheme === "dark" ? 24 : 0,
      duration: 0.4, // Slightly longer duration for smoother animation
      ease: "sine.out", // Simpler easing function that's less CPU intensive
      force3D: true, // Force hardware acceleration
    });
  }, [theme, setTheme]);

  return (
    <div
      ref={switchThemeRef}
      onClick={toggleTheme}
      className="relative h-[30px] w-[56px] cursor-pointer rounded-full bg-gray-200 p-[3px] dark:bg-gray-700"
      role="button"
      aria-label="Toggle theme"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          toggleTheme();
        }
      }}
    >
      <div
        ref={knobEffectRef}
        className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-white shadow-md will-change-transform dark:bg-gray-800"
        style={{ backfaceVisibility: "hidden" }}
      >
        <Sun className="h-[14px] w-[14px] text-amber-500 dark:opacity-0" />
        <Moon className="absolute h-[14px] w-[14px] text-indigo-300 opacity-0 dark:opacity-100" />
      </div>
      <span className="sr-only">Toggle theme</span>
    </div>
  );
}
