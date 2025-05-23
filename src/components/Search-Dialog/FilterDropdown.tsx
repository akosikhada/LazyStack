import React, { RefObject } from "react";
import { Menu, Check } from "lucide-react";
import { Category } from "../../types/search-types";

interface FilterDropdownProps {
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
  filterMenuOpen: boolean;
  setFilterMenuOpen: (isOpen: boolean) => void;
  filterMenuRef: RefObject<HTMLDivElement>;
}

export function FilterDropdown({ 
  selectedCategory, 
  setSelectedCategory, 
  filterMenuOpen, 
  setFilterMenuOpen,
  filterMenuRef
}: FilterDropdownProps) {
  const categories: Category[] = ["Suggested", "Development", "Design", "AI"];
  
  return (
    <div className="relative sm:hidden" ref={filterMenuRef}>
      <button
        onClick={() => setFilterMenuOpen(!filterMenuOpen)}
        className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-muted-foreground hover:bg-purple-200"
      >
        <Menu className="h-3.5 w-3.5" />
        <span className="text-xs font-medium">{selectedCategory}</span>
      </button>
      
      {filterMenuOpen && (
        <div className="absolute top-full left-0 mt-1 w-36 bg-card rounded-lg border shadow-md z-50 py-1">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setFilterMenuOpen(false);
              }}
              className="flex items-center w-full px-3 py-2 hover:bg-muted text-left text-sm"
            >
              {selectedCategory === category && (
                <Check className="h-3.5 w-3.5 mr-2 text-purple-500" />
              )}
              <span className={selectedCategory === category ? "text-purple-500 font-medium" : ""}>
                {category}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 