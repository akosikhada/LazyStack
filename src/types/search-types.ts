export type Tool = {
  title: string;
  description: string;
  icon: string;
  category: string;
  benefits: string[];
  highlight: string;
  link: string;
};

export type Category = "Suggested" | "Development" | "Design" | "AI";
