"use client";

import HeroSection from "@/components/Jumbotron/Jumbotron";
import ToolCategorySection from "@/components/Categories/ToolCategories";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer/Footer";
import { Database, Github } from "lucide-react";
import { developmentTools, designTools, aiTools } from "@/constants/data";
import { Tool, ToolData } from "@/types/tools";
import { useTheme } from "next-themes";

export default function Page() {
  const { theme } = useTheme();

  // Map data to match the Tool interface by converting icon strings to imageIcon
  // This preserves the original order from data.ts
  const mappedDevTools: Tool[] = developmentTools.map((tool: ToolData) => ({
    title: tool.title,
    description: tool.description,
    imageIcon: typeof tool.icon === "string" ? tool.icon : undefined, // Use icon as imageIcon path
    category: tool.category,
    benefits: tool.benefits,
    highlight: tool.highlight,
    tryNowLink: tool.link,
  }));

  const mappedDesignTools: Tool[] = designTools.map((tool: ToolData) => ({
    title: tool.title,
    description: tool.description,
    imageIcon: typeof tool.icon === "string" ? tool.icon : undefined, // Use icon as imageIcon path
    category: tool.category,
    benefits: tool.benefits,
    highlight: tool.highlight,
    tryNowLink: tool.link,
  }));

  // Map aiTools which might have Lucide icons instead of string paths
  const mappedAiTools: Tool[] = aiTools.map((tool: ToolData) => {
    return {
      title: tool.title,
      description: tool.description,
      imageIcon: typeof tool.icon === "string" ? tool.icon : undefined,
      category: tool.category,
      benefits: tool.benefits,
      highlight: tool.highlight,
      tryNowLink: tool.link,
    };
  });

  // Determine section background colors based on theme
  const designBgColor = theme === "dark" ? "#0c0914" : "#f0f0f7";
  const aiBgColor = theme === "dark" ? "#080810" : "#e8e8f0";

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div id="hero">
        <HeroSection />
      </div>

      {/* Development Tools Section */}
      <div id="development-tools">
        <ToolCategorySection
          title="AI Development Tools"
          description="Discover cutting-edge AI-powered development tools that enhance coding productivity and enable new capabilities."
          tools={mappedDevTools}
          showViewMore={true}
          initialVisibleCount={6}
        />
      </div>

      {/* Design Tools Section */}
      <div id="design-tools">
        <ToolCategorySection
          title="Design & UI Tools"
          description="Explore innovative design tools that streamline creative workflows and empower designers with AI assistance."
          tools={mappedDesignTools}
          bgColor={designBgColor}
          showViewMore={true}
          initialVisibleCount={6}
        />
      </div>

      {/* Infrastructure Tools Section */}
      <div id="ai-tools">
        <ToolCategorySection
          title="AI Tools"
          description="Cutting-edge AI tools that revolutionize development workflows, enhance operational efficiency, and power next-generation applications."
          tools={mappedAiTools}
          bgColor={aiBgColor}
          showViewMore={true}
          initialVisibleCount={6}
        />
      </div>

      <Footer />
    </main>
  );
}
