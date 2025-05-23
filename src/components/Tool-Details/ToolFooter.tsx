import React from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { ArrowRight } from "lucide-react";

interface ToolFooterProps {
  category?: string;
  tryNowLink?: string;
  link?: string;
  theme: string | undefined;
}

/**
 * Footer component for the tool details dialog
 */
export function ToolFooter({
  category = "development",
  tryNowLink,
  link,
  theme,
}: ToolFooterProps) {
  return (
    <DialogFooter
      className={`border-t px-4 py-3 sm:px-6 sm:py-4 ${
        theme === "dark"
          ? "border-[#1a1a1f]/80 bg-[#15091d]"
          : "border-gray-100 bg-gray-50"
      } flex w-full flex-row items-center justify-between sm:flex-row sm:justify-between`}
    >
      <div
        className={`text-[10px] sm:text-xs ${
          theme === "dark" ? "text-gray-400" : "text-gray-500"
        } `}
      >
        Advanced tool for {category?.toLowerCase() || "N/A"}
      </div>
      {(tryNowLink || link) && (
        <Button
          className={`group h-8 rounded-md px-3 text-xs sm:h-9 sm:px-4 ${
            theme === "dark"
              ? "bg-[#6a3fcc] text-white hover:bg-[#5a2fd0]"
              : "bg-purple-600 text-white hover:bg-purple-700"
          } `}
          onClick={() => window.open(tryNowLink || link, "_blank")}
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
  );
}
