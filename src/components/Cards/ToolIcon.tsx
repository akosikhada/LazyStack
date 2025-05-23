import React from "react";
import Image from "next/image";
import { LucideIcon } from "lucide-react";

interface ToolIconProps {
  Icon?: LucideIcon;
  imageIcon?: string;
  title: string;
  theme: string | undefined;
  iconRef: React.RefObject<HTMLDivElement>;
}

/**
 * Displays either an image icon or Lucide icon for a tool
 */
export function ToolIcon({
  Icon,
  imageIcon,
  title,
  theme,
  iconRef,
}: ToolIconProps) {
  return (
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
  );
}
