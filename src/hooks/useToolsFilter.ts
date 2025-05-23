import { useState, useEffect } from "react";
import { developmentTools, designTools, aiTools } from "../constants/data";
import { Category, Tool } from "../types/search-types";

export function useToolsFilter(initialCategory: Category = "Suggested") {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<Category>(initialCategory);
  const [sortAlphabetically, setSortAlphabetically] = useState(false);

  // Combine all tools into one array with deep copies
  const allTools = [
    ...developmentTools.map((tool) => ({ ...tool })),
    ...designTools.map((tool) => ({ ...tool })),
    ...aiTools.map((tool) => ({ ...tool })),
  ];

  // Get tools by category
  const getToolsByCategory = (category: Category) => {
    switch (category) {
      case "Development":
        return developmentTools;
      case "Design":
        return designTools;
      case "AI":
        return aiTools;
      default:
        return allTools;
    }
  };

  // Create featured tools list with deep copies to prevent reference issues
  const featuredTools = [
    // Development tools - Cursor and Windsurf
    {
      ...(developmentTools.find((tool) => tool.title === "Cursor") ||
        developmentTools[0]),
    },
    {
      ...(developmentTools.find((tool) => tool.title === "Windsurf") ||
        developmentTools[1]),
    },
    // Design tools - Motiff and Figma
    {
      ...(designTools.find((tool) => tool.title === "Motiff") ||
        designTools[0]),
    },
    {
      ...(designTools.find((tool) => tool.title === "Figma") || designTools[1]),
    },
    // AI tools - ChatGPT and Gemini
    { ...(aiTools.find((tool) => tool.title === "ChatGPT") || aiTools[0]) },
    { ...(aiTools.find((tool) => tool.title === "Gemini") || aiTools[1]) },
  ];

  // Get displayed tools based on category
  const getDisplayedTools = () => {
    if (selectedCategory === "Suggested") {
      return featuredTools;
    }

    // Return all tools for the selected category
    return getToolsByCategory(selectedCategory);
  };

  // Filter and sort tools based on search term, category, and sort preference
  const filterAndSortTools = () => {
    if (searchTerm === "" || searchTerm.length < 3) {
      setSearchResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    // Use the selected category tools
    const toolsToSearch = getToolsByCategory(selectedCategory);

    // Filter tools based on search term
    let filteredResults = toolsToSearch.filter((tool) => {
      const lowerSearchTerm = searchTerm.toLowerCase();
      return tool.title.toLowerCase().includes(lowerSearchTerm);
    });

    // Sort alphabetically if enabled
    if (sortAlphabetically) {
      filteredResults = [...filteredResults].sort((a, b) =>
        a.title.localeCompare(b.title),
      );
    }

    setSearchResults(filteredResults);
    setIsLoading(false);
  };

  // Debounce search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      filterAndSortTools();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedCategory, sortAlphabetically]);

  // Apply sorting to displayed tools if enabled
  const getSortedDisplayedTools = () => {
    const displayedTools = getDisplayedTools();
    if (sortAlphabetically) {
      return [...displayedTools].sort((a, b) => a.title.localeCompare(b.title));
    }
    return displayedTools;
  };

  return {
    searchTerm,
    setSearchTerm,
    searchResults,
    isLoading,
    selectedCategory,
    setSelectedCategory,
    sortAlphabetically,
    setSortAlphabetically,
    getDisplayedTools,
    getSortedDisplayedTools,
  };
}
