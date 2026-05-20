import React from "react";
import { cn } from "../../lib/cn";

interface SectionHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  eyebrow?: string;
  accentText?: string; // alias cho khả năng tương thích ngược
  accentIcon?: React.ReactNode;
  title: React.ReactNode;
  description?: string;
  subtitle?: string; // alias cho khả năng tương thích ngược
  align?: "left" | "center";
  action?: React.ReactNode; // action slot
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  accentText,
  accentIcon,
  title,
  description,
  subtitle,
  align = "left",
  action,
  className,
  ...props
}) => {
  const displayEyebrow = eyebrow || accentText;
  const displayDescription = description || subtitle;

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12",
        align === "center" && "text-center md:items-center md:justify-center",
        align === "left" && "text-left md:items-end md:justify-between animate-fade-in-up",
        className
      )}
      {...props}
    >
      <div className={cn("flex flex-col gap-2", align === "center" && "items-center")}>
        {displayEyebrow && (
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
            {accentIcon && <div className="flex-shrink-0">{accentIcon}</div>}
            <span>{displayEyebrow}</span>
          </div>
        )}
        <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight uppercase text-text">
          {title}
        </h2>
        {displayDescription && (
          <p
            className={cn(
              "text-muted text-sm md:text-base",
              align === "center" && "max-w-xl mx-auto"
            )}
          >
            {displayDescription}
          </p>
        )}
      </div>

      {action && (
        <div className={cn("flex-shrink-0", align === "center" && "mt-2")}>
          {action}
        </div>
      )}
    </div>
  );
};
