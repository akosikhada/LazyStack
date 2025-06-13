"use client";

import { useState } from "react";
import { ToolCardProps } from "@/types/tool-types";
import { useTheme } from "next-themes";
import ToolDetails from "../Tool-Details/ToolDetails";

// Import modularized components
import { ToolIcon } from "./ToolIcon";
import { CategoryBadge } from "./CategoryBadge";
import { BenefitsList } from "./BenefitsList";
import { CardFooter } from "./CardFooter";
import { useToolCardAnimation } from "@/hooks/useToolCardAnimation";

export default function ToolCard({
  title,
  description,
  icon,
  imageIcon,
  category = "Development",
  tryNowLink = "#",
  index = 0,
  highlight = "Popular Choice",
  benefits = ["Fast", "Reliable", "Updated"],
}: ToolCardProps) {
  const { theme } = useTheme();
  const [showDetails, setShowDetails] = useState(false);

  // Use custom animation hook
  const { cardRef, iconRef, contentRef, gradientRef } =
    useToolCardAnimation(index);

  return (
    <>
      <div
        ref={cardRef}
        className={`group relative flex h-full w-full flex-col overflow-hidden rounded-xl border transition-all duration-300 ${
          theme === "dark"
            ? "border-[#1a1a1f]/80 bg-gradient-to-b from-[#13091f] to-[#100818] backdrop-blur-sm hover:border-[#2a2a35] hover:shadow-lg hover:shadow-purple-900/10"
            : "border-gray-100 bg-gradient-to-b from-white to-gray-50/50 shadow-sm hover:shadow-md hover:shadow-purple-100"
        }`}
        style={{ height: "500px", maxWidth: "100%" }} // Increased fixed height
      >
        {/* Card header accent */}
        <div
          ref={gradientRef}
          className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transform bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600"
        ></div>

        {/* Top curved accent for depth */}
        <div
          className={`absolute -top-6 left-0 right-0 h-10 rounded-[50%] opacity-10 ${
            theme === "dark" ? "bg-purple-500" : "bg-purple-300"
          }`}
        ></div>

        <div className="relative z-10 flex h-full flex-col p-6">
          {/* Top section with icon and category */}
          <div className="mb-5 flex items-start justify-between">
            <ToolIcon
              Icon={icon}
              imageIcon={imageIcon}
              title={title}
              theme={theme}
              iconRef={iconRef}
            />
            <CategoryBadge category={category} theme={theme} />
          </div>

          <div ref={contentRef} className="flex flex-grow flex-col">
            {/* Title with improved typography */}
            <h3
              className={`mb-3 text-xl font-semibold leading-tight tracking-tight transition-colors duration-300 group-hover:text-purple-500 ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}
            >
              {title}
            </h3>

            {/* Description with equal height and fade-out effect */}
            <div className="mb-5">
              <div
                className={`relative h-24 overflow-hidden ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <p className="text-sm leading-relaxed">{description}</p>
                {/* Gradient fade-out effect for long descriptions */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t ${
                    theme === "dark"
                      ? "from-[#13091f] to-transparent"
                      : "from-gray-50/90 to-transparent"
                  }`}
                ></div>
              </div>
            </div>

            {/* Feature indicators - with fixed height container */}
            <div className="flex flex-grow flex-col">
              <BenefitsList benefits={benefits} theme={theme} />
              <div className="flex-grow"></div>

              {/* Bottom content - now always at bottom */}
              <CardFooter
                highlight={highlight}
                theme={theme}
                onViewDetails={() => setShowDetails(true)}
              />
            </div>
          </div>
        </div>

        {/* Subtle card glow effect */}
        <div
          className={`absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
            theme === "dark"
              ? "bg-gradient-to-tr from-purple-900/5 via-transparent to-transparent"
              : "bg-gradient-to-tr from-purple-100/30 via-transparent to-transparent"
          }`}
        ></div>
      </div>

      {/* Tool Details Modal */}
      <ToolDetails
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        tool={{
          title,
          description,
          icon,
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
