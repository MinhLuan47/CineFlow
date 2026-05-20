import React from "react";
import { cn } from "../../lib/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "gold" | "muted" | "glass" | "danger" | "success" | "warning" | "outline" | "secondary";
  size?: "xs" | "sm" | "md";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "glass",
  size = "sm",
  className,
}) => {
  const sizeClasses = {
    xs: "text-[9px] px-1.5 py-0.5",
    sm: "text-[10px] px-2 py-0.5",
    md: "text-xs px-2.5 py-1",
  };

  const variantClasses = {
    primary: "bg-primary text-text font-black uppercase tracking-wider",
    gold: "bg-gold/15 text-gold border border-gold/20 font-black",
    muted: "bg-themeBorder/40 text-muted border border-themeBorder/20",
    glass: "bg-black/75 backdrop-blur-md border border-themeBorder/40 text-text/90 font-bold",
    danger: "bg-red-600/10 text-red-500 border border-red-500/20 font-bold",
    success: "bg-green-600/10 text-green-500 border border-green-500/20 font-bold",
    warning: "bg-yellow-600/10 text-yellow-500 border border-yellow-500/20 font-bold",
    outline: "border border-themeBorder text-muted bg-transparent",
    secondary: "bg-themeBorder text-muted border border-themeBorder/40",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-sharp font-display font-medium",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
