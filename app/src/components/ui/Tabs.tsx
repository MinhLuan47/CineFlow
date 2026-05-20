import React from "react";
import { cn } from "../../lib/cn";

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  items: TabItem[];
  activeValue: string;
  onChange: (value: string) => void;
  variant?: "default" | "pill" | "gold";
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  activeValue,
  onChange,
  variant = "default",
  className,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextIndex = (index + 1) % items.length;
      onChange(items[nextIndex].id);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevIndex = (index - 1 + items.length) % items.length;
      onChange(items[prevIndex].id);
    }
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar-x w-full",
        className
      )}
      role="tablist"
    >
      {items.map((item, index) => {
        const isActive = activeValue === item.id;
        return (
          <button
            key={item.id}
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(item.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-sharp transition-all duration-300 focus:outline-none whitespace-nowrap",
              variant === "pill" &&
                (isActive
                  ? "bg-primary text-text shadow-lg shadow-primary/20"
                  : "bg-surface/50 border border-themeBorder text-muted hover:border-primary/50 hover:text-text"),
              variant === "gold" &&
                (isActive
                  ? "bg-gold text-background font-black shadow-lg shadow-gold/20"
                  : "bg-surface/50 border border-themeBorder text-muted hover:border-gold/50 hover:text-text"),
              variant === "default" &&
                (isActive
                  ? "border-b-2 border-primary text-primary"
                  : "border-b border-transparent text-muted hover:text-text")
            )}
          >
            {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
            {item.label}
          </button>
        );
      })}
    </div>
  );
};
