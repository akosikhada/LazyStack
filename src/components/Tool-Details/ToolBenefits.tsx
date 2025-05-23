import React from "react";

interface ToolBenefitsProps {
  benefits: string[];
  theme: string | undefined;
}

/**
 * Benefits component for the tool details dialog
 */
export function ToolBenefits({ benefits, theme }: ToolBenefitsProps) {
  return (
    <div className="mb-6">
      <h3
        className={`mb-3 text-xs font-medium sm:mb-4 sm:text-sm ${
          theme === "dark" ? "text-gray-300" : "text-gray-700"
        } `}
      >
        Key Benefits
      </h3>
      <div className="grid grid-cols-1 gap-2 sm:gap-3">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 rounded-lg px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3 ${
              theme === "dark" ? "bg-[#1a1a1f]/40" : "bg-gray-50"
            } `}
          >
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-full sm:h-7 sm:w-7 ${
                theme === "dark"
                  ? "bg-[#241b2d] text-purple-400"
                  : "bg-purple-100 text-purple-700"
              } `}
            >
              {index + 1}
            </div>
            <span
              className={`text-xs font-medium sm:text-sm ${
                theme === "dark" ? "text-white" : "text-gray-700"
              } `}
            >
              {benefit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
