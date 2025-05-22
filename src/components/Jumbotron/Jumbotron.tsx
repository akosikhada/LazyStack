"use client";

import React, { useRef } from "react";
import { useJumbotronEffects } from "@/hooks/useJumbotronEffects";
import { JumbotronProps } from "@/types/jumbotron";
import { useTheme } from "next-themes";

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

  return (
    <section
      ref={heroRef}
      className={`relative overflow-hidden ${
        isDark ? "text-white" : "text-gray-900"
      } flex min-h-[100vh] flex-col items-center justify-center px-4 py-8 text-center sm:py-16 md:px-8 md:py-20 lg:px-16 lg:py-24`}
    >
      {/* Enhanced background with gradient and animated elements */}
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
      ></div>

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

      {/* Content */}
      <div className="relative z-10 mt-0 w-full max-w-6xl px-4 pt-10 sm:px-6 sm:pt-0 lg:px-8">
        <div className="flex flex-col items-center justify-center">
          <div
            ref={badgeRef}
            className={`${
              isDark
                ? "bg-gradient-to-r from-[#3d1a7a] to-[#5b26c5] text-white shadow-purple-900/30"
                : "bg-gradient-to-r from-[#8a3ffc] to-[#6023c0] text-white shadow-purple-400/20"
            } mb-6 rounded-full px-5 py-2 text-xs font-medium tracking-wide shadow-lg sm:mb-8 sm:text-sm`}
          >
            <span className="flex items-center justify-center">
              <span className="mr-2 text-yellow-200">✦</span>
              <span className="font-semibold text-white">
                Developer's Treasure Trove
              </span>
              <span className="ml-2 text-yellow-200">✦</span>
            </span>
          </div>
        </div>

        <h1
          ref={titleRef}
          className="mx-auto mb-4 px-2 text-center text-4xl font-bold leading-none tracking-tight sm:mb-6 sm:px-4 sm:text-5xl md:text-6xl lg:text-7xl"
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
          className={`mx-auto mb-8 max-w-3xl text-lg sm:mb-10 sm:text-xl md:text-2xl ${
            isDark ? "text-[#e0d6ff]/90" : "text-gray-700"
          } px-2 text-center font-light leading-relaxed`}
        >
          {description}
        </p>

        <div
          className="mx-auto mb-10 grid max-w-5xl grid-cols-1 gap-5 px-3 sm:mb-12 sm:gap-6 sm:px-0 md:mb-14 md:gap-7 lg:grid-cols-3"
          ref={featuresRef}
        >
          {[
            {
              title: "Developer's Edge",
              description:
                "Boost your productivity with competitive tools & workflows",
            },
            {
              title: "Quality Companion",
              description:
                "Reliable solutions for maintaining code quality & standards",
            },
            {
              title: "Multilingual Savior",
              description:
                "Support for multiple programming languages & frameworks",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className={`group ${
                isDark
                  ? "border-purple-500/30 bg-gradient-to-br from-[#1a1225]/90 to-[#120a1c]/95 shadow-purple-900/10 backdrop-blur-md hover:shadow-purple-900/30"
                  : "border-purple-200/80 bg-gradient-to-br from-white to-[#f7f7fa] shadow-purple-100/30 backdrop-blur-md hover:shadow-purple-200/50"
              } floating-element overflow-hidden rounded-xl border shadow-xl transition-all duration-300`}
            >
              <div className="flex h-full min-h-[120px] flex-col p-5 sm:p-6">
                <div className="mb-4 flex items-center">
                  <div
                    className={`flex h-9 w-9 items-center justify-center ${
                      isDark ? "bg-purple-500/30" : "bg-purple-100"
                    } mr-3 rounded-lg`}
                  >
                    <span
                      className={isDark ? "text-purple-300" : "text-purple-600"}
                    >
                      ◆
                    </span>
                  </div>
                  <h3
                    className={`${isDark ? "text-white" : "text-gray-800"} text-base font-semibold tracking-tight sm:text-lg`}
                  >
                    {feature.title}
                  </h3>
                </div>
                <p
                  className={`${isDark ? "text-white/90" : "text-gray-700"} text-sm leading-relaxed sm:text-base`}
                >
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-8 mt-2 flex w-full justify-center px-2 sm:mb-10 sm:mt-4 sm:px-4 md:mb-12">
          {/* Terminal Container with Responsive Width */}
          <div
            className="relative mx-auto w-full max-w-3xl"
            style={{ maxWidth: "98%" }}
          >
            {/* Enhanced Glow Effect */}
            <div
              className={`absolute -inset-0.5 rounded-lg bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 blur ${
                isDark ? "opacity-40" : "opacity-20"
              }`}
            ></div>

            {/* Terminal Window */}
            <div
              className={`relative ${
                isDark
                  ? "border-purple-500/30 bg-[#050210]"
                  : "border-purple-300/40 bg-gray-900"
              } rounded-lg border shadow-2xl`}
              style={{
                width: "100%",
                borderRadius: "14px",
                overflow: "hidden",
              }}
            >
              {/* Terminal Header */}
              <div
                className={`flex h-7 items-center px-3 sm:h-8 sm:px-4 md:h-9 ${
                  isDark ? "bg-[#0a0812]/90" : "bg-gray-800"
                }`}
                style={{
                  borderTopLeftRadius: "14px",
                  borderTopRightRadius: "14px",
                }}
              >
                <div className="mr-2 h-3 w-3 rounded-full bg-red-500 sm:mr-2.5 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4"></div>
                <div className="mr-2 h-3 w-3 rounded-full bg-yellow-500 sm:mr-2.5 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4"></div>
                <div className="h-3 w-3 rounded-full bg-green-500 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4"></div>
                <div className="ml-3 text-xs font-medium text-gray-300 sm:text-sm">
                  LazyStack-terminal
                </div>
              </div>

              {/* Terminal Content */}
              <div
                ref={dashboardCodeRef}
                className={`${isDark ? "bg-[#050210]" : "bg-gray-900"} relative h-[18rem] sm:h-[20rem] md:h-[22rem] lg:h-[22rem]`}
                style={{
                  width: "100%",
                  borderBottomLeftRadius: "14px",
                  borderBottomRightRadius: "14px",
                }}
              >
                <div
                  className="absolute inset-0 overflow-hidden p-4 text-left font-mono text-xs sm:p-5 sm:text-sm md:p-6 md:text-base lg:text-lg"
                  style={{
                    borderBottomLeftRadius: "14px",
                    borderBottomRightRadius: "14px",
                  }}
                >
                  <div className="flex justify-start">
                    <span className="mr-2.5 flex-shrink-0 text-purple-400">
                      $
                    </span>
                    <div className="w-full overflow-hidden whitespace-pre-wrap break-words text-left text-gray-300">
                      {typedText}
                      {isTyping && (
                        <span className="animate-blink ml-0.5 inline-block h-4 w-2 bg-purple-400 align-middle sm:h-5 sm:w-2.5 md:h-6 md:w-3"></span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced floating elements */}
            <div
              className={`absolute -right-6 -top-6 h-16 w-16 blur-md sm:-right-8 sm:-top-8 sm:h-20 sm:w-20 md:-right-10 md:-top-10 md:h-24 md:w-24 ${
                isDark ? "bg-purple-500/25" : "bg-purple-400/20"
              } animate-pulse-slow rounded-full`}
            ></div>
            <div
              className={`absolute -bottom-8 -left-8 h-20 w-20 blur-md sm:-bottom-10 sm:-left-10 sm:h-24 sm:w-24 md:-bottom-12 md:-left-12 md:h-28 md:w-28 ${
                isDark ? "bg-blue-500/25" : "bg-blue-400/20"
              } animate-pulse-slow rounded-full`}
            ></div>
          </div>
        </div>
      </div>

      {/* Additional decorative elements */}
      <div
        ref={decorationsRef}
        className="pointer-events-none absolute inset-0 z-[1]"
      >
        <div
          className={`absolute left-[5%] top-1/4 h-20 w-1 bg-gradient-to-b ${
            isDark ? "from-purple-500/40" : "from-purple-400/30"
          } rounded-full to-transparent blur-sm parallax-element`}
        ></div>
        <div
          className={`absolute right-[8%] top-1/3 h-32 w-1 bg-gradient-to-b ${
            isDark ? "from-blue-500/40" : "from-blue-400/30"
          } rounded-full to-transparent blur-sm parallax-element`}
        ></div>
        <div
          className={`absolute bottom-1/4 left-[12%] h-24 w-1 bg-gradient-to-t ${
            isDark ? "from-purple-500/40" : "from-purple-400/30"
          } rounded-full to-transparent blur-sm parallax-element`}
        ></div>
        <div
          className={`absolute bottom-1/3 right-[15%] h-16 w-1 bg-gradient-to-t ${
            isDark ? "from-blue-500/40" : "from-blue-400/30"
          } rounded-full to-transparent blur-sm parallax-element`}
        ></div>
      </div>
    </section>
  );
};

export default Jumbotron;
