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
            (prev) => prev + terminalContent[currentLine][currentIndex],
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
      className="flex min-h-screen items-center justify-center"
      style={{ backgroundColor: terminalStyle.background }}
    >
      <div
        className="mx-3 w-full max-w-2xl rounded-md border p-4 font-mono shadow-lg md:mx-auto md:p-5"
        style={{
          backgroundColor: terminalStyle.terminalBackground,
          color: terminalStyle.textColor,
          borderColor: terminalStyle.accentColor,
        }}
      >
        <div
          className="mb-2 flex items-center border-b pb-2 md:mb-3"
          style={{ borderColor: terminalStyle.accentColor }}
        >
          <div className="mr-2 flex space-x-1">
            <div
              className={`h-2.5 w-2.5 rounded-full md:h-3 md:w-3 ${terminalStyle.buttonColors.red}`}
            ></div>
            <div
              className={`h-2.5 w-2.5 rounded-full md:h-3 md:w-3 ${terminalStyle.buttonColors.yellow}`}
            ></div>
            <div
              className={`h-2.5 w-2.5 rounded-full md:h-3 md:w-3 ${terminalStyle.buttonColors.green}`}
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
          className="overflow-auto whitespace-pre-wrap p-2 text-sm leading-6 tracking-wide sm:text-base md:p-3 md:text-lg md:leading-relaxed lg:text-xl"
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
