import { useRef, useEffect } from "react";
import gsap from "gsap";

/**
 * Custom hook for ToolCard animations
 * @param index Optional index for staggered animations
 * @returns References and animation setup
 */
export function useToolCardAnimation(index: number = 0) {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);

  // Set up GSAP animations
  useEffect(() => {
    // Initial state
    gsap.set(cardRef.current, {
      opacity: 0,
      y: 10,
    });

    // Animate card entrance
    gsap.to(cardRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      delay: 0.1 + index * 0.08, // Slightly faster stagger
      ease: "power2.out",
    });

    // Create animation context for hover effects
    const ctx = gsap.context(() => {
      // Setup hover animations
      const hoverTl = gsap.timeline({ paused: true });

      hoverTl
        .to(gradientRef.current, {
          scaleX: 1,
          duration: 0.3,
          ease: "power2.out",
        })
        .to(
          iconRef.current,
          {
            scale: 1.05, // More subtle scale
            boxShadow: "0 4px 12px rgba(138, 63, 252, 0.15)",
            duration: 0.3,
            ease: "back.out(1.5)",
          },
          0,
        )
        .to(
          contentRef.current,
          {
            x: 1, // More subtle movement
            duration: 0.3,
            ease: "power2.out",
          },
          0,
        );

      // Add hover event listeners
      cardRef.current?.addEventListener("mouseenter", () => hoverTl.play());
      cardRef.current?.addEventListener("mouseleave", () => hoverTl.reverse());

      // Clean up
      return () => {
        cardRef.current?.removeEventListener("mouseenter", () =>
          hoverTl.play(),
        );
        cardRef.current?.removeEventListener("mouseleave", () =>
          hoverTl.reverse(),
        );
      };
    }, cardRef);

    // Cleanup
    return () => ctx.revert();
  }, [index]);

  return {
    cardRef,
    iconRef,
    contentRef,
    gradientRef,
  };
}
