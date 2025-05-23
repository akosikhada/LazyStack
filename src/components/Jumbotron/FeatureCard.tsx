import React from "react";
import { FeatureItem } from "../../types/jumbotron-types";

interface FeatureCardProps {
  feature: FeatureItem;
  isDark: boolean;
}

/**
 * A card component for displaying feature information
 */
export function FeatureCard({ feature, isDark }: FeatureCardProps) {
  return (
    <div
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
            <span className={isDark ? "text-purple-300" : "text-purple-600"}>
              {feature.icon || "◆"}
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
  );
}
