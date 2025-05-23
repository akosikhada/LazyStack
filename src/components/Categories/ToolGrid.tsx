import React from "react";
import ToolCard from "../Cards/ToolCard";
import { Tool } from "@/types/tool-types";

interface ToolGridProps {
  tools: Tool[];
  initialToolsLoaded: boolean;
}

/**
 * Grid layout component for displaying tool cards
 */
export function ToolGrid({ tools, initialToolsLoaded }: ToolGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-2 lg:gap-7 xl:grid-cols-3 xl:gap-8">
      {initialToolsLoaded &&
        tools.map((tool, index) => (
          <div key={`${tool.title}-${index}`} className="lazy-load-wrapper">
            <ToolCard
              title={tool.title}
              description={tool.description}
              icon={tool.icon}
              imageIcon={tool.imageIcon}
              category={tool.category}
              highlight={tool.highlight}
              tryNowLink={tool.link || tool.tryNowLink || "#"}
              benefits={tool.benefits}
              index={index}
            />
          </div>
        ))}
    </div>
  );
}
