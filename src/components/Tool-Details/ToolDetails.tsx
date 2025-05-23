"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Tool } from "@/types/tool-types";
import { useTheme } from "next-themes";

// Import modularized components
import { ToolHeader } from "./ToolHeader";
import { ToolDescription } from "./ToolDescription";
import { ToolBenefits } from "./ToolBenefits";
import { ToolFooter } from "./ToolFooter";

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
            <ToolHeader
              title={tool.title}
              imageIcon={tool.imageIcon}
              icon={tool.icon}
              category={tool.category}
              highlight={tool.highlight}
              theme={theme}
            />
          </DialogHeader>

          {/* Content section with description and benefits */}
          <div className="px-4 sm:px-6">
            {/* Tool description */}
            <ToolDescription description={tool.description} theme={theme} />

            {/* Key benefits section */}
            <ToolBenefits benefits={tool.benefits || []} theme={theme} />
          </div>

          {/* Footer section */}
          <ToolFooter
            category={tool.category}
            tryNowLink={tool.tryNowLink}
            link={tool.link}
            theme={theme}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ToolDetails;
