import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
} from "../ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { cn } from "../../lib/utils";
import { developmentTools, designTools, aiTools } from "../../constants/data";
import { Search } from "lucide-react";
import React from "react";
import { useTheme } from "next-themes";

type Tool = {
  title: string;
  description: string;
  icon: string;
  category: string;
  benefits: string[];
  highlight: string;
  link: string;
};

// Custom DialogContent with modified close button positioning
const CustomDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] border bg-background shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full p-0",
        className,
      )}
      {...props}
    >
      {children}
      {/* Customized close button positioned at the end of the search input */}
      <DialogPrimitive.Close className="absolute right-6 top-[27px] rounded-full opacity-70 transition-opacity hover:opacity-100 focus:outline-none">
        <Cross2Icon className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
CustomDialogContent.displayName = DialogPrimitive.Content.displayName;

export function SearchDialog() {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Combine all tools into one array
  const allTools = [...developmentTools, ...designTools, ...aiTools];

  // Create featured tools list
  const featuredTools = [
    // Development tools - Cursor and Windsurf
    developmentTools.find(tool => tool.title === "Cursor") || developmentTools[0],
    developmentTools.find(tool => tool.title === "Windsurf") || developmentTools[1],
    // Design tools - Motiff and Figma
    designTools.find(tool => tool.title === "Motiff") || designTools[0],
    designTools.find(tool => tool.title === "Figma") || designTools[1],
    // AI tools - ChatGPT and Gemini
    aiTools.find(tool => tool.title === "ChatGPT") || aiTools[0],
    aiTools.find(tool => tool.title === "Gemini") || aiTools[1],
  ];

  // Debounce search to avoid excessive filtering
  useEffect(() => {
    if (searchTerm === "") {
      setSearchResults([]);
      setIsLoading(false);
      return;
    }

    // Only start searching when search term has at least 3 characters
    if (searchTerm.length < 3) {
      setSearchResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      const filteredResults = allTools.filter((tool) => {
        const lowerSearchTerm = searchTerm.toLowerCase();
        // Only search in the title field
        return tool.title.toLowerCase().includes(lowerSearchTerm);
      });

      setSearchResults(filteredResults);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button 
          className={`flex items-center w-full gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
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
      
      <CustomDialogContent className="sm:max-w-[700px] bg-card rounded-lg border-none">
        <div className="px-4 pt-4 pb-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for tools..."
              className="w-full h-9 rounded-full pl-9 pr-9 border-2 border-purple-300 bg-transparent focus:outline-none focus:border-purple-400 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        <div className="max-h-[400px] overflow-y-auto relative">
          <p className={`text-muted-foreground px-5 pt-2 pb-3 text-sm font-medium sticky -top-1 z-10 ${
            theme === "dark" ? "bg-card" : "bg-white"
          } shadow-sm`}>
            {searchTerm.length === 0
              ? "Suggested tools"
              : searchTerm.length < 3
                ? "Type at least 3 characters to search"
                : isLoading
                  ? "Searching..."
                  : `${searchResults.length} results found`}
          </p>

          {searchResults.length > 0 ? (
            <div>
              {searchResults.map((tool) => (
                <div 
                  key={tool.title}
                  className="flex items-start gap-4 px-5 py-3 hover:bg-muted cursor-pointer"
                  onClick={() => {
                    window.open(tool.link, "_blank");
                    setOpen(false);
                  }}
                >
                  <img 
                    src={tool.icon} 
                    alt={tool.title} 
                    className="w-10 h-10 rounded-md object-cover flex-shrink-0"
                  />
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-base">{tool.title}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground whitespace-nowrap">
                        {tool.category}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5">
                      {tool.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : searchTerm.length >= 3 && !isLoading ? (
            <div className="text-center py-6 text-muted-foreground">
              <p className="font-medium">No matching tools found</p>
              <p className="text-sm mt-1">Please try refining your search criteria or browse our popular tools</p>
            </div>
          ) : searchTerm.length > 0 && searchTerm.length < 3 ? (
            <div className="text-center py-6 text-muted-foreground">
              <p className="text-sm">Please enter at least 3 characters to begin search</p>
            </div>
          ) : !searchTerm ? (
            <div>
              {featuredTools.map((tool) => (
                <div 
                  key={tool.title}
                  className="flex items-start gap-4 px-5 py-3 hover:bg-muted cursor-pointer"
                  onClick={() => {
                    window.open(tool.link, "_blank");
                    setOpen(false);
                  }}
                >
                  <img 
                    src={tool.icon} 
                    alt={tool.title} 
                    className="w-10 h-10 rounded-md object-cover flex-shrink-0"
                  />
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-base">{tool.title}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground whitespace-nowrap">
                        {tool.category}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5">
                      {tool.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-6 flex justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            </div>
          )}
        </div>
      </CustomDialogContent>
    </Dialog>
  );
}

export default SearchDialog;
