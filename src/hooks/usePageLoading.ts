"use client";

import { useLoading } from "@/context/Loading";

const usePageLoading = () => {
  const { isLoading, setIsLoading, showLoadingFor } = useLoading();

  return {
    // Current loading state
    isLoading,
    // Set loading state manually
    setLoading: setIsLoading,
    // Show loading screen for a specified duration in milliseconds
    showLoadingFor,
    // Start loading
    startLoading: () => setIsLoading(true),
    // Stop loading
    stopLoading: () => setIsLoading(false),
  };
};

export default usePageLoading;
