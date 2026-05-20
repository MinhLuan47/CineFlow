import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "gold" | "glass";
  size?: "xs" | "sm" | "md";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "glass",
  size = "sm",
  className = "",
}) => {
  const sizeClasses = {
    xs: "text-[9px] px-1.5 py-0.5",
    sm: "text-[10px] px-2 py-0.5",
    md: "text-xs px-2.5 py-1",
  };

  const variantClasses = {
    primary: "bg-primary text-text font-black uppercase tracking-wider",
    secondary: "bg-themeBorder text-muted border border-themeBorder/40",
    outline: "border border-themeBorder text-muted bg-transparent",
    gold: "bg-background/80 backdrop-blur-md border border-themeBorder/60 text-gold font-black",
    glass: "bg-black/75 backdrop-blur-md border border-themeBorder/40 text-text/90 font-bold",
  };

  return (
    <span
      className={`inline-flex items-center justify-center rounded-sharp font-display ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
