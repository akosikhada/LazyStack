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

            {/* Feature indicators */}
            <BenefitsList benefits={benefits} theme={theme} />

            {/* Bottom content */}
            <CardFooter
              highlight={highlight}
              theme={theme}
              onViewDetails={() => setShowDetails(true)}
            />
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
