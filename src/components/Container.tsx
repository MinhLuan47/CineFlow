import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  as?: "section" | "div";
  py?: "sm" | "md" | "lg" | "none";
  borderTop?: boolean;
  className?: string;
  id?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  as: Component = "section",
  py = "md",
  borderTop = false,
  className = "",
  id,
}) => {
  const pyClasses = {
    none: "",
    sm: "py-8",
    md: "py-16 md:py-24",
    lg: "py-20 md:py-32",
  };

  const borderClass = borderTop ? "border-t border-themeBorder/40" : "";

  return (
    <Component
      id={id}
      className={`container-custom relative z-20 ${borderClass} ${pyClasses[py]} ${className}`}
    >
      {children}
    </Component>
  );
};
