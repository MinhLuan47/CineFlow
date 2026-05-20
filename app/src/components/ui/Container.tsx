import React from "react";
import { cn } from "../../lib/cn";

interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  as?: "section" | "div" | "main" | "header" | "footer";
  py?: "sm" | "md" | "lg" | "none";
  borderTop?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  as: Component = "section",
  py = "md",
  borderTop = false,
  className,
  ...props
}) => {
  const pyClasses = {
    none: "",
    sm: "py-8",
    md: "py-16 md:py-24",
    lg: "py-20 md:py-32",
  };

  return (
    <Component
      className={cn(
        "container-custom relative z-20",
        borderTop && "border-t border-themeBorder/40",
        pyClasses[py],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
