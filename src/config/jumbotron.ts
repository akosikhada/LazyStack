import { developmentTools, designTools, aiTools } from "@/constants/data";

export const terminalSettings = {
  typingSpeed: 20, // milliseconds per character
  restartDelay: 5000, // milliseconds to wait before restarting animation
  initialDelay: 500, // milliseconds to wait before starting animation
};

// Dynamically count tools from the data files
const aiToolCount = aiTools.length;
const designToolCount = designTools.length;
const developmentToolCount = developmentTools.length;

export const terminalContent = [
  "Welcome to LazyStack",
  ">> Initializing LazyStack...",
  ">> Ready to supercharge your workflow!",
  ">> Loading tools:",
  `   • AI: ${aiToolCount} available`,
  `   • Design: ${designToolCount} available`,
  `   • Development: ${developmentToolCount} available`,
  ">> Dark theme activated for optimal focus",
  ">> Signature purple accent applied for visual impact",
  ">> Ready. Let's build something amazing.",
];

export const animationSettings = {
  // Cursor trail
  cursorTrail: {
    count: 10, // number of trail elements
    fadeOutDelay: 1000, // milliseconds until trail fades when mouse stops
  },

  // Glow effect
  glowEffect: {
    orbCount: 3,
    fadeOutDelay: 300, // milliseconds until glow fades when mouse stops
  },

  // Floating animation
  floatingAnimation: {
    scale: 1.05,
    duration: 2.5,
    staggerDelay: 0.3,
  },

  // Parallax effect
  parallax: {
    intensity: 20, // pixels of movement
  },
};
