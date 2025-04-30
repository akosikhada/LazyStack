"use client";

import HeroSection from "@/components/HeroSection";
import ToolCategorySection from "@/components/ToolCategorySection";
import Navbar from "@/components/Navbar";
import {
  Database,
  Github,
  LayoutGrid,
  Palette,
} from "lucide-react";
import Footer from "@/components/Footer";

export default function Page() {
  // AI Development Tools
  const aiTools = [
    {
      title: "Cursor AI",
      description: "Cursor lets you write code using instructions. Update entire classes or functions with a simple prompt.",
      imageIcon: "/assets/images/cursor-icon.png",
      category: "Development",
      highlight: "Smart Coding",
      tryNowLink: "https://www.cursor.com/",
    },
    {
      title: "Windsurf AI Editor",
      description: "Windsurf AI editor by Codeium is an innovative code editor powered by Context Engine and multi-file editing, designed to boost developer productivity",
      imageIcon: "/assets/images/windsurf-icon.png",
      category: "Development",
      highlight: "Top Performer",
      tryNowLink: "https://codeium.com/",
    },
    {
      title: "Trae - Ship Faster with Trae",
      description: "Trae is your ideal development partner, seamlessly balancing human & AI capabilities. This dynamic collaboration ensures each task is handled by the most suitable agent, maximizing your productivity.",
      imageIcon: "/assets/images/trae-icon.png",
      category: "Development",
      highlight: "Balanced Workflow",
      tryNowLink: "https://trae.ai/",
    },
    {
      title: "Replit Agent",
      description: "Meet Replit Agent, an advanced AI making programming accessible to everyone. Build at the speed of thought and launch in minutes.",
      imageIcon: "/assets/images/replit-icon.png",
      category: "Development",
      highlight: "Quick Launch",
      tryNowLink: "https://replit.com/",
    },
    {
      title: "GitHub Copilot",
      description: "GitHub Copilot is an AI coding assistant that helps you write code faster and with less effort, allowing you to focus more energy on problem solving and collaboration.",
      imageIcon: "/assets/images/github-icon.png",
      category: "Development",
      highlight: "Team Favorite",
      tryNowLink: "https://github.com/features/copilot",
    },
    {
      title: "Tempolab AI",
      description: "Tempo is a visual editor for react that gives PMs, designers, and engineers the ability to collaborate visually on code. It offers the familiar UX of a design tool but functions like an IDE under the hood. Tempo is optimized for Vite and Tailwind",
      imageIcon: "/assets/images/tempolab-icon.png",
      category: "Development",
      highlight: "Visual Excellence",
      tryNowLink: "https://www.tempo.new/",
    },
    {
      title: "Bolt.new",
      description: "AI-powered app builder that helps developers who want to simplify the way they create web applications.",
      imageIcon: "/assets/images/bolt-icon.png",
      category: "Development",
      highlight: "Visual Excellence",
      tryNowLink: "https://bolt.new/",
    },
    // Additional AI tools (will be shown after clicking "View More")
    {
      title: "Firebase Studio",
      description: "Firebase Studio accelerates your entire development lifecycle with AI agents. Build backends, front ends, and mobile apps, all in one place.",
      imageIcon: "/assets/images/firebasestudio-icon.png", 
      category: "Development",
      highlight: "Design to Code",
      tryNowLink: "https://firebase.studio/",
    },
    {
      title: "Cline AI",
      description: "Cline AI is a multi-agent AI development tool that allows you to build, test, and deploy your code with ease.",
      imageIcon: "/assets/images/cline-icon.png",
      category: "Development",
      highlight: "Modern Terminal",
      tryNowLink: "https://cline.bot/",
    },
    {
      title: "Tabnine",
      description: "Tabnine is the AI code assistant that accelerates and simplifies software development while keeping your code private, secure, and compliant.",
      imageIcon: "/assets/images/tabnine-icon.png",
      category: "Development",
      highlight: "Multi-Language",
      tryNowLink: "https://www.tabnine.com/",
    },
    {
      title: "Devin AI",
      description: "Devin AI is the first AI software engineer that can develop complex software systems from scratch, resolve bugs, and contribute to team projects.",
      imageIcon: "/assets/images/cognition-icon.png",
      category: "Development",
      highlight: "AI Engineer",
      tryNowLink: "https://devin.ai/",
    },
    {
      title: "Qodo AI",
      description: "Qodo AI is a multi-agent AI development tool that allows you to build, test, and deploy your code with ease.",
      imageIcon: "/assets/images/qodo-icon.png",
      category: "Development",
      highlight: "AI Engineer",
      tryNowLink: "https://www.qodo.ai/",
    },
    {
      title: "Augment Code",
      description: "Augment Code is the AI-powered coding platform built for professional software engineers and large codebases. Powered by a cutting-edge context engine that understands your entire codebase, use Agent, Completions, Chat, and Next Edit to accelerate the way you code.",
      imageIcon: "/assets/images/augmented-icon.png",
      category: "Development",
      highlight: "AI Engineer",
      tryNowLink: "https://www.augmentcode.com/",
    },
  ];

  // Design & UI Tools
  const designTools = [
    {
      title: "Design System Kit",
      description: "Complete design system management solution",
      icon: LayoutGrid,
      category: "UI/UX",
      highlight: "All-in-One",
    },
    {
      title: "Component Library",
      description: "Extensive collection of reusable components",
      icon: Palette,
      category: "Development",
      highlight: "Time-Saver",
    },
    {
      title: "Asset Manager",
      description: "Organize and optimize design assets",
      icon: LayoutGrid,
      category: "Resources",
      highlight: "Well Organized",
    },
  ];

  // Programming & Development Tools
  const devTools = [
    {
      title: "Code Repository",
      description: "Version control and collaboration platform",
      icon: Github,
      category: "Development",
      highlight: "Team Essential",
    },
    {
      title: "Container Platform",
      description: "Container orchestration and deployment",
      icon: Database,
      category: "DevOps",
      highlight: "Cloud Ready",
    },
    {
      title: "Backend Framework",
      description: "Scalable server-side development toolkit",
      icon: Database,
      category: "Backend",
      highlight: "Enterprise Grade",
    },
  ];

  return (
    <div className="bg-[#050508] min-h-screen">
      <Navbar />
      <div id="hero">
        <HeroSection />
      </div>
      <div id="ai-tools">
        <ToolCategorySection
          title="AI Development Tools"
          description="Cutting-edge AI tools to enhance your development workflow"
          tools={aiTools}
          showViewMore={true}
          initialVisibleCount={6}
        />
      </div>
      <div id="design-tools">
        <ToolCategorySection
          title="Design & UI Tools"
          description="Professional design tools for creating stunning user interfaces"
          tools={designTools}
          bgColor="#0a0412"
        />
      </div>
      <div id="dev-tools">
        <ToolCategorySection
          title="Programming & Development"
          description="Essential tools for efficient programming and development"
          tools={devTools}
        />
      </div>
      <Footer />
    </div>
  );
}