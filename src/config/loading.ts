export const terminalSettings = {
  typingSpeed: 10, // milliseconds per character
  initialDelay: 300, // milliseconds to wait before starting animation
  completionDelay: 500, // milliseconds to wait after animation completes
};

export const terminalContent = [
  "$ Initializing LazyStack system...",
  "  > Establishing secure connection [SUCCESS]",
  "  > Authenticating user credentials [VERIFIED]",
  "  > Loading application modules:",
  "   - Core framework [LOADED]",
  "   - UI components  [LOADED]",
  "   - Data services  [LOADED]",
  "  > Configuration complete.",
  "  > System ready. Proceeding to application...",
  "  > Loading vibe side...",
];

export const terminalStyle = {
  background: "#1a0b2e",
  terminalBackground: "#170b29",
  textColor: "#e4ccff",
  accentColor: "#674d8b",
  buttonColors: {
    red: "bg-red-500",
    yellow: "bg-yellow-500",
    green: "bg-green-500",
  },
  headerColor: "#a78bdb",
  height: {
    sm: "350px",
    md: "400px",
    lg: "450px",
  },
};
