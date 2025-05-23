import React from "react";

interface CategoryHeaderProps {
  title: string;
  description: string;
}

/**
 * Section header for tool categories with title and description
 */
export function CategoryHeader({ title, description }: CategoryHeaderProps) {
  return (
    <div className="mb-12 text-center">
      <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
        {title}
      </h2>
      <p className="mx-auto max-w-2xl text-muted-foreground">{description}</p>
    </div>
  );
}
