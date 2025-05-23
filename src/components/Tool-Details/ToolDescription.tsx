import React from "react";
import { DialogDescription } from "@/components/ui/dialog";

interface ToolDescriptionProps {
  description: string;
  theme: string | undefined;
}

/**
 * Description component for the tool details dialog
 */
export function ToolDescription({ description, theme }: ToolDescriptionProps) {
  return (
    <DialogDescription
      className={`mb-4 text-justify text-sm leading-relaxed sm:mb-6 sm:text-base ${
        theme === "dark" ? "text-gray-300" : "text-gray-600"
      } `}
    >
      {description}
    </DialogDescription>
  );
}
