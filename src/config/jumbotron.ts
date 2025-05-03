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
  "Welcome to LazyStack - Your Ultimate Developer Toolkit Guide!",
  ">> Connecting to LazyStack platform...",
  ">> Successfully connected!",
  ">> Loading available tool categories:",
  `   • AI Tools: ${aiToolCount} tools available`,
  `   • Design Tools: ${designToolCount} tools available`,
  `   • Development Tools: ${developmentToolCount} tools available`,
  ">> Lazy theme enabled",
  ">> Purple accent color applied",
  "LazyStack is ready to enhance your workflow.",
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
