import { useState, useRef } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Search } from "lucide-react";
import React from "react";
import { useTheme } from "next-themes";
import { CustomDialogContent } from "../ui/custom-dialog";
import { ToolItem } from "./ToolItem";
import { FilterDropdown } from "./FilterDropdown";
import { CategoryButtons } from "./CategoryButtons";
import { SortButton } from "./SortButton";
import { useToolsFilter } from "../../hooks/useToolsFilter";
import { useClickOutside } from "../../hooks/useClickOutside";

export function SearchDialog() {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const filterMenuRef = useRef<HTMLDivElement>(null);

  // Use the extracted hooks
  const {
    searchTerm,
    setSearchTerm,
    searchResults,
    isLoading,
    selectedCategory,
    setSelectedCategory,
    sortAlphabetically,
    setSortAlphabetically,
    getSortedDisplayedTools,
  } = useToolsFilter();

  // Use the click outside hook
  useClickOutside(filterMenuRef, () => setFilterMenuOpen(false));

  // Function to handle opening a tool link
  const handleToolClick = (url: string) => {
    window.open(url, "_blank");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className={`flex w-full items-center gap-2 rounded-lg px-4 py-2 transition-all duration-200 ${
            theme === "dark"
              ? "bg-[#16141C] hover:bg-[#1E1B26]"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <Search className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Search tools...</span>
          <div className="flex-grow"></div>
          <kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">⌘</span>LS
          </kbd>
        </button>
      </DialogTrigger>

      <CustomDialogContent className="rounded-lg border-none bg-card sm:max-w-[700px]">
        <DialogTitle className="sr-only">Search Tools</DialogTitle>
        <DialogDescription className="sr-only">
          Search and browse available tools and applications
        </DialogDescription>
        <div className="px-4 pb-2 pt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for tools..."
              className="h-9 w-full rounded-full border-2 border-purple-300 bg-transparent pl-9 pr-9 text-sm focus:border-purple-400 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>

          {/* Category filters and sorting toggle - with hamburger menu for mobile */}
          <div className="mt-3 flex items-center justify-between">
            {/* Desktop view: Regular category buttons */}
            <CategoryButtons
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />

            {/* Mobile view: Hamburger menu dropdown */}
            <FilterDropdown
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              filterMenuOpen={filterMenuOpen}
              setFilterMenuOpen={setFilterMenuOpen}
              filterMenuRef={filterMenuRef}
            />

            {/* A-Z sort button - same for both views */}
            <SortButton
              sortAlphabetically={sortAlphabetically}
              setSortAlphabetically={setSortAlphabetically}
            />
          </div>
        </div>

        <div className="relative max-h-[400px] overflow-y-auto">
          <p
            className={`sticky -top-1 z-10 px-5 pb-3 pt-2 text-sm font-medium text-muted-foreground ${
              theme === "dark" ? "bg-card" : "bg-white"
            } shadow-sm`}
          >
            {searchTerm.length === 0
              ? `${selectedCategory === "Suggested" ? "Suggested tools" : `All ${selectedCategory} tools`}${sortAlphabetically ? " (A-Z)" : ""}`
              : searchTerm.length < 3
                ? "Type at least 3 characters to search"
                : isLoading
                  ? "Searching..."
                  : `${searchResults.length} results found${selectedCategory !== "Suggested" ? ` in ${selectedCategory}` : ""}${sortAlphabetically ? " (A-Z)" : ""}`}
          </p>

          {searchResults.length > 0 ? (
            <div>
              {searchResults.map((tool) => (
                <ToolItem
                  key={tool.title}
                  tool={tool}
                  onClick={() => handleToolClick(tool.link)}
                />
              ))}
            </div>
          ) : searchTerm.length >= 3 && !isLoading ? (
            <div className="py-6 text-center text-muted-foreground">
              <p className="font-medium">No matching tools found</p>
              <p className="mt-1 text-sm">
                Please try refining your search criteria or browse our popular
                tools
              </p>
            </div>
          ) : searchTerm.length > 0 && searchTerm.length < 3 ? (
            <div className="py-6 text-center text-muted-foreground">
              <p className="text-sm">
                Please enter at least 3 characters to begin search
              </p>
            </div>
          ) : !searchTerm ? (
            <div>
              {/* Show all tools for the selected category or suggested tools */}
              {getSortedDisplayedTools().map((tool) => (
                <ToolItem
                  key={tool.title}
                  tool={tool}
                  onClick={() => handleToolClick(tool.link)}
                />
              ))}
            </div>
          ) : (
            <div className="flex justify-center py-6">
              <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-primary"></div>
            </div>
          )}
        </div>
      </CustomDialogContent>
    </Dialog>
  );
}

export default SearchDialog;
