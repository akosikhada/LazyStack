"use client";

import React, { useRef } from "react";
import { useJumbotronEffects } from "@/hooks/useJumbotronEffects";
import { JumbotronProps, FeatureItem } from "@/types/jumbotron-types";
import { useTheme } from "next-themes";
import { JumbotronBackground } from "./JumbotronBackground";
import { FeatureCard } from "./FeatureCard";
import { TerminalDisplay } from "./TerminalDisplay";
import { Decorations } from "./Decorations";

/**
 * Hero section component with animated elements and terminal demo
 */
export const Jumbotron: React.FC<JumbotronProps> = ({
  description = "Your Ultimate Developer Toolkit Guide for Modern Workflows",
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // References for GSAP animations
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const decorationsRef = useRef<HTMLDivElement>(null);
  const dashboardCodeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const { mousePosition, isMounted, typedText, isTyping, isMobileOrTablet } =
    useJumbotronEffects({
      heroRef,
      titleRef,
      descriptionRef,
      badgeRef,
      featuresRef,
      decorationsRef,
      dashboardCodeRef,
    });

  // Feature items data
  const features: FeatureItem[] = [
    {
      title: "Developer's Edge",
      description: "Boost your productivity with competitive tools & workflows",
      icon: "🚀",
    },
    {
      title: "Quality Companion",
      description:
        "Reliable solutions for maintaining code quality & standards",
      icon: "✨",
    },
    {
      title: "Multilingual Savior",
      description: "Support for multiple programming languages & frameworks",
      icon: "🌐",
    },
  ];

  return (
    <section
      ref={heroRef}
      className={`relative overflow-hidden ${
        isDark ? "text-white" : "text-gray-900"
      } flex min-h-[100vh] w-full flex-col items-center justify-center px-4 py-8 text-center sm:py-16 md:px-8 md:py-20 lg:px-16 lg:py-24`}
    >
      {/* Background elements */}
      <JumbotronBackground
        isDark={isDark}
        isMounted={isMounted}
        isMobileOrTablet={isMobileOrTablet}
        mousePosition={mousePosition}
      />

      {/* Content */}
      <div className="relative z-10 mt-0 w-full max-w-6xl px-4 pt-10 sm:px-6 sm:pt-0 lg:px-8">
        <div className="flex flex-col items-center justify-center">
          <div
            ref={badgeRef}
            className={`${
              isDark
                ? "bg-gradient-to-r from-[#3d1a7a] to-[#5b26c5] text-white shadow-purple-900/30"
                : "bg-gradient-to-r from-[#8a3ffc] to-[#6023c0] text-white shadow-purple-400/20"
            } scale-in-animation mb-6 flex items-center rounded-full px-5 py-2.5 text-xs font-medium tracking-wide shadow-lg sm:mb-8 sm:text-sm`}
          >
            <span className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-yellow-200">
              ✦
            </span>
            <span className="font-semibold text-white">
              Developer's Treasure Trove
            </span>
            <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-yellow-200">
              ✦
            </span>
          </div>
        </div>

        <h1
          ref={titleRef}
          className="mx-auto mb-4 px-2 text-center text-5xl font-extrabold leading-none tracking-tight sm:mb-6 sm:px-4 sm:text-6xl md:text-7xl lg:text-8xl"
        >
          <span className={isDark ? "text-purple-400" : "text-purple-600"}>
            Lazy
          </span>
          <span
            className={
              isDark
                ? "bg-gradient-to-r from-white via-white to-[#e0d6ff] bg-clip-text text-transparent"
                : "bg-gradient-to-r from-gray-800 via-gray-900 to-black bg-clip-text text-transparent"
            }
          >
            Stack
          </span>
        </h1>
        <p
          ref={descriptionRef}
          className={`mx-auto mb-10 max-w-3xl text-lg sm:mb-12 sm:text-xl md:text-2xl ${
            isDark ? "text-[#e0d6ff]/90" : "text-gray-700"
          } px-2 text-center font-light leading-relaxed`}
        >
          {description}
        </p>

        {/* Feature cards */}
        <div
          className="md:mb-18 mx-auto mb-14 grid max-w-5xl grid-cols-1 gap-6 px-3 sm:mb-16 sm:gap-8 sm:px-0 lg:grid-cols-3"
          ref={featuresRef}
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} isDark={isDark} />
          ))}
        </div>

        {/* Terminal display */}
        <TerminalDisplay
          isDark={isDark}
          typedText={typedText}
          isTyping={isTyping}
          dashboardCodeRef={dashboardCodeRef}
        />
      </div>

      {/* Decorative elements */}
      <Decorations isDark={isDark} decorationsRef={decorationsRef} />
    </section>
  );
};

export default Jumbotron;
