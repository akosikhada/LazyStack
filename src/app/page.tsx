"use client";

import HeroSection from "@/components/Jumbotron/Jumbotron";
import ToolCategorySection from "@/components/Categories/ToolCategories";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer/Footer";
import { Database, Github } from "lucide-react";
import { developmentTools, designTools, aiTools } from "@/constants/data";
import { Tool, ToolData } from "@/types/tools";

export default function Page() {
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
    // Determine which icon to use based on the tool's icon value
    let iconComponent;
    if (tool.icon === "Github") {
      iconComponent = Github;
    } else if (tool.icon === "Database") {
      iconComponent = Database;
    }

    return {
      title: tool.title,
      description: tool.description,
      icon: iconComponent, // Use the matched Lucide icon component
      category: tool.category,
      benefits: tool.benefits,
      highlight: tool.highlight,
    };
  });

  return (
    <main className="min-h-screen">
      <Navbar />
      <div id="hero">
        <HeroSection />
      </div>

      {/* Development Tools Section */}
      <div id="dev-tools">
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
          bgColor="#0c0914"
          showViewMore={true}
          initialVisibleCount={6}
        />
      </div>

      {/* Infrastructure Tools Section */}
      <div id="ai-tools">
        <ToolCategorySection
          title="Infrastructure & Deployment"
          description="Essential tools for modern development infrastructure, deployment, and operations."
          tools={mappedAiTools}
          bgColor="#080810"
          showViewMore={false}
        />
      </div>

      <Footer />
    </main>
  );
}
