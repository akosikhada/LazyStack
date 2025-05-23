import React from "react";
import { TerminalStyle } from "../../types/terminal-types";
import { TerminalHeader } from "./TerminalHeader";
import { TerminalContent } from "./TerminalContent";

interface TerminalProps {
  style: TerminalStyle;
  text: string;
  lineText: string;
  animationComplete: boolean;
  title?: string;
}

/**
 * Terminal window component combining header and content
 */
export function Terminal({
  style,
  text,
  lineText,
  animationComplete,
  title,
}: TerminalProps) {
  return (
    <div
      className="mx-3 w-full max-w-2xl rounded-md border p-4 font-mono shadow-lg md:mx-auto md:p-5"
      style={{
        backgroundColor: style.terminalBackground,
        color: style.textColor,
        borderColor: style.accentColor,
      }}
    >
      <TerminalHeader style={style} title={title} />
      <TerminalContent
        style={style}
        text={text}
        lineText={lineText}
        animationComplete={animationComplete}
      />
    </div>
  );
}
