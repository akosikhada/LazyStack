import React from "react";

interface CategoryBadgeProps {
  category: string;
  theme: string | undefined;
}

/**
 * Displays the category badge for a tool
 */
export function CategoryBadge({ category, theme }: CategoryBadgeProps) {
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide ${
        theme === "dark"
          ? "bg-[#1a1a1f]/70 text-gray-300"
          : "bg-gray-50 text-gray-600"
      }`}
    >
      {category}
    </span>
  );
}
