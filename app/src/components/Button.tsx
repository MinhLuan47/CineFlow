import React from "react";
import { motion } from "framer-motion";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "icon";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  animate?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  animate = true,
  className = "",
  ...props
}) => {
  const baseClasses = "inline-flex items-center justify-center font-display font-bold uppercase tracking-wider transition-all duration-300 rounded-sharp focus:outline-none disabled:opacity-50 disabled:pointer-events-none";

  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variantClasses = {
    primary: "bg-primary hover:bg-primary-dark text-text shadow-lg shadow-primary/20",
    secondary: "bg-surface border border-themeBorder hover:border-primary/50 text-text",
    outline: "border border-themeBorder hover:border-primary/50 bg-transparent text-muted hover:text-text",
    ghost: "bg-transparent hover:bg-surface/50 text-muted hover:text-text",
    icon: "p-2 bg-themeBorder hover:bg-primary text-muted hover:text-text border border-themeBorder/40 shadow-lg rounded-full",
  };

  const Component: React.ElementType = animate ? motion.button : "button";
  const motionProps = animate
    ? {
        whileHover: { scale: 1.03 },
        whileTap: { scale: 0.98 },
      }
    : {};

  return (
    <Component
      className={`${baseClasses} ${variantClasses[variant]} ${variant !== "icon" ? sizeClasses[size] : ""} ${className}`}
      {...motionProps}
      {...props}
    >
      {icon && iconPosition === "left" && <span className="mr-2 flex-shrink-0">{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span className="ml-2 flex-shrink-0">{icon}</span>}
    </Component>
  );
};
