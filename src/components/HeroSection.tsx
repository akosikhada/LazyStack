"use client";

import { Button } from "./ui/button";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [prevMousePosition, setPrevMousePosition] = useState({ x: 0, y: 0 });
  const [terminalContent, setTerminalContent] = useState<string[]>([]);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  
  // References for GSAP animations
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const badgeRef = useRef(null);
  const featuresRef = useRef(null);
  const decorationsRef = useRef(null);
  const cursorTrailRef = useRef<HTMLDivElement[]>([]);
  const trailContainerRef = useRef<HTMLDivElement>(null);
  const dashboardCodeRef = useRef(null);
  const glowingLinesRef = useRef<HTMLDivElement[]>([]);
  
  useEffect(() => {
    setIsMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setPrevMousePosition(mousePosition);
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mousePosition]);
  
  useEffect(() => {
    if (!isMounted) return;
    
    // Create a timeline for staggered animations
    const tl = gsap.timeline({
      defaults: { 
        ease: "power3.out",
        duration: 1
      }
    });
    
    // Animate decorative elements
    gsap.set(decorationsRef.current, { autoAlpha: 0 });
    gsap.to(decorationsRef.current, {
      autoAlpha: 1,
      duration: 2,
      ease: "power2.inOut"
    });
    
    // Main content animation sequence - fade in without vertical movement
    tl.from(badgeRef.current, { 
      autoAlpha: 0,
      duration: 0.8
    })
    .from(titleRef.current, { 
      autoAlpha: 0,
      duration: 0.8
    }, "-=0.5")
    .from(descriptionRef.current, { 
      autoAlpha: 0,
      duration: 0.8
    }, "-=0.5")
    .from(featuresRef.current, { 
      autoAlpha: 0,
      stagger: 0.1,
      duration: 0.6
    }, "-=0.5")
    .from(dashboardCodeRef.current, {
      autoAlpha: 0,
      duration: 0.8
    }, "-=0.3");
    
    // Replace floating with subtle pulsing
    gsap.to(".floating-element", {
      scale: 1.05,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        each: 0.3,
        from: "random"
      }
    });
    
    // Parallax effect on mouse move (horizontal only)
    if (isMounted) {
      const handleMouseMove = (e: MouseEvent) => {
        const xPos = (e.clientX / window.innerWidth) - 0.5;
        const yPos = (e.clientY / window.innerHeight) - 0.5;
        
        gsap.to(".parallax-element", {
          x: xPos * 20,
          duration: 1,
          ease: "power2.out"
        });
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    
    // Create cursor trail elements
    const trailContainer = document.createElement('div');
    trailContainer.style.position = 'fixed';
    trailContainer.style.top = '0';
    trailContainer.style.left = '0';
    trailContainer.style.width = '100vw';
    trailContainer.style.height = '100vh';
    trailContainer.style.pointerEvents = 'none';
    trailContainer.style.zIndex = '99999';
    document.body.appendChild(trailContainer);
    
    // Create trail elements
    const TRAIL_COUNT = 10;
    const trails: HTMLDivElement[] = [];
    
    for (let i = 0; i < TRAIL_COUNT; i++) {
      const div = document.createElement('div');
      div.style.position = 'fixed';
      div.style.width = '40px';
      div.style.height = '40px';
      div.style.borderRadius = '50%';
      div.style.background = 'rgba(149, 76, 233, 0.25)';
      div.style.boxShadow = '0 0 10px 3px rgba(149, 76, 233, 0.3)';
      div.style.transform = 'translate(-50%, -50%)';
      div.style.opacity = '0';
      div.style.zIndex = '99999';
      div.style.pointerEvents = 'none';
      div.style.willChange = 'transform, opacity';
      trailContainer.appendChild(div);
      trails.push(div);
    }
    
    // Initialize mouse position to center of screen
    const initialX = window.innerWidth / 2;
    const initialY = window.innerHeight / 2;
    
    // Variable to store the timeout ID
    let cursorTimeoutId: number | null = null;
    
    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      // Animate trail elements with GSAP
      trails.forEach((el, index) => {
        const delay = index * 0.08; // Staggered delay
        
        gsap.to(el, {
          x: mouseX,
          y: mouseY,
          opacity: 0.7 - (index * 0.06), // Fade out for trail effect
          duration: 0.5,
          ease: "expo.out",
          delay: delay,
        });
      });
      
      // Clear any existing timeout
      if (cursorTimeoutId) {
        window.clearTimeout(cursorTimeoutId);
        cursorTimeoutId = null;
      }
      
      // Set a timeout to fade out the trail when mouse stops moving
      cursorTimeoutId = window.setTimeout(() => {
        trails.forEach((el) => {
          gsap.to(el, {
            opacity: 0,
            duration: 1.2,
            ease: "power2.out"
          });
        });
      }, 1000);
    };
    
    // Initial placement (centered)
    trails.forEach((el, index) => {
      gsap.set(el, {
        x: initialX,
        y: initialY,
        opacity: 0
      });
    });
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (cursorTimeoutId) {
        window.clearTimeout(cursorTimeoutId);
      }
      if (trailContainer && document.body.contains(trailContainer)) {
        document.body.removeChild(trailContainer);
      }
    };
  }, [isMounted]); // Only depend on isMounted, not mousePosition

  useEffect(() => {
    if (!isMounted) return;
    
    // Terminal animation effect
    // Define terminal content showing LazyStack features
    const codeSnippets = [
      "Welcome to LazyStack - Your Ultimate Developer Toolkit Guide!",
      ">> Connecting to LazyStack platform...",
      ">> Successfully connected!",
      ">> Loading available tool categories:",
      "• AI Tools: 24 tools available",
      "• Design Tools: 18 tools available",
      "• Development Tools: 32 tools available",
      ">> Lazy theme enabled",
      ">> Purple accent color applied",
      "LazyStack is ready to enhance your workflow."
    ];
    
    let currentCharIndex = 0;
    let currentSnippet = codeSnippets.join("\n");
    let typingInterval: NodeJS.Timeout;
    
    const typeText = () => {
      if (currentCharIndex < currentSnippet.length) {
        setTypedText(currentSnippet.substring(0, currentCharIndex + 1));
        currentCharIndex++;
      } else {
        // Finished typing
        clearInterval(typingInterval);
        setIsTyping(false);
        
        // Wait before restarting
        setTimeout(() => {
          currentCharIndex = 0;
          setTypedText("");
          setIsTyping(true);
          
          // Start typing again
          typingInterval = setInterval(typeText, 20);
        }, 5000);
      }
    };
    
    // Clear any previous typed text when mounting
    setTypedText("");
    setIsTyping(true);
    
    // Start typing after a short delay
    setTimeout(() => {
      typingInterval = setInterval(typeText, 20);
    }, 500);
    
    return () => {
      clearInterval(typingInterval);
    };
  }, [isMounted]);

  // Effect for handling glow effect - lines removed to keep a clean background
  useEffect(() => {
    if (!isMounted || !heroRef.current) return;
    
    // Create container for the effect
    const glowContainer = document.createElement('div');
    glowContainer.className = 'absolute inset-0 overflow-hidden pointer-events-none z-0';
    heroRef.current.appendChild(glowContainer);
    
    // Create purple glow orbs that follow mouse
    const orbs: HTMLDivElement[] = [];
    const numOrbs = 3;
    
    for (let i = 0; i < numOrbs; i++) {
      const orb = document.createElement('div');
      orb.className = 'absolute pointer-events-none rounded-full';
      orb.style.width = '100px';
      orb.style.height = '100px';
      orb.style.background = 'radial-gradient(circle, rgba(138, 63, 252, 0.15) 0%, rgba(138, 63, 252, 0) 70%)';
      orb.style.opacity = '0';
      orb.style.filter = 'blur(15px)';
      orb.style.transform = 'translate(-50%, -50%)';
      
      glowContainer.appendChild(orb);
      orbs.push(orb);
    }
    
    // Mouse move handler for glow effect
    let moveTimeout: NodeJS.Timeout | null = null;
    let isMoving = false;
    
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      // Add smooth movement
      orbs.forEach((orb, index) => {
        const delay = index * 0.1;
        const scale = 1 + (index * 0.3);
        
        gsap.to(orb, {
          left: mouseX,
          top: mouseY,
          opacity: 0.7 - (index * 0.2),
          scale: scale,
          duration: 0.8 + (index * 0.2),
          ease: 'power2.out',
          delay: delay
        });
      });
      
      isMoving = true;
      
      // Clear any existing timeout and set a new one
      if (moveTimeout) {
        clearTimeout(moveTimeout);
      }
      
      // Set timeout to fade out elements when movement stops
      moveTimeout = setTimeout(() => {
        isMoving = false;
        
        // Fade out all elements
        orbs.forEach(orb => {
          gsap.to(orb, {
            opacity: 0,
            duration: 1.2,
            ease: 'power2.out'
          });
        });
      }, 300);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (glowContainer.parentNode) {
        glowContainer.parentNode.removeChild(glowContainer);
      }
    };
  }, [isMounted]);

  return (
    <section ref={heroRef} className="relative overflow-hidden text-white py-12 sm:py-16 md:py-20 px-4 md:px-8 lg:px-16 flex flex-col items-center justify-center text-center min-h-screen">
      {/* Elegant background with gradient and animated elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050210] via-[#050210] to-[#020205] z-0" />
      
      {/* Enhanced polka dot pattern across entire background */}
      <div className="absolute inset-0 z-0" style={{ 
        opacity: 0.35,
        backgroundImage: 'radial-gradient(circle, rgba(138, 63, 252, 0.7) 1.5px, transparent 1.5px), radial-gradient(circle, rgba(107, 35, 255, 0.5) 3px, transparent 3px)', 
        backgroundSize: '30px 30px, 60px 60px',
        backgroundPosition: '0 0, 15px 15px'
      }}></div>
      
      {/* Subtle animated gradient overlay */}
      <div 
        className="absolute inset-0 opacity-30 z-0"
        style={{
          background: isMounted 
            ? `radial-gradient(circle at ${50 + mousePosition.x / window.innerWidth * 20}% ${50 + mousePosition.y / window.innerHeight * 20}%, rgba(138, 63, 252, 0.15) 0%, rgba(13, 9, 31, 0) 70%)` 
            : 'radial-gradient(circle at 50% 50%, rgba(138, 63, 252, 0.15) 0%, rgba(13, 9, 31, 0) 70%)'
        }}
      />
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-5 z-0" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      {/* Content */}
      <div className="relative z-10 max-w-5xl w-full px-2 sm:px-4">
        <div className="flex flex-col items-center justify-center mb-4 sm:mb-6">
          <div ref={badgeRef} className="bg-gradient-to-r from-purple-400 to-purple-600 text-white text-xs rounded-full px-3 py-1 mt-12 sm:mt-16 md:mt-20 mb-4 sm:mb-6">
            The Ultimate Tool Collection
          </div>
        </div>
        
        <h1
          ref={titleRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#e0d6ff] text-center px-2 sm:px-4 mx-auto"
        >
          LazyStack
        </h1>
        <p
          ref={descriptionRef}
          className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto text-[#e0d6ff]/90 text-center px-2"
        >
          Unlock the power of the best tools in AI, Design, and Programming. Streamline your workflow and elevate your productivity with our expertly selected collection.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5 mb-8 sm:mb-10 md:mb-12 max-w-4xl mx-auto px-3 sm:px-0" ref={featuresRef}>
          <div className="bg-[#1a1225]/70 hover:bg-[#1a1225]/90 backdrop-blur-sm rounded-xl p-3 sm:p-4 px-3 sm:px-5 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 floating-element flex items-center">
            <span className="text-purple-400 text-base sm:text-lg mr-2.5 flex-shrink-0 ml-1">◆</span> 
            <span className="text-white font-medium text-sm sm:text-base text-left">Developer's Competitive Edge Guide</span>
          </div>
          <div className="bg-[#1a1225]/70 hover:bg-[#1a1225]/90 backdrop-blur-sm rounded-xl p-3 sm:p-4 px-3 sm:px-5 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 floating-element flex items-center">
            <span className="text-purple-400 text-base sm:text-lg mr-2.5 flex-shrink-0 ml-1">◆</span> 
            <span className="text-white font-medium text-sm sm:text-base text-left">Your Reliable Quality Companion</span>
          </div>
          <div className="bg-[#1a1225]/70 hover:bg-[#1a1225]/90 backdrop-blur-sm rounded-xl p-3 sm:p-4 px-3 sm:px-5 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 floating-element sm:col-span-2 md:col-span-1 mx-auto md:mx-0 flex items-center" style={{ maxWidth: "100%" }}>
            <span className="text-purple-400 text-base sm:text-lg mr-2.5 flex-shrink-0 ml-1">◆</span> 
            <span className="text-white font-medium text-sm sm:text-base text-left">The Multilingual Programming Savior</span>
          </div>
        </div>
        
        <div className="w-full flex justify-center mb-8 sm:mb-12 md:mb-16 mt-2 sm:mt-4 px-1 sm:px-4">
          {/* Terminal Container with Responsive Width */}
          <div className="relative w-full max-w-2xl mx-auto" style={{ maxWidth: "96%" }}>
            {/* Glow Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg blur opacity-30"></div>
            
            {/* Terminal Window */}
            <div className="relative bg-[#050210] border border-purple-500/20 rounded-lg shadow-xl" style={{width: "100%", borderRadius: "12px", overflow: "hidden"}}>
              {/* Terminal Header */}
              <div className="h-6 sm:h-7 md:h-8 flex items-center px-2 sm:px-4 bg-[#0a0812]/80" style={{borderTopLeftRadius: "12px", borderTopRightRadius: "12px"}}>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 rounded-full bg-red-500 mr-1 sm:mr-2"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 rounded-full bg-yellow-500 mr-1 sm:mr-2"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 rounded-full bg-green-500"></div>
                <div className="ml-2 text-xs sm:text-sm text-gray-400">Lazystack-terminal</div>
              </div>
              
              {/* Terminal Content */}
              <div className="bg-[#050210] h-52 sm:h-64 md:h-72 lg:h-80 relative" style={{width: "100%", borderBottomLeftRadius: "12px", borderBottomRightRadius: "12px"}}>
                <div 
                  ref={dashboardCodeRef}
                  className="absolute inset-0 font-mono text-[10px] sm:text-sm md:text-sm lg:text-lg p-3 sm:p-4 md:p-5 overflow-hidden text-left"
                  style={{
                    borderBottomLeftRadius: "12px", 
                    borderBottomRightRadius: "12px"
                  }}
                >
                  <div className="flex justify-start">
                    <span className="text-purple-400 flex-shrink-0 mr-2">$</span>
                    <div className="text-gray-300 whitespace-pre-wrap text-left break-words w-full overflow-hidden">
                      {typedText}
                      {isTyping && <span className="animate-blink inline-block w-1.5 sm:w-2 md:w-2.5 h-3 sm:h-4 md:h-5 bg-purple-400 align-middle"></span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 sm:-top-5 md:-top-6 -right-4 sm:-right-5 md:-right-6 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 blur-sm bg-purple-500/20 rounded-full animate-pulse-slow"></div>
            <div className="absolute -bottom-4 sm:-bottom-6 md:-bottom-8 -left-4 sm:-left-6 md:-left-8 w-14 sm:w-18 md:w-24 h-14 sm:h-18 md:h-24 blur-sm bg-blue-500/20 rounded-full animate-pulse-slow"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
