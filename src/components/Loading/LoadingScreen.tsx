"use client";

import React from "react";
import {
  terminalSettings,
  terminalContent,
  terminalStyle,
} from "@/config/loading";
import { useTypewriterEffect } from "../../hooks/useTypewriterEffect";
import { Terminal } from "./Terminal";

/**
 * A full-screen loading component with terminal animation effect
 */
const LoadingScreen = () => {
  // Use the typewriter effect hook to handle animation
  const { text, lineText, animationComplete } = useTypewriterEffect(
    terminalContent,
    terminalSettings,
  );

  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{ backgroundColor: terminalStyle.background }}
    >
      <Terminal
        style={terminalStyle}
        text={text}
        lineText={lineText}
        animationComplete={animationComplete}
      />
    </div>
  );
};

export default LoadingScreen;
