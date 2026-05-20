import React from "react";

interface SectionHeaderProps {
  accentText?: string;
  accentIcon?: React.ReactNode;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  accentText,
  accentIcon,
  title,
  subtitle,
  align = "left",
  className = "",
}) => {
  const alignClasses = align === "center" ? "text-center items-center" : "text-left items-start animate-fade-in-up";

  return (
    <div className={`flex flex-col gap-2 mb-12 ${alignClasses} ${className}`}>
      {accentText && (
        <div className={`flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest`}>
          {accentIcon && <div className="flex-shrink-0">{accentIcon}</div>}
          <span>{accentText}</span>
        </div>
      )}
      <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight uppercase text-text">
        {title}
      </h2>
      {subtitle && (
        <p className={`text-muted text-sm md:text-base ${align === "center" ? "max-w-xl mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
