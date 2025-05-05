"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Tool } from "@/types/tools";
import { useTheme } from "next-themes";
import { ArrowRight, ExternalLink } from "lucide-react";

interface ToolDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  tool: Tool | null;
}

const ToolDetails = ({ isOpen, onClose, tool }: ToolDetailsProps) => {
  const { theme } = useTheme();

  if (!tool) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`max-h-[95vh] w-[95vw] overflow-hidden border-none p-0 sm:max-h-none sm:w-auto sm:max-w-[625px] ${theme === "dark" ? "bg-[#13091f]" : "bg-white"} `}
      >
        <div className="relative max-h-[95vh] overflow-y-auto sm:max-h-none">
          {/* Header section */}
          <DialogHeader className="space-y-0 p-4 text-center sm:p-6">
            {/* Tool logo */}
            <div className="mb-4 flex flex-col items-center sm:mb-5">
              <div
                className={`relative mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full sm:mb-5 sm:h-28 sm:w-28 ${theme === "dark" ? "bg-[#1a1a1f]" : "bg-gray-100"} p-1 shadow-sm sm:p-2`}
              >
                {tool.imageIcon ? (
                  <Image
                    src={tool.imageIcon}
                    alt={tool.title}
                    width={150}
                    height={150}
                    className="h-full w-full rounded-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/images/fallback-icon.png";
                    }}
                  />
                ) : tool.icon ? (
                  <tool.icon
                    size={60}
                    className={`${
                      theme === "dark" ? "text-[#8a3ffc]" : "text-purple-600"
                    }`}
                  />
                ) : null}
              </div>

              {/* Title */}
              <DialogTitle
                className={`mb-1 text-2xl font-semibold tracking-tight sm:text-3xl ${theme === "dark" ? "text-white" : "text-gray-800"} `}
              >
                {tool.title}
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
                {tool.category || "Development"}
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium sm:px-3 ${
                  theme === "dark"
                    ? "bg-[#241b2d] text-purple-300"
                    : "bg-purple-100 text-purple-700"
                } `}
              >
                {tool.highlight || "Featured"}
              </span>
            </div>
          </DialogHeader>

          {/* Content section with description and benefits */}
          <div className="px-4 sm:px-6">
            {/* Tool description */}
            <DialogDescription
              className={`mb-4 text-justify text-sm leading-relaxed sm:mb-6 sm:text-base ${theme === "dark" ? "text-gray-300" : "text-gray-600"} `}
            >
              {tool.description}
            </DialogDescription>

            {/* Key benefits section */}
            <div className="mb-6">
              <h3
                className={`mb-3 text-xs font-medium sm:mb-4 sm:text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"} `}
              >
                Key Benefits
              </h3>
              <div className="grid grid-cols-1 gap-2 sm:gap-3">
                {(tool.benefits || []).map((benefit, index) => (
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
                      className={`text-xs font-medium sm:text-sm ${theme === "dark" ? "text-white" : "text-gray-700"} `}
                    >
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer section */}
          <DialogFooter
            className={`border-t px-4 py-3 sm:px-6 sm:py-4 ${
              theme === "dark"
                ? "border-[#1a1a1f]/80 bg-[#15091d]"
                : "border-gray-100 bg-gray-50"
            } flex w-full flex-row items-center justify-between sm:flex-row sm:justify-between`}
          >
            <div
              className={`text-[10px] sm:text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"} `}
            >
              Advanced tool for {tool.category?.toLowerCase() || "N/A"}
            </div>
            {(tool.tryNowLink || tool.link) && (
              <Button
                className={`group h-8 rounded-md px-3 text-xs sm:h-9 sm:px-4 ${
                  theme === "dark"
                    ? "bg-[#6a3fcc] text-white hover:bg-[#5a2fd0]"
                    : "bg-purple-600 text-white hover:bg-purple-700"
                } `}
                onClick={() =>
                  window.open(tool.tryNowLink || tool.link, "_blank")
                }
              >
                <span className="flex items-center gap-1.5 sm:gap-2">
                  Visit Website
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 sm:h-4 sm:w-4"
                  />
                </span>
              </Button>
            )}
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ToolDetails;
