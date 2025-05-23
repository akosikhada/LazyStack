import { RefObject } from "react";

export interface JumbotronProps {
  description?: string;
}

export interface MousePosition {
  x: number;
  y: number;
}

export interface JumbotronRefs {
  heroRef: RefObject<HTMLElement>;
  titleRef: RefObject<HTMLDivElement>;
  descriptionRef: RefObject<HTMLDivElement>;
  badgeRef: RefObject<HTMLDivElement>;
  featuresRef: RefObject<HTMLDivElement>;
  decorationsRef: RefObject<HTMLDivElement>;
  dashboardCodeRef: RefObject<HTMLDivElement>;
}

export interface UseJumbotronEffectsReturn {
  mousePosition: MousePosition;
  isMounted: boolean;
  terminalContent: string[];
  currentTextIndex: number;
  typedText: string;
  isTyping: boolean;
  isMobileOrTablet: boolean;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon?: string;
}
