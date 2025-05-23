import { useState, useEffect } from "react";
import { TerminalSettings } from "../types/terminal-types";

/**
 * A hook that creates a typewriter effect for terminal-like text animation
 * @param content Array of strings to be typed out
 * @param settings Settings controlling animation timing
 * @returns Animation state and text output
 */
export function useTypewriterEffect(
  content: string[],
  settings: TerminalSettings,
) {
  const [text, setText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentLine, setCurrentLine] = useState(-1); // Start at -1 to handle initial delay
  const [lineText, setLineText] = useState("");
  const [animationComplete, setAnimationComplete] = useState(false);

  // Initial delay before starting animation
  useEffect(() => {
    if (currentLine === -1) {
      const initialTimer = setTimeout(() => {
        setCurrentLine(0);
      }, settings.initialDelay);

      return () => clearTimeout(initialTimer);
    }
  }, [currentLine, settings.initialDelay]);

  // Process line-by-line animation
  useEffect(() => {
    // Don't start until initial delay is complete
    if (currentLine === -1) return;

    if (currentLine < content.length) {
      if (currentIndex < content[currentLine].length) {
        // Type the next character
        const timeout = setTimeout(() => {
          setLineText((prev) => prev + content[currentLine][currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        }, settings.typingSpeed);

        return () => clearTimeout(timeout);
      } else {
        // Line complete, move to next line
        setText((prev) => prev + lineText + "\n");
        setLineText("");
        setCurrentIndex(0);
        setCurrentLine((prev) => prev + 1);
      }
    } else {
      // Animation is complete
      if (lineText) {
        setText((prev) => prev + lineText);
        setLineText("");
      }

      // Wait a moment after completion before signaling done
      if (!animationComplete) {
        const completionTimer = setTimeout(() => {
          setAnimationComplete(true);
          // Inform the parent component that animation is complete
          if (window.dispatchEvent) {
            window.dispatchEvent(new CustomEvent("loadingAnimationComplete"));
          }
        }, settings.completionDelay);

        return () => clearTimeout(completionTimer);
      }
    }
  }, [
    currentIndex,
    currentLine,
    lineText,
    content,
    settings,
    animationComplete,
  ]);

  return {
    text,
    lineText,
    animationComplete,
  };
}
