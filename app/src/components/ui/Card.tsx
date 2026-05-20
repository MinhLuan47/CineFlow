import React from "react";
import { cn } from "../../lib/cn";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: "default" | "glass" | "gradient";
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = "default",
  className,
  ...props
}) => {
  const variantClasses = {
    default: "bg-surface border border-themeBorder shadow-xl",
    glass: "bg-background/40 backdrop-blur-xl border border-themeBorder/40 shadow-2xl",
    gradient: "bg-gradient-to-br from-surface via-surface to-background border border-themeBorder/60 shadow-2xl",
  };

  return (
    <div
      className={cn(
        "rounded-sharp p-6 text-left",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
