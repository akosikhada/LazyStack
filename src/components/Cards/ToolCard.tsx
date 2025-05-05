"use client";

import { Button } from "../ui/button";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { ToolCardProps } from "@/types/tools";
import { useTheme } from "next-themes";
import { ArrowRight } from "lucide-react";
import ToolDetails from "../Tool-Details/ToolDetails";

export default function ToolCard({
  title,
  description,
  icon: Icon,
  imageIcon,
  category = "Development",
  tryNowLink = "#",
  index = 0,
  highlight = "Popular Choice",
  benefits = ["Fast", "Reliable", "Updated"],
}: ToolCardProps) {
  const { theme } = useTheme();
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const [showDetails, setShowDetails] = useState(false);

  // GSAP animations
  useEffect(() => {
    // Initial state
    gsap.set(cardRef.current, {
      opacity: 0,
      y: 10,
    });

    // Animate card entrance
    gsap.to(cardRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      delay: 0.1 + index * 0.08, // Slightly faster stagger
      ease: "power2.out",
    });

    // Create animation context for hover effects
    const ctx = gsap.context(() => {
      // Setup hover animations
      const hoverTl = gsap.timeline({ paused: true });

      hoverTl
        .to(gradientRef.current, {
          scaleX: 1,
          duration: 0.3,
          ease: "power2.out",
        })
        .to(
          iconRef.current,
          {
            scale: 1.05, // More subtle scale
            boxShadow: "0 4px 12px rgba(138, 63, 252, 0.15)",
            duration: 0.3,
            ease: "back.out(1.5)",
          },
          0,
        )
        .to(
          contentRef.current,
          {
            x: 1, // More subtle movement
            duration: 0.3,
            ease: "power2.out",
          },
          0,
        );

      // Add hover event listeners
      cardRef.current?.addEventListener("mouseenter", () => hoverTl.play());
      cardRef.current?.addEventListener("mouseleave", () => hoverTl.reverse());

      // Clean up
      return () => {
        cardRef.current?.removeEventListener("mouseenter", () =>
          hoverTl.play(),
        );
        cardRef.current?.removeEventListener("mouseleave", () =>
          hoverTl.reverse(),
        );
      };
    }, cardRef);

    // Cleanup
    return () => ctx.revert();
  }, [index]);

  return (
    <>
      <div
        ref={cardRef}
        className={`group flex h-full flex-col overflow-hidden rounded-xl border transition-all duration-300 ${
          theme === "dark"
            ? "border-[#1a1a1f]/80 bg-[#13091f] hover:border-[#2a2a35]"
            : "border-gray-100 bg-white shadow-sm hover:shadow-md"
        }`}
        style={{ minHeight: "380px" }} // Slightly reduced minimum height
      >
        {/* Card header with accent gradient */}
        <div
          ref={gradientRef}
          className="h-0.5 origin-left scale-x-0 transform bg-gradient-to-r from-[#8a3ffc] to-[#6023c0]"
        ></div>

        <div className="flex h-full flex-col p-5">
          {/* Top section with icon and category */}
          <div className="mb-5 flex items-start justify-between">
            <div
              ref={iconRef}
              className={`relative flex h-[50px] w-[50px] items-center justify-center overflow-hidden rounded-full transition-all duration-300 ${
                theme === "dark"
                  ? "bg-[#1a1a1f]/70 text-[#8a3ffc]"
                  : "bg-purple-50 text-purple-600"
              }`}
            >
              {imageIcon ? (
                <Image
                  src={imageIcon}
                  alt={title}
                  width={150}
                  height={150}
                  loading="lazy"
                  className="absolute inset-0 m-auto object-cover"
                  onError={(e) => {
                    // Fallback for image loading errors
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/fallback-icon.png";
                  }}
                />
              ) : Icon ? (
                <Icon size={22} className="absolute inset-0 m-auto" />
              ) : null}
            </div>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide ${
                theme === "dark"
                  ? "bg-[#1a1a1f]/70 text-gray-300"
                  : "bg-gray-50 text-gray-600"
              }`}
            >
              {category}
            </span>
          </div>

          <div ref={contentRef} className="flex flex-grow flex-col">
            {/* Title with improved typography */}
            <h3
              className={`mb-3 text-lg font-semibold leading-tight tracking-tight transition-colors duration-300 group-hover:text-[#a56eff] ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}
            >
              {title}
            </h3>

            {/* Description with improved typography */}
            <div className="mb-5">
              <p
                className={`line-clamp-3 text-sm leading-relaxed ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {description}
              </p>
            </div>

            {/* Feature indicators with improved design */}
            <div className="mb-6 flex flex-wrap gap-2">
              {benefits.map((benefit, i) => (
                <div
                  key={i}
                  className={`flex items-center space-x-1 rounded-md px-2 py-0.5 text-xs font-medium transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-[#0a0412]/70 text-purple-300"
                      : "bg-purple-50/80 text-purple-700"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 text-purple-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* Bottom content */}
            <div className="mt-auto flex items-center justify-between">
              <div className="flex items-center">
                <span
                  className={`rounded-md border-l-2 border-purple-500 px-2.5 py-1 text-xs font-medium ${
                    theme === "dark"
                      ? "bg-purple-900/20 text-purple-300"
                      : "bg-purple-50 text-purple-700"
                  }`}
                >
                  {highlight}
                </span>
              </div>
              <Button
                className={`group h-8 rounded-md px-3 text-xs font-medium transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-[#1a1a1f] text-white hover:bg-[#2a2a35]"
                    : "bg-purple-600 text-white hover:bg-purple-700"
                }`}
                onClick={() => setShowDetails(true)}
              >
                <span className="flex items-center gap-1.5">
                  View Details
                  <ArrowRight
                    size={14}
                    className="transform transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tool Details Modal */}
      <ToolDetails
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        tool={{
          title,
          description,
          icon: Icon,
          imageIcon,
          category,
          tryNowLink,
          highlight,
          benefits,
        }}
      />
    </>
  );
}
