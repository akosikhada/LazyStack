import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CardFooterProps {
  highlight: string;
  theme: string | undefined;
  onViewDetails: () => void;
}

/**
 * Footer component for Tool Cards with highlight badge and action button
 */
export function CardFooter({
  highlight,
  theme,
  onViewDetails,
}: CardFooterProps) {
  return (
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
        onClick={onViewDetails}
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
  );
}
