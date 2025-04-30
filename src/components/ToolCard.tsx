"use client";

import { Button } from "./ui/button";
import { LucideIcon } from "lucide-react";
import { useRef, useEffect } from "react";
import gsap from "gsap";

interface ToolCardProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  imageIcon?: string;
  category?: string;
  tryNowLink?: string;
  index?: number;
  highlight?: string;
}

export default function ToolCard({
  title,
  description,
  icon: Icon,
  imageIcon,
  category = "Development",
  tryNowLink = "#",
  index = 0,
  highlight = "Popular Choice",
}: ToolCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  
  // GSAP animations
  useEffect(() => {
    // Initial state
    gsap.set(cardRef.current, { 
      opacity: 0,
      x: -10
    });
    
    // Animate card entrance
    gsap.to(cardRef.current, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      delay: 0.1 + (index * 0.1), // Stagger based on index
      ease: "power3.out"
    });

    // Create animation context for hover effects
    const ctx = gsap.context(() => {
      // Setup hover animations
      const hoverTl = gsap.timeline({ paused: true });
      
      hoverTl
        .to(gradientRef.current, {
          scaleX: 1,
          duration: 0.4,
          ease: "power2.out"
        })
        .to(iconRef.current, {
          scale: 1.1,
          boxShadow: "0 4px 12px rgba(138, 63, 252, 0.2)",
          duration: 0.4,
          ease: "back.out(1.7)"
        }, 0)
        .to(contentRef.current, {
          x: 2,
          duration: 0.4,
          ease: "power2.out"
        }, 0);
        
      // Add hover event listeners
      cardRef.current?.addEventListener("mouseenter", () => hoverTl.play());
      cardRef.current?.addEventListener("mouseleave", () => hoverTl.reverse());
      
      // Clean up
      return () => {
        cardRef.current?.removeEventListener("mouseenter", () => hoverTl.play());
        cardRef.current?.removeEventListener("mouseleave", () => hoverTl.reverse());
      };
    }, cardRef);
    
    // Cleanup
    return () => ctx.revert();
  }, [index]);
  
  return (
    <div 
      ref={cardRef} 
      className="group bg-[#13091f] rounded-lg overflow-hidden flex flex-col h-full border border-[#1a1a1f]"
      style={{ minHeight: '400px' }} // Ensure consistent minimum height
    >
      {/* Card header with accent gradient */}
      <div 
        ref={gradientRef} 
        className="h-1 bg-gradient-to-r from-[#8a3ffc] to-[#6023c0] transform origin-left scale-x-0"
      ></div>
      
      <div className="p-6 flex flex-col h-full">
        {/* Top section with consistent height */}
        <div className="flex justify-between items-start mb-6 h-12">
          <div 
            ref={iconRef}
            className="rounded-full bg-[#1a1a1f] text-[#8a3ffc] flex items-center justify-center w-12 h-12 overflow-hidden relative p-0"
          >
            {imageIcon ? (
              <img src={imageIcon} alt={title} className="w-12 h-12 object-cover absolute inset-0 m-auto" />
            ) : Icon ? (
              <Icon size={24} className="absolute inset-0 m-auto" />
            ) : null}
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-[#1a1a1f] text-white">
            {category}
          </span>
        </div>
        
        <div ref={contentRef} className="flex flex-col flex-grow">
          {/* Title with fixed height */}
          <h3 className="text-xl font-semibold text-white h-14 mb-2 group-hover:text-[#a56eff] transition-colors duration-300 flex items-start">{title}</h3>
          
          {/* Description with fixed height */}
          <div className="h-20 mb-4">
            <p className="text-gray-400 line-clamp-3">{description}</p>
          </div>
          
          {/* Feature indicators */}
          <div className="flex flex-wrap gap-3 mb-6 h-8">
            <div className="flex items-center space-x-1 px-3 py-1 rounded-md bg-[#0a0412] text-purple-300 border-b border-purple-500/50 transition-all duration-300 group hover:text-purple-200 hover:border-purple-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-purple-400 group-hover:text-purple-300" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-medium">Fast</span>
            </div>
            
            <div className="flex items-center space-x-1 px-3 py-1 rounded-md bg-[#0a0412] text-purple-300 border-b border-purple-500/50 transition-all duration-300 group hover:text-purple-200 hover:border-purple-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-purple-400 group-hover:text-purple-300" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-medium">Reliable</span>
            </div>
            
            <div className="flex items-center space-x-1 px-3 py-1 rounded-md bg-[#0a0412] text-purple-300 border-b border-purple-500/50 transition-all duration-300 group hover:text-purple-200 hover:border-purple-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-purple-400 group-hover:text-purple-300" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-medium">Updated</span>
            </div>
          </div>
          
          {/* Fixed position for bottom content */}
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center">
              <span className="px-3 py-1 bg-purple-900/30 text-purple-300 rounded-md text-xs font-medium border-l-2 border-purple-500">
                {highlight}
              </span>
            </div>
            <Button
              className="text-white bg-[#1a1a1f] hover:bg-[#8a3ffc] px-4 py-2 h-auto rounded-md text-sm transition-colors duration-300"
              onClick={() => window.open(tryNowLink, "_blank")}
            >
              Try Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
