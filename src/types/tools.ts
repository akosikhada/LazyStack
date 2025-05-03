import { LucideIcon } from "lucide-react";

// Base tool interface used in data.ts
export interface ToolData {
  title: string;
  description: string;
  icon: string | "Github" | "Database";
  category: string;
  benefits: string[];
  highlight: string;
  link?: string;
}

// Tool interface for the ToolCard component
export interface ToolCardProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  imageIcon?: string;
  category?: string;
  tryNowLink?: string;
  index?: number;
  highlight?: string;
  benefits?: string[];
}

// Tool interface for ToolCategories
export interface Tool {
  title: string;
  description: string;
  icon?: LucideIcon;
  imageIcon?: string;
  category?: string;
  highlight?: string;
  tryNowLink?: string;
  benefits?: string[];
  link?: string;
}

// Props for ToolCategories component
export interface ToolCategoriesProps {
  title: string;
  description: string;
  tools: Tool[];
  bgColor?: string;
  showViewMore?: boolean;
  initialVisibleCount?: number;
}
