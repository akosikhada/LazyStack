import React from "react";
import Image from "next/image";
import { DialogTitle } from "@/components/ui/dialog";
import { LucideIcon } from "lucide-react";

interface ToolHeaderProps {
  title: string;
  imageIcon?: string;
  icon?: LucideIcon;
  category?: string;
  highlight?: string;
  theme: string | undefined;
}

/**
 * Header component for the tool details dialog
 */
export function ToolHeader({
  title,
  imageIcon,
  icon: Icon,
  category = "Development",
  highlight = "Featured",
  theme,
}: ToolHeaderProps) {
  return (
    <>
      {/* Tool logo */}
      <div className="mb-4 flex flex-col items-center sm:mb-5">
        <div
          className={`relative mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full sm:mb-5 sm:h-28 sm:w-28 ${
            theme === "dark" ? "bg-[#1a1a1f]" : "bg-gray-100"
          } p-1 shadow-sm sm:p-2`}
        >
          {imageIcon ? (
            <Image
              src={imageIcon}
              alt={title}
              width={150}
              height={150}
              className="h-full w-full rounded-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/images/fallback-icon.png";
              }}
            />
          ) : Icon ? (
            <Icon
              size={60}
              className={`${
                theme === "dark" ? "text-[#8a3ffc]" : "text-purple-600"
              }`}
            />
          ) : null}
        </div>

        {/* Title */}
        <DialogTitle
          className={`mb-1 text-2xl font-semibold tracking-tight sm:text-3xl ${
            theme === "dark" ? "text-white" : "text-gray-800"
          } `}
        >
          {title}
        </DialogTitle>
      </div>

      {/* Category and highlight tags */}
      <div className="mb-3 flex flex-wrap items-center justify-center gap-2 sm:mb-4">
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium sm:px-3 ${
            theme === "dark"
              ? "bg-[#1a1a1f] text-gray-300"
              : "bg-gray-100 text-gray-600"
          } `}
        >
          {category}
        </span>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium sm:px-3 ${
            theme === "dark"
              ? "bg-[#241b2d] text-purple-300"
              : "bg-purple-100 text-purple-700"
          } `}
        >
          {highlight}
        </span>
      </div>
    </>
  );
}
