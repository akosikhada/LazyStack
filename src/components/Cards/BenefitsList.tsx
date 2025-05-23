import React from "react";

interface BenefitsListProps {
  benefits: string[];
  theme: string | undefined;
}

/**
 * Displays a list of benefit tags for a tool
 */
export function BenefitsList({ benefits, theme }: BenefitsListProps) {
  return (
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
  );
}
