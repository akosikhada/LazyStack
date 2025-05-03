"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import LoadingScreen from "@/components/Loading/LoadingScreen";

type LoadingContextType = {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  showLoadingFor: (milliseconds: number) => void;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(true);

  // Function to show loading for a specific duration
  const showLoadingFor = (milliseconds: number) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, milliseconds);
  };

  // Wait for animation completion
  useEffect(() => {
    // Listen for animation complete event
    const handleAnimationComplete = () => {
      // Add a small delay after animation completes to let user read the final state
      setTimeout(() => {
        setIsLoading(false);
      }, 500); // Slightly longer delay for professional message
    };

    window.addEventListener(
      "loadingAnimationComplete",
      handleAnimationComplete
    );

    // Fallback timer in case animation doesn't complete for some reason
    const fallbackTimer = setTimeout(() => {
      setIsLoading(false);
    }, 6000); // Adjusted fallback timeout

    return () => {
      window.removeEventListener(
        "loadingAnimationComplete",
        handleAnimationComplete
      );
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <LoadingContext.Provider
      value={{ isLoading, setIsLoading, showLoadingFor }}
    >
      {isLoading ? <LoadingScreen /> : children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
