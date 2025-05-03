"use client";

import React, { useState, useEffect } from "react";
import {
  terminalSettings,
  terminalContent,
  terminalStyle,
} from "@/config/loading";

const LoadingScreen = () => {
  const [text, setText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  const [lineText, setLineText] = useState("");
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Initial delay before starting animation
    const initialTimer = setTimeout(() => {
      setCurrentLine(0);
    }, terminalSettings.initialDelay);

    return () => clearTimeout(initialTimer);
  }, []);

  useEffect(() => {
    // Process line-by-line animation
    if (currentLine < terminalContent.length) {
      if (currentIndex < terminalContent[currentLine].length) {
        const timeout = setTimeout(() => {
          setLineText(
            (prev) => prev + terminalContent[currentLine][currentIndex]
          );
          setCurrentIndex((prev) => prev + 1);
        }, terminalSettings.typingSpeed);

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
      const completionTimer = setTimeout(() => {
        setAnimationComplete(true);
        // Inform the parent component that animation is complete
        if (window.dispatchEvent) {
          window.dispatchEvent(new CustomEvent("loadingAnimationComplete"));
        }
      }, terminalSettings.completionDelay);

      return () => clearTimeout(completionTimer);
    }
  }, [currentIndex, currentLine, lineText]);

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ backgroundColor: terminalStyle.background }}
    >
      <div
        className="w-full max-w-2xl p-4 md:p-5 rounded-md shadow-lg mx-3 md:mx-auto border font-mono"
        style={{
          backgroundColor: terminalStyle.terminalBackground,
          color: terminalStyle.textColor,
          borderColor: terminalStyle.accentColor,
        }}
      >
        <div
          className="flex items-center mb-2 md:mb-3 pb-2 border-b"
          style={{ borderColor: terminalStyle.accentColor }}
        >
          <div className="flex space-x-1 mr-2">
            <div
              className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full ${terminalStyle.buttonColors.red}`}
            ></div>
            <div
              className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full ${terminalStyle.buttonColors.yellow}`}
            ></div>
            <div
              className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full ${terminalStyle.buttonColors.green}`}
            ></div>
          </div>
          <div
            style={{ color: terminalStyle.headerColor }}
            className="text-xs md:text-sm"
          >
            LazyStack-terminal
          </div>
        </div>
        <div
          className="whitespace-pre-wrap overflow-auto p-2 md:p-3 leading-6 md:leading-relaxed tracking-wide text-sm sm:text-base md:text-lg lg:text-xl"
          style={{
            height: terminalStyle.height.md,
            color: terminalStyle.textColor,
          }}
        >
          {text}
          {lineText}
          <span
            className={`animate-pulse ${animationComplete ? "opacity-100" : ""}`}
          >
            ▊
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
