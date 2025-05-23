export interface TerminalSettings {
  initialDelay: number;
  typingSpeed: number;
  completionDelay: number;
}

export interface TerminalStyle {
  background: string;
  terminalBackground: string;
  textColor: string;
  accentColor: string;
  headerColor: string;
  height: {
    sm: string;
    md: string;
    lg: string;
  };
  buttonColors: {
    red: string;
    yellow: string;
    green: string;
  };
}
