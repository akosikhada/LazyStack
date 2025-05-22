"use client";

import { useState, useEffect, useRef, RefObject } from "react";
import gsap from "gsap";
import { MousePosition } from "@/types/jumbotron";
import {
  terminalContent,
  terminalSettings,
  animationSettings,
} from "@/config/jumbotron";

interface UseJumbotronEffectsParams {
  heroRef: RefObject<HTMLElement>;
  titleRef: RefObject<HTMLElement>;
  descriptionRef: RefObject<HTMLElement>;
  badgeRef: RefObject<HTMLElement>;
  featuresRef: RefObject<HTMLElement>;
  decorationsRef: RefObject<HTMLElement>;
  dashboardCodeRef: RefObject<HTMLElement>;
}

interface UseJumbotronEffectsResult {
  mousePosition: MousePosition;
  prevMousePosition: MousePosition;
  isMounted: boolean;
  terminalContent: string[];
  currentTextIndex: number;
  typedText: string;
  isTyping: boolean;
  isMobileOrTablet: boolean;
}

export function useJumbotronEffects({
  heroRef,
  titleRef,
  descriptionRef,
  badgeRef,
  featuresRef,
  decorationsRef,
  dashboardCodeRef,
}: UseJumbotronEffectsParams): UseJumbotronEffectsResult {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const [isMounted, setIsMounted] = useState(false);
  const [prevMousePosition, setPrevMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const [terminalContentState, setTerminalContentState] = useState<string[]>(
    []
  );
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  // Mouse tracking effect
  useEffect(() => {
    setIsMounted(true);

    // Check if the device is mobile or tablet
    setIsMobileOrTablet(window.matchMedia("(max-width: 1024px)").matches);

    const handleMouseMove = (e: MouseEvent) => {
      // First save the current position as the previous one
      setPrevMousePosition(mousePosition);
      
      // Then update to the new position
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []); // Remove mousePosition from dependency array

  // Main animation effects
  useEffect(() => {
    if (!isMounted) return;

    // Create a timeline for staggered animations
    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
        duration: 1,
      },
    });

    // Animate decorative elements
    gsap.set(decorationsRef.current, { autoAlpha: 0 });
    gsap.to(decorationsRef.current, {
      autoAlpha: 1,
      duration: 2,
      ease: "power2.inOut",
    });

    // Main content animation sequence - fade in without vertical movement
    tl.from(badgeRef.current, {
      autoAlpha: 0,
      duration: 0.8,
    })
      .from(
        titleRef.current,
        {
          autoAlpha: 0,
          duration: 0.8,
        },
        "-=0.5"
      )
      .from(
        descriptionRef.current,
        {
          autoAlpha: 0,
          duration: 0.8,
        },
        "-=0.5"
      )
      .from(
        featuresRef.current,
        {
          autoAlpha: 0,
          stagger: 0.1,
          duration: 0.6,
        },
        "-=0.5"
      )
      .from(
        dashboardCodeRef.current,
        {
          autoAlpha: 0,
          duration: 0.8,
        },
        "-=0.3"
      );

    // Replace floating with subtle pulsing
    gsap.to(".floating-element", {
      scale: animationSettings.floatingAnimation.scale,
      duration: animationSettings.floatingAnimation.duration,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        each: animationSettings.floatingAnimation.staggerDelay,
        from: "random",
      },
    });

    // Parallax effect on mouse move (horizontal only)
    if (isMounted) {
      const handleMouseMove = (e: MouseEvent) => {
        const xPos = e.clientX / window.innerWidth - 0.5;
        const yPos = e.clientY / window.innerHeight - 0.5;

        // Check if parallax elements exist before animating them
        const parallaxElements = document.querySelectorAll('.parallax-element');
        if (parallaxElements.length > 0) {
          gsap.to(".parallax-element", {
            x: xPos * animationSettings.parallax.intensity,
            duration: 1,
            ease: "power2.out",
          });
        }
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [
    isMounted,
    badgeRef,
    titleRef,
    descriptionRef,
    featuresRef,
    decorationsRef,
    dashboardCodeRef,
  ]);

  // Cursor trail effect
  useEffect(() => {
    if (!isMounted) return;

    // Skip creating cursor trail on mobile or tablet devices
    if (isMobileOrTablet) return;

    // Create cursor trail elements
    const trailContainer = document.createElement("div");
    trailContainer.style.position = "fixed";
    trailContainer.style.top = "0";
    trailContainer.style.left = "0";
    trailContainer.style.width = "100vw";
    trailContainer.style.height = "100vh";
    trailContainer.style.pointerEvents = "none";
    trailContainer.style.zIndex = "99999";
    document.body.appendChild(trailContainer);

    // Create trail elements
    const TRAIL_COUNT = animationSettings.cursorTrail.count;
    const trails: HTMLDivElement[] = [];

    for (let i = 0; i < TRAIL_COUNT; i++) {
      const div = document.createElement("div");
      div.style.position = "fixed";
      div.style.width = "40px";
      div.style.height = "40px";
      div.style.borderRadius = "50%";
      div.style.background = "rgba(149, 76, 233, 0.25)";
      div.style.boxShadow = "0 0 10px 3px rgba(149, 76, 233, 0.3)";
      div.style.transform = "translate(-50%, -50%)";
      div.style.opacity = "0";
      div.style.zIndex = "99999";
      div.style.pointerEvents = "none";
      div.style.willChange = "transform, opacity";
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
          opacity: 0.7 - index * 0.06, // Fade out for trail effect
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
            ease: "power2.out",
          });
        });
      }, animationSettings.cursorTrail.fadeOutDelay);
    };

    // Initial placement (centered)
    trails.forEach((el, index) => {
      gsap.set(el, {
        x: initialX,
        y: initialY,
        opacity: 0,
      });
    });

    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup function
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (cursorTimeoutId) {
        window.clearTimeout(cursorTimeoutId);
      }
      if (trailContainer && document.body.contains(trailContainer)) {
        document.body.removeChild(trailContainer);
      }
    };
  }, [isMounted, isMobileOrTablet]);

  // Terminal typing effect
  useEffect(() => {
    if (!isMounted) return;

    // Set the terminal content from our config
    setTerminalContentState(terminalContent);

    let currentCharIndex = 0;
    let currentSnippet = terminalContent.join("\n");
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
          typingInterval = setInterval(typeText, terminalSettings.typingSpeed);
        }, terminalSettings.restartDelay);
      }
    };

    // Clear any previous typed text when mounting
    setTypedText("");
    setIsTyping(true);

    // Start typing after a short delay
    setTimeout(() => {
      typingInterval = setInterval(typeText, terminalSettings.typingSpeed);
    }, terminalSettings.initialDelay);

    return () => {
      clearInterval(typingInterval);
    };
  }, [isMounted]);

  // Glow effect
  useEffect(() => {
    if (!isMounted || !heroRef.current) return;

    // Skip creating glow effect on mobile or tablet devices
    if (isMobileOrTablet) return;

    // Create container for the effect
    const glowContainer = document.createElement("div");
    glowContainer.className =
      "absolute inset-0 overflow-hidden pointer-events-none z-0";
    heroRef.current.appendChild(glowContainer);

    // Create purple glow orbs that follow mouse
    const orbs: HTMLDivElement[] = [];
    const numOrbs = animationSettings.glowEffect.orbCount;

    for (let i = 0; i < numOrbs; i++) {
      const orb = document.createElement("div");
      orb.className = "absolute pointer-events-none rounded-full";
      orb.style.width = "100px";
      orb.style.height = "100px";
      orb.style.background =
        "radial-gradient(circle, rgba(138, 63, 252, 0.15) 0%, rgba(138, 63, 252, 0) 70%)";
      orb.style.opacity = "0";
      orb.style.filter = "blur(15px)";
      orb.style.transform = "translate(-50%, -50%)";

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
        const scale = 1 + index * 0.3;

        gsap.to(orb, {
          left: mouseX,
          top: mouseY,
          opacity: 0.7 - index * 0.2,
          scale: scale,
          duration: 0.8 + index * 0.2,
          ease: "power2.out",
          delay: delay,
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
        orbs.forEach((orb) => {
          gsap.to(orb, {
            opacity: 0,
            duration: 1.2,
            ease: "power2.out",
          });
        });
      }, animationSettings.glowEffect.fadeOutDelay);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (glowContainer.parentNode) {
        glowContainer.parentNode.removeChild(glowContainer);
      }
    };
  }, [isMounted, heroRef, isMobileOrTablet]);

  return {
    mousePosition,
    prevMousePosition,
    isMounted,
    terminalContent: terminalContentState,
    currentTextIndex,
    typedText,
    isTyping,
    isMobileOrTablet,
  };
}
