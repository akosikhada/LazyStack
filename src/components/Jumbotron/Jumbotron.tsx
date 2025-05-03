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
      } py-8 sm:py-16 md:py-20 lg:py-24 px-4 md:px-8 lg:px-16 flex flex-col items-center justify-center text-center min-h-[100vh]`}
    >
      {/* Enhanced background with gradient and animated elements */}
      <div className={`absolute inset-0 ${
        isDark 
          ? "bg-gradient-to-br from-[#050210] via-[#0a0418] to-[#020205]" 
          : "bg-gradient-to-br from-white via-[#f7f7fa] to-[#f0f0f7]"
      } z-0`} />

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
      <div className="relative z-10 max-w-6xl w-full px-4 sm:px-6 lg:px-8 mt-0 pt-10 sm:pt-0">
        <div className="flex flex-col items-center justify-center">
          <div
            ref={badgeRef}
            className={`${
              isDark 
                ? "bg-gradient-to-r from-[#3d1a7a] to-[#5b26c5] text-white shadow-purple-900/30" 
                : "bg-gradient-to-r from-[#8a3ffc] to-[#6023c0] text-white shadow-purple-400/20"
            } text-xs sm:text-sm font-medium tracking-wide rounded-full px-5 py-2 mb-6 sm:mb-8 shadow-lg`}
          >
            <span className="flex items-center justify-center">
              <span className="mr-2 text-yellow-200">✦</span>
              <span className="text-white font-semibold">
                Developer's Treasure Trove
              </span>
              <span className="ml-2 text-yellow-200">✦</span>
            </span>
          </div>
        </div>

        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 text-center px-2 sm:px-4 mx-auto tracking-tight leading-none"
        >
          <span className={isDark ? "text-purple-400" : "text-purple-600"}>Lazy</span>
          <span className={isDark 
            ? "bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-[#e0d6ff]"
            : "bg-clip-text text-transparent bg-gradient-to-r from-gray-800 via-gray-900 to-black"
          }>
            Stack
          </span>
        </h1>
        <p
          ref={descriptionRef}
          className={`text-lg sm:text-xl md:text-2xl mb-8 sm:mb-10 max-w-3xl mx-auto ${
            isDark ? "text-[#e0d6ff]/90" : "text-gray-700"
          } text-center px-2 leading-relaxed font-light`}
        >
          {description}
        </p>

        <div
          className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-7 mb-10 sm:mb-12 md:mb-14 max-w-5xl mx-auto px-3 sm:px-0"
          ref={featuresRef}
        >
          {[
            {
              title: "Developer's Edge",
              description: "Boost your productivity with competitive tools & workflows",
            },
            {
              title: "Quality Companion",
              description: "Reliable solutions for maintaining code quality & standards",
            },
            {
              title: "Multilingual Savior",
              description: "Support for multiple programming languages & frameworks",
            },
          ].map((feature, index) => (
            <div 
              key={index}
              className={`group ${
                isDark
                  ? "bg-gradient-to-br from-[#1a1225]/90 to-[#120a1c]/95 backdrop-blur-md border-purple-500/30 shadow-purple-900/10 hover:shadow-purple-900/30"
                  : "bg-gradient-to-br from-white to-[#f7f7fa] backdrop-blur-md border-purple-200/80 shadow-purple-100/30 hover:shadow-purple-200/50"
              } rounded-xl border transition-all duration-300 floating-element shadow-xl overflow-hidden`}
            >
              <div className="p-5 sm:p-6 flex flex-col h-full min-h-[120px]">
                <div className="flex items-center mb-4">
                  <div className={`w-9 h-9 flex items-center justify-center ${
                    isDark ? "bg-purple-500/30" : "bg-purple-100"
                  } rounded-lg mr-3`}>
                    <span className={isDark ? "text-purple-300" : "text-purple-600" }>◆</span>
                  </div>
                  <h3 className={`${isDark ? "text-white" : "text-gray-800"} font-semibold text-base sm:text-lg tracking-tight`}>
                    {feature.title}
                  </h3>
                </div>
                <p className={`${isDark ? "text-white/90" : "text-gray-700"} text-sm sm:text-base leading-relaxed`}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full flex justify-center mb-8 sm:mb-10 md:mb-12 mt-2 sm:mt-4 px-2 sm:px-4">
          {/* Terminal Container with Responsive Width */}
          <div
            className="relative w-full max-w-3xl mx-auto"
            style={{ maxWidth: "98%" }}
          >
            {/* Enhanced Glow Effect */}
            <div className={`absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 rounded-lg blur ${
              isDark ? "opacity-40" : "opacity-20"
            }`}></div>

            {/* Terminal Window */}
            <div
              className={`relative ${
                isDark ? "bg-[#050210] border-purple-500/30" : "bg-gray-900 border-purple-300/40"
              } border rounded-lg shadow-2xl`}
              style={{
                width: "100%",
                borderRadius: "14px",
                overflow: "hidden",
              }}
            >
              {/* Terminal Header */}
              <div
                className={`h-7 sm:h-8 md:h-9 flex items-center px-3 sm:px-4 ${
                  isDark ? "bg-[#0a0812]/90" : "bg-gray-800"
                }`}
                style={{
                  borderTopLeftRadius: "14px",
                  borderTopRightRadius: "14px",
                }}
              >
                <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 rounded-full bg-red-500 mr-2 sm:mr-2.5"></div>
                <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 rounded-full bg-yellow-500 mr-2 sm:mr-2.5"></div>
                <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 rounded-full bg-green-500"></div>
                <div className="ml-3 text-xs sm:text-sm text-gray-300 font-medium">
                  LazyStack-terminal
                </div>
              </div>

              {/* Terminal Content */}
              <div
                ref={dashboardCodeRef}
                className={`${isDark ? "bg-[#050210]" : "bg-gray-900"} h-[18rem] sm:h-[20rem] md:h-[22rem] lg:h-[22rem] relative`}
                style={{
                  width: "100%",
                  borderBottomLeftRadius: "14px",
                  borderBottomRightRadius: "14px",
                }}
              >
                <div
                  className="absolute inset-0 font-mono text-xs sm:text-sm md:text-base lg:text-lg p-4 sm:p-5 md:p-6 overflow-hidden text-left"
                  style={{
                    borderBottomLeftRadius: "14px",
                    borderBottomRightRadius: "14px",
                  }}
                >
                  <div className="flex justify-start">
                    <span className="text-purple-400 flex-shrink-0 mr-2.5">
                      $
                    </span>
                    <div className="text-gray-300 whitespace-pre-wrap text-left break-words w-full overflow-hidden">
                      {typedText}
                      {isTyping && (
                        <span className="animate-blink inline-block w-2 sm:w-2.5 md:w-3 h-4 sm:h-5 md:h-6 bg-purple-400 align-middle ml-0.5"></span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced floating elements */}
            <div className={`absolute -top-6 sm:-top-8 md:-top-10 -right-6 sm:-right-8 md:-right-10 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 blur-md ${
              isDark ? "bg-purple-500/25" : "bg-purple-400/20"
            } rounded-full animate-pulse-slow`}></div>
            <div className={`absolute -bottom-8 sm:-bottom-10 md:-bottom-12 -left-8 sm:-left-10 md:-left-12 w-20 sm:w-24 md:w-28 h-20 sm:h-24 md:h-28 blur-md ${
              isDark ? "bg-blue-500/25" : "bg-blue-400/20"
            } rounded-full animate-pulse-slow`}></div>
          </div>
        </div>
      </div>

      {/* Additional decorative elements */}
      <div
        ref={decorationsRef}
        className="absolute inset-0 pointer-events-none z-[1]"
      >
        <div className={`absolute top-1/4 left-[5%] w-1 h-20 bg-gradient-to-b ${
          isDark ? "from-purple-500/40" : "from-purple-400/30"
        } to-transparent rounded-full blur-sm`}></div>
        <div className={`absolute top-1/3 right-[8%] w-1 h-32 bg-gradient-to-b ${
          isDark ? "from-blue-500/40" : "from-blue-400/30"
        } to-transparent rounded-full blur-sm`}></div>
        <div className={`absolute bottom-1/4 left-[12%] w-1 h-24 bg-gradient-to-t ${
          isDark ? "from-purple-500/40" : "from-purple-400/30"
        } to-transparent rounded-full blur-sm`}></div>
        <div className={`absolute bottom-1/3 right-[15%] w-1 h-16 bg-gradient-to-t ${
          isDark ? "from-blue-500/40" : "from-blue-400/30"
        } to-transparent rounded-full blur-sm`}></div>
      </div>
    </section>
  );
};

export default Jumbotron;
